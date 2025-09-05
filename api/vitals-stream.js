// 실시간 생체신호 스트림 API
export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
    return;
  }

  // Server-Sent Events 설정
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 클라이언트 연결 확인
  const isConnected = () => {
    try {
      res.write('data: {"type": "ping"}\n\n');
      return true;
    } catch (error) {
      return false;
    }
  };

  // 실시간 데이터 생성 및 전송
  let intervalId;
  let dataCount = 0;

  const sendVitalsData = () => {
    if (!isConnected()) {
      clearInterval(intervalId);
      return;
    }

    const vitalsData = generateMockVitalsData(dataCount);
    
    try {
      res.write(`data: ${JSON.stringify(vitalsData)}\n\n`);
      dataCount++;
    } catch (error) {
      console.error('Error sending data:', error);
      clearInterval(intervalId);
    }
  };

  // 2초마다 데이터 전송
  intervalId = setInterval(sendVitalsData, 2000);

  // 초기 데이터 전송
  sendVitalsData();

  // 클라이언트 연결 종료 시 정리
  req.on('close', () => {
    clearInterval(intervalId);
  });

  req.on('aborted', () => {
    clearInterval(intervalId);
  });
}

// Mock 생체신호 데이터 생성
function generateMockVitalsData(count) {
  const baseTime = Date.now();
  const timestamp = new Date(baseTime + (count * 2000)).toISOString();

  // 심박수: 60-100 bpm 범위에서 변동
  const heartRate = Math.floor(70 + Math.sin(count * 0.1) * 15 + Math.random() * 10);

  // 혈압: 수축기 110-140, 이완기 70-90
  const systolic = Math.floor(120 + Math.sin(count * 0.05) * 10 + Math.random() * 5);
  const diastolic = Math.floor(80 + Math.sin(count * 0.05) * 5 + Math.random() * 3);
  const bloodPressure = `${systolic}/${diastolic}`;

  // 체온: 36.0-37.0°C 범위
  const temperature = Math.round((36.5 + Math.sin(count * 0.02) * 0.3 + Math.random() * 0.2) * 10) / 10;

  // 산소포화도: 95-100%
  const oxygenSaturation = Math.floor(97 + Math.random() * 3);

  // 상태 평가
  let status = 'normal';
  if (heartRate > 90 || systolic > 130 || temperature > 37.2) {
    status = 'warning';
  }
  if (heartRate > 110 || systolic > 140 || temperature > 37.5) {
    status = 'critical';
  }

  return {
    id: count + 1,
    timestamp,
    heartRate,
    bloodPressure,
    temperature,
    oxygenSaturation,
    status,
    activity: getRandomActivity(),
    location: 'Home',
    device: 'GreenWear Smart Watch'
  };
}

// 랜덤 활동 상태
function getRandomActivity() {
  const activities = ['rest', 'walking', 'running', 'exercise', 'work', 'sleep'];
  return activities[Math.floor(Math.random() * activities.length)];
}
