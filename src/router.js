import VueRouter from 'vue-router';

import AddGame from './pages/AddGame.vue';
import GamesList from './pages/GamesList.vue';

const routes = [
  { path: '/', component: GamesList },
  { path: '/add', component: AddGame }
];

export default new VueRouter({
  routes // short for `routes: routes`
});
