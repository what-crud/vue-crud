<template>
  <crud :itemElements="itemElements" :prefix="prefix" :path="path" :pageTitle="pageTitle" :fieldsInfo="fieldsInfo" :detailsTitle="$t('detailsTitle')">
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
      path: 'positions',
      pageTitle: 'crm.positions',
    }
  },
  computed: {
    itemElements() {
      return {
        positionTasks: {
          title: this.$t('itemElements.positionTasks.title'),
          url: 'crm/positions/{id}/tasks',
          controller: 'crm/position-tasks',
          itemObject: 'task_positions',
          columns: [
            {
              obj: 'name',
              name: 'task',
              header: this.$t('itemElements.positionTasks.headers.task'),
            },
          ],
          primaryId: 'position_id',
          foreignId: 'task_id',
          icon: 'list',
          color: 'blue',
          buttonText: this.$t('itemElements.positionTasks.title')
        }
      }
    },
  },
  components: {
    Crud
  },
}

</script>
