# GreenWear 프로젝트 개발일지 및 회고

## 프로젝트 개요
**GreenWear** - 친환경 의류 전자상거래 플랫폼  
**기술 스택**: Vue.js 3 + Spring Boot 3.5.3 + H2 Database  
**목표**: 환경 영향을 추적할 수 있는 지속가능한 패션 마켓플레이스 구축

---

## 📅 2025년 7월 9일 - 백엔드 API 개발 및 통합 작업

### ✅ 완료된 작업들

#### 1. **Spring Boot 백엔드 아키텍처 구축**
- **위치**: `backend-spring/demo/`
- **주요 구성요소**:
  - JWT 기반 인증 시스템
  - RESTful API 설계
  - Spring Security 설정
  - CORS 정책 구성

#### 2. **데이터 모델링 및 엔티티 설계**
```java
// User 엔티티 - 사용자 인증 관리
@Entity
public class User {
    private Long id;
    private String username;
    private String email;
    private String password; // BCrypt 암호화
    private String role;     // USER, ADMIN
}

// Product 엔티티 - 친환경 제품 정보
@Entity  
public class Product {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String category;
    private Integer ecoRating;           // 환경 점수 (1-10)
    private Integer recycledContent;     // 재활용 함량 (%)
    private Boolean organicCertified;    // 유기농 인증
    private Boolean fairTradeCertified;  // 공정무역 인증
}
```

#### 3. **REST API 엔드포인트 구현**
- **인증 API** (`/api/auth/`)
  - `POST /signup` - 회원가입
  - `POST /login` - 로그인 (JWT 토큰 반환)
  
- **제품 API** (`/api/products/`)
  - `GET /` - 전체 제품 목록
  - `GET /{id}` - 특정 제품 조회
  - `POST /` - 새 제품 등록 (관리자만)
  - `PUT /{id}` - 제품 정보 수정 (관리자만)
  - `DELETE /{id}` - 제품 삭제 (관리자만)

- **헬스체크 API** (`/api/health`)
  - 서버 상태 모니터링

#### 4. **프론트엔드-백엔드 연동**
- **API 서비스 계층** (`frontend/src/services/api.js`)
  - Axios 기반 HTTP 클라이언트 구성
  - 인터셉터를 통한 JWT 토큰 자동 삽입
  - 에러 핸들링 및 토큰 만료 처리

- **Vue 컴포넌트 업데이트**
  - `LoginPage.vue` - 백엔드 로그인 API 연동
  - `SignupPage.vue` - 회원가입 API 연동  
  - `MainPage.vue` - 제품 목록 API 연동

#### 5. **데이터베이스 설정 및 초기 데이터**
- **H2 인메모리 데이터베이스** 채택
  - MariaDB 연결 문제로 인한 대안 선택
  - 개발 환경에서의 빠른 테스트 가능
  
- **초기 데이터 구성** (`db/init.sql`)
  - 테스트 계정: `admin/password123`, `user1/password123`
  - 친환경 의류 샘플 데이터 30개 제품
  - 다양한 카테고리: 상의, 하의, 아우터, 액세서리

### 🔧 해결한 기술적 문제들

#### 1. **Spring Security 호환성 문제**
**문제**: Spring Boot 3.x에서 deprecated된 메서드 사용
```java
// 기존 (deprecated)
.cors().and()

// 수정 (현재)
.cors(cors -> cors.configurationSource(corsConfigurationSource()))
```

#### 2. **JWT 인증 필터 어노테이션 문제**
**문제**: `JwtAuthenticationFilter`에서 `@NonNull` 어노테이션 누락으로 컴파일 오류
```java
// 수정 전
protected void doFilterInternal(HttpServletRequest request, 
                              HttpServletResponse response, 
                              FilterChain filterChain)

// 수정 후  
protected void doFilterInternal(@NonNull HttpServletRequest request, 
                              @NonNull HttpServletResponse response, 
                              @NonNull FilterChain filterChain)
```

#### 3. **PowerShell 명령어 호환성**
**문제**: Windows PowerShell에서 Linux 스타일 명령어 실행 오류
- `&&` 연산자 → 단계별 명령 실행으로 변경
- `curl` → `Invoke-WebRequest` 사용

### 🚧 현재 진행 상황 및 이슈

#### **백엔드 서버 상태**
- ✅ Spring Boot 애플리케이션 정상 빌드
- ✅ Java 프로세스 5개 실행 확인
- ❓ API 엔드포인트에서 401 Unauthorized 오류 발생
  - Health check: `GET /api/health` → 401 오류
  - Products API: `GET /api/products` → 401 오류
  - 8080 포트 리스닝 상태 불명확

#### **추정 원인 분석**
1. **JWT 필터 적용 범위**: Security Config에서 permitAll() 설정했으나 인증 필터가 먼저 적용되는 문제
2. **포트 충돌**: 다른 서비스가 8080 포트 사용 중일 가능성
3. **애플리케이션 시작 미완료**: 백그라운드 실행 중 초기화 과정에서 오류 발생 가능성

### 📊 프로젝트 진행률
- **백엔드 개발**: 90% (API 구현 완료, 연결 테스트 필요)
- **프론트엔드 통합**: 80% (API 연동 코드 완성, 실제 테스트 대기)
- **데이터베이스**: 100% (H2 설정 및 초기 데이터 완료)
- **전체 진행률**: 85%

### 🎯 다음 단계 계획
1. **즉시 해결 필요**
   - 백엔드 API 연결 문제 디버깅
   - 포트 및 서비스 상태 정밀 진단
   - 실제 API 호출 테스트 완료

2. **추가 개발 계획**
   - 프론트엔드 UI/UX 개선
   - 제품 필터링 및 검색 기능
   - 장바구니 및 주문 시스템
   - 환경 영향 계산기 구현

### 💡 배운 점들
1. **Spring Boot 3.x 마이그레이션**: 최신 버전의 변경사항을 사전에 확인하는 것의 중요성
2. **개발 환경 설정**: Docker나 통합 개발 환경 구축의 필요성 실감
3. **문제 해결 접근법**: 단계별 검증과 로그 분석의 중요성
4. **크로스 플랫폼 개발**: Windows 환경에서의 명령어 차이점 고려 필요

### 🔄 회고 및 개선점
**잘한 점**:
- 체계적인 API 설계 및 구현
- 보안을 고려한 JWT 인증 시스템 구축
- 친환경 특성을 반영한 데이터 모델 설계

**아쉬운 점**:
- 초기 환경 설정에서 예상보다 많은 시간 소요
- 실시간 디버깅 도구 부족
- 통합 테스트 환경 미비

**개선 방안**:
- Docker를 활용한 일관된 개발 환경 구축
- CI/CD 파이프라인 도입 검토
- API 문서화 도구(Swagger) 적용 고려

---

*"지속가능한 패션의 미래를 만들어가는 여정에서, 기술적 도전은 더 나은 솔루션으로 이어진다."* 