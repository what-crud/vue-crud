let state = {
    prefix: '',
    path: '',
    tableReady: false,
    detailsLoading: false,
    items: [],
    totalItems: 0,
    loading: true,
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
      item: {}
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
  }
  
  export default state