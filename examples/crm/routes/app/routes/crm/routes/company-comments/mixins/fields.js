export default {
  computed: {
    fieldsInfo () {
      return [
        {
          text: this.$t('fields.id'),
          name: 'id',
          details: false,
        },
        {
          type: 'select',
          url: 'crm/companies',
          list: {
            value: 'id',
            text: 'common_name',
            data: [],
          },
          column: 'company_id',
          text: this.$t('fields.company'),
          name: 'company',
          apiObject: {
            name: 'company.common_name',
          },
        },
        {
          text: this.$t('fields.user'),
          name: 'user',
          apiObject: {
            name: 'user.name',
          },
          details: false,
        },
        {
          text: this.$t('fields.userEmail'),
          name: 'userEmail',
          apiObject: {
            name: 'user.email',
          },
          details: false,
        },
        {
          type: 'select',
          url: 'crud/crm/company-comment-types',
          list: {
            value: 'id',
            text: 'name',
            data: [],
          },
          column: 'company_comment_type_id',
          text: this.$t('fields.commentType'),
          name: 'companyCommentType',
          apiObject: {
            name: 'company_comment_type.name',
          },
        },
        {
          type: 'textarea',
          column: 'content',
          text: this.$t('fields.content'),
          name: 'content',
          apiObject: {
            name: 'content',
            functions: ['croppedText'],
          },
          multiedit: false,
        },
      ]
    },
  },
}
