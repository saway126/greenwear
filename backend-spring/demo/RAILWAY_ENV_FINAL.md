# Railway 환경변수 최종 설정 가이드

## 문제
PostgreSQL 인증 오류: "no password was provided"

## 해결 방법

### Railway Variables 탭에서 다음 환경변수들을 정확히 설정하세요:

```
SPRING_PROFILES_ACTIVE=production
SPRING_DATASOURCE_URL=jdbc:postgresql://greenwear-db.railway.internal:5432/railway
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=loMaOAEPOepJHzUTJnWnPumnVYrtDxlm
SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver
SPRING_JPA_DATABASE_PLATFORM=org.hibernate.dialect.PostgreSQLDialect
SPRING_H2_CONSOLE_ENABLED=false
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=false
```

### 중요 사항:
1. **SPRING_** 접두사가 중요합니다
2. **DATABASE_PASSWORD**가 아닌 **SPRING_DATASOURCE_PASSWORD**를 사용
3. 모든 변수명이 정확해야 합니다

## 설정 후
1. "Apply changes" 버튼 클릭
2. Railway가 자동으로 재배포 시작
3. Spring Boot가 PostgreSQL에 정상 연결
