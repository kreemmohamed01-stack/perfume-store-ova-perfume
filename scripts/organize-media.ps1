param(
  [string]$Root = "C:\Users\admin\Desktop\ova.perfume"
)

$ErrorActionPreference = "Stop"

$textExtensions = @(".html", ".js", ".css", ".webmanifest", ".xml", ".txt", ".gs", ".ps1")
$mediaExtensions = @(".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".mp4")
$assetPattern = '(?<path>[^"''<>]+?\.(?:jpg|jpeg|png|webp|svg|gif|mp4))'
$imageTargetDir = Join-Path $Root "images\site-assets"
$videoTargetDir = Join-Path $Root "images\site-videos"

function Get-RepoRelativePath {
  param([string]$FullPath)

  $relative = $FullPath.Substring($Root.Length).TrimStart("\")
  return $relative -replace "\\", "/"
}

function Get-TextFiles {
  Get-ChildItem -Path $Root -Recurse -File | Where-Object {
    $textExtensions -contains $_.Extension.ToLower()
  }
}

function Read-TextFile {
  param([string]$Path)

  try {
    return [System.IO.File]::ReadAllText($Path)
  } catch {
    return Get-Content -Raw -LiteralPath $Path -ErrorAction Stop
  }
}

function Write-TextFile {
  param(
    [string]$Path,
    [string]$Content
  )

  [System.IO.File]::WriteAllText($Path, $Content, [System.Text.Encoding]::UTF8)
}

function Get-ReferencedAssets {
  $refs = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)

  foreach ($file in Get-TextFiles) {
    $content = Read-TextFile -Path $file.FullName
    foreach ($match in [regex]::Matches($content, $assetPattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
      $value = $match.Groups["path"].Value.Trim() -replace "\\", "/"
      if ($value -match "^(https?:|data:|//)") {
        continue
      }

      [void]$refs.Add($value)
    }
  }

  return @($refs)
}

function Resolve-AssetPath {
  param([string]$Reference)

  $candidates = [System.Collections.Generic.List[string]]::new()
  $normalized = $Reference.TrimStart(".").TrimStart("/")
  $decoded = [System.Uri]::UnescapeDataString($normalized)
  $candidates.Add($normalized)
  if ($decoded -ne $normalized) {
    $candidates.Add($decoded)
  }

  foreach ($candidate in $candidates) {
    $absolute = Join-Path $Root ($candidate -replace "/", "\")
    if (Test-Path -LiteralPath $absolute -PathType Leaf) {
      return Get-RepoRelativePath -FullPath $absolute
    }
  }

  return $null
}

function Get-AllMediaFiles {
  Get-ChildItem -Path $Root -Recurse -File | Where-Object {
    $mediaExtensions -contains $_.Extension.ToLower()
  } | ForEach-Object {
    Get-RepoRelativePath -FullPath $_.FullName
  }
}

function Get-TargetReference {
  param([string]$ResolvedPath)

  if ($ResolvedPath -like "icons/*" -or $ResolvedPath -like "images/*") {
    return $ResolvedPath
  }

  $extension = [System.IO.Path]::GetExtension($ResolvedPath).ToLower()
  $fileName = [System.IO.Path]::GetFileName($ResolvedPath)
  if ($extension -eq ".mp4") {
    return "images/site-videos/$fileName"
  }

  return "images/site-assets/$fileName"
}

function Ensure-UniqueTarget {
  param(
    [string]$DesiredReference,
    [hashtable]$ReservedTargets
  )

  if (-not $ReservedTargets.ContainsKey($DesiredReference)) {
    $ReservedTargets[$DesiredReference] = $true
    return $DesiredReference
  }

  $directory = [System.IO.Path]::GetDirectoryName($DesiredReference) -replace "\\", "/"
  $baseName = [System.IO.Path]::GetFileNameWithoutExtension($DesiredReference)
  $extension = [System.IO.Path]::GetExtension($DesiredReference)
  $index = 2

  while ($true) {
    $candidate = "$directory/$baseName-$index$extension"
    if (-not $ReservedTargets.ContainsKey($candidate)) {
      $ReservedTargets[$candidate] = $true
      return $candidate
    }
    $index += 1
  }
}

New-Item -ItemType Directory -Force -Path $imageTargetDir | Out-Null
New-Item -ItemType Directory -Force -Path $videoTargetDir | Out-Null

$textFiles = Get-TextFiles
$references = Get-ReferencedAssets
$reservedTargets = @{}
$assetMoveMap = @{}
$replacementMap = @{}

foreach ($reference in $references) {
  $resolvedPath = Resolve-AssetPath -Reference $reference
  if (-not $resolvedPath) {
    continue
  }

  if ($assetMoveMap.ContainsKey($resolvedPath)) {
    $targetReference = $assetMoveMap[$resolvedPath]
  } else {
    $targetReference = Get-TargetReference -ResolvedPath $resolvedPath
    if ($targetReference -ne $resolvedPath) {
      $targetReference = Ensure-UniqueTarget -DesiredReference $targetReference -ReservedTargets $reservedTargets
      $assetMoveMap[$resolvedPath] = $targetReference
    } elseif (-not $reservedTargets.ContainsKey($targetReference)) {
      $reservedTargets[$targetReference] = $true
    }
  }

  if ($targetReference -ne $reference) {
    $replacementMap[$reference] = $targetReference
    $decodedReference = [System.Uri]::UnescapeDataString($reference)
    if ($decodedReference -ne $reference) {
      $replacementMap[$decodedReference] = $targetReference
    }
  }
}

foreach ($file in $textFiles) {
  $content = Read-TextFile -Path $file.FullName
  $updated = [System.Text.RegularExpressions.Regex]::Replace(
    $content,
    $assetPattern,
    [System.Text.RegularExpressions.MatchEvaluator]{
      param($match)

      $originalValue = $match.Groups["path"].Value
      $normalizedValue = $originalValue.Trim() -replace "\\", "/"
      if ($replacementMap.ContainsKey($normalizedValue)) {
        return $replacementMap[$normalizedValue]
      }

      $decodedValue = [System.Uri]::UnescapeDataString($normalizedValue)
      if ($replacementMap.ContainsKey($decodedValue)) {
        return $replacementMap[$decodedValue]
      }

      return $originalValue
    },
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
  )

  if ($updated -ne $content) {
    Write-TextFile -Path $file.FullName -Content $updated
  }
}

foreach ($sourcePath in @($assetMoveMap.Keys | Sort-Object Length -Descending)) {
  $targetReference = $assetMoveMap[$sourcePath]
  $sourceAbsolute = Join-Path $Root ($sourcePath -replace "/", "\")
  $targetAbsolute = Join-Path $Root ($targetReference -replace "/", "\")

  if (-not (Test-Path -LiteralPath $sourceAbsolute -PathType Leaf)) {
    continue
  }

  $targetDirectory = Split-Path -Parent $targetAbsolute
  if ($targetDirectory) {
    New-Item -ItemType Directory -Force -Path $targetDirectory | Out-Null
  }

  Move-Item -LiteralPath $sourceAbsolute -Destination $targetAbsolute -Force
}

$updatedReferences = Get-ReferencedAssets
$resolvedUsed = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
foreach ($reference in $updatedReferences) {
  $resolvedPath = Resolve-AssetPath -Reference $reference
  if ($resolvedPath) {
    [void]$resolvedUsed.Add($resolvedPath)
  }
}

$deletedFiles = [System.Collections.Generic.List[string]]::new()
foreach ($mediaFile in Get-AllMediaFiles) {
  if ($mediaFile -like "icons/*") {
    continue
  }

  if ($resolvedUsed.Contains($mediaFile)) {
    continue
  }

  $absolutePath = Join-Path $Root ($mediaFile -replace "/", "\")
  if (Test-Path -LiteralPath $absolutePath -PathType Leaf) {
    Remove-Item -LiteralPath $absolutePath -Force
    $deletedFiles.Add($mediaFile)
  }
}

$remainingRootMedia = Get-AllMediaFiles | Where-Object {
  $_ -notlike "icons/*" -and $_ -notlike "images/*"
}

Write-Host ("References scanned: " + $references.Count)
Write-Host ("Moved media files: " + $assetMoveMap.Count)
Write-Host ("Deleted unused media files: " + $deletedFiles.Count)
Write-Host ("Remaining root media files: " + $remainingRootMedia.Count)
if ($remainingRootMedia.Count -gt 0) {
  Write-Host "Remaining root media:"
  $remainingRootMedia | ForEach-Object { Write-Host $_ }
}
