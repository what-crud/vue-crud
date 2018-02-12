<template>
  <div>
    <crud :customButtons="buttons" :prefix="prefix" :path="path" :pageTitle="pageTitle" :headers="headers" :fieldsInfo="fieldsInfo"
      :detailsTitle="$t('detailsTitle')" :editButton="false">
    </crud>
    <person :fields="fields"></person>
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
    computed: {
      buttons () {
        return [{
          name: 'goToPerson',
          icon: 'forward',
          color: 'blue',
          text: this.$t('buttons.goToPerson')
        }]
      },
      fields () {
        return [{
            type: 'input',
            column: 'firstname',
            text: this.$t('fields.firstname'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            create: true,
          },
          {
            type: 'input',
            column: 'lastname',
            text: this.$t('fields.lastname'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            create: true,
          },
          {
            type: 'input',
            column: 'distinction',
            text: this.$t('fields.distinction'),
            required: false,
            grid: 'xs12 sm6 md4 lg6 xl4',
            create: true,
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
            create: true,
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
            create: true,
          },
          {
            type: 'input',
            column: 'email',
            text: this.$t('fields.email'),
            required: false,
            grid: 'xs12 sm6 md4 lg6 xl4',
            create: true,
          },
          {
            type: 'input',
            column: 'phone',
            text: this.$t('fields.phone'),
            required: false,
            grid: 'xs12 sm6 md4 lg6 xl4',
            create: true,
          },
        ]
      },
      headers () {
        return [{
            text: this.$t('fields.id'),
            value: 'id'
          },
          {
            text: this.$t('fields.fullname'),
            value: 'fullname'
          },
          {
            text: this.$t('fields.distinction'),
            value: 'distinction'
          },
          {
            text: this.$t('fields.sex'),
            value: 'sex'
          },
          {
            text: this.$t('fields.language'),
            value: 'language'
          },
          {
            text: this.$t('fields.email'),
            value: 'email'
          },
          {
            text: this.$t('fields.phone'),
            value: 'phone'
          },
        ]
      },
      fieldsInfo () {
        return this.fields.filter(field => field.create)
      },
    },
    methods: {
      ...mapMutations('crm', [
        'showPersonDialog'
      ]),
      ...mapActions('crm', [
        'getPerson'
      ]),
      custom (name, id) {
        this[name](id)
      },
      goToPerson (id) {
        this.getPerson([id])
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
