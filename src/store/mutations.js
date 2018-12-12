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
    localStorage.setItem('locale', locale)
    state.locale = locale
  },
  setSidebarWidth(state, mini) {
    state.sidebarMini = mini
  },
  // alerts
  alertSuccess(state, text) {
    state.alert.type = 'success'
    state.alert.text = text
    state.alert.show = 1
    setTimeout(() => state.alert.show = 0, 2000);
  },
  alertValidationError(state, obj) {
      state.alert.type = 'warning'
      let text = ""
      for (let key in obj) {
        text += '<div><strong>' + key + ': </strong>' + obj[key].join(', ') + '</div>'
      }
      state.alert.text = text
      state.alert.show = 1
      setTimeout(() => state.alert.show = 0, 4000);
  },
  alertError(state, text) {
      state.alert.type = 'error'
      state.alert.text = text
      state.alert.show = 1
      setTimeout(() => state.alert.show = 0, 4000);
  }
}

export default mutations