# GreenWear Database

## 개요
GreenWear 프로젝트의 MariaDB 데이터베이스 설정 및 초기 데이터입니다.

## 데이터베이스 설정

### 1. MariaDB 설치 및 실행
```bash
# Windows (Chocolatey)
choco install mariadb

# macOS (Homebrew)
brew install mariadb

# Linux (Ubuntu)
sudo apt-get install mariadb-server
```

### 2. 데이터베이스 초기화
```bash
# MariaDB 접속
mysql -u root -p

# 초기화 스크립트 실행
source /path/to/greenwear/db/init.sql
```

### 3. 설정 확인
```sql
-- 데이터베이스 확인
SHOW DATABASES;

-- 사용자 확인
SELECT User, Host FROM mysql.user WHERE User = 'greenwear_user';

-- 테이블 확인
USE greenwear_db;
SHOW TABLES;
```

## 데이터베이스 구조

### 주요 테이블

#### users
- 사용자 정보 저장
- JWT 인증에 사용
- 역할 기반 권한 관리

#### products
- 친환경 의류 제품 정보
- 환경 친화도 지표 포함
- 재고 관리 기능

#### user_roles
- 사용자 역할 매핑 테이블

#### product_images
- 제품 추가 이미지 저장

## 기본 계정

### 관리자 계정
- **Username**: admin
- **Email**: admin@greenwear.com
- **Password**: password123
- **Role**: ADMIN, USER

### 테스트 계정
- **Username**: user1
- **Email**: user1@greenwear.com
- **Password**: password123
- **Role**: USER

## 환경 변수

Spring Boot application.properties에서 다음 설정을 사용합니다:

```properties
spring.datasource.url=jdbc:mariadb://localhost:3306/greenwear_db
spring.datasource.username=greenwear_user
spring.datasource.password=greenwear_password
```

## 더미 데이터

초기화 스크립트는 다음과 같은 샘플 데이터를 포함합니다:

- **사용자**: 관리자 1명, 일반 사용자 2명
- **제품**: 10개의 친환경 의류 제품
  - 유기농 코튼 티셔츠
  - 재활용 소재 바지
  - 비건 신발
  - 재생 플라스틱 가방 등

각 제품은 다음과 같은 환경 친화 지표를 포함합니다:
- 환경 친화도 평점 (1-5)
- 탄소 발자국 (kg CO2)
- 재활용 소재 비율 (%)
- 물 사용량 (리터)
- 유기농 인증 여부
- 공정무역 인증 여부

## 백업 및 복구

### 백업
```bash
mysqldump -u greenwear_user -p greenwear_db > greenwear_backup.sql
```

### 복구
```bash
mysql -u greenwear_user -p greenwear_db < greenwear_backup.sql
```

## 참고사항

- 비밀번호는 BCrypt로 해시화되어 저장됩니다
- JPA가 테이블을 자동 생성하므로 스키마 변경은 엔티티 클래스를 통해 관리됩니다
- 프로덕션 환경에서는 더 강력한 비밀번호를 사용하세요 