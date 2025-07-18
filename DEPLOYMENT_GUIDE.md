# 🚀 GreenWear 무료 플랫폼 배포 가이드

이 문서는 GreenWear 프로젝트를 다양한 무료 플랫폼에 배포하는 방법을 안내합니다.

## 📋 목차

1. [Vercel 배포](#1-vercel-배포) - Vue.js + Serverless API
2. [Netlify 배포](#2-netlify-배포) - Vue.js + Netlify Functions  
3. [Render 배포](#3-render-배포) - Spring Boot + Vue.js 풀스택
4. [Railway 배포](#4-railway-배포) - 풀스택 애플리케이션
5. [Fly.io 배포](#5-flyio-배포) - Docker 기반 배포
6. [GitHub Pages 배포](#6-github-pages-배포) - 정적 사이트

---

## 1. 🌟 Vercel 배포

**특징**: Vue.js 프론트엔드 + Serverless API
**무료 한도**: 월 100GB 대역폭, 125시간 빌드

### 🔧 설정 파일
- `vercel.json` ✅ 생성됨
- `api/health.js` ✅ 생성됨  
- `api/products.js` ✅ 생성됨

### 📝 배포 단계

1. **Vercel 계정 생성**
   ```bash
   # Vercel CLI 설치
   npm i -g vercel
   
   # 로그인
   vercel login
   ```

2. **프로젝트 배포**
   ```bash
   # 프로젝트 루트에서
   vercel
   
   # 설정 질문에 답변:
   # - Set up and deploy? Y
   # - Which scope? (본인 계정 선택)
   # - Link to existing project? N
   # - Project name: greenwear-demo
   # - Directory: ./
   ```

3. **환경 변수 설정**
   ```bash
   # Vercel 대시보드에서 설정 또는 CLI로:
   vercel env add NODE_ENV production
   ```

### 🌐 결과
- **Frontend**: `https://greenwear-demo.vercel.app`
- **API**: `https://greenwear-demo.vercel.app/api/health`

---

## 2. 🎯 Netlify 배포

**특징**: Vue.js 프론트엔드 + Netlify Functions
**무료 한도**: 월 125GB 대역폭, 125시간 빌드

### 🔧 설정 파일
- `netlify.toml` ✅ 생성됨
- `netlify/functions/health.js` ✅ 생성됨
- `netlify/functions/products.js` ✅ 생성됨

### 📝 배포 단계

1. **Netlify CLI 설치**
   ```bash
   npm install -g netlify-cli
   netlify login
   ```

2. **프로젝트 배포**
   ```bash
   # 프로젝트 루트에서
   netlify deploy
   
   # 프로덕션 배포
   netlify deploy --prod
   ```

3. **또는 Git 연동**
   - Netlify 대시보드에서 "New site from Git" 선택
   - GitHub 저장소 연결
   - Build settings는 `netlify.toml`에서 자동 인식

### 🌐 결과
- **Frontend**: `https://greenwear-demo.netlify.app`
- **Functions**: `https://greenwear-demo.netlify.app/api/health`

---

## 3. 🚀 Render 배포

**특징**: Spring Boot 백엔드 + Vue.js 프론트엔드 분리 배포
**무료 한도**: 월 750시간, 512MB RAM

### 🔧 설정 파일
- `render.yaml` ✅ 생성됨
- `application-production.yml` ✅ 생성됨

### 📝 배포 단계

1. **Render 계정 생성**
   - [render.com](https://render.com)에서 GitHub 계정으로 가입

2. **Spring Boot 백엔드 배포**
   - "New Web Service" 선택
   - GitHub 저장소 연결
   - Settings:
     ```
     Name: greenwear-backend-spring
     Runtime: Java
     Build Command: cd backend-spring/demo && ./gradlew build
     Start Command: cd backend-spring/demo && java -jar build/libs/demo-1.0.0.jar
     ```

3. **Vue.js 프론트엔드 배포**
   - "New Static Site" 선택  
   - Settings:
     ```
     Name: greenwear-frontend
     Build Command: cd frontend && npm install && npm run build
     Publish Directory: frontend/dist
     ```

4. **환경 변수 설정**
   ```
   SPRING_PROFILES_ACTIVE=production
   VITE_API_URL=https://greenwear-backend-spring.onrender.com
   ```

### 🌐 결과
- **Backend**: `https://greenwear-backend-spring.onrender.com`
- **Frontend**: `https://greenwear-frontend.onrender.com`

---

## 4. 🚄 Railway 배포

**특징**: 통합된 풀스택 애플리케이션 (Spring Boot + Vue.js)
**무료 한도**: 월 $5 크레딧 (약 750시간)

### 🔧 설정 파일
- `railway.json` ✅ 생성됨
- `nixpacks.toml` ✅ 생성됨
- `application-railway.yml` ✅ 생성됨

### 📝 배포 단계

1. **Railway 계정 생성**
   - [railway.app](https://railway.app)에서 GitHub 계정으로 가입

2. **프로젝트 배포**
   - "Deploy from GitHub repo" 선택
   - 저장소 선택
   - Railway가 자동으로 `nixpacks.toml` 설정 인식

3. **환경 변수 설정**
   ```
   SPRING_PROFILES_ACTIVE=railway
   PORT=8080
   ```

4. **도메인 설정**
   - Settings → Domains에서 커스텀 도메인 설정 가능

### 🌐 결과
- **Full-Stack**: `https://greenwear-demo.up.railway.app`

---

## 5. ✈️ Fly.io 배포

**특징**: Docker 기반 배포, 글로벌 엣지 네트워크
**무료 한도**: 3 VMs, 3GB RAM, 160GB 전송

### 🔧 설정 파일
- `fly.toml` ✅ 생성됨
- `Dockerfile.fly` ✅ 생성됨
- `application-fly.yml` ✅ 생성됨

### 📝 배포 단계

1. **Fly CLI 설치**
   ```bash
   # Windows
   iwr https://fly.io/install.ps1 -useb | iex
   
   # macOS/Linux
   curl -L https://fly.io/install.sh | sh
   ```

2. **로그인 및 앱 생성**
   ```bash
   fly auth login
   fly apps create greenwear-demo
   ```

3. **배포**
   ```bash
   # 프로젝트 루트에서
   fly deploy
   ```

4. **볼륨 생성 (데이터 영속성)**
   ```bash
   fly volumes create data --size 1
   ```

### 🌐 결과
- **Full-Stack**: `https://greenwear-demo.fly.dev`

---

## 6. 📄 GitHub Pages 배포

**특징**: 정적 사이트만 (Vue.js 프론트엔드)
**무료 한도**: 무제한 (정적 파일만)

### 🔧 설정 파일
- `.github/workflows/deploy-to-pages.yml` ✅ 생성됨

### 📝 배포 단계

1. **GitHub Pages 활성화**
   - GitHub 저장소 → Settings → Pages
   - Source: "GitHub Actions" 선택

2. **자동 배포**
   - `main` 브랜치에 푸시하면 자동 배포
   - GitHub Actions가 빌드 및 배포 수행

3. **수동 배포**
   ```bash
   # GitHub Actions 탭에서 "Deploy to GitHub Pages" 워크플로우 실행
   ```

### 🌐 결과
- **Frontend**: `https://[username].github.io/[repository-name]`

---

## 🔄 배포 상태 모니터링

### 헬스체크 엔드포인트
모든 배포된 서비스는 다음 엔드포인트에서 상태 확인 가능:

- `GET /api/health` - 서비스 상태 확인
- `GET /api/products` - 제품 데이터 API 테스트

### 예시 응답
```json
{
  "status": "OK",
  "message": "GreenWear API is running on [Platform]!",
  "timestamp": "2025-01-18T10:00:00.000Z",
  "platform": "Vercel Demo"
}
```

---

## 💡 플랫폼별 특징 요약

| 플랫폼 | 장점 | 단점 | 추천 용도 |
|--------|------|------|-----------|
| **Vercel** | Next.js 최적화, 빠른 CDN | 서버리스 제한 | React/Vue 프론트엔드 |
| **Netlify** | JAMStack 친화적, 쉬운 설정 | 서버리스 함수 제한 | 정적 사이트 + API |
| **Render** | 풀스택 지원, DB 포함 | 15분 슬립 모드 | 풀스택 애플리케이션 |
| **Railway** | 직관적 UI, DB 지원 | 크레딧 소진 후 유료 | 프로토타입, MVP |
| **Fly.io** | 글로벌 배포, Docker | 설정 복잡 | 프로덕션급 앱 |
| **GitHub Pages** | 완전 무료, 무제한 | 정적만 지원 | 포트폴리오, 문서 |

---

## 🚦 다음 단계

1. **원하는 플랫폼 선택** 후 위 가이드 따라 배포
2. **커스텀 도메인** 연결 (선택사항)
3. **환경 변수** 및 **데이터베이스** 설정
4. **모니터링** 및 **로그 분석** 설정

배포 중 문제가 발생하면 각 플랫폼의 로그를 확인하거나 이슈를 제보해주세요! 🛠️ 