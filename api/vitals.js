// 생체신호 분석 API (PostgreSQL 연동)
import { 
  saveVitalsData, 
  saveVitalsAnalysis, 
  getVitalsHistory, 
  generateProductRecommendations,
  createNotification 
} from './database.js'

export default async function handler(req, res) {
  const { method } = req;

  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (method) {
      case 'GET':
        // 생체신호 히스토리 조회
        const { userId, limit, offset } = req.query;
        const history = await getVitalsHistory(
          userId || 1, 
          parseInt(limit) || 50, 
          parseInt(offset) || 0
        );
        res.status(200).json({
          success: true,
          data: history.data,
          message: 'Vitals history retrieved successfully'
        });
        break;

      case 'POST':
        // 생체신호 데이터 분석 및 저장
        const vitalsData = req.body;
        const analysis = await analyzeVitals(vitalsData);
        
        // 데이터베이스에 저장
        const bloodPressure = vitalsData.bloodPressure ? vitalsData.bloodPressure.split('/') : [null, null];
        const vitalsDataToSave = {
          userId: vitalsData.userId || 1,
          heartRate: vitalsData.heartRate,
          bloodPressureSystolic: parseInt(bloodPressure[0]),
          bloodPressureDiastolic: parseInt(bloodPressure[1]),
          temperature: vitalsData.temperature,
          oxygenSaturation: vitalsData.oxygenSaturation,
          activity: vitalsData.activity || 'rest',
          status: analysis.overallStatus,
          riskLevel: analysis.riskLevel
        };
        
        const savedData = await saveVitalsData(vitalsDataToSave);
        
        if (savedData.success) {
          // 분석 결과 저장
          await saveVitalsAnalysis({
            vitalsDataId: savedData.data.id,
            overallStatus: analysis.overallStatus,
            metrics: analysis.metrics,
            recommendations: analysis.recommendations
          });
          
          // 제품 추천 생성
          const recommendations = await generateProductRecommendations(
            vitalsData.userId || 1, 
            vitalsData
          );
          
          // 위험 상태인 경우 알림 생성
          if (analysis.overallStatus === 'critical') {
            await createNotification({
              userId: vitalsData.userId || 1,
              type: 'health_alert',
              title: '건강 상태 경고',
              message: '생체신호가 위험 수준입니다. 즉시 의료진과 상담하세요.',
              level: 'critical'
            });
          }
          
          res.status(200).json({
            success: true,
            data: {
              ...analysis,
              savedDataId: savedData.data.id,
              recommendations: recommendations.data || []
            },
            message: 'Vitals analysis completed and saved successfully'
          });
        } else {
          res.status(500).json({
            success: false,
            message: 'Failed to save vitals data',
            error: savedData.error
          });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('Vitals API Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal Server Error',
      error: error.message 
    });
  }
}

// 생체신호 분석 함수
async function analyzeVitals(data) {
  const { heartRate, bloodPressure, temperature, oxygenSaturation, activity, age, gender } = data;
  
  const analysis = {
    timestamp: new Date().toISOString(),
    metrics: [],
    overallStatus: 'normal',
    recommendations: [],
    riskLevel: 'low'
  };

  // 심박수 분석
  if (heartRate) {
    const hrStatus = analyzeHeartRate(heartRate, age);
    analysis.metrics.push({
      name: 'Heart Rate',
      value: heartRate,
      unit: 'bpm',
      status: hrStatus.status,
      color: hrStatus.color,
      message: hrStatus.message
    });
  }

  // 혈압 분석
  if (bloodPressure) {
    const bpStatus = analyzeBloodPressure(bloodPressure);
    analysis.metrics.push({
      name: 'Blood Pressure',
      value: bloodPressure,
      unit: 'mmHg',
      status: bpStatus.status,
      color: bpStatus.color,
      message: bpStatus.message
    });
  }

  // 체온 분석
  if (temperature) {
    const tempStatus = analyzeTemperature(temperature);
    analysis.metrics.push({
      name: 'Temperature',
      value: temperature,
      unit: '°C',
      status: tempStatus.status,
      color: tempStatus.color,
      message: tempStatus.message
    });
  }

  // 산소포화도 분석
  if (oxygenSaturation) {
    const oxygenStatus = analyzeOxygenSaturation(oxygenSaturation);
    analysis.metrics.push({
      name: 'Oxygen Saturation',
      value: oxygenSaturation,
      unit: '%',
      status: oxygenStatus.status,
      color: oxygenStatus.color,
      message: oxygenStatus.message
    });
  }

  // 전체 상태 평가
  const criticalCount = analysis.metrics.filter(m => m.status === 'critical').length;
  const warningCount = analysis.metrics.filter(m => m.status === 'warning').length;

  if (criticalCount > 0) {
    analysis.overallStatus = 'critical';
    analysis.riskLevel = 'high';
    analysis.recommendations.push('즉시 의료진과 상담하세요');
  } else if (warningCount > 0) {
    analysis.overallStatus = 'warning';
    analysis.riskLevel = 'medium';
    analysis.recommendations.push('건강 상태를 주의깊게 관찰하세요');
  } else {
    analysis.overallStatus = 'normal';
    analysis.riskLevel = 'low';
    analysis.recommendations.push('건강한 상태를 유지하고 있습니다');
  }

  // 활동별 맞춤 추천
  if (activity) {
    const activityRecommendations = getActivityRecommendations(activity, analysis.metrics);
    analysis.recommendations.push(...activityRecommendations);
  }

  return analysis;
}

