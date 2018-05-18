export default Vue.component('game-search', {
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