import TableFooter from '../components/TableFooter.vue'

export default {
  components: {
    TableFooter,
  },
  data () {
    return {
      selectedStatuses: [1],
      filterColumns: [],
      tmp: '',
      search: '',
      pagination: {},
      excelLoading: false,
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
      const actionHeader = [{
        text: this.$t('global.datatable.fields.action'),
        value: 'actions',
        sortable: false,
      }]
      return [...actionHeader, ...this.cleanHeaders]
    },
    statuses () {
      return [
        {
          text: this.$t('global.datatable.status.active'),
          value: 1,
        },
        {
          text: this.$t('global.datatable.status.inactive'),
          value: 0,
        },
      ]
    },
    filterModes () {
      return [
        {
          name: 'like',
          text: this.$t('global.datatable.filterModes.options.like'),
        },
        {
          name: 'equals',
          text: this.$t('global.datatable.filterModes.options.equals'),
        },
        {
          name: 'list',
          text: this.$t('global.datatable.filterModes.options.list'),
        },
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
    updateColumnFilterMode (val, index) {
      const obj = this.filterColumns
      obj[index].mode = val
      this.$set(this, 'filterColumns', obj)
    },
    updateFilterColumns (val, index) {
      const obj = this.filterColumns
      obj[index].value = val
      this.$set(this, 'filterColumns', obj)
    },
    setPage (page) {
      this.pagination.page = parseInt(page)
    },
    clearFilters () {
      for (const column of this.filterColumns) {
        column.value = ''
      }
      this.pagination.page = 1
      this.search = ''
      this.selectedStatuses = [1]
    },
    setColumnTextModes (props) {
      const columnTextModes = {}
      for (const field of this.tableFields) {
        let textMode = 'cropped'
        if (field.textMode) {
          textMode = field.textMode
        }
        if (field.type === 'dynamic') {
          if (field.textModes) {
            const refField = props.item[field.typeField]
            if (field.textModes[refField]) {
              textMode = field.textModes[refField]
            }
          }
        }
        columnTextModes[field.name.toLowerCase()] = textMode
      }
      return columnTextModes
    },
    textMode (item, key) {
      const field = this.tableFields.find((field) => field.name === key) || {}
      let textMode = field.textMode || 'cropped'
      if (field.type === 'dynamic' && field.textModes) {
        const refField = item[field.typeField]
        if (field.textModes[refField]) {
          textMode = field.textModes[refField]
        }
      }
      return textMode
    },
  },
}
