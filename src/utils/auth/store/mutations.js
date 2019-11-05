const mutations = {
  login (state, data) {
    state.logged = 1
    state.loginFailed = false
    const { token } = data
    const user = JSON.stringify(data.user)
    const permissions = JSON.stringify(data.permissions)

    localStorage.setItem('token', token)
    localStorage.setItem('user', user)
    localStorage.setItem('permissions', permissions)
    state.token = token
    state.user = user
    state.permissions = permissions
  },
  loginWait (state, status) {
    state.loginWait = status
  },
  loginFailed (state) {
    state.loginFailed = true
  },
  logout (state) {
    state.loginWait = false
    state.loginFailed = false
    state.logged = 0
    state.user = null
    state.token = null
    state.permissions = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('permissions')
  },
  editUser (state, data) {
    const user = JSON.stringify(data)
    localStorage.setItem('user', user)
    state.user = user
    state.userUpdated = true
    setTimeout(() => {
      state.userUpdated = false
    }, 3000)
  },
  editPassword (state, data) {
    if (data.status === 1) {
      state.userPasswordUpdated = true
      setTimeout(() => {
        state.userPasswordUpdated = false
      }, 3000)
    } else if (data.status === -1) {
      state.userPasswordUpdateError = true
      state.userPasswordUpdateErrorMsg = data.msg
      setTimeout(() => {
        state.userPasswordUpdateError = false
      }, 3000)
    }
  },
  refreshToken (state, data) {
    const { token } = data
    localStorage.setItem('token', token)
    state.token = token
  },
}
export default mutations
