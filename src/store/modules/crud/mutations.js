let mutations = {
    // page info
    setPrefix(state, prefix) {
      state.prefix = prefix
    },
    setPath(state, path) {
      state.path = path
    },
    // table items
    setItems(state, data) {
      state.items = data
      state.tableReady = true
    },
    resetItems(state) {
      state.items = []
      state.tableReady = false
    },
    // details item
    setItem(state, data) {
      state.details.item = data
    },
    resetItem(state) {
      state.details.item = {}
    },
    editItemDialog(state, id){
      state.details.action = 'edit'
      state.details.id = id
      state.details.formValid = true
      state.details.show = true
    },
    createItemDialog(state){
      state.details.action = 'create'
      state.details.formValid = true
      state.details.show = true
    },
    setCreationMode(state, creationMode){
      state.createdElement.mode = creationMode
    },
    setCreatedItemStatus(state, [created, id]){
      state.createdElement.created = created
      state.createdElement.id = id
    },
    // item elements
    setItemElements(state, data) {
      state.itemElements.data = data
    },
    resetItemElements(state) {
      state.itemElements.data = []
    },
    setItemElementsInfo(state, [id, obj]) {
      state.itemElements.id = id
      state.itemElements.title = obj.title
      state.itemElements.url = obj.url
      state.itemElements.columns = obj.columns
      state.itemElements.controller = obj.controller
      state.itemElements.itemObject = obj.itemObject
      state.itemElements.primaryId = obj.primaryId
      state.itemElements.foreignId = obj.foreignId
      state.itemElements.show = true
    },
    openImageContainer(state, item) {
      state.imageContainer.item = item
      state.imageContainer.show = true
    },
    closeImageContainer(state) {
      state.imageContainer.show = false
      state.imageContainer.item = {}
    }
  }
  
  export default mutations