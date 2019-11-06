const getters = {
  isLogged: state => state.logged,
  userPermissions: state => JSON.parse(state.permissions) || [],
  checkPermission: (state, getters) => (roleCode) => {
    const result = !!(roleCode === undefined || getters.userPermissions.filter(el => el === roleCode).length > 0)
    return result
  },
  userInfo: state => {
    return JSON.parse(state.user) || {
      active: null,
      email: null,
      name: null,
    }
  },
  userUpdated: state => state.userUpdated,
  userPasswordUpdated: state => state.userPasswordUpdated,
  userPasswordUpdateError: state => state.userPasswordUpdateError,
  userPasswordUpdateErrorMsg: state => state.userPasswordUpdateErrorMsg,
}

export default getters
