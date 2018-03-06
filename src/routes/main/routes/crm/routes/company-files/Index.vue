<template>
  <crud :meta="meta" :fileMode="true" :prefix="prefix" :path="path" :pageTitle="pageTitle" :fieldsInfo="fieldsInfo" :detailsTitle="$t('detailsTitle')">
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
        meta: [
          {
            name: 'path',
          }
        ]
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
            url: 'crm/companies',
            list: {
              value: 'id',
              text: 'common_name',
              data: []
            },
            column: 'company_id',
            text: this.$t('fields.company'),
            name: 'company',
            apiObject: {
              name: 'company.common_name',
            }
          },
          {
            type: 'file',
            column: 'filename',
            text: this.$t('fields.file'),
            name: 'filename',
          },
          {
            type: 'textarea',
            column: 'description',
            text: this.$t('fields.description'),
            name: 'description',
          },
          {
            text: this.$t('fields.type'),
            name: 'type',
            apiObject: {
              name: 'mime',
            },
            details: false,
          },
          {
            text: this.$t('fields.size'),
            name: 'size',
            apiObject: {
              name: 'size',
              functions: ['humanFileSize']
            },
            sortable: false,
            details: false,
          },
        ]
      },
    },
    methods: {},
    components: {
      Crud
    },
    i18n: {
      messages: {
        pl: {
          detailsTitle: 'Plik',
          fields: {
            id: 'Id',
            company: 'Firma',
            file: 'Plik',
            description: 'Opis',
            type: 'Typ pliku',
            size: 'Rozmiar'
          },
        },
        en: {
          detailsTitle: 'File',
          fields: {
            id: 'Id',
            company: 'Company',
            file: 'File',
            description: 'Description',
            type: 'File type',
            size: 'Size'
          },
        }
      }
    },
  }

</script>
