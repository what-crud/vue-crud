let getters = {
  itemsList: state => table => {
    let result = state.items.map(obj => {
      let content
      var rObj = {}
      rObj.id = obj.id
      switch (table) {
        //crm
        case 'crm/companies':
          rObj.companyType = obj.company_type.name
          rObj.name = obj.name
          rObj.commonName = obj.common_name
          rObj.streetPrefix = obj.street_prefix.name
          rObj.address = obj.address
          rObj.city = obj.city
          rObj.nip = obj.nip
          break;
        case 'crm/people':
          rObj.fullname = obj.fullname
          rObj.distinction = obj.distinction
          rObj.language = obj.language.name
          rObj.sex = obj.sex.name
          rObj.email = obj.email
          rObj.phone = obj.phone
          break;
        case 'crm/positions':
          rObj.company = obj.company.common_name
          rObj.person = obj.person.firstname + ' ' + obj.person.lastname
          rObj.name = obj.name
          rObj.email = obj.email
          rObj.phone = obj.phone
          rObj.comment = obj.comment
          rObj.email_2 = obj.email_2
          rObj.phone_2 = obj.phone_2
          rObj.phone_3 = obj.phone_3
          break;
        case 'crm/company-comments':
          rObj.company = obj.company.common_name
          rObj.user = obj.user.name
          rObj.userEmail = obj.user.email
          rObj.companyCommentType = obj.company_comment_type.name
          content = (obj.content == null || obj.content.length < 100) ? obj.content : obj.content.substring(0,100) + '...'
          rObj.content = content
          break;
        case 'crm/person-comments':
          rObj.person = obj.person.fullname
          rObj.user = obj.user.name
          rObj.userEmail = obj.user.email
          rObj.personCommentType = obj.person_comment_type.name
          content = (obj.content == null || obj.content.length < 100) ? obj.content : obj.content.substring(0,100) + '...'
          rObj.content = content
          break;
        case 'crm/position-tasks':
          rObj.positionPerson = obj.position.person.fullname
          rObj.positionCompany = obj.position.company.common_name
          rObj.position = obj.position.name
          rObj.task = obj.task.name
          break;
        case 'crm/company-files':
          rObj.company = obj.company.common_name
          rObj.filename = obj.filename
          rObj.description = obj.description
          break;
        case 'crm/company-types':
          rObj.name = obj.name
          rObj.code = obj.code
          break;
        case 'crm/company-comment-types':
          rObj.name = obj.name
          break;
        case 'crm/person-comment-types':
          rObj.name = obj.name
          break;
        case 'crm/tasks':
          rObj.name = obj.name
          break;
        //admin
        case 'admin/users':
          rObj.name = obj.name
          rObj.email = obj.email
          rObj.initialPassword = obj.initial_password
          break;
        case 'admin/permissions':
          rObj.name = obj.name
          rObj.code = obj.code
          break;
        case 'admin/user-permissions':
          rObj.user = obj.user.name
          rObj.userEmail = obj.user.email
          rObj.permission = obj.permission.name
          rObj.permissionCode = obj.permission.code
          break;
        default:
          break;
      }
      rObj.active = obj.active
      return rObj
    })
    return result
  },
}

export default getters
