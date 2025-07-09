# 🌱 GreenWear - 친환경 의류 쇼핑몰

지속 가능한 패션을 위한 친환경 의류 전문 온라인 쇼핑몰입니다. 재활용 소재, 유기농 원료, 공정무역 등 친환경 가치를 중시하는 제품들을 제공합니다.

## 📋 프로젝트 개요

### 주요 특징
- 🌍 **친환경 제품**: 재활용 소재, 유기농 원료 사용 제품
- 📊 **환경 임팩트 추적**: 탄소 발자국, 물 사용량, 재활용 비율 표시
- 🏷️ **인증 시스템**: 유기농 인증, 공정무역 인증 표시
- 🔒 **사용자 인증**: JWT 기반 로그인/회원가입
- 📱 **반응형 디자인**: 모든 디바이스에서 최적화된 UI

### 기술 스택

#### 프론트엔드
- **Vue.js 3** - 프레임워크
- **Vue Router** - 라우팅
- **Axios** - HTTP 클라이언트
- **Tailwind CSS** - 스타일링
- **Vite** - 빌드 도구

#### 백엔드
- **Spring Boot 3.5.3** - 프레임워크
- **Spring Security** - 인증/인가
- **Spring Data JPA** - 데이터 액세스
- **JWT** - 토큰 기반 인증
- **H2 Database** - 인메모리 데이터베이스 (개발환경)
- **MariaDB** - 운영환경 데이터베이스 (향후 적용)

## 🚀 설치 및 실행

### 1. 필수 요구사항
- Java 17+
- Node.js 18+
- ~~MariaDB 10.5+~~ (현재 H2 인메모리 DB 사용)

### 2. 데이터베이스 설정
```bash
# 현재는 H2 인메모리 데이터베이스 사용
# 애플리케이션 시작시 자동으로 테이블 생성 및 초기 데이터 로드
# 별도 DB 설치 불필요

# 향후 MariaDB 연동시 참고
# mysql -u root -p
# source db/init.sql
```

### 3. 백엔드 실행
```bash
# 백엔드 디렉토리로 이동
cd backend-spring/demo

# Gradle로 빌드 및 실행 (Windows)
./gradlew.bat bootRun

# 또는 Linux/Mac
./gradlew bootRun
```

백엔드 서버는 `http://localhost:8080`에서 실행됩니다.

### 4. 프론트엔드 실행
```bash
# 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

프론트엔드는 `http://localhost:5173`에서 실행됩니다.

## 📁 프로젝트 구조

```
greenwear/
├── frontend/                   # Vue.js 프론트엔드
│   ├── src/
│   │   ├── components/        # 재사용 가능한 컴포넌트
│   │   ├── pages/            # 페이지 컴포넌트
│   │   ├── router/           # 라우팅 설정
│   │   └── services/         # API 서비스
│   └── package.json
├── backend-spring/            # Spring Boot 백엔드
│   └── demo/
│       ├── src/main/java/com/greenwear/demo/
│       │   ├── config/       # 설정 클래스
│       │   ├── controller/   # REST 컨트롤러
│       │   ├── entity/       # JPA 엔티티
│       │   ├── repository/   # 데이터 액세스
│       │   ├── service/      # 비즈니스 로직
│       │   └── dto/          # 데이터 전송 객체
│       └── src/main/resources/
│           └── application.yml
├── db/                        # 데이터베이스 스크립트
│   ├── init.sql              # 초기화 스크립트
│   └── README.md             # DB 설정 가이드
└── README.md
```

## 🔧 API 엔드포인트

### 인증 API
- `POST /api/auth/login` - 로그인 ✅
- `POST /api/auth/signup` - 회원가입 ✅

### 제품 API
- `GET /api/products` - 제품 목록 ✅
- `GET /api/products/{id}` - 특정 제품 조회 ✅
- `POST /api/products` - 제품 생성 (관리자) ✅
- `PUT /api/products/{id}` - 제품 수정 (관리자) ✅
- `DELETE /api/products/{id}` - 제품 삭제 (관리자) ✅

### 헬스 체크
- `GET /api/health` - 서버 상태 확인 ✅

**⚠️ 현재 상태**: API 구현은 완료되었으나 연결 테스트에서 401 오류 발생 중 (디버깅 진행 중)

## 👤 테스트 계정

### 관리자 계정
- **사용자명**: admin
- **이메일**: admin@greenwear.com
- **비밀번호**: password123

