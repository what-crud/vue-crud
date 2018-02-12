<template>
  <div>
    <crud 
      :customButtons="buttons"
      :prefix="prefix"
      :path="path"
      :pageTitle="pageTitle"
      :headers="headers"
      :fieldsInfo="fieldsInfo"
      :detailsTitle="$t('detailsTitle')"
      :editButton="false">
    </crud>
    <company :fields="fields"></company>
  </div>
</template>

<script>
  import Crud from '@/components/Crud.vue'
  import Company from './components/Company.vue'
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    components: {
      Crud,
      Company
    },
    data() {
      return {
        prefix: 'crm',
        path: 'companies',
        pageTitle: 'crm.companies',
      }
    },
    computed: {
      buttons () {
        return [{
          name: 'goToCompany',
          icon: 'forward',
          color: 'blue',
          text: this.$t('buttons.goToCompany')
        }]
      },
      fields () {
        return [{
            type: 'input',
            column: 'name',
            text: this.$t('fields.name'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            create: true,
          },
          {
            type: 'input',
            column: 'common_name',
            text: this.$t('fields.commonName'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            create: true,
          },
          {
            type: 'select',
            url: 'crm/company-types',
            list: {
              value: 'id',
              text: 'name',
              data: []
            },
            column: 'company_type_id',
            text: this.$t('fields.companyType'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            create: true,
          },
          {
            type: 'select',
            url: 'crm/street-prefixes',
            list: {
              value: 'id',
              text: 'description',
              data: []
            },
            column: 'street_prefix_id',
            text: this.$t('fields.streetPrefix'),
            grid: 'xs6 sm3 md2 lg3 xl2',
            create: true,
          },
          {
            type: 'input',
            column: 'street',
            text: this.$t('fields.street'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
          {
            type: 'input',
            column: 'house_number',
            text: this.$t('fields.houseNumber'),
            grid: 'xs6 sm3 md2 lg3 xl2',
          },
          {
            type: 'input',
            column: 'apartment_number',
            text: this.$t('fields.apartmentNumber'),
            grid: 'xs6 sm3 md2 lg3 xl2',
          },
          {
            type: 'input',
            column: 'zip_code',
            text: this.$t('fields.zipCode'),
            grid: 'xs6 sm3 md2 lg3 xl2',
          },
          {
            type: 'input',
            column: 'city',
            text: this.$t('fields.city'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
          {
            type: 'input',
            column: 'borough',
            text: this.$t('fields.borough'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
          {
            type: 'input',
            column: 'county',
            text: this.$t('fields.county'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
          {
            type: 'input',
            column: 'voivodship',
            text: this.$t('fields.voivodship'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
          {
            type: 'input',
            column: 'email',
            text: this.$t('fields.email'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
          {
            type: 'input',
            column: 'web_page',
            text: this.$t('fields.webPage'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
          {
            type: 'input',
            column: 'fax',
            text: this.$t('fields.fax'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
          {
            type: 'input',
            column: 'coordinates_lat',
            text: this.$t('fields.coordinatesLat'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
          {
            type: 'input',
            column: 'coordinates_lng',
            text: this.$t('fields.coordinatesLng'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
          {
            type: 'checkbox',
            column: 'coordinates_checked',
            text: this.$t('fields.coordinatesChecked'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
          {
            type: 'input',
            column: 'google_map_place',
            text: this.$t('fields.googleMapPlace'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
          {
            type: 'select',
            url: 'crm/street-prefixes',
            list: {
              value: 'id',
              text: 'description',
              data: []
            },
            column: 'correspondence_street_prefix_id',
            text: this.$t('fields.correspondenceStreetPrefix'),
            grid: 'xs6 sm3 md2 lg3 xl2',
            create: true,
          },
          {
            type: 'input',
            column: 'correspondence_street',
            text: this.$t('fields.correspondenceStreet'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
          {
            type: 'input',
            column: 'correspondence_house_number',
            text: this.$t('fields.correspondenceHouseNumber'),
            grid: 'xs6 sm3 md2 lg3 xl2',
          },
          {
            type: 'input',
            column: 'correspondence_apartment_number',
            text: this.$t('fields.correspondenceApartmentNumber'),
            grid: 'xs6 sm3 md2 lg3 xl2',
          },
          {
            type: 'input',
            column: 'correspondence_zip_code',
            text: this.$t('fields.correspondenceZipCode'),
            grid: 'xs6 sm3 md2 lg3 xl2',
          },
          {
            type: 'input',
            column: 'correspondence_city',
            text: this.$t('fields.correspondenceCity'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
          {
            type: 'input',
            column: 'correspondence_borough',
            text: this.$t('fields.correspondenceBorough'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
          {
            type: 'input',
            column: 'correspondence_county',
            text: this.$t('fields.correspondenceCounty'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
          {
            type: 'input',
            column: 'correspondence_voivodship',
            text: this.$t('fields.correspondenceVoivodship'),
            grid: 'xs12 sm6 md4 lg6 xl4',
          },
        ]
      },
      fieldsInfo () {
        return this.fields.filter(field => field.create)
      },
      headers () {
        return [{
            text: this.$t('fields.id'),
            value: 'id'
          },
          {
            text: this.$t('fields.companyType'),
            value: 'companyType'
          },
          {
            text: this.$t('fields.name'),
            value: 'name'
          },
          {
            text: this.$t('fields.commonName'),
            value: 'commonName'
          },
          {
            text: this.$t('fields.streetPrefix'),
            value: 'streetPrefix'
          },
          {
            text: this.$t('fields.address'),
            value: 'address'
          },
          {
            text: this.$t('fields.city'),
            value: 'city'
          },
          {
            text: this.$t('fields.nip'),
            value: 'nip'
          },
        ]
      },
    },
    methods: {
      ...mapMutations('crm', [
        'showCompanyDialog'
      ]),
      ...mapActions('crm', [
        'getCompany'
      ]),
      custom (name, id) {
        this[name](id)
      },
      goToCompany (id) {
        this.getCompany([id])
        this.showCompanyDialog()
      },
    },
    i18n: {
      messages: {
        pl: {
          detailsTitle: 'Firma',
          buttons: {
            goToCompany: 'Przejdź do firmy'
          },
          fields: {
            id: 'Id',
            name: 'Nazwa',
            commonName: 'Nazwa użytkowa',
            companyType: 'Typ firmy',
            nip: 'NIP',
            regon: 'REGON',
            krs: 'KRS',
            streetPrefix: 'Typ ulicy',
            street: 'Ulica',
            houseNumber: 'Nr budynku',
            apartmentNumber: 'Nr lokalu',
            address: 'Adres',
            zipCode: 'Kod pocztowy',
            city: 'Miejscowość',
            borough: 'Gmina',
            county: 'Powiat',
            voivodship: 'Województwo',
            email: 'E-mail',
            webPage: 'Strona www',
            fax: 'Fax',
            coordinatesLat: 'Szer. geograficzna',
            coordinatesLng: 'Dł. geograficzna',
            coordinatesChecked: 'Współrzędne sprawdzone',
            googleMapPlace: 'Miejsce - Google Maps',
            parentCompany: 'Nadrzędna firma',
            correspondenceStreetPrefix: 'Typ ulicy (koresp.)',
            correspondenceStreet: 'Ulica (koresp.)',
            correspondenceHouseNumber: 'Nr budynku (koresp.)',
            correspondenceApartmentNumber: 'Nr lokalu (koresp.)',
            correspondenceZipCode: 'Kod pocztowy (koresp.)',
            correspondenceCity: 'Miejscowość (koresp.)',
            correspondenceBorough: 'Gmina (koresp.)',
            correspondenceCounty: 'Powiat (koresp.)',
            correspondenceVoivodship: 'Województwo (koresp.)',
            active: 'Aktywna',
          }
        },
        en: {
          detailsTitle: 'Company',
          buttons: {
            goToCompany: 'Go to company'
          },
          fields: {
            id: 'Id',
            name: 'Name',
            commonName: 'Common name',
            companyType: 'Company type',
            nip: 'NIP',
            regon: 'REGON',
            krs: 'KRS',
            streetPrefix: 'Street prefix',
            street: 'Street',
            houseNumber: 'House number',
            apartmentNumber: 'Apartment number',
            address: 'Address',
            zipCode: 'Zip code',
            city: 'City',
            borough: 'Borough',
            county: 'County',
            voivodship: 'Voivodship',
            email: 'E-mail',
            webPage: 'Web page',
            fax: 'Fax',
            coordinatesLat: 'Coordinates - LAT.',
            coordinatesLng: 'Coordinates - LNG.',
            coordinatesChecked: 'Coordinates checked',
            googleMapPlace: 'Place - Google Maps',
            parentCompany: 'Parent company',
            correspondenceStreetPrefix: 'Street prefix (corresp.)',
            correspondenceStreet: 'Street (corresp.)',
            correspondenceHouseNumber: 'House number (corresp.)',
            correspondenceApartmentNumber: 'Apartment number (corresp.)',
            correspondenceZipCode: 'Zip code (corresp.)',
            correspondenceCity: 'City (corresp.)',
            correspondenceBorough: 'Borough (corresp.)',
            correspondenceCounty: 'County (corresp.)',
            correspondenceVvoivodship: 'Voivodship (corresp.)',
            active: 'Aktywna',
          }
        }
      }
    },
  }
</script>
