<template>
  <div>
      <company-positions-table
        :fieldsInfo="fileteredTableFields"
        :detailsLoader="detailsLoader" :tableData="childrenList(fileteredTableFields, [], 'id', childItemName, 'active')"
        deleteMode="both"
        :itemElements="itemElements"
      ></company-positions-table>
      <company-position-details :details="details" :fieldsInfo="fileteredDetailsFields"></company-position-details>
      <company-position-tasks></company-position-tasks>
  </div>
</template>

<script>
import FieldsInfoMixin from '../../positions/mixins/fields.js'
import LocalesMixin from '../../positions/mixins/locales.js'
import ChildElementsMixin from "../../positions/mixins/item-elements.js";
import CompanyPositionsChildMixin from "@/crud/mixins/child.js";
import ChildrenTable from "@/crud/components/ChildrenTable.vue";
import ChildDetails from "@/crud/components/ChildDetails.vue";
import ItemElements from '@/crud/components/ItemElements.vue'

export default {
  mixins: [FieldsInfoMixin, LocalesMixin, ChildElementsMixin, CompanyPositionsChildMixin],
  components: {
    "company-positions-table": ChildrenTable,
    "company-position-details": ChildDetails,
    "company-position-tasks": ItemElements
  },
};
</script>
