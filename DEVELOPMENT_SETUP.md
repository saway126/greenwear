# GreenWear 개발 환경 설정 가이드

## 🚀 빠른 시작

### 1. 저장소 클론
```bash
git clone https://github.com/saway126/greenwear.git
cd greenwear
```

### 2. Node.js 버전 설정
```bash
# nvm 사용 시 (권장)
nvm install 18.20.8
nvm use 18.20.8

# 또는 직접 설치
node --version  # 18.20.8 확인
```

### 3. 의존성 설치
```bash
npm install
```

### 4. 환경 변수 설정
```bash
# .env 파일 생성
cp env.example .env

# 또는 직접 생성
echo "VITE_API_BASE_URL=https://greenwear-backend-node-production-1583.up.railway.app" > .env
echo "VITE_BACKEND_URL=https://greenwear-backend-node-production-1583.up.railway.app" >> .env
echo "VITE_WS_URL=wss://greenwear-backend-node-production-1583.up.railway.app" >> .env
```

### 5. 개발 서버 실행
```bash
npm run dev
```

## 📋 필수 요구사항
- **Node.js**: 18.20.8 (권장)
- **npm**: 9.x 이상
- **Git**: 2.x 이상
- **브라우저**: Chrome, Firefox, Safari, Edge (최신 버전)

## 🛠️ 개발 도구

### VS Code 확장 프로그램 (권장)
- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint

### 자동 설정 스크립트
```bash
# Windows
./setup-dev.bat

# macOS/Linux
./setup-dev.sh
```

## 🔧 주요 명령어

### 개발
```bash
npm run dev          # 개발 서버 실행 (포트 5173)
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 결과 미리보기
npm run lint         # 코드 린팅
```

### Git 작업
```bash
git status           # 상태 확인
git add .            # 변경사항 스테이징
git commit -m "..."  # 커밋
git push             # 원격 저장소에 푸시
git pull             # 원격 저장소에서 풀
```

### Vercel 배포
```bash
vercel --prod        # 프로덕션 배포
vercel               # 프리뷰 배포
vercel ls            # 배포 목록 확인
```

## 🌐 환경 변수

### 필수 환경 변수
```env
VITE_API_BASE_URL=https://greenwear-backend-node-production-1583.up.railway.app
VITE_BACKEND_URL=https://greenwear-backend-node-production-1583.up.railway.app
VITE_WS_URL=wss://greenwear-backend-node-production-1583.up.railway.app
```

### 선택적 환경 변수
```env
VITE_APP_TITLE=GreenWear
VITE_APP_VERSION=1.0.0
```

## 📁 프로젝트 구조
```
greaenwear/
├── src/
│   ├── components/     # Vue 컴포넌트
│   ├── views/         # 페이지 뷰
│   ├── services/      # API 서비스
│   ├── composables/   # Vue 컴포저블
│   └── assets/        # 정적 자산
├── public/            # 공개 자산
├── dist/              # 빌드 결과물
├── .env               # 환경 변수
├── .env.example       # 환경 변수 예시
├── .nvmrc             # Node.js 버전
└── package.json       # 프로젝트 설정
```

## 🔗 주요 링크
- **프로덕션 사이트**: https://greenwear-demo.vercel.app
- **GitHub 저장소**: https://github.com/saway126/greenwear
- **API 문서**: https://greenwear-demo.vercel.app/api-docs
- **백엔드 API**: https://greenwear-backend-node-production-1583.up.railway.app

## 🐛 문제 해결

### 일반적인 문제
1. **Node.js 버전 불일치**: `.nvmrc` 파일 확인
2. **의존성 설치 실패**: `npm cache clean --force` 후 재설치
3. **포트 충돌**: 다른 포트 사용 (`npm run dev -- --port 3000`)
4. **API 연결 실패**: `.env` 파일 확인

### 로그 확인
```bash
# 개발 서버 로그
npm run dev

# 빌드 로그
npm run build

# Vercel 배포 로그
vercel logs
```

## 📝 개발 가이드라인
- **커밋 메시지**: 명확하고 간결하게 작성
- **브랜치**: feature/기능명 형식 사용
- **코드 스타일**: Prettier + ESLint 규칙 준수
- **테스트**: 주요 기능 변경 시 테스트 수행

## 🚀 배포 프로세스
1. 로컬에서 개발 및 테스트
2. `git add . && git commit -m "..." && git push`
3. Vercel 자동 배포 확인
4. 프로덕션 사이트 테스트
