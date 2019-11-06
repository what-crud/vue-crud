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
    dateFromTimestamp: (param) => {
      return param.substring(0, 10)
    },
    timeFromTimestamp: (param) => {
      let tmp = param || ''
      return tmp.substring(0, 5)
    },
    datetimeFromTimestamp: (param) => {
      return '<nobr>' + param.substring(0, 19) + '</nobr>'
    },
    croppedText: (param) => {
      return (param == null || param.length < 100) ? param : param.substring(0, 100) + '...'
    },
    list: (param) => {
      return param ? param.map(obj => obj.tableList).join(', ') : ''
    },
    listTags: (param) => {
      return `<div style="max-width:200px;">${param ? param.map(obj => {
        return `<span class="crud-label">${obj.tag.name}</span>`
      }).join('') : ''}</div>`
    },
    lastReset: (param) => {
      if (param.length > 0) {
        return '<nobr>' + param[param.length - 1].reset_time.substring(0, 19) + '</nobr>'
      }
    },
    boolean: (param) => {
      return `<i aria-hidden class="v-icon material-icons">${parseInt(param) === 1 ? 'check' : 'clear'}</i>`
    },
  },
}
