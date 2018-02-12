<template>
  <crud
    :prefix="prefix"
    :path="path"
    :pageTitle="pageTitle"
    :headers="headers"
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
            type: 'input',
            column: 'name',
            text: this.$t('fields.name')
          },
        ]
      },
      headers () {
        return [
          {
            text: this.$t('fields.id'),
            value: 'id'
          },
          {
            text: this.$t('fields.name'),
            value: 'name'
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
