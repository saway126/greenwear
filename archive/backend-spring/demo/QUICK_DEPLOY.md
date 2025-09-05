# 🚀 빠른 배포 가이드

## 방법 1: Railway (추천)

### 1단계: Railway 계정 생성
1. https://railway.app 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭

### 2단계: 백엔드 배포
1. "Deploy from GitHub repo" 선택
2. `greaenwear` 저장소 선택
3. **Root Directory**: `backend-spring/demo` 설정
4. "Deploy" 클릭

### 3단계: PostgreSQL 데이터베이스 추가
1. "Add Service" → "Database" → "PostgreSQL" 선택
2. 자동으로 환경변수가 설정됩니다

### 4단계: 환경변수 확인
Railway에서 자동으로 설정되는 환경변수:
- `DATABASE_URL`
- `DATABASE_USERNAME` 
- `DATABASE_PASSWORD`

추가로 설정할 환경변수:
```
DATABASE_DRIVER=org.postgresql.Driver
HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
H2_CONSOLE_ENABLED=false
DDL_AUTO=update
SHOW_SQL=false
```

## 방법 2: Render (대안)

### 1단계: Render 계정 생성
1. https://render.com 접속
2. GitHub 계정으로 로그인
3. "New +" → "New Blueprint" 선택

### 2단계: 저장소 선택
1. `greaenwear` 저장소 선택
2. "Apply" 클릭
3. `render.yaml` 파일이 자동으로 인식됩니다

## 예상 배포 시간
- Railway: 3-5분
- Render: 5-10분

## 배포 완료 후
1. 제공되는 URL 확인
2. `/actuator/health` 엔드포인트 테스트
3. 프론트엔드에서 백엔드 URL 업데이트