// 심박수 분석
function analyzeHeartRate(hr, age) {
  let status = 'normal';
  let color = 'green';
  let message = '정상 범위입니다';

  if (age) {
    const maxHR = 220 - age;
    const targetHRMin = maxHR * 0.5;
    const targetHRMax = maxHR * 0.85;

    if (hr < 60) {
      status = 'warning';
      color = 'yellow';
      message = '심박수가 낮습니다. 의사와 상담하세요';
    } else if (hr > 100) {
      status = 'warning';
      color = 'yellow';
      message = '심박수가 높습니다. 휴식을 취하세요';
    } else if (hr > 120) {
      status = 'critical';
      color = 'red';
      message = '심박수가 매우 높습니다. 즉시 의료진과 상담하세요';
    } else if (hr >= targetHRMin && hr <= targetHRMax) {
      message = '운동에 적합한 심박수입니다';
    }
  } else {
    if (hr < 60 || hr > 100) {
      status = 'warning';
      color = 'yellow';
      message = '심박수에 주의가 필요합니다';
    }
  }

  return { status, color, message };
}

// 혈압 분석
function analyzeBloodPressure(bp) {
  let status = 'normal';
  let color = 'green';
  let message = '정상 혈압입니다';

  const [systolic, diastolic] = bp.split('/').map(Number);

  if (systolic >= 180 || diastolic >= 110) {
    status = 'critical';
    color = 'red';
    message = '고혈압 위기입니다. 즉시 의료진과 상담하세요';
  } else if (systolic >= 140 || diastolic >= 90) {
    status = 'warning';
    color = 'yellow';
    message = '고혈압입니다. 의사와 상담하세요';
  } else if (systolic >= 120 || diastolic >= 80) {
    status = 'warning';
    color = 'yellow';
    message = '고혈압 전단계입니다. 생활습관을 개선하세요';
  } else if (systolic < 90 || diastolic < 60) {
    status = 'warning';
    color = 'yellow';
    message = '저혈압입니다. 의사와 상담하세요';
  }

  return { status, color, message };
}

// 체온 분석
function analyzeTemperature(temp) {
  let status = 'normal';
  let color = 'green';
  let message = '정상 체온입니다';

  if (temp < 36.0) {
    status = 'warning';
    color = 'yellow';
    message = '체온이 낮습니다. 체온을 올리세요';
  } else if (temp > 37.5) {
    status = 'warning';
    color = 'yellow';
    message = '미열이 있습니다. 휴식을 취하세요';
  } else if (temp > 38.0) {
    status = 'critical';
    color = 'red';
    message = '고열입니다. 즉시 의료진과 상담하세요';
  }

  return { status, color, message };
}

// 산소포화도 분석
function analyzeOxygenSaturation(spo2) {
  let status = 'normal';
  let color = 'green';
  let message = '정상 산소포화도입니다';

  if (spo2 < 90) {
    status = 'critical';
    color = 'red';
    message = '산소포화도가 매우 낮습니다. 즉시 의료진과 상담하세요';
  } else if (spo2 < 95) {
    status = 'warning';
    color = 'yellow';
    message = '산소포화도가 낮습니다. 의사와 상담하세요';
  }

  return { status, color, message };
}

// 활동별 추천사항
function getActivityRecommendations(activity, metrics) {
  const recommendations = [];
  
  const hasWarning = metrics.some(m => m.status === 'warning');
  const hasCritical = metrics.some(m => m.status === 'critical');

  if (hasCritical) {
    recommendations.push('현재 상태로는 운동을 권장하지 않습니다');
    return recommendations;
  }

  switch (activity) {
    case 'rest':
      if (hasWarning) {
        recommendations.push('휴식을 취하고 충분한 수면을 취하세요');
      } else {
        recommendations.push('가벼운 스트레칭을 해보세요');
      }
      break;
    case 'exercise':
      if (hasWarning) {
        recommendations.push('가벼운 운동으로 강도를 조절하세요');
      } else {
        recommendations.push('현재 상태로 운동하기에 적합합니다');
      }
      break;
    case 'work':
      if (hasWarning) {
        recommendations.push('업무 중간중간 휴식을 취하세요');
      } else {
        recommendations.push('집중력이 좋은 상태입니다');
      }
      break;
  }

  return recommendations;
}

// 생체신호 히스토리 조회 (Mock 데이터)
async function getVitalsHistory() {
  // 실제로는 데이터베이스에서 조회
  return [
    {
      id: 1,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      heartRate: 72,
      bloodPressure: '120/80',
      temperature: 36.5,
      oxygenSaturation: 98,
      status: 'normal'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      heartRate: 85,
      bloodPressure: '130/85',
      temperature: 36.8,
      oxygenSaturation: 96,
      status: 'warning'
    }
  ];
}
