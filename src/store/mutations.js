let mutations = {
  openProfileDialog(state) {
    state.profileDialog = true
  },
  openHelpDialog(state) {
    state.helpDialog = true
  },
  setModule(state, value) {
    state.module = value
  },
  setPage(state, value) {
    state.page = value
  },
  setLocale(state, locale) {
    state.locale = locale
  },
  // alerts
  alertSuccess(state, text) {
    state.alert.color = 'success'
    state.alert.icon = 'check_circle'
    state.alert.text = text
    state.alert.show = 1
    setTimeout(() => state.alert.show = 0, 2000);
  },
  alertError(state, text) {
      state.alert.color = 'error'
      state.alert.icon = 'warning'
      state.alert.text = text
      state.alert.show = 1
      setTimeout(() => state.alert.show = 0, 2000);
  }
}

export default mutations