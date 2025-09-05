import { evaluateVitals, type VitalsInput } from '../utils/vitalsColor'

// Mock API 응답 타입
export interface MockApiResponse<T> {
  success: boolean
  data: T
  message: string
  timestamp: string
}

// Mock API 서비스
export class MockApiService {
  private static instance: MockApiService
  private vitalsHistory: Array<{
    id: string
    timestamp: string
    input: VitalsInput
    result: any
  }> = []

  static getInstance(): MockApiService {
    if (!MockApiService.instance) {
      MockApiService.instance = new MockApiService()
    }
    return MockApiService.instance
  }

  // Health check
  async getHealth(): Promise<MockApiResponse<any>> {
    return {
      success: true,
      data: {
        status: 'ok',
        service: 'GreenWear Mock API',
        version: '1.0.0',
        timestamp: new Date().toISOString()
      },
      message: 'Mock API 서비스가 정상 작동 중입니다.',
      timestamp: new Date().toISOString()
    }
  }

  // Vitals 평가
  async evaluateVitals(input: VitalsInput): Promise<MockApiResponse<any>> {
    try {
      const result = evaluateVitals(input)
      
      // 히스토리에 저장
      const record = {
        id: `mock_${Date.now()}`,
        timestamp: new Date().toISOString(),
        input,
        result
      }
      this.vitalsHistory.unshift(record)
      
      // 최대 100개만 유지
      if (this.vitalsHistory.length > 100) {
        this.vitalsHistory = this.vitalsHistory.slice(0, 100)
      }

      return {
        success: true,
        data: result,
        message: '생체신호 평가가 완료되었습니다.',
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: `평가 중 오류가 발생했습니다: ${error}`,
        timestamp: new Date().toISOString()
      }
    }
  }

  // Vitals 샘플 업로드
  async uploadSample(sample: any): Promise<MockApiResponse<any>> {
    try {
      const result = {
        id: `sample_${Date.now()}`,
        timestamp: new Date().toISOString(),
        sample,
        status: 'uploaded'
      }

      return {
        success: true,
        data: result,
        message: '샘플이 성공적으로 업로드되었습니다.',
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: `업로드 중 오류가 발생했습니다: ${error}`,
        timestamp: new Date().toISOString()
      }
    }
  }

  // Vitals 히스토리 조회
  async getVitalsHistory(): Promise<MockApiResponse<any>> {
    return {
      success: true,
      data: this.vitalsHistory,
      message: '생체신호 히스토리를 조회했습니다.',
      timestamp: new Date().toISOString()
    }
  }

  // Mock 실시간 데이터 생성
  async generateMockVitals(): Promise<MockApiResponse<any>> {
    const mockData = {
      hr: Math.floor(Math.random() * 60) + 50, // 50-110 bpm
      spo2: Math.floor(Math.random() * 10) + 90, // 90-99%
      coreTempC: (Math.random() * 2) + 36.5, // 36.5-38.5°C
      rr: Math.floor(Math.random() * 10) + 12, // 12-22 breaths/min
      skinTempDeltaC: (Math.random() * 2) - 1, // -1 to +1°C
      timestamp: new Date().toISOString()
    }

    const input: VitalsInput = {
      mode: 'rest',
      ...mockData
    }

    const result = await this.evaluateVitals(input)

    return {
      success: true,
      data: {
        mockData,
        evaluation: result.data
      },
      message: 'Mock 실시간 데이터가 생성되었습니다.',
      timestamp: new Date().toISOString()
    }
  }
}

// 싱글톤 인스턴스 export
export const mockApiService = MockApiService.getInstance()
