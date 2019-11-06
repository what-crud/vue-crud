const mutations = {
  setLocale (state, locale) {
    localStorage.setItem('locale', locale)
    state.locale = locale
  },
  // alerts
  alertSuccess (state, text) {
    state.alert.type = 'success'
    state.alert.text = text
    state.alert.show = true
  },
  alertValidationError (state, obj) {
    state.alert.type = 'warning'
    let text = ''
    for (const key in obj) {
      text += `<div><strong>${key}: </strong>${obj[key].join(', ')}</div>`
    }
    state.alert.text = text
    state.alert.show = true
  },
  alertError (state, text) {
    state.alert.type = 'error'
    state.alert.text = text
    state.alert.show = true
  },
  closeAlertBox (state) {
    state.alert.show = false
  },
}

export default mutations
