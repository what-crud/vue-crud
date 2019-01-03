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
                  @input="updateColumnFilterMode($event, index)"
                ></v-autocomplete>
                <v-text-field
                  v-model="item.value"
                  hide-details
                  :label="item.text"
                  @input="updateFilterColumns($event, index)"
                ></v-text-field>
              </v-list-tile>
            </v-list>
          </v-menu>

          <!-- Search in table -->
          <span style="margin-right:30px;display:inline-block;width:250px;">
            <v-text-field
              append-icon="search"
              :label="$t('global.datatable.search')"
              single-line
              hide-details
              v-model="search"
              min-width="200"
            ></v-text-field>
          </span>

          <!-- Select statuses (active/inactive) -->
          <template v-if="['soft', 'both'].includes(deleteMode)">
            <span style="margin-right:30px;display:inline-block;width:250px;">
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

          <v-tooltip left>
            <v-btn class="white--text" fab small color="green darken-4" @click="exportToExcel()" slot="activator">
              <v-icon>save_alt</v-icon>
            </v-btn>
            <span>{{ $t('global.datatable.buttons.copyToExcel') }}</span>
          </v-tooltip>

        </v-flex>
      </v-layout>
    </v-card-title>
    <!-- Table -->
    <v-data-table
      class="datatable"
      :disable-initial-sort="true"
      :must-sort="true"
      v-model="selected"
      select-all="black"
      :rows-per-page-items="[20, 50, { text: $t('global.datatable.all'), value: -1 }]"
      :pagination.sync="pagination"
      light
      :headers="headers"
      :items="filteredItems"
      :no-results-text="$t('global.datatable.noMatchingResults')"
      :no-data-text="$t('global.datatable.noDataAvailable')"
      :rows-per-page-text="$t('global.datatable.rowsPerPageText')"
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
import ClientSideFilteringMixin from "../mixins/datatable-client-side-filtering.js";
import HelperMixin from "../mixins/datatable-helper.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  mixins: [MainMixin, ClientSideFilteringMixin, HelperMixin],
  data() {
    return {};
  },
  created() {
    this.resetItems();
    this.getItems();
    this.filterColumns = this.tableFields.map(field => {
      let item = {};
      item.mode = 'like'
      item.text = field.text;
      item.name = field.name.toLowerCase();
      item.column = field.column
      item.value = ''
      return item;
    });
  },
  computed: {
    ...mapState("crud", ['loading', "detailsDialog", "tableRefreshing"]),
  },
  watch: {
    detailsDialog(val) {
      if (!val) {
        this.getItems();
      }
    },
    tableRefreshing(val) {
      if (val) {
        this.getItems();
      }
    }
  },
  methods: {
    ...mapMutations("crud", ["refreshTable"]),
    ...mapActions("crud", ["getItems"]),
  }
};
</script>
<style scoped>
</style>
