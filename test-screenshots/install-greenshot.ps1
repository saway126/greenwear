# Greenshot Installation Script
# Download and install Greenshot for automatic screenshot capture

Write-Host "📥 Installing Greenshot for automatic screenshot capture..." -ForegroundColor Green

# Create temp directory
$tempDir = "temp"
if (!(Test-Path $tempDir)) {
    New-Item -ItemType Directory -Path $tempDir
}

# Download Greenshot
$greenshotUrl = "https://github.com/greenshot/greenshot/releases/download/v1.3.274/Greenshot-INSTALLER-1.3.274-RELEASE.exe"
$greenshotInstaller = Join-Path $tempDir "Greenshot-Installer.exe"

Write-Host "📥 Downloading Greenshot installer..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri $greenshotUrl -OutFile $greenshotInstaller
    Write-Host "✅ Greenshot downloaded successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to download Greenshot: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Please download manually from: https://getgreenshot.org/" -ForegroundColor Blue
    exit 1
}

# Install Greenshot
Write-Host "🔧 Installing Greenshot..." -ForegroundColor Yellow
try {
    Start-Process -FilePath $greenshotInstaller -ArgumentList "/S" -Wait
    Write-Host "✅ Greenshot installed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install Greenshot: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Please run the installer manually" -ForegroundColor Blue
}

# Cleanup
Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "`n🎉 Greenshot installation completed!" -ForegroundColor Green
Write-Host "📸 You can now use Greenshot for automatic screenshot capture" -ForegroundColor Blue
