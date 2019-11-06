const state = {
  logged: 0,
  user: localStorage.getItem('user'),
  token: localStorage.getItem('token'),
  permissions: localStorage.getItem('permissions'),
  userUpdated: false,
  userPasswordUpdated: false,
  userPasswordUpdateError: false,
  userPasswordUpdateErrorMsg: '',
  loginWait: false,
  loginFailed: false,
}

export default state
