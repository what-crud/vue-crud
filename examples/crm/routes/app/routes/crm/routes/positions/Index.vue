<template>
  <crud
    :item-elements="itemElements"
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
import FieldsInfoMixin from './mixins/fields'
import ItemElementsMixin from './mixins/item-elements'
import LocalesMixin from './mixins/locales'

export default {
  mixins: [
    FieldsInfoMixin,
    LocalesMixin,
    ItemElementsMixin,
  ],
  data () {
    return {
      prefix: 'crm',
      path: 'positions',
      pageTitle: 'crm.positions',
    }
  },
  components: {
    Crud,
  },
}

</script>
