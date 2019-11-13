<template>
  <div>
      <person-comments-table
        :fields-info="fileteredTableFields"
        :details-loader="detailsLoader"
        :table-data="childrenList(fileteredTableFields, [], 'id', childItemName, 'active')"
        delete-mode="soft"
      ></person-comments-table>
      <person-comment-details
        :details="details"
        :fields-info="fileteredDetailsFields"
      ></person-comment-details>
  </div>
</template>

<script>
import FieldsInfoMixin from '../../person-comments/mixins/fields'
import LocalesMixin from '../../person-comments/mixins/locales'
import CompanyCommentsChildMixin from '@/utils/crud/mixins/child'
import ChildrenTable from '@/utils/crud/components/ChildrenTable.vue'
import ChildDetails from '@/utils/crud/components/ChildDetails.vue'

export default {
  mixins: [
    FieldsInfoMixin,
    LocalesMixin,
    CompanyCommentsChildMixin,
  ],
  components: {
    'person-comments-table': ChildrenTable,
    'person-comment-details': ChildDetails,
  },
}
</script>
