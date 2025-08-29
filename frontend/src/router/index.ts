import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import AlertPage from '../pages/AlertPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import SignupPage from '../pages/SignupPage.vue';
import MyPage from '../pages/MyPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

const routes = [
  { 
    path: '/', 
    name: 'Home',
    component: MainPage,
    meta: { title: 'GreenWear - 홈' }
  },
  { 
    path: '/dashboard', 
    name: 'Dashboard',
    component: DashboardPage,
    meta: { title: 'GreenWear - 대시보드' }
  },
  { 
    path: '/alert', 
    name: 'Alert',
    component: AlertPage,
    meta: { title: 'GreenWear - 알림' }
  },
  { 
    path: '/login', 
    name: 'Login',
    component: LoginPage,
    meta: { title: 'GreenWear - 로그인' }
  },
  { 
    path: '/signup', 
    name: 'Signup',
    component: SignupPage,
    meta: { title: 'GreenWear - 회원가입' }
  },
  { 
    path: '/mypage', 
    name: 'MyPage',
    component: MyPage,
    meta: { title: 'GreenWear - 마이페이지' }
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: NotFoundPage,
    meta: { title: 'GreenWear - 페이지를 찾을 수 없습니다' }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 페이지 제목 설정
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

export default router; 