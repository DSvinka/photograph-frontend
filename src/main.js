import { createApp } from 'vue'
import App from './App.vue'

import MasonryWall from '@yeger/vue-masonry-wall'
import vuetify from "./plugins/vuetify";
import vueQuery from "./plugins/vueQuery";
import pinia from "./stores/index";
import router from "./router";

import 'mosha-vue-toastify/dist/style.css';

createApp(App)
    .use(vuetify)
    .use(vueQuery)
    .use(router)
    .use(pinia)
    .use(MasonryWall)
    .mount('#app');
