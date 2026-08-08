// GreenWear 메인 서버 (Node.js + Express + MariaDB)
const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const helmet   = require('helmet');
const rateLimit = require('express-rate-limit');
const crypto   = require('crypto');
const bcrypt   = require('bcrypt');

const db                  = require('./api/database');
const { logger, monitoringMiddleware, startSystemMonitoring } = require('./api/monitoring');
const { analyzeHealth }   = require('./api/ai-analysis');
const vitalsRouter        = require('./api/vitals');
const vitalsStreamRouter  = require('./api/vitals-stream');
const productsRouter      = require('./api/products');
const healthRouter        = require('./api/health');
const monitoringRouter    = require('./api/monitoring-endpoint');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── 세션 (토큰 → userId, 서버 메모리) ────────────────────────────────────────
const sessions = new Map();

const createSession = (user) => {
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, { userId: user.id, issuedAt: Date.now() });
  // 24시간 후 자동 만료
  setTimeout(() => sessions.delete(token), 24 * 60 * 60 * 1000);
  return token;
};

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token  = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ success: false, message: '인증이 필요합니다.' });
  }
  const { userId } = sessions.get(token);
  const result = await db.getUserById(userId);
  if (!result.success || !result.data) {
    sessions.delete(token);
    return res.status(401).json({ success: false, message: '유효하지 않은 세션입니다.' });
  }
  req.user  = result.data;
  req.token = token;
  next();
};

// ── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',').map(s => s.trim()).filter(Boolean);

// 개발 환경 기본 허용
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:5173', 'http://localhost:5174', 'http://localhost:5000');
}

app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) return cb(null, true);
    logger.warn('CORS 차단', { origin });
    cb(new Error('CORS 차단'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-API-Key'],
}));

// ── Rate Limit ────────────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 200,
  standardHeaders: true, legacyHeaders: false,
  handler: (req, res) => res.status(429).json({ success: false, message: '잠시 후 다시 시도해주세요.' }),
});

const iotLimiter = rateLimit({
  windowMs: 60 * 1000, max: 120,
  keyGenerator: (req) => req.body?.deviceId || req.ip,
  standardHeaders: true, legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 20,
  standardHeaders: true, legacyHeaders: false,
  handler: (req, res) => res.status(429).json({ success: false, message: '너무 많은 로그인 시도입니다. 15분 후 다시 시도하세요.' }),
});

// ── 미들웨어 ──────────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(monitoringMiddleware);
app.use('/api/', apiLimiter);

// 정적 파일 (빌드된 Vue 프론트엔드)
app.use(express.static(path.join(__dirname, 'dist')));

// ── 라우터 연결 ───────────────────────────────────────────────────────────────
app.use('/api/health',       healthRouter);
app.use('/api/monitoring',   monitoringRouter);
app.use('/api/vitals',       vitalsRouter);
app.use('/api/vitals-stream',vitalsStreamRouter);
app.use('/api/products',     productsRouter);

// ── 인증 API ─────────────────────────────────────────────────────────────────
app.post('/api/auth/register', authLimiter, async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: 'name, email, password는 필수입니다.' });
  if (password.length < 6)
    return res.status(400).json({ success: false, message: '비밀번호는 6자 이상이어야 합니다.' });

  const exists = await db.getUserByEmail(email);
  if (exists.success && exists.data)
    return res.status(409).json({ success: false, message: '이미 사용 중인 이메일입니다.' });

  const passwordHash = await bcrypt.hash(password, 12);
  const result = await db.createUser({ name, email, passwordHash });
  if (!result.success)
    return res.status(500).json({ success: false, message: '회원가입 중 오류가 발생했습니다.' });

  const token = createSession(result.data);
  logger.info('새 사용자 가입', { email });
  res.status(201).json({
    success: true,
    data: { token, user: { id: result.data.id, name: result.data.name, email: result.data.email } },
  });
});

