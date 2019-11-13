import api from '@/config/api'

const state = {
  prefix: '',
  path: '',
  paths: {},
  itemsViewType: undefined,
  isItemsViewFlat: false,
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
  // isItemsViewRefreshed
  isItemsViewRefreshed: false,
  // extended details
  detailsDialog: false,
  item: {},
  itemIdColumn: '',
  childItemsMapping: [],
  childItems: {},
  // api
  apiUrl: api.url,
  apiPath: api.path,
}

export default state
