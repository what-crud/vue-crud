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
      primaryKey="id"
      deleteMode="soft"
    ></crud>
    <item-details :fields="itemFields"></item-details>
  </div>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'
import FieldsInfoMixin from "./mixins/fields.js";
import LocalesMixin from "./mixins/locales.js";
import ItemDetails from "./components/ItemDetails.vue";
import ExtendedControllerMixin from "@/utils/crud/mixins/extended-controller.js";
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'

export default {
  mixins: [ExtendedControllerMixin, FieldsInfoMixin, LocalesMixin],
  components: {
    Crud,
    ItemDetails
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
      return [
        {
          name: "goToItem",
          icon: "forward",
          color: "blue",
          text: this.$t("buttons.goToItem")
        },
      ]
    },
  },
  methods: {
    ...mapMutations(["alertSuccess", "alertError"]),
    ...mapMutations("crud", ["refreshTable"]),
    ...mapActions("crud", ["updateItem", "storeItem"]),
  },
}
</script>
