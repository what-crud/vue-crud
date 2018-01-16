let mutations = {
  // permissions
  permissionsList(state, data) {
    state.permissions = data;
  },
  permission(state, data) {
    state.permission = data;
  },
  resetPermission(state) {
    state.permission = {
      id: null,
      name: null,
      code: null
    }
  },
  // user permissions
  userPermissionsList(state, data) {
    state.userPermissions = data;
  },
}
export default mutations
