<template>
    <details-container :fieldsInfo="fields"></details-container>
</template>

<script>
  import DetailsContainer from '../../../components/DetailsContainer.vue'
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    name: 'company-details',
    props: [
      'fieldsInfo'
    ],
    data() {
      return {}
    },
    computed: {
      ...mapState('crm', [
        'company',
      ]),
      fields () {
        let self = this
        let result = this.fieldsInfo.map(field => {
          let rField = field
          rField.value = this.company[field.column]
          if (field.type == 'select') {
            rField.value = parseInt(this.company[field.column]) || 1
          }
          if (field.type == 'checkbox') {
            rField.value = this.company[field.column] == '1' ? true : false
          }
          return rField
        })
        return result
      },
    },
    methods: {
      ...mapActions('crm', [
        'updateCompany',
      ]),
      update (field, value) {
        let obj = {}
        obj[field] = value
        this.updateCompany([
          this.company.id,
          obj,
          this.$t('global.alerts.updated')
        ])
      },
    },
    components: {
      DetailsContainer
    }
  }

</script>
