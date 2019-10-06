<template>
  <v-card flat>
    <data-table-controls
      :delete-mode="deleteMode"
      :create-mode="createMode"
      :edit-mode="editMode"
      :main-filter="mainFilter"
      :field-filters="fieldFilters"
      :refresh-button="refreshButton"
      :select-many-mode="selectManyMode"
      :update-many-mode="updateManyMode"
      :remove-many-mode="removeManyMode"
      @create="create"
      @editSelected="editSelected"
      @suspendSelected="suspendSelected"
      @restoreSelected="restoreSelected"
      @destroySelected="destroySelected"
      @refreshTable="refreshTable"
      @clearFilters="clearFilters"
    >
      <template slot="center">
        <!-- Search by fields -->
        <v-menu
          offset-y
          :close-on-content-click="false"
          max-height="50vh"
          style="margin-right:15px;margin-left:15px;"
          v-if="fieldFilters"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              large
              color="grey"
              icon="filter_list"
              v-on="on"
            >
              <v-icon>filter_list</v-icon>
            </v-btn>
          </template>
          <v-list style="overflow-y:false;">
            <v-list-item v-for="(item, index) in filterColumns" :key="index">
              <v-autocomplete
                :items="filterModes"
                v-model="item.mode"
                item-text="text"
                item-value="name"
                :label="$t('global.datatable.filterModes.label')"
                hide-details
                @input="updateColumnFilterModeEvent($event, index)"
              ></v-autocomplete>
              <v-text-field
                v-model="item.value"
                hide-details
                :label="item.text"
                @input="filterColumnsEvent($event, index)"
              ></v-text-field>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Search in table -->
        <span
          style="margin-right:15px;margin-left:15px;display:inline-block;width:250px;"
          v-if="mainFilter"
        >
          <v-text-field
            append-icon="search"
            :label="$t('global.datatable.search')"
            single-line hide-details
            v-model="search"
            min-width="200"
            @input="searchItems(true)"
          ></v-text-field>
        </span>

        <!-- Select statuses (active/inactive) -->
        <template v-if="['soft', 'both', 'filter'].includes(deleteMode)">
          <span
            style="margin-right:15px;margin-left:15px;display:inline-block;width:250px;"
          >
            <v-autocomplete
              :label="$t('global.datatable.status.title')"
              v-bind:items="statuses"
              v-model="selectedStatuses"
              single-line
              item-text="text"
              item-value="value"
              multiple chips
            ></v-autocomplete>
          </span>
        </template>
      </template>
      <template slot="right">
        <crud-button
          v-if="exportButton"
          large
          color="green darken-4"
          @clicked="exportToExcel()"
          icon="save_alt"
          :tooltip="$t('global.datatable.buttons.copyToExcel')"
          :loading="excelLoading"
        ></crud-button>
      </template>
    </data-table-controls>

    <!-- Table -->
    <v-data-table
      :must-sort="true"
      v-model="selected"
      :show-select="selectManyMode"
      :rows-per-page-items="[20, 50, 100]"
      :pagination.sync="pagination"
      :headers="headers"
      :items="items"
      item-key="meta.id"
      :no-results-text="$t('global.datatable.noMatchingResults')"
      :no-data-text="$t('global.datatable.noDataAvailable')"
      :rows-per-page-text="$t('global.datatable.rowsPerPageText')"
      :total-items="totalItems"
      :loading="loading"
      light
    >
      <template slot="item" slot-scope="props">
        <data-table-row
          :props="props"
          :edit-button='editButton'
          :custom-buttons='customButtons'
          :delete-mode='deleteMode'
          :item-elements="itemElements"
          :column-text-modes="setColumnTextModes(props)"
          :edit-mode="editMode"
          :select-many-mode="selectManyMode"
          :current-item-id="currentItemId"
          @edit="edit"
          @custom="custom"
          @suspend="suspend"
          @restore="restore"
          @destroy="destroy"
          @editItemElements="editItemElements"
          @doubleClick="resolveRowDoubleClick"
        ></data-table-row>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop, itemsLength }">
        <data-table-footer
          @setPage="setPage"
          :pagination="pagination"
          :page-start="pageStart"
          :page-stop="pageStop"
          :items-length="itemsLength"
        ></data-table-footer>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Vue from 'vue'
import {
  mapState,
  mapActions
} from 'vuex'
import MainMixin from '../mixins/datatable-main'
import HelperMixin from '../mixins/datatable-helper'
import { getItemsList } from '../helpers/functions'
import CrudButton from './Button.vue'

export default {
  components: {
    CrudButton
  },
  mixins: [MainMixin, HelperMixin],
  data () {
    return {
      searching: false,
      newSearchRequest: false,
      ignorePaginationWatcher: false,
      searchTimeout: null
    }
  },
  created () {
    this.resetItems()
    this.filterColumns = this.tableFields
      .map((field) => {
        const item = {}
        item.mode = 'like'
        item.text = field.text
        item.name = field.name
        item.column = field.column
        item.value = ''
        return item
      })
  },
  computed: {
    ...mapState('crud', ['totalItems', 'loading', 'detailsDialog', 'tableRefreshing']),
    params () {
      return {
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending,
        rowsPerPage: this.pagination.rowsPerPage,
        page: this.pagination.page,
        search: this.search,
        filterColumns: this.filterColumns,
        selectedStatuses: this.selectedStatuses,
        deleteMode: this.deleteMode,
        activeColumnName: this.activeColumnName,
        mode: 'paginate'
      }
    }
  },
  watch: {
    pagination: {
      handler () {
        if (!this.ignorePaginationWatcher) {
          this.searchItems(false)
        }
        this.ignorePaginationWatcher = false
      },
      deep: true
    },
    detailsDialog (val) {
      if (!val) {
        this.getItemsServerSide([this.params])
      }
    },
    selectedStatuses (val) {
      this.searchItems(true)
    },
    tableRefreshing (val) {
      if (val) {
        this.getItemsServerSide([this.params])
      }
    }
  },
  methods: {
    ...mapActions('crud', ['getItemsServerSide']),
    ...mapActions([
      'openAlertBox'
    ]),
    updateColumnFilterModeEvent (val, index) {
      this.updateColumnFilterMode(val, index)
      this.searchItems(true)
    },
    filterColumnsEvent (val, index) {
      this.updateFilterColumns(val, index)
      this.searchItems(true)
    },
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
              bookType: 'xlsx'
            })
          })
        }, (error) => {
          this.excelLoading = false
          this.openAlertBox(['alertError', error.statusText])
        })
    }
  }
}
</script>
