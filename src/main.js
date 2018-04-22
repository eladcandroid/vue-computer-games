import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router.js';

Vue.config.productionTip = false;
Vue.use(VueRouter);

import './styles/bulma.min.css';
import './styles/fontawesome-all.min.css';
import './styles/style.css';

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
