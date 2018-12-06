<template>
  <div>
      <person-positions-table
        :fieldsInfo="fileteredTableFields"
        :detailsLoader="detailsLoader" :tableData="childrenList(fileteredTableFields, [], 'id', childItemName, 'active')"
        deleteMode="both"
      ></person-positions-table>
      <person-position-details :details="details" :fieldsInfo="fileteredDetailsFields"></person-position-details>
  </div>
</template>

<script>
import FieldsInfoMixin from '../../positions/mixins/fields.js'
import LocalesMixin from '../../positions/mixins/locales.js'
import CompanyPositionsChildMixin from "@/crud/mixins/child.js";
import ChildrenTable from "@/crud/components/ChildrenTable.vue";
import ChildDetails from "@/crud/components/ChildDetails.vue";

export default {
  mixins: [FieldsInfoMixin, LocalesMixin, CompanyPositionsChildMixin],
  components: {
    "person-positions-table": ChildrenTable,
    "person-position-details": ChildDetails
  },
};
</script>
