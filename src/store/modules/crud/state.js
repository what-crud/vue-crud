let state = {
    prefix: '',
    path: '',
    tableReady: false,
    items: [],
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
    }
  }
  
  export default state