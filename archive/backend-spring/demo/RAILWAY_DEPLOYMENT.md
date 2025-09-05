# Railway 배포 가이드

## 1. Railway 계정 생성
1. https://railway.app 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭

## 2. 프로젝트 배포
1. "Deploy from GitHub repo" 선택
2. `greaenwear` 저장소 선택
3. `backend-spring/demo` 폴더 선택

## 3. 데이터베이스 설정
1. "Add Service" → "Database" → "PostgreSQL" 선택
2. 자동으로 환경변수가 설정됩니다:
   - `DATABASE_URL`
   - `DATABASE_USERNAME`
   - `DATABASE_PASSWORD`

## 4. 환경변수 설정
Railway 대시보드에서 다음 환경변수들을 설정:

```
DATABASE_DRIVER=org.postgresql.Driver
HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
H2_CONSOLE_ENABLED=false
DDL_AUTO=update
SHOW_SQL=false
```

## 5. 배포 확인
1. 배포 완료 후 제공되는 URL 확인
2. `https://your-app.railway.app/actuator/health` 접속하여 상태 확인

## 6. 프론트엔드에서 백엔드 URL 업데이트
배포된 백엔드 URL을 프론트엔드 API 문서에 업데이트하세요.
