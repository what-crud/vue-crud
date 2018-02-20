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
    companyComments: [],
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
  }
  
  export default state
  