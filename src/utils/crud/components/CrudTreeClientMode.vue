<template>
  <v-card flat>
    <controls
      :create-mode="createMode"
      :edit-mode="editMode"
      :delete-mode="deleteMode"
      :select-many-mode="selectManyMode"
      :update-many-mode="updateManyMode"
      :remove-many-mode="removeManyMode"
      :main-filter="mainFilter"
      :field-filters="fieldFilters"
      :refresh-button="refreshButton"
      :export-button="exportButton"
      :excel-loading="excelLoading"
      :initialSearch="search"
      :initialSelectedStatuses="selectedStatuses"
      :initialColumnFilters="columnFilters"
      @create="create"
      @editSelected="editSelected"
      @suspendSelected="suspendSelected"
      @restoreSelected="restoreSelected"
      @destroySelected="destroySelected"
      @refreshTable="refreshTable"
      @updateColumnFilterMode="updateColumnFilterMode"
      @updateColumnFilterValue="updateColumnFilterValue"
      @updateSearch="updateSearch"
      @updateSelectedStatuses="updateSelectedStatuses"
      @clearFilters="clearFilters"
      @exportToExcel="exportToExcel"
    >
    </controls>

    <!-- Tree -->

  </v-card>
</template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex'
import CrudMixin from '../mixins/crud'
import Controls from './Controls.vue'

export default {
  name: 'CrudTableClientMode',
  mixins: [CrudMixin],
  components: {
    Controls,
  },
  data () {
    return {}
  },
  created () {
    this.resetItems()
    this.getItems()
  },
  computed: {
    ...mapState('crud', [
      'loading',
      'detailsDialog',
      'tableRefreshing',
    ]),
  },
  watch: {
    detailsDialog (val) {
      if (!val) {
        this.getItems()
      }
    },
    tableRefreshing (val) {
      if (val) {
        this.getItems()
      }
    },
  },
  methods: {
    ...mapActions('crud', ['getItems']),
    moveDetailsItem (page, index) {
      this.pagination.page = page
      const realIndex = (page - 1) * this.pagination.itemsPerPage + index
      const newItemId = this.filteredItems[realIndex].meta.id
      this.setCurrentItem({ id: newItemId, index })
      this.getItemDetails([newItemId]).then((response) => {
        this.showItemDetailsDialog()
      })
    },
  },
}
</script>
