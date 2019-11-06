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
          url: 'crm/people',
          list: {
            value: 'id',
            text: 'fullname',
            data: [],
          },
          column: 'person_id',
          text: this.$t('fields.person'),
          name: 'person',
          apiObject: {
            name: 'person.fullname',
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
          url: 'crm/person-comment-types',
          list: {
            value: 'id',
            text: 'name',
            data: [],
          },
          column: 'person_comment_type_id',
          text: this.$t('fields.commentType'),
          name: 'personCommentType',
          apiObject: {
            name: 'person_comment_type.name',
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
