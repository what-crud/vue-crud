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
  }
  
  export default state