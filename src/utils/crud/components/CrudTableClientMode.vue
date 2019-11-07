<template>
  <v-card flat>
    <crud-controls
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
          v-if="fieldFilters"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              large
              color="grey"
              icon
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
                @input="updateColumnFilterMode($event, index)"
              ></v-autocomplete>
              <v-text-field
                v-model="item.value"
                hide-details
                :label="item.text"
                @input="updateFilterColumns($event, index)"
              ></v-text-field>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Search in table -->
        <span
          v-if="mainFilter"
          class="data-table__search"
        >
          <v-text-field
            class="data-table__search-input"
            append-icon="search"
            :label="$t('global.datatable.search')"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </span>

        <!-- Select statuses (active/inactive) -->
        <template v-if="['soft', 'both', 'filter'].includes(deleteMode)">
          <span class="data-table__select-statuses">
            <v-autocomplete
              :label="$t('global.datatable.status.title')"
              v-bind:items="statuses"
              v-model="selectedStatuses"
              single-line
              item-text="text"
              item-value="value"
              multiple
              chips
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
    </crud-controls>
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
            <list-item-field
              :value="item[header.value]"
              :text-mode="textMode(item, header.value)"
            />
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
import CrudTableMixin from '../mixins/crud-table'
import ClientModeFilteringMixin from '../mixins/table-client-mode-filtering'
import HelperMixin from '../mixins/table'
import CrudButton from './Button.vue'

export default {
  components: {
    CrudButton,
  },
  mixins: [CrudTableMixin, ClientModeFilteringMixin, HelperMixin],
  data () {
    return {}
  },
  created () {
    this.resetItems()
    this.getItems()
    this.filterColumns = this.tableFields.map((field) => {
      const item = {}
      item.mode = 'like'
      item.text = field.text
      item.name = field.name.toLowerCase()
      item.column = field.column
      item.value = ''
      return item
    })
  },
  computed: {
    ...mapState('crud', ['loading', 'detailsDialog', 'tableRefreshing']),
    totalItems () {
      return this.filteredItems.length
    },
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
<style lang="scss" scoped>
  .data-table {
    &__search {
      margin: 0 15px;
      display: inline-block;
      width: 120px;
      @media (min-width: 500px) {
        width: 250px;
      }
    }
    &__search-input {
      margin-top: -8px;
    }
    &__select-statuses {
      margin: 0 15px;
      display: inline-block;
      width: 120px;
      @media (min-width: 500px) {
        width: 250px;
      }
    }
  }
</style>
