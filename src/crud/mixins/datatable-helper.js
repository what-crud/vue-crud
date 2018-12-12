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
  filters: {
    cropped(field) {
      let rField
      let maxLength = 40
      if (typeof field === 'string' || field instanceof String) {
        rField = field.length <= maxLength ? field : field.substring(0, maxLength - 3) + '...'
      }
      else {
        rField = field
      }
      return rField
    }
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
    activityClass(isActive) {
      let className = ""
      if(['soft', 'both'].includes(this.deleteMode)){
        className = parseInt(isActive) == 1 ? 'row-active' : 'row-inactive'
      }
      return className
    },
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
