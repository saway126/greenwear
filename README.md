# GreenWear (그린웨어)

웨어러블 센서로 수집한 바이오리듬(심박수, 혈압 등) 데이터를 AI로 분석하여,
옷의 색상(초록/노랑/빨강)으로 건강 상태를 실시간 시각화하는 스마트 헬스케어 시스템입니다.

## 주요 기능
- 실시간 건강 데이터 수집 및 시각화
- AI 기반 상태 분류(정상/경고/응급)
- 의료/군인/고령자 등 실시간 모니터링 및 알림
- IoT 센서 시뮬레이터 제공

## 기술 스택
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js(Express), MongoDB
- AI: Python, Scikit-learn
- IoT: Python(MQTT)

## 폴더 구조 예시
```
greenwear/
├── frontend/
├── backend/
├── ai/
├── iot-simulator/
├── db/
├── docs/
├── .gitignore
├── README.md
└── docker-compose.yml
```

---

## 시작 가이드
1. 각 파트별 폴더로 이동해 README.md 참고
2. docker-compose로 전체 서비스 실행 가능 