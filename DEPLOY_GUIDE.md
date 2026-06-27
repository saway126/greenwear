# GreenWear 무료 배포 가이드

## 📐 아키텍처

```
[사용자 브라우저]
       ↓
[Vercel - 프론트엔드 Vue.js] (무료)
       ↓ API 요청
[Railway - Node.js 백엔드] (무료 $5 크레딧)
       ↓
[Railway - MariaDB/MySQL] (같은 프로젝트, 무료)
```

---

## 1단계: Railway 백엔드 + DB 배포

### 1-1. Railway 가입 및 프로젝트 생성
1. https://railway.app 접속 → GitHub 계정으로 로그인
2. **New Project** → **Deploy from GitHub repo** → `greenwear` 선택
3. **backend** 폴더를 Root Directory로 설정

### 1-2. MariaDB(MySQL) 플러그인 추가
1. Railway 프로젝트 대시보드에서 **+ New** → **Database** → **MySQL** 선택
2. MySQL 서비스가 생성되면 **Variables** 탭에서 연결 정보 확인:
   - `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`

### 1-3. 백엔드 환경 변수 설정
Railway 백엔드 서비스 → **Variables** 탭에서 추가:

```
DB_HOST     = (Railway MySQL의 MYSQL_HOST 값)
DB_PORT     = (Railway MySQL의 MYSQL_PORT 값)
DB_USER     = (Railway MySQL의 MYSQL_USER 값)
DB_PASSWORD = (Railway MySQL의 MYSQL_PASSWORD 값)
DB_NAME     = (Railway MySQL의 MYSQL_DATABASE 값)
DB_SSL      = false
NODE_ENV    = production
PORT        = 5000
ALLOWED_ORIGINS = https://your-app.vercel.app
```

> Railway MySQL은 내부 네트워크로 연결되므로 SSL 불필요

### 1-4. DB 초기 설정
Railway MySQL → **Query** 탭에서 `db/init.sql` 내용 붙여넣기 실행

### 1-5. 배포 확인
배포 후 `https://your-backend.up.railway.app/api/health` 접속 → `"status": "OK"` 확인

---

## 2단계: Vercel 프론트엔드 배포

### 2-1. Vercel 가입
1. https://vercel.com 접속 → GitHub 계정으로 로그인
2. **New Project** → `greenwear` 레포 선택

### 2-2. 빌드 설정
- **Root Directory**: `. (프로젝트 루트)`
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 2-3. 환경 변수 설정
Vercel 프로젝트 → **Settings** → **Environment Variables**:

```
VITE_API_BASE_URL = https://your-backend.up.railway.app
```

### 2-4. CORS 업데이트
Railway 백엔드의 `ALLOWED_ORIGINS` 변수에 Vercel URL 추가:
```
ALLOWED_ORIGINS = https://your-app.vercel.app
```

---

## 3단계: 로컬 개발 환경

### MariaDB 로컬 설치 (Windows)
```bash
# Chocolatey로 설치
choco install mariadb

# 또는 공식 다운로드
# https://mariadb.org/download/
```

### 백엔드 실행
```bash
cd backend

# .env 파일 생성
copy .env.example .env
# .env 파일에서 DB 정보 수정

# 패키지 설치
npm install

# DB 초기화 (MariaDB 실행 후)
mysql -u root -p < ../db/init.sql

# 서버 시작
npm start
```

### 프론트엔드 실행
```bash
# 프로젝트 루트에서
npm install

# .env 파일 생성
copy .env.example .env
# VITE_API_BASE_URL=http://localhost:5000

npm run dev
```

---

## 🆓 무료 한도 정리

| 서비스 | 무료 한도 | 용도 |
|--------|-----------|------|
| **Vercel** | 무제한 (개인 프로젝트) | Vue.js 프론트엔드 |
| **Railway** | 월 $5 크레딧 | Node.js 백엔드 + MySQL DB |
| **GitHub** | 무료 (public repo) | 코드 저장 + 자동 배포 |

Railway $5 크레딧으로 소규모 서비스 운영 가능.
트래픽이 늘어나면 $5/월 플랜으로 업그레이드.

---

## ✅ 배포 후 확인 체크리스트

- [ ] `GET /api/health` → `"database": "✅ 연결됨"` 확인
- [ ] 회원가입/로그인 테스트
- [ ] 상품 목록 조회 (`/api/products`)
- [ ] 생체신호 분석 (`POST /api/vitals`)
- [ ] 실시간 스트림 (`/api/vitals-stream`)
- [ ] IoT 데이터 전송 (`POST /api/wearable/data`)

---

## 기본 테스트 계정 (init.sql 실행 후)

| 이메일 | 비밀번호 |
|--------|----------|
| admin@greenwear.com | password123 |
| user1@greenwear.com | password123 |
| user2@greenwear.com | password123 |
