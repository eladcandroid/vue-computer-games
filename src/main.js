import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import './styles/bulma.min.css';
import './styles/fontawesome-all.min.css';
import './styles/style.css';

new Vue({
  render: h => h(App)
}).$mount('#app');
