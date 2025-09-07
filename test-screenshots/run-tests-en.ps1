# GreenWear Automated Test Script
# Run in PowerShell

Write-Host "🧪 GreenWear Automated Testing Started..." -ForegroundColor Green

# Test results storage
$testResults = @()

# Test Case 1: Homepage Loading
Write-Host "`n📋 Test Case 1: Homepage Loading" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Homepage Loading Success" -ForegroundColor Green
        $testResults += @{Test="Homepage Loading"; Status="Success"; Details="HTTP 200 OK"}
    }
} catch {
    Write-Host "❌ Homepage Loading Failed: $($_.Exception.Message)" -ForegroundColor Red
    $testResults += @{Test="Homepage Loading"; Status="Failed"; Details=$_.Exception.Message}
}

# Test Case 2: API Connection
Write-Host "`n📋 Test Case 2: Backend API Connection" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://greenwear-backend-node-production-1583.up.railway.app/api/health" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ API Connection Success" -ForegroundColor Green
        $testResults += @{Test="API Connection"; Status="Success"; Details="HTTP 200 OK"}
    }
} catch {
    Write-Host "❌ API Connection Failed: $($_.Exception.Message)" -ForegroundColor Red
    $testResults += @{Test="API Connection"; Status="Failed"; Details=$_.Exception.Message}
}

# Test Case 3: Products API
Write-Host "`n📋 Test Case 3: Products API" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://greenwear-backend-node-production-1583.up.railway.app/api/products" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Products API Success" -ForegroundColor Green
        $testResults += @{Test="Products API"; Status="Success"; Details="HTTP 200 OK"}
    }
} catch {
    Write-Host "❌ Products API Failed: $($_.Exception.Message)" -ForegroundColor Red
    $testResults += @{Test="Products API"; Status="Failed"; Details=$_.Exception.Message}
}

# Test Case 4: Development Server Status
Write-Host "`n📋 Test Case 4: Development Server Status" -ForegroundColor Yellow
$nodeProcesses = Get-Process | Where-Object {$_.ProcessName -like "*node*"}
if ($nodeProcesses.Count -gt 0) {
    Write-Host "✅ Development Server Running (Processes: $($nodeProcesses.Count))" -ForegroundColor Green
    $testResults += @{Test="Development Server"; Status="Success"; Details="Processes Running"}
} else {
    Write-Host "❌ Development Server Not Running" -ForegroundColor Red
    $testResults += @{Test="Development Server"; Status="Failed"; Details="No Processes"}
}

# Test Case 5: Port Check
Write-Host "`n📋 Test Case 5: Port 5173 Check" -ForegroundColor Yellow
$portCheck = netstat -an | findstr :5173
if ($portCheck) {
    Write-Host "✅ Port 5173 In Use" -ForegroundColor Green
    $testResults += @{Test="Port 5173"; Status="Success"; Details="Port In Use"}
} else {
    Write-Host "❌ Port 5173 Not In Use" -ForegroundColor Red
    $testResults += @{Test="Port 5173"; Status="Failed"; Details="Port Not In Use"}
}

# Test Results Summary
Write-Host "`n📊 Test Results Summary" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Gray
$successCount = ($testResults | Where-Object {$_.Status -eq "Success"}).Count
$totalCount = $testResults.Count
Write-Host "Total Tests: $totalCount" -ForegroundColor White
Write-Host "Success: $successCount" -ForegroundColor Green
Write-Host "Failed: $($totalCount - $successCount)" -ForegroundColor Red
Write-Host "Success Rate: $([math]::Round(($successCount / $totalCount) * 100, 2))%" -ForegroundColor Yellow

# Detailed Results
Write-Host "`n📋 Detailed Results:" -ForegroundColor Cyan
foreach ($result in $testResults) {
    $statusColor = if ($result.Status -eq "Success") { "Green" } else { "Red" }
    Write-Host "  $($result.Test): $($result.Status)" -ForegroundColor $statusColor
    Write-Host "    $($result.Details)" -ForegroundColor Gray
}

# Save results to file
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$reportFile = "test-report-$timestamp.txt"
$testResults | ConvertTo-Json -Depth 3 | Out-File -FilePath $reportFile -Encoding UTF8
Write-Host "`n📄 Detailed Report Saved: $reportFile" -ForegroundColor Blue

Write-Host "`n🎉 Testing Complete!" -ForegroundColor Green
