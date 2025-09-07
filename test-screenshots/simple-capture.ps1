# GreenWear Simple Screenshot Capture Script
# Uses Windows built-in tools for screenshot capture

Write-Host "📸 GreenWear Simple Screenshot Capture Started..." -ForegroundColor Green

# Create screenshots directory
$screenshotsDir = "screenshots"
if (!(Test-Path $screenshotsDir)) {
    New-Item -ItemType Directory -Path $screenshotsDir
    Write-Host "📁 Created screenshots directory" -ForegroundColor Yellow
}

# Test cases
$testCases = @(
    @{
        Name = "01-homepage"
        Description = "Homepage Main Screen"
        URL = "http://localhost:5173"
    },
    @{
        Name = "02-dashboard"
        Description = "Real-time Dashboard"
        URL = "http://localhost:5173/dashboard"
    },
    @{
        Name = "03-templates"
        Description = "Monitoring Templates"
        URL = "http://localhost:5173/templates"
    },
    @{
        Name = "04-generator"
        Description = "Settings Generator"
        URL = "http://localhost:5173/generator"
    },
    @{
        Name = "05-history"
        Description = "History and Records"
        URL = "http://localhost:5173/history"
    },
    @{
        Name = "06-api-docs"
        Description = "API Documentation"
        URL = "http://localhost:5173/api-docs"
    }
)

Write-Host "`n📋 Test Cases to Capture:" -ForegroundColor Cyan
foreach ($testCase in $testCases) {
    Write-Host "  - $($testCase.Description)" -ForegroundColor White
}

Write-Host "`n🎯 Instructions:" -ForegroundColor Yellow
Write-Host "1. Each page will open in Chrome" -ForegroundColor Gray
Write-Host "2. Wait for the page to load completely" -ForegroundColor Gray
Write-Host "3. Press Windows + Shift + S to capture" -ForegroundColor Gray
Write-Host "4. Select the area you want to capture" -ForegroundColor Gray
Write-Host "5. The image will be copied to clipboard" -ForegroundColor Gray
Write-Host "6. Open Paint and paste (Ctrl+V)" -ForegroundColor Gray
Write-Host "7. Save with the suggested filename" -ForegroundColor Gray

Write-Host "`n📁 Screenshots will be saved in: $screenshotsDir" -ForegroundColor Blue

# Execute each test case
foreach ($testCase in $testCases) {
    Write-Host "`n🔄 Capturing: $($testCase.Description)" -ForegroundColor Yellow
    
    # Open page in Chrome
    Start-Process chrome -ArgumentList $testCase.URL
    
    # Wait for page loading
    Write-Host "⏳ Waiting 5 seconds for page to load..." -ForegroundColor Gray
    Start-Sleep -Seconds 5
    
    # Generate filename
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $filename = "$($testCase.Name)-$timestamp.png"
    $filepath = Join-Path $screenshotsDir $filename
    
    Write-Host "📷 Ready to capture!" -ForegroundColor Cyan
    Write-Host "   - Press Windows + Shift + S now" -ForegroundColor White
    Write-Host "   - Select the area to capture" -ForegroundColor White
    Write-Host "   - Suggested filename: $filename" -ForegroundColor Green
    Write-Host "   - Save location: $filepath" -ForegroundColor Blue
    
    # Wait for user to capture
    Write-Host "   - Press Enter when you've saved the screenshot..." -ForegroundColor Yellow
    Read-Host
}

Write-Host "`n✅ All test cases completed!" -ForegroundColor Green
Write-Host "📁 Check the $screenshotsDir folder for your captured images" -ForegroundColor Blue

# Open screenshots folder
Start-Process explorer -ArgumentList $screenshotsDir
