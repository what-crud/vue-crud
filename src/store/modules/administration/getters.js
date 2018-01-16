let getters = {
  // permissions
  permissions: state => state.permissions,
  permission: state => state.permission,
  // user permissions
  userPermissions: state => state.userPermissions.map(obj => {
    var rObj = {}
    rObj.id = obj.id
    rObj.user = obj.user.name
    rObj.permission = obj.permission.name
    return rObj
  }),
}

export default getters
