// 헬스 체크 라우터 (CommonJS)
const express = require('express');
const router  = express.Router();
const db      = require('./database');
const { performanceMonitor } = require('./monitoring');

router.get('/', async (req, res) => {
  const dbStatus = await db.testConnection();
  const health   = performanceMonitor.getHealthStatus();
  res.json({
    status: 'OK',
    message: 'GreenWear API is running!',
    timestamp: new Date().toISOString(),
    database: dbStatus.success ? { status: '✅ 연결됨', timestamp: dbStatus.timestamp } : { status: '❌ 연결 실패', error: dbStatus.error },
    health: {
      status: health.status,
      issues: health.issues,
      uptime: `${Math.floor(health.metrics.uptime / 1000)}초`,
      memory: {
        used:  `${Math.round(health.metrics.memoryUsage.heapUsed  / 1024 / 1024)}MB`,
        total: `${Math.round(health.metrics.memoryUsage.heapTotal / 1024 / 1024)}MB`,
      },
      requests:        health.metrics.requestCount,
      errorRate:       `${health.metrics.errorRate.toFixed(1)}%`,
      avgResponseTime: `${health.metrics.averageResponseTime}ms`,
    },
  });
});

module.exports = router;
