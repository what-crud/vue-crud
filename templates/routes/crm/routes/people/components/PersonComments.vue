<template>
  <div>
      <person-comments-table
        :fieldsInfo="fileteredTableFields"
        :detailsLoader="detailsLoader" :tableData="childrenList(fileteredTableFields, [], 'id', childItemName, 'active')"
        deleteMode="soft"
      ></person-comments-table>
      <person-comment-details :details="details" :fieldsInfo="fileteredDetailsFields"></person-comment-details>
  </div>
</template>

<script>
import FieldsInfoMixin from '../../person-comments/mixins/fields.js'
import LocalesMixin from '../../person-comments/mixins/locales.js'
import CompanyCommentsChildMixin from "@/crud/mixins/child.js";
import ChildrenTable from "@/crud/components/ChildrenTable.vue";
import ChildDetails from "@/crud/components/ChildDetails.vue";

export default {
  mixins: [FieldsInfoMixin, LocalesMixin, CompanyCommentsChildMixin],
  components: {
    "person-comments-table": ChildrenTable,
    "person-comment-details": ChildDetails
  },
};
</script>
