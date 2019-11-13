import Vue from 'vue'

const mutations = {
  // page info
  setPrefix (state, prefix) {
    state.prefix = prefix
  },
  setPath (state, path) {
    state.path = path
  },
  setPaths (state, paths) {
    state.paths = paths
  },
  // items view type
  setItemsViewType (state, type) {
    state.itemsViewType = type
    state.isItemsViewFlat = type === 'table'
  },
  // table items
  setItems (state, data) {
    state.items = data
    state.loading = false
  },
  setLoadingStatus (state, val) {
    state.loading = val
  },
  setItemsServerSide (state, data) {
    state.items = data.data
    state.totalItems = data.total
    state.loading = false
  },
  resetItems (state) {
    state.items = []
    state.currentItemId = null
    state.currentItemIndex = null
  },
  setSelectedIds (state, items) {
    state.selectedIds = items.map(item => item.meta.id)
  },
  setCurrentItem (state, item) {
    state.currentItemId = item.id
    state.currentItemIndex = item.index
  },
  moveItem (state, [
    direction,
    run,
  ]) {
    state.moveItemRun = run
    state.moveItemDirection = direction
  },
  setNextItem (state, bool) {
    state.previousItem = bool
  },
  // details item
  setDetailsLoader (state, bool) {
    state.detailsLoading = bool
  },
  setItem (state, data) {
    state.details.item = data
  },
  resetItem (state) {
    state.details.item = {}
  },
  editItemDialog (state, id) {
    state.details.action = 'edit'
    state.details.id = id
    state.details.formValid = true
    state.details.show = true
  },
  createItemDialog (state) {
    state.details.action = 'create'
    state.details.formValid = false
    state.details.show = true
  },
  multipleEditDialog (state) {
    state.details.action = 'multiedit'
    state.details.formValid = true
    state.details.show = true
  },
  setCreationMode (state, creationMode) {
    state.createdElement.mode = creationMode
  },
  setCreatedItemStatus (state, [
    created,
    id,
  ]) {
    state.createdElement.created = created
    state.createdElement.id = id
  },
  // item elements
  setItemElements (state, data) {
    state.itemElements.data = data
  },
  resetItemElements (state) {
    state.itemElements.data = []
  },
  setItemElementsInfo (state, [
    id,
    obj,
  ]) {
    state.itemElements.id = id
    state.itemElements.title = obj.title
    state.itemElements.url = obj.url
    state.itemElements.columns = obj.columns
    state.itemElements.controller = obj.controller
    state.itemElements.itemObject = obj.itemObject
    state.itemElements.primaryId = obj.primaryId
    state.itemElements.foreignId = obj.foreignId
    state.itemElements.connectionKeyName = obj.connectionKeyName
    state.itemElements.dictionaryKeyName = obj.dictionaryKeyName
    state.itemElements.show = true
  },
  openImageContainer (state, item) {
    state.imageContainer.item = item
    state.imageContainer.show = true
  },
  closeImageContainer (state) {
    state.imageContainer.show = false
    state.imageContainer.item = {}
  },
  // refresh table
  refreshTable (state, status) {
    state.isItemsViewRefreshed = status
  },
  // extended details
  showItemDetailsDialog (state) {
    state.detailsDialog = true
  },
  hideItemDetailsDialog (state) {
    state.detailsDialog = false
  },
  setChildItemsMapping (state, data) {
    state.childItemsMapping = data
    for (const childItem of data) {
      Vue.set(state.childItems, childItem.name, {
        items: [],
        details: {
          show: false,
          id: null,
          action: null,
          formValid: false,
          item: {},
        },
      })
    }
  },
  setIdColumn (state, data) {
    state.itemIdColumn = data
  },
  itemDetails (state, data) {
    state.item = data
    for (const childItem of state.childItemsMapping) {
      const child = state.childItems[childItem.name]
      child.items = state.item[childItem.objName]
      Vue.set(state.childItems, childItem.name, child)
    }
  },
  // child
  editChildDialog (state, [
    id,
    childItemName,
  ]) {
    const child = state.childItems[childItemName]
    child.details.action = 'edit'
    child.details.id = id
    child.details.formValid = true
    child.details.show = true
    Vue.set(state.childItems, childItemName, child)
  },
  createChildDialog (state, childItemName) {
    const child = state.childItems[childItemName]
    child.details.action = 'create'
    child.details.formValid = true
    child.details.show = true
    Vue.set(state.childItems, childItemName, child)
  },
  hideChildDialog (state, childItemName) {
    const child = state.childItems[childItemName]
    child.details.show = false
    Vue.set(state.childItems, childItemName, child)
  },
  resetChild (state, childItemName) {
    const child = state.childItems[childItemName]
    child.details.item = {}
    Vue.set(state.childItems, childItemName, child)
  },
  setChild (state, [
    data,
    childItemName,
  ]) {
    const child = state.childItems[childItemName]
    child.details.item = data
    Vue.set(state.childItems, childItemName, child)
  },
}

export default mutations
