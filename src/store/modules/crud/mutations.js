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
    // item elements
    setItemElements(state, data) {
      state.itemElements.data = data
      state.itemElements.selected= []
      state.itemElements.available = []
      for(let el of data) {
        if(el[state.itemElements.itemObject].length > 0) {
          state.itemElements.selected.push(el)
        }
        else {
          state.itemElements.available.push(el)
        }
      }
    },
    resetItemElements(state) {
      state.itemElements.data = []
      state.itemElements.selected= []
      state.itemElements.available = []
    },
    setItemElementsInfo(state, [id, obj]) {
      state.itemElements.id = id
      state.itemElements.title = obj.title
      state.itemElements.url = obj.url
      state.itemElements.column = obj.column
      state.itemElements.controller = obj.controller
      state.itemElements.itemObject = obj.itemObject
      state.itemElements.primaryId = obj.primaryId
      state.itemElements.foreignId = obj.foreignId
    },
    editItemElementsDialog(state){
      state.itemElements.show = true
    },
  }
  
  export default mutations