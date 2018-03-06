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
    <company :fields="companyFields"></company>
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
    watch: {
      itemCreated: function (newValue, oldValue) {
        let created = this.createdElement.created
        if (created){
          let id = this.createdElement.id
          this.setCreatedItemStatus([false, null])
          this.goToCompany({id: id})
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
          name: 'goToCompany',
          icon: 'forward',
          color: 'blue',
          text: this.$t('buttons.goToCompany')
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
            column: 'name',
            text: this.$t('fields.name'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            name: 'name',
          },
          {
            type: 'input',
            column: 'common_name',
            text: this.$t('fields.commonName'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            name: 'commonName',
            apiObject: {
              name: 'common_name',
            },
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
            name: 'companyType',
            apiObject: {
              name: 'company_type.name',
            }
          },
          {
            type: 'input',
            column: 'nip',
            text: this.$t('fields.nip'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            name: 'nip',
            details: false
          },
          {
            type: 'input',
            column: 'regon',
            text: this.$t('fields.regon'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'krs',
            text: this.$t('fields.krs'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
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
            name: 'streetPrefix',
            apiObject: {
              name: 'street_prefix.name',
            },
            details: false
          },
          {
            text: this.$t('fields.address'),
            name: 'address',
            details: false,
            hidden: true
          },
          {
            type: 'input',
            column: 'street',
            text: this.$t('fields.street'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'house_number',
            text: this.$t('fields.houseNumber'),
            grid: 'xs6 sm3 md2 lg3 xl2',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'apartment_number',
            text: this.$t('fields.apartmentNumber'),
            grid: 'xs6 sm3 md2 lg3 xl2',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'zip_code',
            text: this.$t('fields.zipCode'),
            grid: 'xs6 sm3 md2 lg3 xl2',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'city',
            text: this.$t('fields.city'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            name: 'city',
            details: false
          },
          {
            type: 'input',
            column: 'borough',
            text: this.$t('fields.borough'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'county',
            text: this.$t('fields.county'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'voivodship',
            text: this.$t('fields.voivodship'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'email',
            text: this.$t('fields.email'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'web_page',
            text: this.$t('fields.webPage'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'fax',
            text: this.$t('fields.fax'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'coordinates_lat',
            text: this.$t('fields.coordinatesLat'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'coordinates_lng',
            text: this.$t('fields.coordinatesLng'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
          },
          {
            type: 'checkbox',
            column: 'coordinates_checked',
            text: this.$t('fields.coordinatesChecked'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'google_map_place',
            text: this.$t('fields.googleMapPlace'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
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
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'correspondence_street',
            text: this.$t('fields.correspondenceStreet'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'correspondence_house_number',
            text: this.$t('fields.correspondenceHouseNumber'),
            grid: 'xs6 sm3 md2 lg3 xl2',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'correspondence_apartment_number',
            text: this.$t('fields.correspondenceApartmentNumber'),
            grid: 'xs6 sm3 md2 lg3 xl2',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'correspondence_zip_code',
            text: this.$t('fields.correspondenceZipCode'),
            grid: 'xs6 sm3 md2 lg3 xl2',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'correspondence_city',
            text: this.$t('fields.correspondenceCity'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'correspondence_borough',
            text: this.$t('fields.correspondenceBorough'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'correspondence_county',
            text: this.$t('fields.correspondenceCounty'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
          },
          {
            type: 'input',
            column: 'correspondence_voivodship',
            text: this.$t('fields.correspondenceVoivodship'),
            grid: 'xs12 sm6 md4 lg6 xl4',
            table: false,
            details: false
          },
        ]
      },
      companyFields () {
        return this.fieldsInfo.filter(field => field.hidden != true)
      },
    },
    methods: {
      ...mapMutations('crm', [
        'showCompanyDialog'
      ]),
      ...mapMutations('crud', [
        'setCreatedItemStatus'
      ]),
      ...mapActions('crm', [
        'getCompany'
      ]),
      goToCompany (item) {
        this.getCompany([item.id])
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
