import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// 요청 인터셉터 - 토큰 자동 첨부
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// 응답 인터셉터 - 401 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      if (window.location.pathname !== '/') window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

// ── 헬스 체크 ─────────────────────────────────────────────────────────────────
export const healthAPI = {
  check:       ()       => api.get('/api/health'),
  getVitals:   ()       => api.get('/api/vitals'),
  sendVitals:  (data: any) => api.post('/api/vitals', data),
  aiAnalysis:  (data: any) => api.post('/api/ai-analysis', data),
  // 실시간 스트림은 SSE (EventSource)로 직접 연결
  getStreamUrl: () => `${API_BASE_URL}/api/vitals-stream`,
}

// ── 인증 ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  login:    (data: { email?: string; username?: string; password: string }) =>
    api.post('/api/auth/login', data),
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/api/auth/register', data),
  me:       () => api.get('/api/auth/me'),
  profile:  () => api.get('/api/auth/profile'),
  logout:   () => api.post('/api/auth/logout'),

  // 기존 코드 호환
  signin:  (data: { username: string; password: string }) =>
    api.post('/api/auth/login', { email: data.username, password: data.password }),
  signup:  (data: { username: string; email: string; password: string }) =>
    api.post('/api/auth/register', { name: data.username, email: data.email, password: data.password }),
  getProfile: () => api.get('/api/auth/profile'),
}

// ── 웨어러블 ──────────────────────────────────────────────────────────────────
export const wearableAPI = {
  getData:      (deviceId?: string, limit?: number) =>
    api.get('/api/wearable', { params: { deviceId, limit } }),
  sendData:     (data: any) => api.post('/api/wearable/data', data),
  updateStatus: (status: any) => api.put('/api/wearable/status', status),
  getDevices:   () => api.get('/api/wearable/devices'),
  getRealtime:  (deviceId?: string) =>
    api.get('/api/wearable/realtime', { params: { deviceId } }),
  getAlerts:    () => api.get('/api/wearable/alerts'),
  getDeviceStats: (deviceId: string) =>
    api.get(`/api/wearable/devices/${deviceId}/stats`),
}

// ── 상품 ──────────────────────────────────────────────────────────────────────
export const productsAPI = {
  getAll:   (params?: { category?: string; minScore?: number }) =>
    api.get('/api/products', { params }),
  getById:  (id: number) => api.get(`/api/products/${id}`),
  create:   (data: any) => api.post('/api/products', data),
}

// ── 알림 ──────────────────────────────────────────────────────────────────────
export const notificationsAPI = {
  getAll:    (limit?: number) => api.get('/api/notifications', { params: { limit } }),
  markRead:  (id: number) => api.patch(`/api/notifications/${id}/read`, {}),
}

// ── 모니터링 ──────────────────────────────────────────────────────────────────
export const monitoringAPI = {
  getMetrics: () => api.get('/api/monitoring?type=metrics'),
  getLogs:    (level?: string) => api.get('/api/monitoring', { params: { type: 'logs', level } }),
  getHealth:  () => api.get('/api/monitoring?type=health'),
}

export default api
