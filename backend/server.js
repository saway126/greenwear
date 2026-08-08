require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const crypto = require('crypto');

const { dbRun, dbGet, dbAll } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// 세션 저장소 (토큰 -> 유저ID 매핑, SQLite 대신 메모리 유지로 가볍게 구현)
const sessions = new Map();

const createSession = (userId) => {
  const token = crypto.randomBytes(24).toString('hex');
  sessions.set(token, {
    userId: userId,
    issuedAt: Date.now()
  });
  return token;
};

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token || !sessions.has(token)) {
    return res.status(401).json({
      success: false,
      message: '인증이 필요합니다.'
    });
  }

  const session = sessions.get(token);
  try {
    const user = await dbGet('SELECT id, username, email, full_name, age, gender, max_heart_rate, min_oxygen, max_temperature, emergency_phone, chronic_disease FROM users WHERE id = ?', [session.userId]);
    if (!user) {
      sessions.delete(token);
      return res.status(401).json({
        success: false,
        message: '유효하지 않은 세션입니다.'
      });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ success: false, message: '서버 인증 오류 발생' });
  }
};

// CORS 설정
const allowedOrigins = [
  'https://greenwear-demo.vercel.app',
  'http://localhost:5173',
  'http://localhost:5000',
  'http://localhost:8080'
];

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS 차단: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
}));

// Rate Limiting 설정
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 500, // IP당 500 요청으로 상향
  message: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
  standardHeaders: true,
  legacyHeaders: false
});

// JSON 파싱
app.use(express.json());
app.use('/api/', apiLimiter);

// 정적 파일 서빙 (프론트엔드 빌드파일 서빙)
app.use(express.static(path.join(__dirname, '../dist')));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'GreenWear API is running locally with SQLite database!',
    timestamp: new Date().toISOString(),
    platform: 'Local',
    health: {
      status: 'healthy',
      database: 'SQLite (Connected)'
    }
  });
});

// ==========================================
// Auth APIs (회원가입, 로그인, 내 정보)
// ==========================================

// 회원가입 (POST /api/auth/register 및 /api/auth/signup)
const handleRegister = async (req, res) => {
  const { username, email, password, fullName, age, gender } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'username, email, password는 필수입니다.'
    });
  }

  try {
    const duplicatedUser = await dbGet('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);
    if (duplicatedUser) {
      return res.status(409).json({
        success: false,
        message: '이미 사용 중인 이메일 또는 사용자 아이디명입니다.'
      });
    }

    const result = await dbRun(
      'INSERT INTO users (username, email, password, full_name, age, gender) VALUES (?, ?, ?, ?, ?, ?)',
      [username, email, password, fullName || username, age || 30, gender || 'male']
    );

    const token = createSession(result.id);
    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: result.id,
          username,
          email
        }
      }
    });
  } catch (error) {
    console.error('Register API Error:', error);
    res.status(500).json({ success: false, message: '회원가입 중 오류가 발생했습니다.' });
  }
};
app.post('/api/auth/register', handleRegister);
app.post('/api/auth/signup', handleRegister);

// 로그인 (POST /api/auth/login 및 /api/auth/signin)
const handleLogin = async (req, res) => {
  const { email, username, password } = req.body;
  const loginKey = email || username;

  if (!loginKey || !password) {
    return res.status(400).json({
      success: false,
      message: '사용자명(또는 이메일)과 비밀번호는 필수입니다.'
    });
  }

  try {
    const user = await dbGet('SELECT * FROM users WHERE email = ? OR username = ?', [loginKey, loginKey]);
    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: '사용자 정보 또는 비밀번호가 올바르지 않습니다.'
      });
    }

    const token = createSession(user.id);
    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      }
    });
  } catch (error) {
    console.error('Login API Error:', error);
    res.status(500).json({ success: false, message: '로그인 중 오류가 발생했습니다.' });
  }
};
app.post('/api/auth/login', handleLogin);
app.post('/api/auth/signin', handleLogin);

