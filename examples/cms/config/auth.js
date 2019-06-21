export default {
    api: 'http://127.0.0.1:8000/api',
    loginType: 'email',
    prefix: 'auth',
    paths: {
        login: 'login',
        logout: 'logout',
        user: 'user',
        refreshToken: 'refresh-token',
        changePassword: 'user-password'
    }
}
