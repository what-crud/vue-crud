let getters = {
  isLogged: state => state.logged,
  userRoles: state => {
    let arr = state.user != null ? JSON.parse(state.user).user_permissions : []
    return arr
  },
  checkRole: (state, getters) => roleCode => {
    let result = getters.userRoles.filter(el => el.permission.code == roleCode).length > 0 ? true : false
    return result;
  },
  userInfo: state => {
    return JSON.parse(state.user)
  },
  userUpdated: state => {
    return state.userUpdated
  },
  userPasswordUpdated: state => {
    return state.userPasswordUpdated
  },
  userPasswordUpdateError: state => {
    return state.userPasswordUpdateError
  },
  userPasswordUpdateErrorMsg: state => {
    return state.userPasswordUpdateErrorMsg
  },
}

export default getters
