import axios from 'axios'

// API 기본 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://greenweariot-production.up.railway.app'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // JWT 토큰이 있다면 헤더에 추가
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // 요청 로깅
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error(`API Error: ${error.response?.status} ${error.config?.url}`, error.message)
    if (error.response?.status === 401) {
      // 토큰 만료 시 로그아웃
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API 엔드포인트들
export const healthAPI = {
  // 헬스 체크
  check: () => api.get('/api/health'),
  
  // 실시간 생체신호 데이터 가져오기
  getVitals: () => api.get('/api/vitals'),
  
  // 생체신호 데이터 전송
  sendVitals: (data: any) => api.post('/api/vitals', data),
  
  // 생체신호 스트림 시작 (Node.js 백엔드에서는 지원하지 않음)
  startStream: () => Promise.resolve({ data: { message: 'Stream not supported, using polling' } }),
  
  // 생체신호 스트림 중지 (Node.js 백엔드에서는 지원하지 않음)
  stopStream: () => Promise.resolve({ data: { message: 'Stream not supported' } }),
}

export const authAPI = {
  // 로그인
  login: (credentials: { username: string; password: string }) =>
    api.post('/api/auth/signin', credentials),
  
  // 회원가입
  register: (userData: { username: string; email: string; password: string }) =>
    api.post('/api/auth/signup', userData),
  
  // 사용자 정보 가져오기
  getProfile: () => api.get('/api/auth/profile'),
}

export const wearableAPI = {
  // 웨어러블 데이터 가져오기
  getData: () => api.get('/api/wearable'),
  
  // 웨어러블 데이터 전송
  sendData: (data: any) => api.post('/api/wearable', data),
  
  // 웨어러블 상태 업데이트
  updateStatus: (status: any) => api.put('/api/wearable/status', status),
}

export default api