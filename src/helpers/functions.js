function parseIntIfNumber(str) {
  return !/\D/.test(str) ? parseInt(str) : str
}

function download(path, filename) {
  var a = document.createElement('a')
  a.href = path + '/' + filename
  a.download = filename
  a.click();
}

function humanFileSize(bytes, si) {
  var thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  var units = si ?
    ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    // : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    :
    ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1) + ' ' + units[u];
}

let functionsList = {
  humanFileSize: (param) => {
    return humanFileSize(param)
  },
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
  listTasks: (param) => {
    return param ? param.map(obj => {
      return obj.task.name
    }).join(', ') : ''
  },
  lastReset: (param) => {
    if (param.length > 0) {
      return '<nobr>' + param[param.length - 1].reset_time.substring(0, 19) + '</nobr>'
    }
  }
};

function getItemsList(obj, fields, meta, primaryKey, customButtons, activeColumnName) {
  var rObj = {}
  rObj.meta = {
    id: obj[primaryKey],
    active: obj[activeColumnName],
    buttons: {},
    item: {}
  }
  for (let field in obj){
    if(typeof obj[field] !== 'object' || obj[field] === null){
      rObj.meta.item[field] = obj[field]
    }
  }
  for (let button of customButtons) {
    rObj.meta.buttons[button.name] = true
    if (button.condition) {
      let showButton = false
      let colVal = obj[button.condition.field]
      let reqValues = button.condition.values
      let operator = button.condition.operator
      if (operator = "==") {
        for (let reqVal of reqValues) {
          if (colVal == reqVal) {
            showButton = true
          }
        }
      } else if (operator = "!=") {
        for (let reqVal of reqValues) {
          if (colVal != reqVal) {
            showButton = true
          }
        }
      } else if (operator = ">") {
        for (let reqVal of reqValues) {
          if (colVal > reqVal) {
            showButton = true
          }
        }
      } else if (operator = "<") {
        for (let reqVal of reqValues) {
          if (colVal < reqVal) {
            showButton = true
          }
        }
      }
      rObj.meta.buttons[button.name] = showButton
    }
  }
  for (let field of fields) {
    let customField = function (info) {
      let tmpField = info.name == '' 
        ? obj 
        : info.name.split('.')
          .reduce(function (object, property) {
            return object[property] || ''
          }, obj)

      let functions = info.functions || []
      let availableFunctions = functionsList

      for (let i = 0; i < functions.length; i++) {
        let functionName = functions[i]
        tmpField = availableFunctions[functionName](tmpField)
      }
      return tmpField
    }
    rObj[field.name.toLowerCase()] = (field.apiObject === undefined) ? obj[field.name] : customField(field.apiObject)
  }
  for (let field of meta) {
    let customField = function (info) {
      let tmpField = info.name.split('.')
        .reduce(function (object, property) {
          return object[property] || ''
        }, obj)
    }
    rObj.meta[field.name.toLowerCase()] = (field.apiObject === undefined) ? obj[field.name] : customField(field.apiObject)
  }
  return rObj
}

export {
  parseIntIfNumber,
  download,
  humanFileSize,
  getItemsList,
  functionsList
}
