# GreenWear Backend

## 소개
실시간 센서 데이터 수집, 건강 상태 분석, 알림 API를 제공하는 Node.js(Express) 기반 백엔드

## 주요 폴더
- src/controllers: API 로직
- src/routes: 라우터
- src/models: DB 모델
- src/services: 비즈니스 로직

## 실행 방법
```bash
npm install
npm run dev
```

## 예시 코드 (src/routes/health.js)
```js
const express = require('express');
const router = express.Router();

// POST /api/health - 센서 데이터 수신
router.post('/', (req, res) => {
  // 데이터 저장 및 상태 분석 로직
  res.json({ status: 'ok' });
});

module.exports = router;
``` 