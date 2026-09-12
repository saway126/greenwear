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

**옵션 A. macOS 없이 클라우드 빌드 (EAS Build, 권장)**
```bash
npm install -g eas-cli   # 또는 npx eas-cli
eas login                # Expo 계정 필요 (무료 가입 가능)
eas build --platform ios --profile development   # 최초 1회, 프로젝트 연결 시 자동으로 app.json에 projectId 기록됨
```
- 빌드가 끝나면 아이폰에서 링크(또는 QR)로 `.ipa`를 설치할 수 있습니다 (Ad Hoc/Internal distribution).
- 프로파일은 `eas.json`에 `development`(Dev Client) / `preview`(내부 배포용) / `production`(App Store 제출용) 세 가지가 준비되어 있습니다.
- 아이폰 실기기 등록(UDID)이 필요한 경우 `eas device:create`로 등록하세요.
- 편의 스크립트: `npm run build:ios:dev`, `npm run build:ios:preview`, `npm run build:ios:production`

**옵션 B. macOS + Xcode 로컬 빌드**
```bash
npm install
npx pod-install ios   # 최초 1회, ios/Pods 설치
npm run ios           # 시뮬레이터 실행 (실기기는 Xcode에서 서명 후 실행)
```

- `ios/` 디렉터리는 `expo prebuild --platform ios`로 생성된 네이티브 프로젝트입니다.
  `app.json`을 수정한 뒤에는 `npm run prebuild:ios`(`expo prebuild --platform ios --clean`)로 다시 동기화하세요.
- 실기기에서 테스트하려면 Xcode에서 팀(서명)을 지정하고 USB로 연결된 아이폰을 대상으로 실행하세요.
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
