# GreenWear Final Screenshot Capture Script
# Using a different approach for automatic screenshot capture

Write-Host "📸 GreenWear Final Screenshot Capture Started..." -ForegroundColor Green

# Create screenshots directory
$screenshotsDir = "screenshots"
if (!(Test-Path $screenshotsDir)) {
    New-Item -ItemType Directory -Path $screenshotsDir
    Write-Host "📁 Created screenshots directory" -ForegroundColor Yellow
}

# Method: Using Windows API with different approach
function Capture-Screenshot-Final {
    param(
        [string]$filename,
        [string]$description
    )
    
    try {
        Write-Host "📷 Final Method: Capturing $description" -ForegroundColor Cyan
        
        # Define Windows API functions with different approach
        $code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class FinalScreenCapture
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
            
            // Get actual screen dimensions
            int width = 1920;
            int height = 1080;
            
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
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
            return false;
        }
    }
}
"@
        
        # Remove existing type if it exists
        try {
            Remove-Type -Name "FinalScreenCapture" -ErrorAction SilentlyContinue
        } catch {}
        
        Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing
        
        $filepath = Join-Path $screenshotsDir $filename
        $result = [FinalScreenCapture]::CaptureScreen($filepath)
        
        if ($result) {
            Write-Host "✅ Final Method Success: $filepath" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ Final Method Failed" -ForegroundColor Red
            return $false
        }
    }
    catch {
        Write-Host "❌ Final Method Failed: $($_.Exception.Message)" -ForegroundColor Red
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

Write-Host "`n🎯 Trying final capture method..." -ForegroundColor Yellow

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
    
    # Try final method
    $success = Capture-Screenshot-Final -filename $filename -description $testCase.Description
    
    if ($success) {
        Write-Host "✅ Successfully captured: $filename" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to capture: $($testCase.Description)" -ForegroundColor Red
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
