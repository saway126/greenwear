# GreenWear Enhanced Auto Screenshot Capture
# With full Windows API access

Write-Host "?벝 GreenWear Enhanced Auto Screenshot Capture Started..." -ForegroundColor Green

# Create screenshots directory
$screenshotsDir = "screenshots"
if (!(Test-Path $screenshotsDir)) {
    New-Item -ItemType Directory -Path $screenshotsDir
    Write-Host "?뱚 Created screenshots directory" -ForegroundColor Yellow
}

# Function to capture with full Windows API access
function Capture-Enhanced {
    param(
        [string]$filename,
        [string]$description,
        [string]$url
    )
    
    try {
        Write-Host "?벜 Enhanced Capture: $description" -ForegroundColor Cyan
        
        # Open Chrome
        Start-Process chrome -ArgumentList $url
        
        # Wait for page to load
        Write-Host "??Waiting for page to load..." -ForegroundColor Gray
        Start-Sleep -Seconds 5
        
        # Auto-scroll
        Write-Host "?봽 Auto-scrolling..." -ForegroundColor Yellow
        Add-Type -AssemblyName System.Windows.Forms
        
        # Scroll to top
        [System.Windows.Forms.SendKeys]::SendWait("{HOME}")
        Start-Sleep -Seconds 1
        
        # Scroll down
        for ($i = 0; $i -lt 8; $i++) {
            [System.Windows.Forms.SendKeys]::SendWait("{PGDN}")
            Start-Sleep -Seconds 0.3
        }
        
        # Scroll back to top
        [System.Windows.Forms.SendKeys]::SendWait("{HOME}")
        Start-Sleep -Seconds 2
        
        # Capture screenshot
        Write-Host "?벝 Capturing screenshot..." -ForegroundColor Cyan
        [System.Windows.Forms.SendKeys]::SendWait("^{PRTSC}")
        Start-Sleep -Seconds 2
        
        # Save to file
        $filepath = Join-Path $screenshotsDir $filename
        
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
        [System.Windows.Forms.SendKeys]::SendWait($filename)
        Start-Sleep -Seconds 1
        
        # Save
        [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
        Start-Sleep -Seconds 2
        
        # Close Paint
        [System.Windows.Forms.SendKeys]::SendWait("%{F4}")
        Start-Sleep -Seconds 1
        
        if (Test-Path $filepath) {
            Write-Host "??Enhanced Capture Success: $filepath" -ForegroundColor Green
            return $true
        } else {
            Write-Host "??Enhanced Capture Failed" -ForegroundColor Red
            return $false
        }
        
    } catch {
        Write-Host "??Enhanced Capture Failed: $($_.Exception.Message)" -ForegroundColor Red
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

Write-Host "
?뱥 Test Cases to Capture:" -ForegroundColor Cyan
foreach ($testCase in $testCases) {
    Write-Host "  - $($testCase.Description)" -ForegroundColor White
}

Write-Host "
?렞 Starting enhanced auto capture..." -ForegroundColor Yellow

# Execute each test case
foreach ($testCase in $testCases) {
    Write-Host "
?봽 Processing: $($testCase.Description)" -ForegroundColor Yellow
    
    # Generate filename
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $filename = "$($testCase.Name)-$timestamp.png"
    
    # Capture
    $success = Capture-Enhanced -filename $filename -description $testCase.Description -url $testCase.URL
    
    if ($success) {
        Write-Host "??Successfully captured: $filename" -ForegroundColor Green
    } else {
        Write-Host "??Failed to capture: $($testCase.Description)" -ForegroundColor Red
    }
    
    # Wait before next capture
    Write-Host "   - Waiting 3 seconds before next capture..." -ForegroundColor Gray
    Start-Sleep -Seconds 3
}

Write-Host "
??Enhanced auto capture process completed!" -ForegroundColor Green
Write-Host "?뱚 Check the $screenshotsDir folder for your images" -ForegroundColor Blue

# List captured files
Write-Host "
?벝 Captured Files:" -ForegroundColor Cyan
Get-ChildItem $screenshotsDir -Filter "*.png" | ForEach-Object {
    Write-Host "  - $($_.Name) ($($_.Length) bytes)" -ForegroundColor White
}

# Open screenshots folder
Start-Process explorer -ArgumentList $screenshotsDir
