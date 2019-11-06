<template>
  <crud
    :prefix="prefix"
    :path="path"
    :paths="paths"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    :details-title="$t('detailsTitle')"
    deleteMode="both"
  >
  </crud>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'

export default {
  data () {
    return {
      prefix: 'crud/store',
      path: 'transactions',
      paths: {
        i: 'store/transactions',
        sh: 'store/transactions',
      },
      pageTitle: 'store.transactions',
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
          url: 'crud/store/customers',
          list: {
            value: 'id',
            text: 'email',
            data: [],
          },
          column: 'customer_id',
          text: this.$t('fields.customer'),
          name: 'customer_id',
          apiObject: {
            name: 'customer.email',
          },
        },
        {
          type: 'select',
          url: 'crud/store/statuses',
          list: {
            value: 'id',
            text: 'name',
            data: [],
          },
          column: 'status_id',
          text: this.$t('fields.status'),
          name: 'status_id',
          apiObject: {
            name: 'status.name',
          },
        },
        {
          type: 'datetime',
          column: 'accepted_at',
          text: this.$t('fields.accepted_at'),
          name: 'accepted_at',
          multiedit: false,
          required: false,
        },
        {
          type: 'datetime',
          column: 'started_at',
          text: this.$t('fields.started_at'),
          name: 'started_at',
          multiedit: false,
          required: false,
        },
        {
          type: 'datetime',
          column: 'sent_at',
          text: this.$t('fields.sent_at'),
          name: 'sent_at',
          multiedit: false,
          required: false,
        },
        {
          type: 'datetime',
          column: 'delivered_at',
          text: this.$t('fields.delivered_at'),
          name: 'delivered_at',
          multiedit: false,
          required: false,
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
        detailsTitle: 'Transakcja',
        fields: {
          id: 'Id',
          customer: 'Klient',
          status: 'Status zamówienia',
          accepted_at: 'Przyjęto',
          started_at: 'Rozpoczęto',
          sent_at: 'Wysłano',
          delivered_at: 'Dostarczono',
        },
      },
      en: {
        detailsTitle: 'Transaction',
        fields: {
          id: 'Id',
          customer: 'Customer',
          status: 'Status',
          accepted_at: 'Accepted at',
          started_at: 'Started at',
          sent_at: 'Sent at',
          delivered_at: 'Delivered at',
        },
      },
    },
  },
}

</script>
