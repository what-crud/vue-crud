import TableFooter from '../components/TableFooter.vue'

export default {
  components: {
    TableFooter,
  },
  data () {
    return {
      tmp: '',
      pagination: {},
    }
  },
  computed: {
    cleanHeaders () {
      const headers = this.tableFields.map((field) => {
        const header = {}
        header.text = field.text
        header.value = field.name.toLowerCase()
        if (field.sortable !== undefined) {
          header.sortable = field.sortable
        }
        return header
      })
      return headers
    },
    headers () {
      const actionHeader = [
        {
          text: this.$t('global.datatable.fields.action'),
          value: 'actions',
          sortable: false,
        },
      ]
      return [
        ...actionHeader,
        ...this.cleanHeaders,
      ]
    },
    itemsPerPageOptions () {
      return [
        5,
        10,
        20,
        50,
        100,
      ]
    },
    footerProps () {
      return {
        showFirstLastPage: true,
        rowsPerPageText: this.$t('global.datatable.rowsPerPageText'),
        itemsPerPageOptions: this.itemsPerPageOptions,
      }
    },
  },
  methods: {
    setPage (page) {
      this.pagination.page = parseInt(page)
    },
    clearFilters () {
      this.pagination.page = 1
    },
  },
}
