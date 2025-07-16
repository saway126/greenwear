# 🌱 GreenWear 프로젝트 개발 회고록: AI와 함께한 풀스택 개발 여정

> **프로젝트 기간**: 2025년 7월  
> **개발 환경**: Vue.js 3 + Spring Boot 3.5.3 + MariaDB + Docker  
> **AI 협업 도구**: Cursor AI + Gemini CLI  

---

## 📝 프로젝트 개요

친환경 의류 전자상거래 플랫폼 **GreenWear**를 개발하면서 AI 도구들과 협업한 경험을 기록합니다. 단순히 코드를 작성하는 것을 넘어서, AI가 어떻게 문제 해결의 파트너가 될 수 있는지 실제 경험을 통해 공유하고자 합니다.

### 🎯 주요 기술 스택
- **Frontend**: Vue.js 3 + Vite + Tailwind CSS
- **Backend**: Spring Boot 3.5.3 + Spring Security + JWT
- **Database**: MariaDB + JPA/Hibernate
- **DevOps**: Docker + Docker Compose
- **AI Tools**: Cursor AI + Gemini CLI

---

## 🚀 개발 여정 타임라인

### Phase 1: 프로젝트 구조 설계 (7월 초)

**첫 번째 도전**: 기존 HTML/CSS 프로젝트를 현대적인 풀스택 애플리케이션으로 전환

```
기존 구조:
frontend/ (HTML/CSS/JS)
backend/ (Node.js - 미완성)
db/ (설계만 존재)

목표 구조:
frontend/ (Vue.js 3)
backend-spring/ (Spring Boot)
db/ (MariaDB + Docker)
```

**Cursor AI의 역할**:
- 프로젝트 구조 분석 및 마이그레이션 전략 제안
- Vue.js 3 컴포넌트 아키텍처 설계
- Spring Boot 의존성 설정 자동화

```gradle
// AI가 제안한 build.gradle 의존성
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-websocket'
    implementation 'org.mariadb.jdbc:mariadb-java-client'
    implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
    // ... 추가 의존성들
}
```

### Phase 2: 백엔드 API 개발 (7월 중순)

**핵심 과제**: JWT 인증 시스템과 RESTful API 구현

**개발한 주요 컴포넌트**:

1. **사용자 인증 시스템**
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;
    
    // Cursor AI가 제안한 환경 점수 필드
    @Column(name = "environmental_score")
    private Integer environmentalScore = 0;
}
```

2. **제품 관리 시스템**
```java
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String description;
    private BigDecimal price;
    
    // AI가 제안한 친환경 평가 시스템
    @Column(name = "eco_rating")
    private Integer ecoRating;
    
    @Column(name = "carbon_footprint")
    private BigDecimal carbonFootprint;
}
```

**AI의 도움이 특히 유용했던 부분**:
- Spring Security 설정의 복잡한 람다 표현식
- JWT 토큰 생성/검증 로직
- 페이징 처리와 정렬 기능

### Phase 3: 첫 번째 위기 - Spring Boot 3.x 호환성 이슈

**문제 상황**: 
```java
// 기존 코드 (deprecated in Spring Boot 3.x)
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .cors().and()  // ❌ Deprecated!
            .csrf().disable()
            // ...
    }
}
```

**해결 과정**:
1. **Cursor AI**: 문제 진단 및 Spring Boot 3.x 방식 제안
2. **개발자**: 코드 적용 및 테스트
3. **결과**: 현대적인 람다 기반 설정으로 업데이트

```java
// AI가 제안한 해결책
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**", "/api/health").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
            .anyRequest().authenticated()
        )
        .sessionManagement(session -> 
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )
        .addFilterBefore(jwtAuthenticationFilter, 
            UsernamePasswordAuthenticationFilter.class)
        .build();
}
```

### Phase 4: Docker 컨테이너화 (7월 중순)

**목표**: 개발 환경 표준화 및 배포 자동화

**Docker Compose 설정**:
```yaml
version: '3.8'
services:
  mariadb:
    image: mariadb:10.6
    container_name: greenwear-db
    environment:
      MARIADB_ROOT_PASSWORD: rootpassword
      MARIADB_DATABASE: greenwear_db
      MARIADB_USER: greenwear_user
      MARIADB_PASSWORD: greenwear_password
    ports:
      - "3306:3306"
    volumes:
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      timeout: 20s
      retries: 10

  backend:
    build: 
      context: ./backend-spring/demo
      dockerfile: Dockerfile
    container_name: greenwear-backend
    depends_on:
      mariadb:
        condition: service_healthy
    ports:
      - "8081:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mariadb://mariadb:3306/greenwear_db
      SPRING_DATASOURCE_USERNAME: greenwear_user
      SPRING_DATASOURCE_PASSWORD: greenwear_password

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: greenwear-frontend
    ports:
      - "8080:80"
    depends_on:
      - backend
