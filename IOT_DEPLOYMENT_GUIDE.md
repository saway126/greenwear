# 🌱 GreenWear IoT 배포 가이드

## 📋 개요

이 가이드는 GreenWear 웨어러블 IoT 시스템을 실제 환경에 배포하고 테스트하는 방법을 설명합니다.

## 🛠️ 하드웨어 요구사항

### ESP32 개발 보드
- **ESP32 DevKit V1** 또는 **ESP32-WROOM-32**
- **WiFi** 및 **Bluetooth** 지원
- **GPIO 핀**: 최소 6개 (센서 연결용)

### 센서 모듈
- **심박수 센서**: Pulse Sensor (A0 핀)
- **체온 센서**: DS18B20 (D2 핀)
- **산소포화도 센서**: MAX30102 (I2C: SDA-D21, SCL-D22)
- **가속도계**: MPU6050 (I2C: SDA-D21, SCL-D22)
- **LED 스트립**: WS2812B (D4 핀)
- **버튼**: 푸시 버튼 (D5 핀)

### 전원 공급
- **3.7V 리튬 폴리머 배터리** (1000mAh 권장)
- **USB-C 충전 모듈**
- **전압 분배기** (배터리 레벨 모니터링용)

## 🔧 소프트웨어 설정

### 1. Arduino IDE 설정

```bash
# ESP32 보드 매니저 설치
# Arduino IDE > 도구 > 보드 > 보드 매니저
# "ESP32" 검색 후 설치

# 필요한 라이브러리 설치
# 도구 > 라이브러리 관리자에서 설치:
- WiFi
- HTTPClient
- BluetoothSerial
- OneWire
- DallasTemperature
- Adafruit NeoPixel
- ArduinoJson
- Wire
```

### 2. ESP32 펌웨어 업로드

```cpp
// esp32_greenwear_enhanced.ino 파일 수정
const char* ssid = "YOUR_WIFI_SSID";        // 실제 WiFi 이름
const char* password = "YOUR_WIFI_PASSWORD"; // 실제 WiFi 비밀번호
const char* serverURL = "https://your-backend-url.com/api/wearable/data";
```

### 3. 하드웨어 연결

```
ESP32 핀 연결:
├── A0  → Pulse Sensor (심박수)
├── D2  → DS18B20 (체온)
├── D4  → WS2812B LED Strip
├── D5  → Push Button
├── D21 → SDA (I2C)
├── D22 → SCL (I2C)
├── 3.3V → 센서 전원
└── GND  → 공통 그라운드
```

## 🚀 백엔드 배포

### 1. Spring Boot 애플리케이션 배포

```bash
# Railway 배포
cd greaenwear/backend-spring/demo
./gradlew build
# railway.json 설정 후 배포

# 또는 Docker 배포
docker build -t greenwear-backend .
docker run -p 8080:8080 greenwear-backend
```

### 2. 데이터베이스 설정

```sql
-- PostgreSQL 테이블 생성
CREATE TABLE wearable_data (
    id BIGSERIAL PRIMARY KEY,
    device_id VARCHAR(255),
    device_name VARCHAR(255),
    firmware_version VARCHAR(50),
    heart_rate INTEGER,
    oxygen_saturation DOUBLE PRECISION,
    temperature DOUBLE PRECISION,
    step_count INTEGER,
    battery_level INTEGER,
    signal_strength INTEGER,
    wifi_connected BOOLEAN,
    acceleration_x DOUBLE PRECISION,
    acceleration_y DOUBLE PRECISION,
    acceleration_z DOUBLE PRECISION,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    altitude DOUBLE PRECISION,
    stress_level INTEGER,
    activity_level INTEGER,
    sleep_quality INTEGER,
    status VARCHAR(50),
    timestamp BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🌐 프론트엔드 배포

### 1. Vue.js 대시보드 배포

```bash
cd greaenwear
npm install
npm run build
# Vercel, Netlify, 또는 Railway에 배포
```

### 2. 환경 변수 설정

```env
VITE_API_BASE_URL=https://your-backend-url.com
VITE_WS_URL=wss://your-backend-url.com/ws
```

## 📱 모바일 앱 배포

### 1. React Native 앱 빌드

```bash
cd greaenwear/GreenWearMobile
npm install
npx react-native run-android  # Android
npx react-native run-ios      # iOS
```

### 2. Expo 배포 (권장)

```bash
npx expo build:android
npx expo build:ios
# 또는
npx expo publish
```

## 🧪 테스트 절차

### 1. 하드웨어 테스트

```bash
# 시리얼 모니터에서 확인
# 1. WiFi 연결 상태
# 2. 센서 데이터 읽기
# 3. 서버 데이터 전송
# 4. LED 상태 표시
```

### 2. API 테스트

```bash
# 디바이스 데이터 전송 테스트
curl -X POST https://your-backend-url.com/api/wearable/data \
  -H "Content-Type: application/json" \
  -d '{
    "deviceId": "ESP32_GREENWEAR_001",
    "deviceName": "GreenWear Smart Shirt",
    "heartRate": 75,
    "temperature": 36.5,
    "oxygenSaturation": 98,
    "stepCount": 1500,
    "batteryLevel": 85,
    "signalStrength": -45,
    "wifiConnected": true,
    "status": "normal",
    "timestamp": 1234567890
  }'

