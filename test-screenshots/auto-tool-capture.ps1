# GreenWear Auto Tool Screenshot Capture
# Enhanced script with better tool detection and automation

Write-Host "📸 GreenWear Auto Tool Screenshot Capture Started..." -ForegroundColor Green

# Create screenshots directory
$screenshotsDir = "screenshots"
if (!(Test-Path $screenshotsDir)) {
    New-Item -ItemType Directory -Path $screenshotsDir
    Write-Host "📁 Created screenshots directory" -ForegroundColor Yellow
}

# Function to find installed screenshot tools
function Find-ScreenshotTools {
    $tools = @{}
    
    # Check for Greenshot
    $greenshotPaths = @(
        "C:\Program Files\Greenshot\Greenshot.exe",
        "C:\Program Files (x86)\Greenshot\Greenshot.exe",
        "$env:APPDATA\Greenshot\Greenshot.exe",
        "$env:LOCALAPPDATA\Programs\Greenshot\Greenshot.exe"
    )
    
    foreach ($path in $greenshotPaths) {
        if (Test-Path $path) {
            $tools["Greenshot"] = $path
            break
        }
    }
    
    # Check for Lightshot
    $lightshotPaths = @(
        "C:\Program Files\Lightshot\Lightshot.exe",
        "C:\Program Files (x86)\Lightshot\Lightshot.exe"
    )
    
    foreach ($path in $lightshotPaths) {
        if (Test-Path $path) {
            $tools["Lightshot"] = $path
            break
        }
    }
    
    # Check for Snipping Tool
    $snippingTool = "C:\Windows\System32\SnippingTool.exe"
    if (Test-Path $snippingTool) {
        $tools["SnippingTool"] = $snippingTool
    }
    
    return $tools
}

# Function to capture screenshot with available tools
function Capture-Screenshot-Auto {
    param(
        [string]$filename,
        [string]$description,
        [hashtable]$tools
    )
    
    $filepath = Join-Path $screenshotsDir $filename
    
    # Try Greenshot first (best for automation)
    if ($tools.ContainsKey("Greenshot")) {
        try {
            Write-Host "📷 Using Greenshot for $description" -ForegroundColor Cyan
            # Start Greenshot capture
            Start-Process $tools["Greenshot"] -ArgumentList "--capture" -Wait
            Write-Host "✅ Greenshot capture completed" -ForegroundColor Green
            Write-Host "   - Please save the screenshot manually" -ForegroundColor Gray
            Write-Host "   - Suggested filename: $filename" -ForegroundColor Gray
            Write-Host "   - Save location: $screenshotsDir" -ForegroundColor Gray
            return $true
        } catch {
            Write-Host "❌ Greenshot Failed: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    
    # Try Windows built-in screenshot
    try {
        Write-Host "📷 Using Windows Screenshot for $description" -ForegroundColor Cyan
        Add-Type -AssemblyName System.Windows.Forms
        [System.Windows.Forms.SendKeys]::SendWait("^{PRTSC}")
        Start-Sleep -Seconds 2
        
        Write-Host "✅ Screenshot copied to clipboard" -ForegroundColor Green
        Write-Host "   - Open Paint and paste (Ctrl+V)" -ForegroundColor Gray
        Write-Host "   - Save as: $filename" -ForegroundColor Gray
        Write-Host "   - Location: $screenshotsDir" -ForegroundColor Gray
        
        return $true
    } catch {
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

# Find available tools
Write-Host "🔍 Detecting available screenshot tools..." -ForegroundColor Yellow
$tools = Find-ScreenshotTools

if ($tools.Count -eq 0) {
    Write-Host "❌ No screenshot tools found!" -ForegroundColor Red
    Write-Host "💡 Please install Greenshot or use Windows built-in tools" -ForegroundColor Blue
    Write-Host "   - Run: .\install-greenshot.ps1" -ForegroundColor Gray
} else {
    Write-Host "✅ Found tools:" -ForegroundColor Green
    foreach ($tool in $tools.Keys) {
        Write-Host "   - $tool" -ForegroundColor White
    }
}

Write-Host "`n📋 Test Cases to Capture:" -ForegroundColor Cyan
foreach ($testCase in $testCases) {
    Write-Host "  - $($testCase.Description)" -ForegroundColor White
}

Write-Host "`n🎯 Starting automatic capture..." -ForegroundColor Yellow

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
    
    # Capture screenshot
    $success = Capture-Screenshot-Auto -filename $filename -description $testCase.Description -tools $tools
    
    if ($success) {
        Write-Host "✅ Successfully captured: $filename" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to capture: $($testCase.Description)" -ForegroundColor Red
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
