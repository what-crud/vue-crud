import api from '@/config/api'

const joinUrl = (items) => {
  let urlArray = []
  for (let item of items) {
    if (item) {
      urlArray.push(item)
    }
  }
  return urlArray.join('/')
}

const state = {
  prefix: '',
  path: '',
  paths: {},
  tableReady: false,
  detailsLoading: false,
  items: [],
  totalItems: 0,
  loading: true,
  currentItemId: null,
  currentItemIndex: null,
  moveItemRun: false,
  moveItemDirection: null,
  details: {
    show: false,
    id: null,
    action: null,
    formValid: false,
    item: {},
  },
  createdElement: {
    mode: 'ignore',
    created: false,
    id: null,
  },
  itemElements: {
    show: false,
    id: null,
    columns: [],
    controller: '',
    itemObject: '',
    primaryId: '',
    foreignId: '',
    title: '',
    url: '',
    data: [],
  },
  availableElements: [],
  imageContainer: {
    show: false,
    item: {},
  },
  selectedIds: [],
  // tableRefreshing
  tableRefreshing: false,
  // extended details
  detailsDialog: false,
  item: {},
  itemIdColumn: '',
  childItemsMapping: [],
  childItems: {},
  // files
  filesPath: joinUrl([
    api.url,
    api.path.storage,
  ]),
  uploadPath: joinUrl([
    api.url,
    api.path.prefix,
    api.path.upload,
  ]),
}

export default state
