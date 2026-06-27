// AI 건강 분석 엔진 (CommonJS)
const { logger } = require('./monitoring');

// ── 분석 함수들 ───────────────────────────────────────────────────────────────
function analyzeHeartRate(hr, age) {
  let status = 'normal', color = 'green', message = '정상 범위입니다';
  const max = age ? 220 - age : 200;
  if (hr < 50)       { status = 'critical'; color = 'red';    message = '심박수가 매우 낮습니다. 즉시 의료진과 상담하세요'; }
  else if (hr < 60)  { status = 'warning';  color = 'yellow'; message = '심박수가 낮습니다'; }
  else if (hr > 120) { status = 'critical'; color = 'red';    message = '심박수가 매우 높습니다. 즉시 의료진과 상담하세요'; }
  else if (hr > 100) { status = 'warning';  color = 'yellow'; message = '심박수가 높습니다. 휴식을 취하세요'; }
  return { status, color, message };
}

function analyzeBloodPressure(bp) {
  let status = 'normal', color = 'green', message = '정상 혈압입니다';
  const [s, d] = bp.split('/').map(Number);
  if (s >= 180 || d >= 110) { status = 'critical'; color = 'red';    message = '고혈압 위기입니다. 즉시 의료진과 상담하세요'; }
  else if (s >= 140 || d >= 90) { status = 'warning';  color = 'yellow'; message = '고혈압입니다. 의사와 상담하세요'; }
  else if (s >= 120 || d >= 80) { status = 'warning';  color = 'yellow'; message = '고혈압 전단계입니다'; }
  else if (s < 90  || d < 60)  { status = 'warning';  color = 'yellow'; message = '저혈압입니다'; }
  return { status, color, message };
}

function analyzeTemperature(temp) {
  let status = 'normal', color = 'green', message = '정상 체온입니다';
  if (temp > 38.5)      { status = 'critical'; color = 'red';    message = '고열입니다. 즉시 의료진과 상담하세요'; }
  else if (temp > 37.5) { status = 'warning';  color = 'yellow'; message = '미열이 있습니다'; }
  else if (temp < 35.5) { status = 'critical'; color = 'red';    message = '체온이 매우 낮습니다'; }
  else if (temp < 36.0) { status = 'warning';  color = 'yellow'; message = '체온이 낮습니다'; }
  return { status, color, message };
}

function analyzeOxygenSaturation(spo2) {
  let status = 'normal', color = 'green', message = '정상 산소포화도입니다';
  if (spo2 < 90)      { status = 'critical'; color = 'red';    message = '산소포화도가 매우 낮습니다. 즉시 의료진과 상담하세요'; }
  else if (spo2 < 95) { status = 'warning';  color = 'yellow'; message = '산소포화도가 낮습니다'; }
  return { status, color, message };
}

// 심혈관 위험도 예측 (0~1)
function predictCardiovascular({ heartRate, bloodPressure, temperature, age = 30 }) {
  const [s] = bloodPressure ? bloodPressure.split('/').map(Number) : [120];
  const hrRisk   = heartRate < 60 ? 0.3 : heartRate > 100 ? 0.7 : 0.1;
  const bpRisk   = s >= 180 ? 0.9 : s >= 140 ? 0.6 : s >= 120 ? 0.3 : 0.1;
  const ageRisk  = Math.min(age / 100, 0.8);
  const tempRisk = temperature > 37.5 ? 0.4 : temperature < 36.0 ? 0.3 : 0.1;
  const score    = hrRisk * 0.35 + bpRisk * 0.35 + ageRisk * 0.2 + tempRisk * 0.1;
  return { riskScore: Math.round(score * 100), riskLevel: score > 0.7 ? 'high' : score > 0.4 ? 'medium' : 'low' };
}

// 스트레스 수준 (0~1)
function predictStress({ heartRate, bloodPressure, temperature, activity = 'rest' }) {
  const [s] = bloodPressure ? bloodPressure.split('/').map(Number) : [120];
  const hrStress   = heartRate > 100 ? 0.8 : heartRate > 80 ? 0.5 : 0.2;
  const bpStress   = s > 140 ? 0.7 : s > 130 ? 0.4 : 0.1;
  const tempStress = temperature > 37.2 ? 0.6 : temperature < 36.5 ? 0.3 : 0.1;
  const actStress  = activity === 'work' ? 0.6 : activity === 'exercise' ? 0.3 : 0.1;
  const score = hrStress * 0.4 + bpStress * 0.3 + tempStress * 0.2 + actStress * 0.1;
  return { stressScore: Math.round(score * 100), stressLevel: score > 0.7 ? 'high' : score > 0.4 ? 'medium' : 'low' };
}

