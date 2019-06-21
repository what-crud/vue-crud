export default {
  api: 'http://127.0.0.1:8000/api',
  loginType: 'email',
  loginFieldName: 'email',
  loginRegex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  passwordFieldName: 'password',
  prefix: 'auth',
  paths: {
    login: 'login',
    logout: 'logout',
    getUser: 'user',
    refreshToken: 'refresh-token',
    editUser: 'user',
    changePassword: 'user-password'
  }
}
