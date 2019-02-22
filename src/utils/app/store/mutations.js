let mutations = {
  openProfileDialog(state) {
    state.profileDialog = true
  },
  setModule(state, value) {
    state.module = value
  },
  setPage(state, value) {
    state.page = value
  },
}

export default mutations