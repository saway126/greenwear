# Railway 환경변수 수정 가이드

## 현재 문제
- `SPRING_PROFILES_ACTIVE=production` (PostgreSQL 설정)
- 하지만 우리가 만든 프로파일은 H2 인메모리 DB 사용

## 해결 방법

### Railway Variables 탭에서 다음 환경변수들을 수정하세요:

```
SPRING_PROFILES_ACTIVE=railway-ultra-simple
DATABASE_DRIVER=org.h2.Driver
HIBERNATE_DIALECT=org.hibernate.dialect.H2Dialect
H2_CONSOLE_ENABLED=true
DDL_AUTO=create-drop
SHOW_SQL=false
```

### 또는 더 간단하게:

```
SPRING_PROFILES_ACTIVE=railway-ultra-simple
```

이렇게 하면 `application-railway-ultra-simple.yml`의 H2 설정이 사용됩니다.

## 수정 후
1. Railway가 자동으로 재배포를 시작합니다
2. Spring Boot가 H2 인메모리 DB로 시작됩니다
3. Health Check가 통과할 것입니다
