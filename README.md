# GreenWear (그린웨어)

웨어러블 센서로 수집한 바이오리듬(심박수, 체온 등) 데이터를 AI로 분석하여,
옷의 색상(초록/노랑/빨강)으로 건강 상태를 실시간 시각화하는 스마트 헬스케어 시스템입니다.

## 주요 기능

### 🔐 사용자 인증
- **로그인 페이지**: 간편한 로그인 시스템
- **회원가입 페이지**: 새 사용자 등록 기능
- **마이페이지**: 개인 건강 기록 관리

### 📊 건강 모니터링
- **실시간 건강 데이터 수집**: 심박수, 체온 등 바이오리듬 측정
- **AI 기반 상태 분류**: 정상/주의/위험 상태 자동 분류
- **시각적 알림 시스템**: 색상별 건강 상태 표시
- **개인 기록 관리**: 과거 건강 데이터 이력 조회

### 🎯 대상 사용자
- 의료진 및 환자 모니터링
- 고위험 직업군 (군인, 소방관 등)
- 고령자 건강 관리
- 일반인 건강 체크

## 기술 스택

### Frontend
- **Vue.js 3**: 컴포지션 API 활용
- **TypeScript**: 타입 안정성 보장
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **Vue Router**: SPA 라우팅 관리

### Backend
- **Node.js**: Express 프레임워크
- **MongoDB**: NoSQL 데이터베이스

### AI & IoT
- **Python**: 머신러닝 및 데이터 분석
- **Scikit-learn**: AI 모델 구축
- **MQTT**: IoT 센서 통신

## 프로젝트 구조

```
greenwear/
├── frontend/                 # Vue.js 프론트엔드
│   ├── src/
│   │   ├── pages/           # 페이지 컴포넌트
│   │   │   ├── MainPage.vue      # 메인 페이지
│   │   │   ├── LoginPage.vue     # 로그인 페이지
│   │   │   ├── SignupPage.vue    # 회원가입 페이지
│   │   │   ├── MyPage.vue        # 마이페이지
│   │   │   ├── DashboardPage.vue # 대시보드
│   │   │   ├── AlertPage.vue     # 알림 페이지
│   │   │   └── common/           # 공통 컴포넌트
│   │   │       └── LogoSection.vue
│   │   ├── router/          # 라우터 설정
│   │   └── ...
├── backend/                  # Node.js 백엔드
├── ai/                      # AI 분석 모듈
├── iot-simulator/           # IoT 센서 시뮬레이터
├── db/                      # 데이터베이스 설정
├── docs/                    # 문서화
└── README.md
```

## 🚀 시작하기

### 1. 프로젝트 클론
```bash
git clone https://github.com/saway126/greaenwear.git
cd greaenwear
```

### 2. 프론트엔드 실행
```bash
cd frontend
npm install
npm run dev
```

### 3. 접속 및 테스트
- **로컬 서버**: http://localhost:5173
- **테스트 계정**: 
  - 아이디: `test`
  - 비밀번호: `1234`

## 📱 페이지 구성

### 메인 페이지 (/)
- 서비스 소개 및 현재 건강 상태 개요
- 상태별 카드 (정상/주의/위험)
- 상단 네비게이션 (로그인/회원가입/마이페이지)

### 로그인 페이지 (/login)
- GreenWear 브랜딩 디자인
- 사용자 인증 시스템
- 테스트 계정 정보 제공

### 회원가입 페이지 (/signup)
- 새 사용자 등록 폼
- 유효성 검사 기능
- 자동 로그인 페이지 연결

### 마이페이지 (/mypage)
- 개인 건강 기록 조회
- 통계 카드 (모니터링 일수, 평균 심박수, 평균 체온)
- 페이지네이션이 적용된 기록 테이블
- 상태별 색상 구분 (정상/주의/위험)

### 대시보드 (/dashboard)
- 실시간 건강 데이터 시각화
- 상세 분석 차트

### 알림 페이지 (/alert)
- 위험 상황 알림 목록
- 응급 상황 대응 가이드

## 🎨 디자인 시스템

### 색상 테마
- **Primary**: Green (건강, 안전)
- **Warning**: Yellow (주의, 경고)
- **Danger**: Red (위험, 응급)
- **Secondary**: Blue, Purple (기능별 구분)

### 반응형 디자인
- 모바일 우선 디자인
- Tailwind CSS 그리드 시스템 활용
- 다양한 화면 크기 지원

## 🔧 개발 환경 설정

### 필수 요구사항
- Node.js 18+
- npm 또는 yarn
- Git

### 개발 도구
- Vue DevTools
- VS Code + Vetur/Volar
- Chrome DevTools

## 📝 향후 개발 계획

- [ ] 백엔드 API 연동
- [ ] 실시간 데이터 연동
- [ ] PWA 지원
- [ ] 모바일 앱 개발
- [ ] 의료진 전용 관리자 페이지
- [ ] 다국어 지원
- [ ] 데이터 내보내기 기능

## 🤝 기여 방법

1. 이슈 등록 또는 기존 이슈 확인
2. 브랜치 생성 (`git checkout -b feature/새기능`)
3. 변경사항 커밋 (`git commit -m '새 기능 추가'`)
4. 브랜치 푸시 (`git push origin feature/새기능`)
5. Pull Request 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

## 📞 문의사항

- 개발자: [GitHub Profile](https://github.com/saway126)
- 프로젝트 이슈: [GitHub Issues](https://github.com/saway126/greaenwear/issues)

**GreenWear로 더 건강한 미래를 만들어보세요! 🌱** 