import crud from '@/config/crud'

const fieldModifiers = crud.fieldModifiers || {}

function parseIntIfNumber (str) {
  return !/\D/.test(str) ? parseInt(str) : str
}

function download (path, filename) {
  const a = document.createElement('a')
  a.href = `${path}/${filename}`
  a.download = true
  a.target = '_blank'
  a.click()
}

function humanFileSize (bytes, si) {
  const thresh = si ? 1000 : 1024
  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`
  }
  const units = si
    ? [
      'kB',
      'MB',
      'GB',
      'TB',
      'PB',
      'EB',
      'ZB',
      'YB',
    ]
    // : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    : [
      'KB',
      'MB',
      'GB',
      'TB',
      'PB',
      'EB',
      'ZB',
      'YB',
    ]
  let u = -1
  do {
    bytes /= thresh
    ++u
  } while (Math.abs(bytes) >= thresh && u < units.length - 1)
  return `${bytes.toFixed(1)} ${units[u]}`
}

function getItemsList (obj, fields, meta, primaryKey, customButtons, activeColumnName) {
  const rObj = {}
  rObj.meta = {
    id: obj[primaryKey],
    active: obj[activeColumnName],
    buttons: {},
    item: {},
  }
  for (const field in obj) {
    if (typeof obj[field] !== 'object' || obj[field] === null) {
      rObj.meta.item[field] = obj[field]
    }
  }
  for (const button of customButtons) {
    rObj.meta.buttons[button.name] = true
    if (button.condition) {
      let showButton = false
      const colVal = obj[button.condition.field]
      const reqValues = button.condition.values
      let { operator } = button.condition
      if (operator === '==') {
        for (const reqVal of reqValues) {
          if (colVal === reqVal) {
            showButton = true
          }
        }
      } else if (operator === '!=') {
        for (const reqVal of reqValues) {
          if (colVal !== reqVal) {
            showButton = true
          }
        }
      } else if (operator === '>') {
        for (const reqVal of reqValues) {
          if (colVal > reqVal) {
            showButton = true
          }
        }
      } else if (operator === '<') {
        for (const reqVal of reqValues) {
          if (colVal < reqVal) {
            showButton = true
          }
        }
      }
      rObj.meta.buttons[button.name] = showButton
    }
  }
  for (const field of fields) {
    const customField = function (info) {
      let tmpField = info.name === ''
        ? obj
        : info.name.split('.')
          .reduce((object, property) => object[property] || '', obj)

      const functions = info.functions || []
      const availableFunctions = fieldModifiers

      for (let i = 0; i < functions.length; i++) {
        const functionName = functions[i]
        tmpField = availableFunctions[functionName](tmpField)
      }
      return tmpField
    }
    rObj[field.name.toLowerCase()] = (field.apiObject === undefined) ? obj[field.name] : customField(field.apiObject)
  }
  for (const field of meta) {
    const customField = function (info) {
      const tmpField = info.name.split('.')
        .reduce((object, property) => object[property] || '', obj)
      return tmpField
    }
    rObj.meta[field.name.toLowerCase()] = (field.apiObject === undefined) ? obj[field.name] : customField(field.apiObject)
  }
  return rObj
}

export {
  fieldModifiers,
  parseIntIfNumber,
  download,
  humanFileSize,
  getItemsList,
}
