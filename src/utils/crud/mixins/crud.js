export default {
  data () {
    return {
      search: '',
      selectedStatuses: [1],
      columnFilters: [],
      excelLoading: false,
    }
  },
  methods: {
    updateColumnFilterMode (val, index) {
      const obj = this.columnFilters
      obj[index].mode = val
      this.$set(this, 'columnFilters', obj)
      this.startSearching()
    },
    updateColumnFilterValue (val, index) {
      const obj = this.columnFilters
      obj[index].value = val
      this.$set(this, 'columnFilters', obj)
      this.startSearching()
    },
    updateColumnFilters (columnFilters) {
      this.$set(this, 'columnFilters', columnFilters)
      this.startSearching()
    },
    updateSearch (search) {
      this.search = search
      this.startSearching()
    },
    updateSelectedStatuses (statuses) {
      this.selectedStatuses = statuses
      this.startSearching()
    },
  },
  created () {
    this.columnFilters = this.tableFields.map((field) => {
      const item = {}
      item.mode = 'like'
      item.text = field.text
      item.name = field.name.toLowerCase()
      item.column = field.column
      item.value = ''
      return item
    })
  },
}
