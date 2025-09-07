# GreenWear Advanced Screenshot Capture Script
# Multiple methods for automatic screenshot capture

Write-Host "📸 GreenWear Advanced Screenshot Capture Started..." -ForegroundColor Green

# Create screenshots directory
$screenshotsDir = "screenshots"
if (!(Test-Path $screenshotsDir)) {
    New-Item -ItemType Directory -Path $screenshotsDir
    Write-Host "📁 Created screenshots directory" -ForegroundColor Yellow
}

# Method 1: Using Windows Forms (improved)
function Capture-Screenshot-Forms {
    param(
        [string]$filename,
        [string]$description
    )
    
    try {
        Write-Host "📷 Method 1: Capturing $description" -ForegroundColor Cyan
        
        Add-Type -AssemblyName System.Windows.Forms
        Add-Type -AssemblyName System.Drawing
        
        # Get screen dimensions
        $screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
        $width = $screen.Width
        $height = $screen.Height
        
        # Create bitmap
        $bitmap = New-Object System.Drawing.Bitmap $width, $height
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        
        # Capture screen
        $graphics.CopyFromScreen(0, 0, 0, 0, $bitmap.Size)
        
        # Save image
        $filepath = Join-Path $screenshotsDir $filename
        $bitmap.Save($filepath, [System.Drawing.Imaging.ImageFormat]::Png)
        
        # Cleanup
        $graphics.Dispose()
        $bitmap.Dispose()
        
        Write-Host "✅ Method 1 Success: $filepath" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Method 1 Failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Method 2: Using PowerShell COM objects
function Capture-Screenshot-COM {
    param(
        [string]$filename,
        [string]$description
    )
    
    try {
        Write-Host "📷 Method 2: Capturing $description" -ForegroundColor Cyan
        
        # Create COM object for image manipulation
        $image = New-Object -ComObject WIA.ImageFile
        $device = New-Object -ComObject WIA.DeviceManager
        
        # This method might not work for screenshots, but let's try
        Write-Host "⚠️ Method 2: COM objects not suitable for screenshots" -ForegroundColor Yellow
        return $false
    }
    catch {
        Write-Host "❌ Method 2 Failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Method 3: Using Windows API calls
function Capture-Screenshot-API {
    param(
        [string]$filename,
        [string]$description
    )
    
    try {
        Write-Host "📷 Method 3: Capturing $description" -ForegroundColor Cyan
        
        # Define Windows API functions
        $code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
using System.Windows.Forms;

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
    
    public static void CaptureScreen(string filename)
    {
        IntPtr desktop = GetDesktopWindow();
        IntPtr desktopDC = GetWindowDC(desktop);
        IntPtr memoryDC = CreateCompatibleDC(desktopDC);
        
        int width = Screen.PrimaryScreen.Bounds.Width;
        int height = Screen.PrimaryScreen.Bounds.Height;
        
        IntPtr bitmap = CreateCompatibleBitmap(desktopDC, width, height);
        IntPtr oldBitmap = SelectObject(memoryDC, bitmap);
        
        BitBlt(memoryDC, 0, 0, width, height, desktopDC, 0, 0, 0x00CC0020);
        
        Bitmap bmp = Image.FromHbitmap(bitmap);
        bmp.Save(filename, ImageFormat.Png);
        
        SelectObject(memoryDC, oldBitmap);
        DeleteObject(bitmap);
        DeleteDC(memoryDC);
        ReleaseDC(desktop, desktopDC);
    }
}
"@
        
        Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing, System.Windows.Forms
        
        $filepath = Join-Path $screenshotsDir $filename
        [ScreenCapture]::CaptureScreen($filepath)
        
        Write-Host "✅ Method 3 Success: $filepath" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Method 3 Failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Method 4: Using external tools
function Capture-Screenshot-External {
    param(
        [string]$filename,
        [string]$description
    )
    
    try {
        Write-Host "📷 Method 4: Capturing $description" -ForegroundColor Cyan
        
        # Try using PowerShell's built-in screenshot capabilities
        $filepath = Join-Path $screenshotsDir $filename
        
        # Use Windows built-in screenshot tool
        Start-Process "ms-screenclip:" -Wait
        
        Write-Host "⚠️ Method 4: Requires manual intervention" -ForegroundColor Yellow
        return $false
    }
    catch {
        Write-Host "❌ Method 4 Failed: $($_.Exception.Message)" -ForegroundColor Red
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
    }
)

Write-Host "`n📋 Test Cases to Capture:" -ForegroundColor Cyan
foreach ($testCase in $testCases) {
    Write-Host "  - $($testCase.Description)" -ForegroundColor White
}

Write-Host "`n🎯 Trying multiple capture methods..." -ForegroundColor Yellow

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
    
    # Method 1: Windows Forms
    if (-not $success) {
        $success = Capture-Screenshot-Forms -filename $filename -description $testCase.Description
    }
    
    # Method 3: Windows API (if Method 1 failed)
    if (-not $success) {
        $success = Capture-Screenshot-API -filename $filename -description $testCase.Description
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
