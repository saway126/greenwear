# 🏥 GreenWear: 실시간 생체신호 모니터링 시스템 개발기

> **의복 자체가 상태를 말하는 스마트웨어** - Vue 3 + Spring Boot로 구현한 실시간 생체신호 모니터링 시스템

## 📋 목차
- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [개발 과정](#개발-과정)
- [주요 기능](#주요-기능)
- [배포 및 결과](#배포-및-결과)
- [학습 포인트](#학습-포인트)
- [향후 계획](#향후-계획)

---

## 🎯 프로젝트 개요

### GreenWear란?
GreenWear는 의료진과 군인들이 착용하는 의류에 통합된 혁신적인 생체신호 모니터링 시스템입니다. 실시간으로 심박수, 호흡수, 체온, 산소포화도를 추적하여 즉시 상태를 파악할 수 있습니다.

### 핵심 아이디어
- **LED 색상 지표**: 초록(정상) → 노랑(주의) → 빨강(위험)
- **실시간 모니터링**: 1초 간격으로 생체신호 업데이트
- **즉시 알림**: 위험 신호 감지 시 즉시 알림 및 응급 연락망 연동

---

## 🛠 기술 스택

### Frontend
- **Vue 3** (Composition API)
- **TypeScript** - 타입 안정성
- **Vite** - 빠른 개발 환경
- **Tailwind CSS** - 유틸리티 퍼스트 CSS
- **Vue Router** - SPA 라우팅
- **Chart.js + vue-chartjs** - 실시간 차트
- **Pinia** - 상태 관리

### Backend
- **Spring Boot 3.x**
- **Java 17+**
- **Gradle** - 빌드 도구
- **H2 Database** - 인메모리 DB

### Deployment
- **Vercel** - 프론트엔드 배포
- **Git** - 버전 관리

---

## 🚀 개발 과정

### 1단계: 프로젝트 초기 설정
```bash
# Vue 3 + TypeScript 프로젝트 생성
npm create vue@latest greenwear
cd greenwear
npm install

# 추가 의존성 설치
npm install chart.js vue-chartjs axios pinia
npm install -D vitest @vue/test-utils
```

### 2단계: UI/UX 디자인
- **다크 테마**: `neutral-950` 배경, 에메랄드 악센트
- **모던 디자인**: Glassmorphism, 반응형 레이아웃
- **실시간 비디오**: Hero 섹션 배경 비디오 자동 재생

### 3단계: 컴포넌트 개발
```vue
<!-- HeroSection.vue -->
<template>
  <section class="relative isolate overflow-hidden h-[72vh]">
    <video autoplay muted playsinline loop>
      <source src="/hero.mp4" type="video/mp4" />
    </video>
    <!-- 실시간 생체신호 지표 -->
  </section>
</template>
```

### 4단계: 실시간 대시보드 구현
```vue
<!-- DashboardView.vue -->
<template>
  <div class="min-h-screen bg-neutral-950 text-white">
    <!-- 상태 요약 카드 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- 심박수, 산소포화도, 체온, LED 상태 -->
    </div>
    
    <!-- 실시간 차트 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Line :data="heartRateChartData" :options="chartOptions" />
      <Line :data="oxygenChartData" :options="chartOptions" />
    </div>
  </div>
</template>
```

### 5단계: 백엔드 API 개발
```java
// VitalsController.java
@RestController
@RequestMapping("/api/vitals")
@CrossOrigin
public class VitalsController {
    
    @PostMapping("/samples")
    public ResponseEntity<VitalSample> addSample(@RequestBody VitalSample sample) {
        // 생체신호 샘플 데이터 처리
    }
    
    @GetMapping("/stream")
    public SseEmitter getStream() {
        // Server-Sent Events 실시간 스트림
    }
}
```

### 6단계: 배포 및 최적화
```bash
# 프로덕션 빌드
npm run build

# Vercel 배포
npx vercel --prod
```

---

## ⚡ 주요 기능

### 1. 실시간 생체신호 모니터링
- **심박수**: 70-100 BPM 범위 실시간 추적
- **산소포화도**: 95-100% 범위 모니터링
- **체온**: 36.5-37.5°C 범위 추적
- **LED 상태**: 생체신호에 따른 자동 색상 전환

### 2. 실시간 대시보드
```javascript
// 더미 데이터 생성 및 실시간 업데이트
const updateVitals = () => {
  const hrVariation = (Math.random() - 0.5) * 10
  currentVitals.value.heartRate = Math.round(85 + hrVariation)
  
  // LED 상태 결정
  if (currentVitals.value.heartRate > 90) {
    currentVitals.value.ledStatus = '빨강'
  } else if (currentVitals.value.heartRate > 80) {
    currentVitals.value.ledStatus = '노랑'
  } else {
    currentVitals.value.ledStatus = '초록'
  }
}
```

### 3. 차트 시각화
- **Chart.js**: 실시간 라인 차트
- **애니메이션**: 부드러운 데이터 전환
- **반응형**: 모바일/데스크톱 최적화

### 4. 알림 시스템
- **3단계 알림**: 정상/주의/위험
- **실시간 생성**: 30% 확률로 새로운 알림
- **시각적 피드백**: 색상별 상태 표시

---

## 🌐 배포 및 결과

### 배포 URL
**https://greenwear-demo-kqlj2h8h9-skwka12346-gmailcoms-projects.vercel.app**

### 주요 페이지
- **홈**: 랜딩 페이지 + 데모 영상
- **대시보드**: 실시간 생체신호 모니터링
- **템플릿**: 모니터링 설정 템플릿
- **생성기**: 맞춤형 설정 생성
- **기록**: 모니터링 히스토리

### 성능 지표
- **빌드 시간**: 1.46초
- **번들 크기**: 102.83 KB (gzip: 40.45 KB)
- **첫 로드**: < 2초
- **실시간 업데이트**: 1초 간격

---

## 📚 학습 포인트

### 1. Vue 3 Composition API
```javascript
// 반응형 상태 관리
const currentVitals = ref({
  heartRate: 85,
  oxygen: 98,
  temperature: 37.2,
  ledStatus: '노랑'
})

// 계산된 속성
const ledColorClass = computed(() => {
  switch (currentVitals.value.ledStatus) {
    case '초록': return 'bg-green-500'
    case '노랑': return 'bg-yellow-500'
    case '빨강': return 'bg-red-500'
  }
})
```

### 2. Chart.js 통합
```javascript
// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// 차트 옵션 설정
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#ffffff' } }
  }
}
```

### 3. 실시간 데이터 처리
```javascript
// 1초마다 데이터 업데이트
const startMonitoring = () => {
  updateInterval = setInterval(updateVitals, 1000)
}

// 컴포넌트 언마운트 시 정리
onUnmounted(() => {
  stopMonitoring()
})
```

### 4. Spring Boot API 설계
```java
// CORS 설정
@CrossOrigin(origins = "*")

// SSE 스트림
@GetMapping("/stream")
public SseEmitter getStream() {
    SseEmitter emitter = new SseEmitter();
    // 실시간 데이터 전송
    return emitter;
}
```

---

## 🔮 향후 계획

### 단기 계획
- [ ] 실제 센서 데이터 연동
- [ ] 사용자 인증 시스템
- [ ] 모바일 앱 개발 (React Native)

### 중기 계획
- [ ] AI 기반 이상 패턴 감지
- [ ] 클라우드 데이터 저장
- [ ] 다중 사용자 지원

### 장기 계획
- [ ] IoT 디바이스 연동
- [ ] 의료진 연동 시스템
- [ ] 상용화 준비

---

## 💡 결론

GreenWear 프로젝트를 통해 다음과 같은 기술적 성과를 달성했습니다:

1. **실시간 웹 애플리케이션** 개발 경험
2. **Vue 3 + TypeScript** 조합 활용
3. **Chart.js** 기반 데이터 시각화
4. **Spring Boot** 백엔드 API 설계
5. **Vercel** 클라우드 배포

이 프로젝트는 단순한 웹 애플리케이션을 넘어서 실제 의료/군사 분야에서 활용 가능한 실시간 모니터링 시스템의 프로토타입입니다. 향후 실제 센서와 연동하여 더욱 실용적인 시스템으로 발전시킬 예정입니다.

---

## 🔗 관련 링크

- **라이브 데모**: https://greenwear-demo-kqlj2h8h9-skwka12346-gmailcoms-projects.vercel.app
- **GitHub 저장소**: https://github.com/saway126/greenwear
- **기술 문서**: [API 문서 링크]

---

*이 포스팅은 GreenWear 프로젝트의 개발 과정과 결과를 정리한 내용입니다. 궁금한 점이나 피드백이 있으시면 댓글로 남겨주세요!* 🚀
