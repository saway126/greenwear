const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS 설정
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
}));

// JSON 파싱
app.use(express.json());

// 정적 파일 서빙 (프론트엔드)
app.use(express.static(path.join(__dirname, 'dist')));

// 기본 라우트
app.get('/', (req, res) => {
  res.send('GreenWear 백엔드 서버 실행 중!');
});

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'GreenWear API is running on Railway!',
    timestamp: new Date().toISOString(),
    platform: 'Railway',
    health: {
      status: 'healthy',
      issues: [],
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage()
    }
  });
});

// Vitals API
app.post('/api/vitals', (req, res) => {
  const { heartRate, bloodPressure, temperature, oxygenSaturation, activity, age, gender } = req.body;
  
  // 간단한 분석 로직
  let overallStatus = 'normal';
  let riskLevel = 'low';
  const recommendations = [];
  
  if (heartRate < 60 || heartRate > 100) {
    overallStatus = 'warning';
    riskLevel = 'moderate';
    recommendations.push('심박수 모니터링 필요');
  }
  
  if (oxygenSaturation < 95) {
    overallStatus = 'critical';
    riskLevel = 'high';
    recommendations.push('산소포화도 주의');
  }
  
  if (temperature < 36.0 || temperature > 37.5) {
    overallStatus = 'warning';
    riskLevel = 'moderate';
    recommendations.push('체온 모니터링 필요');
  }
  
  res.json({
    success: true,
    data: {
      overallStatus,
      riskLevel,
      metrics: {
        heartRate: { value: heartRate, status: heartRate >= 60 && heartRate <= 100 ? 'normal' : 'warning' },
        oxygenSaturation: { value: oxygenSaturation, status: oxygenSaturation >= 95 ? 'normal' : 'warning' },
        temperature: { value: temperature, status: temperature >= 36.0 && temperature <= 37.5 ? 'normal' : 'warning' }
      },
      recommendations: recommendations.map(rec => ({
        name: rec,
        reason: '건강 상태 기반 추천',
        score: 0.8
      }))
    },
    message: 'Vitals analysis completed successfully'
  });
});

// Vitals History API
app.get('/api/vitals', (req, res) => {
  const { userId = 1, limit = 50, offset = 0 } = req.query;
  
  // 더미 히스토리 데이터
  const history = [];
  for (let i = 0; i < Math.min(limit, 10); i++) {
    history.push({
      id: i + 1,
      userId: parseInt(userId),
      heartRate: 70 + Math.floor(Math.random() * 30),
      bloodPressure: '120/80',
      temperature: 36.5 + Math.random() * 1.0,
      oxygenSaturation: 95 + Math.floor(Math.random() * 5),
      activity: 'rest',
      status: 'normal',
      recordedAt: new Date(Date.now() - i * 60000).toISOString()
    });
  }
  
  res.json({
    success: true,
    data: history,
    message: 'Vitals history retrieved successfully'
  });
});

// Vitals Stream API (SSE)
app.get('/api/vitals-stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  let intervalId;

  const sendVitals = () => {
    const heartRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    const oxygen = Math.floor(Math.random() * (100 - 95 + 1)) + 95;
    const temperature = (Math.random() * (37.5 - 36.0) + 36.0).toFixed(1);
    const timestamp = new Date().toISOString();

    const data = {
      heartRate,
      oxygen,
      temperature,
      timestamp,
      status: heartRate > 90 || oxygen < 96 || temperature > 37.2 ? 'warning' : 'normal'
    };

    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // 2초마다 데이터 전송
  intervalId = setInterval(sendVitals, 2000);

  // 클라이언트 연결 종료 시 인터벌 정리
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

// AI Analysis API
app.post('/api/ai-analysis', (req, res) => {
  const { heartRate, bloodPressure, temperature, oxygenSaturation, activity, age, gender } = req.body;
  
  // AI 분석 시뮬레이션
  const analysis = {
    cardiovascularRisk: Math.random() * 0.3 + 0.1,
    stressLevel: Math.random() * 0.4 + 0.2,
    sleepQuality: Math.random() * 0.5 + 0.5,
    exerciseEffectiveness: Math.random() * 0.6 + 0.4,
    overallHealthScore: Math.random() * 0.3 + 0.7
  };
  
  res.json({
    success: true,
    data: {
      analysis,
      recommendations: [
        '규칙적인 운동을 권장합니다',
        '충분한 수면을 취하세요',
        '스트레스 관리가 필요합니다'
      ],
      timestamp: new Date().toISOString()
    },
    message: 'AI analysis completed successfully'
  });
});

// Monitoring API
app.get('/api/monitoring', (req, res) => {
  const metrics = {
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    requestCount: Math.floor(Math.random() * 1000) + 100,
    errorCount: Math.floor(Math.random() * 10),
    averageResponseTime: Math.random() * 200 + 50
  };
  
  res.json({
    success: true,
    message: 'Monitoring data retrieved successfully',
    timestamp: new Date().toISOString(),
    metrics
  });
});

// Products API
app.get('/api/products', (req, res) => {
  const products = [
    {
      id: 1,
      name: '친환경 스마트 워치',
      description: '심박수 모니터링이 가능한 친환경 워치',
      price: 299.99,
      category: 'wearable',
      ecoRating: 4.5,
      carbonFootprint: 15.2,
      imageUrl: '/images/smartwatch.jpg'
    },
    {
      id: 2,
      name: '유기농 면 티셔츠',
      description: '100% 유기농 면으로 제작된 건강한 티셔츠',
      price: 29.99,
      category: 'clothing',
      ecoRating: 4.8,
      carbonFootprint: 2.1,
      imageUrl: '/images/tshirt.jpg'
    }
  ];
  
  res.json({
    success: true,
    data: products,
    total: products.length,
    platform: 'Railway with Enhanced API'
  });
});

// 프론트엔드 라우팅 (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// 서버 시작
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 GreenWear Server running on port ${PORT}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔌 API: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Shutting down gracefully...');
  process.exit(0);
});
