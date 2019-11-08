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
      @refreshItemsView="refreshItemsView"
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

import CrudInstanceMixin from '../mixins/crud-instance'
import ControlsHandlerMixin from '../mixins/controls-handler'
import ItemsViewMixin from '../mixins/items-view'

import Controls from './Controls.vue'

export default {
  name: 'CrudTableClientMode',
  mixins: [
    CrudInstanceMixin,
    ControlsHandlerMixin,
    ItemsViewMixin,
  ],
  components: {
    Controls,
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('crud', [
      'loading',
      'detailsDialog',
      'isItemsViewRefreshed',
    ]),
  },
  methods: {
    ...mapActions('crud', ['getItems']),
    clearFilters () {},
    exportToExcel () {},
    startSearching () {},
  },
  created () {
    this.resetItems()
    this.getItems()
  },
  watch: {
    detailsDialog (val) {
      if (!val) {
        this.getItems()
      }
    },
    isItemsViewRefreshed (val) {
      if (val) {
        this.getItems()
      }
    },
  },
}
</script>
