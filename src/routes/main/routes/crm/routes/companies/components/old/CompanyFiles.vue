<template>
  <div>
      <files-table
        :headers="headers"
        :tableData="companyFiles"
      ></files-table>
      <file-details :details="companyFileDetails" :fieldsInfo="fieldsInfo"></file-details>
  </div>
</template>

<script>
  import FilesTable from './FilesTable.vue'
  import FileDetails from './FileDetails.vue'
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    components: {
      FilesTable,
      FileDetails
    },
    data() {
      return {}
    },
    computed: {
      ...mapState('crm', [
        'companyFileDetails'
      ]),
      ...mapGetters('crm', [
        'company',
        'companyFiles',
      ]),
      fieldsInfo () {
        return [
          {
            type: 'file',
            column: 'filename',
            text: this.$t('fields.file'),
          },
          {
            type: 'textarea',
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
            text: this.$t('fields.file'),
            value: 'filename'
          },
          {
            text: this.$t('fields.description'),
            value: 'description'
          },
          {
            text: this.$t('fields.type'),
            value: 'type'
          },
          {
            text: this.$t('fields.size'),
            value: 'size',
            sortable: false
          },
        ]
      },
    },
    methods: {
      ...mapMutations('crm', [
        'hideCompanyFileDialog',
        'resetCompanyFile',
        'editCompanyFileDialog',
        'createCompanyFileDialog',
      ]),
      ...mapActions('crm', [
        'updateCompanyFile',
        'storeCompanyFile',
        'getCompanyFile'
      ]),
      edit(id) {
        this.getCompanyFile([id])
        this.editCompanyFileDialog(id)
      },
      create () {
        this.resetCompanyFile()
        this.createCompanyFileDialog()
      },
      suspend (id) {
        this.updateCompanyFile([
          id,
          {active: 0},
          this.$t('global.alerts.suspended')
        ])
      },
      restore (id) {
        this.updateCompanyFile([
          id,
          {active: 1},
          this.$t('global.alerts.restored')
        ])
      },
      reset () {
        this.resetCompanyFile()
      },
      close () {
        this.hideCompanyFileDialog()
      },
      update (id, data) {
        this.close()
        this.updateCompanyFile([
          id,
          data,
          this.$t('global.alerts.updated')
        ])
      },
      store (data) {
        data.company_id = this.company.id
        this.close()
        this.storeCompanyFile([
          data,
          this.$t('global.alerts.stored')
        ])
      },
    },
    i18n: {
      messages: {
        pl: {
          fields: {
            id: 'Id',
            company: 'Firma',
            file: 'Plik',
            description: 'Opis',
            type: 'Typ pliku',
            size: 'Rozmiar'
          }
        },
        en: {
          fields: {
            id: 'Id',
            company: 'Company',
            file: 'File',
            description: 'Description',
            type: 'File type',
            size: 'Size'
          }
        }
      }
    },
  }

</script>
