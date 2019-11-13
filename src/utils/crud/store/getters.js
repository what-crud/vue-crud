import { getItemsList } from '@/utils/crud/helpers/functions'

const joinUrl = (items) => {
  let urlArray = []
  for (let item of items) {
    if (item) {
      urlArray.push(item)
    }
  }
  return urlArray.join('/')
}

const getters = {
  path: state => (operation) => {
    let path
    if (state.paths[operation] !== undefined) {
      path = state.paths[operation]
    } else {
      path = (state.prefix != null ? `${state.prefix}/` : '') + state.path
    }
    return path
  },
  itemCreated: state => state.createdElement.created,
  itemsList: state => (fields, meta, primaryKey, customButtons, activeColumnName) => {
    const result = state.items.map(
      obj => getItemsList(
        obj,
        fields,
        meta,
        primaryKey,
        customButtons,
        activeColumnName
      )
    )
    return result
  },
  // extended details
  item: state => state.item,
  childrenList: state => (fields, meta, primaryKey, childItemName, activeColumnName) => {
    const childItemsObj = state.childItems[childItemName]
    const items = childItemsObj.items || []
    const result = items.map(
      obj => getItemsList(
        obj,
        fields,
        meta,
        primaryKey,
        [],
        activeColumnName
      )
    )
    return result
  },
  // files
  filesPath: state => {
    return joinUrl([
      state.apiUrl,
      state.apiPath.storage,
    ])
  },
  uploadPath: state => {
    return joinUrl([
      state.apiUrl,
      state.apiPath.prefix,
      state.apiPath.upload,
    ])
  },
}

export default getters