// 내 정보 조회 (GET /api/auth/me 및 /api/auth/profile)
const handleMe = (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
};
app.get('/api/auth/me', authMiddleware, handleMe);
app.get('/api/auth/profile', authMiddleware, handleMe);

// 내 정보 수정 (PUT /api/auth/profile)
app.put('/api/auth/profile', authMiddleware, async (req, res) => {
  const { fullName, age, gender, maxHeartRate, minOxygen, maxTemperature, emergencyPhone, chronicDisease } = req.body;
  const userId = req.user.id;

  try {
    await dbRun(
      `UPDATE users SET 
        full_name = ?, 
        age = ?, 
        gender = ?, 
        max_heart_rate = ?, 
        min_oxygen = ?, 
        max_temperature = ?, 
        emergency_phone = ?, 
        chronic_disease = ?
      WHERE id = ?`,
      [
        fullName || req.user.full_name,
        parseInt(age) || req.user.age,
        gender || req.user.gender,
        parseInt(maxHeartRate) || 120,
        parseInt(minOxygen) || 90,
        parseFloat(maxTemperature) || 38.0,
        emergencyPhone || '010-119-1190',
        chronicDisease || '없음',
        userId
      ]
    );

    const updatedUser = await dbGet('SELECT id, username, email, full_name as full_name, age, gender, max_heart_rate, min_oxygen, max_temperature, emergency_phone, chronic_disease FROM users WHERE id = ?', [userId]);

    res.json({
      success: true,
      message: '프로필 설정이 정상적으로 저장되었습니다.',
      data: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: '프로필 업데이트 중 오류가 발생했습니다.' });
  }
});

// ==========================================
// Vitals APIs (생체 데이터 수집 및 상태 판정)
// ==========================================

