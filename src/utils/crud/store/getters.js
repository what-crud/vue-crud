import { humanFileSize, getItemsList } from '@/utils/crud/helpers/functions.js'

let getters = {
  path: state => (operation) => {
    let path
    if(state.paths[operation] != undefined){
      path = state.paths[operation]
    }
    else{
      path = (state.prefix != null ? state.prefix + '/' : '') + state.path 
    }
    return path
  },
  itemCreated: state => {
    return state.createdElement.created
  },
  itemsList: (state) => (fields, meta, primaryKey, customButtons, activeColumnName) => {
    let result = state.items.map(obj => {
      return getItemsList(obj, fields, meta, primaryKey, customButtons, activeColumnName)
    })
    return result
  },
  // extended details
  item: state => state.item,
  childrenList: (state) => (fields, meta, primaryKey, childItemName, activeColumnName) => {
    let result = state.childItems[childItemName].items.map(obj => {
      return getItemsList(obj, fields, meta, primaryKey, [], activeColumnName)
    })
    return result
  },
}

export default getters
