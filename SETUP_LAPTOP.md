# 노트북에서 GreenWear IoT 시스템 설정 가이드

## 🚀 빠른 시작

### 1. Git 저장소 클론
```bash
git clone https://github.com/saway126/greenwear.git
cd greenwear
```

### 2. Python 환경 설정
```bash
# Python 가상환경 생성
python -m venv venv

# 가상환경 활성화 (Windows)
venv\Scripts\activate

# 가상환경 활성화 (Mac/Linux)
source venv/bin/activate

# 필요한 패키지 설치
pip install requests
```

### 3. Galaxy Watch 4 시뮬레이터 실행
```bash
python galaxy-watch-simulator.py
```

## 🔧 상세 설정

### 백엔드 서버 (선택사항 - 로컬 실행)
```bash
cd backend
npm install
node server.js
```

### 프론트엔드 개발 서버 (선택사항 - 로컬 실행)
```bash
npm install
npm run dev
```

## 🌐 배포된 서비스 사용

### Railway 백엔드 API
- **URL**: `https://greenweariot-production.up.railway.app`
- **Health Check**: `https://greenweariot-production.up.railway.app/api/health`
- **Wearable Data**: `https://greenweariot-production.up.railway.app/api/wearable/data`

### Vercel 프론트엔드
- **URL**: `https://greenwear-demo.vercel.app`
- **실시간 대시보드**: IoT 데이터 모니터링

## 📱 Galaxy Watch 4 연동

### Android Studio 설정
1. Android Studio 설치
2. Wear OS SDK 설치
3. 프로젝트 열기: `galaxy-watch-app/`
4. Galaxy Watch 4 연결 후 앱 설치

### 실제 센서 데이터 수집
- 심박수 센서
- 걸음 수 센서
- 가속도계
- 배터리 레벨

## 🧪 테스트

### API 테스트
```bash
python test-railway-api.py
```

### 시뮬레이터 테스트
```bash
python galaxy-watch-simulator.py
```

## 📊 현재 수집된 데이터

Railway 서버에 저장된 실제 데이터:
- 디바이스: Galaxy Watch4 (GALAXY_WATCH4_001)
- 심박수: 75-94 BPM
- 체온: 36.5-37.3°C
- 걸음수: 0-1000걸음
- 배터리: 85-100%

## 🔗 주요 파일들

- `galaxy-watch-simulator.py`: Galaxy Watch 4 시뮬레이터
- `test-railway-api.py`: API 테스트 스크립트
- `galaxy-watch-app/`: Wear OS 앱 프로젝트
- `backend/server.js`: Node.js 백엔드 서버
- `src/`: Vue.js 프론트엔드

## 🚀 즉시 사용 가능

1. Git 클론 후 바로 시뮬레이터 실행 가능
2. Railway/Vercel 서비스는 이미 배포되어 즉시 사용 가능
3. Android Studio로 실제 Galaxy Watch 4 연동 가능

## 📞 문제 해결

### API 연결 오류
- 인터넷 연결 확인
- Railway 서버 상태 확인: `https://greenweariot-production.up.railway.app/api/health`

### Python 패키지 오류
```bash
pip install --upgrade requests
```

### Git 동기화
```bash
git pull origin main
```
