<template>
  <crud
    :prefix="prefix"
    :path="path"
    :pageTitle="pageTitle"
    :fieldsInfo="fieldsInfo"
    :detailsTitle="$t('detailsTitle')"
    deleteMode="hard"
  >
  </crud>
</template>

<script>
  import Crud from '@/crud/components/Crud.vue'

  export default {
    data() {
      return {
        prefix: 'admin',
        path: 'user-permissions',
        pageTitle: 'admin.userPermissions',
      }
    },
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
            url: 'admin/users',
            list: {
              value: 'id',
              text: 'name',
              data: []
            },
            column: 'user_id',
            text: this.$t('fields.user'),
            name: 'user',
            apiObject: {
              name: 'user.name',
            },
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
            url: 'admin/permissions',
            list: {
              value: 'id',
              text: 'name',
              data: []
            },
            column: 'permission_id',
            text: this.$t('fields.permission'),
            name: 'permission',
            apiObject: {
              name: 'permission.name',
            }
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
          detailsTitle: 'Użytkownik - uprawnienie',
          fields: {
            id: 'Id',
            user: 'Użytkownik',
            userEmail: 'E-mail użytkownika',
            permission: 'Uprawnienie',
            permissionCode: 'Kod uprawnienia',
          }
        },
        en: {
          detailsTitle: 'User - permission',
          fields: {
            id: 'Id',
            user: 'User',
            userEmail: 'User\'s e-mail',
            permission: 'Permission',
            permissionCode: 'Permission code',
          }
        }
      }
    },
  }

</script>
