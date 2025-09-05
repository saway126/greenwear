// AI 기반 건강 분석 엔진
import { logger } from './monitoring.js'

// 머신러닝 모델 시뮬레이션 (실제로는 TensorFlow.js나 PyTorch 모델 사용)
class HealthAnalysisAI {
  constructor() {
    this.models = {
      // 심혈관 위험도 예측 모델
      cardiovascular: this.initCardiovascularModel(),
      // 스트레스 수준 분석 모델
      stress: this.initStressModel(),
      // 수면 품질 예측 모델
      sleep: this.initSleepModel(),
      // 운동 효과 예측 모델
      exercise: this.initExerciseModel()
    }
  }

  // 심혈관 위험도 예측 모델 초기화
  initCardiovascularModel() {
    return {
      predict: (data) => {
        const { heartRate, bloodPressure, age, gender, temperature } = data
        
        // 심박수 기반 위험도 (0-1)
        let hrRisk = 0
        if (heartRate < 60) hrRisk = 0.3
        else if (heartRate > 100) hrRisk = 0.7
        else if (heartRate > 90) hrRisk = 0.4
        else hrRisk = 0.1

        // 혈압 기반 위험도
        const [systolic, diastolic] = bloodPressure ? bloodPressure.split('/').map(Number) : [120, 80]
        let bpRisk = 0
        if (systolic >= 180 || diastolic >= 110) bpRisk = 0.9
        else if (systolic >= 140 || diastolic >= 90) bpRisk = 0.6
        else if (systolic >= 120 || diastolic >= 80) bpRisk = 0.3
        else bpRisk = 0.1

        // 나이 기반 위험도
        const ageRisk = Math.min(age / 100, 0.8)

        // 성별 기반 위험도 (남성이 더 높음)
        const genderRisk = gender === 'male' ? 0.1 : 0.05

        // 체온 기반 위험도
        let tempRisk = 0
        if (temperature > 37.5) tempRisk = 0.4
        else if (temperature < 36.0) tempRisk = 0.3
        else tempRisk = 0.1

        // 가중 평균으로 최종 위험도 계산
        const totalRisk = (hrRisk * 0.3 + bpRisk * 0.3 + ageRisk * 0.2 + genderRisk * 0.1 + tempRisk * 0.1)
        
        return {
          riskScore: Math.round(totalRisk * 100),
          riskLevel: totalRisk > 0.7 ? 'high' : totalRisk > 0.4 ? 'medium' : 'low',
          factors: {
            heartRate: { score: hrRisk, impact: 'moderate' },
            bloodPressure: { score: bpRisk, impact: 'high' },
            age: { score: ageRisk, impact: 'high' },
            gender: { score: genderRisk, impact: 'low' },
            temperature: { score: tempRisk, impact: 'moderate' }
          },
          recommendations: this.getCardiovascularRecommendations(totalRisk, { heartRate, bloodPressure, age, temperature })
        }
      }
    }
  }

  // 스트레스 수준 분석 모델 초기화
  initStressModel() {
    return {
      predict: (data) => {
        const { heartRate, bloodPressure, temperature, activity, age } = data
        
        // 심박수 변동성 기반 스트레스 (실제로는 HRV 분석)
        const hrVariability = this.calculateHRV(heartRate)
        let stressFromHR = 0
        if (hrVariability < 20) stressFromHR = 0.8
        else if (hrVariability < 40) stressFromHR = 0.5
        else stressFromHR = 0.2

        // 혈압 기반 스트레스
        const [systolic] = bloodPressure ? bloodPressure.split('/').map(Number) : [120]
        let stressFromBP = 0
        if (systolic > 140) stressFromBP = 0.7
        else if (systolic > 130) stressFromBP = 0.4
        else stressFromBP = 0.1

        // 체온 기반 스트레스
        let stressFromTemp = 0
        if (temperature > 37.2) stressFromTemp = 0.6
        else if (temperature < 36.5) stressFromTemp = 0.3
        else stressFromTemp = 0.1

        // 활동 기반 스트레스
        let stressFromActivity = 0
        switch (activity) {
          case 'work': stressFromActivity = 0.6; break
          case 'exercise': stressFromActivity = 0.3; break
          case 'rest': stressFromActivity = 0.1; break
          case 'sleep': stressFromActivity = 0.05; break
          default: stressFromActivity = 0.2
        }

        const totalStress = (stressFromHR * 0.4 + stressFromBP * 0.3 + stressFromTemp * 0.2 + stressFromActivity * 0.1)
        
        return {
          stressScore: Math.round(totalStress * 100),
          stressLevel: totalStress > 0.7 ? 'high' : totalStress > 0.4 ? 'medium' : 'low',
          factors: {
            heartRateVariability: { score: stressFromHR, impact: 'high' },
            bloodPressure: { score: stressFromBP, impact: 'moderate' },
            temperature: { score: stressFromTemp, impact: 'moderate' },
            activity: { score: stressFromActivity, impact: 'low' }
          },
          recommendations: this.getStressRecommendations(totalStress, { activity, age })
        }
      }
    }
  }

