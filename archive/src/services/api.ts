import axios from 'axios'

// API 기본 설정
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// API Key 인터셉터
api.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem('apiKey')
  if (apiKey) {
    config.headers['X-API-Key'] = apiKey
  }
  return config
})

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// 생체신호 관련 API
export const vitalsAPI = {
  // 샘플 데이터 전송
  sendSample: async (data: { heartRate: number; oxygen: number; temperature: number }) => {
    return api.post('/api/vitals/samples', data)
  },

  // 상태 평가 (공개)
  evaluate: async (data: { heartRate: number; oxygen: number; temperature: number }) => {
    return api.post('/api/vitals/evaluate', data)
  },

  // 실시간 스트림 연결
  getStream: () => {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
    return new EventSource(`${baseURL}/api/vitals/stream`)
  },

  // 히스토리 조회
  getHistory: async (limit = 50) => {
    return api.get(`/api/vitals/history?limit=${limit}`)
  }
}

// 템플릿 관련 API
export const templatesAPI = {
  // 템플릿 목록 조회
  getTemplates: async () => {
    return api.get('/api/templates')
  },

  // 템플릿 생성
  createTemplate: async (data: { name: string; config: any }) => {
    return api.post('/api/templates', data)
  }
}

export default api