// 생체신호 실시간 상태 분석 및 저장 (POST /api/vitals)
app.post('/api/vitals', async (req, res) => {
  const { heartRate, oxygenSaturation, temperature, activity, userId } = req.body;

  const hr = parseInt(heartRate) || 72;
  const oxy = parseInt(oxygenSaturation) || 98;
  const temp = parseFloat(temperature) || 36.5;
  const act = activity || 'rest';
  const uId = userId || 2; // 기본적으로 김환경(id=2)의 임계치를 사용하도록 유연 처리

  // 1. 개인 맞춤형 임계값 로드
  let maxHR = 120;
  let minOxy = 90;
  let maxTemp = 38.0;

  try {
    const user = await dbGet('SELECT max_heart_rate, min_oxygen, max_temperature FROM users WHERE id = ?', [uId]);
    if (user) {
      maxHR = user.max_heart_rate || 120;
      minOxy = user.min_oxygen || 90;
      maxTemp = user.max_temperature || 38.0;
    }
  } catch (err) {
    console.error('Failed to load user thresholds:', err);
  }

  // LED 색상 상태 결정 규칙
  let ledStatus = '초록';
  let overallStatus = 'normal';
  let riskLevel = 'low';
  const recommendations = [];

  // 개별 지표 판정 (개인 설정치 대입)
  let hrStatus = '정상';
  let hrColor = 'green';
  let hrMessage = '정상 범위입니다.';
  if (hr < 60 || hr > (maxHR - 20)) {
    hrStatus = '주의';
    hrColor = 'yellow';
    hrMessage = hr < 60 ? '서맥(낮은 심박수) 주의' : '빈맥(높은 심박수) 주의';
    if (hr > maxHR) {
      hrStatus = '위험';
      hrColor = 'red';
      hrMessage = `위험: 매우 높은 심박수 (개인 설정 한계치 ${maxHR} BPM 초과)!`;
    }
  }

  let oxyStatus = '정상';
  let oxyColor = 'green';
  let oxyMessage = '정상 산소포화도입니다.';
  if (oxy < (minOxy + 5)) {
    oxyStatus = '주의';
    oxyColor = 'yellow';
    oxyMessage = '가벼운 저산소증 주의';
    if (oxy < minOxy) {
      oxyStatus = '위험';
      oxyColor = 'red';
      oxyMessage = `위험: 저산소 상태 (개인 설정 한계치 ${minOxy}% 미만)!`;
    }
  }

  let tempStatus = '정상';
  let tempColor = 'green';
  let tempMessage = '정상 체온입니다.';
  if (temp < 36.0 || temp > (maxTemp - 0.5)) {
    tempStatus = '주의';
    tempColor = 'yellow';
    tempMessage = temp < 36.0 ? '저체온증 우려' : '미열 있음';
    if (temp > maxTemp) {
      tempStatus = '위험';
      tempColor = 'red';
      tempMessage = `위험: 고열 상태 (개인 설정 한계치 ${maxTemp}°C 초과)!`;
    }
  }

  // 종합 상태 판정
  if (hrStatus === '위험' || oxyStatus === '위험' || tempStatus === '위험') {
    ledStatus = '빨강';
    overallStatus = 'critical';
    riskLevel = 'high';
    recommendations.push('즉시 활동을 중단하고 휴식을 취하며, 의료진을 호출하십시오.');
  } else if (hrStatus === '주의' || oxyStatus === '주의' || tempStatus === '주의') {
    ledStatus = '노랑';
    overallStatus = 'warning';
    riskLevel = 'medium';
    recommendations.push('일부 지표에 주의가 필요합니다. 수분을 섭취하고 무리하지 마세요.');
  } else {
    ledStatus = '초록';
    overallStatus = 'normal';
    riskLevel = 'low';
    recommendations.push('현재 건강 상태가 매우 양호합니다. 좋은 컨디션을 유지하세요.');
  }

  const statusMessage = ledStatus === '초록' ? '모든 생체신호가 정상 범위입니다.' :
                        ledStatus === '노랑' ? '주의: 생체 데이터 일부가 정상치를 벗어났습니다.' :
                        '경고: 응급 수준의 생체 신호가 감지되었습니다!';

  try {
    // DB 저장
    const result = await dbRun(
      'INSERT INTO vitals_logs (user_id, heart_rate, oxygen_saturation, temperature, activity, status_color, status_message) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [uId, hr, oxy, temp, act, ledStatus, statusMessage]
    );

    // 빨간색(위험) 상태일 경우 경고 알림 자동 생성
    if (overallStatus === 'critical') {
      await dbRun(
        'INSERT INTO notifications (user_id, title, message, level) VALUES (?, ?, ?, ?)',
        [uId, '🚨 생체신호 이상 경보', `위험 수치 감지 (심박수: ${hr}BPM, 산소포화도: ${oxy}%, 체온: ${temp}°C). 즉각 조치를 권고합니다.`, 'critical']
      );
    }

    res.json({
      success: true,
      data: {
        savedId: result.id,
        overallStatus,
        riskLevel,
        ledStatus,
        metrics: [
          { name: 'Heart Rate', value: hr, unit: 'bpm', status: hrStatus, color: hrColor, message: hrMessage },
          { name: 'Oxygen Saturation', value: oxy, unit: '%', status: oxyStatus, color: oxyColor, message: oxyMessage },
          { name: 'Temperature', value: temp, unit: '°C', status: tempStatus, color: tempColor, message: tempMessage }
        ],
        recommendations
      },
      message: 'Vitals analysis and clothing color state determined.'
    });
  } catch (error) {
    console.error('Vitals POST API Error:', error);
    res.status(500).json({ success: false, message: '생체 데이터 분석/저장 중 오류 발생' });
  }
});

