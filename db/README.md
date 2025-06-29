# GreenWear DB

## 소개
센서 데이터, 사용자, 알림 등 주요 정보를 저장하는 MongoDB 기반 데이터베이스

## 스키마 예시 (schema.js)
```js
const mongoose = require('mongoose');

const HealthSchema = new mongoose.Schema({
  userId: String,
  heartRate: Number,
  bloodPressure: Number,
  status: String, // normal/warning/emergency
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Health', HealthSchema);
```

## 초기화 스크립트 예시 (init_db.sh)
```sh
#!/bin/bash
mongo < schema.js
``` 