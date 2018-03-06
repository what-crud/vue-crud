let state = {
    // companies
    companyDialog: false,
    companies: [],
    company: {
      id: null,
      name: null,
      common_name: null,
      company_type_id: null
    },
    companyPositions: [],
    companyFiles: [],
    companyComments: [],
    // company file
    companyFileDetails: {
      show: false,
      id: null,
      action: null,
      formValid: false,
      item: {},
    },
    // people
    personDialog: false,
    people: [],
    person: {
      id: null,
      firstname: null,
      lastname: null,
      sex_id: null
    },
    personPositions: [],
    personComments: [],
    // position
    positionDetails: {
      show: false,
      id: null,
      action: null,
      formValid: false,
      item: {},
    },
    // tasks
    tasks: {
      show: false,
      positionId: null,
      data: [],
    },
    // image container
    imageContainer: {
      show: false,
      item: {}
    }
  }
  
  export default state
  