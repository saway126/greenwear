# GreenWearMobile (Android / iOS MVP)

## 1) 환경 변수
`.env` 파일을 만들고 아래 값 설정:

```bash
EXPO_PUBLIC_API_BASE_URL=https://greenwear-backend-node-production-1583.up.railway.app
```

## 2) 실행

### Android
```bash
npm install
npm run android
```

### iOS (아이폰 연동)
iOS 빌드는 CocoaPods/Xcode가 설치된 macOS에서만 가능합니다.

```bash
npm install
npx pod-install ios   # 최초 1회, ios/Pods 설치
npm run ios           # 시뮬레이터 실행 (실기기는 Xcode에서 서명 후 실행)
```

- `ios/` 디렉터리는 `expo prebuild --platform ios`로 생성된 네이티브 프로젝트입니다.
  `app.json`을 수정한 뒤에는 `npx expo prebuild --platform ios --clean`으로 다시 동기화하세요.
- 실기기에서 테스트하려면 Xcode에서 팀(서명)을 지정하고 USB로 연결된 아이폰을 대상으로 실행하거나,
  macOS 없이 빌드하려면 `eas build --platform ios --profile development`(EAS Build)를 사용하세요.
- 푸시 알림(Expo Push Token)은 Expo Go가 아닌 개발 빌드(Dev Client) 또는 실제 iOS 기기에서만 정상 동작합니다.

## 3) 기본 테스트 계정
- email: `demo@greenwear.com`
- password: `demo1234`

## 4) MVP 화면
- 대시보드: 실시간 생체신호
- AI: 분석 실행
- 디바이스: 연동 및 목록 (Android/iOS 플랫폼 자동 인식)
- 알림: 푸시 토큰 등록/경고 조회 (iOS는 APNs entitlement 포함)
- 추천: 친환경 상품 추천
