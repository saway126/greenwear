# GreenWear Simple Auto Screenshot Capture
# Simplified automation with auto-scroll

Write-Host "📸 GreenWear Simple Auto Screenshot Capture Started..." -ForegroundColor Green

# Create screenshots directory
$screenshotsDir = "screenshots"
if (!(Test-Path $screenshotsDir)) {
    New-Item -ItemType Directory -Path $screenshotsDir
    Write-Host "📁 Created screenshots directory" -ForegroundColor Yellow
}

# Function to auto-scroll and capture
function Capture-Auto {
    param(
        [string]$filename,
        [string]$description,
        [string]$url
    )
    
    try {
        Write-Host "📷 Auto Capture: $description" -ForegroundColor Cyan
        
        # Open Chrome
        Start-Process chrome -ArgumentList $url
        
        # Wait for page to load
        Write-Host "⏳ Waiting for page to load..." -ForegroundColor Gray
        Start-Sleep -Seconds 5
        
        # Auto-scroll to capture full page
        Write-Host "🔄 Auto-scrolling..." -ForegroundColor Yellow
        
        Add-Type -AssemblyName System.Windows.Forms
        
        # Scroll to top
        [System.Windows.Forms.SendKeys]::SendWait("{HOME}")
        Start-Sleep -Seconds 1
        
        # Scroll down in steps
        for ($i = 0; $i -lt 8; $i++) {
            [System.Windows.Forms.SendKeys]::SendWait("{PGDN}")
            Start-Sleep -Seconds 0.3
        }
        
        # Scroll back to top
        [System.Windows.Forms.SendKeys]::SendWait("{HOME}")
        Start-Sleep -Seconds 2
        
        # Capture screenshot
        Write-Host "📸 Capturing screenshot..." -ForegroundColor Cyan
        [System.Windows.Forms.SendKeys]::SendWait("^{PRTSC}")
        Start-Sleep -Seconds 2
        
        # Save to file
        $filepath = Join-Path $screenshotsDir $filename
        
        # Open Paint
        Start-Process mspaint
        Start-Sleep -Seconds 2
        
        # Paste screenshot
        [System.Windows.Forms.SendKeys]::SendWait("^v")
        Start-Sleep -Seconds 1
        
        # Save file
        [System.Windows.Forms.SendKeys]::SendWait("^s")
        Start-Sleep -Seconds 1
        
        # Type filename
        [System.Windows.Forms.SendKeys]::SendWait($filename)
        Start-Sleep -Seconds 1
        
        # Save
        [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
        Start-Sleep -Seconds 2
        
        # Close Paint
        [System.Windows.Forms.SendKeys]::SendWait("%{F4}")
        Start-Sleep -Seconds 1
        
        if (Test-Path $filepath) {
            Write-Host "✅ Auto Capture Success: $filepath" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ Auto Capture Failed" -ForegroundColor Red
            return $false
        }
        
    } catch {
        Write-Host "❌ Auto Capture Failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
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

Write-Host "`n🎯 Starting simple auto capture..." -ForegroundColor Yellow
Write-Host "💡 This will automatically:" -ForegroundColor Blue
Write-Host "   1. Open each page in Chrome" -ForegroundColor Gray
Write-Host "   2. Auto-scroll to capture full content" -ForegroundColor Gray
Write-Host "   3. Take screenshot and save to Paint" -ForegroundColor Gray
Write-Host "   4. Save with suggested filename" -ForegroundColor Gray

# Execute each test case
foreach ($testCase in $testCases) {
    Write-Host "`n🔄 Processing: $($testCase.Description)" -ForegroundColor Yellow
    
    # Generate filename
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $filename = "$($testCase.Name)-$timestamp.png"
    
    # Capture
    $success = Capture-Auto -filename $filename -description $testCase.Description -url $testCase.URL
    
    if ($success) {
        Write-Host "✅ Successfully captured: $filename" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to capture: $($testCase.Description)" -ForegroundColor Red
    }
    
    # Wait before next capture
    Write-Host "   - Waiting 5 seconds before next capture..." -ForegroundColor Gray
    Start-Sleep -Seconds 5
}

Write-Host "`n✅ Simple auto capture process completed!" -ForegroundColor Green
Write-Host "📁 Check the $screenshotsDir folder for your images" -ForegroundColor Blue

# List captured files
Write-Host "`n📸 Captured Files:" -ForegroundColor Cyan
Get-ChildItem $screenshotsDir -Filter "*.png" | ForEach-Object {
    Write-Host "  - $($_.Name) ($($_.Length) bytes)" -ForegroundColor White
}

# Open screenshots folder
Start-Process explorer -ArgumentList $screenshotsDir
