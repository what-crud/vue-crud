let mutations = {
  setLocale(state, locale) {
    localStorage.setItem('locale', locale)
    state.locale = locale
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