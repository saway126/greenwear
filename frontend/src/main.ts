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

app.mount('#app'); 