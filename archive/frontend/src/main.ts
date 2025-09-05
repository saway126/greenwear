import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { attachRouteCancel } from './utils/routeCancel';
import './index.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// 라우트 변경 시 HTTP 요청 자동 취소
attachRouteCancel(router);

// 백엔드 API 연결 테스트
console.log('🚀 GreenWear 앱 시작!');
console.log('🔗 백엔드 API URL:', 'https://greenwear-backend-node-production-1583.up.railway.app');

// 즉시 백엔드 연결 테스트
fetch('https://greenwear-backend-node-production-1583.up.railway.app/api/health')
  .then(response => response.json())
  .then(data => {
    console.log('✅ 백엔드 API 연결 성공!', data);
  })
  .catch(error => {
    console.log('❌ 백엔드 API 연결 실패:', error);
  });

app.mount('#app'); 