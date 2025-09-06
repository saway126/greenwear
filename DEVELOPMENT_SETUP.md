# GreenWear 개발 환경 설정 가이드

## 필수 요구사항
- Node.js 18.20.8 (권장)
- npm 또는 yarn
- Git

## 환경 설정

### 1. Node.js 버전 설정
```bash
# nvm 사용 시
nvm use

# 또는 직접 설치
node --version  # 18.20.8 확인
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 빌드
```bash
npm run build
```

### 5. 프리뷰
```bash
npm run preview
```

## 환경 변수 설정
- `.env` 파일 생성 (필요시)
- Vercel 배포 설정 확인

## 주요 스크립트
- `npm run dev`: 개발 서버 (포트 5173)
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 빌드 결과 미리보기
- `npm run test`: 테스트 실행

## 배포
- Vercel 자동 배포 설정됨
- main 브랜치 푸시 시 자동 배포
