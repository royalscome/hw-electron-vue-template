import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./router/permission";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App);
app.use(ElementPlus, {locale: zhCn }).use(store).use(router).mount("#app");
