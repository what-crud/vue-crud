<template>
  <crud
    :prefix="prefix"
    :path="path"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    delete-mode="hard"
    :details-title="$t('detailsTitle')"
  >
  </crud>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'

export default {
  data () {
    return {
      prefix: 'crm',
      path: 'position-tasks',
      pageTitle: 'crm.positionTasks',
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
          text: this.$t('fields.positionPerson'),
          name: 'positionPerson',
          apiObject: {
            name: 'position.person.fullname',
          },
          details: false,
        },
        {
          text: this.$t('fields.positionCompany'),
          name: 'positionCompany',
          apiObject: {
            name: 'position.company.common_name',
          },
          details: false,
        },
        {
          type: 'select',
          url: 'crm/positions',
          list: {
            value: 'id',
            text: 'complexName',
            complexName: [
              'person.fullname',
              'company.common_name',
              'name',
            ],
            data: [],
          },
          column: 'position_id',
          text: this.$t('fields.position'),
          name: 'position',
          apiObject: {
            name: 'position.name',
          },
        },
        {
          type: 'select',
          url: 'crm/tasks',
          list: {
            value: 'id',
            text: 'name',
            data: [],
          },
          column: 'task_id',
          text: this.$t('fields.task'),
          name: 'task',
          apiObject: {
            name: 'task.name',
          },
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
        detailsTitle: 'Stanowisko - zadanie',
        fields: {
          id: 'Id',
          positionPerson: 'Osoba',
          positionCompany: 'Firma',
          position: 'Nazwa stanowiska',
          task: 'Zadanie',
        },
      },
      en: {
        detailsTitle: 'Position - task',
        fields: {
          id: 'Id',
          positionPerson: 'Person',
          positionCompany: 'Company',
          position: 'Position',
          task: 'Task',
        },
      },
    },
  },
}

</script>
