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
    <!-- Table -->
    <v-data-table
      v-model="selected"
      :show-select="selectManyMode"
      :options.sync="pagination"
      :headers="headers"
      :items="filteredItems"
      item-key="meta.id"
      :no-results-text="$t('global.datatable.noMatchingResults')"
      :no-data-text="$t('global.datatable.noDataAvailable')"
      :footer-props="footerProps"
      :items-per-page="20"
      :loading="loading"
      light
      multi-sort
      dense
    >
      <template
        v-for="(header, i) in headers"
        v-slot:[`item.${header.value}`]="{ item }"
      >
        <span :key="i">
          <list-item-actions
            v-if="header.value==='actions'"
            :item="item"
            :edit-button='editButton'
            :custom-buttons='customButtons'
            :delete-mode='deleteMode'
            :item-elements="itemElements"
            :edit-mode="editMode"
            :select-many-mode="selectManyMode"
            @edit="edit"
            @custom="custom"
            @suspend="suspend"
            @restore="restore"
            @destroy="destroy"
            @editItemElements="editItemElements"
            @doubleClick="resolveRowDoubleClick"
          />
          <span v-else>
            <slot
              :name="`field:${header.value}`"
              :value="item[header.value]"
              :item="item"
            >
              <list-item-field
                :value="item[header.value]"
                :text-mode="textMode(item, header.value)"
              />
            </slot>
          </span>
        </span>
      </template>
      <template slot="footer.page-text" slot-scope="{ pageStart, pageStop, itemsLength }">
        <table-footer
          @setPage="setPage"
          :pagination="pagination"
          :page-start="pageStart"
          :page-stop="pageStop"
          :items-length="itemsLength"
        ></table-footer>
      </template>
    </v-data-table>
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
import CrudTableMixin from '../mixins/crud-table'
import ClientModeFilteringMixin from '../mixins/table-client-mode-filtering'
import HelperMixin from '../mixins/table'

import Controls from './Controls.vue'

export default {
  name: 'CrudTableClientMode',
  mixins: [
    CrudInstanceMixin,
    ControlsHandlerMixin,
    ItemsViewMixin,
    CrudTableMixin,
    ClientModeFilteringMixin,
    HelperMixin,
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
    totalItems () {
      return this.filteredItems.length
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
