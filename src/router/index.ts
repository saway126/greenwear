import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/generator',
    name: 'Generator',
    component: () => import('@/views/GeneratorView.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/HistoryView.vue')
  },
  {
    path: '/templates',
    name: 'Templates',
    component: () => import('@/views/TemplatesView.vue')
  },
  {
    path: '/result/:id',
    name: 'Result',
    component: () => import('@/views/ResultView.vue'),
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue')
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
  const baseTitle = '📝 Blog Promotion Generator'
  const routeTitle = to.meta?.title as string
  document.title = routeTitle ? `${routeTitle} | ${baseTitle}` : baseTitle
  
  next()
})

export default router 