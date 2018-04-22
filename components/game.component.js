export default Vue.component('game', {
  props: ['game'],
  data() {
    return {
      isEditPriceMode: false,
      editedPrice: this.game.price,
      rate: 3.506
    };
  },
  computed: {
    calcRate() {
      return Math.trunc(this.game.price * this.rate);
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