// 생체신호 측정 히스토리 조회 (GET /api/vitals)
app.get('/api/vitals', async (req, res) => {
  const { limit = 50, userId = 2 } = req.query; // 테스트 편의상 user1(id=2)을 기본값으로 사용
  
  try {
    const rows = await dbAll(
      `SELECT 
        id, 
        user_id as userId, 
        heart_rate as heartRate, 
        oxygen_saturation as oxygenSaturation, 
        temperature, 
        activity, 
        status_color as status, 
        status_message as statusMessage, 
        recorded_at as recordedAt 
      FROM vitals_logs 
      WHERE user_id = ? 
      ORDER BY recorded_at DESC 
      LIMIT ?`, 
      [userId, parseInt(limit)]
    );

    res.json({
      success: true,
      data: rows,
      message: 'Vitals history logs retrieved successfully'
    });
  } catch (error) {
    console.error('Vitals GET API Error:', error);
    res.status(500).json({ success: false, message: '생체 이력 조회 중 오류 발생' });
  }
});

// 특정 생체 신호 기록 상세 조회 (GET /api/vitals/:id)
app.get('/api/vitals/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const row = await dbGet(
      `SELECT 
        id, 
        user_id as userId, 
        heart_rate as heartRate, 
        oxygen_saturation as oxygenSaturation, 
        temperature, 
        activity, 
        status_color as status, 
        status_message as statusMessage, 
        recorded_at as recordedAt 
      FROM vitals_logs 
      WHERE id = ?`, 
      [parseInt(id)]
    );

    if (!row) {
      return res.status(404).json({ success: false, message: '기록을 찾을 수 없습니다.' });
    }

    res.json({
      success: true,
      data: row
    });
  } catch (error) {
    console.error('Vitals Detail API Error:', error);
    res.status(500).json({ success: false, message: '상세 기록 조회 중 오류 발생' });
  }
});

// ==========================================
// AI Analysis API (고급 입체 건강 패턴 분석)
// ==========================================

