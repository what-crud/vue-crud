<template>
  <crud :prefix="prefix" :path="path" :pageTitle="pageTitle" :headers="headers" :fieldsInfo="fieldsInfo" :softDeletes="false"
    :detailsTitle="$t('detailsTitle')">
  </crud>
</template>

<script>
  import Vue from 'vue'
  import Crud from '@/components/Crud.vue'
  import {
    mapActions,
    mapMutations
  } from 'vuex'

  export default {
    data() {
      return {
        prefix: 'crm',
        path: 'position-tasks',
        pageTitle: 'crm.positionTasks',
      }
    },
    computed: {
      fieldsInfo() {
        return [{
            type: 'select',
            url: 'crm/positions',
            list: {
              value: 'id',
              text: 'complexName',
              complexName: ['person.fullname', 'company.common_name', 'name'],
              data: []
            },
            column: 'position_id',
            text: this.$t('fields.position'),
          },
          {
            type: 'select',
            url: 'crm/tasks',
            list: {
              value: 'id',
              text: 'name',
              data: []
            },
            column: 'task_id',
            text: this.$t('fields.task'),
          },
        ]
      },
      headers() {
        return [{
            text: this.$t('fields.id'),
            value: 'id'
          },
          {
            text: this.$t('fields.positionPerson'),
            value: 'positionPerson'
          },
          {
            text: this.$t('fields.positionCompany'),
            value: 'positionCompany'
          },
          {
            text: this.$t('fields.position'),
            value: 'position'
          },
          {
            text: this.$t('fields.task'),
            value: 'task'
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
          detailsTitle: 'Stanowisko - zadanie',
          fields: {
            id: 'Id',
            positionPerson: 'Osoba',
            positionCompany: 'Firma',
            position: 'Nazwa stanowiska',
            task: 'Zadanie',
          }
        },
        en: {
          detailsTitle: 'Position - task',
          fields: {
            id: 'Id',
            positionPerson: 'Person',
            positionCompany: 'Company',
            position: 'Position',
            task: 'Task',
          }
        }
      }
    },
  }

</script>
