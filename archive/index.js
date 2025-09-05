const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const cors = require('cors');

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
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// 백엔드 API 프록시
app.use('/api', (req, res, next) => {
  // 백엔드가 실행 중이지 않으면 임시 응답
  if (!global.backendProcess || global.backendProcess.killed) {
    return res.status(503).json({ 
      error: 'Backend service temporarily unavailable',
      message: '백엔드 서비스가 일시적으로 사용할 수 없습니다.'
    });
  }
  next();
});

// 임시 API 엔드포인트 (백엔드가 실행되지 않았을 때)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'GreenWear Frontend Server Running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/vitals/evaluate', (req, res) => {
  // 임시 vitals 평가 응답
  res.json([
    {
      metric: "HR",
      color: "green",
      hex: "#22c55e",
      label: "정상",
      message: "심박 정상 범위"
    },
    {
      metric: "SpO₂",
      color: "green", 
      hex: "#22c55e",
      label: "정상",
      message: "산소포화도 정상"
    }
  ]);
});

// 프론트엔드 라우팅 (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

// 백엔드 시작 함수
function startBackend() {
  console.log('🚀 Starting Spring Boot backend...');
  
  const backendDir = path.join(__dirname, 'backend-spring', 'demo');
  
  // backend-spring/demo 디렉토리 확인
  if (!require('fs').existsSync(backendDir)) {
    console.log('⚠️  Backend directory not found, running frontend only');
    return;
  }
  
  try {
    // Gradle로 Spring Boot 실행
    global.backendProcess = spawn('./gradlew', ['bootRun'], {
      cwd: backendDir,
      stdio: 'pipe'
    });
    
    global.backendProcess.stdout.on('data', (data) => {
      console.log(`🔧 Backend: ${data}`);
    });
    
    global.backendProcess.stderr.on('data', (data) => {
      console.log(`🔧 Backend Error: ${data}`);
    });
    
    global.backendProcess.on('close', (code) => {
      console.log(`🔧 Backend process exited with code ${code}`);
      global.backendProcess = null;
    });
    
    console.log('✅ Backend started successfully');
  } catch (error) {
    console.log('❌ Failed to start backend:', error.message);
  }
}

// 서버 시작
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 GreenWear Server running on port ${PORT}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔌 API: http://localhost:${PORT}/api`);
  
  // 백엔드 시작 시도
  setTimeout(startBackend, 2000);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down gracefully...');
  if (global.backendProcess) {
    global.backendProcess.kill();
  }
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Shutting down gracefully...');
  if (global.backendProcess) {
    global.backendProcess.kill();
  }
  process.exit(0);
});
