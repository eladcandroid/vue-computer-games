import AddGame from './pages/AddGame.js';
import GamesList from './pages/GamesList.js';

const routes = [
  { path: '/', component: GamesList },
  { path: '/add', component: AddGame }
];

export default new VueRouter({
  routes // short for `routes: routes`
});