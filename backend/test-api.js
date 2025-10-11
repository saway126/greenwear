/**
 * API 실제 동작 테스트 스크립트
 * 서버를 시작하고 실제 HTTP 요청으로 테스트
 */

const http = require('http');

// 서버를 임시로 시작
console.log('🚀 서버 시작 중...\n');
const server = require('./server.js');

// 서버가 완전히 시작될 때까지 대기
setTimeout(async () => {
  console.log('🧪 API 테스트 시작\n');
  
  const tests = [];
  
  // 테스트 1: Health Check
  tests.push({
    name: 'Health Check API',
    test: () => testAPI('GET', '/api/health')
  });
  
  // 테스트 2: Vitals API
  tests.push({
    name: 'Vitals Analysis API',
    test: () => testAPI('POST', '/api/vitals', {
      heartRate: 75,
      bloodPressure: '120/80',
      temperature: 36.8,
      oxygenSaturation: 98,
      activity: 'rest'
    })
  });
  
  // 테스트 3: AI Analysis API
  tests.push({
    name: 'AI Analysis API',
    test: () => testAPI('POST', '/api/ai-analysis', {
      heartRate: 72,
      temperature: 36.5,
      oxygenSaturation: 98
    })
  });
  
  // 테스트 4: IoT Wearable Data API
  tests.push({
    name: 'IoT Wearable Data API',
    test: () => testAPI('POST', '/api/wearable/data', {
      deviceId: 'TEST-DEVICE-001',
      deviceName: 'Test Device',
      heartRate: 75,
      temperature: 36.8,
      oxygenSaturation: 98,
      stepCount: 1000,
      batteryLevel: 85
    })
  });
  
  // 테스트 5: Products API
  tests.push({
    name: 'Products API',
    test: () => testAPI('GET', '/api/products')
  });
  
  // 모든 테스트 실행
  let passed = 0;
  let failed = 0;
  
  for (const { name, test } of tests) {
    try {
      const result = await test();
      console.log(`✅ ${name}: 통과`);
      if (result) {
        console.log(`   응답 샘플:`, JSON.stringify(result).substring(0, 100) + '...\n');
      }
      passed++;
    } catch (error) {
      console.log(`❌ ${name}: 실패`);
      console.log(`   에러: ${error.message}\n`);
      failed++;
    }
  }
  
  // 결과 요약
  console.log('═══════════════════════════════════');
  console.log(`📊 테스트 결과 요약`);
  console.log(`   총 테스트: ${tests.length}개`);
  console.log(`   ✅ 통과: ${passed}개`);
  console.log(`   ❌ 실패: ${failed}개`);
  console.log('═══════════════════════════════════\n');
  
  if (failed === 0) {
    console.log('🎉 모든 API가 정상 동작합니다!\n');
  } else {
    console.log('⚠️  일부 API에 문제가 있습니다.\n');
  }
  
  process.exit(failed === 0 ? 0 : 1);
}, 2000);

// HTTP 요청 헬퍼 함수
function testAPI(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(responseData);
            resolve(parsed);
          } catch (e) {
            resolve(responseData);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