```

**AI의 기여**:
- 멀티 스테이지 빌드 Dockerfile 최적화
- 헬스체크 설정 및 의존성 관리
- Nginx 설정을 통한 프론트엔드 최적화

### Phase 5: 두 번째 위기 - 401 인증 에러의 미스터리

**문제**: 모든 API 요청이 401 Unauthorized 반환

**증상**:
```bash
curl http://localhost:8081/api/health
# ❌ 401 Unauthorized (예상: 200 OK)
```

**디버깅 과정**:

1. **1차 시도**: JWT 토큰 문제로 추정
   - JWT 생성/검증 로직 점검 ✅
   - 토큰 없는 public 엔드포인트도 401 ❌

2. **2차 시도**: Spring Security 설정 문제로 추정
   - SecurityConfig의 permitAll() 설정 확인 ✅
   - 여전히 동일한 문제 ❌

3. **3차 시도 - Gemini CLI 투입**: 
```bash
gemini "Spring Boot API가 모든 요청에 401을 반환하는 이유를 분석해줘"
```

**🎯 Gemini CLI의 핵심 인사이트**:
> "컨트롤러의 @RequestMapping과 application.yml의 context-path가 중복되어 경로가 `/api/api/health`가 되고 있을 가능성이 높습니다."

**원인 발견**:
```yaml
# application.yml
server:
  servlet:
    context-path: /api  # 🔍 여기가 문제!
```

```java
// 컨트롤러들
@RestController
@RequestMapping("/api/auth")  // 🔍 중복!
public class AuthController { ... }

@RestController
@RequestMapping("/api/products")  // 🔍 중복!
public class ProductController { ... }
```

**실제 생성된 경로**: `/api/api/auth/login` ❌  
**의도한 경로**: `/api/auth/login` ✅

**해결책**:
```java
// 수정 후
@RestController
@RequestMapping("/auth")  // /api 제거
public class AuthController { ... }

@RestController
@RequestMapping("/products")  // /api 제거
public class ProductController { ... }
```

**결과**: 🎉 모든 API 엔드포인트 정상 작동!

### Phase 6: 데이터베이스 통합 및 더미 데이터

**데이터베이스 초기화 스크립트**:
```sql
-- AI가 생성한 종합적인 더미 데이터
INSERT INTO users (email, password, full_name, role, environmental_score, created_at) VALUES
('admin@greenwear.com', '$2a$10$..hash..', 'GreenWear Admin', 'ADMIN', 95, NOW()),
('user@greenwear.com', '$2a$10$..hash..', 'Eco User', 'USER', 78, NOW()),
('buyer@greenwear.com', '$2a$10$..hash..', 'Green Buyer', 'USER', 82, NOW());

INSERT INTO products (name, description, price, category, eco_rating, carbon_footprint, material, created_at) VALUES
('오가닉 코튼 티셔츠', '100% 유기농 면으로 제작된 친환경 티셔츠', 35000.00, 'TOPS', 9, 2.1, 'Organic Cotton', NOW()),
('재활용 폴리에스터 후디', '재활용 플라스틱 병으로 만든 따뜻한 후드티', 68000.00, 'TOPS', 8, 3.2, 'Recycled Polyester', NOW()),
('헴프 데님 팬츠', '지속가능한 헴프 소재의 데님 바지', 89000.00, 'BOTTOMS', 9, 4.1, 'Hemp Fiber', NOW());
```

### Phase 7: 프론트엔드 API 통합

**Vue.js API 서비스**:
```javascript
// AI가 설계한 API 클라이언트
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JWT 토큰 자동 추가
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/auth/register', userData),
  getCurrentUser: () => apiClient.get('/auth/me'),
};

