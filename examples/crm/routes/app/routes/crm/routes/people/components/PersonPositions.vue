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
import FieldsInfoMixin from '../../positions/mixins/fields'
import LocalesMixin from '../../positions/mixins/locales'
import CompanyPositionsChildMixin from '@/utils/crud/mixins/child'
import ChildrenTable from '@/utils/crud/components/ChildrenTable.vue'
import ChildDetails from '@/utils/crud/components/ChildDetails.vue'

export default {
  mixins: [FieldsInfoMixin, LocalesMixin, CompanyPositionsChildMixin],
  components: {
    'person-positions-table': ChildrenTable,
    'person-position-details': ChildDetails
  }
}
</script>
