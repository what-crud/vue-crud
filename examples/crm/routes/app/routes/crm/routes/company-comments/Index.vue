<template>
  <crud
    :prefix="prefix"
    :path="path"
    :paths="paths"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    :details-title="$t('detailsTitle')"
  >
  </crud>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'
import FieldsInfoMixin from './mixins/fields'
import LocalesMixin from './mixins/locales'

export default {
  mixins: [
    FieldsInfoMixin,
    LocalesMixin,
  ],
  data () {
    return {
      prefix: 'crud/crm',
      path: 'company-comments',
      paths: {
        i: 'crm/company-comments',
        st: 'crm/company-comments',
        u: 'crm/company-comments',
      },
      pageTitle: 'crm.companyComments',
    }
  },
  components: {
    Crud,
  },
}

</script>
