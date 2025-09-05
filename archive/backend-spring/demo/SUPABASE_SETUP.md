# Supabase + Railway 배포 가이드

## 1. Supabase 데이터베이스 설정
1. https://supabase.com 접속
2. "Start your project" 클릭
3. 새 프로젝트 생성
4. Settings → Database에서 연결 정보 확인:
   - Host: `db.xxx.supabase.co`
   - Database: `postgres`
   - Username: `postgres`
   - Password: 프로젝트 생성 시 설정한 비밀번호
   - Port: `5432`

## 2. Railway에 백엔드 배포
1. https://railway.app 접속
2. GitHub 계정으로 로그인
3. "New Project" → "Deploy from GitHub repo"
4. `greaenwear` 저장소 선택
5. `backend-spring/demo` 폴더 선택

## 3. Railway 환경변수 설정
```
DATABASE_URL=jdbc:postgresql://db.xxx.supabase.co:5432/postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_supabase_password
DATABASE_DRIVER=org.postgresql.Driver
HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
H2_CONSOLE_ENABLED=false
DDL_AUTO=update
SHOW_SQL=false
```

## 4. 배포 확인
1. Railway에서 배포 URL 확인
2. `https://your-app.railway.app/actuator/health` 접속
3. 프론트엔드 API 문서에서 백엔드 URL 업데이트

## 비용
- **Supabase**: 무료 (500MB 데이터베이스)
- **Railway**: 무료 (월 5달러 크레딧)