  // 수면 품질 예측 모델 초기화
  initSleepModel() {
    return {
      predict: (data) => {
        const { heartRate, temperature, activity, timeOfDay } = data
        
        // 심박수 기반 수면 품질
        let sleepFromHR = 0
        if (heartRate < 60) sleepFromHR = 0.9
        else if (heartRate < 70) sleepFromHR = 0.7
        else if (heartRate < 80) sleepFromHR = 0.5
        else sleepFromHR = 0.2

        // 체온 기반 수면 품질
        let sleepFromTemp = 0
        if (temperature >= 36.0 && temperature <= 36.5) sleepFromTemp = 0.9
        else if (temperature >= 35.5 && temperature <= 37.0) sleepFromTemp = 0.6
        else sleepFromTemp = 0.3

        // 활동 기반 수면 품질
        let sleepFromActivity = 0
        if (activity === 'sleep') sleepFromActivity = 0.9
        else if (activity === 'rest') sleepFromActivity = 0.6
        else sleepFromActivity = 0.2

        const totalSleepQuality = (sleepFromHR * 0.4 + sleepFromTemp * 0.3 + sleepFromActivity * 0.3)
        
        return {
          sleepScore: Math.round(totalSleepQuality * 100),
          sleepQuality: totalSleepQuality > 0.7 ? 'excellent' : totalSleepQuality > 0.5 ? 'good' : totalSleepQuality > 0.3 ? 'fair' : 'poor',
          factors: {
            heartRate: { score: sleepFromHR, impact: 'high' },
            temperature: { score: sleepFromTemp, impact: 'moderate' },
            activity: { score: sleepFromActivity, impact: 'high' }
          },
          recommendations: this.getSleepRecommendations(totalSleepQuality, { heartRate, temperature, activity })
        }
      }
    }
  }

  // 운동 효과 예측 모델 초기화
  initExerciseModel() {
    return {
      predict: (data) => {
        const { heartRate, activity, age, temperature } = data
        
        if (activity !== 'exercise') {
          return {
            exerciseScore: 0,
            exerciseEffect: 'none',
            recommendations: ['운동을 시작해보세요!']
          }
        }

        // 나이별 최대 심박수 계산
        const maxHR = 220 - age
        const targetHRMin = maxHR * 0.5
        const targetHRMax = maxHR * 0.85

        // 운동 강도 계산
        let exerciseIntensity = 0
        if (heartRate >= targetHRMin && heartRate <= targetHRMax) {
          exerciseIntensity = 0.8
        } else if (heartRate > targetHRMax) {
          exerciseIntensity = 0.6 // 과도한 운동
        } else {
          exerciseIntensity = 0.4 // 부족한 운동
        }

        // 체온 기반 운동 효과
        let tempEffect = 0
        if (temperature >= 36.5 && temperature <= 37.2) tempEffect = 0.9
        else if (temperature >= 36.0 && temperature <= 37.5) tempEffect = 0.6
        else tempEffect = 0.3

        const totalExerciseEffect = (exerciseIntensity * 0.7 + tempEffect * 0.3)
        
        return {
          exerciseScore: Math.round(totalExerciseEffect * 100),
          exerciseEffect: totalExerciseEffect > 0.7 ? 'excellent' : totalExerciseEffect > 0.5 ? 'good' : totalExerciseEffect > 0.3 ? 'fair' : 'poor',
          factors: {
            heartRate: { score: exerciseIntensity, impact: 'high' },
            temperature: { score: tempEffect, impact: 'moderate' }
          },
          recommendations: this.getExerciseRecommendations(totalExerciseEffect, { heartRate, age, temperature })
        }
      }
    }
  }

