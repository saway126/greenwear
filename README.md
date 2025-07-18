# 🌱 GreenWear - 지속가능한 패션 플랫폼

GreenWear는 지속가능한 패션 제품을 쇼핑하고, 환경 영향을 추적할 수 있는 웹 애플리케이션입니다.

## 🚀 **NEW! 무료 플랫폼 배포 지원**

이제 GreenWear를 **6개의 무료 플랫폼**에 쉽게 배포할 수 있습니다!

| 플랫폼 | 상태 | 배포 방식 | 데모 링크 |
|--------|------|-----------|-----------|
| 🌟 **Vercel** | ✅ 설정완료 | Vue.js + Serverless API | `vercel --prod` |
| 🎯 **Netlify** | ✅ 설정완료 | Vue.js + Netlify Functions | `netlify deploy --prod` |
| 🚀 **Render** | ✅ 설정완료 | Spring Boot + Vue.js | Git 연동 자동 배포 |
| 🚄 **Railway** | ✅ 설정완료 | 풀스택 (통합) | Git 연동 자동 배포 |
| ✈️ **Fly.io** | ✅ 설정완료 | Docker 기반 | `fly deploy` |
| 📄 **GitHub Pages** | ✅ 설정완료 | 정적 사이트 | GitHub Actions 자동 |

👉 **자세한 배포 가이드**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 🏗️ 아키텍처

### Frontend (Vue.js)
- **Framework**: Vue 3 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + Vue-ChartJS
- **HTTP Client**: Axios

### Backend Options

#### Option 1: Spring Boot (권장)
- **Framework**: Spring Boot 3.5.3
- **Security**: Spring Security + JWT
- **Database**: H2 (dev), MariaDB (prod)
- **API**: RESTful API

#### Option 2: Node.js (Express)
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB
- **API**: RESTful API

---

## 🛠️ 로컬 개발 환경 설정

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/greenwear.git
cd greenwear
```

### 2. Frontend 실행
```bash
cd frontend
npm install
npm run dev
# http://localhost:3000 에서 실행
```

### 3. Backend 실행

#### Spring Boot 실행
```bash
cd backend-spring/demo
./gradlew bootRun
# http://localhost:8080 에서 실행
```

#### Node.js 실행 (대안)
```bash
cd backend
npm install
npm run dev
# http://localhost:3001 에서 실행
```

---

## 📦 배포 옵션

### 🎯 빠른 배포 (추천)

1. **Vercel (프론트엔드 + API)**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Netlify (프론트엔드 + Functions)**
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod
   ```

3. **Railway (풀스택)**
   - GitHub 저장소 연결만으로 자동 배포
   - 통합된 프론트엔드 + 백엔드

### 🚀 프로덕션 배포

1. **Render (추천)**
   - 무료 PostgreSQL DB 포함
   - 백엔드 + 프론트엔드 분리 배포

2. **Fly.io**
   - Docker 기반 글로벌 배포
   - 영속적 데이터 저장 지원

---

## 🔗 API 엔드포인트

### 헬스체크
```
GET /api/health
```

### 제품 관리
```
GET /api/products              # 제품 목록 조회
GET /api/products?category=clothing  # 카테고리별 조회
GET /api/products?minScore=8.0      # 지속가능성 점수별 조회
POST /api/products             # 새 제품 등록
```

### 사용자 관리 (Spring Boot만)
```
POST /api/auth/signup          # 회원가입
POST /api/auth/signin          # 로그인
GET /api/users/profile         # 프로필 조회
```

---

## 🌍 환경 변수

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:8080  # API 서버 URL
```

### Backend (Spring Boot)
```bash
SPRING_PROFILES_ACTIVE=development
JWT_SECRET=your-secret-key
SPRING_DATASOURCE_URL=jdbc:h2:mem:testdb
```

### Backend (Node.js)
```bash
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/greenwear
```

---

## 🧪 테스트

### Frontend 테스트
```bash
cd frontend
npm run test
```

### Backend 테스트
```bash
# Spring Boot
cd backend-spring/demo
./gradlew test

# Node.js
cd backend
npm test
```

---

## 📋 주요 기능

- ✅ **제품 카탈로그**: 지속가능한 패션 제품 탐색
- ✅ **지속가능성 점수**: 환경 영향 시각화
- ✅ **탄소 발자국 추적**: 개인별 환경 영향 모니터링
- ✅ **사용자 인증**: JWT 기반 보안 시스템
- ✅ **반응형 디자인**: 모바일/데스크톱 최적화
- ✅ **실시간 데이터**: 차트 및 대시보드

---

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

---

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 📞 지원

- 📧 **이메일**: support@greenwear.com
- 💬 **이슈**: [GitHub Issues](https://github.com/your-username/greenwear/issues)
- 📖 **문서**: [배포 가이드](./DEPLOYMENT_GUIDE.md) 