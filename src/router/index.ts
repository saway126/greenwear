import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '홈' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { title: '실시간 대시보드' }
  },
  {
    path: '/generator',
    name: 'Generator',
    component: () => import('@/views/GeneratorView.vue'),
    meta: { title: '설정 생성기' }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/HistoryView.vue'),
    meta: { title: '모니터링 기록' }
  },
  {
    path: '/templates',
    name: 'Templates',
    component: () => import('@/views/TemplatesView.vue'),
    meta: { title: '모니터링 템플릿' }
  },
  {
    path: '/clothing-sim',
    name: 'ClothingSim',
    component: () => import('@/views/ClothingSimView.vue'),
    meta: { title: '의류 시뮬레이터' }
  },
  {
    path: '/result/:id',
    name: 'Result',
    component: () => import('@/views/ResultView.vue'),
    props: true,
    meta: { title: '분석 결과' }
  },
  {
    path: '/api-docs',
    name: 'ApiDocs',
    component: () => import('@/views/ApiDocsView.vue'),
    meta: { title: 'API 문서' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: '로그인' }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/SignupView.vue'),
    meta: { title: '회원가입' }
  },
  {
    path: '/profile-settings',
    name: 'ProfileSettings',
    component: () => import('@/views/ProfileSettingsView.vue'),
    meta: { title: '바이오 설정' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '페이지를 찾을 수 없습니다' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // 페이지 타이틀 설정
  const baseTitle = 'GreenWear - 실시간 생체신호 모니터링'
  const routeTitle = to.meta?.title as string
  document.title = routeTitle ? `${routeTitle} | ${baseTitle}` : baseTitle
  
  // 인증 체크
  const publicPages = ['/', '/login', '/signup', '/api-docs']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('gw_token')

  if (authRequired && !loggedIn) {
    alert('보안 관제 구역 진입을 위해 로그인이 필요합니다. 로그인 화면으로 연결합니다.')
    return next('/login')
  }
  
  next()
})

export default router 