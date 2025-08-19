# 🌱 GreenWear

의료용 및 군인 보급용 의류 색상 시스템 기반 지속가능한 패션 플랫폼

## 🚀 주요 기능

- 🩺 **의료용 색상 시스템**: 
  - 🔴 **빨간색 (위험)**: 즉시 연락이 필요한 긴급 상황
  - 🟡 **노란색 (경고)**: 주의가 필요한 상태
  - 🟢 **초록색 (정상)**: 안전한 상태
- 🛡️ **군인 보급용 의류**: 내구성과 기능성을 고려한 군용 의류
- 📱 **모바일 최적화**: 반응형 웹 디자인으로 모든 기기에서 편리한 사용
- 🔐 **사용자 인증**: JWT 기반 보안 로그인 및 회원가입
- 📊 **상품 관리**: 의료용/군용 의류 상품 정보 및 카테고리 관리
- 🎨 **모던 UI/UX**: Tailwind CSS를 활용한 깔끔하고 직관적인 인터페이스
- 📈 **실시간 모니터링**: 상품 상태 및 사용자 활동 추적

## 🏗️ 기술 스택

### Frontend
- **Vue 5.1.73** + TypeScript + Composition API
- **Tailwind CSS** - 모던하고 반응형 UI
- **Vite** - 빠른 개발 환경
- **Vue Router** - SPA 라우팅

### Backend  
- **Spring Boot 3** - RESTful API 서버
- **Spring Security** - JWT 기반 인증 및 보안
- **Spring Data JPA** - 데이터베이스 ORM
- **PostgreSQL** - 메인 데이터베이스

### 배포
- **Frontend**: Vercel / Netlify
- **Backend**: Railway / Render
- **Database**: PostgreSQL (Railway/Render)

## 🛠️ 로컬 개발 환경

### 1. Frontend 실행
```bash
cd frontend
npm install
npm run dev
# http://localhost:5173
```

### 2. Backend 실행
```bash
cd backend-spring/demo
./gradlew bootRun
# http://localhost:8080
```

### 3. 데이터베이스 설정
```bash
# PostgreSQL 데이터베이스 실행
docker-compose up -d
```

## 📱 주요 화면

1. **메인 페이지**: 의료용/군용 의류 추천 및 색상별 카테고리 탐색
2. **색상별 상품**: 빨간색(위험), 노란색(경고), 초록색(정상) 의류 분류
3. **로그인/회원가입**: 사용자 인증 및 계정 관리
4. **상품 목록**: 의료용/군용 의류 상품 브라우징
5. **상품 상세**: 제품 정보, 소재, 생산 방식, 색상 의미 등 상세 정보
6. **마이페이지**: 사용자 정보 및 구매 내역 관리
7. **대시보드**: 관리자용 상품 및 사용자 통계

## 🌟 특별한 기능

- **색상별 상태 표시**: 의료진과 군인들이 직관적으로 상태를 파악할 수 있는 색상 시스템
- **긴급 연락 시스템**: 빨간색 의류 착용 시 즉시 연락할 수 있는 시스템
- **내구성 테스트**: 군용 의류의 내구성 및 기능성 검증
- **의료용 소재**: 피부 친화적이고 항균 기능이 있는 의료용 소재 사용
- **환경 친화적**: 지속가능한 소재와 생산 방식으로 환경 보호
- **리사이클링 가이드**: 의류 재활용 및 업사이클링 방법 안내

## 🎨 색상 시스템 가이드

### 🔴 빨간색 (위험 - 즉시 연락)
- **의료용**: 심각한 증상, 응급 상황
- **군용**: 전투 상황, 긴급 보급 필요
- **특징**: 최우선 처리, 24시간 모니터링

### 🟡 노란색 (경고 - 주의 필요)
- **의료용**: 경미한 증상, 주의 관찰
- **군용**: 훈련 상황, 예방 정비 필요
- **특징**: 정기 점검, 상태 변화 모니터링

### 🟢 초록색 (정상 - 안전)
- **의료용**: 건강한 상태, 정상 활동
- **군용**: 일상 업무, 정상 보급 상태
- **특징**: 정기 점검, 예방 관리

## 📁 프로젝트 구조

```
greaenwear/
├── frontend/          # Vue 5.1.73 프론트엔드
├── backend-spring/    # Spring Boot 백엔드
├── db/               # 데이터베이스 스키마
├── docs/             # 프로젝트 문서
└── docker-compose.yml # 개발 환경 설정
```

## 🔧 환경 설정

### Frontend 환경변수
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_TITLE=GreenWear
VITE_APP_VERSION=5.1.73
```

### Backend 환경변수
```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/greenwear
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=password
JWT_SECRET=your-jwt-secret-key
```

## 🚀 배포

### Frontend 배포 (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend 배포 (Railway)
```bash
cd backend-spring/demo
railway up
```

## 📞 지원

- 📧 **이메일**: skwka12346@gmail.com.com  
- 💬 **이슈**: [GitHub Issues](https://github.com/username/greenwear/issues)
- 📖 **문서**: [프로젝트 개요](./docs/기획서.md)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

⭐ **이 프로젝트가 도움이 되셨다면 스타를 눌러주세요!** 

🌱 **의료진과 군인들을 위한 안전하고 지속가능한 의류로 더 나은 세상을 만들어가요** 