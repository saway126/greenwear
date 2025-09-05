# Railway PostgreSQL 연결 설정

## 현재 상황
- Railway에 `greenwear-db` PostgreSQL 데이터베이스가 있음
- Spring Boot가 PostgreSQL에 연결하지 못함

## 해결 방법

### Railway Variables 탭에서 다음 환경변수들을 추가/수정하세요:

```
SPRING_PROFILES_ACTIVE=production
DATABASE_URL=jdbc:postgresql://greenwear-db.railway.internal:5432/railway
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=[PostgreSQL 비밀번호]
DATABASE_DRIVER=org.postgresql.Driver
HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
H2_CONSOLE_ENABLED=false
DDL_AUTO=update
SHOW_SQL=false
```

### PostgreSQL 비밀번호 확인 방법:
1. Railway 대시보드에서 `greenwear-db` 클릭
2. **Variables** 탭에서 `POSTGRES_PASSWORD` 확인
3. 또는 **Connect** 탭에서 연결 정보 확인

## 수정 후
1. Railway가 자동으로 재배포를 시작합니다
2. Spring Boot가 PostgreSQL에 연결됩니다
3. Health Check가 통과할 것입니다
