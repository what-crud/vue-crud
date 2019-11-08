const actions = {
  openAlertBox ({ commit }, [
    alertType,
    data,
  ]) {
    if ([
      'alertSuccess',
      'alertValidationError',
      'alertError',
    ].includes(alertType)) {
      commit(alertType, data)
    }
    setTimeout(() => {
      commit('closeAlertBox')
    }, 4000)
  },
}

export default actions
