<template>
  <div>
      <sales-invoice-positions-table
        :fieldsInfo="fileteredTableFields"
        :detailsLoader="detailsLoader" :tableData="childrenList(fileteredTableFields, [], 'id', childItemName)"
      ></sales-invoice-positions-table>
      <sales-invoice-position-details :details="salesInvoicePositionDetails" :fieldsInfo="fileteredDetailsFields"></sales-invoice-position-details>
  </div>
</template>

<script>
  import SalesInvoicePositionsTable from './SalesInvoicePositionsTable.vue'
  import ChildDetails from '@/crud/components/ChildDetails.vue'
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    components: {
      SalesInvoicePositionsTable,
      'sales-invoice-position-details': ChildDetails
    },
    data() {
      return {}
    },
    computed: {
      ...mapState('finances', [
        'salesInvoicePositionDetails'
      ]),
      ...mapGetters('finances', [
        'salesInvoice',
        'salesInvoicePositions',
      ]),
      fieldsInfo () {
        return [
          {
            type: 'select',
            url: 'finances/services',
            list: {
              value: 'id',
              text: 'name',
              data: []
            },
            column: 'service_id',
            text: this.$t('fields.service'),
          },
          {
            type: 'input',
            column: 'description',
            text: this.$t('fields.description'),
            required: false
          },
          {
            type: 'input',
            column: 'info',
            text: this.$t('fields.info'),
            required: false
          },
          {
            type: 'decimal',
            column: 'value',
            text: this.$t('fields.value'),
            required: false
          },
        ]
      },
      headers () {
        return [{
            text: this.$t('fields.id'),
            value: 'id'
          },
          {
            value: 'service',
            text: this.$t('fields.service'),
          },
          {
            value: 'description',
            text: this.$t('fields.description'),
          },
          {
            value: 'info',
            text: this.$t('fields.info'),
          },
          {
            value: 'value',
            text: this.$t('fields.value'),
          },
        ]
      },
    },
    methods: {
      ...mapMutations('finances', [
        'hideSalesInvoicePositionDialog',
        'resetSalesInvoicePosition',
        'editSalesInvoicePositionDialog',
        'createSalesInvoicePositionDialog',
      ]),
      ...mapActions('finances', [
        'updateSalesInvoicePosition',
        'storeSalesInvoicePosition',
        'getSalesInvoicePosition'
      ]),
      edit(id) {
        this.getSalesInvoicePosition([id])
        this.editSalesInvoicePositionDialog(id)
      },
      create () {
        this.resetSalesInvoicePosition()
        this.createSalesInvoicePositionDialog()
      },
      suspend (id) {
        this.updateSalesInvoicePosition([
          id,
          {active: 0},
          this.$t('global.alerts.suspended')
        ])
      },
      restore (id) {
        this.updateSalesInvoicePosition([
          id,
          {active: 1},
          this.$t('global.alerts.restored')
        ])
      },
      reset () {
        this.resetSalesInvoicePosition()
      },
      close () {
        this.hideSalesInvoicePositionDialog()
      },
      update (id, data) {
        this.close()
        this.updateSalesInvoicePosition([
          id,
          data,
          this.$t('global.alerts.updated')
        ])
      },
      store (data) {
        data.sales_invoice_id = this.salesInvoice.id
        this.close()
        this.storeSalesInvoicePosition([
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
            description: 'Opis',
            info: 'Info',
            value: 'Wartość',
            service: 'Usługa',
          }
        },
        en: {
          fields: {
            id: 'Id',
            description: 'Description',
            info: 'Info',
            value: 'Value',
            service: 'Service',
          }
        }
      }
    },
  }

</script>
