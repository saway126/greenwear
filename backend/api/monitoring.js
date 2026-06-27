// 성능 모니터링 모듈 (CommonJS)
const { createNotification } = require('./database');

// ── 로거 ──────────────────────────────────────────────────────────────────────
const LOG_LEVELS = { ERROR: 0, WARN: 1, INFO: 2, DEBUG: 3 };
const CURRENT_LEVEL = LOG_LEVELS[String(process.env.LOG_LEVEL || 'INFO').toUpperCase()] ?? 2;
const inMemoryLogs = [];

function log(level, message, meta = {}) {
  if (LOG_LEVELS[level] > CURRENT_LEVEL) return;
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    meta,
    service: 'greenwear-api',
  };
  inMemoryLogs.push(entry);
  if (inMemoryLogs.length > 500) inMemoryLogs.shift();
  console.log(`[${level}] ${message}`, Object.keys(meta).length ? meta : '');

  if (level === 'ERROR') {
    createNotification({
      userId: 1,
      type: 'system_error',
      title: '시스템 오류 발생',
      message,
      level: 'critical',
    }).catch(() => {});
  }
}

const logger = {
  error: (msg, meta) => log('ERROR', msg, meta),
  warn:  (msg, meta) => log('WARN',  msg, meta),
  info:  (msg, meta) => log('INFO',  msg, meta),
  debug: (msg, meta) => log('DEBUG', msg, meta),
};

// ── 성능 모니터 ───────────────────────────────────────────────────────────────
class PerformanceMonitor {
  constructor() {
    this.startTime    = Date.now();
    this.requestCount = 0;
    this.errorCount   = 0;
    this.responseTimes = [];
  }

  startRequest(req) {
    req._startTime = Date.now();
    this.requestCount++;
  }

  endRequest(req, res) {
    if (!req._startTime) return;
    const ms = Date.now() - req._startTime;
    this.responseTimes.push(ms);
    if (this.responseTimes.length > 200) this.responseTimes.shift();
    if (ms > 5000) logger.warn('느린 응답 감지', { url: req.url, ms });
  }

  incrementErrorCount() { this.errorCount++; }

  getMetrics() {
    const avg = this.responseTimes.length
      ? this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length
      : 0;
    return {
      uptime:              Date.now() - this.startTime,
      requestCount:        this.requestCount,
      errorCount:          this.errorCount,
      errorRate:           this.requestCount ? (this.errorCount / this.requestCount) * 100 : 0,
      averageResponseTime: Math.round(avg),
      memoryUsage:         process.memoryUsage(),
    };
  }

  getHealthStatus() {
    const m      = this.getMetrics();
    const memPct = m.memoryUsage.heapUsed / m.memoryUsage.heapTotal;
    let status   = 'healthy';
    const issues = [];

    if (m.errorRate > 10)          { status = 'unhealthy'; issues.push(`오류율 높음: ${m.errorRate.toFixed(1)}%`); }
    if (m.averageResponseTime > 3000) { status = 'degraded';  issues.push(`응답 느림: ${m.averageResponseTime}ms`); }
    if (memPct > 0.9)              { status = 'degraded';  issues.push(`메모리 부족: ${(memPct * 100).toFixed(0)}%`); }

    return { status, issues, metrics: m };
  }
}

const performanceMonitor = new PerformanceMonitor();

// Express 미들웨어
const monitoringMiddleware = (req, res, next) => {
  performanceMonitor.startRequest(req);
  res.on('finish', () => {
    performanceMonitor.endRequest(req, res);
    if (res.statusCode >= 400) performanceMonitor.incrementErrorCount();
  });
  next();
};

// 로그 조회
const getLogs = (req, res) => {
  const { level, limit = 100, offset = 0 } = req.query;
  let filtered = level ? inMemoryLogs.filter(l => l.level === level.toUpperCase()) : [...inMemoryLogs];
  const paged  = filtered.slice(Number(offset), Number(offset) + Number(limit)).reverse();
  res.json({
    success: true,
    data: { logs: paged, total: filtered.length },
  });
};

// 메트릭 조회
const getMetrics = (req, res) => {
  res.json({ success: true, data: performanceMonitor.getMetrics() });
};

// 헬스 체크
const getHealthCheck = (req, res) => {
  const h = performanceMonitor.getHealthStatus();
  res.json({ success: h.status !== 'unhealthy', status: h.status, issues: h.issues, timestamp: new Date().toISOString() });
};

// 시스템 모니터링 시작 (1분마다)
const startSystemMonitoring = () => {
  setInterval(async () => {
    const h = performanceMonitor.getHealthStatus();
    if (h.status === 'unhealthy') {
      await createNotification({ userId: 1, type: 'system_error', title: '시스템 비정상', message: h.issues.join(', '), level: 'critical' }).catch(() => {});
    }
  }, 60000);
  logger.info('시스템 모니터링 시작');
};

module.exports = {
  logger,
  performanceMonitor,
  monitoringMiddleware,
  getLogs,
  getMetrics,
  getHealthCheck,
  startSystemMonitoring,
};
