import { createPinia, Pinia } from 'pinia'
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

interface PiniaWithInstall extends Pinia {
  install: any;
}
const pinia = createPinia() as PiniaWithInstall;

const app = createApp(App);
app.use(router);
app.use(pinia);
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('ion-');
app.mount('#app');
