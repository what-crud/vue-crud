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
        path: 'person-comments',
        pageTitle: 'crm.personComments',
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
            url: 'crm/people',
            list: {
              value: 'id',
              text: 'fullname',
              data: []
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
            url: 'crm/person-comment-types',
            list: {
              value: 'id',
              text: 'name',
              data: []
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