  // 심박수 변동성 계산 (HRV 시뮬레이션)
  calculateHRV(heartRate) {
    // 실제로는 연속된 심박수 데이터에서 계산
    // 여기서는 심박수 기반으로 근사치 계산
    const baseVariability = 50
    const hrFactor = Math.abs(heartRate - 70) / 10
    return Math.max(10, baseVariability - hrFactor * 5)
  }

  // 종합 건강 분석
  async analyzeHealth(vitalsData) {
    try {
      logger.info('Starting AI health analysis', { vitalsData })

      const results = {
        timestamp: new Date().toISOString(),
        cardiovascular: this.models.cardiovascular.predict(vitalsData),
        stress: this.models.stress.predict(vitalsData),
        sleep: this.models.sleep.predict(vitalsData),
        exercise: this.models.exercise.predict(vitalsData)
      }

      // 종합 건강 점수 계산
      const overallScore = this.calculateOverallScore(results)
      results.overall = {
        score: overallScore.score,
        level: overallScore.level,
        summary: this.generateHealthSummary(results),
        recommendations: this.generateOverallRecommendations(results)
      }

      logger.info('AI health analysis completed', { 
        overallScore: overallScore.score,
        level: overallScore.level 
      })

      return results
    } catch (error) {
      logger.error('AI health analysis failed', { error: error.message })
      throw error
    }
  }

  // 종합 건강 점수 계산
  calculateOverallScore(results) {
    const weights = {
      cardiovascular: 0.3,
      stress: 0.25,
      sleep: 0.25,
      exercise: 0.2
    }

    const scores = {
      cardiovascular: results.cardiovascular.riskScore,
      stress: 100 - results.stress.stressScore, // 스트레스는 낮을수록 좋음
      sleep: results.sleep.sleepScore,
      exercise: results.exercise.exerciseScore
    }

    const weightedScore = Object.keys(weights).reduce((total, key) => {
      return total + (scores[key] * weights[key])
    }, 0)

    const level = weightedScore >= 80 ? 'excellent' : 
                  weightedScore >= 60 ? 'good' : 
                  weightedScore >= 40 ? 'fair' : 'poor'

    return { score: Math.round(weightedScore), level }
  }

  // 건강 요약 생성
  generateHealthSummary(results) {
    const { cardiovascular, stress, sleep, exercise, overall } = results
    
    const summary = []
    
    if (overall.level === 'excellent') {
      summary.push('전반적으로 매우 건강한 상태입니다!')
    } else if (overall.level === 'good') {
      summary.push('건강한 상태를 유지하고 있습니다.')
    } else if (overall.level === 'fair') {
      summary.push('몇 가지 개선이 필요한 부분이 있습니다.')
    } else {
      summary.push('건강 상태에 주의가 필요합니다.')
    }

    if (cardiovascular.riskLevel === 'high') {
      summary.push('심혈관 건강에 특히 주의하세요.')
    }
    if (stress.stressLevel === 'high') {
      summary.push('스트레스 관리가 필요합니다.')
    }
    if (sleep.sleepQuality === 'poor') {
      summary.push('수면의 질을 개선해보세요.')
    }

    return summary.join(' ')
  }

