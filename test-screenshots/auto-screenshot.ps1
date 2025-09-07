# GreenWear Automatic Screenshot Capture Script
# Automatically captures and saves screenshots using Windows API

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

Write-Host "📸 GreenWear Automatic Screenshot Capture Started..." -ForegroundColor Green

# Create screenshots directory
$screenshotsDir = "screenshots"
if (!(Test-Path $screenshotsDir)) {
    New-Item -ItemType Directory -Path $screenshotsDir
    Write-Host "📁 Created screenshots directory" -ForegroundColor Yellow
}

# Function to capture screenshot
function Capture-Screenshot {
    param(
        [string]$filename,
        [string]$description
    )
    
    Write-Host "📷 Capturing: $description" -ForegroundColor Cyan
    
    # Wait a moment for page to load
    Start-Sleep -Seconds 2
    
    # Get screen dimensions
    $screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
    $width = $screen.Width
    $height = $screen.Height
    
    # Create bitmap
    $bitmap = New-Object System.Drawing.Bitmap $width, $height
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    
    # Capture screen
    $graphics.CopyFromScreen(0, 0, 0, 0, $bitmap.Size)
    
    # Save image
    $filepath = Join-Path $screenshotsDir $filename
    $bitmap.Save($filepath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    # Cleanup
    $graphics.Dispose()
    $bitmap.Dispose()
    
    Write-Host "✅ Saved: $filepath" -ForegroundColor Green
}

# Test cases
$testCases = @(
    @{
        Name = "01-homepage"
        Description = "Homepage Main Screen"
        URL = "http://localhost:5173"
        WaitTime = 5
    },
    @{
        Name = "02-dashboard"
        Description = "Real-time Dashboard"
        URL = "http://localhost:5173/dashboard"
        WaitTime = 5
    },
    @{
        Name = "03-templates"
        Description = "Monitoring Templates"
        URL = "http://localhost:5173/templates"
        WaitTime = 5
    },
    @{
        Name = "04-generator"
        Description = "Settings Generator"
        URL = "http://localhost:5173/generator"
        WaitTime = 5
    },
    @{
        Name = "05-history"
        Description = "History and Records"
        URL = "http://localhost:5173/history"
        WaitTime = 5
    },
    @{
        Name = "06-api-docs"
        Description = "API Documentation"
        URL = "http://localhost:5173/api-docs"
        WaitTime = 5
    }
)

Write-Host "`n📋 Test Cases to Capture:" -ForegroundColor Cyan
foreach ($testCase in $testCases) {
    Write-Host "  - $($testCase.Description)" -ForegroundColor White
}

Write-Host "`n🎯 Starting automatic capture..." -ForegroundColor Yellow
Write-Host "📁 Screenshots will be saved in: $screenshotsDir" -ForegroundColor Blue

# Execute each test case
foreach ($testCase in $testCases) {
    Write-Host "`n🔄 Processing: $($testCase.Description)" -ForegroundColor Yellow
    
    # Open page in Chrome
    Start-Process chrome -ArgumentList $testCase.URL
    
    # Wait for page loading
    Write-Host "⏳ Waiting $($testCase.WaitTime) seconds for page to load..." -ForegroundColor Gray
    Start-Sleep -Seconds $testCase.WaitTime
    
    # Generate filename
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $filename = "$($testCase.Name)-$timestamp.png"
    
    # Capture screenshot
    Capture-Screenshot -filename $filename -description $testCase.Description
    
    # Close Chrome tab (optional)
    Start-Sleep -Seconds 1
}

Write-Host "`n✅ All screenshots captured successfully!" -ForegroundColor Green
Write-Host "📁 Check the $screenshotsDir folder for your images" -ForegroundColor Blue

# Open screenshots folder
Start-Process explorer -ArgumentList $screenshotsDir

# List captured files
Write-Host "`n📸 Captured Files:" -ForegroundColor Cyan
Get-ChildItem $screenshotsDir -Filter "*.png" | ForEach-Object {
    Write-Host "  - $($_.Name)" -ForegroundColor White
}