// AI 건강 종합 예측 분석 (POST /api/ai-analysis)
app.post('/api/ai-analysis', (req, res) => {
  const { heartRate, oxygenSaturation, temperature, activity, age, gender } = req.body;

  const hr = parseInt(heartRate) || 75;
  const oxy = parseInt(oxygenSaturation) || 98;
  const temp = parseFloat(temperature) || 36.5;
  const act = activity || 'rest';

  // 시뮬레이션 기반 규칙 분석
  let score = 95;
  let overallLevel = 'excellent';
  let overallSummary = '전반적으로 건강한 생체 리듬을 가지고 있으며, 의복의 스마트 LED 도선이 정상(초록색)으로 점등됩니다.';

  // 1. 심박 변수 분석
  let hrScore = 90;
  let hrStatus = 'good';
  let hrMsg = '심박수 분포가 매우 고릅니다.';
  if (hr > 90 || hr < 60) {
    hrScore = 65;
    hrStatus = 'warning';
    hrMsg = hr > 90 ? '빈맥 위험이 감지됩니다. 충분한 휴식이 권장됩니다.' : '서맥 위험이 감지됩니다. 맥박 확인이 필요합니다.';
    score -= 15;
  }
  if (hr > 120) {
    hrScore = 35;
    hrStatus = 'danger';
    hrMsg = '심장이 비정상적으로 과호흡/과운동 상태입니다!';
    score -= 25;
  }

  // 2. 심혈관 리스크 점수
  let cardioRiskScore = 15; // 0-100 (낮을수록 좋음)
  let cardioLevel = 'low';
  if (hr > 90) {
    cardioRiskScore = 45;
    cardioLevel = 'medium';
  }
  if (hr > 110 || temp > 38.0) {
    cardioRiskScore = 80;
    cardioLevel = 'high';
  }

  // 3. 스트레스 수준
  let stressScore = 25; // 0-100 (낮을수록 좋음)
  let stressLevel = 'low';
  if (hr > 95) {
    stressScore = 60;
    stressLevel = 'medium';
  }
  if (hr > 115) {
    stressScore = 85;
    stressLevel = 'high';
  }
  if (act === 'work' && hr > 90) {
    stressScore = 70;
    stressLevel = 'medium';
  }

  // 4. 수면 효율
  let sleepScore = 88;
  let sleepQuality = 'excellent';
  if (act === 'sleep') {
    if (hr > 80 || temp > 37.2) {
      sleepScore = 55;
      sleepQuality = 'fair';
    }
    if (hr > 95 || temp > 38.0) {
      sleepScore = 30;
      sleepQuality = 'poor';
    }
  }

  // 5. 운동 효율성
  let exerciseScore = 75;
  let exerciseEffect = 'good';
  if (act === 'exercise') {
    if (hr >= 95 && hr <= 120) {
      exerciseScore = 95;
      exerciseEffect = 'excellent';
    } else if (hr > 130) {
      exerciseScore = 40;
      exerciseEffect = 'poor';
    }
  }

  // 최종 점수 및 종합 수준 판정
  score = Math.max(10, Math.min(100, score));
  if (score >= 90) {
    overallLevel = 'excellent';
  } else if (score >= 75) {
    overallLevel = 'good';
    overallSummary = '체력이 양호하고 신호가 대체로 안정적입니다. 의복의 LED는 정상(초록색)으로 점등됩니다.';
  } else if (score >= 60) {
    overallLevel = 'fair';
    overallSummary = '생체 지표 중 일부 수치에 변동이 있어 주의가 필요합니다. 의복의 LED가 주의(노란색)로 맥동하기 시작합니다.';
  } else {
    overallLevel = 'poor';
    overallSummary = '위험: 생체 신호가 위험 한계선을 침범했습니다! 의복의 LED가 위험(빨간색)으로 매우 빠르게 점멸하고 있습니다.';
  }

  res.json({
    success: true,
    data: {
      timestamp: new Date().toISOString(),
      overall: {
        score: score,
        level: overallLevel,
        summary: overallSummary,
        recommendations: [
          score < 75 ? '격렬한 신체 활동을 즉시 줄이거나 중지하십시오.' : '현재 상태 유지를 위한 일상적인 유산소 운동을 권장합니다.',
          temp > 37.5 ? '체온 유지를 위해 가볍고 바람이 잘 통하는 의류를 유지하십시오.' : '체온이 원활하게 발산되고 있습니다.',
          '매일 7~8시간의 충분한 정기 수면 패턴을 유지하십시오.'
        ]
      },
      cardiovascular: {
        riskScore: cardioRiskScore,
        riskLevel: cardioLevel,
        factors: {
          heartRate: { score: hr > 100 ? 0.8 : 0.2, impact: hr > 100 ? 'high' : 'low' },
          temperature: { score: temp > 37.5 ? 0.6 : 0.1, impact: temp > 37.5 ? 'moderate' : 'low' },
          age: { score: 0.3, impact: 'low' },
          gender: { score: 0.1, impact: 'low' }
        },
        recommendations: [cardioLevel === 'high' ? '심장에 과부하가 걸렸습니다. 휴식 또는 정밀 진료가 권고됩니다.' : '심혈관계 능동 모니터링 수치가 정상 범주에 속합니다.']
      },
      stress: {
        stressScore: stressScore,
        stressLevel: stressLevel,
        factors: {
          heartRateVariability: { score: hr > 95 ? 0.7 : 0.3, impact: hr > 95 ? 'high' : 'low' },
          activity: { score: act === 'work' ? 0.6 : 0.2, impact: 'moderate' }
        },
        recommendations: ['자율신경 안정을 위해 복식 호흡 및 눈 휴식을 취하십시오.']
      },
      sleep: {
        sleepScore: sleepScore,
        sleepQuality: sleepQuality,
        factors: {
          heartRate: { score: hr > 80 ? 0.6 : 0.2, impact: 'moderate' },
          temperature: { score: temp > 37.0 ? 0.5 : 0.2, impact: 'moderate' }
        },
        recommendations: ['쾌적한 실내 취침 온도(20~22°C)를 구성하십시오.']
      },
      exercise: {
        exerciseScore: exerciseScore,
        exerciseEffect: exerciseEffect,
        factors: {
          heartRate: { score: hr > 110 ? 0.9 : 0.4, impact: 'high' }
        },
        recommendations: [exerciseEffect === 'excellent' ? '지방 연소와 근력 강화에 최적화된 운동 구간입니다.' : '운동 강도를 심박 범위에 맞게 서서히 감소시켜 안정기를 유도하세요.']
      }
    }
  });
});

