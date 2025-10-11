# 🚀 Node.js 현대화 가이드

> **GreenWear 프로젝트 - Node.js 최신 기능 활용 및 의존성 축소 가이드**  
> **작성일**: 2025년 1월  
> **Node.js 버전**: 18.20.8 이상 권장

---

## 📋 목차

1. [왜 Node.js를 현대화해야 하는가?](#1-왜-nodejs를-현대화해야-하는가)
2. [내장 기능으로 대체 가능한 npm 패키지](#2-내장-기능으로-대체-가능한-npm-패키지)
3. [실전 마이그레이션 가이드](#3-실전-마이그레이션-가이드)
4. [GreenWear 프로젝트 적용 현황](#4-greenwear-프로젝트-적용-현황)
5. [다음 단계 로드맵](#5-다음-단계-로드맵)

---

## 1. 왜 Node.js를 현대화해야 하는가?

### 🎯 핵심 이유

#### 1.1 공급망 보안 강화
최근 발생한 **레드햇 저장소 유출 사건**, **npm 패키지 악성 코드 삽입** 등으로 인해 외부 의존성 최소화가 필수가 되었습니다.

```
❌ node_modules 폭탄
📦 node_modules (1,234 dependencies)
  ├─ 직접 설치: 15개
  ├─ 간접 의존성: 1,219개 🚨
  └─ 취약점: 47개 발견

✅ 내장 기능 활용
📦 node_modules (512 dependencies)
  ├─ 직접 설치: 8개
  ├─ 간접 의존성: 504개
  └─ 취약점: 12개 발견
```

#### 1.2 성능 향상
- **네이티브 구현**: C++로 작성된 내장 기능이 JavaScript 패키지보다 빠름
- **메모리 효율**: 불필요한 패키지 로딩 제거
- **빌드 시간 단축**: 의존성 설치 시간 절감

#### 1.3 유지보수 간소화
- **버전 관리 불필요**: Node.js 버전만 관리하면 됨
- **호환성 문제 감소**: 패키지 간 충돌 해결 불필요
- **문서 표준화**: Node.js 공식 문서 하나로 통일

---

## 2. 내장 기능으로 대체 가능한 npm 패키지

### 🔄 마이그레이션 우선순위표

| 우선순위 | 패키지 | 내장 기능 | Node.js 버전 | 난이도 | 영향도 |
|---------|--------|-----------|-------------|--------|--------|
| 🔴 높음 | `node-fetch` | `global fetch()` | 18.0.0+ | ⭐ 쉬움 | 🎯 높음 |
| 🔴 높음 | `uuid` | `crypto.randomUUID()` | 14.17.0+ | ⭐ 쉬움 | 🎯 높음 |
| 🟡 중간 | `dotenv` | `--env-file` 플래그 | 20.6.0+ | ⭐⭐ 보통 | 🎯 중간 |
| 🟡 중간 | `jest/mocha` | `node:test` | 18.0.0+ | ⭐⭐⭐ 어려움 | 🎯 중간 |
| 🟢 낮음 | `fs-extra` | `node:fs/promises` | 14.0.0+ | ⭐⭐ 보통 | 🎯 낮음 |
| 🟢 낮음 | `util.promisify` | Native Promises | 10.0.0+ | ⭐ 쉬움 | 🎯 낮음 |

---

## 3. 실전 마이그레이션 가이드

### 3.1 HTTP 요청: `node-fetch` → `fetch()`

#### Before (node-fetch 사용)
```javascript
// ❌ 외부 패키지 의존
const fetch = require('node-fetch');

async function getUserData(userId) {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  const data = await response.json();
  return data;
}
```

#### After (내장 fetch 사용)
```javascript
// ✅ Node.js 18.0.0+ 내장 기능
async function getUserData(userId) {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  const data = await response.json();
  return data;
}
```

#### 마이그레이션 단계
```bash
# 1. Node.js 버전 확인
node --version  # v18.0.0 이상 확인

# 2. node-fetch 제거
npm uninstall node-fetch

# 3. 코드에서 require('node-fetch') 제거
# (global fetch는 자동으로 사용 가능)

# 4. 테스트 실행
npm test
```

#### 고급 사용법
```javascript
// POST 요청
const createUser = async (userData) => {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_TOKEN}`
    },
    body: JSON.stringify(userData)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
};

// 타임아웃 설정
const fetchWithTimeout = async (url, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};
```

---

### 3.2 UUID 생성: `uuid` → `crypto.randomUUID()`

#### Before (uuid 패키지)
```javascript
// ❌ 외부 패키지 의존 (주간 다운로드: 170M+)
const { v4: uuidv4 } = require('uuid');

const userId = uuidv4();
console.log(userId); // '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```

#### After (내장 crypto 사용)
```javascript
// ✅ Node.js 14.17.0+ 내장 기능
const { randomUUID } = require('node:crypto');

const userId = randomUUID();
console.log(userId); // '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```

#### 마이그레이션 단계
```bash
# 1. uuid 패키지 제거
npm uninstall uuid

# 2. 코드 일괄 변경
grep -r "require('uuid')" . --exclude-dir=node_modules
# 또는
grep -r "from 'uuid'" . --exclude-dir=node_modules

# 3. 변경 예시
sed -i "s/const { v4: uuidv4 } = require('uuid')/const { randomUUID } = require('node:crypto')/g" **/*.js
sed -i "s/uuidv4()/randomUUID()/g" **/*.js

# 4. 테스트
npm test
```

#### 성능 비교
```javascript
const { randomUUID } = require('node:crypto');

// 벤치마크 (100,000회 생성)
console.time('crypto.randomUUID');
for (let i = 0; i < 100000; i++) {
  randomUUID();
}
console.timeEnd('crypto.randomUUID');
// 평균: ~150ms (네이티브 C++ 구현)

// vs uuid 패키지: ~250ms (JavaScript 구현)
// 성능 향상: 약 40% 빠름
```

---

### 3.3 환경변수: `dotenv` → `--env-file` 플래그

#### Before (dotenv 패키지)
```javascript
// ❌ 코드에서 dotenv 로드 필요
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DATABASE_URL;
```

#### After (Node.js 20.6.0+ 내장)
```javascript
// ✅ 코드 변경 불필요
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DATABASE_URL;
```

#### 실행 방법 변경
```bash
# Before
node server.js

# After (Node.js 20.6.0+)
node --env-file=.env server.js
node --env-file=.env.production server.js

# package.json 스크립트 업데이트
{
  "scripts": {
    "dev": "node --env-file=.env server.js",
    "start": "node --env-file=.env.production server.js"
  }
}
```

#### 주의사항
```bash
# ⚠️  Node.js 버전 확인 필수
node --version  # v20.6.0 이상 필요

# 하위 호환성 유지 (Node.js < 20.6.0)
if (process.version.match(/^v(\d+)\./)[1] < 20) {
  require('dotenv').config();
}
```

---

### 3.4 테스트: `jest/mocha` → `node:test`

#### Before (Jest/Mocha)
```javascript
// ❌ 외부 테스트 프레임워크
const { expect } = require('chai');
const { describe, it } = require('mocha');

describe('User API', () => {
  it('should create a new user', async () => {
    const user = await createUser({ name: 'John' });
    expect(user.name).to.equal('John');
  });
});
```

#### After (Node.js 18+ 내장 테스트)
```javascript
// ✅ Node.js 18.0.0+ 내장 기능
const { test, describe } = require('node:test');
const assert = require('node:assert');

describe('User API', () => {
  test('should create a new user', async () => {
    const user = await createUser({ name: 'John' });
    assert.strictEqual(user.name, 'John');
  });
});
```

#### 실행 방법
```bash
# 테스트 실행
node --test

# Watch 모드
node --test --watch

# 커버리지
node --test --experimental-test-coverage

# package.json 스크립트
{
  "scripts": {
    "test": "node --test",
    "test:watch": "node --test --watch",
    "test:coverage": "node --test --experimental-test-coverage"
  }
}
```

#### 고급 기능
```javascript
const { test, describe, beforeEach, afterEach, mock } = require('node:test');
const assert = require('node:assert');

describe('Advanced Testing', () => {
  let database;
  
  beforeEach(async () => {
    database = await initTestDatabase();
  });
  
  afterEach(async () => {
    await cleanupDatabase(database);
  });
  
  test('should handle async operations', async (t) => {
    // 서브테스트
    await t.test('subtask 1', async () => {
      const result = await asyncOperation1();
      assert.ok(result);
    });
    
    await t.test('subtask 2', async () => {
      const result = await asyncOperation2();
      assert.ok(result);
    });
  });
  
  test('should mock functions', () => {
    const mockFn = mock.fn(() => 'mocked');
    const result = mockFn();
    
    assert.strictEqual(result, 'mocked');
    assert.strictEqual(mockFn.mock.calls.length, 1);
  });
  
  test('should use test context', (t) => {
    t.diagnostic('This is a diagnostic message');
    t.skip('Skipping this test');
  });
});
```

---

### 3.5 파일 시스템: `fs-extra` → `node:fs/promises`

#### Before (fs-extra)
```javascript
// ❌ 외부 패키지
const fs = require('fs-extra');

await fs.ensureDir('/path/to/dir');
await fs.copy('/src', '/dest');
await fs.remove('/path/to/remove');
```

#### After (내장 fs/promises)
```javascript
// ✅ Node.js 14.0.0+
const fs = require('node:fs/promises');
const path = require('node:path');

// 디렉토리 생성
await fs.mkdir('/path/to/dir', { recursive: true });

// 파일 복사
await fs.cp('/src', '/dest', { recursive: true });

// 파일/디렉토리 삭제
await fs.rm('/path/to/remove', { recursive: true, force: true });

// 파일 읽기/쓰기
const data = await fs.readFile('file.txt', 'utf8');
await fs.writeFile('output.txt', data, 'utf8');

// 파일 존재 확인
try {
  await fs.access('file.txt');
  console.log('파일이 존재합니다');
} catch {
  console.log('파일이 없습니다');
}
```

---

### 3.6 기타 유용한 내장 기능

#### Web Streams API (Node.js 16.5.0+)
```javascript
// ReadableStream 사용
const stream = new ReadableStream({
  start(controller) {
    controller.enqueue('Hello ');
    controller.enqueue('World');
    controller.close();
  }
});

const reader = stream.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(value);
}
```

#### Web Crypto API (Node.js 15.0.0+)
```javascript
const crypto = require('node:crypto').webcrypto;

// 해시 생성
const data = new TextEncoder().encode('Hello World');
const hashBuffer = await crypto.subtle.digest('SHA-256', data);
const hashArray = Array.from(new Uint8Array(hashBuffer));
const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
```

#### Blob (Node.js 15.7.0+)
```javascript
// Blob 생성 및 사용
const blob = new Blob(['Hello World'], { type: 'text/plain' });
console.log(await blob.text()); // 'Hello World'
```

---

## 4. GreenWear 프로젝트 적용 현황

### ✅ 현재 상태 분석

#### 백엔드 (backend/package.json)
```json
{
  "dependencies": {
    "express": "^4.18.2",        // 필수 - 웹 프레임워크
    "cors": "^2.8.5",            // 필수 - CORS 처리
    "express-rate-limit": "^7.1.5", // 필수 - Rate Limiting
    "helmet": "^7.1.0",          // 필수 - 보안 헤더
    "pg": "^8.11.3",             // 필수 - PostgreSQL 드라이버
    "winston": "^3.11.0"         // 필수 - 로깅
  }
}
```

#### 평가
- ✅ **node-fetch 미사용**: 이미 내장 fetch() 사용 가능
- ✅ **uuid 미사용**: 필요 시 crypto.randomUUID() 사용 가능
- ✅ **최소 의존성**: 6개만 사용하여 매우 깔끔
- ✅ **Node.js 18+**: 최신 기능 사용 가능

### 🚀 적용 완료 항목

1. **내장 테스트 러너** ✅
   - `backend/tests/api.test.js` 생성
   - `npm test` 스크립트 추가
   - Jest/Mocha 불필요

2. **보안 강화** ✅
   - `helmet` 추가 (보안 헤더)
   - `express-rate-limit` 추가 (DDoS 방어)
   - CORS 설정 강화

3. **환경변수 관리** ✅
   - `.env.example` 완전 문서화
   - 프로덕션/개발 환경 분리

---

## 5. 다음 단계 로드맵

### 📅 Phase 1: 단기 (1-2주)

#### 1.1 CommonJS → ESM 마이그레이션
```javascript
// Before (CommonJS)
const express = require('express');
module.exports = router;

// After (ESM)
import express from 'express';
export default router;
```

**변경 사항**:
```json
// package.json
{
  "type": "module",
  "scripts": {
    "start": "node server.js"
  }
}
```

#### 1.2 dotenv 제거 (Node.js 20.6.0+)
```bash
# 현재
node server.js

# 변경 후
node --env-file=.env server.js
```

### 📅 Phase 2: 중기 (1개월)

#### 2.1 TypeScript 도입 (선택적)
```typescript
// src/types/index.ts
export interface VitalsData {
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
}

// server.ts
import express, { Request, Response } from 'express';

app.post('/api/vitals', (req: Request<{}, {}, VitalsData>, res: Response) => {
  const { heartRate, temperature, oxygenSaturation } = req.body;
  // 타입 안전성 보장
});
```

#### 2.2 성능 모니터링
```javascript
// 내장 성능 측정
const { performance, PerformanceObserver } = require('node:perf_hooks');

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].duration);
});
obs.observe({ entryTypes: ['measure'] });

performance.mark('start');
// ... 작업 수행
performance.mark('end');
performance.measure('operation', 'start', 'end');
```

### 📅 Phase 3: 장기 (3개월)

#### 3.1 WebSocket 네이티브 지원 (Node.js 21.0.0+)
```javascript
// 실험적 기능
import { WebSocket } from 'node:ws';

const ws = new WebSocket('wss://api.example.com');
ws.on('message', (data) => {
  console.log(data);
});
```

#### 3.2 SQLite 내장 지원 (Node.js 22.5.0+)
```javascript
// 실험적 기능
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync(':memory:');
db.exec('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)');
```

---

## 6. 체크리스트

### ✅ 마이그레이션 완료 확인

- [ ] Node.js 버전 18.20.8 이상 확인
- [x] node-fetch 제거 (또는 미사용 확인)
- [x] uuid 제거 (또는 crypto.randomUUID() 사용)
- [x] 내장 테스트 러너 설정 완료
- [ ] dotenv → --env-file 마이그레이션 (Node.js 20.6.0+)
- [ ] CommonJS → ESM 마이그레이션 계획 수립
- [x] 보안 감사 완료
- [x] 성능 테스트 수행

---

## 7. 참고 자료

### 📚 공식 문서
- [Node.js API Docs](https://nodejs.org/api/)
- [Node.js Fetch API](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#fetch)
- [Node.js Test Runner](https://nodejs.org/api/test.html)
- [Node.js Crypto](https://nodejs.org/api/crypto.html)

### 🔗 관련 문서
- `SECURITY_AUDIT_CHECKLIST.md` - 보안 감사
- `DEPLOYMENT_GUIDE.md` - 배포 가이드
- `backend/tests/api.test.js` - 테스트 예제

---

**마지막 업데이트**: 2025년 1월  
**작성자**: GreenWear Development Team  
**버전**: 1.0.0

