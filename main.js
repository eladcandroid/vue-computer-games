const RATE = 3.506;
import dataService from './services/data.service.js';
import eventBus, {
  CHANGED_FILTER,
  CHANGED_SEARCH
} from './services/event-bus.service.js';

Vue.component('game-filter', {
  // props: ['game'],
  data() {
    return {
      filter: { prop: 'type', value: '' },
      selected: ''
    };
  },
  computed: {},
  methods: {
    changeFilter() {
      this.filter.value = this.selected;
      console.log('changeFilter', this.selected);
      this.$emit('change-filter', this.filter);
      // EVENT BUS USE
      // eventBus.$emit(CHANGED_FILTER, this.filter);
    }
  },
  template: `
<div>
  Filter by: <br/>Group: <select @change="changeFilter" v-model="selected">
  <option value="">All</option>
  <option>Quest</option>
  <option>Shooting</option>
  <option>Strategy</option>
</select>

</div>
`
});
Vue.component('game-search', {
  // props: ['game'],
  data() {
    return {
      search: { prop: 'title', value: '' },
      searched: ''
    };
  },
  computed: {},
  methods: {
    changeSearch() {
      this.search.value = this.searched;
      console.log('changeSearch', this.search);
      this.$emit('change-search', this.search);
      // EVENT BUS USE
      // eventBus.$emit(CHANGED_SEARCH, this.search);
    }
  },
  template: `
<div>
  Search by: <input type="text" @input="changeSearch" v-model="searched"/>
</div>
`
});

Vue.component('game', {
  props: ['game'],
  data() {
    return {
      isEditPriceMode: false,
      editedPrice: this.game.price
    };
  },
  computed: {
    calcRate() {
      return Math.trunc(this.game.price * RATE);
    }
  },
  methods: {
    saveEditedPrice() {
      this.game.price = this.editedPrice;
      this.isEditPriceMode = false;
      this.$emit('save-game', this.game);
    },
    cancelEditedPrice() {
      this.editedPrice = this.game.price;
      this.isEditPriceMode = false;
    }
  },
  template: `
<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img :src="game.image" alt="">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">{{game.title}}</p>
        <p class="subtitle is-6">{{game.type}}</p>
      </div>
    </div>

    <div class="content">      
      <div v-if="!isEditPriceMode">
        <span class="price">Price: {{game.price}}$</span>
        <span class="editIcon icon" @click="isEditPriceMode = true"><i class="fas fa-edit"></i></span>
      </div>
      <div v-else="isEditPriceMode">
        <input type="text" v-model="editedPrice">
        <button @click="saveEditedPrice()">Save</button>
        <button @click="cancelEditedPrice()">Cancel</button>
      </div>

      <div class="price-nis">NIS: {{calcRate}} ₪</div>
    </div>
  </div>
</div>
`
});

new Vue({
  el: '#app',
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
