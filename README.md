# 📝 Blog Promotion Generator

AI 기반 블로그 홍보글 자동 생성 웹 애플리케이션

## 🚀 주요 기능

- 🎯 **키워드 기반 생성**: 핵심 키워드를 입력하면 관련 홍보글 자동 생성
- 📂 **카테고리 선택**: 테크, 라이프스타일, 비즈니스, 건강 등 다양한 분야 지원
- 🎨 **톤앤매너 설정**: 친근함, 전문적, 유머러스, 공식적 등 다양한 어조 선택
- 📊 **템플릿 다양성**: 10+ 가지 검증된 홍보글 템플릿 제공
- 💾 **히스토리 관리**: 생성된 글들을 저장하고 관리
- ✏️ **실시간 편집**: 생성된 글을 바로 수정하고 커스터마이징

## 🏗️ 기술 스택

### Frontend
- **Vue 3** + TypeScript + Composition API
- **Tailwind CSS** - 모던하고 반응형 UI
- **Vite** - 빠른 개발 환경
- **Chart.js** - 통계 및 분석 차트

### Backend  
- **Spring Boot 3** - RESTful API 서버
- **Spring Data JPA** - 데이터베이스 ORM
- **PostgreSQL** - 메인 데이터베이스
- **Spring Security** - 인증 및 보안

### 배포
- **Frontend**: Vercel / Netlify
- **Backend**: Render / Railway
- **Database**: ElephantSQL (무료 PostgreSQL)

## 🛠️ 로컬 개발 환경

### 1. Frontend 실행
```bash
cd frontend
npm install
npm run dev
# http://localhost:3000
```

### 2. Backend 실행
```bash
cd backend
./gradlew bootRun
# http://localhost:8080
```

## 📱 주요 화면

1. **메인 페이지**: 키워드 입력 및 설정 선택
2. **생성 결과**: AI가 만든 홍보글 표시 및 편집
3. **히스토리**: 과거 생성된 글들 관리
4. **템플릿 갤러리**: 다양한 템플릿 미리보기
5. **분석 대시보드**: 생성 통계 및 인기 키워드

## 🎨 샘플 생성 결과

**입력**: `"맛집, 분위기 좋은, 데이트"`
**출력**: 
> 🍽️ **연인과 함께하는 특별한 시간** 
> 오늘은 분위기 좋은 맛집에서 소중한 사람과 달콤한 데이트를 즐겨보세요! 
> 정성스럽게 준비된 요리와 로맨틱한 인테리어가 여러분의 특별한 순간을 
> 더욱 빛나게 만들어 드립니다. ✨

## 🌟 특별한 기능

- **실시간 미리보기**: 설정을 바꿀 때마다 즉시 결과 확인
- **소셜 미디어 최적화**: 인스타그램, 페이스북 등 플랫폼별 최적 길이
- **SEO 친화적**: 검색 엔진 최적화를 고려한 키워드 배치
- **감정 분석**: 글의 감정 톤을 분석하고 조정 제안

## 📞 지원

- 📧 **이메일**: support@bloggen.com  
- 💬 **이슈**: [GitHub Issues](https://github.com/username/blog-promotion-generator/issues)
- 📖 **문서**: [사용자 가이드](./docs/user-guide.md)

---

⭐ **이 프로젝트가 도움이 되셨다면 스타를 눌러주세요!** 