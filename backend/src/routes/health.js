const express = require('express');
const router = express.Router();

// POST /api/health - 센서 데이터 수신
router.post('/', (req, res) => {
  // 실제로는 DB 저장/AI 분석 등 추가
  const { heart_rate, blood_pressure } = req.body;
  console.log('수신된 데이터:', { heart_rate, blood_pressure });
  res.json({ status: 'ok', received: { heart_rate, blood_pressure } });
});

module.exports = router; 