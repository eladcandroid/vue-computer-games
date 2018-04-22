export default Vue.component('game-filter', {
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
