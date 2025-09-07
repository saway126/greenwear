# GreenWear Manual Screenshot Workflow
# Semi-automated workflow for efficient screenshot capture

Write-Host "📸 GreenWear Manual Screenshot Workflow Started..." -ForegroundColor Green

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

Write-Host "`n🎯 Manual Workflow Instructions:" -ForegroundColor Yellow
Write-Host "1. Each page will open automatically" -ForegroundColor Gray
Write-Host "2. Use Windows + Shift + S to capture" -ForegroundColor Gray
Write-Host "3. Select the area you want to capture" -ForegroundColor Gray
Write-Host "4. Paste in Paint (Ctrl+V) and save" -ForegroundColor Gray
Write-Host "5. Use the suggested filename" -ForegroundColor Gray

# Execute each test case
foreach ($testCase in $testCases) {
    Write-Host "`n🔄 Processing: $($testCase.Description)" -ForegroundColor Yellow
    
    # Open page in Chrome
    Start-Process chrome -ArgumentList $testCase.URL
    
    # Wait for page to load
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
    Write-Host "   - Save location: $screenshotsDir" -ForegroundColor Blue
    
    # Wait for user to capture
    Write-Host "   - Press Enter when you've saved the screenshot..." -ForegroundColor Yellow
    Read-Host
}

Write-Host "`n✅ Manual workflow completed!" -ForegroundColor Green
Write-Host "📁 Check the $screenshotsDir folder for your images" -ForegroundColor Blue

# List captured files
Write-Host "`n📸 Captured Files:" -ForegroundColor Cyan
Get-ChildItem $screenshotsDir -Filter "*.png" | ForEach-Object {
    Write-Host "  - $($_.Name) ($($_.Length) bytes)" -ForegroundColor White
}

# Open screenshots folder
Start-Process explorer -ArgumentList $screenshotsDir
