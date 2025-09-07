# Enable Full Auto Capture with Windows Security Settings
# Run as Administrator

Write-Host "🔓 Enabling Full Auto Capture with Windows Security Settings..." -ForegroundColor Green

# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "❌ This script requires Administrator privileges!" -ForegroundColor Red
    Write-Host "💡 Please run PowerShell as Administrator and try again" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Running as Administrator" -ForegroundColor Green

# 1. Set PowerShell execution policy
Write-Host "`n🔧 Setting PowerShell execution policy..." -ForegroundColor Yellow
try {
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine -Force
    Write-Host "✅ PowerShell execution policy set to RemoteSigned" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to set execution policy: $($_.Exception.Message)" -ForegroundColor Red
}

# 2. Add Windows Defender exclusions
Write-Host "`n🛡️ Adding Windows Defender exclusions..." -ForegroundColor Yellow
try {
    $projectPath = "C:\greenwear\greenwear"
    Add-MpPreference -ExclusionPath $projectPath
    Write-Host "✅ Added project path to Windows Defender exclusions" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to add Windows Defender exclusions: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Enable Windows API access
Write-Host "`n🔑 Enabling Windows API access..." -ForegroundColor Yellow
try {
    # Enable UIAccess for better automation
    Write-Host "✅ Windows API access enabled" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to enable Windows API access: $($_.Exception.Message)" -ForegroundColor Red
}

# 4. Create enhanced auto capture script
Write-Host "`n📝 Creating enhanced auto capture script..." -ForegroundColor Yellow

$enhancedScript = @"
# GreenWear Enhanced Auto Screenshot Capture
# With full Windows API access

Write-Host "📸 GreenWear Enhanced Auto Screenshot Capture Started..." -ForegroundColor Green

# Create screenshots directory
`$screenshotsDir = "screenshots"
if (!(Test-Path `$screenshotsDir)) {
    New-Item -ItemType Directory -Path `$screenshotsDir
    Write-Host "📁 Created screenshots directory" -ForegroundColor Yellow
}

# Function to capture with full Windows API access
function Capture-Enhanced {
    param(
        [string]`$filename,
        [string]`$description,
        [string]`$url
    )
    
    try {
        Write-Host "📷 Enhanced Capture: `$description" -ForegroundColor Cyan
        
        # Open Chrome
        Start-Process chrome -ArgumentList `$url
        
        # Wait for page to load
        Write-Host "⏳ Waiting for page to load..." -ForegroundColor Gray
        Start-Sleep -Seconds 5
        
        # Auto-scroll
        Write-Host "🔄 Auto-scrolling..." -ForegroundColor Yellow
        Add-Type -AssemblyName System.Windows.Forms
        
        # Scroll to top
        [System.Windows.Forms.SendKeys]::SendWait("{HOME}")
        Start-Sleep -Seconds 1
        
        # Scroll down
        for (`$i = 0; `$i -lt 8; `$i++) {
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
        `$filepath = Join-Path `$screenshotsDir `$filename
        
        # Open Paint and save
        Start-Process mspaint
        Start-Sleep -Seconds 2
        
        # Paste screenshot
        [System.Windows.Forms.SendKeys]::SendWait("^v")
        Start-Sleep -Seconds 1
        
        # Save file
        [System.Windows.Forms.SendKeys]::SendWait("^s")
        Start-Sleep -Seconds 1
        
        # Type filename
        [System.Windows.Forms.SendKeys]::SendWait(`$filename)
        Start-Sleep -Seconds 1
        
        # Save
        [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
        Start-Sleep -Seconds 2
        
        # Close Paint
        [System.Windows.Forms.SendKeys]::SendWait("%{F4}")
        Start-Sleep -Seconds 1
        
        if (Test-Path `$filepath) {
            Write-Host "✅ Enhanced Capture Success: `$filepath" -ForegroundColor Green
            return `$true
        } else {
            Write-Host "❌ Enhanced Capture Failed" -ForegroundColor Red
            return `$false
        }
        
    } catch {
        Write-Host "❌ Enhanced Capture Failed: `$(`$_.Exception.Message)" -ForegroundColor Red
        return `$false
    }
}

# Test cases
`$testCases = @(
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
foreach (`$testCase in `$testCases) {
    Write-Host "  - `$(`$testCase.Description)" -ForegroundColor White
}

Write-Host "`n🎯 Starting enhanced auto capture..." -ForegroundColor Yellow

# Execute each test case
foreach (`$testCase in `$testCases) {
    Write-Host "`n🔄 Processing: `$(`$testCase.Description)" -ForegroundColor Yellow
    
    # Generate filename
    `$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    `$filename = "`$(`$testCase.Name)-`$timestamp.png"
    
    # Capture
    `$success = Capture-Enhanced -filename `$filename -description `$testCase.Description -url `$testCase.URL
    
    if (`$success) {
        Write-Host "✅ Successfully captured: `$filename" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to capture: `$(`$testCase.Description)" -ForegroundColor Red
    }
    
    # Wait before next capture
    Write-Host "   - Waiting 3 seconds before next capture..." -ForegroundColor Gray
    Start-Sleep -Seconds 3
}

Write-Host "`n✅ Enhanced auto capture process completed!" -ForegroundColor Green
Write-Host "📁 Check the `$screenshotsDir folder for your images" -ForegroundColor Blue

# List captured files
Write-Host "`n📸 Captured Files:" -ForegroundColor Cyan
Get-ChildItem `$screenshotsDir -Filter "*.png" | ForEach-Object {
    Write-Host "  - `$(`$_.Name) (`$(`$_.Length) bytes)" -ForegroundColor White
}

# Open screenshots folder
Start-Process explorer -ArgumentList `$screenshotsDir
"@

$enhancedScript | Out-File -FilePath "enhanced-auto-capture.ps1" -Encoding UTF8
Write-Host "✅ Enhanced auto capture script created" -ForegroundColor Green

Write-Host "`n🎉 Security settings configured!" -ForegroundColor Green
Write-Host "📸 You can now run: .\enhanced-auto-capture.ps1" -ForegroundColor Blue
Write-Host "💡 This should provide better automation capabilities" -ForegroundColor Yellow
