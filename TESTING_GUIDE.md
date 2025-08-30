# 🧪 GreenWear 시스템 테스트 가이드

## 📋 **테스트 개요**
GreenWear 생체신호 상태표시 시스템의 기능을 테스트하는 가이드입니다.

## 🚀 **시스템 실행**

### **1. 백엔드 실행**
```bash
cd backend-spring/demo
./gradlew bootRun
```
- **포트**: 8080
- **상태**: Spring Boot 실행 중

### **2. 프론트엔드 실행**
```bash
cd frontend
npm run dev
```
- **포트**: 5173
- **상태**: Vite 개발 서버 실행 중

## 🧪 **API 테스트**

### **1. 기본 Vitals 평가 (공개)**
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

**예상 응답**:
```json
[
  {
    "metric": "HR",
    "color": "yellow",
    "hex": "#fbbf24",
    "label": "주의",
    "message": "심박 주의"
  },
  {
    "metric": "SpO₂",
    "color": "yellow",
    "hex": "#fbbf24",
    "label": "주의",
    "message": "산소포화도 낮음"
  },
  {
    "metric": "CoreTemp",
    "color": "yellow",
    "hex": "#fbbf24",
    "label": "주의",
    "message": "미열/저체온 경향"
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

**예상 응답**:
```json
{
  "deviceId": "GW-001",
  "timestamp": 1693281234567,
  "aggregateColor": "red",
  "results": [...],
  "message": "즉시 의료진 확인이 필요합니다"
}
```

### **3. API 키 인증 테스트 (실패 케이스)**
```bash
curl -X POST http://localhost:8080/api/vitals/samples \
  -H "Content-Type: application/json" \
  -d '{"deviceId": "GW-001", "hr": 72}'
```

**예상 응답**: `401 Unauthorized`

## 🌐 **프론트엔드 테스트**

### **1. 메인 페이지**
- **URL**: `http://localhost:5173/`
- **확인사항**:
  - VitalsCard 컴포넌트 표시
  - 색상별 상태 표시 (초록/노랑/빨강)
  - 한국어 메시지 표시

### **2. 실시간 모니터링**
- **위치**: 메인 페이지 하단
- **기능**:
  - 생체신호 입력 폼
  - 샘플 업로드 버튼
  - LED 색상 시뮬레이션
  - 상태 변경 히스토리

### **3. 대시보드 페이지**
- **URL**: `http://localhost:5173/dashboard`
- **기능**:
  - 실시간 건강 데이터 모니터링
  - Smart Wear 색상 시뮬레이션
  - 차트 렌더링
  - 모니터링 시작/중지

## 📊 **테스트 시나리오**

### **시나리오 1: 정상 상태**
1. 생체신호 입력: HR=72, SpO₂=98, Temp=36.5
2. **예상 결과**: 초록색 LED, "정상" 상태
3. **확인사항**: 모든 지표가 정상 범위

### **시나리오 2: 주의 상태**
1. 생체신호 입력: HR=105, SpO₂=93, Temp=37.6
2. **예상 결과**: 노란색 LED, "주의" 상태
3. **확인사항**: 일부 지표가 주의 범위

### **시나리오 3: 위험 상태**
1. 생체신호 입력: HR=130, SpO₂=90, Temp=38.2
2. **예상 결과**: 빨간색 LED, "경고" 상태
3. **확인사항**: 즉시 의료진 확인 필요

### **시나리오 4: 운동 모드**
1. 모드를 "exercise"로 변경
2. 나이 입력: 30
3. HR 입력: 170 (최대심박수의 85%)
4. **예상 결과**: 노란색 LED, "주의" 상태

## 🔧 **문제 해결**

### **1. 백엔드 연결 실패**
- Spring Boot 서버 상태 확인
- 포트 8080 사용 가능 여부 확인
- 로그에서 에러 메시지 확인

### **2. 프론트엔드 에러**
- 브라우저 개발자 도구 콘솔 확인
- Vite 서버 상태 확인
- 포트 5173 사용 가능 여부 확인

### **3. API 키 인증 실패**
- `X-API-Key` 헤더 포함 여부 확인
- 환경변수 `GW_API_KEY` 설정 확인
- 기본값 `DEV_DEMO_KEY` 사용

## 📈 **성능 테스트**

### **1. 응답 시간**
- **목표**: 2초 이내 색상 반영
- **측정**: API 호출부터 응답까지 시간

### **2. 동시 사용자**
- **목표**: 100명 이상 동시 접속
- **테스트**: Apache Bench 또는 JMeter 사용

### **3. 데이터 처리량**
- **목표**: 초당 100개 이상 샘플 처리
- **측정**: 샘플 업로드 API 처리량

## 🎯 **테스트 완료 체크리스트**

- [ ] 백엔드 Spring Boot 서버 실행
- [ ] 프론트엔드 Vite 서버 실행
- [ ] 기본 Vitals 평가 API 테스트
- [ ] 샘플 업로드 API 테스트 (API 키 인증)
- [ ] 프론트엔드 VitalsCard 컴포넌트 표시
- [ ] 실시간 모니터링 컴포넌트 동작
- [ ] 색상별 상태 표시 확인
- [ ] 한국어 메시지 표시 확인
- [ ] 상태 변경 히스토리 기록
- [ ] 대시보드 차트 렌더링

## 📝 **테스트 결과 기록**

테스트 완료 후 다음 정보를 기록하세요:

- **테스트 날짜**: 
- **테스트 환경**: 
- **발견된 문제**: 
- **해결된 문제**: 
- **성능 지표**: 
- **추가 개선사항**:
