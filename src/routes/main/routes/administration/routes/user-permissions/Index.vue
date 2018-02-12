<template>
  <crud
    :prefix="prefix"
    :path="path"
    :pageTitle="pageTitle"
    :headers="headers"
    :fieldsInfo="fieldsInfo"
    :detailsTitle="$t('detailsTitle')"
    :softDeletes="false"
  >
  </crud>
</template>

<script>
  import Crud from '@/components/Crud.vue'

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
            type: 'select',
            url: 'admin/users',
            list: {
              value: 'id',
              text: 'name',
              data: []
            },
            column: 'user_id',
            text: this.$t('fields.user'),
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
            text: this.$t('fields.user'),
            value: 'user'
          },
          {
            text: this.$t('fields.userEmail'),
            value: 'userEmail'
          },
          {
            text: this.$t('fields.permission'),
            value: 'permission'
          },
          {
            text: this.$t('fields.permissionCode'),
            value: 'permissionCode'
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
