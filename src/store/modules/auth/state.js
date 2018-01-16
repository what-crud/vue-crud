let state = {
  logged: 0,
  user: localStorage.getItem('user'),
  token: localStorage.getItem('token'),
  userUpdated: false,
  userPasswordUpdated: false,
  userPasswordUpdateError: false,
  userPasswordUpdateErrorMsg: ''
}

export default state
