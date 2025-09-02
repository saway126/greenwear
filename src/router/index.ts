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
    path: '/result/:id',
    name: 'Result',
    component: () => import('@/views/ResultView.vue'),
    props: true,
    meta: { title: '분석 결과' }
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
  
  next()
})

export default router 