// login (기존 /api/auth/login + 프론트 호환 /api/auth/signin 둘 다 지원)
const loginHandler = async (req, res) => {
  const { email, username, password } = req.body;
  const loginEmail = email || username;
  if (!loginEmail || !password)
    return res.status(400).json({ success: false, message: 'email/username, password는 필수입니다.' });

  const result = await db.getUserByEmail(loginEmail);
  if (!result.success || !result.data)
    return res.status(401).json({ success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' });

  const ok = await bcrypt.compare(password, result.data.password_hash);
  if (!ok)
    return res.status(401).json({ success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' });

  const token = createSession(result.data);
  logger.info('로그인 성공', { email: loginEmail });
  res.json({
    success: true,
    data: { token, user: { id: result.data.id, name: result.data.name, email: result.data.email } },
  });
};
app.post('/api/auth/login',  authLimiter, loginHandler);
app.post('/api/auth/signin', authLimiter, loginHandler); // 프론트 호환

app.get('/api/auth/me',      authMiddleware, (req, res) => {
  res.json({ success: true, data: { id: req.user.id, name: req.user.name, email: req.user.email } });
});
app.get('/api/auth/profile', authMiddleware, (req, res) => {
  res.json({ success: true, data: req.user });
});

app.post('/api/auth/logout', authMiddleware, (req, res) => {
  sessions.delete(req.token);
  res.json({ success: true, message: '로그아웃 완료' });
});

// ── IoT 웨어러블 API ──────────────────────────────────────────────────────────
app.post('/api/wearable/data', iotLimiter, async (req, res) => {
  const {
    deviceId, deviceName, firmwareVersion, heartRate, temperature,
    oxygenSaturation, stepCount, batteryLevel, signalStrength, wifiConnected,
    acceleration, location, healthMetrics, status, timestamp,
  } = req.body;

  if (!deviceId || !heartRate || !temperature)
    return res.status(400).json({ success: false, message: 'deviceId, heartRate, temperature는 필수입니다.' });

  let alertLevel = 'normal';
  if (heartRate < 50 || heartRate > 120 || temperature < 35.5 || temperature > 38.0) alertLevel = 'critical';
  else if (heartRate < 60 || heartRate > 100 || temperature < 36.0 || temperature > 37.5) alertLevel = 'warning';

  const payload = {
    deviceId, deviceName: deviceName || 'Unknown Device',
    firmwareVersion: firmwareVersion || '1.0.0',
    heartRate: parseInt(heartRate), temperature: parseFloat(temperature),
    oxygenSaturation: parseInt(oxygenSaturation) || 98,
    stepCount: parseInt(stepCount) || 0, batteryLevel: parseInt(batteryLevel) || 100,
    signalStrength: parseInt(signalStrength) || -50, wifiConnected: Boolean(wifiConnected),
    acceleration: acceleration || { x: 0, y: 0, z: 9.8 },
    location: location || { latitude: 0, longitude: 0, altitude: 0 },
    healthMetrics: healthMetrics || { stressLevel: 50, activityLevel: 50, sleepQuality: 80 },
    status: alertLevel, timestamp: timestamp || Date.now(),
  };

  const result = await db.saveWearableData(payload);
  logger.info('IoT 데이터 수신', { deviceId, heartRate, temperature, status: alertLevel });

  res.json({ success: true, message: '저장 완료', data: { id: result.data?.id, deviceId, status: alertLevel } });
});

// /api/wearable (GET) → 프론트 호환
app.get('/api/wearable', async (req, res) => {
  const { deviceId, limit = 50 } = req.query;
  const result = await db.getWearableData(deviceId, parseInt(limit));
  res.json({ success: result.success, data: result.data || [] });
});

app.get('/api/wearable/realtime', async (req, res) => {
  const { deviceId, limit = 50 } = req.query;
  const result = await db.getWearableData(deviceId, parseInt(limit));
  res.json(result.success ? result.data : []);
});

app.get('/api/wearable/devices', async (req, res) => {
  const result = await db.getDeviceStats();
  res.json({ success: result.success, data: result.data || [], total: result.data?.length || 0 });
});

app.get('/api/wearable/devices/:deviceId/stats', async (req, res) => {
  const result = await db.getWearableData(req.params.deviceId, 10);
  if (!result.success || !result.data.length)
    return res.status(404).json({ success: false, message: '디바이스를 찾을 수 없습니다.' });
  const d = result.data;
  res.json({ success: true, data: { deviceId: req.params.deviceId, recentData: d,
    healthTrends: { heartRateTrend: d.map(r=>r.heart_rate), temperatureTrend: d.map(r=>r.temperature), stepTrend: d.map(r=>r.step_count) }
  }});
});

app.get('/api/wearable/alerts', async (req, res) => {
  const result = await db.getAlerts(20);
  res.json({ success: result.success, data: result.data || [], total: result.data?.length || 0 });
});

// PUT 상태 업데이트 (프론트 호환)
app.put('/api/wearable/status', authMiddleware, (req, res) => {
  res.json({ success: true, message: '상태 업데이트 완료', data: req.body });
});

// ── AI 분석 API ───────────────────────────────────────────────────────────────
app.post('/api/ai-analysis', async (req, res) => {
  try {
    if (!req.body.heartRate || !req.body.temperature)
      return res.status(400).json({ success: false, message: 'heartRate, temperature는 필수입니다.' });
    const analysis = await analyzeHealth(req.body);
    res.json({ success: true, data: analysis, message: 'AI analysis completed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── 모바일 디바이스 연동 ──────────────────────────────────────────────────────
app.post('/api/mobile/device/link', authMiddleware, async (req, res) => {
  const { deviceId, deviceName, platform } = req.body;
  if (!deviceId || !deviceName)
    return res.status(400).json({ success: false, message: 'deviceId, deviceName은 필수입니다.' });
  const result = await db.linkMobileDevice(req.user.id, deviceId, deviceName, platform || 'android');
  res.json({ success: result.success, message: '디바이스 연동 완료', data: result.data });
});

// ── 푸시 토큰 ─────────────────────────────────────────────────────────────────
app.post('/api/push/register', authMiddleware, async (req, res) => {
  const { token, platform, deviceId } = req.body;
  if (!token) return res.status(400).json({ success: false, message: '푸시 토큰이 필요합니다.' });
  const result = await db.registerPushToken(req.user.id, token, platform || 'android', deviceId || 'unknown');
  res.json({ success: result.success, message: '푸시 토큰 등록 완료', totalRegistrations: result.totalRegistrations });
});

// ── 알림 API ─────────────────────────────────────────────────────────────────
app.get('/api/notifications', authMiddleware, async (req, res) => {
  const { limit = 20 } = req.query;
  const result = await db.getUserNotifications(req.user.id, parseInt(limit));
  res.json({ success: result.success, data: result.data || [] });
});

app.patch('/api/notifications/:id/read', authMiddleware, async (req, res) => {
  const result = await db.markNotificationRead(parseInt(req.params.id), req.user.id);
  res.json({ success: result.success });
});

// ── SPA fallback ─────────────────────────────────────────────────────────────
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) res.status(200).json({ message: 'GreenWear API Server', docs: '/api/health' });
  });
});

// ── 전역 오류 처리 ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { message: err.message, url: req.url });
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// ── 서버 시작 ────────────────────────────────────────────────────────────────
async function startServer() {
  logger.info('🔌 MariaDB 연결 중...');
  const conn = await db.testConnection();
  if (conn.success) {
    logger.info('✅ MariaDB 연결 성공');
    await db.createTables();
    startSystemMonitoring();
  } else {
    logger.error('❌ MariaDB 연결 실패', { error: conn.error });
    logger.warn('⚠️  DB 없이 서버를 시작합니다. DB 기능은 동작하지 않습니다.');
  }

  if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
      logger.info(`🌐 GreenWear 서버 시작 (포트 ${PORT})`);
      logger.info(`📡 API: http://localhost:${PORT}/api/health`);
    });
  }
}

startServer();
module.exports = app;

process.on('SIGTERM', () => { logger.info('서버 종료'); process.exit(0); });
process.on('SIGINT',  () => { logger.info('서버 종료'); process.exit(0); });
process.on('uncaughtException', (err) => logger.error('처리되지 않은 오류', { message: err.message }));
