import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('ion-');
app.mount('#app');
//# sourceMappingURL=main.js.map