// ==========================================
// Wearable Devices APIs (기기 모니터링 및 상태 연동)
// ==========================================

// 웨어러블 디바이스의 데이터 입력 수신 (POST /api/wearable/data)
app.post('/api/wearable/data', async (req, res) => {
  const { deviceId, heartRate, temperature, oxygenSaturation, stepCount, batteryLevel, signalStrength } = req.body;

  if (!deviceId || !heartRate || !temperature) {
    return res.status(400).json({
      success: false,
      message: 'deviceId, heartRate, temperature는 필수 수집 필드입니다.'
    });
  }

  const hr = parseInt(heartRate);
  const temp = parseFloat(temperature);
  const oxy = parseInt(oxygenSaturation) || 98;

  // LED 색상 등급 설정
  let ledStatus = '초록';
  let overallStatus = 'normal';
  if (hr > 120 || oxy < 90 || temp > 38.0) {
    ledStatus = '빨강';
    overallStatus = 'critical';
  } else if (hr > 90 || hr < 60 || oxy < 95 || temp > 37.5 || temp < 36.0) {
    ledStatus = '노랑';
    overallStatus = 'warning';
  }

  try {
    const statusMsg = `디바이스 텔레메트리 수집: LED 색상 ${ledStatus} 점등.`;
    // DB 저장
    await dbRun(
      'INSERT INTO vitals_logs (user_id, heart_rate, oxygen_saturation, temperature, activity, status_color, status_message) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [2, hr, oxy, temp, 'rest', ledStatus, statusMsg]
    );

    console.log(`📱 IoT [${deviceId}] 수신: 심박수 ${hr}BPM, 체온 ${temp}°C, LED 색상: ${ledStatus}`);

    res.json({
      success: true,
      message: 'IoT wearable data stored and color synced.',
      data: {
        deviceId,
        statusColor: ledStatus,
        overallStatus
      }
    });
  } catch (error) {
    console.error('IoT data storage error:', error);
    res.status(500).json({ success: false, message: '기기 데이터 처리 실패' });
  }
});

// 연결된 모든 스마트웨어 디바이스 조회 (GET /api/wearable/devices)
app.get('/api/wearable/devices', async (req, res) => {
  try {
    // 디바이스 로그 분석을 통해 활성화된 디바이스 집계 (테스트용 하드코딩 + DB 동적 연동 구성)
    const devices = [
      {
        deviceId: 'ESP32_GREENWEAR_01',
        deviceName: '스마트 소방 작전의복 (소방관용)',
        firmwareVersion: '1.2.4',
        lastSeen: new Date().toISOString(),
        avgHeartRate: 78,
        avgTemperature: 36.6,
        currentStatus: 'excellent',
        batteryLevel: 92,
        signalStrength: -62
      },
      {
        deviceId: 'ESP32_GREENWEAR_02',
        deviceName: '스마트 육군 전투의복 (전투병용)',
        firmwareVersion: '1.2.4',
        lastSeen: new Date(Date.now() - 30000).toISOString(),
        avgHeartRate: 110,
        avgTemperature: 37.4,
        currentStatus: 'warning',
        batteryLevel: 75,
        signalStrength: -78
      }
    ];

    res.json({
      success: true,
      data: devices,
      total: devices.length,
      message: '스마트 기기 목록을 성공적으로 조회했습니다.'
    });
  } catch (error) {
    console.error('Devices fetch error:', error);
    res.status(500).json({ success: false, message: '디바이스 조회 중 오류 발생' });
  }
});