export const productAPI = {
  getProducts: (params) => apiClient.get('/products', { params }),
  getProduct: (id) => apiClient.get(`/products/${id}`),
  createProduct: (productData) => apiClient.post('/products', productData),
};
```

---

## 🤖 AI 도구별 활용 경험

### Cursor AI의 강점

1. **컨텍스트 이해**: 전체 프로젝트 구조를 파악하고 일관된 코드 스타일 제안
2. **실시간 협업**: 타이핑과 동시에 적절한 코드 완성 제안
3. **리팩토링**: 기존 코드를 현대적 패턴으로 개선하는 능력

**인상적이었던 순간**:
```java
// 내가 작성한 기본 구조
@Entity
public class User {
    private String email;
    // Cursor가 자동으로 다음을 제안:
    
    @Column(unique = true, nullable = false, length = 100)
    private String email;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
```

### Gemini CLI의 강점

1. **문제 진단**: 복잡한 버그의 근본 원인 파악
2. **아키텍처 조언**: 전체적인 설계 관점에서의 제안
3. **베스트 프랙티스**: 업계 표준에 맞는 구현 방법 제시

**결정적 도움을 받은 케이스**:
- API 경로 중복 문제 진단
- Spring Boot 3.x 마이그레이션 가이드
- Docker 컨테이너 네트워킹 이슈 해결

---

## 💡 주요 학습 포인트

### 1. AI와의 효과적인 협업 방법

**DO:**
- 구체적이고 상세한 질문하기
- 에러 로그와 코드를 함께 제공
- AI 제안을 맹신하지 말고 검증하기

**DON'T:**
- 모호한 질문으로 시간 낭비
- AI 코드를 이해 없이 복붙
- 기본적인 문법이나 개념 학습 소홀히

### 2. 디버깅에서의 AI 활용

**전통적 방법**: 구글 검색 → 스택오버플로우 → 시행착오  
**AI 활용 방법**: 구체적 상황 설명 → AI 분석 → 가설 검증 → 해결

**예시**:
```bash
# ❌ 비효과적
"Spring Boot 401 에러"

# ✅ 효과적  
"Spring Boot 3.5.3에서 /health 엔드포인트가 permitAll() 설정했는데도 401 반환. 
SecurityConfig와 Controller 코드는 다음과 같음: [코드 첨부]"
```

### 3. 코드 품질 향상

AI 도구 사용 전후 코드 품질 비교:

**Before (수동 작성)**:
```java
@RestController
public class ProductController {
    @Autowired
    private ProductService productService;
    
    @GetMapping("/products")
    public List<Product> getProducts() {
        return productService.findAll();
    }
}
```

**After (AI 협업)**:
```java
@RestController
@RequestMapping("/products")
@Validated
@Slf4j
public class ProductController {
    