// 수면 품질 (0~1)
function predictSleep({ heartRate, temperature, activity = 'rest' }) {
  const hrQ   = heartRate < 60 ? 0.9 : heartRate < 70 ? 0.7 : heartRate < 80 ? 0.5 : 0.2;
  const tempQ = temperature >= 36.0 && temperature <= 36.5 ? 0.9 : temperature >= 35.5 && temperature <= 37.0 ? 0.6 : 0.3;
  const actQ  = activity === 'sleep' ? 0.9 : activity === 'rest' ? 0.6 : 0.2;
  const score = hrQ * 0.4 + tempQ * 0.3 + actQ * 0.3;
  return {
    sleepScore:   Math.round(score * 100),
    sleepQuality: score > 0.7 ? 'excellent' : score > 0.5 ? 'good' : score > 0.3 ? 'fair' : 'poor',
  };
}

// 종합 건강 분석
async function analyzeHealth(vitalsData) {
  const { heartRate, bloodPressure, temperature, oxygenSaturation, activity, age, gender } = vitalsData;

  const metrics = [];
  if (heartRate)        metrics.push({ name: 'Heart Rate',        value: heartRate,        unit: 'bpm', ...analyzeHeartRate(heartRate, age) });
  if (bloodPressure)    metrics.push({ name: 'Blood Pressure',    value: bloodPressure,    unit: 'mmHg', ...analyzeBloodPressure(bloodPressure) });
  if (temperature)      metrics.push({ name: 'Temperature',       value: temperature,      unit: '°C', ...analyzeTemperature(temperature) });
  if (oxygenSaturation) metrics.push({ name: 'Oxygen Saturation', value: oxygenSaturation, unit: '%', ...analyzeOxygenSaturation(oxygenSaturation) });

  const critical = metrics.filter(m => m.status === 'critical').length;
  const warning  = metrics.filter(m => m.status === 'warning').length;

  let overallStatus = 'normal', riskLevel = 'low';
  const recommendations = [];

  if (critical > 0) {
    overallStatus = 'critical'; riskLevel = 'high';
    recommendations.push('즉시 의료진과 상담하세요');
  } else if (warning > 0) {
    overallStatus = 'warning'; riskLevel = 'medium';
    recommendations.push('건강 상태를 주의깊게 관찰하세요');
  } else {
    recommendations.push('건강한 상태를 유지하고 있습니다');
  }

  if (activity === 'exercise' && overallStatus === 'normal') recommendations.push('운동하기 좋은 상태입니다');
  if (activity === 'rest'     && overallStatus !== 'normal') recommendations.push('충분한 휴식을 취하세요');

  const cardio  = predictCardiovascular(vitalsData);
  const stress  = predictStress(vitalsData);
  const sleep   = predictSleep(vitalsData);

  const overallScore = Math.round(
    (100 - cardio.riskScore) * 0.3 +
    (100 - stress.stressScore) * 0.25 +
    sleep.sleepScore * 0.25 +
    (overallStatus === 'normal' ? 80 : overallStatus === 'warning' ? 50 : 20) * 0.2
  );

  logger.info('AI 건강 분석 완료', { overallStatus, overallScore });

  return {
    timestamp: new Date().toISOString(),
    overallStatus,
    riskLevel,
    overallScore,
    metrics,
    recommendations,
    cardiovascular: cardio,
    stress,
    sleep,
    summary:
      overallScore >= 80 ? '전반적으로 매우 건강한 상태입니다!' :
      overallScore >= 60 ? '건강한 상태를 유지하고 있습니다.' :
      overallScore >= 40 ? '몇 가지 개선이 필요한 부분이 있습니다.' :
                           '건강 상태에 주의가 필요합니다.',
  };
}

module.exports = { analyzeHealth };
