<template>
  <div>
    <crud
      :customButtons="buttons"
      :prefix="prefix"
      :path="path"
      :paths="paths"
      :pageTitle="pageTitle"
      :fieldsInfo="fieldsInfo"
      :detailsTitle="$t('detailsTitle')"
      :editButton="false"
      :watchForCreation="true"
      primaryKey="id"
    ></crud>
    <item-details :fields="itemFields"></item-details>
  </div>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'
import FieldsInfoMixin from './mixins/fields'
import LocalesMixin from './mixins/locales'
import ItemDetails from './components/ItemDetails.vue'
import ExtendedControllerMixin from '@/utils/crud/mixins/extended-controller'
import {
  mapMutations,
  mapActions
} from 'vuex'

export default {
  mixins: [ExtendedControllerMixin, FieldsInfoMixin, LocalesMixin],
  components: {
    Crud,
    ItemDetails
  },
  data () {
    return {
      prefix: 'crud/crm',
      path: 'companies',
      paths: {
        i: 'crm/companies',
        sh: 'crm/companies'
      },
      pageTitle: 'crm.companies'
    }
  },
  computed: {
    buttons () {
      return [
        {
          name: 'goToItem',
          icon: 'forward',
          color: 'blue',
          text: this.$t('buttons.goToItem')
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['alertSuccess', 'alertError']),
    ...mapActions('crud', ['updateItem', 'storeItem'])
  }
}
</script>
