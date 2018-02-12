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
        path: 'company-files',
        pageTitle: 'crm.companyFiles',
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
            type: 'file',
            column: 'filename',
            text: this.$t('fields.filename'),
          },
          {
            type: 'input',
            column: 'description',
            text: this.$t('fields.description'),
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
            text: this.$t('fields.filename'),
            value: 'filename'
          },
          {
            text: this.$t('fields.description'),
            value: 'description'
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
          detailsTitle: 'Stanowisko',
          fields: {
            id: 'Id',
            company: 'Firma',
            filename: 'Nazwa pliku',
            description: 'Opis',
          }
        },
        en: {
          detailsTitle: 'Position',
          fields: {
            id: 'Id',
            company: 'Company',
            filename: 'File name',
            description: 'Description',
          }
        }
      }
    },
  }

</script>
