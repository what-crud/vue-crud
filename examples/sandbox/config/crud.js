export default {
  activityColumnName: 'active',
  primaryKey: 'id',
  deleteMode: 'soft',
  editButton: true,
  createMode: true,
  editMode: true,
  mainFilter: true,
  fieldFilter: true,
  exportButton: true,
  refreshButton: true,
  selectManyMode: true,
  updateManyMode: true,
  removeManyMode: true,
  fieldModifiers: {
    boolean: (param) => {
      return `<i aria-hidden class="v-icon material-icons">${parseInt(param) === 1 ? 'check' : 'clear'}</i>`
    },
  },
}
