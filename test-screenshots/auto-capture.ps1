# GreenWear Auto Screenshot Capture Script
# Automatically captures and saves screenshots

Write-Host "📸 GreenWear Auto Screenshot Capture Started..." -ForegroundColor Green

# Create screenshots directory if it doesn't exist
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
        WaitTime = 3
    },
    @{
        Name = "02-dashboard"
        Description = "Real-time Dashboard"
        URL = "http://localhost:5173/dashboard"
        WaitTime = 3
    },
    @{
        Name = "03-templates"
        Description = "Monitoring Templates"
        URL = "http://localhost:5173/templates"
        WaitTime = 3
    },
    @{
        Name = "04-generator"
        Description = "Settings Generator"
        URL = "http://localhost:5173/generator"
        WaitTime = 3
    },
    @{
        Name = "05-history"
        Description = "History and Records"
        URL = "http://localhost:5173/history"
        WaitTime = 3
    },
    @{
        Name = "06-api-docs"
        Description = "API Documentation"
        URL = "http://localhost:5173/api-docs"
        WaitTime = 3
    }
)

Write-Host "`n📋 Test Cases to Capture:" -ForegroundColor Cyan
foreach ($testCase in $testCases) {
    Write-Host "  - $($testCase.Description)" -ForegroundColor White
}

Write-Host "`n🎯 Instructions:" -ForegroundColor Yellow
Write-Host "1. Each page will open in Chrome automatically" -ForegroundColor Gray
Write-Host "2. Wait for the page to fully load" -ForegroundColor Gray
Write-Host "3. Press PrintScreen key to capture" -ForegroundColor Gray
Write-Host "4. Open Paint and paste (Ctrl+V)" -ForegroundColor Gray
Write-Host "5. Save as PNG in the screenshots folder" -ForegroundColor Gray
Write-Host "6. Use the suggested filename format" -ForegroundColor Gray

Write-Host "`n📁 Screenshots will be saved in: $screenshotsDir" -ForegroundColor Blue

# Execute each test case
foreach ($testCase in $testCases) {
    Write-Host "`n🔄 Capturing: $($testCase.Description)" -ForegroundColor Yellow
    
    # Open page in Chrome
    Start-Process chrome -ArgumentList $testCase.URL
    
    # Wait for page loading
    Write-Host "⏳ Waiting $($testCase.WaitTime) seconds for page to load..." -ForegroundColor Gray
    Start-Sleep -Seconds $testCase.WaitTime
    
    # Generate filename
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $filename = "$($testCase.Name)-$timestamp.png"
    $filepath = Join-Path $screenshotsDir $filename
    
    Write-Host "📷 Ready to capture!" -ForegroundColor Cyan
    Write-Host "   - Press PrintScreen key now" -ForegroundColor White
    Write-Host "   - Suggested filename: $filename" -ForegroundColor Green
    Write-Host "   - Save location: $filepath" -ForegroundColor Blue
    
    # Wait for user to capture
    Write-Host "   - Press any key when ready for next page..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

Write-Host "`n✅ All test cases completed!" -ForegroundColor Green
Write-Host "📁 Check the $screenshotsDir folder for your captured images" -ForegroundColor Blue

# Open screenshots folder
Start-Process explorer -ArgumentList $screenshotsDir
