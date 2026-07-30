$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$catalogPath = Join-Path $projectRoot "js\catalog.js"
$menDir = Join-Path $projectRoot "images\men"
$defaultPrice = 850

function Convert-FileNameToProductName {
  param([string]$FileName)

  $name = [System.IO.Path]::GetFileNameWithoutExtension($FileName)
  $name = $name -replace "%23", "#"
  $name = $name -replace "_", " "
  $name = $name -replace "\s+", " "
  return $name.Trim()
}

function Convert-FileNameToUrlPath {
  param([string]$FileName)

  return (($FileName -replace "#", "%23") -replace "\\", "/")
}

function Normalize-Key {
  param([string]$Value)

  if ($null -eq $Value) {
    $Value = ""
  }

  return ($Value.ToLowerInvariant() -replace "[^a-z0-9]+", "")
}

$catalog = Get-Content $catalogPath -Raw
$files = Get-ChildItem -Path $menDir -File | Select-Object -ExpandProperty Name

$allRefs = [regex]::Matches($catalog, 'img:\s*"images/men/([^"]+)"') | ForEach-Object {
  [System.Uri]::UnescapeDataString($_.Groups[1].Value)
}

$brandPattern = '(?s)(chanel:\s*\{.*?products:\s*\[)(.*?)(\]\s*\})'
$brandMatch = [regex]::Match($catalog, $brandPattern)
if (-not $brandMatch.Success) {
  throw "Could not find first brand block in catalog.js"
}

$currentBrandBlock = $brandMatch.Groups[2].Value
$currentEntries = [regex]::Matches($currentBrandBlock, '\{\s*name:\s*"([^"]+)",\s*price:\s*([0-9]+),\s*img:\s*"([^"]+)",\s*img2:\s*"([^"]+)"\s*\}') | ForEach-Object {
  [pscustomobject]@{
    Name  = $_.Groups[1].Value
    Price = [int]$_.Groups[2].Value
    Img   = $_.Groups[3].Value
    Img2  = $_.Groups[4].Value
  }
}

$brandLogo = if ($currentEntries.Count -gt 0) { $currentEntries[0].Img2 } else { "images/brands/coco-chanel-logo-when-coco-chanel-returned-from.jpg" }
$currentBrandFileNames = @($currentEntries | ForEach-Object { [System.Uri]::UnescapeDataString([System.IO.Path]::GetFileName($_.Img)) })

$usedByOtherBrands = @{}
foreach ($ref in $allRefs) {
  if ($ref -notin $currentBrandFileNames) {
    $usedByOtherBrands[$ref] = $true
  }
}

$kept = New-Object System.Collections.Generic.List[object]
$seenNames = @{}
$seenImages = @{}

foreach ($entry in $currentEntries) {
  $fileName = [System.Uri]::UnescapeDataString([System.IO.Path]::GetFileName($entry.Img))
  if (-not (Test-Path (Join-Path $menDir $fileName))) {
    continue
  }

  $entry.Img = "images/men/$(Convert-FileNameToUrlPath $fileName)"

  $nameKey = Normalize-Key $entry.Name
  $imgKey = $entry.Img.ToLowerInvariant()
  if ($seenNames.ContainsKey($nameKey) -or $seenImages.ContainsKey($imgKey)) {
    continue
  }

  $seenNames[$nameKey] = $true
  $seenImages[$imgKey] = $true
  $kept.Add($entry)
}

$newFiles = $files | Where-Object {
  -not $usedByOtherBrands.ContainsKey($_) -and
  -not $currentBrandFileNames.Contains($_)
}

$prepended = New-Object System.Collections.Generic.List[object]
foreach ($file in ($newFiles | Sort-Object)) {
  $productName = Convert-FileNameToProductName $file
  $nameKey = Normalize-Key $productName
  $imgPath = "images/men/$(Convert-FileNameToUrlPath $file)"

  if ($seenNames.ContainsKey($nameKey) -or $seenImages.ContainsKey($imgPath.ToLowerInvariant())) {
    continue
  }

  $seenNames[$nameKey] = $true
  $seenImages[$imgPath.ToLowerInvariant()] = $true

  $prepended.Add([pscustomobject]@{
    Name  = $productName
    Price = $defaultPrice
    Img   = $imgPath
    Img2  = $brandLogo
  })
}

$finalEntries = @($prepended + $kept)
$lines = $finalEntries | ForEach-Object {
  '      { name: "' + $_.Name.Replace('"', '\"') + '", price: ' + $_.Price + ', img: "' + $_.Img.Replace('\', '/') + '", img2: "' + $_.Img2.Replace('\', '/') + '" }'
}

$replacement = $brandMatch.Groups[1].Value + "`r`n" + ($lines -join ",`r`n") + "`r`n    " + $brandMatch.Groups[3].Value
$updatedCatalog = [regex]::Replace($catalog, $brandPattern, [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $replacement }, 1)

Set-Content -Path $catalogPath -Value $updatedCatalog -Encoding UTF8

Write-Output ("Updated first brand with " + $finalEntries.Count + " products. Added " + $prepended.Count + " new files.")
