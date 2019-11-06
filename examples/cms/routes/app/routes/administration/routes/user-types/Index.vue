<template>
  <crud
    :prefix="prefix"
    :path="path"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    :details-title="$t('detailsTitle')"
  >
  </crud>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'

export default {
  data () {
    return {
      prefix: 'crud/admin',
      path: 'user-types',
      pageTitle: 'admin.userTypes',
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
          type: 'input',
          column: 'name',
          text: this.$t('fields.name'),
          name: 'name',
          multiedit: false,
        },
        {
          type: 'checkbox',
          column: 'read',
          text: this.$t('fields.read'),
          name: 'read',
          apiObject: {
            name: 'read',
            functions: ['boolean'],
          },
          textMode: 'html',
        },
        {
          type: 'checkbox',
          column: 'insert',
          text: this.$t('fields.insert'),
          name: 'insert',
          apiObject: {
            name: 'insert',
            functions: ['boolean'],
          },
          textMode: 'html',
        },
        {
          type: 'checkbox',
          column: 'update',
          text: this.$t('fields.update'),
          name: 'update',
          apiObject: {
            name: 'update',
            functions: ['boolean'],
          },
          textMode: 'html',
        },
        {
          type: 'checkbox',
          column: 'delete',
          text: this.$t('fields.delete'),
          name: 'delete',
          apiObject: {
            name: 'delete',
            functions: ['boolean'],
          },
          textMode: 'html',
        },
        {
          type: 'checkbox',
          column: 'admin',
          text: this.$t('fields.admin'),
          name: 'admin',
          apiObject: {
            name: 'admin',
            functions: ['boolean'],
          },
          textMode: 'html',
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
          read: 'Podgląd',
          insert: 'Dodawanie',
          update: 'Edycja',
          delete: 'Usuwanie',
          admin: 'Administracja',
        },
      },
      en: {
        detailsTitle: 'Permission',
        fields: {
          id: 'Id',
          name: 'Name',
          read: 'Read',
          insert: 'Add',
          update: 'Edit',
          delete: 'Delet',
          admin: 'Administration',
        },
      },
    },
  },
}

</script>
