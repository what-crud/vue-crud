const mutations = {
  openProfileDialog (state) {
    state.profileDialog = true
  },
  setModule (state, value) {
    state.module = value
  },
  setPage (state, value) {
    state.page = value
  },
  showNavigationDrawer (state) {
    state.isNavigationDrawerDisplayed = true
  },
  hideNavigationDrawer (state) {
    state.isNavigationDrawerDisplayed = false
  },
}

export default mutations
