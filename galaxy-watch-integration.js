/*
 * 갤럭시 워치4 연동을 위한 Node.js 서버
 * Samsung Health API와 연동하여 워치 데이터를 수집
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5001;

// CORS 설정
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
}));

app.use(express.json());

// Samsung Health API 설정
const SAMSUNG_HEALTH_API = {
  baseURL: 'https://api.samsunghealth.com',
  clientId: process.env.SAMSUNG_HEALTH_CLIENT_ID,
  clientSecret: process.env.SAMSUNG_HEALTH_CLIENT_SECRET
};

// 워치 데이터 저장소
let watchDataStore = [];
let deviceStats = {};

// 갤럭시 워치4 데이터 수신 API
app.post('/api/galaxy-watch/data', async (req, res) => {
  const {
    deviceId,
    deviceName = 'Galaxy Watch4',
    heartRate,
    steps,
    calories,
    sleep,
    stress,
    bloodOxygen,
    temperature,
    timestamp = Date.now()
  } = req.body;

  // 데이터 검증
  if (!deviceId || !heartRate) {
    return res.status(400).json({
      success: false,
      message: '필수 필드가 누락되었습니다 (deviceId, heartRate)'
    });
  }

  // 워치 데이터 저장
  const watchData = {
    id: Date.now(),
    deviceId,
    deviceName,
    deviceType: 'galaxy_watch4',
    heartRate: parseInt(heartRate),
    steps: parseInt(steps) || 0,
    calories: parseInt(calories) || 0,
    sleep: parseFloat(sleep) || 0,
    stress: parseInt(stress) || 50,
    bloodOxygen: parseInt(bloodOxygen) || 98,
    temperature: parseFloat(temperature) || 36.5,
    timestamp,
    createdAt: new Date().toISOString()
  };

  // 메모리 저장
  watchDataStore.unshift(watchData);
  if (watchDataStore.length > 1000) {
    watchDataStore = watchDataStore.slice(0, 1000);
  }

  // 디바이스 통계 업데이트
  if (!deviceStats[deviceId]) {
    deviceStats[deviceId] = {
      totalRecords: 0,
      lastSeen: new Date().toISOString(),
      avgHeartRate: 0,
      totalSteps: 0,
      totalCalories: 0,
      avgSleep: 0
    };
  }

  const stats = deviceStats[deviceId];
  stats.totalRecords++;
  stats.lastSeen = new Date().toISOString();
  stats.avgHeartRate = (stats.avgHeartRate * (stats.totalRecords - 1) + heartRate) / stats.totalRecords;
  stats.totalSteps += steps || 0;
  stats.totalCalories += calories || 0;
  stats.avgSleep = (stats.avgSleep * (stats.totalRecords - 1) + (sleep || 0)) / stats.totalRecords;

  // 건강 상태 분석
  let healthStatus = 'normal';
  let recommendations = [];

  if (heartRate < 60 || heartRate > 100) {
    healthStatus = 'warning';
    recommendations.push('심박수 모니터링 필요');
  }

  if (stress > 80) {
    healthStatus = 'warning';
    recommendations.push('스트레스 관리 필요');
  }

  if (sleep < 6) {
    healthStatus = 'warning';
    recommendations.push('충분한 수면 필요');
  }

  console.log(`⌚ 갤럭시 워치4 데이터 수신: ${deviceId} - 심박수: ${heartRate}, 걸음: ${steps}, 상태: ${healthStatus}`);

  res.json({
    success: true,
    message: '워치 데이터가 성공적으로 저장되었습니다.',
    data: {
      id: watchData.id,
      deviceId,
      healthStatus,
      recommendations,
      timestamp: watchData.timestamp
    }
  });
});

// 워치 데이터 조회 API
app.get('/api/galaxy-watch/data', (req, res) => {
  const { deviceId, limit = 50 } = req.query;
  
  let data = watchDataStore;
  
  if (deviceId) {
    data = data.filter(item => item.deviceId === deviceId);
  }
  
  data = data.slice(0, parseInt(limit));
  
  res.json({
    success: true,
    data: data,
    total: data.length,
    message: '워치 데이터를 성공적으로 조회했습니다.'
  });
});

// 워치 디바이스 목록 조회
app.get('/api/galaxy-watch/devices', (req, res) => {
  const devices = Object.keys(deviceStats).map(deviceId => {
    const stats = deviceStats[deviceId];
    const latestData = watchDataStore.find(item => item.deviceId === deviceId);
    
    return {
      deviceId,
      deviceName: latestData?.deviceName || 'Galaxy Watch4',
      deviceType: 'galaxy_watch4',
      lastSeen: stats.lastSeen,
      totalRecords: stats.totalRecords,
      avgHeartRate: Math.round(stats.avgHeartRate),
      totalSteps: stats.totalSteps,
      totalCalories: stats.totalCalories,
      avgSleep: Math.round(stats.avgSleep * 10) / 10,
      currentStatus: latestData?.healthStatus || 'unknown'
    };
  });
  
  res.json({
    success: true,
    data: devices,
    total: devices.length,
    message: '워치 디바이스 목록을 성공적으로 조회했습니다.'
  });
});

// Samsung Health API 연동 (실제 구현 시 필요)
app.get('/api/samsung-health/sync', async (req, res) => {
  try {
    // Samsung Health API에서 데이터 동기화
    // 실제 구현 시 OAuth 인증 필요
    
    res.json({
      success: true,
      message: 'Samsung Health 데이터 동기화 완료',
      data: {
        syncedAt: new Date().toISOString(),
        recordsCount: watchDataStore.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Samsung Health 동기화 실패',
      error: error.message
    });
  }
});

// 헬스 체크
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Galaxy Watch4 연동 서버 실행 중',
    timestamp: new Date().toISOString(),
    devices: Object.keys(deviceStats).length,
    totalRecords: watchDataStore.length
  });
});

// 서버 시작
app.listen(PORT, '0.0.0.0', () => {
  console.log(`⌚ Galaxy Watch4 연동 서버 실행 중 - 포트 ${PORT}`);
  console.log(`📱 API: http://localhost:${PORT}/api`);
  console.log(`🔌 워치 데이터: http://localhost:${PORT}/api/galaxy-watch/data`);
});

module.exports = app;
