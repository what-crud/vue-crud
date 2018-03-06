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
  import Crud from '@/components/Crud.vue'

  export default {
    data() {
      return {
        prefix: 'crm',
        path: 'tasks',
        pageTitle: 'crm.tasks',
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
            name: 'name'
          },
        ]
      },
    },
    components: {
      Crud
    },
    i18n: {
      messages: {
        pl: {
          detailsTitle: 'Zadanie',
          fields: {
            id: 'Id',
            name: 'Nazwa',
          }
        },
        en: {
          detailsTitle: 'Task',
          fields: {
            id: 'Id',
            name: 'Name',
          }
        }
      }
    },
  }

</script>
