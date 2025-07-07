# 🌱 GreenWear: 상태 기반 스마트웨어 프로젝트

> 사람의 건강 상태에 따라 옷의 색상을 직관적으로 변화시켜, 의료진/관리자가 신속하게 대응할 수 있는 스마트웨어 시스템입니다.
> 군인, 요양병원 환자, 고립된 환경의 거주자 등에게 유용한 솔루션을 지향합니다.

---

## 🔷 Features

- 📲 웨어러블 센서에서 건강 데이터 수집 (심박수, 체온, 혈중산소)
- 🎨 옷 색상이 상태에 따라 자동 변경 (정상/주의/위험)
- 🌐 실시간 대시보드 제공 (웹 기반)
- 🔔 실시간 알림 기능 (웹소켓 기반)
- 🔐 사용자 인증 및 개인 건강 기록 관리
- 📊 AI 기반 건강 상태 분석 및 예측

---

## 🔷 Tech Stack

- **Frontend**: Vue.js 3, TypeScript, Tailwind CSS
- **Backend**: Node.js (Express), Python (AI 분석)
- **Database**: MongoDB / SQLite
- **Real-time**: WebSocket for live updates
- **AI/ML**: Python (Scikit-learn, TensorFlow)
- **IoT**: MQTT Protocol, Raspberry Pi / Arduino
- **Mock Data Source**: JSON / HealthKit API / Google Fit API

---

## 🔷 Getting Started

### 1️⃣ 설치
```bash
git clone https://github.com/saway126/greaenwear.git
cd greaenwear
```

### 2️⃣ 프론트엔드 실행
```bash
cd frontend
npm install
npm run dev
```

### 3️⃣ 백엔드 실행 (예정)
```bash
cd backend
npm install
npm start
```

### 4️⃣ 사용법
- `http://localhost:5173` 에 접속해 상태 모니터링
- **테스트 계정**: ID `test` / PW `1234`
- `/dashboard` 에서 실시간 건강 상태 확인
- `/mypage` 에서 개인 건강 기록 조회

---

## 🔷 프로젝트 로드맵

| 단계 | 작업 내용 | 상태 | 비고 |
|------|-----------|------|------|
| 1️⃣  | 사용자 인증 시스템 구현 | ✅ | 로그인, 회원가입, 마이페이지 |
| 2️⃣  | Health 데이터 모킹 및 수집 API 구현 | 🚧 | 심박수, 체온, 산소포화도 |
| 3️⃣  | 상태별 색상 판단 로직 완성 | 🚧 | green/orange/red |
| 4️⃣  | 대시보드 페이지 구현 | 🚧 | Chart.js 그래프 |
| 5️⃣  | 상태별 색상 시뮬레이션 | 🔷 | HTML/CSS로 확인 |
| 6️⃣  | WebSocket 알림 기능 | 🔷 | 위험시 실시간 알림 |
| 7️⃣  | 데이터 기록 및 분석 | 🔷 | DB 연동 |
| 8️⃣  | AI 기반 건강 상태 예측 | 🔷 | 머신러닝 모델 |
| 9️⃣  | 아두이노/라즈베리파이 연동 | 🔷 | 실제 센서 실험 |

**상태 범례**: ✅ 완료 | 🚧 진행중 | 🔷 예정

---

## 🗺️ 아키텍처 다이어그램

```
                    +------------------+
                    |  Wearable Device |
                    |  (Sensors)       |
                    +------------------+
                            |
                   (health data via MQTT/HTTP)
                            |
                    +------------------+
                    |   Backend API    |
                    | (Node.js/Python) |
                    +------------------+
                       |      |      |
          WebSocket <--|      |      |--> Database (MongoDB)
                       |      |
                       |      |
                +------+------+
                |             |
         +--------------+ +--------------+
         |  Vue.js      | |  Smart Wear |
         |  Dashboard   | |  Color LED   |
         +--------------+ +--------------+
```

---

## 📱 페이지 구성

### 🏠 메인 페이지 (/)
- 서비스 소개 및 현재 건강 상태 개요
- 상태별 카드 (정상/주의/위험)
- 상단 네비게이션 (로그인/회원가입/마이페이지)

