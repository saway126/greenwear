# 🤖 AI 도구 활용 워크플로우 가이드

> **GPT Pro, Gemini Pro CLI, Cursor AI Pro를 활용한 개발 효율성 향상 전략**  
> **작성일**: 2025년 10월  
> **대상**: GreenWear 프로젝트 개발자

---

## 📋 목차

1. [보유 AI 도구 개요](#1-보유-ai-도구-개요)
2. [통합 AI 워크플로우 구축](#2-통합-ai-워크플로우-구축)
3. [Cursor AI Pro 활용법](#3-cursor-ai-pro-활용법)
4. [GPT Pro (ChatGPT Codex) 활용법](#4-gpt-pro-chatgpt-codex-활용법)
5. [Gemini Pro CLI 활용법](#5-gemini-pro-cli-활용법)
6. [RAG 기반 지식 베이스 구축](#6-rag-기반-지식-베이스-구축)
7. [실전 사용 시나리오](#7-실전-사용-시나리오)

---

## 1. 보유 AI 도구 개요

### 🛠️ 도구별 강점 분석

| 도구 | 주요 강점 | 최적 사용 시나리오 | 통합 가능성 |
|------|-----------|-------------------|------------|
| **Cursor AI Pro** | - 코드베이스 완전 이해<br/>- 실시간 코딩 지원<br/>- MCP 프로토콜 지원 | 코딩 중 실시간 도움<br/>리팩토링<br/>버그 수정 | ⭐⭐⭐⭐⭐ |
| **GPT Pro** | - ChatGPT Codex 연동<br/>- GitHub 저장소 직접 연결<br/>- 고급 추론 능력 | 프로젝트 기획<br/>아키텍처 설계<br/>문서 작성 | ⭐⭐⭐⭐ |
| **Gemini Pro CLI** | - CLI 기반 자동화<br/>- Google Cloud 통합<br/>- 빠른 응답 속도 | 자동화 스크립트<br/>배치 처리<br/>CI/CD 통합 | ⭐⭐⭐⭐⭐ |

---

## 2. 통합 AI 워크플로우 구축

### 🎯 통합 워크플로우 원리 적용

프로젝트의 **지식, 맥락, 태스크**를 중앙에서 관리하고 AI 도우미와 공유하여 **일관된 협업 환경**을 구성하는 것이 중요합니다.

#### 2.1 중앙 지식 베이스 구성

```
greenwear/
├── docs/
│   ├── ARCHITECTURE.md          # 시스템 아키텍처
│   ├── API_REFERENCE.md         # API 문서
│   ├── SECURITY_AUDIT_CHECKLIST.md  # 보안 가이드
│   ├── NODEJS_MODERNIZATION_GUIDE.md # 기술 가이드
│   └── AI_TOOLS_WORKFLOW.md     # 본 문서
├── .cursorrules                 # Cursor AI 컨텍스트 규칙
├── .github/
│   └── copilot-instructions.md  # GitHub Copilot 지침
└── ai-context/
    ├── project-context.json     # 프로젝트 메타데이터
    ├── tech-stack.json          # 기술 스택 정보
    └── coding-standards.json    # 코딩 표준
```

#### 2.2 컨텍스트 공유 설정

**`.cursorrules` 파일 생성**:
```markdown
# GreenWear 프로젝트 컨텍스트

## 프로젝트 개요
- 이름: GreenWear - 스마트 웨어러블 헬스케어 플랫폼
- 기술 스택: Vue.js, Node.js, Express, React Native, ESP32
- Node.js 버전: 18.20.8 이상

## 코딩 표준
- 보안 우선: CORS 제한, Rate Limiting 필수
- Node.js 내장 기능 우선 사용
- 테스트 작성 필수 (node:test 사용)

## 프로젝트 파일 구조
- backend/: Node.js/Express 백엔드
- src/: Vue.js 프론트엔드
- GreenWearMobile/: React Native 모바일 앱
- esp32_*.ino: 하드웨어 펌웨어

## 주의사항
- CORS origin: '*' 사용 금지
- 환경변수는 .env.example 참고
- 모든 API에 Rate Limiting 적용
```

---

## 3. Cursor AI Pro 활용법

### 🚀 설정 및 최적화

#### 3.1 초기 설정
```bash
# 1. Cursor AI Pro 설치 (Windows)
# https://cursor.sh/ 에서 다운로드

# 2. 프로젝트 열기
cd C:\kks0518\greenwear
cursor .

# 3. AI 모델 선택
# Settings → AI → Model: Claude Sonnet 4.5 (권장)
```

#### 3.2 프로젝트 컨텍스트 로딩

**Cursor의 "Composer" 기능 활용**:
```
1. Ctrl+I (또는 Cmd+I) → Composer 열기

2. 프롬프트 입력:
   "이 프로젝트의 전체 구조를 분석하고 다음을 이해해줘:
    - backend/server.js의 API 구조
    - 보안 설정 (CORS, Rate Limiting)
    - 테스트 구조 (backend/tests/)
    
    그리고 SECURITY_AUDIT_CHECKLIST.md와 
    NODEJS_MODERNIZATION_GUIDE.md를 참고해서 
    개선할 점을 제안해줘."

3. Cursor가 프로젝트 전체를 분석하고 제안 제공
```

#### 3.3 실시간 코딩 지원

**Chat 기능 (Ctrl+L)**:
```javascript
// 1. 코드 선택
app.post('/api/wearable/data', (req, res) => {
  // ... 기존 코드
});

// 2. Ctrl+L → Chat 열기
// 3. 질문: "이 API에 입력 검증을 추가해줘. Joi 사용"
// 4. Cursor가 자동으로 코드 생성 및 적용
```

**Inline Edit (Ctrl+K)**:
```javascript
// 커서를 함수 위에 두고 Ctrl+K
// 프롬프트: "이 함수에 에러 핸들링 추가"
// → 즉시 코드 수정
```

#### 3.4 고급 기능

**멀티파일 리팩토링**:
```
1. Composer에서:
   "@backend/server.js @backend/api/database.js 
    두 파일의 중복 코드를 제거하고 
    공통 유틸리티 함수로 추출해줘"

2. Cursor가 자동으로:
   - 중복 코드 식별
   - backend/utils/common.js 생성
   - 두 파일 모두 수정
```

---

## 4. GPT Pro (ChatGPT Codex) 활용법

### 💡 GitHub 저장소 연동

#### 4.1 초기 설정

1. **ChatGPT 접속**: https://chat.openai.com
2. **Codex 활성화**:
   ```
   - 새 대화 시작
   - 왼쪽 사이드바 → "Codex" 클릭
   - "Connect GitHub" 클릭
   ```

3. **저장소 연결**:
   ```
   - GitHub 인증
   - Repository 선택: saway126/greenwear
   - 권한 승인
   ```

#### 4.2 프로젝트 분석 요청

**프롬프트 예시**:
```
@greenwear 저장소를 분석해서 다음을 알려줘:

1. 보안 취약점 (특히 CORS, 인증, Rate Limiting)
2. 성능 개선 가능한 부분
3. 코드 품질 문제
4. 테스트 커버리지가 부족한 부분

각 항목에 대해 구체적인 파일명과 라인 번호를 포함해서 
개선 방안을 제시해줘.
```

#### 4.3 문서 자동 생성

**API 문서 생성**:
```
@greenwear/backend/server.js 파일을 분석해서 
OpenAPI 3.0 명세를 생성해줘.

포함할 내용:
- 모든 엔드포인트
- 요청/응답 스키마
- 에러 코드
- 인증 방법 (향후 구현 예정)
```

**README 업데이트**:
```
@greenwear 프로젝트의 최신 변경사항을 반영해서 
README.md를 업데이트해줘.

특히 다음을 강조:
- 최근 추가된 보안 기능 (Rate Limiting, Helmet)
- 내장 테스트 러너 사용법
- 환경변수 설정 가이드
```

---

## 5. Gemini Pro CLI 활용법

### ⚡ 자동화 및 배치 처리

#### 5.1 CLI 설치 및 설정

```bash
# 1. Gemini API 키 발급
# https://makersuite.google.com/app/apikey

# 2. 환경변수 설정
export GEMINI_API_KEY="your-api-key-here"

# 3. gemini-cli 설치 (예시 - 실제 패키지명은 다를 수 있음)
npm install -g @google/generative-ai-cli
```

#### 5.2 코드 리뷰 자동화

**자동 코드 리뷰 스크립트** (`scripts/auto-review.sh`):
```bash
#!/bin/bash

# 최근 변경된 파일 가져오기
CHANGED_FILES=$(git diff --name-only HEAD~1)

# 각 파일에 대해 Gemini로 리뷰
for file in $CHANGED_FILES; do
  if [[ $file == *.js ]]; then
    echo "Reviewing $file..."
    
    # 파일 내용을 Gemini에 전송
    gemini-cli review \
      --file "$file" \
      --prompt "이 JavaScript 코드를 리뷰해줘. 
                보안 이슈, 성능 문제, 버그 가능성을 찾아줘." \
      --output "review_${file}.md"
  fi
done
```

#### 5.3 테스트 자동 생성

**테스트 생성 스크립트** (`scripts/generate-tests.js`):
```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateTestsForFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `
다음 JavaScript 코드에 대한 포괄적인 테스트를 작성해줘.
Node.js 내장 테스트 러너 (node:test)를 사용해줘.

코드:
\`\`\`javascript
${code}
\`\`\`

테스트는 다음을 포함해야 해:
- 정상 케이스
- 에지 케이스
- 에러 처리
- 입력 검증
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const testCode = response.text();
  
  // 테스트 파일 저장
  const testFilePath = filePath.replace('.js', '.test.js');
  fs.writeFileSync(testFilePath, testCode, 'utf8');
  
  console.log(`✅ 테스트 생성 완료: ${testFilePath}`);
}

// 사용 예시
generateTestsForFile('backend/api/vitals.js');
```

#### 5.4 CI/CD 통합

**GitHub Actions 워크플로우** (`.github/workflows/ai-review.yml`):
```yaml
name: AI Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Gemini CLI
        run: npm install -g @google/generative-ai
      
      - name: Run AI Review
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
        run: |
          node scripts/ai-review.js
      
      - name: Post Review Comment
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('ai-review-result.md', 'utf8');
            
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: review
            });
```

---

## 6. RAG 기반 지식 베이스 구축

### 📚 RAG 기반 지식 베이스 구축

**RAG(Retrieval-Augmented Generation)**는 사용자가 제공한 원본 소스를 기반으로 답변하여 환각(hallucination)을 줄입니다.

#### 6.1 프로젝트 지식 베이스 구성

**디렉토리 구조**:
```
greenwear/
└── knowledge-base/
    ├── technical/
    │   ├── nodejs-internals.pdf
    │   ├── express-security.pdf
    │   └── postgresql-optimization.pdf
    ├── domain/
    │   ├── healthcare-regulations.pdf
    │   ├── wearable-device-standards.pdf
    │   └── esp32-reference.pdf
    └── project/
        ├── SECURITY_AUDIT_CHECKLIST.md
        ├── NODEJS_MODERNIZATION_GUIDE.md
        └── ARCHITECTURE.md
```

#### 6.2 GPT Pro에 문서 업로드

**프롬프트**:
```
다음 문서들을 읽고 GreenWear 프로젝트의 컨텍스트를 이해해줘:

[파일 업로드]
- SECURITY_AUDIT_CHECKLIST.md
- NODEJS_MODERNIZATION_GUIDE.md
- backend/server.js
- backend/package.json

이제 질문할게:
1. 현재 보안 설정의 개선점은?
2. Node.js 18 기능을 더 활용할 수 있는 부분은?
3. 성능 최적화 방안은?

답변할 때 반드시 업로드한 문서의 내용을 인용해줘.
```

#### 6.3 학습 콘텐츠 생성

**플래시 카드 생성**:
```
업로드한 NODEJS_MODERNIZATION_GUIDE.md를 기반으로 
학습용 플래시 카드 20개를 만들어줘.

형식:
Q: [질문]
A: [답변]
난이도: [초급/중급/고급]
출처: [문서 내 섹션]

예시:
Q: Node.js 18에서 fetch()를 사용하려면 어떤 패키지가 필요한가?
A: 패키지가 필요 없다. Node.js 18부터 fetch()가 내장되어 있다.
난이도: 초급
출처: "3.1 HTTP 요청" 섹션
```

**마인드맵 생성**:
```
SECURITY_AUDIT_CHECKLIST.md의 내용을 마인드맵으로 정리해줘.

중앙: "GreenWear 보안"
주요 가지:
- 긴급 조치
- Git 보안
- 데이터베이스 보안
- API 보안
- ...

각 가지에 하위 항목과 우선순위 표시
Mermaid 다이어그램 형식으로 출력
```

---

## 7. 실전 사용 시나리오

### 🎯 시나리오 1: 새로운 기능 개발

**단계별 AI 활용**:

1. **기획 단계** (GPT Pro)
   ```
   @greenwear 저장소를 보고, 
   "사용자 인증 시스템" 기능을 추가하려고 해.
   
   다음을 제안해줘:
   - 아키텍처 설계
   - 필요한 npm 패키지 (보안 우선)
   - 데이터베이스 스키마
   - API 엔드포인트 목록
   ```

2. **구현 단계** (Cursor AI)
   ```
   Composer에서:
   "GPT Pro가 제안한 인증 시스템을 구현해줘.
    - JWT 토큰 기반
    - Rate Limiting 적용
    - 테스트 코드 포함
    - 보안 베스트 프랙티스 준수"
   ```

3. **테스트 단계** (Gemini CLI)
   ```bash
   # 자동 테스트 생성
   node scripts/generate-tests.js backend/api/auth.js
   
   # 테스트 실행
   npm test
   ```

4. **문서화 단계** (GPT Pro)
   ```
   방금 구현한 인증 시스템에 대해:
   - API 문서 (OpenAPI)
   - 사용 가이드
   - 보안 고려사항
   를 작성해줘.
   ```

---

### 🎯 시나리오 2: 버그 수정

**단계별 AI 활용**:

1. **버그 분석** (Cursor AI)
   ```
   Chat (Ctrl+L):
   "IoT 데이터 전송 시 간헐적으로 실패하는 문제가 있어.
    @backend/server.js @backend/api/wearable.js 를 분석해서
    문제를 찾아줘."
   ```

2. **해결 방안 검토** (GPT Pro)
   ```
   다음 버그 리포트를 보고 해결 방안을 제시해줘:
   
   [버그 설명]
   증상: IoT 데이터 전송 실패 (간헐적)
   에러: "Request timeout"
   발생 빈도: 5% 정도
   
   [관련 코드 첨부]
   
   가능한 원인과 해결 방안을 우선순위로 정리해줘.
   ```

3. **수정 구현** (Cursor AI)
   ```
   Inline Edit (Ctrl+K):
   "GPT Pro가 제안한 타임아웃 증가 + 재시도 로직을 구현해줘"
   ```

4. **검증** (Gemini CLI)
   ```bash
   # 스트레스 테스트 생성
   gemini-cli generate-load-test \
     --endpoint "/api/wearable/data" \
     --requests 1000 \
     --concurrent 50
   ```

---

### 🎯 시나리오 3: 보안 감사

**단계별 AI 활용**:

1. **자동 스캔** (Gemini CLI)
   ```bash
   # 전체 프로젝트 보안 스캔
   node scripts/security-scan.js
   ```

2. **심층 분석** (GPT Pro)
   ```
   @greenwear 저장소의 보안을 분석해줘.
   
   SECURITY_AUDIT_CHECKLIST.md의 항목을 기준으로
   현재 구현 상태를 평가하고,
   미완료 항목에 대한 우선순위를 매겨줘.
   ```

3. **수정 적용** (Cursor AI)
   ```
   Composer:
   "GPT Pro가 지적한 보안 이슈를 수정해줘.
    특히 우선순위가 높은 항목부터."
   ```

---

## 8. 효율성 극대화 팁

### ⚡ 개발 효율성 향상 전략

#### 8.1 도구별 최적 사용 시점

| 상황 | 최적 도구 | 이유 |
|------|----------|------|
| 코딩 중 실시간 도움 | Cursor AI | 코드베이스 컨텍스트 유지 |
| 프로젝트 전체 분석 | GPT Pro + Codex | GitHub 직접 연동 |
| 반복 작업 자동화 | Gemini CLI | 스크립트화 가능 |
| 학습 자료 생성 | GPT Pro | RAG 기반 신뢰성 |
| CI/CD 통합 | Gemini CLI | 빠른 응답, 안정성 |

#### 8.2 컨텍스트 전환 최소화

```
잘못된 방식:
Cursor → GPT → Cursor → Gemini (계속 전환)

올바른 방식:
1. GPT Pro: 전체 기획 및 설계
2. Cursor AI: 구현 (한번에 완성)
3. Gemini CLI: 테스트 및 배포
```

#### 8.3 템플릿 프롬프트 활용

**프롬프트 라이브러리** (`ai-prompts/`):
```
ai-prompts/
├── code-review.txt
├── test-generation.txt
├── documentation.txt
├── security-audit.txt
└── refactoring.txt
```

**예시** (`code-review.txt`):
```
다음 코드를 리뷰해줘:

[코드 내용]

리뷰 기준:
1. 보안 (OWASP Top 10 기준)
2. 성능 (시간/공간 복잡도)
3. 가독성 (Clean Code 원칙)
4. 테스트 가능성
5. 에러 처리

각 항목에 대해 점수(1-10)와 개선 방안을 제시해줘.
```

---

## 9. 주의사항 및 제한사항

### ⚠️ 보안

- **API 키 관리**: 환경변수 사용, Git 커밋 금지
- **코드 업로드**: 민감한 정보 제거 후 업로드
- **저장소 권한**: 최소 권한 원칙 적용

### 🔄 한계 인식

- **AI는 도구**: 최종 판단은 개발자
- **코드 검증**: 생성된 코드는 반드시 테스트
- **맥락 이해**: 프로젝트 특수성은 명시적으로 전달

---

## 10. 체크리스트

### ✅ AI 도구 설정 완료

- [ ] Cursor AI Pro 설치 및 프로젝트 연결
- [ ] `.cursorrules` 파일 생성
- [ ] GPT Pro에서 GitHub 저장소 연결
- [ ] Gemini API 키 발급 및 설정
- [ ] 프로젝트 문서 AI에 업로드 (RAG)
- [ ] 자동화 스크립트 작성 (`scripts/`)
- [ ] CI/CD에 AI 리뷰 통합

---

## 11. 참고 자료

### 🔗 공식 문서
- [Cursor AI Docs](https://cursor.sh/docs)
- [OpenAI Codex](https://platform.openai.com/docs/guides/code)
- [Google Gemini API](https://ai.google.dev/docs)

### 📚 관련 학습 자료
- [RAG 구현 가이드](https://python.langchain.com/docs/use_cases/question_answering/)
- [AI 도구 통합 워크플로우](https://docs.github.com/en/copilot/getting-started-with-github-copilot)

---

**마지막 업데이트**: 2025년 10월  
**작성자**: GreenWear Development Team  
**버전**: 1.0.0  
**도구**: GPT Pro, Gemini Pro CLI, Cursor AI Pro

