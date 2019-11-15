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
      :items="items"
      item-key="meta.id"
      :no-results-text="$t('global.datatable.noMatchingResults')"
      :no-data-text="$t('global.datatable.noDataAvailable')"
      :footer-props="footerProps"
      :items-per-page="20"
      :server-items-length="totalItems"
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

import Vue from 'vue'
import {
  mapState,
  mapActions,
} from 'vuex'

import CrudInstanceMixin from '../mixins/crud-instance'
import ControlsHandlerMixin from '../mixins/controls-handler'
import ItemsViewMixin from '../mixins/items-view'
import CrudTableMixin from '../mixins/crud-table'
import HelperMixin from '../mixins/table'

import { getItemsList } from '../helpers/functions'

import Controls from './Controls.vue'

export default {
  name: 'CrudTableServerMode',
  mixins: [
    CrudInstanceMixin,
    ControlsHandlerMixin,
    ItemsViewMixin,
    CrudTableMixin,
    HelperMixin,
  ],
  components: {
    Controls,
  },
  data () {
    return {
      searching: false,
      newSearchRequest: false,
      ignorePaginationWatcher: false,
      searchTimeout: null,
    }
  },
  computed: {
    ...mapState('crud', [
      'totalItems',
      'loading',
      'detailsDialog',
      'isItemsViewRefreshed',
    ]),
    params () {
      return {
        sortBy: this.pagination.sortBy,
        sortDesc: this.pagination.sortDesc,
        rowsPerPage: this.pagination.itemsPerPage,
        page: this.pagination.page,
        search: this.search,
        filterColumns: this.columnFilters,
        selectedStatuses: this.selectedStatuses,
        deleteMode: this.deleteMode,
        activeColumnName: this.activeColumnName,
        mode: 'paginate',
      }
    },
  },
  methods: {
    ...mapActions('crud', ['getItemsServerSide']),
    ...mapActions(['openAlertBox']),
    searchItems (resetPage) {
      clearTimeout(this.searchTimeout)
      if (resetPage) {
        this.ignorePaginationWatcher = true
        this.pagination.page = 1
      }
      this.searchTimeout = setTimeout(() => {
        this.getItemsServerSide([this.params])
      }, 500)
    },
    startSearching () {
      this.searchItems(true)
    },
    moveDetailsItem (page, index) {
      this.ignorePaginationWatcher = true
      this.pagination.page = page
      this.getItemsServerSide([this.params]).then((response) => {
        const newItemId = this.items[index].meta.id
        this.setCurrentItem({ id: newItemId, index })
        this.getItemDetails([newItemId]).then((response) => {
          this.showItemDetailsDialog()
        })
      })
    },
    getItemIndex (id) {
      return this.items.map((item) => item.meta.id).indexOf(id)
    },
    exportToExcel () {
      this.excelLoading = true
      const headers = this.cleanHeaders.map(header => header.text)
      const params = {}
      for (const key in this.params) {
        params[key] = this.params[key]
      }
      params.mode = 'all'
      let filteredItems
      Vue.http.post(`${this.prefix}/${this.path}/search`, params)
        .then((response) => {
          const items = response.body
          filteredItems = items.map(obj => getItemsList(obj, this.tableFields, this.meta, this.primaryKey, this.customButtons, this.activeColumnName))
          const data = filteredItems.map((item) => {
            const row = []
            for (const header of this.cleanHeaders) {
              row.push(item[header.value])
            }
            return row
          })
          import('../vendor/Export2Excel').then((excel) => {
            this.excelLoading = false
            excel.export_json_to_excel({
              header: headers,
              data,
              filename: this.excelName,
              autoWidth: true,
              bookType: 'xlsx',
            })
          })
        }, (error) => {
          this.excelLoading = false
          this.openAlertBox([
            'alertError',
            error.statusText,
          ])
        })
    },
  },
  created () {
    this.resetItems()
  },
  watch: {
    pagination: {
      handler () {
        if (!this.ignorePaginationWatcher) {
          this.searchItems(false)
        }
        this.ignorePaginationWatcher = false
      },
      deep: true,
    },
    detailsDialog (val) {
      if (!val) {
        this.getItemsServerSide([this.params])
      }
    },
    isItemsViewRefreshed (val) {
      if (val) {
        this.getItemsServerSide([this.params])
      }
    },
  },
}
</script>
