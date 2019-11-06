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
      prefix: 'crud/crm',
      path: 'company-comment-types',
      pageTitle: 'crm.companyCommentTypes',
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
      ]
    },
  },
  components: {
    Crud,
  },
  i18n: {
    messages: {
      pl: {
        detailsTitle: 'Firmy - typ komentarza',
        fields: {
          id: 'Id',
          name: 'Nazwa',
        },
      },
      en: {
        detailsTitle: 'Companies - comment type',
        fields: {
          id: 'Id',
          name: 'Name',
        },
      },
    },
  },
}
</script>
