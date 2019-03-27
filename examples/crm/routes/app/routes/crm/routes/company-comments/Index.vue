<template>
  <crud :prefix="prefix" :path="path" :pageTitle="pageTitle" :fieldsInfo="fieldsInfo" :detailsTitle="$t('detailsTitle')">
  </crud>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'
import FieldsInfoMixin from './mixins/fields'
import LocalesMixin from './mixins/locales'

export default {
  mixins: [FieldsInfoMixin, LocalesMixin],
  data () {
    return {
      prefix: 'crm',
      path: 'company-comments',
      pageTitle: 'crm.companyComments'
    }
  },
  components: {
    Crud
  }
}

</script>
