<template>
  <crud :itemElements="itemElements" :prefix="prefix" :path="path" :pageTitle="pageTitle" :fieldsInfo="fieldsInfo" :detailsTitle="$t('detailsTitle')">
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
      fieldsInfo () {
        return [
          {
            text: this.$t('fields.id'),
            name: 'id',
            details: false
          },
          {
            type: 'select',
            url: 'crm/companies',
            list: {
              value: 'id',
              text: 'common_name',
              data: []
            },
            column: 'company_id',
            text: this.$t('fields.company'),
            name: 'company',
            apiObject: {
              name: 'company.common_name',
            },
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
            name: 'person',
            apiObject: {
              name: 'person.fullname',
            },
          },
          {
            type: 'input',
            column: 'name',
            text: this.$t('fields.name'),
            required: false,
            name: 'name'
          },
          {
            type: 'input',
            column: 'email',
            text: this.$t('fields.email'),
            required: false,
            name: 'email'
          },
          {
            type: 'input',
            column: 'phone',
            text: this.$t('fields.phone'),
            required: false,
            name: 'phone'
          },
          {
            type: 'input',
            column: 'email_2',
            text: this.$t('fields.email_2'),
            required: false,
            name: 'email_2',
          },
          {
            type: 'input',
            column: 'phone_2',
            text: this.$t('fields.phone_2'),
            required: false,
            name: 'phone_2',
          },
          {
            type: 'input',
            column: 'phone_3',
            text: this.$t('fields.phone_3'),
            required: false,
            name: 'phone_3',
          },
          {
            type: 'input',
            column: 'comment',
            text: this.$t('fields.comment'),
            required: false,
            table: false
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
            positionTasks: {
              title: 'Stanowisko - zadania',
              headers: {
                task: 'Zadanie'
              }
            }
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
            positionTasks: {
              title: 'Position - tasks',
              headers: {
                task: 'Task'
              }
            }
          }
        }
      }
    },
  }

</script>
