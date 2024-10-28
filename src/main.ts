import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import store, { key } from './store';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import i18n from './i18n';

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(router);
app.use(store, key);
app.use(vuetify);
app.use(i18n);

app.mount('#app');
