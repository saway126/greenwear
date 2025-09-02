# Railway 환경변수 설정

Railway 대시보드에서 다음 환경변수들을 설정하세요:

```
DATABASE_DRIVER=org.postgresql.Driver
HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
H2_CONSOLE_ENABLED=false
DDL_AUTO=update
SHOW_SQL=false
SPRING_PROFILES_ACTIVE=production
```

## 설정 방법
1. Railway 프로젝트 대시보드로 이동
2. 백엔드 서비스 클릭
3. "Variables" 탭 선택
4. 위의 환경변수들을 하나씩 추가
5. "Redeploy" 클릭
