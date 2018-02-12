<template>
  <crud :prefix="prefix" :path="path" :pageTitle="pageTitle" :headers="headers" :fieldsInfo="fieldsInfo" :detailsTitle="$t('detailsTitle')">
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
        return [{
            type: 'select',
            url: 'crm/companies',
            list: {
              value: 'id',
              text: 'common_name',
              data: []
            },
            column: 'company_id',
            text: this.$t('fields.company'),
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
          },
          {
            type: 'textarea',
            column: 'content',
            text: this.$t('fields.content'),
          },
        ]
      },
      headers () {
        return [
          {
            text: this.$t('fields.id'),
            value: 'id'
          },
          {
            text: this.$t('fields.company'),
            value: 'company'
          },
          {
            text: this.$t('fields.user'),
            value: 'user'
          },
          {
            text: this.$t('fields.userEmail'),
            value: 'userEmail'
          },
          {
            text: this.$t('fields.commentType'),
            value: 'companyCommentType'
          },
          {
            text: this.$t('fields.content'),
            value: 'content'
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
