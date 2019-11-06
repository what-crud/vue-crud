<template>
  <crud
    :prefix="prefix"
    :path="path"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    :details-title="$t('detailsTitle')"
    :item-elements="itemElements"
  >
  </crud>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'

export default {
  data () {
    return {
      prefix: 'crud/admin',
      path: 'permissions',
      pageTitle: 'admin.permissions',
    }
  },
  computed: {
    itemElements () {
      return {
        permissionUsers: {
          title: this.$t('itemElements.permissionUsers.title'),
          url: 'admin/permissions/{id}/users',
          controller: 'crud/admin/user-permissions',
          itemObject: 'user_permissions',
          columns: [
            {
              obj: 'name',
              name: 'name',
              header: this.$t('itemElements.permissionUsers.headers.user'),
            },
          ],
          primaryId: 'permission_id',
          foreignId: 'user_id',
          icon: 'people',
          color: 'purple',
          buttonText: this.$t('itemElements.permissionUsers.title'),
        },
      }
    },
    fieldsInfo () {
      return [
        {
          text: this.$t('fields.id'),
          name: 'id',
          details: false,
        },
        {
          type: 'input',
          column: 'name',
          text: this.$t('fields.name'),
          name: 'name',
          multiedit: false,
        },
        {
          type: 'input',
          column: 'code',
          text: this.$t('fields.code'),
          name: 'code',
          multiedit: false,
        },
        {
          type: 'input',
          column: 'path',
          text: this.$t('fields.path'),
          name: 'path',
          multiedit: false,
        },
      ]
    },
  },
  components: {
    Crud,
  },
  i18n: {
    messages: {
      pl: {
        detailsTitle: 'Uprawnienie',
        fields: {
          id: 'Id',
          name: 'Nazwa',
          code: 'Kod',
          path: 'Ścieżka',
        },
        itemElements: {
          permissionUsers: {
            title: 'Użytkownicy posiadający dane uprawnienie',
            headers: {
              user: 'Użytkownik',
            },
          },
        },
      },
      en: {
        detailsTitle: 'Permission',
        fields: {
          id: 'Id',
          name: 'Name',
          code: 'Code',
          path: 'Path',
        },
        itemElements: {
          permissionUsers: {
            title: 'Users with this permission',
            headers: {
              user: 'User',
            },
          },
        },
      },
    },
  },
}

</script>
