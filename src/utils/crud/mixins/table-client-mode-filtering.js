
export default {
  computed: {
    filteredItems () {
      let items = [
        'soft',
        'both',
      ].includes(this.deleteMode)
        ? this.items.filter(item => this.selectedStatuses.includes(parseInt(item.meta.active)))
        : this.items

      const { columnFilters } = this
      items = items.filter((item) => {
        let found = true
        for (let i = 0; i < columnFilters.length; i++) {
          if (columnFilters[i].value !== '') {
            found = false
            const colName = columnFilters[i].name
            let field = item[colName]
            if (typeof field === 'string' || field instanceof String || typeof field === 'number') {
              field = field.toString().toLowerCase()
              switch (columnFilters[i].mode) {
                case 'like':
                  if (field.includes(columnFilters[i].value)) {
                    found = true
                  }
                  break
                case 'equals':
                  if (field === columnFilters[i].value) {
                    found = true
                  }
                  break
                case 'list':
                  const tmpList = columnFilters[i].value.split(';')
                  if (tmpList.includes(field)) {
                    found = true
                  }
                  break
                default:
                  break
              }
            }
            if (!found) break
          }
        }
        return found
      })

      const phrases = this.search === '' ? [] : this.search.toLowerCase().split(' ')
      items = items.filter((item) => {
        let found = true
        for (let i = 0; i < phrases.length; i++) {
          found = false
          for (const key in item) {
            let field = item[key]
            if (
              typeof field === 'string' ||
              field instanceof String ||
              typeof field === 'number'
            ) {
              field = field.toString().toLowerCase()
              if (field.includes(phrases[i])) {
                found = true
              }
            }
          }
          if (!found) break
        }
        return found
      })

      return items
    },
  },
  methods: {
    getItemIndex (id) {
      return this.filteredItems.map((item) => item.meta.id).indexOf(id)
    },
    exportToExcel () {
      this.excelLoading = true
      const headers = this.cleanHeaders.map(header => header.text)
      const data = this.filteredItems.map((item) => {
        const row = []
        for (const header of this.cleanHeaders) {
          row.push(item[header.value])
        }
        return row
      })
      import('../vendor/Export2Excel').then((excel) => {
        this.excelLoading = false
        excel.export_json_to_excel({
          header: headers,
          data,
          filename: this.excelName,
          autoWidth: true,
          bookType: 'xlsx',
        })
      })
    },
    startSearching () {},
  },
  watch: {
    selectedStatuses () {
      this.pagination.page = 1
    },
  },
}
