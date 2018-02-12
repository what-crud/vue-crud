let mutations = {
    // company
    showCompanyDialog(state){
      state.companyDialog = true
    },
    hideCompanyDialog(state){
      state.companyDialog = false
    },
    company(state, data) {
      state.company = data;
      state.companyPositions = state.company.positions
      state.companyComments = state.company.comments
    },
    // person
    showPersonDialog(state){
      state.personDialog = true
    },
    hidePersonDialog(state){
      state.personDialog = false
    },
    person(state, data) {
      state.person = data;
      state.personPositions = state.person.positions
      state.personComments = state.person.comments
    },
    editPositionDialog(state, id){
      state.positionDetails.action = 'edit'
      state.positionDetails.id = id
      state.positionDetails.formValid = true
      state.positionDetails.show = true
    },
    createPositionDialog(state){
      state.positionDetails.action = 'create'
      state.positionDetails.formValid = true
      state.positionDetails.show = true
    },
    hidePositionDialog(state){
      state.positionDetails.show = false
    },
    resetPosition(state) {
      state.positionDetails.item = {}
    },
    setPosition(state, data) {
      state.positionDetails.item = data
    },
    // position tasks
    setPositionTasks(state, [data, positionId]) {
      state.tasks.show = true
      state.tasks.data = data
      state.tasks.positionId = positionId
      state.tasks.selected= []
      state.tasks.available = []
      for(let el of data) {
        if(el.task_positions.length > 0) {
          state.tasks.selected.push(el)
        }
        else {
          state.tasks.available.push(el)
        }
      }
    },
  }
  export default mutations
  