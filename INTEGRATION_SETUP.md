# Vercel(Frontend) + Railway(Spring Boot Backend) 통합 가이드

## 환경 변수 설정

### Vercel (Frontend) 환경 변수
```bash
# Vercel Dashboard → Project Settings → Environment Variables
VITE_API_BASE=https://greenwear-backend-spring-production.up.railway.app
```

### Railway (Spring Boot Backend) 환경 변수
```bash
# Railway Dashboard → Project → Variables
SPRING_PROFILES_ACTIVE=production
PORT=8080
JWT_SECRET=greenWearSecretKey2024ForJWTTokenGeneration

# Database (PostgreSQL - Railway 자동 주입)
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
DATABASE_USERNAME=user
DATABASE_PASSWORD=pass
DATABASE_DRIVER=org.postgresql.Driver

# 또는 개별 DB 변수 사용
DB_HOST=host
DB_PORT=5432
DB_NAME=greenwear
DB_USER=user
DB_PASS=pass
DB_SSL_MODE=require

# JPA 설정
DDL_AUTO=update
SHOW_SQL=false
HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
```

## API 테스트 명령어

### 1. Spring Boot Backend Health Check
```bash
curl -X GET https://greenwear-backend-spring-production.up.railway.app/api/health \
  -H "Accept: application/json" \
  | jq '.'
```

**예상 응답:**
```json
{
  "status": "UP",
  "message": "GreenWear Spring Boot API is running",
  "timestamp": "2025-01-02T12:34:56",
  "profile": "production",
  "port": "8080",
  "version": "1.0.0"
}
```

### 2. CORS 테스트 (Vercel에서 Backend 호출)
```bash
curl -X OPTIONS https://greenwear-backend-spring-production.up.railway.app/api/health \
  -H "Origin: https://greenwear.vercel.app" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

**예상 헤더:**
```
Access-Control-Allow-Origin: https://greenwear.vercel.app
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: true
```

## 변경된 파일 목록

### Spring Boot Backend
- `SecurityConfig.java` - CORS 설정 업데이트 (Vercel 도메인 허용)
- `HealthController.java` - 상세 헬스 정보 추가
- `application-production.yml` - DB 환경변수 유연화

### Vue.js Frontend  
- `api.js` - API base URL 환경변수 통합
- `useVitalsStore.ts` - SSE/axios 호출 환경변수 적용

## 배포 체크리스트

### Vercel (Frontend)
- [ ] `VITE_API_BASE` 환경변수 설정
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Framework Preset: Vite

### Railway (Spring Boot Backend)
- [ ] Root Directory: `backend-spring/demo`
- [ ] Builder: Dockerfile
- [ ] `SPRING_PROFILES_ACTIVE=production` 설정
- [ ] PostgreSQL 데이터베이스 연결
- [ ] Health Check Path: `/api/health`

## 문제 해결

### CORS 오류 발생 시
1. Vercel 배포 도메인을 `SecurityConfig.java`의 `allowedOrigins`에 추가
2. Railway에서 재배포

### API 연결 실패 시
1. Railway 서비스 상태 확인
2. `VITE_API_BASE` 환경변수 값 확인
3. Health endpoint 직접 테스트

### 데이터베이스 연결 오류 시
1. Railway PostgreSQL 서비스 상태 확인
2. `DATABASE_URL` 형식 검증
3. SSL 모드 설정 확인 (`sslmode=require`)