### 일반 사용자 계정
- **사용자명**: user1
- **이메일**: user1@greenwear.com
- **비밀번호**: password123

## 🌱 환경 데이터

제품별로 다음과 같은 환경 친화도 지표를 제공합니다:

- **환경 친화도 평점** (1-5)
- **탄소 발자국** (kg CO2)
- **재활용 소재 비율** (%)
- **물 사용량** (리터)
- **유기농 인증** 여부
- **공정무역 인증** 여부

## 🔍 주요 기능

### 1. 제품 카탈로그
- 친환경 의류 제품 브라우징
- 카테고리별, 브랜드별 필터링
- 환경 지표별 정렬 및 검색

### 2. 사용자 관리
- JWT 기반 안전한 인증
- 사용자 프로필 관리
- 역할 기반 권한 제어

### 3. 환경 임팩트 표시
- 실시간 환경 통계
- 제품별 상세 환경 정보
- 사용자의 환경 기여도 추적

## 🛠️ 개발 가이드

### 새로운 제품 추가
1. 데이터베이스에 제품 정보 추가
2. 환경 지표 데이터 입력
3. 이미지 업로드 및 URL 설정

### API 확장
1. 새로운 엔드포인트 컨트롤러에 추가
2. 프론트엔드 API 서비스 업데이트
3. 필요한 경우 새로운 엔티티/DTO 생성

### 스타일 커스터마이징
- Tailwind CSS 설정 파일에서 색상/스타일 수정
- 컴포넌트별 스타일 커스터마이징 가능

## 🚨 문제 해결

### 현재 알려진 이슈
**API 연결 401 오류 (2025.07.09 현재)**
- 증상: 모든 API 엔드포인트에서 401 Unauthorized 오류
- 추정 원인: JWT 필터 설정 또는 포트 바인딩 문제
- 해결 진행 중: Security 설정 및 서버 상태 점검

### 백엔드 연결 오류
1. ~~MariaDB 서버 실행 확인~~ (현재 H2 사용으로 불필요)
2. H2 데이터베이스 자동 설정 확인 (application.yml)
3. 포트 충돌 확인 (8080)
4. Java 프로세스 상태 확인: `Get-Process java`

### 백엔드 실행 관련
**Windows PowerShell 사용시 주의사항**:
```powershell
# 올바른 실행 방법
cd backend-spring/demo
.\gradlew.bat bootRun

# 잘못된 방법 (PowerShell에서 && 지원 안함)
cd backend-spring/demo && .\gradlew.bat bootRun
```

### 프론트엔드 빌드 오류
1. Node.js 버전 확인 (18+)
2. npm 캐시 정리: `npm cache clean --force`
3. node_modules 재설치: `rm -rf node_modules && npm install`

### CORS 오류
- 백엔드 SecurityConfig에서 CORS 설정 확인
- 프론트엔드 API 서비스의 baseURL 확인

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📊 개발 현황 (2025.07.09)

### 완료된 기능
- ✅ **백엔드 아키텍처**: Spring Boot + Security + JWT 인증
- ✅ **데이터 모델**: User, Product 엔티티 설계
- ✅ **API 구현**: 인증, 제품 관리, 헬스체크 엔드포인트
- ✅ **프론트엔드 기본 구조**: Vue.js 3 + 라우터 + 컴포넌트
- ✅ **API 연동 코드**: Axios 기반 서비스 레이어
- ✅ **H2 데이터베이스**: 초기 데이터 및 테스트 계정 설정

### 진행 중
- 🔄 **API 연결 디버깅**: 401 오류 해결 작업
- 🔄 **통합 테스트**: 프론트엔드-백엔드 연동 검증

### 예정된 기능
- 📋 **제품 필터링**: 카테고리, 환경지표별 검색
- 📋 **장바구니 시스템**: 상품 담기 및 주문 기능
- 📋 **환경 임팩트 계산기**: 개인별 환경 기여도 추적
- 📋 **관리자 패널**: 제품 및 사용자 관리

### 기술적 성과
- Spring Boot 3.x 최신 보안 설정 적용
- JWT 필터 및 CORS 정책 구현
- Vue.js 컴포넌트 기반 모듈화 구조
- Tailwind CSS 반응형 디자인

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**GreenWear** - 지속 가능한 패션으로 더 나은 미래를 만들어갑니다. 🌍💚 