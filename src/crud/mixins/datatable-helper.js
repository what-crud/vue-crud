export default {
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
    headers() {
      let actionHeader = [{text: this.$t("fields.action"),sortable: false}]
      let headers = this.tableFields.map(field => {
        let header = {};
        header.text = field.text;
        header.value = field.name.toLowerCase();
        if (field.sortable != undefined) {
          header.sortable = field.sortable;
        }
        return header;
      });
      return [...actionHeader, ...headers];
    },
    statuses() {
      return [
        {
          text: this.$t("status.active"),
          value: 1
        },
        {
          text: this.$t("status.inactive"),
          value: 0
        }
      ];
    },
    filterModes() {
      return [
        {
          name: 'like',
          text: this.$t('filterModes.options.like')
        },
        {
          name: 'equals',
          text: this.$t('filterModes.options.equals')
        },
        {
          name: 'list',
          text: this.$t('filterModes.options.list')
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
    }
  }
};
