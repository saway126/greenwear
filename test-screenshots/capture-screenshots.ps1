# GreenWear 테스트 화면 캡처 스크립트
# PowerShell에서 실행

Write-Host "📸 GreenWear 테스트 화면 캡처 시작..." -ForegroundColor Green

# 테스트 케이스 목록
$testCases = @(
    @{
        Name = "01-homepage"
        Description = "홈페이지 메인 화면"
        URL = "http://localhost:5173"
    },
    @{
        Name = "02-dashboard"
        Description = "실시간 대시보드"
        URL = "http://localhost:5173/dashboard"
    },
    @{
        Name = "03-templates"
        Description = "모니터링 템플릿"
        URL = "http://localhost:5173/templates"
    },
    @{
        Name = "04-generator"
        Description = "설정 생성기"
        URL = "http://localhost:5173/generator"
    },
    @{
        Name = "05-history"
        Description = "기록 및 히스토리"
        URL = "http://localhost:5173/history"
    },
    @{
        Name = "06-api-docs"
        Description = "API 문서"
        URL = "http://localhost:5173/api-docs"
    }
)

# 각 테스트 케이스 실행
foreach ($testCase in $testCases) {
    Write-Host "🔄 테스트 케이스: $($testCase.Description)" -ForegroundColor Yellow
    
    # Chrome으로 페이지 열기
    Start-Process chrome -ArgumentList $testCase.URL
    
    # 페이지 로딩 대기
    Start-Sleep -Seconds 3
    
    # 화면 캡처 (Windows 기본 도구 사용)
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $filename = "$($testCase.Name)-$timestamp.png"
    $filepath = Join-Path $PSScriptRoot $filename
    
    # PrintScreen 키 시뮬레이션 (수동으로 캡처 필요)
    Write-Host "📷 화면 캡처: $filename" -ForegroundColor Cyan
    Write-Host "   - Chrome에서 PrintScreen 키를 눌러 캡처하세요" -ForegroundColor Gray
    Write-Host "   - 파일명: $filename" -ForegroundColor Gray
    
    # 다음 테스트를 위해 잠시 대기
    Start-Sleep -Seconds 2
}

Write-Host "✅ 모든 테스트 케이스 완료!" -ForegroundColor Green
Write-Host "📁 캡처된 이미지는 test-screenshots 폴더에 저장하세요" -ForegroundColor Blue
