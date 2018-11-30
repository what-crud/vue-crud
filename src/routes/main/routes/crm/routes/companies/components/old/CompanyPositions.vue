<template>
  <div>
      <positions-table
        :headers="headers"
        :tableData="companyPositions"
      ></positions-table>
      <position-details :details="positionDetails" :fieldsInfo="fieldsInfo"></position-details>
      <position-tasks></position-tasks>
  </div>
</template>

<script>
  import PositionsTable from '../../../components/PositionsTable.vue'
  import ChildDetails from '@/crud/components/ChildDetails.vue'
  import PositionTasks from '../../../components/PositionTasks.vue'
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    components: {
      PositionsTable,
      'position-details': ChildDetails,
      PositionTasks
    },
    data() {
      return {}
    },
    computed: {
      ...mapState('crm', [
        'positionDetails'
      ]),
      ...mapGetters('crm', [
        'company',
        'companyPositions',
      ]),
      fieldsInfo () {
        return [
          {
            type: 'select',
            url: 'crm/people',
            list: {
              value: 'id',
              text: 'fullname',
              data: []
            },
            column: 'person_id',
            text: this.$t('fields.person'),
          },
          {
            type: 'input',
            column: 'name',
            text: this.$t('fields.name'),
            required: false
          },
          {
            text: this.$t('fields.tasks'),
            name: 'tasks',
            apiObject: {
              name: 'position_tasks',
              functions: ['listTasks']
            },
            required: false,
            details: false
          },
          {
            type: 'input',
            column: 'email',
            text: this.$t('fields.email'),
            required: false
          },
          {
            type: 'input',
            column: 'email_2',
            text: this.$t('fields.email_2'),
            required: false
          },
          {
            type: 'input',
            column: 'phone',
            text: this.$t('fields.phone'),
            required: false
          },
          {
            type: 'input',
            column: 'phone_2',
            text: this.$t('fields.phone_2'),
            required: false
          },
          {
            type: 'input',
            column: 'phone_3',
            text: this.$t('fields.phone_3'),
            required: false
          },
          {
            type: 'input',
            column: 'comment',
            text: this.$t('fields.comment'),
            required: false
          },
        ]
      },
      headers () {
        return [{
            text: this.$t('fields.id'),
            value: 'id'
          },
          {
            value: 'person',
            text: this.$t('fields.person'),
          },
          {
            value: 'name',
            text: this.$t('fields.name'),
          },
          {
            value: 'tasks',
            text: this.$t('fields.tasks'),
          },
          {
            value: 'email',
            text: this.$t('fields.email'),
          },
          {
            value: 'phone',
            text: this.$t('fields.phone'),
          },
          {
            value: 'comment',
            text: this.$t('fields.comment'),
          },
          {
            value: 'phone_2',
            text: this.$t('fields.phone_2'),
          },
        ]
      },
    },
    methods: {
      ...mapMutations('crm', [
        'hidePositionDialog',
        'resetPosition',
        'editPositionDialog',
        'createPositionDialog',
      ]),
      ...mapActions('crm', [
        'updateCompanyPosition',
        'storeCompanyPosition',
        'getPosition'
      ]),
      edit(id) {
        this.getPosition([id])
        this.editPositionDialog(id)
      },
      create () {
        this.resetPosition()
        this.createPositionDialog()
      },
      suspend (id) {
        this.updateCompanyPosition([
          id,
          {active: 0},
          this.$t('global.alerts.suspended')
        ])
      },
      restore (id) {
        this.updateCompanyPosition([
          id,
          {active: 1},
          this.$t('global.alerts.restored')
        ])
      },
      reset () {
        this.resetPosition()
      },
      close () {
        this.hidePositionDialog()
      },
      update (id, data) {
        this.close()
        this.updateCompanyPosition([
          id,
          data,
          this.$t('global.alerts.updated')
        ])
      },
      store (data) {
        data.company_id = this.company.id
        this.close()
        this.storeCompanyPosition([
          data,
          this.$t('global.alerts.stored')
        ])
      },
    },
    i18n: {
      messages: {
        pl: {
          fields: {
            id: 'Id',
            name: 'Stanowisko',
            tasks: 'Zadania',
            company: 'Firma',
            person: 'Osoba',
            phone: 'Telefon',
            phone_2: 'Telefon 2',
            phone_3: 'Telefon 3',
            email: 'E-mail',
            email_2: 'E-mail 2',
            comment: 'Komentarz',
          }
        },
        en: {
          fields: {
            id: 'Id',
            name: 'Position',
            tasks: 'Tasks',
            company: 'Company',
            person: 'Person',
            phone: 'Phone',
            phone_2: 'Phone 2',
            phone_3: 'Phone 3',
            email: 'E-mail',
            email_2: 'E-mail 2',
            comment: 'Comment',
          }
        }
      }
    },
  }

</script>