    private final ProductService productService;
    
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    
    @GetMapping
    public ResponseEntity<PagedResponse<ProductDTO>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir) {
        
        log.info("Fetching products - page: {}, size: {}, sortBy: {}, sortDir: {}", 
                page, size, sortBy, sortDir);
        
        PagedResponse<ProductDTO> response = productService.getProducts(page, size, sortBy, sortDir);
        return ResponseEntity.ok(response);
    }
}
```

---

## 🎯 프로젝트 성과

### 기술적 성과

1. **풀스택 애플리케이션 완성**: Vue.js + Spring Boot + MariaDB
2. **Docker 컨테이너화**: 개발 환경 표준화 달성
3. **JWT 인증 시스템**: 보안이 강화된 API 구현
4. **RESTful API**: CRUD 작업의 완전한 구현

### 개발 프로세스 개선

**개발 속도**: 기존 대비 약 **60% 향상**
- 보일러플레이트 코드 자동 생성
- 버그 진단 시간 단축
- 베스트 프랙티스 즉시 적용

**코드 품질**: 
- 일관된 네이밍 컨벤션
- 적절한 예외 처리
- 보안 고려사항 반영

### 학습 효과

1. **Spring Boot 3.x 마이그레이션** 실무 경험
2. **Docker 컨테이너 오케스트레이션** 이해
3. **AI 도구를 활용한 협업** 방법론 습득

---

## 🔮 향후 계획

### 단기 목표 (1개월)

1. **프론트엔드 고도화**
   - 상품 검색 및 필터링 기능
   - 장바구니 및 주문 시스템
   - 반응형 디자인 완성

2. **백엔드 확장**
   - 결제 시스템 통합
   - 이메일 알림 서비스
   - 관리자 대시보드

3. **배포 자동화**
   - GitHub Actions CI/CD
   - AWS/GCP 클라우드 배포
   - 모니터링 시스템 구축

### 중장기 목표 (3-6개월)

1. **AI 기반 추천 시스템**
   - 사용자 취향 기반 제품 추천
   - 환경 점수 기반 랭킹 시스템

2. **마이크로서비스 아키텍처**
   - 서비스 분리 및 독립 배포
   - API Gateway 도입

3. **데이터 분석 플랫폼**
   - 사용자 행동 분석
   - 환경 영향 추적 시스템

---

## 🤔 회고 및 소감

### 가장 인상 깊었던 순간

**"AI가 해결해준 버그"**: API 경로 중복 문제를 Gemini CLI가 단번에 진단해준 순간이 가장 인상적이었습니다. 사람이라면 몇 시간 또는 몇 일이 걸렸을 문제를 몇 분 만에 해결할 수 있었습니다.

### AI 협업의 한계

1. **창의성의 한계**: 새로운 아이디어나 혁신적 접근은 여전히 인간의 영역
2. **컨텍스트 이해**: 프로젝트의 비즈니스 로직이나 특수한 요구사항은 설명이 필요
3. **최신 기술**: 매우 최신 기술이나 베타 버전에 대한 정보는 부정확할 수 있음

### 개발자로서의 성장

**Before**: 문제 → 구글링 → 시행착오 → 해결  
**After**: 문제 → AI 상담 → 가설 수립 → 검증 → 해결  

AI 도구를 사용하면서 **더 나은 질문을 하는 법**을 배웠습니다. 막연한 질문보다는 구체적이고 맥락이 있는 질문이 더 좋은 답을 이끌어낸다는 것을 깨달았습니다.

### 미래의 개발자상

AI 시대의 개발자는:
- **AI와 협업하는 능력**이 핵심 스킬
- **문제 정의와 해결 방향 설정**이 더욱 중요
- **코딩보다는 아키텍처와 설계**에 더 집중

---

## 📚 참고 자료 및 도구

### 사용한 AI 도구
- [Cursor AI](https://cursor.sh/) - IDE 통합 AI 코딩 어시스턴트
- [Gemini CLI](https://github.com/google/gemini-cli) - 터미널 기반 AI 어시스턴트

### 기술 문서
- [Spring Boot 3.x Migration Guide](https://spring.io/projects/spring-boot)
- [Vue.js 3 Composition API](https://vuejs.org/guide/introduction.html)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

### 프로젝트 저장소
- GitHub: [GreenWear Project](https://github.com/saway126/greaenwear)
- Branch: `backend-api-development`

---

## 📞 마치며

AI와 함께한 이번 개발 경험은 단순히 기술을 배우는 것을 넘어서, **미래의 개발 방식**을 미리 경험해보는 소중한 기회였습니다. 

AI는 우리를 대체하는 것이 아니라, **더 나은 개발자가 되도록 도와주는 강력한 파트너**라는 것을 실감했습니다. 

앞으로도 AI 도구들과 함께 더 나은 소프트웨어를 만들어가는 여정을 계속해나가겠습니다.

---

*"The best way to predict the future is to create it."* - Peter Drucker

**Happy Coding with AI! 🚀**

---

**작성일**: 2025년 7월 16일  
**작성자**: GreenWear 개발팀  
**개발 환경**: Windows 11 + Cursor AI + Gemini CLI  
**총 개발 기간**: 약 2주  
**AI 협업 시간**: 총 개발 시간의 약 70% 