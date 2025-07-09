import axios from 'axios';

// API 기본 설정
const API_BASE_URL = 'http://localhost:8080/api';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - JWT 토큰 자동 첨부
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 로그아웃 처리
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 인증 API
export const authAPI = {
  // 로그인
  login: async (credentials) => {
    const response = await api.post('/auth/signin', credentials);
    if (response.data.token) {
      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  // 회원가입
  register: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  // 현재 사용자 정보 조회
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // 로그인 상태 확인
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },

  // 저장된 사용자 정보 조회
  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// 제품 API
export const productAPI = {
  // 모든 제품 조회 (페이징)
  getAllProducts: async (page = 0, size = 10, sortBy = 'id', sortDir = 'asc') => {
    const response = await api.get('/products', {
      params: { page, size, sortBy, sortDir }
    });
    return response.data;
  },

  // 이용 가능한 제품 조회
  getAvailableProducts: async () => {
    const response = await api.get('/products/available');
    return response.data;
  },

  // 카테고리별 제품 조회
  getProductsByCategory: async (category) => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  // 친환경 제품 조회
  getEcoFriendlyProducts: async (minRating = 3) => {
    const response = await api.get('/products/eco-friendly', {
      params: { minRating }
    });
    return response.data;
  },

  // 저탄소 제품 조회
  getLowCarbonProducts: async (maxFootprint = 5.0) => {
    const response = await api.get('/products/low-carbon', {
      params: { maxFootprint }
    });
    return response.data;
  },

  // 고재활용 제품 조회
  getHighRecycledProducts: async (minPercentage = 50) => {
    const response = await api.get('/products/high-recycled', {
      params: { minPercentage }
    });
    return response.data;
  },

  // 유기농 제품 조회
  getOrganicProducts: async () => {
    const response = await api.get('/products/organic');
    return response.data;
  },

  // 공정무역 제품 조회
  getFairTradeProducts: async () => {
    const response = await api.get('/products/fair-trade');
    return response.data;
  },

  // 제품 검색
  searchProducts: async (keyword) => {
    const response = await api.get('/products/search', {
      params: { keyword }
    });
    return response.data;
  },

  // 가격 범위별 제품 조회
  getProductsByPriceRange: async (minPrice, maxPrice) => {
    const response = await api.get('/products/price-range', {
      params: { minPrice, maxPrice }
    });
    return response.data;
  },

  // 특정 제품 조회
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // 제품 생성 (관리자용)
  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // 제품 수정 (관리자용)
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // 제품 삭제 (관리자용)
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }
};

// 헬스 체크 API
export const healthAPI = {
  checkHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

// 기본 export
export default api; 