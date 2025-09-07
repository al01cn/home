import { createApp } from "vue";
import 'element-plus/dist/index.css'
// if you just want to import css
import 'element-plus/theme-chalk/dark/css-vars.css'
import "@/style/style.scss";
import App from "@/App.vue";
// 引入 pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// 引入确认框组件
import ConfirmDialog from "@/components/ConfirmDialog.vue";
// swiper
import "swiper/css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 注册全局组件
app.component('ConfirmDialog', ConfirmDialog);

app.use(pinia);
app.mount("#app");

// PWA
navigator.serviceWorker.addEventListener("controllerchange", () => {
  // 弹出更新提醒
  console.log("站点已更新，刷新后生效");
  ElMessage("站点已更新，刷新后生效");
});