<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <!-- 헤더 -->
    <Header />
    
    <!-- 히어로 섹션 -->
    <section class="pt-20 pb-16 px-4">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          지속 가능한 패션, <span class="text-green-600">GreenWear</span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          친환경 의류로 지구를 보호하고, 스타일을 표현하세요. 
          재활용 소재와 유기농 원료로 만든 제품으로 더 나은 미래를 만들어가겠습니다.
        </p>
        <div class="flex justify-center space-x-4">
          <button 
            @click="scrollToProducts"
            class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            제품 둘러보기
          </button>
          <router-link 
            to="/login"
            class="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            시작하기
          </router-link>
        </div>
      </div>
    </section>

    <!-- 통계 섹션 -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-green-600 mb-2">{{ stats.totalProducts }}+</div>
            <div class="text-gray-600">친환경 제품</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-blue-600 mb-2">{{ stats.recycledItems }}+</div>
            <div class="text-gray-600">재활용 소재 제품</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-purple-600 mb-2">{{ stats.organicItems }}+</div>
            <div class="text-gray-600">유기농 인증 제품</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-yellow-600 mb-2">{{ stats.carbonSaved }}kg</div>
            <div class="text-gray-600">절약된 탄소량</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 추천 제품 섹션 -->
    <section ref="productsSection" class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">인기 친환경 제품</h2>
          <p class="text-gray-600">가장 인기 있는 친환경 의류를 만나보세요</p>
        </div>

        <!-- 로딩 상태 -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>

        <!-- 에러 상태 -->
        <div v-else-if="error" class="text-center py-12">
          <div class="text-red-600 mb-4">{{ error }}</div>
          <button 
            @click="loadProducts"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            다시 시도
          </button>
        </div>

        <!-- 제품 그리드 -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="product in featuredProducts" 
            :key="product.id"
            class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div class="h-64 bg-gray-200 relative">
              <img 
                v-if="product.imageUrl" 
                :src="product.imageUrl" 
                :alt="product.name"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
              <div v-else class="flex items-center justify-center h-full text-gray-400">
                이미지 없음
              </div>
              <!-- 환경 친화도 배지 -->
              <div class="absolute top-4 right-4">
                <div class="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  친환경 {{ product.ecoRating }}/5
                </div>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ product.description }}</p>
              
              <!-- 환경 정보 -->
              <div class="mb-4 space-y-2">
                <div v-if="product.recycledContentPercentage > 0" class="flex items-center text-sm text-green-600">
                  <span class="mr-2">♻️</span>
                  재활용 소재 {{ product.recycledContentPercentage }}%
                </div>
                <div v-if="product.isCertifiedOrganic" class="flex items-center text-sm text-blue-600">
                  <span class="mr-2">🌱</span>
                  유기농 인증
                </div>
                <div v-if="product.isFairTrade" class="flex items-center text-sm text-purple-600">
                  <span class="mr-2">🤝</span>
                  공정무역
                </div>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-gray-900">
                  {{ formatPrice(product.price) }}원
                </span>
                <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  상세보기
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 더 많은 제품 보기 버튼 -->
        <div class="text-center mt-12">
          <router-link 
            to="/products"
            class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            모든 제품 보기
          </router-link>
        </div>
      </div>
    </section>

    <!-- 환경 임팩트 섹션 -->
    <section class="py-16 bg-green-50">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">우리가 만드는 환경 임팩트</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-xl shadow-md">
            <div class="text-4xl mb-4">🌍</div>
            <h3 class="text-xl font-semibold mb-2">탄소 발자국 감소</h3>
            <p class="text-gray-600">재활용 소재 사용으로 제품당 평균 3kg의 CO2 절약</p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-md">
            <div class="text-4xl mb-4">💧</div>
            <h3 class="text-xl font-semibold mb-2">물 사용량 절약</h3>
            <p class="text-gray-600">친환경 생산 공정으로 70% 적은 물 사용</p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-md">
            <div class="text-4xl mb-4">♻️</div>
            <h3 class="text-xl font-semibold mb-2">순환 경제 기여</h3>
            <p class="text-gray-600">폐기물을 새로운 제품으로 재탄생</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 푸터 -->
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { productAPI, healthAPI } from '../services/api.js';