# 실시간 데이터 조회 테스트
curl https://your-backend-url.com/api/wearable/realtime
```

### 3. 웹 대시보드 테스트

```bash
# 브라우저에서 접속
https://your-frontend-url.com/iot-dashboard

# 확인 사항:
# 1. 실시간 데이터 업데이트
# 2. 차트 렌더링
# 3. 디바이스 상태 표시
# 4. 경고 알림 기능
```

### 4. 모바일 앱 테스트

```bash
# 앱 실행 후 확인 사항:
# 1. 디바이스 목록 표시
# 2. 실시간 데이터 업데이트
# 3. 차트 표시
# 4. 푸시 알림 (선택사항)
```

## 🔧 문제 해결

### 일반적인 문제들

#### 1. ESP32 WiFi 연결 실패
```cpp
// 해결 방법:
// 1. WiFi 신호 강도 확인
// 2. SSID/비밀번호 재확인
// 3. WiFi 모듈 재시작
WiFi.disconnect();
WiFi.begin(ssid, password);
```

#### 2. 센서 데이터 오류
```cpp
// 해결 방법:
// 1. 핀 연결 확인
// 2. 전원 공급 확인
// 3. 센서 초기화 재시도
tempSensor.begin();
```

#### 3. 서버 연결 실패
```cpp
// 해결 방법:
// 1. 서버 URL 확인
// 2. 네트워크 연결 확인
// 3. CORS 설정 확인
```

#### 4. 데이터베이스 연결 오류
```sql
-- 해결 방법:
-- 1. 데이터베이스 서버 상태 확인
-- 2. 연결 문자열 확인
-- 3. 테이블 존재 여부 확인
```

## 📊 모니터링 및 유지보수

### 1. 로그 모니터링

```bash
# 백엔드 로그 확인
docker logs greenwear-backend

# 데이터베이스 로그 확인
# PostgreSQL 로그 파일 확인
```

### 2. 성능 모니터링

```bash
# API 응답 시간 모니터링
# 데이터베이스 쿼리 성능 확인
# 메모리 사용량 모니터링
```

### 3. 알림 설정

```javascript
// 위험 상태 알림 설정
if (deviceStatus === 'critical') {
  // 이메일 알림
  // SMS 알림
  // 푸시 알림
}
```

## 🔒 보안 고려사항

### 1. 데이터 암호화
- HTTPS 사용 (SSL/TLS)
- 데이터베이스 암호화
- API 키 보안

### 2. 접근 제어
- JWT 토큰 인증
- API 레이트 리미팅
- 디바이스 인증

### 3. 개인정보 보호
- GDPR 준수
- 데이터 익명화
- 사용자 동의 관리

## 📈 확장 계획

### 1. 추가 센서 통합
- GPS 모듈
- 자이로스코프
- 압력 센서
- 환경 센서

### 2. AI/ML 기능 강화
- 실시간 이상 탐지
- 예측 분석
- 개인화된 추천

### 3. 클라우드 통합
- AWS IoT Core
- Azure IoT Hub
- Google Cloud IoT

## 📞 지원 및 문의

- **GitHub Issues**: [프로젝트 저장소](https://github.com/your-repo/greenwear)
- **이메일**: support@greenwear.com
- **문서**: [GreenWear 문서](https://docs.greenwear.com)

---

**🎉 축하합니다! GreenWear IoT 시스템이 성공적으로 배포되었습니다!**
