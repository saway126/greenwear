# ⚡ GreenWear 빠른 시작 가이드

> **업데이트된 보안 및 현대화 기능을 포함한 최신 가이드**  
> **최종 업데이트**: 2025년 1월

---

## 🎯 지금 바로 시작하기

### 단계별 실행 가이드 (우선순위 기반)

---

## ✅ 1단계: 긴급 보안 조치 (최우선)

### 1-1. Git 저장소 보안 강화

```bash
# MFA 활성화 확인
# GitHub → Settings → Password and authentication → Two-factor authentication

# 접근 권한 검토
gh repo collaborators saway126/greenwear

# 장기 토큰 교체
# Settings → Developer settings → Personal access tokens → 만료된 토큰 삭제
```

### 1-2. 환경변수 보안 설정

```bash
# 1. .env 파일 생성 (Git에 커밋 금지!)
cp env.example .env

# 2. 민감 정보 입력
nano .env  # 또는 메모장으로 편집

# 필수 항목:
# - DATABASE_URL (프로덕션 DB)
# - JWT_SECRET (랜덤 256비트 키)
# - IOT_API_KEYS (ESP32 디바이스 키)
```

### 1-3. CORS 및 Rate Limiting 확인

```bash
# 백엔드 디렉토리로 이동
cd backend

# 의존성 설치 (보안 패키지 포함)
npm install

# 변경사항 확인
git diff server.js

# 주요 변경:
# ✅ CORS origin: '*' → 특정 도메인만 허용
# ✅ Rate Limiting 추가 (DDoS 방어)
# ✅ Helmet 보안 헤더 적용
```

---

## 🚀 2단계: 백엔드 실행 및 테스트

### 2-1. 로컬 개발 서버 실행

```bash
# backend 디렉토리에서
cd C:\kks0518\greenwear\backend

# 개발 모드 실행
npm run dev

# 출력:
# 🌐 GreenWear Server running on port 5000
# 📱 Frontend: http://localhost:5000
# 🔌 API: http://localhost:5000/api
```

### 2-2. API 테스트

```bash
# 새 터미널 열기 (기존 서버는 실행 중)

# Health Check
curl http://localhost:5000/api/health

# 예상 출력:
{
  "status": "OK",
  "message": "GreenWear API is running on Railway!",
  "timestamp": "2025-01-27T...",
  "health": {
    "status": "healthy",
    "uptime": 12.345,
    ...
  }
}
```

### 2-3. 내장 테스트 실행

```bash
# backend 디렉토리에서
npm test

# 출력:
# ✅ Health Check API (2 tests)
# ✅ Vitals Analysis (4 tests)
# ✅ IoT Wearable Data Validation (4 tests)
# ...
# ✅ 모든 테스트 통과!

# Watch 모드 (파일 변경 감지)
npm run test:watch

# 커버리지 확인
npm run test:coverage
```

---

## 💻 3단계: 프론트엔드 실행

### 3-1. 프론트엔드 개발 서버

```bash
# 루트 디렉토리로 이동
cd C:\kks0518\greenwear

# 의존성 설치 (아직 안 했다면)
npm install

# 개발 서버 실행
npm run dev

# 출력:
#   VITE v5.x.x  ready in xxx ms
#   ➜  Local:   http://localhost:5173/
#   ➜  Network: http://192.168.x.x:5173/
```

### 3-2. 브라우저에서 확인

```
1. http://localhost:5173/ 접속
2. 대시보드 확인
3. IoT 데이터 실시간 모니터링
```

---

## 📱 4단계: 모바일 앱 실행 (선택적)

### 4-1. React Native 설정

```bash
cd GreenWearMobile

# 의존성 설치
npm install

# iOS 시뮬레이터 (Mac만 가능)
npm run ios

# Android 에뮬레이터
npm run android

# Expo Go 앱으로 실행
npm start
# QR 코드 스캔
```

---

## 🔧 5단계: 보안 감사 체크리스트 확인

### 5-1. 문서 검토

```bash
# 보안 체크리스트 열기
code SECURITY_AUDIT_CHECKLIST.md
# 또는
notepad SECURITY_AUDIT_CHECKLIST.md

# 주요 확인 항목:
# [ ] MFA 활성화
# [ ] CORS 설정 강화
# [ ] Rate Limiting 적용
# [ ] 환경변수 보안
# [ ] API 키 교체
```

### 5-2. 자동 보안 스캔 (선택적)

```bash
# npm audit로 취약점 검사
npm audit

# 자동 수정 가능한 항목
npm audit fix

# 수동 확인 필요한 항목
npm audit fix --force  # 주의: 버전 변경 가능
```

---

## 📚 6단계: Node.js 현대화 적용

### 6-1. 가이드 문서 확인

```bash
# Node.js 현대화 가이드 열기
code NODEJS_MODERNIZATION_GUIDE.md

# 주요 학습 내용:
# - node-fetch → 내장 fetch()
# - uuid → crypto.randomUUID()
# - jest/mocha → node:test
# - 성능 향상 및 보안 강화
```

### 6-2. 현재 프로젝트 적용 현황

```
✅ 이미 적용된 항목:
- 내장 테스트 러너 (node:test)
- 최소 의존성 (6개만 사용)
- Node.js 18+ 기능 활용

🔄 향후 적용 가능:
- CommonJS → ESM 마이그레이션
- dotenv → --env-file 플래그
```

---

## 🤖 7단계: AI 도구 활용 시작

