# GreenWear External Tool Screenshot Capture
# Using external tools for automatic screenshot capture

Write-Host "📸 GreenWear External Tool Screenshot Capture Started..." -ForegroundColor Green

# Create screenshots directory
$screenshotsDir = "screenshots"
if (!(Test-Path $screenshotsDir)) {
    New-Item -ItemType Directory -Path $screenshotsDir
    Write-Host "📁 Created screenshots directory" -ForegroundColor Yellow
}

# Method 1: Using NirCmd (if available)
function Capture-Screenshot-NirCmd {
    param(
        [string]$filename,
        [string]$description
    )
    
    try {
        Write-Host "📷 NirCmd: Capturing $description" -ForegroundColor Cyan
        
        # Check if NirCmd is available
        $nircmd = Get-Command nircmd -ErrorAction SilentlyContinue
        if ($nircmd) {
            $filepath = Join-Path $screenshotsDir $filename
            & nircmd savescreenshot $filepath
            Write-Host "✅ NirCmd Success: $filepath" -ForegroundColor Green
            return $true
        } else {
            Write-Host "⚠️ NirCmd not found" -ForegroundColor Yellow
            return $false
        }
    }
    catch {
        Write-Host "❌ NirCmd Failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Method 2: Using ImageMagick (if available)
function Capture-Screenshot-ImageMagick {
    param(
        [string]$filename,
        [string]$description
    )
    
    try {
        Write-Host "📷 ImageMagick: Capturing $description" -ForegroundColor Cyan
        
        # Check if ImageMagick is available
        $magick = Get-Command magick -ErrorAction SilentlyContinue
        if ($magick) {
            $filepath = Join-Path $screenshotsDir $filename
            & magick screenshot $filepath
            Write-Host "✅ ImageMagick Success: $filepath" -ForegroundColor Green
            return $true
        } else {
            Write-Host "⚠️ ImageMagick not found" -ForegroundColor Yellow
            return $false
        }
    }
    catch {
        Write-Host "❌ ImageMagick Failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Method 3: Using PowerShell with different approach
function Capture-Screenshot-PowerShell {
    param(
        [string]$filename,
        [string]$description
    )
    
    try {
        Write-Host "📷 PowerShell: Capturing $description" -ForegroundColor Cyan
        
        # Try using Add-Type with different approach
        $code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class ScreenCapture
{
    [DllImport("user32.dll")]
    private static extern IntPtr GetDesktopWindow();
    
    [DllImport("user32.dll")]
    private static extern IntPtr GetWindowDC(IntPtr hWnd);
    
    [DllImport("user32.dll")]
    private static extern IntPtr ReleaseDC(IntPtr hWnd, IntPtr hDC);
    
    [DllImport("gdi32.dll")]
    private static extern IntPtr CreateCompatibleDC(IntPtr hdc);
    
    [DllImport("gdi32.dll")]
    private static extern IntPtr CreateCompatibleBitmap(IntPtr hdc, int nWidth, int nHeight);
    
    [DllImport("gdi32.dll")]
    private static extern IntPtr SelectObject(IntPtr hdc, IntPtr hgdiobj);
    
    [DllImport("gdi32.dll")]
    private static extern bool DeleteDC(IntPtr hdc);
    
    [DllImport("gdi32.dll")]
    private static extern bool DeleteObject(IntPtr hObject);
    
    [DllImport("gdi32.dll")]
    private static extern bool BitBlt(IntPtr hdc, int nXDest, int nYDest, int nWidth, int nHeight, IntPtr hdcSrc, int nXSrc, int nYSrc, int dwRop);
    
    public static bool CaptureScreen(string filename)
    {
        try
        {
            IntPtr desktop = GetDesktopWindow();
            IntPtr desktopDC = GetWindowDC(desktop);
            IntPtr memoryDC = CreateCompatibleDC(desktopDC);
            
            int width = 1920; // Default width
            int height = 1080; // Default height
            
            IntPtr bitmap = CreateCompatibleBitmap(desktopDC, width, height);
            IntPtr oldBitmap = SelectObject(memoryDC, bitmap);
            
            BitBlt(memoryDC, 0, 0, width, height, desktopDC, 0, 0, 0x00CC0020);
            
            Bitmap bmp = Image.FromHbitmap(bitmap);
            bmp.Save(filename, ImageFormat.Png);
            
            SelectObject(memoryDC, oldBitmap);
            DeleteObject(bitmap);
            DeleteDC(memoryDC);
            ReleaseDC(desktop, desktopDC);
            
            return true;
        }
        catch
        {
            return false;
        }
    }
}
"@
        
        Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing
        
        $filepath = Join-Path $screenshotsDir $filename
        $result = [ScreenCapture]::CaptureScreen($filepath)
        
        if ($result) {
            Write-Host "✅ PowerShell Success: $filepath" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ PowerShell Failed" -ForegroundColor Red
            return $false
        }
    }
    catch {
        Write-Host "❌ PowerShell Failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Method 4: Using Windows built-in tools
function Capture-Screenshot-Windows {
    param(
        [string]$filename,
        [string]$description
    )
    
    try {
        Write-Host "📷 Windows: Capturing $description" -ForegroundColor Cyan
        
        # Try using Windows built-in screenshot tool
        $filepath = Join-Path $screenshotsDir $filename
        
        # Use Windows + PrintScreen simulation
        Add-Type -AssemblyName System.Windows.Forms
        [System.Windows.Forms.SendKeys]::SendWait("^{PRTSC}")
        Start-Sleep -Seconds 1
        
        # This won't work automatically, but let's try
        Write-Host "⚠️ Windows method requires manual intervention" -ForegroundColor Yellow
        return $false
    }
    catch {
        Write-Host "❌ Windows Failed: $($_.Exception.Message)" -ForegroundColor Red
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
    }
)

Write-Host "`n📋 Test Cases to Capture:" -ForegroundColor Cyan
foreach ($testCase in $testCases) {
    Write-Host "  - $($testCase.Description)" -ForegroundColor White
}

Write-Host "`n🎯 Trying external tools and alternative methods..." -ForegroundColor Yellow

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
    
    # Method 1: NirCmd
    if (-not $success) {
        $success = Capture-Screenshot-NirCmd -filename $filename -description $testCase.Description
    }
    
    # Method 2: ImageMagick
    if (-not $success) {
        $success = Capture-Screenshot-ImageMagick -filename $filename -description $testCase.Description
    }
    
    # Method 3: PowerShell (improved)
    if (-not $success) {
        $success = Capture-Screenshot-PowerShell -filename $filename -description $testCase.Description
    }
    
    # Method 4: Windows built-in
    if (-not $success) {
        $success = Capture-Screenshot-Windows -filename $filename -description $testCase.Description
    }
    
    if ($success) {
        Write-Host "✅ Successfully captured: $filename" -ForegroundColor Green
    } else {
        Write-Host "❌ All methods failed for: $($testCase.Description)" -ForegroundColor Red
    }
    
    # Wait before next capture
    Start-Sleep -Seconds 2
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
