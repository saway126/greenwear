# GreenWear 테스트 자동화 도구

## 📋 개요

GreenWear 프로젝트의 테스트 자동화를 위한 도구 모음입니다.

## 🛠️ 포함된 도구들

### 1. 자동 테스트 실행
- **파일**: `run-tests-en.ps1`
- **기능**: API 연결, 서버 상태, 포트 확인 등 자동 테스트
- **사용법**: `.\run-tests-en.ps1`

### 2. 화면 캡처 자동화
- **파일**: `manual-workflow.ps1` (추천)
- **기능**: 페이지 자동 열기 + 수동 캡처
- **사용법**: `.\manual-workflow.ps1`

### 3. 향상된 자동화
- **파일**: `enhanced-auto-capture.ps1`
- **기능**: 완전 자동화 시도 (Windows 제한으로 부분 작동)
- **사용법**: `.\enhanced-auto-capture.ps1`

## 📸 화면 캡처 방법

### 추천 방법 (반자동화)
1. `.\manual-workflow.ps1` 실행
2. 각 페이지가 자동으로 열림
3. `Windows + Shift + S`로 캡처
4. 그림판에서 `Ctrl + V`로 붙여넣기
5. 제안된 파일명으로 저장

### 수동 방법
1. 브라우저에서 각 페이지 직접 열기
2. `Windows + Shift + S`로 캡처
3. 그림판에서 저장

## 🔧 설정 요구사항

### 시스템 요구사항
- Windows 10/11
- Node.js 18.20.8+ (현재: v22.16.0)
- Chrome 브라우저
- PowerShell 5.1+

### 설치된 도구
- Greenshot v1.3.300.0 (PATH 등록 완료)
- Windows 기본 스크린샷 도구

## 📁 파일 구조

```
test-screenshots/
├── README.md                           # 이 파일
├── TEST_RESULTS.md                     # 테스트 결과 보고서
├── screenshot-guide.md                 # 화면 캡처 가이드
├── run-tests-en.ps1                    # 자동 테스트 실행
├── manual-workflow.ps1                 # 반자동화 워크플로우 (추천)
├── enhanced-auto-capture.ps1           # 향상된 자동화
├── auto-tool-capture.ps1               # 도구 기반 캡처
├── enable-auto-capture.ps1             # 보안 설정 (관리자 권한 필요)
├── install-greenshot.ps1               # Greenshot 설치
└── screenshots/                        # 캡처된 이미지 저장 폴더
```

## 🚀 빠른 시작

### 1. 자동 테스트 실행
```powershell
.\run-tests-en.ps1
```

### 2. 화면 캡처 (추천)
```powershell
.\manual-workflow.ps1
```

### 3. 완전 자동화 시도
```powershell
.\enhanced-auto-capture.ps1
```

## ⚠️ 알려진 제한사항

### Windows 보안 정책
- GDI+ API 접근 제한으로 완전 자동화 어려움
- 관리자 권한으로도 일부 제한
- 반자동화가 가장 실용적

### 브라우저 호환성
- Chrome: 완전 지원
- Edge: 지원
- Firefox: 미테스트

## 📊 테스트 결과

### 최종 테스트 결과 (2025-09-07)
- **개발 서버**: ✅ 정상 (포트 5173)
- **프론트엔드**: ✅ 정상 (HTTP 200)
- **백엔드 API**: ✅ 정상 (Railway)
- **주요 기능**: ✅ 정상 (6개 페이지)
- **화면 캡처**: ⚠️ 부분 성공 (반자동화)

## 🔄 업데이트 이력

- **2025-09-07**: 초기 버전 생성
- **2025-09-07**: Greenshot 통합
- **2025-09-07**: 보안 설정 추가
- **2025-09-07**: 문서화 완료

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. Node.js 버전 (18.20.8+ 권장)
2. PowerShell 실행 정책 (RemoteSigned)
3. Chrome 브라우저 설치
4. Greenshot PATH 등록

---

**GreenWear 테스트 자동화 도구 v1.0**  
**최종 업데이트**: 2025-09-07
