import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} from 'vuex'

export default {
  props: [
    'itemsViewConfig',
    'tableFields',
    'deleteMode',
    'customButtons',
    'itemElements',
    'editButton',
    'meta',
    'primaryKey',
    'activeColumnName',
    'createMode',
    'editMode',
    'mainFilter',
    'fieldFilters',
    'exportButton',
    'refreshButton',
    'selectManyMode',
    'updateManyMode',
    'removeManyMode',
  ],
  data () {
    return {
      selected: [],
    }
  },
  computed: {
    ...mapState('app', ['page']),
    ...mapState('crud', [
      'prefix',
      'path',
      'currentItemIndex',
      'currentItemId',
    ]),
    ...mapGetters('crud', ['itemsList']),
    selectedIds () {
      return this.selected.map(item => item.meta.id)
    },
    items () {
      return this.itemsList(
        this.tableFields,
        this.meta,
        this.primaryKey,
        this.customButtons,
        this.activeColumnName
      )
    },
    excelName () {
      return this.$t(`global.routes.${this.page}`)
    },
  },
  methods: {
    ...mapMutations('crud', [
      'showItemDetailsDialog',
      'setCurrentItem',
      'resetItems',
      'resetItem',
      'editItemDialog',
      'createItemDialog',
      'multipleEditDialog',
      'setItemElementsInfo',
      'editItemElementsDialog',
      'setSelectedIds',
    ]),
    ...mapActions('crud', [
      'getItem',
      'updateItem',
      'storeItem',
      'deleteItem',
      'getItemElements',
      'mulitipleItemsUpdate',
      'mulitipleItemsDelete',
      'getItemDetails',
      'runItemsViewRefreshing',
    ]),
    ...mapActions(['openAlertBox']),
    refreshItemsView () {
      this.runItemsViewRefreshing()
    },
    edit (id) {
      this.beforeGetItem(id)
      this.getItem([id]).then(() => {
        this.editItemDialog(id)
      })
    },
    create () {
      this.resetItem()
      this.createItemDialog()
    },
    suspend (id) {
      const obj = {}
      obj[this.activeColumnName] = 0
      this.updateItem([
        id,
        obj,
        this.$t('global.alerts.suspended'),
        this.$t('global.alerts.suspendError'),
      ])
    },
    restore (id) {
      const obj = {}
      obj[this.activeColumnName] = 1
      this.updateItem([
        id,
        obj,
        this.$t('global.alerts.restored'),
        this.$t('global.alerts.restoreError'),
      ])
    },
    destroy (id) {
      if (confirm(this.$t('global.alerts.confirm'))) {
        this.deleteItem([
          id,
          this.$t('global.alerts.deleted'),
          this.$t('global.alerts.deleteError'),
        ])
      }
    },
    checkSelected () {
      if (this.selected.length === 0) {
        this.openAlertBox([
          'alertError',
          this.$t('global.datatable.noItemsSelected'),
        ])
        return false
      }
      if (confirm(this.$t('global.datatable.confirm'))) {
        return true
      }
      return false
    },
    editSelected () {
      if (this.selected.length === 0) {
        this.openAlertBox([
          'alertError',
          this.$t('global.datatable.noItemsSelected'),
        ])
        return false
      }

      this.setSelectedIds(this.selected)
      this.resetItem()
      this.multipleEditDialog()
    },
    suspendSelected () {
      if (this.checkSelected()) {
        this.mulitipleItemsUpdate([
          {
            ids: this.selectedIds,
            request: {
              active: 0,
            },
          },
          this.$t('global.alerts.suspended'),
          this.$t('global.alerts.suspendError'),
        ])
      }
    },
    restoreSelected () {
      if (this.checkSelected()) {
        this.mulitipleItemsUpdate([
          {
            ids: this.selectedIds,
            request: {
              active: 1,
            },
          },
          this.$t('global.alerts.restored'),
          this.$t('global.alerts.restoreError'),
        ])
      }
    },
    destroySelected () {
      if (this.checkSelected()) {
        this.mulitipleItemsDelete([
          {
            ids: this.selectedIds,
          },
          this.$t('global.alerts.deleted'),
          this.$t('global.alerts.deleteError'),
        ])
      }
    },
    custom (name, item) {
      const index = this.getItemIndex(item.meta.id)
      this.$parent.custom(name, item, index)
    },
    editItemElements (name, id) {
      const obj = this.itemElements[name]
      this.setItemElementsInfo([
        id,
        obj,
      ])
      this.getItemElements()
    },
  },
}
