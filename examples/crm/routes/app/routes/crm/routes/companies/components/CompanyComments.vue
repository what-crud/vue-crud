<template>
  <div>
      <company-comments-table
        :fieldsInfo="fileteredTableFields"
        :detailsLoader="detailsLoader" :tableData="childrenList(fileteredTableFields, [], 'id', childItemName, 'active')"
        deleteMode="soft"
      ></company-comments-table>
      <company-comment-details :details="details" :fieldsInfo="fileteredDetailsFields"></company-comment-details>
  </div>
</template>

<script>
import FieldsInfoMixin from '../../company-comments/mixins/fields.js'
import LocalesMixin from '../../company-comments/mixins/locales.js'
import CompanyCommentsChildMixin from "@/utils/crud/mixins/child.js";
import ChildrenTable from "@/utils/crud/components/ChildrenTable.vue";
import ChildDetails from "@/utils/crud/components/ChildDetails.vue";

export default {
  mixins: [FieldsInfoMixin, LocalesMixin, CompanyCommentsChildMixin],
  components: {
    "company-comments-table": ChildrenTable,
    "company-comment-details": ChildDetails
  },
};
</script>
