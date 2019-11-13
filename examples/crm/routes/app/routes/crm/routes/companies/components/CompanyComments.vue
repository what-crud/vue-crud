<template>
  <div>
      <company-comments-table
        :title="$t('global.routes.crm.companyComments')"
        :fields-info="fileteredTableFields"
        :details-loader="detailsLoader"
        :table-data="childrenList(fileteredTableFields, [], 'id', childItemName, 'active')"
        delete-mode="soft"
      ></company-comments-table>
      <company-comment-details
        :details="details"
        :fields-info="fileteredDetailsFields"
      ></company-comment-details>
  </div>
</template>

<script>
import FieldsInfoMixin from '../../company-comments/mixins/fields'
import LocalesMixin from '../../company-comments/mixins/locales'
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
    'company-comments-table': ChildrenTable,
    'company-comment-details': ChildDetails,
  },
}
</script>
