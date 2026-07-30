param(
  [string]$Root = "C:\Users\admin\Desktop\ova.perfume"
)

$ErrorActionPreference = "Stop"

$textExtensions = @(".html", ".js", ".css", ".webmanifest", ".xml", ".txt", ".gs", ".ps1", ".json")
$mediaExtensions = @(".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".mp4", ".webm", ".avif", ".ico")
$mediaRoots = @(
  (Join-Path $Root "images"),
  (Join-Path $Root "icons")
)

function Get-RepoRelativePath {
  param([string]$FullPath)

  return $FullPath.Substring($Root.Length).TrimStart("\") -replace "\\", "/"
}

function Read-TextFile {
  param([string]$Path)

  return [System.IO.File]::ReadAllText($Path)
}

function Write-TextFile {
  param(
    [string]$Path,
    [string]$Content
  )

  [System.IO.File]::WriteAllText($Path, $Content, [System.Text.Encoding]::UTF8)
}

function Get-SafeBaseName {
  param([string]$Name)

  $normalized = $Name.Normalize([Text.NormalizationForm]::FormD)
  $builder = New-Object System.Text.StringBuilder

  foreach ($char in $normalized.ToCharArray()) {
    $category = [Globalization.CharUnicodeInfo]::GetUnicodeCategory($char)
    if ($category -eq [Globalization.UnicodeCategory]::NonSpacingMark) {
      continue
    }

    if (($char -ge 'a' -and $char -le 'z') -or ($char -ge 'A' -and $char -le 'Z') -or ($char -ge '0' -and $char -le '9')) {
      [void]$builder.Append([char]::ToLowerInvariant($char))
      continue
    }

    [void]$builder.Append('-')
  }

  $collapsed = [regex]::Replace($builder.ToString(), '-{2,}', '-').Trim('-')
  if ([string]::IsNullOrWhiteSpace($collapsed)) {
    return "media-file"
  }

  return $collapsed
}

function Get-UniqueFileName {
  param(
    [string]$Directory,
    [string]$BaseName,
    [string]$Extension,
    [hashtable]$ReservedNames
  )

  $candidate = "$BaseName$Extension"
  $index = 2
  while ($ReservedNames.ContainsKey($candidate) -or (Test-Path -LiteralPath (Join-Path $Directory $candidate))) {
    $candidate = "$BaseName-$index$Extension"
    $index += 1
  }

  $ReservedNames[$candidate] = $true
  return $candidate
}

$textFiles = Get-ChildItem -Path $Root -Recurse -File | Where-Object {
  $textExtensions -contains $_.Extension.ToLower()
}

$renameMap = [ordered]@{}

foreach ($mediaRoot in $mediaRoots) {
  if (-not (Test-Path -LiteralPath $mediaRoot -PathType Container)) {
    continue
  }

  $directoryReservations = @{}
  $files = Get-ChildItem -Path $mediaRoot -Recurse -File | Where-Object {
    $mediaExtensions -contains $_.Extension.ToLower()
  } | Sort-Object FullName

  foreach ($file in $files) {
    $directoryKey = $file.DirectoryName
    if (-not $directoryReservations.ContainsKey($directoryKey)) {
      $directoryReservations[$directoryKey] = @{}
    }

    $safeBaseName = Get-SafeBaseName -Name $file.BaseName
    $safeExtension = $file.Extension.ToLower()
    $safeFileName = Get-UniqueFileName -Directory $file.DirectoryName -BaseName $safeBaseName -Extension $safeExtension -ReservedNames $directoryReservations[$directoryKey]

    if ($safeFileName -eq $file.Name) {
      continue
    }

    $oldRelative = Get-RepoRelativePath -FullPath $file.FullName
    $newRelative = (($file.DirectoryName.Substring($Root.Length).TrimStart("\")) -replace "\\", "/").Trim("/")
    if ($newRelative) {
      $newRelative = "$newRelative/$safeFileName"
    } else {
      $newRelative = $safeFileName
    }

    $renameMap[$oldRelative] = $newRelative
  }
}

$sortedOldPaths = @($renameMap.Keys | Sort-Object Length -Descending)
foreach ($textFile in $textFiles) {
  $content = Read-TextFile -Path $textFile.FullName
  $updated = $content

  foreach ($oldRelative in $sortedOldPaths) {
    $updated = $updated.Replace($oldRelative, $renameMap[$oldRelative])
  }

  if ($updated -ne $content) {
    Write-TextFile -Path $textFile.FullName -Content $updated
  }
}

foreach ($oldRelative in $sortedOldPaths) {
  $newRelative = $renameMap[$oldRelative]
  $oldAbsolute = Join-Path $Root ($oldRelative -replace "/", "\")
  $newAbsolute = Join-Path $Root ($newRelative -replace "/", "\")

  if (-not (Test-Path -LiteralPath $oldAbsolute -PathType Leaf)) {
    continue
  }

  Rename-Item -LiteralPath $oldAbsolute -NewName ([System.IO.Path]::GetFileName($newAbsolute))
}

$unsafeFiles = Get-ChildItem -Path $mediaRoots -Recurse -File | Where-Object {
  $mediaExtensions -contains $_.Extension.ToLower() -and $_.Name -match '[^a-z0-9\.-]'
}

Write-Host ("Renamed media files: " + $renameMap.Count)
if ($unsafeFiles.Count -eq 0) {
  Write-Host "Unsafe media names remaining: 0"
} else {
  Write-Host ("Unsafe media names remaining: " + $unsafeFiles.Count)
  $unsafeFiles | ForEach-Object { Write-Host (Get-RepoRelativePath -FullPath $_.FullName) }
}