### 7-1. Cursor AI 설정 (이미 사용 중!)

```bash
# .cursorrules 파일 확인
code .cursorrules

# 프로젝트 컨텍스트가 이미 로드됨
# Ctrl+L (Chat) 또는 Ctrl+K (Inline Edit) 사용 가능
```

### 7-2. GPT Pro Codex 연동

```
1. ChatGPT 접속: https://chat.openai.com
2. Codex 활성화
3. GitHub 연결: saway126/greenwear
4. 프롬프트:
   "@greenwear 저장소를 분석하고 
    SECURITY_AUDIT_CHECKLIST.md를 기반으로 
    현재 구현 상태를 평가해줘"
```

### 7-3. 학습 자료 생성 (Notebook LM 원리)

```
GPT Pro에서:

"다음 문서들을 읽고 학습용 플래시 카드를 만들어줘:
- SECURITY_AUDIT_CHECKLIST.md
- NODEJS_MODERNIZATION_GUIDE.md

형식:
Q: [질문]
A: [답변]
난이도: [초급/중급/고급]

20개 생성"
```

---

## 🎯 8단계: 실전 시나리오 연습

### 시나리오 1: 새로운 API 엔드포인트 추가

```bash
# Cursor AI에서 (Ctrl+I - Composer)

"backend/server.js에 새로운 API를 추가해줘:

엔드포인트: POST /api/users/login
기능: 사용자 로그인 (JWT 발급)
요구사항:
- 입력 검증 (이메일, 비밀번호)
- Rate Limiting 적용
- 에러 처리
- 테스트 코드 포함

보안 베스트 프랙티스 준수"
```

### 시나리오 2: 버그 수정

```bash
# Cursor AI Chat (Ctrl+L)

"IoT 데이터 전송 시 타임아웃이 자주 발생해.
@backend/server.js의 /api/wearable/data 엔드포인트를 분석하고
문제를 해결해줘.

고려사항:
- 타임아웃 설정
- 재시도 로직
- 에러 로깅"
```

---

## 📊 완료 체크리스트

### ✅ 1단계: 보안 조치
- [ ] GitHub MFA 활성화
- [ ] 장기 토큰 교체
- [ ] .env 파일 생성 및 보안 설정
- [ ] CORS 설정 확인 (origin: '*' 제거됨)
- [ ] Rate Limiting 동작 확인

### ✅ 2단계: 백엔드
- [ ] npm install 완료
- [ ] 로컬 서버 실행 성공
- [ ] API Health Check 성공
- [ ] 테스트 실행 및 통과

### ✅ 3단계: 프론트엔드
- [ ] 의존성 설치 완료
- [ ] 개발 서버 실행 성공
- [ ] 브라우저에서 정상 동작 확인

### ✅ 4단계: 문서 확인
- [ ] SECURITY_AUDIT_CHECKLIST.md 읽음
- [ ] NODEJS_MODERNIZATION_GUIDE.md 읽음
- [ ] AI_TOOLS_WORKFLOW.md 읽음

### ✅ 5단계: AI 도구
- [ ] Cursor AI 사용법 숙지
- [ ] GPT Pro Codex 연결
- [ ] 학습 자료 생성 시도

---

## 🚨 문제 해결

### 문제 1: 포트 충돌
```bash
# 에러: Port 5000 is already in use

# 해결:
# 1. 실행 중인 프로세스 종료
# Windows:
netstat -ano | findstr :5000
taskkill /PID [PID번호] /F

# 2. 또는 다른 포트 사용
# .env 파일:
PORT=5001
```

### 문제 2: 모듈 없음 에러
```bash
# 에러: Cannot find module 'express-rate-limit'

# 해결:
cd backend
npm install

# 또는 특정 패키지만:
npm install express-rate-limit helmet
```

### 문제 3: CORS 에러
```bash
# 에러: Access to fetch at '...' has been blocked by CORS

# 해결:
# backend/server.js의 allowedOrigins에 프론트엔드 URL 추가:
const allowedOrigins = [
  'http://localhost:5173',  // 개발 환경
  'https://your-domain.vercel.app'  // 프로덕션
];
```

---

## 📞 추가 도움말

### 문서 링크
- [보안 감사 체크리스트](./SECURITY_AUDIT_CHECKLIST.md)
- [Node.js 현대화 가이드](./NODEJS_MODERNIZATION_GUIDE.md)
- [AI 도구 워크플로우](./AI_TOOLS_WORKFLOW.md)
- [배포 가이드](./DEPLOYMENT_GUIDE.md)

### 커뮤니티
- GitHub Issues: https://github.com/saway126/greenwear/issues
- 개발 블로그: https://saway126.github.io

---

## 🎉 축하합니다!

모든 단계를 완료했다면, 이제 다음을 할 수 있습니다:

✅ **보안이 강화된** GreenWear 애플리케이션 실행  
✅ **최신 Node.js 기능**을 활용한 개발  
✅ **AI 도구**를 활용한 생산성 5배 향상  
✅ **체계적인 테스트**로 코드 품질 보장  

---

**다음 단계**: 새로운 기능 개발을 시작하거나 기존 코드를 리팩토링해보세요!  
**AI 도구 활용**: Cursor AI, GPT Pro, Gemini CLI를 활용하여 더 빠르게 개발하세요!

**마지막 업데이트**: 2025년 1월  
**버전**: 2.0.0 (보안 강화 및 현대화 완료)

