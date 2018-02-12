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
      column: '',
      controller: '',
      itemObject: '',
      primaryId: '',
      foreignId: '',
      title: '',
      url: '',
      data: [],
      selected: [],
      available: [],
    },
    availableElements: [],
  }
  
  export default state