# Galaxy Watch 4 연동 가이드

## 📱 Galaxy Watch 4 개발자 모드 활성화

### 1. 워치에서 개발자 모드 활성화
1. **설정** → **워치 정보** → **소프트웨어 정보**
2. **빌드 번호를 7번 연속으로 탭**하여 개발자 모드 활성화
3. **개발자 옵션**에서 **USB 디버깅** 활성화
4. **ADB 디버깅** 활성화

### 2. PC와 연결
1. USB 케이블로 워치와 PC 연결
2. 워치에서 **USB 디버깅 허용** 확인
3. PC에서 `adb devices` 명령어로 연결 확인

## 🛠️ Android Studio 설치 및 설정

### 1. Android Studio 설치
1. [Android Studio 공식 사이트](https://developer.android.com/studio)에서 다운로드
2. 설치 시 **Android SDK**, **Android SDK Platform-Tools** 포함 설치
3. **Wear OS** SDK 설치

### 2. 프로젝트 열기
```bash
# Android Studio에서 프로젝트 열기
File → Open → greaenwear/galaxy-watch-app
```

### 3. SDK 설정 확인
- **File** → **Settings** → **Appearance & Behavior** → **System Settings** → **Android SDK**
- **Wear OS** SDK 설치 확인
- **API Level 30+** 설치 확인

## 📱 실제 센서 데이터 수집

### 1. 센서 권한 요청
앱 실행 시 다음 권한들을 허용해야 합니다:
- **BODY_SENSORS**: 심박수 센서 접근
- **ACTIVITY_RECOGNITION**: 걸음 수 센서 접근
- **INTERNET**: 서버 통신

### 2. 실제 센서 데이터
- ✅ **심박수**: 실제 워치 심박수 센서에서 수집
- ✅ **걸음 수**: 실제 워치 걸음 수 센서에서 수집
- ✅ **가속도**: 실제 워치 가속도계에서 수집
- ✅ **배터리**: 워치 배터리 레벨
- ✅ **스트레스**: 심박수 기반 계산

## 🔧 서버 연동 설정

### 1. 서버 IP 주소 변경
`HealthDataService.kt`에서 서버 URL을 실제 IP로 변경:
```kotlin
private const val SERVER_URL = "http://YOUR_PC_IP:5000/api/wearable/data"
```

### 2. PC IP 주소 확인
```bash
# Windows에서 IP 주소 확인
ipconfig
```

### 3. 서버 실행
```bash
# 백엔드 서버 실행
cd greaenwear/backend
node server.js
```

## 📊 실시간 데이터 모니터링

### 1. 워치 앱 실행
- Android Studio에서 **Run** 버튼 클릭
- Galaxy Watch 4 선택하여 앱 설치 및 실행

### 2. 실시간 데이터 확인
- **심박수**: 실시간 심박수 표시
- **걸음 수**: 실시간 걸음 수 표시
- **배터리**: 워치 배터리 레벨
- **연결 상태**: 서버 연결 상태

### 3. 서버 로그 확인
```bash
# 서버 로그에서 데이터 수신 확인
# 터미널에서 실시간 로그 확인
```

## 🚀 배포 및 테스트

### 1. 디버그 빌드
```bash
# Android Studio에서 Build → Build Bundle(s) / APK(s) → Build APK(s)
```

### 2. 실제 워치에 설치
```bash
# ADB를 통한 직접 설치
adb install app-debug.apk
```

### 3. 서버 연동 테스트
- 워치에서 앱 실행
- 센서 데이터 수집 시작
- 서버에서 데이터 수신 확인

## 🔍 문제 해결

### 1. 센서 데이터가 수집되지 않는 경우
- 워치에서 센서 권한 확인
- 워치를 손목에 착용하고 테스트
- 워치 재부팅 후 재시도

### 2. 서버 연결이 안 되는 경우
- PC 방화벽 설정 확인
- 서버 IP 주소 확인
- 네트워크 연결 상태 확인

### 3. 앱이 설치되지 않는 경우
- 워치 개발자 모드 확인
- USB 디버깅 활성화 확인
- ADB 연결 상태 확인

## 📈 데이터 분석

### 1. 수집되는 데이터
```json
{
  "deviceId": "GALAXY_WATCH4_001",
  "deviceName": "Galaxy Watch4",
  "heartRate": 75,
  "steps": 2500,
  "calories": 100,
  "sleep": 7.5,
  "stress": 40,
  "bloodOxygen": 98,
  "temperature": 36.5,
  "timestamp": 1703123456789
}
```

### 2. 실시간 모니터링
- 워치 앱에서 실시간 데이터 확인
- 서버 로그에서 데이터 수신 확인
- 웹 대시보드에서 데이터 시각화

## 🎯 다음 단계

1. **Samsung Health API 연동**: 더 정확한 건강 데이터 수집
2. **실시간 알림**: 건강 상태 이상 시 알림
3. **데이터 분석**: AI 기반 건강 상태 분석
4. **클라우드 연동**: 데이터 클라우드 저장 및 동기화
