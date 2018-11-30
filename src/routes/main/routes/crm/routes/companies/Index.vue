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
      :itemElements="itemElements"
      primaryKey="id"
      deleteMode="soft"
    ></crud>
    <item-details :fields="itemFields"></item-details>
  </div>
</template>

<script>
import Crud from '@/crud/components/Crud.vue'
import FieldsInfoMixin from "./mixins/fields.js";
import LocalesMixin from "./mixins/locales.js";
import ItemDetails from "./components/ItemDetails.vue";
import ExtendedControllerMixin from "@/crud/mixins/extended-controller.js";
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
    itemElements() {
      return {
        companyBusinessAreas: {
          title: this.$t('itemElements.companyBusinessAreas.title'),
          url: 'crm/companies/{id}/business-areas',
          controller: 'crm/company-business-areas',
          itemObject: 'business_area_companies',
          columns: [
            {
              obj: 'name',
              name: 'name',
              header: this.$t('itemElements.companyBusinessAreas.headers.businessArea'),
            },
          ],
          primaryId: 'company_id',
          foreignId: 'business_area_id',
          icon: 'business',
          color: 'purple',
          buttonText: this.$t('itemElements.companyBusinessAreas.title')
        },
      }
    },
  },
  methods: {
    ...mapMutations(["alertSuccess", "alertError"]),
    ...mapMutations("crud", ["refreshTable"]),
    ...mapActions("crud", ["updateItem", "storeItem"]),
  },
}
</script>
