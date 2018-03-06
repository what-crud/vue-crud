<template>
  <crud
    :prefix="prefix"
    :path="path"
    :pageTitle="pageTitle"
    :fieldsInfo="fieldsInfo"
    :detailsTitle="$t('detailsTitle')"
  >
  </crud>
</template>

<script>
  import Crud from '@/components/Crud.vue'

  export default {
    data() {
      return {
        prefix: 'admin',
        path: 'permissions',
        pageTitle: 'admin.permissions',
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
            name: 'name'
          },
          {
            type: 'input',
            column: 'code',
            text: this.$t('fields.code'),
            name: 'code'
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
          detailsTitle: 'Uprawnienie',
          fields: {
            id: 'Id',
            name: 'Nazwa',
            code: 'Kod',
          }
        },
        en: {
          detailsTitle: 'Permission',
          fields: {
            id: 'Id',
            name: 'Name',
            code: 'Code',
          }
        }
      }
    },
  }

</script>
