# GreenWearMobile MVP Gap Analysis

## 기준 기능
- 인증
- 실시간 생체신호 대시보드
- AI 건강 분석
- 디바이스 연동
- 푸시 알림
- 친환경 추천

## 기존 상태 (클론 직후)
- 인증: 없음
- 실시간 대시보드: 정적 UI 중심, API 연동 불완전
- AI 분석: 버튼만 있고 API 실행 없음
- 디바이스 연동: 실사용 연동 플로우 없음
- 푸시 알림: 없음
- 친환경 추천: 없음

## 구현 후 상태
- 인증: `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/me` 연동 완료
- 실시간 대시보드: `GET /api/wearable/realtime` 5초 폴링 연동 완료
- AI 분석: `POST /api/ai-analysis` 연동 완료
- 디바이스 연동: `POST /api/mobile/device/link` + `GET /api/wearable/devices` 연동 완료
- 푸시 알림: Expo 푸시 토큰 발급 + `POST /api/push/register`, `GET /api/wearable/alerts` 연동 완료
- 친환경 추천: `GET /api/products` 연동 완료

## 남은 운영 작업
- 백엔드 인증을 DB/JWT 기반으로 교체
- 푸시 발송 서버(FCM/Expo Push API) 실제 발송 파이프라인 연결
- Android 내부 테스트 트랙 업로드 전 API URL을 운영 환경으로 고정
