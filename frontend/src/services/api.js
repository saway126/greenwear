import axios from 'axios'
import { mockApiService } from './mockApi'

// API 기본 설정
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Mock API 사용 여부 (GitHub Pages에서는 기본적으로 Mock API 사용)
let useMockApi = true

// API 연결 상태 확인
async function checkApiConnection() {
  try {
    const response = await api.get('/health')
    useMockApi = false
    return true
  } catch (error) {
    console.log('🔌 Backend API 연결 실패, Mock API로 전환합니다.')
    useMockApi = true
    return false
  }
}

// 초기 연결 상태 확인 (GitHub Pages에서는 건너뛰기)
// checkApiConnection()

// API 서비스 클래스
export class ApiService {
  // Health check
  static async getHealth() {
    if (useMockApi) {
      return await mockApiService.getHealth()
    }
    
    try {
      const response = await api.get('/health')
      return {
        success: true,
        data: response.data,
        message: '백엔드 API가 정상 작동 중입니다.',
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      // 백엔드 실패 시 Mock API로 전환
      useMockApi = true
      return await mockApiService.getHealth()
    }
  }

  // Vitals 평가
  static async evaluateVitals(vitalsData) {
    if (useMockApi) {
      return await mockApiService.evaluateVitals(vitalsData)
    }
    
    try {
      const response = await api.post('/vitals/evaluate', vitalsData)
      return {
        success: true,
        data: response.data,
        message: '생체신호 평가가 완료되었습니다.',
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      // 백엔드 실패 시 Mock API로 전환
      useMockApi = true
      return await mockApiService.evaluateVitals(vitalsData)
    }
  }

  // Vitals 샘플 업로드
  static async uploadVitalsSample(sampleData) {
    if (useMockApi) {
      return await mockApiService.uploadSample(sampleData)
    }
    
    try {
      const response = await api.post('/vitals/samples', sampleData)
      return {
        success: true,
        data: response.data,
        message: '샘플이 성공적으로 업로드되었습니다.',
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      // 백엔드 실패 시 Mock API로 전환
      useMockApi = true
      return await mockApiService.uploadSample(sampleData)
    }
  }

  // Vitals 히스토리 조회
  static async getVitalsHistory() {
    if (useMockApi) {
      return await mockApiService.getVitalsHistory()
    }
    
    try {
      const response = await api.get('/vitals/history')
      return {
        success: true,
        data: response.data,
        message: '히스토리를 조회했습니다.',
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      // 백엔드 실패 시 Mock API로 전환
      useMockApi = true
      return await mockApiService.getVitalsHistory()
    }
  }

  // Mock 실시간 데이터 생성
  static async generateMockVitals() {
    return await mockApiService.generateMockVitals()
  }

  // API 연결 상태 확인
  static async checkConnection() {
    return await checkApiConnection()
  }

  // Mock API 사용 여부 확인
  static isUsingMockApi() {
    return useMockApi
  }
}

// 기존 함수들 (하위 호환성 유지)
export const getHealth = () => ApiService.getHealth()
export const evaluateVitals = (data) => ApiService.evaluateVitals(data)
export const uploadVitalsSample = (data) => ApiService.uploadVitalsSample(data)
export const getVitalsHistory = () => ApiService.getVitalsHistory()
export const generateMockVitals = () => ApiService.generateMockVitals()

// API 상태 정보
export const getApiStatus = () => ({
  isMock: useMockApi,
  baseUrl: API_BASE_URL,
  timestamp: new Date().toISOString()
})

// 인증 API (Mock 구현)
export const authAPI = {
  // 로그인
  login: async (credentials) => {
    // Mock 로그인 응답
    const mockUser = {
      id: 1,
      username: credentials.username || 'user',
      email: credentials.email || 'user@example.com',
      token: 'mock_token_' + Date.now(),
      role: 'USER'
    }
    
    localStorage.setItem('accessToken', mockUser.token)
    localStorage.setItem('user', JSON.stringify(mockUser))
    
    return {
      success: true,
      user: mockUser,
      message: 'Mock 로그인이 성공했습니다.'
    }
  },

  // 회원가입
  register: async (userData) => {
    return {
      success: true,
      message: 'Mock 회원가입이 성공했습니다.',
      user: {
        id: Date.now(),
        ...userData
      }
    }
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
  },

  // 현재 사용자 정보 조회
  getCurrentUser: async () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // 로그인 상태 확인
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken')
  },

  // 저장된 사용자 정보 조회
  getStoredUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
}

// 제품 API (Mock 구현)
export const productAPI = {
  // 모든 제품 조회
  getAllProducts: async (page = 0, size = 10) => {
    const mockProducts = [
      {
        id: 1,
        name: '친환경 티셔츠',
        category: '의류',
        price: 25000,
        rating: 4.5,
        ecoScore: 85
      },
      {
        id: 2,
        name: '재활용 가방',
        category: '가방',
        price: 15000,
        rating: 4.2,
        ecoScore: 90
      }
    ]
    
    return {
      content: mockProducts,
      totalElements: mockProducts.length,
      totalPages: 1,
      size,
      number: page
    }
  },

  // 이용 가능한 제품 조회
  getAvailableProducts: async () => {
    return [
      { id: 1, name: '친환경 티셔츠', available: true },
      { id: 2, name: '재활용 가방', available: true }
    ]
  },

  // 친환경 제품 조회
  getEcoFriendlyProducts: async (minRating = 3) => {
    return [
      { id: 1, name: '친환경 티셔츠', rating: 4.5, ecoScore: 85 },
      { id: 2, name: '재활용 가방', rating: 4.2, ecoScore: 90 }
    ].filter(p => p.rating >= minRating)
  },

  // 기타 제품 API들...
  getProductsByCategory: async () => [],
  getLowCarbonProducts: async () => [],
  getHighRecycledProducts: async () => [],
  getOrganicProducts: async () => [],
  getFairTradeProducts: async () => [],
  searchProducts: async () => [],
  getProductsByPriceRange: async () => [],
  getProductById: async () => ({}),
  createProduct: async () => ({}),
  updateProduct: async () => ({}),
  deleteProduct: async () => ({})
}

// 헬스 체크 API
export const healthAPI = {
  checkHealth: async () => {
    return ApiService.getHealth()
  }
}

// 기본 export
export default api 