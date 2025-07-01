const express = require('express');
const router = express.Router();

// 샘플 건강 데이터
let healthData = [
  { id: 1, heart_rate: 72, blood_pressure: '120/80', status: '정상', timestamp: new Date() },
  { id: 2, heart_rate: 85, blood_pressure: '130/85', status: '경고', timestamp: new Date() },
];

// GET /api/health - 건강 데이터 조회
router.get('/', (req, res) => {
  res.json(healthData);
});

// POST /api/health - 센서 데이터 수신
router.post('/', (req, res) => {
  const { status, message, heart_rate, blood_pressure } = req.body;
  
  const newData = {
    id: healthData.length + 1,
    heart_rate: heart_rate || Math.floor(Math.random() * 40) + 60,
    blood_pressure: blood_pressure || '120/80',
    status: status || '정상',
    message: message || '',
    timestamp: new Date()
  };
  
  healthData.push(newData);
  console.log('새 데이터 추가:', newData);
  res.json({ status: 'ok', data: newData });
});

module.exports = router; 