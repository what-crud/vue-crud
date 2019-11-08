<template>
  <crud
    :prefix="prefix"
    :path="path"
    :paths="paths"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    :details-title="$t('detailsTitle')"
    deleteMode="hard"
  >
  </crud>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'

export default {
  data () {
    return {
      prefix: 'crud/store',
      path: 'transaction-products',
      paths: {
        i: 'store/transaction-products',
      },
      pageTitle: 'store.transactionProducts',
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
          url: 'store/products',
          list: {
            value: 'id',
            text: 'complexName',
            complexName: [
              'name',
              'section.name',
            ],
            data: [],
          },
          column: 'product_id',
          text: this.$t('fields.product'),
          name: 'product_id',
          apiObject: {
            name: 'product.name',
          },
        },
        {
          text: this.$t('fields.productSection'),
          name: 'product_section',
          apiObject: {
            name: 'product.section.name',
          },
          details: false,
        },
        {
          text: this.$t('fields.productDescription'),
          name: 'product_description',
          apiObject: {
            name: 'product.description',
          },
          details: false,
        },
        {
          type: 'select',
          url: 'store/transactions',
          list: {
            value: 'id',
            text: 'complexName',
            complexName: [
              'id',
              'customer.email',
            ],
            data: [],
          },
          column: 'transaction_id',
          text: this.$t('fields.transaction'),
          name: 'transaction_id',
          apiObject: {
            name: 'transaction.id',
          },
        },
        {
          text: this.$t('fields.transactionCustomer'),
          name: 'transaction_customer',
          apiObject: {
            name: 'transaction.customer.email',
          },
          details: false,
        },
        {
          text: this.$t('fields.transactionStatus'),
          name: 'transaction_status',
          apiObject: {
            name: 'transaction.status.name',
          },
          details: false,
        },
        {
          type: 'number',
          column: 'quantity',
          text: this.$t('fields.quantity'),
          name: 'quantity',
        },
        {
          type: 'decimal',
          column: 'value',
          text: this.$t('fields.value'),
          name: 'value',
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
        detailsTitle: 'Transakcja - produkt',
        fields: {
          id: 'Id',
          product: 'Produkt',
          productDescription: 'Opis produktu',
          productSection: 'Kategoria produkty',
          transaction: 'Transakcja',
          transactionCustomer: 'Klient',
          transactionStatus: 'Status zamówienia',
          quantity: 'Ilość',
          value: 'Wartość',
        },
      },
      en: {
        detailsTitle: 'Transaction - product',
        fields: {
          id: 'Id',
          product: 'Product',
          productDescription: 'Product description',
          productSection: 'Product section',
          transaction: 'Transaction',
          transactionCustomer: 'Customer',
          transactionStatus: 'Status',
          quantity: 'Quantity',
          value: 'Value',
        },
      },
    },
  },
}

</script>