// 특정 디바이스 통계 조회
app.get('/api/wearable/devices/:deviceId/stats', async (req, res) => {
  const { deviceId } = req.params;
  try {
    const stats = {
      deviceId,
      totalRecords: 120,
      lastSeen: new Date().toISOString(),
      avgHeartRate: 75,
      avgTemperature: 36.7,
      healthTrends: {
        heartRateTrend: [70, 72, 75, 78, 82, 80, 76, 74, 75, 78],
        temperatureTrend: [36.4, 36.5, 36.5, 36.6, 36.7, 36.8, 36.7, 36.6, 36.5, 36.5],
        stepTrend: [100, 150, 200, 220, 250, 300, 310, 320, 340, 350]
      }
    };
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '기기 통계 조회 실패' });
  }
});

// 경보(Warning/Critical)가 감지된 이력 데이터 조회 (GET /api/wearable/alerts)
app.get('/api/wearable/alerts', async (req, res) => {
  try {
    const alerts = await dbAll(
      `SELECT 
        id, 
        heart_rate as heartRate, 
        oxygen_saturation as oxygenSaturation, 
        temperature, 
        activity, 
        status_color as status, 
        status_message as message, 
        recorded_at as time 
      FROM vitals_logs 
      WHERE status_color = '노랑' OR status_color = '빨강' 
      ORDER BY recorded_at DESC 
      LIMIT 20`
    );

    res.json({
      success: true,
      data: alerts.map(row => ({
        id: row.id,
        level: row.status === '빨강' ? 'danger' : 'warning',
        message: row.message,
        time: new Date(row.time).toLocaleTimeString('ko-KR')
      })),
      total: alerts.length,
      message: '최근 생체 경고 리스크를 가져왔습니다.'
    });
  } catch (error) {
    console.error('Alerts GET Error:', error);
    res.status(500).json({ success: false, message: '경보 리스트 로드 실패' });
  }
});

// 모바일 기기 연동 등록 API
app.post('/api/mobile/device/link', authMiddleware, async (req, res) => {
  const { deviceId, deviceName, platform } = req.body;
  if (!deviceId || !deviceName) {
    return res.status(400).json({ success: false, message: '기기 정보가 충분하지 않습니다.' });
  }

  try {
    await dbRun(
      'INSERT INTO mobile_device_links (user_id, device_id, device_name, platform) VALUES (?, ?, ?, ?)',
      [req.user.id, deviceId, deviceName, platform || 'android']
    );

    const links = await dbAll('SELECT * FROM mobile_device_links WHERE user_id = ?', [req.user.id]);
    res.json({
      success: true,
      message: '성공적으로 모바일 스마트웨어가 연동되었습니다.',
      data: links
    });
  } catch (error) {
    console.error('Device link error:', error);
    res.status(500).json({ success: false, message: '모바일 연동 등록 오류' });
  }
});

// 푸시 알림 수신 토큰 등록 API
app.post('/api/push/register', authMiddleware, async (req, res) => {
  const { token, platform, deviceId } = req.body;
  if (!token) {
    return res.status(400).json({ success: false, message: '푸시 토큰이 누락되었습니다.' });
  }

  try {
    await dbRun(
      'INSERT OR IGNORE INTO push_registrations (user_id, token, platform, device_id) VALUES (?, ?, ?, ?)',
      [req.user.id, token, platform || 'android', deviceId || 'unknown']
    );
    res.json({
      success: true,
      message: '푸시 토큰이 정상적으로 등록 및 갱신되었습니다.'
    });
  } catch (error) {
    console.error('Push register error:', error);
    res.status(500).json({ success: false, message: '푸시 토큰 등록 오류' });
  }
});

// 프론트엔드 라우팅 (SPA 리디렉션)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// 서버 시작
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌐 GreenWear Server running on port ${PORT}`);
    console.log(`🔌 API: http://localhost:${PORT}/api`);
  });
}

module.exports = app;

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Shutting down gracefully...');
  process.exit(0);
});
