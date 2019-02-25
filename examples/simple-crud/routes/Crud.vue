<template>
  <div>
    <crud :prefix="prefix" :path="path" :pageTitle="pageTitle" :fieldsInfo="fieldsInfo" :detailsTitle="$t('detailsTitle')">
    </crud>
    <alert-box></alert-box>
  </div>
</template>

<script>
  import Crud from '@/utils/crud/components/Crud.vue'
  import AlertBox from "@/utils/app/components/AlertBox.vue";

  export default {
    data() {
      return {
        prefix: 'demo',
        path: 'tasks',
        pageTitle: 'demo.tasks',
      }
    },
    computed: {
      fieldsInfo() {
        return [{
            text: this.$t('fields.id'),
            name: 'id',
            details: false,
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
            column: 'description',
            text: this.$t('fields.description'),
            name: 'description',
            required: false
          },
        ]
      },
    },
    components: {
      Crud,
      AlertBox,
    },
    i18n: {
      messages: {
        en: {
          detailsTitle: 'Task',
          fields: {
            id: 'Id',
            name: 'Name',
            description: 'Description'
          }
        }
      }
    },
  }
</script>