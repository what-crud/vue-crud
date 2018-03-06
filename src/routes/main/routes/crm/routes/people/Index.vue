<template>
  <div>
    <crud
      :customButtons="buttons"
      :prefix="prefix"
      :path="path"
      :pageTitle="pageTitle"
      :fieldsInfo="fieldsInfo"
      :detailsTitle="$t('detailsTitle')"
      :editButton="false"
      :watchForCreation="true"
    >
    </crud>
    <person :fields="peopleFields"></person>
  </div>
</template>

<script>
  import Crud from '@/components/Crud.vue'
  import Person from './components/Person.vue'
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    components: {
      Crud,
      Person
    },
    data() {
      return {
        prefix: 'crm',
        path: 'people',
        pageTitle: 'crm.people',
      }
    },
    watch: {
      itemCreated: function (newValue, oldValue) {
        let created = this.createdElement.created
        if (created){
          let id = this.createdElement.id
          this.setCreatedItemStatus([false, null])
          this.goToPerson({id: id})
        }
      }
    },
    computed: {
      ...mapState('crud', [
        'createdElement',
      ]),
      ...mapGetters('crud', [
        'itemCreated',
      ]),
      buttons () {
        return [{
          name: 'goToPerson',
          icon: 'forward',
          color: 'blue',
          text: this.$t('buttons.goToPerson')
        }]
      },
      fieldsInfo () {
        return [
          {
            text: this.$t('fields.id'),
            name: 'id',
            details: false,
            hidden: true
          },
          {
            type: 'input',
            column: 'lastname',
            text: this.$t('fields.lastname'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            name: 'lastname',
          },
          {
            type: 'input',
            column: 'firstname',
            text: this.$t('fields.firstname'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            name: 'firstname',
          },
          {
            type: 'input',
            column: 'distinction',
            text: this.$t('fields.distinction'),
            required: false,
            grid: 'xs12 sm6 md4 lg6 xl4',
            name: 'distinction',
          },
          {
            type: 'select',
            url: 'crm/languages',
            list: {
              value: 'id',
              text: 'name',
              data: []
            },
            column: 'language_id',
            text: this.$t('fields.language'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            name: 'language',
            apiObject: {
              name: 'language.name',
            },
          },
          {
            type: 'select',
            url: 'crm/sexes',
            list: {
              value: 'id',
              text: 'name',
              data: []
            },
            column: 'sex_id',
            text: this.$t('fields.sex'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            name: 'sex',
            apiObject: {
              name: 'sex.name',
            },
          },
          {
            type: 'input',
            column: 'email',
            text: this.$t('fields.email'),
            required: false,
            grid: 'xs12 sm6 md4 lg6 xl4',
            name: 'email',
          },
          {
            type: 'input',
            column: 'phone',
            text: this.$t('fields.phone'),
            required: false,
            grid: 'xs12 sm6 md4 lg6 xl4',
            name: 'phone',
          },
        ]
      },
      peopleFields () {
        return this.fieldsInfo.filter(field => field.hidden != true)
      },
    },
    methods: {
      ...mapMutations('crm', [
        'showPersonDialog'
      ]),
      ...mapMutations('crud', [
        'setCreatedItemStatus'
      ]),
      ...mapActions('crm', [
        'getPerson'
      ]),
      goToPerson (item) {
        this.getPerson([item.id])
        this.showPersonDialog()
      },
    },
    i18n: {
      messages: {
        pl: {
          detailsTitle: 'Osoba',
          buttons: {
            goToPerson: 'Przejdź do osoby'
          },
          fields: {
            id: 'Id',
            firstname: 'Imię',
            lastname: 'Nazwisko',
            fullname: 'Imię i Nazwisko',
            distinction: 'Wyróżnik',
            sex: 'Płeć',
            language: 'Język',
            email: 'E-mail',
            phone: 'Telefon',
          }
        },
        en: {
          detailsTitle: 'Person',
          buttons: {
            goToPerson: 'Go to person'
          },
          fields: {
            id: 'Id',
            firstname: 'Firstname',
            lastname: 'Lastname',
            fullname: 'Fullname',
            distinction: 'Distinction',
            sex: 'Sex',
            language: 'Language',
            email: 'E-mail',
            phone: 'Phone',
          }
        }
      }
    },
  }

</script>
