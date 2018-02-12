<template>
  <crud
    :prefix="prefix"
    :path="path"
    :pageTitle="pageTitle"
    :headers="headers"
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
        prefix: 'crm',
        path: 'company-types',
        pageTitle: 'crm.companyTypes',
      }
    },
    computed: {
      fieldsInfo () {
        return [
          {
            type: 'input',
            column: 'name',
            text: this.$t('fields.name')
          },
          {
            type: 'input',
            column: 'code',
            text: this.$t('fields.code')
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
            text: this.$t('fields.name'),
            value: 'name'
          },
          {
            text: this.$t('fields.code'),
            value: 'code'
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
          detailsTitle: 'Typ firmy',
          fields: {
            id: 'Id',
            name: 'Nazwa',
            code: 'Kod',
          }
        },
        en: {
          detailsTitle: 'Company type',
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
