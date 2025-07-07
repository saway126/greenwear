import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import AlertPage from '../pages/AlertPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import SignupPage from '../pages/SignupPage.vue';
import MyPage from '../pages/MyPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

const routes = [
  { path: '/', component: MainPage },
  { path: '/dashboard', component: DashboardPage },
  { path: '/alert', component: AlertPage },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { path: '/mypage', component: MyPage },
  { path: '/:pathMatch(.*)*', component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 