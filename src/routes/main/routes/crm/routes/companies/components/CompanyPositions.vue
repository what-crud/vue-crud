<template>
  <div>
      <company-positions-table
        :fieldsInfo="fileteredTableFields"
        :loader="loader" :tableData="childrenList(fileteredTableFields, [], 'id', childItemName, 'active')"
        deleteMode="both"
      ></company-positions-table>
      <company-position-details :details="details" :fieldsInfo="fileteredDetailsFields"></company-position-details>
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
    "company-positions-table": ChildrenTable,
    "company-position-details": ChildDetails
  },
};
</script>