export default {
  name: 'MainPage',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      featuredProducts: [],
      loading: true,
      error: null,
      stats: {
        totalProducts: 0,
        recycledItems: 0,
        organicItems: 0,
        carbonSaved: 0
      }
    };
  },
  async mounted() {
    await this.checkBackendHealth();
    await this.loadProducts();
    await this.loadStats();
  },
  methods: {
    async checkBackendHealth() {
      try {
        const result = await healthAPI.checkHealth();
        console.log('Backend is running', result);
      } catch (error) {
        console.error('Backend health check failed:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          config: error.config
        });
      }
    },

    async loadProducts() {
      this.loading = true;
      this.error = null;
      
      try {
        // 인기 제품 조회 (친환경 제품 위주)
        const ecoProducts = await productAPI.getEcoFriendlyProducts(4);
        console.log('Loaded eco products:', ecoProducts);
        this.featuredProducts = ecoProducts.slice(0, 6); // 최대 6개만 표시
      } catch (error) {
        console.error('Failed to load products:', error);
        console.error('Product error details:', {
          message: error.message,
          code: error.code,
          status: error.response?.status,
          data: error.response?.data
        });
        this.error = '제품을 불러오는 중 오류가 발생했습니다. 백엔드 서버 상태를 확인해주세요.';
        
        // 백엔드가 없을 때 더미 데이터 표시
        this.featuredProducts = this.getDummyProducts();
      } finally {
        this.loading = false;
      }
    },

    async loadStats() {
      try {
        const allProducts = await productAPI.getAvailableProducts();
        console.log('Loaded all products for stats:', allProducts);
        const recycledProducts = allProducts.filter(p => p.recycledContentPercentage > 0);
        const organicProducts = allProducts.filter(p => p.isCertifiedOrganic);
        const totalCarbonSaved = allProducts.reduce((sum, p) => {
          return sum + (p.carbonFootprint ? 5 - p.carbonFootprint : 0);
        }, 0);

        this.stats = {
          totalProducts: allProducts.length,
          recycledItems: recycledProducts.length,
          organicItems: organicProducts.length,
          carbonSaved: Math.round(totalCarbonSaved)
        };
        console.log('Stats updated:', this.stats);
      } catch (error) {
        console.error('Failed to load stats:', error);
        console.error('Stats error details:', {
          message: error.message,
          code: error.code,
          status: error.response?.status,
          data: error.response?.data
        });
        // 기본 통계값 설정
        this.stats = {
          totalProducts: 10,
          recycledItems: 7,
          organicItems: 5,
          carbonSaved: 150
        };
      }
    },

    getDummyProducts() {
      return [
        {
          id: 1,
          name: '오가닉 코튼 베이직 티셔츠',
          description: '100% 유기농 코튼으로 만든 부드럽고 편안한 베이직 티셔츠입니다.',
          price: 35000,
          ecoRating: 5,
          recycledContentPercentage: 0,
          isCertifiedOrganic: true,
          isFairTrade: true,
          imageUrl: null
        },
        {
          id: 2,
          name: '재생 폴리에스터 데님',
          description: '페트병을 재활용한 폴리에스터와 유기농 코튼으로 만든 친환경 데님입니다.',
          price: 89000,
          ecoRating: 4,
          recycledContentPercentage: 85,
          isCertifiedOrganic: false,
          isFairTrade: false,
          imageUrl: null
        },
        {
          id: 3,
          name: '재생 플라스틱 가방',
          description: '바다에서 수거한 플라스틱 폐기물로 만든 방수 토트백입니다.',
          price: 95000,
          ecoRating: 5,
          recycledContentPercentage: 100,
          isCertifiedOrganic: false,
          isFairTrade: false,
          imageUrl: null
        }
      ];
    },

    formatPrice(price) {
      return new Intl.NumberFormat('ko-KR').format(price);
    },

    handleImageError(event) {
      event.target.style.display = 'none';
    },

    scrollToProducts() {
      this.$refs.productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 