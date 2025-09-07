# GreenWear Tool-based Screenshot Capture Script
# Using Snipping Tool, Greenshot, and Lightshot for automatic capture

Write-Host "📸 GreenWear Tool-based Screenshot Capture Started..." -ForegroundColor Green

# Create screenshots directory
$screenshotsDir = "screenshots"
if (!(Test-Path $screenshotsDir)) {
    New-Item -ItemType Directory -Path $screenshotsDir
    Write-Host "📁 Created screenshots directory" -ForegroundColor Yellow
}

# Method 1: Using Windows Snipping Tool
function Capture-Screenshot-SnippingTool {
    param(
        [string]$filename,
        [string]$description
    )
    
    try {
        Write-Host "📷 Snipping Tool: Capturing $description" -ForegroundColor Cyan
        
        # Check if Snipping Tool exists
        $snippingTool = "C:\Windows\System32\SnippingTool.exe"
        if (Test-Path $snippingTool) {
            # Start Snipping Tool
            Start-Process $snippingTool
            
            Write-Host "✅ Snipping Tool opened - please capture manually" -ForegroundColor Green
            Write-Host "   - Use the tool to capture the screen" -ForegroundColor Gray
            Write-Host "   - Save as: $filename" -ForegroundColor Gray
            Write-Host "   - Location: $screenshotsDir" -ForegroundColor Gray
            
            return $true
        } else {
            Write-Host "❌ Snipping Tool not found" -ForegroundColor Red
            return $false
        }
    }
    catch {
        Write-Host "❌ Snipping Tool Failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Method 2: Using Greenshot (if installed)
function Capture-Screenshot-Greenshot {
    param(
        [string]$filename,
        [string]$description
    )
    
    try {
        Write-Host "📷 Greenshot: Capturing $description" -ForegroundColor Cyan
        
        # Check common Greenshot locations
        $greenshotPaths = @(
            "C:\Program Files\Greenshot\Greenshot.exe",
            "C:\Program Files (x86)\Greenshot\Greenshot.exe",
            "$env:APPDATA\Greenshot\Greenshot.exe"
        )
        
        $greenshot = $null
        foreach ($path in $greenshotPaths) {
            if (Test-Path $path) {
                $greenshot = $path
                break
            }
        }
        
        if ($greenshot) {
            $filepath = Join-Path $screenshotsDir $filename
            # Greenshot command line options
            & $greenshot --capture --save "$filepath"
            Write-Host "✅ Greenshot Success: $filepath" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ Greenshot not found" -ForegroundColor Red
            return $false
        }
    }
    catch {
        Write-Host "❌ Greenshot Failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Method 3: Using Lightshot (if installed)
function Capture-Screenshot-Lightshot {
    param(
        [string]$filename,
        [string]$description
    )
    
    try {
        Write-Host "📷 Lightshot: Capturing $description" -ForegroundColor Cyan
        
        # Check common Lightshot locations
        $lightshotPaths = @(
            "C:\Program Files\Lightshot\Lightshot.exe",
            "C:\Program Files (x86)\Lightshot\Lightshot.exe"
        )
        
        $lightshot = $null
        foreach ($path in $lightshotPaths) {
            if (Test-Path $path) {
                $lightshot = $path
                break
            }
        }
        
        if ($lightshot) {
            # Lightshot doesn't have direct command line support
            Start-Process $lightshot
            Write-Host "✅ Lightshot opened - please capture manually" -ForegroundColor Green
            Write-Host "   - Use Lightshot to capture the screen" -ForegroundColor Gray
            Write-Host "   - Save as: $filename" -ForegroundColor Gray
            return $true
        } else {
            Write-Host "❌ Lightshot not found" -ForegroundColor Red
            return $false
        }
    }
    catch {
        Write-Host "❌ Lightshot Failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Method 4: Using Windows built-in screenshot
function Capture-Screenshot-Windows {
    param(
        [string]$filename,
        [string]$description
    )
    
    try {
        Write-Host "📷 Windows Screenshot: Capturing $description" -ForegroundColor Cyan
        
        # Use Windows + PrintScreen simulation
        Add-Type -AssemblyName System.Windows.Forms
        [System.Windows.Forms.SendKeys]::SendWait("^{PRTSC}")
        Start-Sleep -Seconds 2
        
        Write-Host "✅ Screenshot copied to clipboard" -ForegroundColor Green
        Write-Host "   - Open Paint and paste (Ctrl+V)" -ForegroundColor Gray
        Write-Host "   - Save as: $filename" -ForegroundColor Gray
        
        return $true
    }
    catch {
        Write-Host "❌ Windows Screenshot Failed: $($_.Exception.Message)" -ForegroundColor Red
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

Write-Host "`n🎯 Trying different screenshot tools..." -ForegroundColor Yellow

# Execute each test case
foreach ($testCase in $testCases) {
    Write-Host "`n🔄 Processing: $($testCase.Description)" -ForegroundColor Yellow
    
    # Open page in Chrome
    Start-Process chrome -ArgumentList $testCase.URL
    
    # Wait for page loading
    Write-Host "⏳ Waiting 5 seconds for page to load..." -ForegroundColor Gray
    Start-Sleep -Seconds 5
    
    # Generate filename
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $filename = "$($testCase.Name)-$timestamp.png"
    
    # Try different methods
    $success = $false
    
    # Method 1: Snipping Tool
    if (-not $success) {
        $success = Capture-Screenshot-SnippingTool -filename $filename -description $testCase.Description
    }
    
    # Method 2: Greenshot
    if (-not $success) {
        $success = Capture-Screenshot-Greenshot -filename $filename -description $testCase.Description
    }
    
    # Method 3: Lightshot
    if (-not $success) {
        $success = Capture-Screenshot-Lightshot -filename $filename -description $testCase.Description
    }
    
    # Method 4: Windows built-in
    if (-not $success) {
        $success = Capture-Screenshot-Windows -filename $filename -description $testCase.Description
    }
    
    if ($success) {
        Write-Host "✅ Successfully initiated capture: $filename" -ForegroundColor Green
    } else {
        Write-Host "❌ All methods failed for: $($testCase.Description)" -ForegroundColor Red
    }
    
    # Wait before next capture
    Write-Host "   - Press Enter when ready for next page..." -ForegroundColor Yellow
    Read-Host
}

Write-Host "`n✅ Capture process completed!" -ForegroundColor Green
Write-Host "📁 Check the $screenshotsDir folder for your images" -ForegroundColor Blue

# List captured files
Write-Host "`n📸 Captured Files:" -ForegroundColor Cyan
Get-ChildItem $screenshotsDir -Filter "*.png" | ForEach-Object {
    Write-Host "  - $($_.Name) ($($_.Length) bytes)" -ForegroundColor White
}

# Open screenshots folder
Start-Process explorer -ArgumentList $screenshotsDir
