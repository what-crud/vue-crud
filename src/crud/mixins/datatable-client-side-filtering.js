
export default {
    created() {
      this.filterColumns = this.tableFields.map(field => {
        let item = {};
        item.mode = 'like'
        item.text = field.text;
        item.name = field.name.toLowerCase();
        item.column = field.column
        item.value = ''
        return item;
      });
    },
    watch: {
      selectedStatuses(val) {
         this.pagination.page = 1
      },
    },
    computed: {
      filteredItems() {
  
        let items = ['soft', 'both'].includes(this.deleteMode)
          ? this.items.filter(item =>
              this.selectedStatuses.includes(parseInt(item.meta.active))
            )
          : this.items;
  
        let filterColumns = this.filterColumns
        items = items.filter(item => {
          let found = true;
          for (let i = 0; i < filterColumns.length; i++) {
            if(filterColumns[i].value != ''){
              found = false;
              let colName = filterColumns[i].name
              let field = item[colName];
              if (typeof field === "string" || field instanceof String || typeof field === "number") {
                field = field.toString().toLowerCase();
                switch (filterColumns[i].mode) {
                  case 'like':
                    if (field.includes(filterColumns[i].value)) {
                      found = true;
                    }
                    break;
                  case 'equals':
                    if (field == filterColumns[i].value) {
                      found = true;
                    }
                    break;
                  case 'list':
                    let tmpList = filterColumns[i].value.split(';')
                    if (tmpList.includes(field)) {
                      found = true;
                    }
                    break;
                  default:
                      break;
                }
              }
              if (!found) break;
            }
          }
          return found;
        });
  
        let phrases = this.search == "" ? [] : this.search.toLowerCase().split(" ");
        items = items.filter(item => {
          let found = true;
          for (let i = 0; i < phrases.length; i++) {
            found = false;
            for (let key in item) {
              let field = item[key];
              if (
                typeof field === "string" ||
                field instanceof String ||
                typeof field === "number"
              ) {
                field = field.toString().toLowerCase();
                if (field.includes(phrases[i])) {
                  found = true;
                }
              }
            }
            if (!found) break;
          }
          return found;
        });
  
        return items;
      }
    },
    methods: {
      exportToExcel() {
        let headers = this.cleanHeaders.map(header => header.text)
        let data = this.filteredItems.map(item => {
          let row = []
          for(let header of this.cleanHeaders){
            row.push(item[header.value])
          }
          return row
        })
        import('@/vendor/Export2Excel').then(excel => {
          excel.export_json_to_excel({
            header: headers,
            data: data,
            filename: 'excel-list',
            autoWidth: true,
            bookType: 'xlsx'
          })
        })
      }
    }
  };