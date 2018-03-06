import { humanFileSize } from '@/helpers/functions.js'

let getters = {
  itemCreated: state => {
    return state.createdElement.created
  },
  itemsList: (state) => (fields, meta) => {
    let result = state.items.map(obj => {
      let content
      var rObj = {}
      rObj.meta = {
        active: obj.active
      }
      for (let field of fields) {
        let customField = function (info) {
          let tmpField = info.name.split('.')
            .reduce(function (object, property) {
              return object[property] || ''
            }, obj)

          let functions = info.functions || []
          var availableFunctions = {
            humanFileSize: (param) => {return humanFileSize(param)},
            dateFromTimestamp: (param) => {return param.substring(0,10)},
            croppedText: (param) => {return (param == null || param.length < 100) ? param : param.substring(0,100) + '...'}
          };

          for (let i = 0; i < functions.length; i++) {
            let functionName = functions[i]
            tmpField = availableFunctions[functionName](tmpField)
          }
          return tmpField
        }
        rObj[field.name] = (field.apiObject === undefined) ? obj[field.name] : customField(field.apiObject)
      }
      for (let field of meta) {
        let customField = function (info) {
          let tmpField = info.name.split('.')
            .reduce(function (object, property) {
              return object[property] || ''
            }, obj)
        }
        rObj.meta[field.name] = (field.apiObject === undefined) ? obj[field.name] : customField(field.apiObject)
      }
      return rObj
    })
    return result
  },
}

export default getters
