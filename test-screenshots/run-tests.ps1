# GreenWear 자동 테스트 실행 스크립트
# PowerShell에서 실행

Write-Host "🧪 GreenWear 자동 테스트 시작..." -ForegroundColor Green

# 테스트 결과 저장용
$testResults = @()

# 테스트 케이스 1: 홈페이지 로딩
Write-Host "`n📋 테스트 케이스 1: 홈페이지 로딩" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ 홈페이지 로딩 성공" -ForegroundColor Green
        $testResults += @{Test="홈페이지 로딩"; Status="성공"; Details="HTTP 200 OK"}
    }
} catch {
    Write-Host "❌ 홈페이지 로딩 실패: $($_.Exception.Message)" -ForegroundColor Red
    $testResults += @{Test="홈페이지 로딩"; Status="실패"; Details=$_.Exception.Message}
}

# 테스트 케이스 2: API 연결
Write-Host "`n📋 테스트 케이스 2: 백엔드 API 연결" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://greenwear-backend-node-production-1583.up.railway.app/api/health" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ API 연결 성공" -ForegroundColor Green
        $testResults += @{Test="API 연결"; Status="성공"; Details="HTTP 200 OK"}
    }
} catch {
    Write-Host "❌ API 연결 실패: $($_.Exception.Message)" -ForegroundColor Red
    $testResults += @{Test="API 연결"; Status="실패"; Details=$_.Exception.Message}
}

# 테스트 케이스 3: 제품 API
Write-Host "`n📋 테스트 케이스 3: 제품 API" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://greenwear-backend-node-production-1583.up.railway.app/api/products" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ 제품 API 성공" -ForegroundColor Green
        $testResults += @{Test="제품 API"; Status="성공"; Details="HTTP 200 OK"}
    }
} catch {
    Write-Host "❌ 제품 API 실패: $($_.Exception.Message)" -ForegroundColor Red
    $testResults += @{Test="제품 API"; Status="실패"; Details=$_.Exception.Message}
}

# 테스트 케이스 4: 개발 서버 상태
Write-Host "`n📋 테스트 케이스 4: 개발 서버 상태" -ForegroundColor Yellow
$nodeProcesses = Get-Process | Where-Object {$_.ProcessName -like "*node*"}
if ($nodeProcesses.Count -gt 0) {
    Write-Host "✅ 개발 서버 실행 중 (프로세스 수: $($nodeProcesses.Count))" -ForegroundColor Green
    $testResults += @{Test="개발 서버"; Status="성공"; Details="프로세스 실행 중"}
} else {
    Write-Host "❌ 개발 서버 실행 안됨" -ForegroundColor Red
    $testResults += @{Test="개발 서버"; Status="실패"; Details="프로세스 없음"}
}

# 테스트 케이스 5: 포트 확인
Write-Host "`n📋 테스트 케이스 5: 포트 5173 확인" -ForegroundColor Yellow
$portCheck = netstat -an | findstr :5173
if ($portCheck) {
    Write-Host "✅ 포트 5173 사용 중" -ForegroundColor Green
    $testResults += @{Test="포트 5173"; Status="성공"; Details="포트 사용 중"}
} else {
    Write-Host "❌ 포트 5173 사용 안됨" -ForegroundColor Red
    $testResults += @{Test="포트 5173"; Status="실패"; Details="포트 사용 안됨"}
}

# 테스트 결과 요약
Write-Host "`n📊 테스트 결과 요약" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Gray
$successCount = ($testResults | Where-Object {$_.Status -eq "성공"}).Count
$totalCount = $testResults.Count
Write-Host "총 테스트: $totalCount" -ForegroundColor White
Write-Host "성공: $successCount" -ForegroundColor Green
Write-Host "실패: $($totalCount - $successCount)" -ForegroundColor Red
Write-Host "성공률: $([math]::Round(($successCount / $totalCount) * 100, 2))%" -ForegroundColor Yellow

# 상세 결과
Write-Host "`n📋 상세 결과:" -ForegroundColor Cyan
foreach ($result in $testResults) {
    $statusColor = if ($result.Status -eq "성공") { "Green" } else { "Red" }
    Write-Host "  $($result.Test): $($result.Status)" -ForegroundColor $statusColor
    Write-Host "    $($result.Details)" -ForegroundColor Gray
}

# 결과를 파일로 저장
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$reportFile = "test-screenshots/test-report-$timestamp.txt"
$testResults | ConvertTo-Json -Depth 3 | Out-File -FilePath $reportFile -Encoding UTF8
Write-Host "`n📄 상세 보고서 저장: $reportFile" -ForegroundColor Blue

Write-Host "`n🎉 테스트 완료!" -ForegroundColor Green
