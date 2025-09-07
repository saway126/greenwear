# GreenWear Test Screenshot Capture Script
# Run in PowerShell

Write-Host "📸 GreenWear Test Screenshot Capture Started..." -ForegroundColor Green

# Test cases list
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

# Execute each test case
foreach ($testCase in $testCases) {
    Write-Host "🔄 Test Case: $($testCase.Description)" -ForegroundColor Yellow
    
    # Open page in Chrome
    Start-Process chrome -ArgumentList $testCase.URL
    
    # Wait for page loading
    Start-Sleep -Seconds 3
    
    # Screenshot (manual capture required)
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $filename = "$($testCase.Name)-$timestamp.png"
    $filepath = Join-Path $PSScriptRoot $filename
    
    # PrintScreen key simulation (manual capture needed)
    Write-Host "📷 Screenshot: $filename" -ForegroundColor Cyan
    Write-Host "   - Press PrintScreen key in Chrome to capture" -ForegroundColor Gray
    Write-Host "   - Filename: $filename" -ForegroundColor Gray
    
    # Wait before next test
    Start-Sleep -Seconds 2
}

Write-Host "✅ All test cases completed!" -ForegroundColor Green
Write-Host "📁 Save captured images in test-screenshots folder" -ForegroundColor Blue
