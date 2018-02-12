let getters = {
  // company
  company: state => state.company,
  companyPositions: state => {
    return state.companyPositions.map(obj => {
      var rObj = {}
      rObj.id = obj.id
      rObj.person = obj.person.fullname
      rObj.name = obj.name
      rObj.email = obj.email
      rObj.phone = obj.phone
      rObj.comment = obj.comment
      rObj.phone_2 = obj.phone_2
      rObj.active = obj.active
      return rObj
    })
  },
  companyComments: state => {
    return state.companyComments.map(obj => {
      var rObj = {}
      rObj.id = obj.id
      rObj.commentType = obj.company_comment_type.name
      rObj.author = obj.user.name
      rObj.content = obj.content
      rObj.created = obj.created_at
      rObj.updated = obj.updated_at
      rObj.active = obj.active
      return rObj
    })
  },
  // person
  person: state => state.person,
  personPositions: state => {
    return state.personPositions.map(obj => {
      var rObj = {}
      rObj.id = obj.id
      rObj.company = obj.company.common_name
      rObj.name = obj.name
      rObj.email = obj.email
      rObj.phone = obj.phone
      rObj.comment = obj.comment
      rObj.phone_2 = obj.phone_2
      rObj.active = obj.active
      return rObj
    })
  },
  personComments: state => {
    return state.personComments.map(obj => {
      var rObj = {}
      rObj.id = obj.id
      rObj.commentType = obj.person_comment_type.name
      rObj.author = obj.user.name
      rObj.content = obj.content
      rObj.created = obj.created_at
      rObj.updated = obj.updated_at
      rObj.active = obj.active
      return rObj
    })
  },
}

export default getters
