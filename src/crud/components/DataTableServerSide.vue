<template>
  <v-card>
    <v-card-title class="card-title table-controls">
      <v-layout row wrap>

        <v-flex xs12 lg4>
          <data-table-controls
            :deleteMode="deleteMode"
            @create="create"
            @editSelected="editSelected"
            @suspendSelected="suspendSelected"
            @restoreSelected="restoreSelected"
            @destroySelected="destroySelected"
            @refreshTable="refreshTable"
          ></data-table-controls>
        </v-flex>

        <v-flex xs12 lg8 text-xs-left text-lg-right>

          <!-- Search by fields -->
          <v-menu offset-y :close-on-content-click="false" style="margin-right:30px;">
            <v-btn small fab dark slot="activator" class="primary">
              <v-icon>filter_list</v-icon>
            </v-btn>
            <v-list style="overflow-y:false;">
              <v-list-tile v-for="(item, index) in filterColumns" :key="index">
                <v-autocomplete
                  :items="filterModes"
                  v-model="item.mode"
                  item-text="text"
                  item-value="name"
                  :label="$t('global.datatable.filterModes.label')"
                  hide-details
                  @input="updateColumnFilterModeEvent($event, index)"
                ></v-autocomplete>
                <v-text-field v-model="item.value" hide-details :label="item.text" @input="filterColumnsEvent($event, index)"></v-text-field>
              </v-list-tile>
            </v-list>
          </v-menu>

          <!-- Search in table -->
          <span style="margin-right:30px;display:inline-block;width:250px;">
            <v-text-field append-icon="search" :label="$t('global.datatable.search')" single-line hide-details v-model="search" min-width="200" @input="searchItems(true)"></v-text-field>
          </span>

          <!-- Select statuses (active/inactive) -->
          <template v-if="['soft', 'both'].includes(deleteMode)">
            <span style="margin-right:30px;display:inline-block;width:250px;">
              <v-autocomplete :label="$t('global.datatable.status.title')" v-bind:items="statuses" v-model="selectedStatuses" single-line item-text="text" item-value="value" multiple chips></v-autocomplete>
            </span>
          </template>

        </v-flex>

      </v-layout>
        
    </v-card-title>
    <!-- Table -->
    <v-data-table
      class="elevation-1"
      :disable-initial-sort="true"
      :must-sort="true"
      v-model="selected"
      select-all="black"
      :rows-per-page-items="[20, 50, 100]"
      :pagination.sync="pagination"
      light
      :headers="headers"
      :items="items"
      :no-results-text="$t('global.datatable.noMatchingResults')"
      :no-data-text="$t('global.datatable.noDataAvailable')"
      :rows-per-page-text="$t('global.datatable.rowsPerPageText')"
      :total-items="totalItems"
      :loading="loading"
    >
      <template slot="items" slot-scope="props">
        <data-table-row
          :props="props"
          :editButton='editButton'
          :customButtons='customButtons'
          :deleteMode='deleteMode'
          :itemElements="itemElements"
          :columnTextModes="columnTextModes"
          @edit="edit"
          @custom="custom"
          @suspend="suspend"
          @restore="restore"
          @destroy="destroy"
          @editItemElements="editItemElements"
        ></data-table-row>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop, itemsLength }">
        <data-table-footer @setPage="setPage" :pagination="pagination" :pageStart="pageStart" :pageStop="pageStop" :itemsLength="itemsLength"></data-table-footer>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import MainMixin from "../mixins/datatable-main.js";
import HelperMixin from "../mixins/datatable-helper.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  mixins: [MainMixin, HelperMixin],
  data() {
    return {
      searching: false,
      newSearchRequest: false,
      ignorePaginationWatcher: false
    };
  },
  created () {
    this.resetItems();
    this.filterColumns = this.tableFields
      .map(field => {
        let item = {};
        item.mode = 'like'
        item.text = field.text;
        item.name = field.name
        item.column = field.column
        item.value = ''
        return item;
      });
  },
  computed: {
    ...mapState("crud", ["totalItems", "loading", "detailsDialog", "tableRefreshing"]),
    params() {
      return {
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending,
        rowsPerPage: this.pagination.rowsPerPage,
        page: this.pagination.page,
        search: this.search,
        filterColumns: this.filterColumns,
        selectedStatuses: this.selectedStatuses,
        deleteMode: this.deleteMode,
        activeColumnName: this.activeColumnName
      };
    },
  },
  watch: {
    pagination: {
      handler() {
        if(!this.ignorePaginationWatcher){
          this.searchItems(false);
        }
        this.ignorePaginationWatcher = false
      },
      deep: true
    },
    detailsDialog(val) {
      if (!val) {
        this.getItemsServerSide([this.params]);
      }
    },
    selectedStatuses(val) {
       this.searchItems(true);
    },
    tableRefreshing(val) {
      if (val) {
        this.getItemsServerSide([this.params]);
      }
    },
  },
  methods: {
    ...mapMutations("crud", ["refreshTable"]),
    ...mapActions("crud", ["getItemsServerSide"]),
    updateColumnFilterModeEvent(val, index) {
      this.updateColumnFilterMode(val, index)
      this.searchItems(true)
    },
    filterColumnsEvent(val, index) {
      this.updateFilterColumns(val, index)
      this.searchItems(true)
    },
    searchItems(resetPage){
      if (resetPage){
        this.ignorePaginationWatcher = true
        this.pagination.page = 1
      }
      let params1 = JSON.stringify(this.params)
      setTimeout(() => {
        let params2 = JSON.stringify(this.params)
        if(params1 === params2){
          this.getItemsServerSide([this.params])
        }
      }, 500)
    },
  }
};
</script>
