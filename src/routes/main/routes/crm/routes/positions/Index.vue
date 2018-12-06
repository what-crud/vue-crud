<template>
  <crud :itemElements="itemElements" :prefix="prefix" :path="path" :pageTitle="pageTitle" :fieldsInfo="fieldsInfo" :detailsTitle="$t('detailsTitle')">
  </crud>
</template>

<script>
import Crud from '@/crud/components/Crud.vue'
import FieldsInfoMixin from "./mixins/fields.js";
import ItemElementsMixin from "./mixins/item-elements.js";
import LocalesMixin from "./mixins/locales.js";

export default {
  mixins: [FieldsInfoMixin, LocalesMixin, ItemElementsMixin],
  data() {
    return {
      prefix: 'crm',
      path: 'positions',
      pageTitle: 'crm.positions',
    }
  },
  components: {
    Crud
  },
}

</script>
