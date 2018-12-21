<template>
  <details-container :fieldsInfo="fields"></details-container>
</template>

<script>
import DetailsContainer from '@/crud/components/DetailsContainer.vue'
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'

export default {
  name: 'person-details',
  props: [
    'fieldsInfo'
  ],
  data() {
    return {}
  },
  computed: {
    ...mapState('crm', [
      'person',
    ]),
    fields () {
      let self = this
      let result = this.fieldsInfo.map(field => {
        let rField = field
        rField.value = this.person[field.column]
        if (field.type == 'select') {
          rField.value = parseInt(this.person[field.column]) || 1
        }
        if (field.type == 'checkbox') {
          rField.value = this.person[field.column] == '1' ? true : false
        }
        return rField
      })
      return result
    },
  },
  methods: {
    ...mapActions('crm', [
      'updatePerson',
    ]),
    update (field, value) {
      let obj = {}
      obj[field] = value
      this.updatePerson([
        this.person.id,
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
