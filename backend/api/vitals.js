// 생체신호 분석 Express 라우터 (CommonJS)
const express = require('express');
const router  = express.Router();
const db      = require('./database');
const { analyzeHealth } = require('./ai-analysis');

// GET /api/vitals  - 히스토리 조회
router.get('/', async (req, res) => {
  const { userId = 1, limit = 50, offset = 0 } = req.query;
  const result = await db.getVitalsHistory(parseInt(userId), parseInt(limit), parseInt(offset));
  if (!result.success) return res.status(500).json({ success: false, message: 'DB 조회 오류' });
  res.json({ success: true, data: result.data });
});

// POST /api/vitals  - 분석 + 저장
router.post('/', async (req, res) => {
  try {
    const { heartRate, bloodPressure, temperature, oxygenSaturation, activity, age, gender, userId = 1 } = req.body;

    if (!heartRate || !temperature) {
      return res.status(400).json({ success: false, message: 'heartRate, temperature는 필수입니다.' });
    }

    const analysis = await analyzeHealth({ heartRate, bloodPressure, temperature, oxygenSaturation, activity, age, gender });

    const [systolic, diastolic] = bloodPressure ? bloodPressure.split('/').map(Number) : [null, null];
    const saved = await db.saveVitalsData({
      userId, heartRate, bloodPressureSystolic: systolic, bloodPressureDiastolic: diastolic,
      temperature, oxygenSaturation, activity: activity || 'rest',
      status: analysis.overallStatus, riskLevel: analysis.riskLevel,
    });

    if (saved.success) {
      await db.saveVitalsAnalysis({
        vitalsDataId: saved.data.id,
        overallStatus: analysis.overallStatus,
        metrics: analysis.metrics,
        recommendations: analysis.recommendations,
      });

      const recs = await db.generateProductRecommendations(userId, { heartRate, temperature, activity });

      if (analysis.overallStatus === 'critical') {
        await db.createNotification({
          userId, type: 'health_alert', title: '건강 상태 경고',
          message: '생체신호가 위험 수준입니다. 즉시 의료진과 상담하세요.', level: 'critical',
        });
      }

      return res.json({
        success: true,
        data: { ...analysis, savedDataId: saved.data.id, productRecommendations: recs.data || [] },
        message: 'Vitals analysis completed and saved successfully',
      });
    }

    res.status(500).json({ success: false, message: 'DB 저장 오류' });
  } catch (err) {
    console.error('Vitals API Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
