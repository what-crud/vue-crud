import DataTableFooter from "../components/DataTableFooter.vue";

export default {
  components: {
    DataTableFooter
  },
  data() {
    return {
      selectedStatuses: [1],
      filterColumns: [],
      tmp: "",
      search: "",
      pagination: {},
    };
  },
  computed: {
    cleanHeaders() {
      let headers = this.tableFields.map(field => {
        let header = {};
        header.text = field.text;
        header.value = field.name.toLowerCase();
        if (field.sortable != undefined) {
          header.sortable = field.sortable;
        }
        return header;
      });
      return headers
    },
    headers() {
      let actionHeader = [{
        text: this.$t("global.datatable.fields.action"),
        sortable: false
      }];
      return [...actionHeader, ...this.cleanHeaders];
    },
    columnTextModes() {
      let columnTextModes = {}
      for(let field of this.tableFields) {
        columnTextModes[field.name.toLowerCase()] = field.textMode || 'cropped'
      }
      return columnTextModes
    },
    statuses() {
      return [
        {
          text: this.$t("global.datatable.status.active"),
          value: 1
        },
        {
          text: this.$t("global.datatable.status.inactive"),
          value: 0
        }
      ];
    },
    filterModes() {
      return [
        {
          name: 'like',
          text: this.$t('global.datatable.filterModes.options.like')
        },
        {
          name: 'equals',
          text: this.$t('global.datatable.filterModes.options.equals')
        },
        {
          name: 'list',
          text: this.$t('global.datatable.filterModes.options.list')
        },
      ]
    },
  },
  methods: {
    updateColumnFilterMode(val, index) {
      let obj = this.filterColumns
      obj[index].mode = val
      this.$set(this, 'filterColumns', obj)
    },
    updateFilterColumns(val, index) {
      let obj = this.filterColumns
      obj[index].value = val
      this.$set(this, 'filterColumns', obj)
    },
    setPage(page){
      this.pagination.page = parseInt(page)
    }
  }
};
