# GreenWear Full Auto Screenshot Capture
# Complete automation with auto-scroll and area selection

Write-Host "📸 GreenWear Full Auto Screenshot Capture Started..." -ForegroundColor Green

# Create screenshots directory
$screenshotsDir = "screenshots"
if (!(Test-Path $screenshotsDir)) {
    New-Item -ItemType Directory -Path $screenshotsDir
    Write-Host "📁 Created screenshots directory" -ForegroundColor Yellow
}

# Add Greenshot to PATH if not already there
$greenshotPath = "$env:LOCALAPPDATA\Programs\Greenshot"
if (Test-Path $greenshotPath) {
    $env:PATH += ";$greenshotPath"
}

# Function to auto-scroll and capture full page
function Capture-FullPage {
    param(
        [string]$filename,
        [string]$description,
        [string]$url
    )
    
    try {
        Write-Host "📷 Full Auto Capture: $description" -ForegroundColor Cyan
        
        # Open Chrome with specific window size
        $chromeArgs = @(
            "--new-window",
            "--window-size=1920,1080",
            "--start-maximized",
            $url
        )
        
        $chromeProcess = Start-Process chrome -ArgumentList $chromeArgs -PassThru
        
        # Wait for page to load
        Write-Host "⏳ Waiting for page to load..." -ForegroundColor Gray
        Start-Sleep -Seconds 5
        
        # Auto-scroll to capture full page
        Write-Host "🔄 Auto-scrolling to capture full page..." -ForegroundColor Yellow
        
        # Send scroll commands to capture full page
        Add-Type -AssemblyName System.Windows.Forms
        
        # Scroll to top
        [System.Windows.Forms.SendKeys]::SendWait("{HOME}")
        Start-Sleep -Seconds 1
        
        # Scroll down in steps to capture full page
        for ($i = 0; $i -lt 10; $i++) {
            [System.Windows.Forms.SendKeys]::SendWait("{PGDN}")
            Start-Sleep -Seconds 0.5
        }
        
        # Scroll back to top
        [System.Windows.Forms.SendKeys]::SendWait("{HOME}")
        Start-Sleep -Seconds 2
        
        # Capture full screen
        Write-Host "📸 Capturing full screen..." -ForegroundColor Cyan
        
        # Use Windows built-in screenshot
        [System.Windows.Forms.SendKeys]::SendWait("^{PRTSC}")
        Start-Sleep -Seconds 2
        
        # Save to file
        $filepath = Join-Path $screenshotsDir $filename
        
        # Open Paint and save
        Start-Process mspaint -ArgumentList $filepath
        Start-Sleep -Seconds 2
        
        # Paste screenshot
        [System.Windows.Forms.SendKeys]::SendWait("^v")
        Start-Sleep -Seconds 1
        
        # Save file
        [System.Windows.Forms.SendKeys]::SendWait("^s")
        Start-Sleep -Seconds 2
        
        # Close Paint
        [System.Windows.Forms.SendKeys]::SendWait("%{F4}")
        Start-Sleep -Seconds 1
        
        # Close Chrome
        $chromeProcess.CloseMainWindow()
        
        if (Test-Path $filepath) {
            Write-Host "✅ Full Auto Capture Success: $filepath" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ Full Auto Capture Failed" -ForegroundColor Red
            return $false
        }
        
    } catch {
        Write-Host "❌ Full Auto Capture Failed: $($_.Exception.Message)" -ForegroundColor Red
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

Write-Host "`n🎯 Starting full auto capture..." -ForegroundColor Yellow

# Execute each test case
foreach ($testCase in $testCases) {
    Write-Host "`n🔄 Processing: $($testCase.Description)" -ForegroundColor Yellow
    
    # Generate filename
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $filename = "$($testCase.Name)-$timestamp.png"
    
    # Capture full page
    $success = Capture-FullPage -filename $filename -description $testCase.Description -url $testCase.URL
    
    if ($success) {
        Write-Host "✅ Successfully captured: $filename" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to capture: $($testCase.Description)" -ForegroundColor Red
    }
    
    # Wait before next capture
    Write-Host "   - Waiting 3 seconds before next capture..." -ForegroundColor Gray
    Start-Sleep -Seconds 3
}

Write-Host "`n✅ Full auto capture process completed!" -ForegroundColor Green
Write-Host "📁 Check the $screenshotsDir folder for your images" -ForegroundColor Blue

# List captured files
Write-Host "`n📸 Captured Files:" -ForegroundColor Cyan
Get-ChildItem $screenshotsDir -Filter "*.png" | ForEach-Object {
    Write-Host "  - $($_.Name) ($($_.Length) bytes)" -ForegroundColor White
}

# Open screenshots folder
Start-Process explorer -ArgumentList $screenshotsDir
