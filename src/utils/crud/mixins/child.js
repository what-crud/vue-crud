import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} from 'vuex'

export default {
  props: {
    title: String,
    path: String,
    childItemName: String,
    fkName: String,
    exclude: {
      type: Array,
      default: () => [],
    },
    activeColumnName: {
      type: String,
      default: 'active',
    },
  },
  data () {
    return {
      detailsLoader: false,
    }
  },
  computed: {
    ...mapState('crud', [
      'childItems',
      'itemIdColumn',
      'childTitle',
    ]),
    ...mapGetters('crud', [
      'item',
      'childrenList',
    ]),
    details () {
      return this.childItems[this.childItemName].details
    },
    fileteredTableFields () {
      return this.fieldsInfo.filter(field => field.table !== false && field.type !== 'divider' && field.childTable !== false && !this.exclude.includes(field.name))
    },
    fileteredDetailsFields () {
      return this.fieldsInfo.filter(field => field.details !== false && field.type !== 'divider' && field.childTable !== false && !this.exclude.includes(field.name))
    },
  },
  methods: {
    ...mapMutations('crud', [
      'hideChildDialog',
      'resetChild',
      'editChildDialog',
      'createChildDialog',
      'setChildTitle',
    ]),
    ...mapActions('crud', [
      'getItemDetails',
      'updateChild',
      'storeChild',
      'getChild',
      'deleteChild',
    ]),
    edit (id) {
      this.detailsLoader = true
      this.getChild([
        id,
        this.path,
        this.childItemName,
      ]).then((response) => {
        this.editChildDialog([
          id,
          this.childItemName,
        ])
        this.detailsLoader = false
      })
    },
    create () {
      this.resetChild(this.childItemName)
      this.createChildDialog(this.childItemName)
    },
    suspend (id) {
      let obj = {}
      obj[this.activeColumnName] = 0
      this.updateChild([
        id,
        obj,
        this.$t('global.alerts.suspended'),
        this.path,
      ])
    },
    restore (id) {
      let obj = {}
      obj[this.activeColumnName] = 1
      this.updateChild([
        id,
        obj,
        this.$t('global.alerts.restored'),
        this.path,
      ])
    },
    reset () {
      this.resetChild(this.childItemName)
    },
    close () {
      this.hideChildDialog(this.childItemName)
    },
    destroy (id) {
      if (confirm(this.$t('global.alerts.confirm'))) {
        this.deleteChild([
          id,
          this.$t('global.alerts.deleted'),
          this.$t('global.alerts.deleteError'),
          this.path,
        ])
      }
    },
    update (id, data) {
      this.updateChild([
        id,
        data,
        this.$t('global.alerts.updated'),
        this.path,
      ]).then((response) => {
        this.close()
      })
    },
    store (data) {
      data[this.fkName] = this.item[this.itemIdColumn]
      this.storeChild([
        data,
        this.$t('global.alerts.stored'),
        this.path,
      ]).then((response) => {
        this.close()
      })
    },
    itemElementsClosed () {
      this.getItemDetails([this.item[this.itemIdColumn]])
    },
  },
}
