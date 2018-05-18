import dataService from './services/data.service.js';
import eventBus, {
  CHANGED_FILTER,
  CHANGED_SEARCH
} from './services/event-bus.service.js';

import Game from './components/game.component.js';
import GameFilter from './components/game-filter.component.js';
import GameSearch from './components/game-search.component.js';

import router from './router.js'

new Vue({
  el: '#app',
  router,
  components: {},
  created() {},
  beforeDestroy() {},
  mounted() {
    // dataService.storeData(this.games);
  },
  data() {
    return {};
  },
  methods: {},
  template: `
<div class="app-container">
    <nav class="navbar is-primary">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <!-- <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"> -->
          GAMES
        </a>
        <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link active-class="is-active" class="navbar-item" tag="a" to="/" :exact="true">Games List</router-link>
          <router-link active-class="is-active" class="navbar-item" tag="a" to="/add">Add a game</router-link>
        </div>

        <div class="navbar-end">
        </div>
      </div>
    </nav>

    <router-view></router-view>

  </div>
  `
});
