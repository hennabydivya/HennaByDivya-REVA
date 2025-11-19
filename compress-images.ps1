# Image Compression Script for Web
# This script compresses and resizes images for optimal web performance

Add-Type -AssemblyName System.Drawing

$sourceFolder = "gallery\mosaic"
$quality = 85  # JPEG quality (0-100, 85 is good balance)
$maxDimension = 1200  # Maximum width or height in pixels

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  IMAGE COMPRESSION TOOL" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Create backup folder
$backupFolder = "gallery\mosaic-backup-original"
if (-not (Test-Path $backupFolder)) {
    New-Item -ItemType Directory -Path $backupFolder | Out-Null
    Write-Host "Created backup folder: $backupFolder" -ForegroundColor Green
}

# Get all image files
$images = Get-ChildItem -Path $sourceFolder -Filter "mosaic-*.jpg"
$totalImages = $images.Count

Write-Host "Found $totalImages images to compress" -ForegroundColor Yellow
Write-Host ""

$totalOriginalSize = 0
$totalNewSize = 0
$processedCount = 0

foreach ($image in $images) {
    $processedCount++
    $originalSize = $image.Length
    $totalOriginalSize += $originalSize
    
    Write-Host "[$processedCount/$totalImages] Processing: $($image.Name)" -ForegroundColor White
    Write-Host "  Original size: $([math]::Round($originalSize/1MB, 2)) MB" -ForegroundColor Gray
    
    try {
        # Backup original
        $backupPath = Join-Path $backupFolder $image.Name
        Copy-Item $image.FullName $backupPath -Force
        
        # Load image
        $img = [System.Drawing.Image]::FromFile($image.FullName)
        
        # Calculate new dimensions
        $width = $img.Width
        $height = $img.Height
        
        if ($width -gt $maxDimension -or $height -gt $maxDimension) {
            if ($width -gt $height) {
                $newWidth = $maxDimension
                $newHeight = [int](($height / $width) * $maxDimension)
            } else {
                $newHeight = $maxDimension
                $newWidth = [int](($width / $height) * $maxDimension)
            }
        } else {
            $newWidth = $width
            $newHeight = $height
        }
        
        Write-Host "  Resizing from ${width}x${height} to ${newWidth}x${newHeight}" -ForegroundColor Gray
        
        # Create new bitmap
        $newImg = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($newImg)
        
        # Set high quality rendering
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        
        # Draw resized image
        $graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)
        
        # Clean up
        $graphics.Dispose()
        $img.Dispose()
        
        # Set up JPEG encoder with quality settings
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)
        
        # Save compressed image
        $tempPath = $image.FullName + ".tmp"
        $newImg.Save($tempPath, $jpegCodec, $encoderParams)
        $newImg.Dispose()
        
        # Replace original with compressed version
        Move-Item $tempPath $image.FullName -Force
        
        $newSize = (Get-Item $image.FullName).Length
        $totalNewSize += $newSize
        $reduction = [math]::Round((1 - ($newSize / $originalSize)) * 100, 1)
        
        Write-Host "  New size: $([math]::Round($newSize/1KB, 0)) KB" -ForegroundColor Green
        Write-Host "  Reduced by: $reduction%" -ForegroundColor Green
        Write-Host ""
        
    } catch {
        Write-Host "  ERROR: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
    }
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  COMPRESSION COMPLETE!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Original total size: $([math]::Round($totalOriginalSize/1MB, 2)) MB" -ForegroundColor Yellow
Write-Host "New total size:      $([math]::Round($totalNewSize/1MB, 2)) MB" -ForegroundColor Green
Write-Host "Total savings:       $([math]::Round(($totalOriginalSize - $totalNewSize)/1MB, 2)) MB" -ForegroundColor Green
Write-Host "Reduction:           $([math]::Round((1 - ($totalNewSize / $totalOriginalSize)) * 100, 1))%" -ForegroundColor Green
Write-Host ""
Write-Host "Original images backed up to: $backupFolder" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your images are now optimized for the web! 🚀" -ForegroundColor Green

