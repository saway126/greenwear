# Render 자동 배포 가이드

## 🚀 자동 배포 방법

### 1. Render 계정 생성
1. https://render.com 접속
2. GitHub 계정으로 로그인
3. "New +" 버튼 클릭

### 2. Blueprint 배포
1. "New Blueprint" 선택
2. `greaenwear` 저장소 선택
3. "Apply" 클릭

### 3. 자동 설정
- `render.yaml` 파일이 자동으로 인식됩니다
- PostgreSQL 데이터베이스가 자동으로 생성됩니다
- 환경변수가 자동으로 설정됩니다
- 백엔드가 자동으로 빌드되고 배포됩니다

### 4. 배포 확인
1. 배포 완료 후 제공되는 URL 확인
2. `https://your-app.onrender.com/actuator/health` 접속
3. 정상 응답 확인

## 📋 자동 설정되는 환경변수
- `DATABASE_URL`: PostgreSQL 연결 URL
- `DATABASE_USERNAME`: 데이터베이스 사용자명
- `DATABASE_PASSWORD`: 데이터베이스 비밀번호
- `DATABASE_DRIVER`: org.postgresql.Driver
- `HIBERNATE_DIALECT`: PostgreSQL 방언
- `H2_CONSOLE_ENABLED`: false
- `DDL_AUTO`: update
- `SHOW_SQL`: false
- `SPRING_PROFILES_ACTIVE`: production

## 💰 비용
- **무료 티어**: 월 750시간 (거의 무제한)
- **PostgreSQL**: 무료 (1GB 데이터베이스)
- **총 비용**: 0원
