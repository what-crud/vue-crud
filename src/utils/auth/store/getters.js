let getters = {
  isLogged: state => state.logged,
  userPermissions: state => {
    return JSON.parse(state.permissions) || []
  },
  checkPermission: (state, getters) => roleCode => {
    let result = roleCode == undefined || getters.userPermissions.filter(el => el == roleCode).length > 0 ? true : false
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
