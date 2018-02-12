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
        path: 'person-comments',
        pageTitle: 'crm.personComments',
      }
    },
    computed: {
      fieldsInfo () {
        return [{
            type: 'select',
            url: 'crm/people',
            list: {
              value: 'id',
              text: 'fullname',
              data: []
            },
            column: 'person_id',
            text: this.$t('fields.person'),
          },
          {
            type: 'select',
            url: 'crm/person-comment-types',
            list: {
              value: 'id',
              text: 'name',
              data: []
            },
            column: 'person_comment_type_id',
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
        return [{
            text: this.$t('fields.id'),
            value: 'id'
          },
          {
            text: this.$t('fields.person'),
            value: 'person'
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
            value: 'personCommentType'
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
          detailsTitle: 'Osoba - komentarz',
          fields: {
            id: 'Id',
            person: 'Osoba',
            user: 'Autor',
            userEmail: 'E-mail autora',
            commentType: 'Typ komentarza',
            content: 'Treść',
          }
        },
        en: {
          detailsTitle: 'Person - comment',
          fields: {
            id: 'Id',
            person: 'Person',
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
