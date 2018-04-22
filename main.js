import dataService from './services/data.service.js';
import eventBus, {
  CHANGED_FILTER,
  CHANGED_SEARCH
} from './services/event-bus.service.js';

import Game from './components/game.component.js';
import GameFilter from './components/game-filter.component.js';
import GameSearch from './components/game-search.component.js';

new Vue({
  el: '#app',
  components: {
    game: Game,
    'game-filter': GameFilter,
    'game-search': GameSearch
  },
  created() {
    dataService.query().then(games => {
      this.games = games;
      console.log('games', games);
    });
    eventBus.$on(CHANGED_FILTER, this.changeFilter);
    eventBus.$on(CHANGED_SEARCH, this.changeSearch);
  },
  beforeDestroy() {
    eventBus.$off(CHANGED_FILTER, this.changeFilter);
    eventBus.$off(CHANGED_SEARCH, this.changeSearch);
  },
  mounted() {
    // dataService.storeData(this.games);
  },
  data: {
    selectedGame: 0,
    selectedId: 0,
    filter: null,
    search: null,
    games: []
  },
  methods: {
    clickGame(id) {
      this.selectedId = id;
    },
    onSave(data) {
      console.log('onSave', data);
      dataService.storeData(this.games);
    },
    changeFilter(filter) {
      this.filter = filter;
      dataService.query(filter, this.search).then(games => {
        this.games = games;
        console.log('games', games);
      });
    },
    changeSearch(search) {
      this.search = search;
      dataService.query(this.filter, search).then(games => {
        this.games = games;
        console.log('games', games);
      });
    }
  },
  template: `
  <div class="app-container">
    <game-filter @change-filter="changeFilter($event)"></game-filter><br/>
    <game-search @change-search="changeSearch($event)"></game-search><br/>
    <div class="columns is-multiline">
      <div class="column is-one-quarter" v-for="game in games">
        <game @save-game="onSave($event)" :game="game" :key="game.id" @click.native="clickGame(game.id)" :class="{'selected': selectedId === game.id}"></game>
      </div>
    </div>
    </div>
  `
});
