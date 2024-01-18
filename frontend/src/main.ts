import { createPinia, Pinia } from 'pinia'
import { createApp } from 'vue'
import * as Sentry from "@sentry/vue"
import App from './App.vue'
import router from './router'
import { ObjectType } from './models/ObjectType'
import './style/core.css';

interface PiniaWithInstall extends Pinia {
  install: any;
}
const pinia = createPinia() as PiniaWithInstall;

const app = createApp(App);

Sentry.init({
  app,
  dsn: "https://71e2c0a7e3d6ef6c95f5113886a86033@o4506306172420096.ingest.sentry.io/4506306184806400",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      // tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
    new Sentry.Replay(),
  ],
  beforeSend(event) {
    if (event.tags?.itemType === ObjectType.COMPONENT) {
      if (event.exception && event.exception.values && event.exception.values.length) {
        event.message = `Component Error - ${event.exception.values[0].value}`;
      }
    }
    return event;
  },
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

app.use(router);
app.use(pinia);
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('ion-');
app.mount('#app');
