# GreenWear 실행 및 설치 가이드

## 1) Spring 백엔드 실행 (archive/backend-spring/demo)

```bash
cd archive/backend-spring/demo
./gradlew.bat test
./gradlew.bat bootRun
```

기본 실행 주소:

- `http://localhost:8080/api/health`

모바일 앱 호환 API 흐름:

1. `POST /api/auth/register` 또는 `POST /api/auth/login`
2. `GET /api/auth/me`로 세션 확인
3. `Authorization: Bearer <token>` 헤더로 아래 API 호출

   - `/api/wearable/realtime`
   - `/api/wearable/alerts`
   - `/api/wearable/devices`
   - `/api/mobile/device/link`
   - `/api/push/register`
   - `/api/products`
   - `/api/ai-analysis`

테스트 계정:

- `mobileuser@example.com`
- `pass1234`

## 2) Android 앱 설치 파일

생성된 파일:

- APK: `GreenWearMobile/android/app/build/outputs/apk/release/app-release.apk`
- AAB: `GreenWearMobile/android/app/build/outputs/bundle/release/app-release.aab`

## 3) 휴대폰 설치 방법

### A. USB 직접 설치 (ADB)

```bash
adb devices
adb install -r GreenWearMobile/android/app/build/outputs/apk/release/app-release.apk
```

`adb` 명령이 인식되지 않으면 Windows에서 아래처럼 전체 경로로 실행:

```bash
"C:\Users\kks\AppData\Local\Android\Sdk\platform-tools\adb.exe" devices
"C:\Users\kks\AppData\Local\Android\Sdk\platform-tools\adb.exe" install -r GreenWearMobile/android/app/build/outputs/apk/release/app-release.apk
```

### B. 파일 전송 후 수동 설치

1. `app-release.apk`를 휴대폰으로 복사
2. 휴대폰에서 파일 열기
3. "알 수 없는 앱 설치 허용" 활성화 후 설치

## 4) 앱에서 로컬 백엔드 사용 시

`GreenWearMobile/.env`에 PC의 로컬 IP로 설정:

```bash
EXPO_PUBLIC_API_BASE_URL=http://<PC_LOCAL_IP>:8080
```

주의:

- 휴대폰과 PC는 같은 Wi-Fi에 있어야 함
- `localhost` 대신 반드시 PC 실제 IP 사용
