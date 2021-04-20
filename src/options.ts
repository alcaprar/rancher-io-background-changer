import { ChromeStorage } from "./utils/ChromeStorage"
declare var Vue :any;

new Vue({
  el: '#app',
  data () {
    return {
      items: []
    }
  },
  async mounted () {
    this.storage = new ChromeStorage();
    await this.loadInitialData()
  },
  methods: {
    deleteRow (event, index) {
      if (index < this.items.length) {
        this.items.splice(index, 1)
      }
    },
    getLastItem () {
      return this.items.length > 0 ?
        this.items[this.items.length - 1] :
        null;
    },
    isRowEmpty (rowItem) {
      return !rowItem.baseUrl && !rowItem.string && !rowItem.backgroundColor
    },
    addEmptyItem () {
      this.items.push({
        rancherUrl : '',
        string: '',
        backgroundColor: ''
      })
    },
    addRow () {
      const lastItem = this.getLastItem();
      if (!this.isRowEmpty(lastItem)) {
        this.addEmptyItem()
      }
    },
    async loadInitialData () {
      this.items = await this.storage.getOneAsync('items');
    },
    async saveChanges () {
      await this.storage.setOneAsync('items', this.items)
      alert('Saved.')
    }
  }
})