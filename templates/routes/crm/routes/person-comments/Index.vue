<template>
  <crud :prefix="prefix" :path="path" :pageTitle="pageTitle" :fieldsInfo="fieldsInfo" :detailsTitle="$t('detailsTitle')">
  </crud>
</template>

<script>
import Crud from '@/crud/components/Crud.vue'
import FieldsInfoMixin from "./mixins/fields.js";
import LocalesMixin from "./mixins/locales.js";

export default {
  mixins: [FieldsInfoMixin, LocalesMixin],
  data() {
    return {
      prefix: 'crm',
      path: 'person-comments',
      pageTitle: 'crm.personComments',
    }
  },
  components: {
    Crud
  },
}

</script>
