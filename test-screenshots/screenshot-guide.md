# GreenWear 테스트 화면 캡처 가이드

## 📸 화면 캡처 테스트 케이스

### 최종 업데이트: 2025-09-07
### 테스트 환경: Windows 10, Node.js v22.16.0, Chrome

### 테스트 결과 요약
- **총 테스트**: 5개
- **성공**: 5개 (100%)
- **실패**: 0개

### 🧪 테스트 케이스 목록

#### 1. 홈페이지 메인 화면
- **URL**: http://localhost:5173
- **설명**: GreenWear 메인 홈페이지
- **캡처 포인트**: 
  - 로고 및 제목
  - 메인 콘텐츠 영역
  - 네비게이션 메뉴
  - 통계 카드들

#### 2. 실시간 대시보드
- **URL**: http://localhost:5173/dashboard
- **설명**: ESP32 디바이스 연결 및 실시간 모니터링
- **캡처 포인트**:
  - ESP32 연결 상태
  - 실시간 생체신호 데이터
  - LED 상태 표시
  - 연결/해제 버튼

#### 3. 모니터링 템플릿
- **URL**: http://localhost:5173/templates
- **설명**: 미리 정의된 모니터링 템플릿들
- **캡처 포인트**:
  - 템플릿 목록
  - 템플릿 카드들
  - 설정 옵션들

#### 4. 설정 생성기
- **URL**: http://localhost:5173/generator
- **설명**: 맞춤형 모니터링 설정 생성
- **캡처 포인트**:
  - 설정 폼
  - 옵션 선택
  - 미리보기

#### 5. 기록 및 히스토리
- **URL**: http://localhost:5173/history
- **설명**: 과거 데이터 기록 및 분석
- **캡처 포인트**:
  - 데이터 차트
  - 히스토리 목록
  - 필터 옵션들

#### 6. API 문서
- **URL**: http://localhost:5173/api-docs
- **설명**: API 엔드포인트 문서
- **캡처 포인트**:
  - API 엔드포인트 목록
  - 요청/응답 예시
  - 인증 정보

### 📱 반응형 테스트

#### 모바일 화면 (375x667)
- iPhone SE 크기
- 터치 인터페이스 확인

#### 태블릿 화면 (768x1024)
- iPad 크기
- 중간 크기 레이아웃

#### 데스크톱 화면 (1920x1080)
- 전체 화면 레이아웃
- 모든 기능 표시

### 🎯 캡처 방법

#### Windows에서 화면 캡처:
1. **전체 화면**: `PrintScreen` 키
2. **활성 창**: `Alt + PrintScreen`
3. **선택 영역**: `Windows + Shift + S`

#### Chrome 개발자 도구:
1. `F12` 키로 개발자 도구 열기
2. `Ctrl + Shift + M`으로 모바일 뷰 전환
3. 다양한 디바이스 크기 선택

### 📁 파일 저장 규칙

```
test-screenshots/
├── 01-homepage-desktop.png
├── 01-homepage-mobile.png
├── 02-dashboard-desktop.png
├── 02-dashboard-mobile.png
├── 03-templates-desktop.png
├── 03-templates-mobile.png
├── 04-generator-desktop.png
├── 04-generator-mobile.png
├── 05-history-desktop.png
├── 05-history-mobile.png
├── 06-api-docs-desktop.png
├── 06-api-docs-mobile.png
└── test-report-YYYYMMDD-HHMMSS.txt
```

### ✅ 테스트 체크리스트

- [ ] 홈페이지 로딩 확인
- [ ] 모든 네비게이션 링크 동작
- [ ] ESP32 연결 시뮬레이션
- [ ] 실시간 데이터 표시
- [ ] 반응형 레이아웃 확인
- [ ] API 연결 상태 확인
- [ ] 에러 처리 확인
- [ ] 성능 측정

### 🚀 자동화 스크립트

```powershell
# 모든 페이지를 순차적으로 열기
.\capture-screenshots.ps1

# 자동 테스트 실행
.\run-tests-en.ps1
```

### 📊 테스트 보고서

자동 테스트 결과는 `test-report-YYYYMMDD-HHMMSS.txt` 파일에 저장됩니다.
