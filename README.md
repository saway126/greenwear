# 🌿 GreenWear — 생체신호 상태표시 시스템

> **의료/군사용 스마트웨어로 생체징후를 실시간 모니터링하고 색상으로 위험도를 표시하는 시스템**

[![Vue.js](https://img.shields.io/badge/Vue.js-3.4.0-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=spring-boot)](https://spring.io/projects/spring-boot)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 📋 **프로젝트 개요**

### **문제 정의**
고령자, 환자, 유아, 군인 등은 생체징후 악화 시 즉각적인 인지가 필요하지만, 기존 웨어러블은 사용자 화면/앱 중심이라 보호자가 놓치기 쉽습니다.

### **해결 방안**
의복 자체가 **초록/노랑/빨강 색상**으로 위험도를 표시하고, 동시에 앱/백엔드로 데이터를 전송·알림하여 안전을 높입니다.

### **핵심 가치**
- 🚨 **즉각적인 위험 인지**: 색상 변화로 한눈에 상태 파악
- 📱 **실시간 모니터링**: 앱과 백엔드를 통한 지속적 관찰
- 🛡️ **보안 강화**: API 키 인증과 데이터 보호
- 🌍 **한국어 지원**: 국내 사용자를 위한 현지화

## 🏗️ **시스템 아키텍처**

```
[Sensor (ESP32/PPG/Temp)] 
   ↓ Wi-Fi/BLE
   ↓
[Spring Boot Backend] 
   ├── /api/vitals/evaluate (공개 - 분류만)
   ├── /api/vitals/samples (보호 - 데이터 업로드)
   └── /api/vitals/stream (보호 - 실시간 이벤트)
   ↓
[Vue Frontend Dashboard]
   ├── VitalsCard (기본 상태 표시)
   ├── VitalsLive (실시간 모니터링)
   └── DashboardPage (종합 대시보드)
```

## 🎯 **주요 기능**

### **1. 생체신호 분류 시스템**
- **심박수 (HR)**: 휴식/운동 모드별 임계치 적용
- **호흡수 (RR)**: 분당 호흡 수 기반 상태 판정
- **혈중산소 (SpO₂)**: 산소포화도 수준 평가
- **체온**: 코어 온도 기반 발열/저체온 감지
- **피부온 변화**: 시간 기반 비정상 변동 탐지

### **2. 색상 기반 상태 표시**
| 색상 | 상태 | 의미 | 조치 |
|------|------|------|------|
| 🟢 **초록** | 정상 | 모든 지표가 정상 범위 | 계속 관찰 |
| 🟡 **노랑** | 주의 | 일부 지표에 주의 필요 | 휴식/호흡 조절 |
| 🔴 **빨강** | 경고 | 즉시 의료 조치 필요 | 중단/의료진 호출 |

### **3. 실시간 모니터링**
- **LED 색상 시뮬레이션**: 의복의 실제 LED 동작 모방
- **상태 변경 히스토리**: 색상 변화 이벤트 기록
- **데이터 업로드**: 생체신호 샘플을 서버에 전송
- **스트림 제어**: 실시간 데이터 스트리밍 시작/중지

### **4. 보안 및 인증**
- **API 키 인증**: 보호된 엔드포인트 접근 제어
- **공개/보호 분리**: 평가는 공개, 데이터는 보호
- **환경변수 관리**: `GW_API_KEY` 설정으로 보안 강화

## 🚀 **빠른 시작**

### **시스템 요구사항**
- **Java**: 17 이상
- **Node.js**: 18 이상
- **npm**: 9 이상

### **1. 저장소 클론**
```bash
git clone https://github.com/your-username/greenwear.git
cd greenwear
```

### **2. 백엔드 실행**
```bash
cd backend-spring/demo
./gradlew bootRun
```
- **포트**: 8080
- **상태 확인**: `http://localhost:8080/health`

### **3. 프론트엔드 실행**
```bash
cd frontend
npm install
npm run dev
```
- **포트**: 5173
- **접속**: `http://localhost:5173`

### **4. 환경변수 설정 (선택사항)**
```bash
# Windows
set GW_API_KEY=your-secret-key

# Linux/Mac
export GW_API_KEY=your-secret-key
```

## 🧪 **API 사용법**

### **1. 생체신호 평가 (공개)**
```bash
curl -X POST http://localhost:8080/api/vitals/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "rest",
    "hr": 105,
    "spo2": 93,
    "coreTempC": 37.6
  }'
```

**응답 예시**:
```json
[
  {
    "metric": "HR",
    "color": "yellow",
    "hex": "#fbbf24",
    "label": "주의",
    "message": "심박 주의"
  }
]
```

### **2. 샘플 데이터 업로드 (보호)**
```bash
curl -X POST http://localhost:8080/api/vitals/samples \
  -H "Content-Type: application/json" \
  -H "X-API-Key: DEV_DEMO_KEY" \
  -d '{
    "deviceId": "GW-001",
    "mode": "rest",
    "age": 30,
    "hr": 130,
    "spo2": 90,
    "coreTempC": 38.2
  }'
```

**응답 예시**:
```json
{
  "deviceId": "GW-001",
  "timestamp": 1693281234567,
  "aggregateColor": "red",
  "results": [...],
  "message": "즉시 의료진 확인이 필요합니다"
}
```

## 📊 **데이터 분류 기준**

### **휴식 모드 임계치**

| 항목 | 초록(정상) | 노랑(주의) | 빨강(경고) |
|------|------------|------------|------------|
| **심박수** | 60–100 bpm | 50–59 / 101–120 | <50 / >120 |
| **호흡수** | 12–18 회/분 | 19–24 | ≤11 / ≥25 |
| **SpO₂** | ≥95% | 91–94% | ≤90% |
| **체온** | 36.1–37.4°C | 35.1–36.0 / 37.5–37.9°C | ≤35.0°C / ≥38.0°C |
| **피부온 ΔT** | ±0.6°C 이내 | ±0.7–1.4°C | ≥±1.5°C (30분 이상) |

### **운동 모드 임계치**
- **심박수**: 나이 기반 최대심박수 대비 백분율 적용
- **초록**: 50-77% (적당한 운동 강도)
- **노랑**: 77-90% (높은 운동 강도)
- **빨강**: >90% (과도한 운동 강도)

## 🛠️ **기술 스택**

### **백엔드**
- **Framework**: Spring Boot 3.x
- **Language**: Java 17+
- **Database**: H2 (개발), PostgreSQL (운영)
- **Security**: API Key 인증, Spring Security
- **Build Tool**: Gradle

### **프론트엔드**
- **Framework**: Vue 3.4.0 (Composition API)
- **Build Tool**: Vite 6.x
- **Language**: TypeScript 5.x
- **State Management**: Pinia
- **Styling**: Tailwind CSS 3.x
- **Charts**: Chart.js + vue-chartjs

### **개발 도구**
- **Package Manager**: npm
- **Version Control**: Git
- **Code Quality**: ESLint, Prettier
- **Testing**: JUnit 5 (백엔드), Vitest (프론트엔드)

## 📁 **프로젝트 구조**

```
greaenwear/
├── 📁 backend-spring/demo/          # Spring Boot 백엔드
│   ├── 📁 src/main/java/com/greenwear/demo/
│   │   ├── 📁 config/               # 설정 클래스
│   │   │   └── SimpleApiKeyFilter.java
│   │   ├── 📁 vitals/               # 생체신호 관련
│   │   │   ├── VitalsService.java   # 분류 로직
│   │   │   └── VitalsController.java # REST API
│   │   └── GreenwearApplication.java
│   └── build.gradle
├── 📁 frontend/                     # Vue 프론트엔드
│   ├── 📁 src/
│   │   ├── 📁 components/           # Vue 컴포넌트
│   │   │   ├── VitalsCard.vue      # 기본 상태 표시
│   │   │   └── VitalsLive.vue      # 실시간 모니터링
│   │   ├── 📁 pages/                # 페이지 컴포넌트
│   │   │   ├── MainPage.vue        # 메인 페이지
│   │   │   └── DashboardPage.vue   # 대시보드
│   │   ├── 📁 stores/               # Pinia 상태 관리
│   │   │   └── useVitalsStore.ts   # Vitals 상태 스토어
│   │   ├── 📁 utils/                # 유틸리티 함수
│   │   │   └── vitalsColor.ts      # 색상 분류 로직
│   │   └── main.ts                  # 앱 진입점
│   ├── package.json
│   └── vite.config.ts
├── 📁 docs/                         # 문서
├── TESTING_GUIDE.md                 # 테스트 가이드
└── README.md                        # 이 파일
```

## 🧪 **테스트 가이드**

상세한 테스트 방법은 [`TESTING_GUIDE.md`](./TESTING_GUIDE.md)를 참조하세요.

### **기본 테스트 시나리오**
1. **정상 상태**: HR=72, SpO₂=98, Temp=36.5 → 초록색
2. **주의 상태**: HR=105, SpO₂=93, Temp=37.6 → 노란색
3. **위험 상태**: HR=130, SpO₂=90, Temp=38.2 → 빨간색
4. **운동 모드**: 나이 30, HR=170 → 노란색

## 🔧 **개발 가이드**

### **새로운 생체신호 추가**
1. `VitalsService.java`에 분류 로직 구현
2. `vitalsColor.ts`에 프론트엔드 로직 추가
3. API 응답 구조 업데이트
4. UI 컴포넌트에 표시 로직 추가

### **새로운 API 엔드포인트 추가**
1. `VitalsController.java`에 메서드 추가
2. 보안 설정 확인 (공개/보호)
3. 프론트엔드 스토어에 액션 추가
4. UI 컴포넌트에 연동

## 🚀 **배포 가이드**

### **개발 환경**
- **백엔드**: `./gradlew bootRun`
- **프론트엔드**: `npm run dev`
- **데이터베이스**: H2 인메모리

### **운영 환경**
- **백엔드**: Docker 컨테이너 또는 클라우드 배포
- **프론트엔드**: `npm run build` 후 정적 파일 서빙
- **데이터베이스**: PostgreSQL 또는 클라우드 DB
- **환경변수**: `GW_API_KEY` 설정 필수

## 📈 **향후 로드맵**

### **단기 목표 (1-3개월)**
- [ ] **히스테리시스**: 연속 2회 이상 같은 결과일 때 색상 변경
- [ ] **Server-Sent Events**: 실시간 데이터 스트리밍 구현
- [ ] **데이터 영속화**: PostgreSQL 연동 및 통계 기능

### **중기 목표 (3-6개월)**
- [ ] **Web Bluetooth**: 브라우저에서 센서 직접 읽기
- [ ] **알림 시스템**: 보호자 앱 푸시, SMS 연동
- [ ] **모바일 앱**: React Native 또는 Flutter 앱 개발

### **장기 목표 (6개월 이상)**
- [ ] **의료기기 인증**: 임상/성능 검증 프로토콜 수립
- [ ] **AI 기반 예측**: 머신러닝을 통한 이상 징후 예측
- [ ] **국제화**: 다국어 지원 및 글로벌 배포

## 🤝 **기여하기**

### **개발 환경 설정**
1. 저장소 포크
2. 기능 브랜치 생성 (`feature/your-feature-name`)
3. 코드 작성 및 테스트
4. Pull Request 생성

### **코딩 컨벤션**
- **Java**: Google Java Style Guide 준수
- **TypeScript**: ESLint + Prettier 설정 준수
- **Vue**: Vue Style Guide 준수
- **커밋 메시지**: Conventional Commits 형식

## 📄 **라이선스**

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 **연락처**

- **프로젝트 관리자**: [your-email@example.com]
- **기술 문의**: [tech-support@example.com]
- **버그 리포트**: [GitHub Issues](https://github.com/your-username/greenwear/issues)

## 🙏 **감사의 말**

- **Vue.js 팀**: 훌륭한 프론트엔드 프레임워크 제공
- **Spring 팀**: 강력한 백엔드 프레임워크 제공
- **Tailwind CSS 팀**: 유틸리티 우선 CSS 프레임워크 제공
- **커뮤니티**: 지속적인 피드백과 기여

---

**GreenWear** - 더 안전한 미래를 위한 스마트웨어 시스템 🌿 