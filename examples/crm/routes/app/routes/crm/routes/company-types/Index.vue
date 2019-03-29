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
import Crud from '@/utils/crud/components/Crud.vue'

export default {
  data () {
    return {
      prefix: 'crm',
      path: 'company-types',
      pageTitle: 'crm.companyTypes'
    }
  },
  computed: {
    fieldsInfo () {
      return [
        {
          text: this.$t('fields.id'),
          name: 'id',
          details: false
        },
        {
          type: 'input',
          column: 'name',
          text: this.$t('fields.name'),
          name: 'name',
          multiedit: false
        },
        {
          type: 'input',
          column: 'code',
          text: this.$t('fields.code'),
          name: 'code',
          multiedit: false
        }
      ]
    }
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
          code: 'Kod'
        }
      },
      en: {
        detailsTitle: 'Company type',
        fields: {
          id: 'Id',
          name: 'Name',
          code: 'Code'
        }
      }
    }
  }
}

</script>
