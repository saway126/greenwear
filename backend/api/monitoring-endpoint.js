// 모니터링 API 라우터 (CommonJS)
const express = require('express');
const router  = express.Router();
const { getLogs, getMetrics, getHealthCheck } = require('./monitoring');

router.get('/', (req, res) => {
  const { type } = req.query;
  if (type === 'logs')    return getLogs(req, res);
  if (type === 'metrics') return getMetrics(req, res);
  if (type === 'health')  return getHealthCheck(req, res);

  // type 없으면 메트릭 기본 반환
  getMetrics(req, res);
});

module.exports = router;
