<template>
  <crud :prefix="prefix" :path="path" :pageTitle="pageTitle" :fieldsInfo="fieldsInfo" :detailsTitle="$t('detailsTitle')">
  </crud>
</template>

<script>
  import Crud from '@/components/Crud.vue'

  export default {
    data() {
      return {
        prefix: 'crm',
        path: 'company-comments',
        pageTitle: 'crm.companyComments',
      }
    },
    computed: {
      fieldsInfo () {
        return [
          {
            text: this.$t('fields.id'),
            name: 'id',
            details: false
          },
          {
            type: 'select',
            url: 'crm/companies',
            list: {
              value: 'id',
              text: 'common_name',
              data: []
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
            details: false
          },
          {
            text: this.$t('fields.userEmail'),
            name: 'userEmail',
            apiObject: {
              name: 'user.email',
            },
            details: false
          },
          {
            type: 'select',
            url: 'crm/company-comment-types',
            list: {
              value: 'id',
              text: 'name',
              data: []
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
              functions: ['croppedText']
            },
          },
        ]
      },
    },
    components: {
      Crud
    },
    i18n: {
      messages: {
        pl: {
          detailsTitle: 'Firma - komentarz',
          fields: {
            id: 'Id',
            company: 'Firma',
            user: 'Autor',
            userEmail: 'E-mail autora',
            commentType: 'Typ komentarza',
            content: 'Treść',
          }
        },
        en: {
          detailsTitle: 'Company - comment',
          fields: {
            id: 'Id',
            company: 'Company',
            user: 'Author',
            userEmail: 'Author e-mail',
            commentType: 'Comment type',
            content: 'Content',
          }
        }
      }
    },
  }

</script>
