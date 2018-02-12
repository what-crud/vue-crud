<template>
  <crud :itemElements="itemElements" :prefix="prefix" :path="path" :pageTitle="pageTitle" :headers="headers" :fieldsInfo="fieldsInfo" :detailsTitle="$t('detailsTitle')">
  </crud>
</template>

<script>
  import Crud from '@/components/Crud.vue'

  export default {
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
            title: this.$t('itemElements.positionTasks'),
            url: 'crm/positions/{id}/tasks',
            controller: 'crm/position-tasks',
            itemObject: 'task_positions',
            column: 'name',
            primaryId: 'position_id',
            foreignId: 'task_id',
            icon: 'list',
            color: 'blue',
            buttonText: this.$t('itemElements.positionTasks')
          }
        }
      },
      fieldsInfo () {
        return [{
            type: 'select',
            url: 'crm/companies',
            list: {
              value: 'id',
              text: 'common_name',
              data: []
            },
            column: 'company_id',
            text: this.$t('fields.company'),
          },
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
            type: 'input',
            column: 'email',
            text: this.$t('fields.email'),
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
            column: 'email_2',
            text: this.$t('fields.email_2'),
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
        return [
          {
            text: this.$t('fields.id'),
            value: 'id'
          },
          {
            value: 'company',
            text: this.$t('fields.company'),
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
            value: 'email_2',
            text: this.$t('fields.email_2'),
          },
          {
            value: 'phone_2',
            text: this.$t('fields.phone_2'),
          },
          {
            value: 'phone_3',
            text: this.$t('fields.phone_3'),
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
          detailsTitle: 'Stanowisko',
          fields: {
            id: 'Id',
            name: 'Stanowisko',
            company: 'Firma',
            person: 'Osoba',
            phone: 'Telefon',
            phone_2: 'Telefon 2',
            phone_3: 'Telefon 3',
            email: 'E-mail',
            email_2: 'E-mail 2',
            comment: 'Komentarz',
          },
          itemElements: {
            positionTasks: 'Stanowisko - zadania'
          }
        },
        en: {
          detailsTitle: 'Position',
          fields: {
            id: 'Id',
            name: 'Position',
            company: 'Company',
            person: 'Person',
            phone: 'Phone',
            phone_2: 'Phone 2',
            phone_3: 'Phone 3',
            email: 'E-mail',
            email_2: 'E-mail 2',
            comment: 'Comment',
          },
          itemElements: {
            positionTasks: 'Position - tasks'
          }
        }
      }
    },
  }

</script>
