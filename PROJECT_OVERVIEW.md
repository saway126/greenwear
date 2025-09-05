# 🌱 GreenWear - 스마트 웨어러블 헬스케어 플랫폼

실시간 생체신호 모니터링과 친환경 제품 추천을 결합한 혁신적인 웰니스 플랫폼입니다.

## 🎯 **현재 배포 상태**

### ✅ **활성 서비스**
- **프론트엔드**: [Vercel](https://vercel.com/skwka12346-gmailcoms-projects/greenwear-demo) - Vue.js + Vite
- **백엔드**: [Railway](https://railway.com/project/37a4b7b5-0417-4138-879f-e55aabf785dd) - Node.js + Express

### 📊 **프로젝트 현황**

| 구성 요소 | 상태 | 기술 스택 | 주요 기능 | 완성도 |
|---------|------|----------|---------|-------|
| 🌐 프론트엔드 | ✅ 배포됨 | Vue3 + Vite + Tailwind | 실시간 생체신호 모니터링 | 95% |
| 🔧 백엔드 | ✅ 배포됨 | Node.js + Express | API 서버 및 데이터 처리 | 90% |
| 📱 웨어러블 연동 | 🚧 개발중 | ESP32 + Arduino | 하드웨어 데이터 수집 | 60% |
| 🌱 친환경 제품 추천 | 📋 계획 | AI + 데이터베이스 | 개인화된 제품 추천 | 20% |

---

## 🔥 완성 프로젝트: Blog Promotion Generator

### ✨ 주요 특징
- **AI 기반 콘텐츠 생성**: 키워드, 카테고리, 톤앤매너 기반 자동 생성
- **SEO 최적화**: 실시간 SEO 점수 계산 및 개선 제안
- **감정 분석**: 콘텐츠의 감정 톤 분석 및 시각화
- **콘텐츠 관리**: 히스토리, 북마크, 검색, 필터링 기능

### 🛠️ 기술 구현
- **Frontend**: Vue 3 + TypeScript + Tailwind CSS + Chart.js
- **Backend**: Spring Boot 3.2 + JPA + H2 Database + Lombok
- **API**: RESTful API 16개 엔드포인트
- **분석**: 단어 수, 읽기 시간, SEO 점수 자동 계산

### 📁 프로젝트 구조
```
blog-promotion-generator/
├── frontend/          # Vue.js 프론트엔드
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── router/
│   │   └── services/
├── backend/           # Spring Boot 백엔드
│   └── src/main/java/com/bloggen/
│       ├── entity/
│       ├── repository/
│       ├── service/
│       └── controller/
└── README.md         # 상세 문서
```

---

## 🎯 개발 예정 프로젝트들

### 💕 Love Simulator - 대화형 연애 시뮬레이션 게임
**개념**: AI 기반 가상 연인과의 대화형 시뮬레이션 게임

**핵심 기능**:
- 다양한 캐릭터 선택 (성격, 취미, 직업별)
- 실시간 대화 시스템 (ChatGPT API 연동)
- 호감도 시스템 (선택에 따른 관계 변화)
- 시나리오 기반 이벤트 (데이트, 기념일 등)
- 엔딩 시스템 (다양한 결말)

**기술적 특징**:
- Vue 3 Composition API로 실시간 채팅 구현
- Spring Boot WebSocket으로 실시간 통신
- AI 대화 엔진으로 자연스러운 응답 생성
- 감정 분석으로 캐릭터 반응 조절

### 💼 Portfolio Builder - 포트폴리오 자동 생성 도구
**개념**: 개발자/디자이너를 위한 포트폴리오 자동 생성 및 관리 도구

**핵심 기능**:
- 프로젝트 정보 입력으로 포트폴리오 자동 생성
- 다양한 템플릿 (개발자용, 디자이너용, 기획자용)
- GitHub 연동으로 프로젝트 자동 수집
- PDF/웹 포트폴리오 내보내기
- 실시간 미리보기 및 편집

**기술적 특징**:
- Drag & Drop 기반 포트폴리오 편집기
- GitHub API 연동으로 프로젝트 데이터 수집
- PDF 생성 라이브러리로 포트폴리오 내보내기
- 템플릿 엔진으로 다양한 디자인 지원

### 📊 Habit Tracker - 습관 관리 및 통계 대시보드
**개념**: 일일 습관 추적 및 성과 분석을 위한 개인 관리 도구

**핵심 기능**:
- 습관 등록 및 일일 체크인 시스템
- 습관별 성취율 및 연속 달성 일수 추적
- 시각적 통계 대시보드 (Chart.js)
- 목표 설정 및 알림 기능
- 월간/연간 성과 리포트

**기술적 특징**:
- Vue 3 Composition API로 반응형 대시보드 구현
- Chart.js로 다양한 통계 차트 제공
- 로컬 스토리지와 DB 동기화
- PWA 지원으로 모바일 앱처럼 사용 가능

### 🍳 Recipe Recommender - 재료 기반 요리 추천 시스템
**개념**: 보유 재료를 기반으로 요리 레시피를 추천하는 스마트 요리 도구

**핵심 기능**:
- 재료 인식 및 등록 (카메라/수동 입력)
- 재료 조합 기반 레시피 추천
- 요리 난이도 및 소요 시간별 필터링
- 영양 정보 및 칼로리 계산
- 요리 과정 단계별 가이드

**기술적 특징**:
- 재료 매칭 알고리즘으로 최적 레시피 추천
- 이미지 인식 API로 재료 자동 인식
- 영양소 DB와 연동한 영양 정보 제공
- 타이머 기능과 요리 과정 안내

### 🌙 Mood Diary - 감정 분석 일기장
**개념**: 일기 작성과 감정 분석을 통한 멘탈 헬스 관리 도구

**핵심 기능**:
- 일기 작성 및 감정 태그 입력
- AI 기반 감정 분석 (긍정/부정/중립)
- 감정 변화 추이 시각화
- 감정 패턴 분석 및 인사이트 제공
- 명상/힐링 콘텐츠 추천

**기술적 특징**:
- 자연어 처리로 일기 내용 감정 분석
- D3.js로 감정 변화 시각화
- 머신러닝 모델로 감정 패턴 예측
- 개인정보 보호를 위한 로컬 암호화

---

## 🏗️ 공통 기술 스택

### Frontend (모든 프로젝트 공통)
- **Vue 3**: Composition API 기반 모던 프론트엔드
- **TypeScript**: 타입 안전성
- **Vite**: 빠른 개발 서버
- **Tailwind CSS**: 유틸리티 퍼스트 스타일링
- **Vue Router**: SPA 라우팅
- **Axios**: HTTP 클라이언트

### Backend (모든 프로젝트 공통)
- **Spring Boot 3.2**: 엔터프라이즈 자바 프레임워크
- **Spring Data JPA**: 데이터 액세스
- **H2 Database**: 개발용 인메모리 DB
- **Lombok**: 보일러플레이트 코드 감소
- **Validation**: 입력 데이터 검증

### 개발 환경
- **Git**: 버전 관리 (각 프로젝트별 독립 레포지토리)
- **VS Code**: 개발 IDE
- **Chrome DevTools**: 디버깅
- **Postman**: API 테스트

---

## 🚀 빠른 시작

### 사전 요구사항
- Node.js 18+
- Java 17+
- Git

### 각 프로젝트 실행 방법
```bash
# 1. 프로젝트 클론
git clone <project-repository>
cd <project-name>

# 2. 백엔드 실행
cd backend
./gradlew bootRun

# 3. 프론트엔드 실행 (새 터미널)
cd frontend
npm install
npm run dev
```

---

## 📋 개발 로드맵

### Phase 1: 기반 구축 (완료) ✅
- [x] 프로젝트 구조 설계
- [x] 공통 기술 스택 선정
- [x] Blog Generator 완성

### Phase 2: 핵심 프로젝트 개발 (진행중) 🚧
- [ ] Love Simulator 완성
- [ ] Portfolio Builder 완성
- [ ] Habit Tracker 완성

### Phase 3: 고도화 (예정) 📅
- [ ] Recipe Recommender 완성
- [ ] Mood Diary 완성
- [ ] 배포 및 최적화

### Phase 4: 확장 (미래) 🔮
- [ ] 모바일 앱 개발
- [ ] AI 기능 고도화
- [ ] 사용자 커뮤니티 구축

---

## 🤝 기여 가이드

1. 이슈 등록 또는 기능 제안
2. Fork & Branch 생성
3. 개발 및 테스트
4. Pull Request 생성
5. 코드 리뷰 및 병합

---

## 📞 연락처

- **개발자**: AI Assistant + Human Developer
- **이메일**: contact@demo-projects.com
- **깃허브**: https://github.com/demo-projects
- **문서**: https://docs.demo-projects.com

---

**🌟 이 프로젝트가 도움이 되었다면 각 레포지토리에 스타를 눌러주세요!** 