  // 종합 추천사항 생성
  generateOverallRecommendations(results) {
    const recommendations = []
    const { cardiovascular, stress, sleep, exercise } = results

    // 심혈관 관련 추천
    if (cardiovascular.riskLevel === 'high') {
      recommendations.push('정기적인 심혈관 검진을 받으세요.')
      recommendations.push('저염식과 규칙적인 운동을 권장합니다.')
    }

    // 스트레스 관련 추천
    if (stress.stressLevel === 'high') {
      recommendations.push('명상이나 요가 등 스트레스 해소 활동을 해보세요.')
      recommendations.push('충분한 휴식을 취하세요.')
    }

    // 수면 관련 추천
    if (sleep.sleepQuality === 'poor') {
      recommendations.push('규칙적인 수면 패턴을 유지하세요.')
      recommendations.push('수면 전 디지털 기기 사용을 줄이세요.')
    }

    // 운동 관련 추천
    if (exercise.exerciseEffect === 'poor') {
      recommendations.push('주 3-4회 규칙적인 운동을 시작해보세요.')
    }

    return recommendations
  }

  // 각 모델별 추천사항 생성
  getCardiovascularRecommendations(risk, data) {
    const recommendations = []
    if (risk > 0.7) {
      recommendations.push('즉시 의료진과 상담하세요.')
      recommendations.push('심혈관 질환 예방을 위한 생활습관 개선이 필요합니다.')
    } else if (risk > 0.4) {
      recommendations.push('정기적인 건강검진을 받으세요.')
      recommendations.push('심혈관 건강을 위한 식단 조절을 권장합니다.')
    } else {
      recommendations.push('현재 심혈관 건강 상태가 양호합니다.')
    }
    return recommendations
  }

  getStressRecommendations(stress, data) {
    const recommendations = []
    if (stress > 0.7) {
      recommendations.push('전문적인 스트레스 관리 상담을 받으세요.')
      recommendations.push('충분한 휴식과 수면을 취하세요.')
    } else if (stress > 0.4) {
      recommendations.push('명상이나 깊은 호흡을 시도해보세요.')
      recommendations.push('스트레스 해소 활동을 찾아보세요.')
    } else {
      recommendations.push('스트레스 수준이 적절합니다.')
    }
    return recommendations
  }

  getSleepRecommendations(quality, data) {
    const recommendations = []
    if (quality < 0.3) {
      recommendations.push('수면 전문의와 상담을 고려하세요.')
      recommendations.push('수면 환경을 개선해보세요.')
    } else if (quality < 0.5) {
      recommendations.push('규칙적인 수면 스케줄을 만들어보세요.')
      recommendations.push('수면 전 카페인 섭취를 피하세요.')
    } else {
      recommendations.push('수면의 질이 양호합니다.')
    }
    return recommendations
  }

  getExerciseRecommendations(effect, data) {
    const recommendations = []
    if (effect < 0.3) {
      recommendations.push('운동 강도를 점진적으로 늘려보세요.')
      recommendations.push('운동 전 충분한 준비운동을 하세요.')
    } else if (effect < 0.5) {
      recommendations.push('운동 강도를 조금 더 높여보세요.')
      recommendations.push('다양한 운동을 시도해보세요.')
    } else {
      recommendations.push('운동 효과가 좋습니다.')
    }
    return recommendations
  }
}

// AI 분석 엔진 인스턴스
const healthAI = new HealthAnalysisAI()

// AI 분석 API 엔드포인트
export default async function handler(req, res) {
  const { method } = req

  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method Not Allowed' })
    return
  }

  try {
    const vitalsData = req.body
    
    // 필수 데이터 검증
    if (!vitalsData.heartRate || !vitalsData.temperature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required vitals data'
      })
    }

    // AI 분석 실행
    const analysis = await healthAI.analyzeHealth(vitalsData)
    
    res.status(200).json({
      success: true,
      data: analysis,
      message: 'AI health analysis completed successfully'
    })

  } catch (error) {
    logger.error('AI analysis API error', { error: error.message })
    res.status(500).json({
      success: false,
      message: 'AI analysis failed',
      error: error.message
    })
  }
}
