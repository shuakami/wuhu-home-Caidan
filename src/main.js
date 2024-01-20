import { createApp } from "vue";
import "@/style/style.scss";
import App from "@/App.vue";
import '@fortawesome/fontawesome-free/css/all.css';
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/reset.css';


// Vuex
import store from './store/msg'; // 确保路径正确

// Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);

// Element UI
app.use(Antd);

// Vuex
app.use(store);

// Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

// 挂载应用
app.mount('#app');

// PWA
navigator.serviceWorker.addEventListener("controllerchange", () => {
  // 弹出更新提醒
  console.log("站点已更新，刷新后生效");
  ElMessage("站点已更新，刷新后生效");
});