### 🔐 로그인 페이지 (/login)
- GreenWear 브랜딩 디자인
- 사용자 인증 시스템
- 테스트 계정: `test` / `1234`

### 📝 회원가입 페이지 (/signup)
- 새 사용자 등록 폼
- 유효성 검사 기능
- 자동 로그인 페이지 연결

### 👤 마이페이지 (/mypage)
- 개인 건강 기록 조회
- 통계 카드 (모니터링 일수, 평균 심박수, 평균 체온)
- 페이지네이션이 적용된 기록 테이블
- 상태별 색상 구분 (정상/주의/위험)

### 📊 대시보드 (/dashboard)
- 실시간 건강 데이터 시각화
- 상세 분석 차트
- 색상 변경 시뮬레이션

### 🚨 알림 페이지 (/alert)
- 위험 상황 알림 목록
- 응급 상황 대응 가이드

---

## 🎨 색상 시스템

### 건강 상태별 색상 매핑
- 🟢 **정상 (Green)**: 심박수 60-100bpm, 체온 36.1-37.2°C
- 🟡 **주의 (Yellow)**: 경미한 이상 수치 감지
- 🔴 **위험 (Red)**: 즉시 의료 조치 필요

### 스마트웨어 색상 구현 방식
- **LED 스트립**: WS2812B 기반 RGB LED
- **제어 방식**: Arduino/Raspberry Pi via WiFi/Bluetooth
- **전원**: 충전식 배터리 (10시간 연속 사용)

---

## 🔧 개발 환경 설정

### 필수 요구사항
- Node.js 18+
- Python 3.8+ (AI 모듈용)
- MongoDB 또는 SQLite
- Git

### 개발 도구
- Vue DevTools
- VS Code + Vetur/Volar
- Postman (API 테스트)
- Chrome DevTools

---

## 🚀 향후 개발 계획

### Phase 1: 기본 기능 (현재)
- [x] 사용자 인증 시스템
- [x] 기본 페이지 구성
- [ ] 백엔드 API 개발

### Phase 2: 핵심 기능
- [ ] 실시간 데이터 수집
- [ ] 상태별 색상 분류 알고리즘
- [ ] WebSocket 실시간 통신

### Phase 3: 고급 기능
- [ ] AI 기반 건강 예측
- [ ] 하드웨어 연동 (Arduino/Raspberry Pi)
- [ ] 모바일 앱 개발

### Phase 4: 확장 기능
- [ ] 의료진 전용 관리자 페이지
- [ ] 다국어 지원
- [ ] 클라우드 배포 및 스케일링

---

## 🎯 Target Users

### 1️⃣ 의료 환경
- **병원**: 환자 상태 실시간 모니터링
- **요양원**: 고령자 건강 관리
- **응급실**: 위험 환자 신속 식별

### 2️⃣ 고위험 직업군
- **군인**: 훈련 중 건강 상태 모니터링
- **소방관**: 화재 현장 안전 관리
- **광부**: 지하 작업 중 건강 추적

### 3️⃣ 일반 사용자
- **운동선수**: 퍼포먼스 최적화
- **고령자**: 독거 노인 안전 관리
- **만성질환자**: 지속적인 건강 추적

---

## 🤝 기여 방법

1. 이슈 등록 또는 기존 이슈 확인
2. 브랜치 생성 (`git checkout -b feature/새기능`)
3. 변경사항 커밋 (`git commit -m '새 기능 추가'`)
4. 브랜치 푸시 (`git push origin feature/새기능`)
5. Pull Request 생성

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

## 📞 문의사항

- 개발자: [GitHub Profile](https://github.com/saway126)
- 프로젝트 이슈: [GitHub Issues](https://github.com/saway126/greaenwear/issues)
- 이메일: [연락처 추가 예정]

---

## 🏆 Awards & Recognition

- 🥇 **2024 스마트 헬스케어 해커톤** 우수상 (예정)
- 🎖️ **오픈소스 기여상** (예정)

---

**🌱 GreenWear로 더 안전하고 건강한 미래를 만들어보세요!**

> *"색상으로 생명을 구한다 - Saving Lives Through Colors"* 