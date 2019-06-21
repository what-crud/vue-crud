export default {
  api: 'http://127.0.0.1:8000/api',
  prefix: 'auth',
  paths: {
    login: 'login',
    logout: 'logout',
    getUser: 'user',
    refreshToken: 'refresh-token',
    editUser: 'user',
    changePassword: 'user-password'
  },
  loginWithEmail: true,
  loginFieldName: 'email',
  loginRegex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  passwordFieldName: 'password'
}
