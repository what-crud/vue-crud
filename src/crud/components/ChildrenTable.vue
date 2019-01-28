<template>
  <v-card class="child-card">
    <v-card-title class="card-title table-controls">
      <v-layout row wrap>

        <v-flex xs12 xl2>
          <!-- Dialog for creating item -->
          <v-tooltip top v-if="createButton">
            <v-btn fab small dark color="green" @click="create()" slot="activator">
              <v-icon>add</v-icon>
            </v-btn>
            <span>{{ $t('global.datatable.add') }}</span>
          </v-tooltip>
          <!-- custom buttons -->
          <v-tooltip top v-for="(customHeaderButton) in customHeaderButtons" :key="customHeaderButton.name">
            <v-btn fab small class="white--text" :color="customHeaderButton.color" @click="customHeaderAction(customHeaderButton.name)" slot="activator">
              <v-icon>{{ customHeaderButton.icon }}</v-icon>
            </v-btn>
            <span>{{ customHeaderButton.text }}</span>
          </v-tooltip>
        </v-flex>

        <v-flex xs12 xl10 text-xs-left text-xl-right>

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
                <v-text-field v-model="item.value" hide-details :label="item.text" @input="updateFilterColumns($event, index)"></v-text-field>
              </v-list-tile>
            </v-list>
          </v-menu>

          <!-- Search in table -->
          <span style="margin-right:30px;display:inline-block;width:250px;">
            <v-text-field append-icon="search" :label="$t('global.datatable.search')" single-line hide-details v-model="search" min-width="200"></v-text-field>
          </span>

          <!-- Select statuses (active/inactive) -->
          <template v-if="['soft', 'both'].includes(deleteMode)">
            <span style="margin-right:30px;display:inline-block;width:250px;">
              <v-autocomplete :label="$t('global.datatable.status.title')" v-bind:items="statuses" v-model="selectedStatuses" single-line item-text="text" item-value="value" multiple chips></v-autocomplete>
            </span>
          </template>

          <!-- Clear filters -->
          <v-tooltip top>
            <v-btn 
              class="white--text"
              fab
              small
              color="red"
              @click="clearFilters()"
              slot="activator"
            >
              <v-icon>delete_sweep</v-icon>
            </v-btn>
            <span>{{ $t('global.datatable.buttons.clearFilters') }}</span>
          </v-tooltip>

          <v-tooltip left>
            <v-btn class="white--text" fab small color="green darken-4" @click="exportToExcel()" slot="activator" :loading="excelLoading">
              <v-icon>save_alt</v-icon>
            </v-btn>
            <span>{{ $t('global.datatable.buttons.copyToExcel') }}</span>
          </v-tooltip>

        </v-flex>
      </v-layout>
    </v-card-title>

    <!-- Table -->
    <v-data-table 
      :disable-initial-sort="true"
      :must-sort="true"
      :rows-per-page-items="[10, 25, { text: $t('global.datatable.all'), value: -1 }]"
      :pagination.sync="pagination"
      light
      :headers="headers"
      :items="filteredItems"
      :no-results-text="$t('global.datatable.noMatchingResults')"
      :no-data-text="$t('global.datatable.noDataAvailable')"
      :rows-per-page-text="$t('global.datatable.rowsPerPageText')">
      <template slot="items" slot-scope="props">
        <tr @dblclick="rowDblclickAction(props.item.meta.id)" :class="activityClass(props.item.meta.active)">
          <!-- action buttons -->
          <td class="cell-nowrap">
            <!-- edit record -->
            <v-tooltip top v-if="editButton">
              <v-btn fab small class="xs white--text" color="orange" @click="edit(props.item.meta.id)" slot="activator">
                <v-icon>edit</v-icon>
              </v-btn>
              <span>{{ $t('global.datatable.buttons.edit') }}</span>
            </v-tooltip>
            <!-- buttons for open modal with item elements -->
            <v-tooltip top v-for="(button, key) in itemElements" :key="key">
              <v-btn
                outline
                fab
                small
                class="xs white--text"
                :color="button.color"
                @click="editItemElements(key, props.item.meta.id)"
                slot="activator"
              >
                <v-icon>{{ button.icon }}</v-icon>
              </v-btn>
              <span>{{ button.buttonText }}</span>
            </v-tooltip>
            <!-- suspend/restore record (if soft deletes are enabled) -->
            <template v-if="['soft', 'both'].includes(deleteMode)">
              <v-tooltip top v-if="props.item.meta.active == '1'">
                <v-btn fab small outline class="xs white--text" color="red" @click="suspend(props.item.meta.id)" slot="activator">
                  <v-icon>undo</v-icon>
                </v-btn>
                <span>{{ $t('global.datatable.buttons.suspend') }}</span>
              </v-tooltip>
              <v-tooltip top v-else>
                <v-btn fab small outline class="xs white--text" color="green" @click="restore(props.item.meta.id)" slot="activator">
                  <v-icon>redo</v-icon>
                </v-btn>
                <span>{{ $t('global.datatable.buttons.restore') }}</span>
              </v-tooltip>
            </template>
            <!-- hard delete -->
            <v-tooltip top v-if="['hard', 'both'].includes(deleteMode)">
              <v-btn outline fab small class="xs white--text" color="red" @click="destroy(props.item.meta.id)" slot="activator">
                <v-icon>delete</v-icon>
              </v-btn>
              <span>{{ $t('global.datatable.buttons.delete') }}</span>
            </v-tooltip>
          </td>
          <!-- table fields -->
          <td v-if="key != 'meta'" v-for="(field, key) in props.item" :key="key" max-width="20px !important;">
            <span v-if="columnTextModes[key] == 'html'" v-html="field"></span>
            <span v-else-if="columnTextModes[key] == 'cropped'" class="cell-nowrap">{{ field | cropped }}</span>
            <span v-else-if="columnTextModes[key] == 'text'">{{ field }}</span>
          </td>
        </tr>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop, itemsLength }">
        <data-table-footer @setPage="setPage" :pagination="pagination" :pageStart="pageStart" :pageStop="pageStop" :itemsLength="itemsLength"></data-table-footer>
      </template>
    </v-data-table>
    <div class="details-loader-container">
      <v-layout v-if="detailsLoader" class="details-loader" justify-center align-center>
        <v-progress-circular indeterminate :size="100" :width="3" color="primary"></v-progress-circular>
      </v-layout>
    </div>
  </v-card>
</template>

<script>
import ClientSideFilteringMixin from "../mixins/datatable-client-side-filtering.js";
import HelperMixin from "../mixins/datatable-helper.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  mixins: [ClientSideFilteringMixin, HelperMixin],
  props: {
    title: String,
    fieldsInfo: Array,
    deleteMode: {
      type: String,
      validator: function (value) {
        return ['none', 'soft', 'hard', 'both'].indexOf(value) !== -1
      },
      default: 'soft'
    },
    customHeaderButtons: {
      type: Array,
      default: () => []
    },
    customButtons: {
      type: Array,
      default: () => []
    },
    itemElements: {
      type: Object,
      default: () => {}
    },
    createButton: {
      type: Boolean,
      default: true
    },
    editButton: {
      type: Boolean,
      default: true
    },
    meta: {
      type: Array,
      default: () => []
    },
    primaryKey: {
      type: String,
      default: "id"
    },
    tableData: {
      type: Array,
      default: () => []
    },
    detailsLoader: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  filters: {
    cropped(field) {
      let rField
      let maxLength = 40
      if (typeof field === 'string' || field instanceof String) {
        rField = field.length <= maxLength ? field : field.substring(0, maxLength - 3) + '...'
      }
      else {
        rField = field
      }
      return rField
    }
  },
  computed: {
    ...mapState(['page']),
    ...mapState("crud", ["prefix", "path"]),
    tableFields() {
      return this.fieldsInfo.filter(field => field.table != false && field.type != 'divider');
    },
    items() {
      return this.tableData;
    },
    excelName() {
      return this.$t('global.routes.' + this.page) + ' - ' + this.title
    }
  },
  methods: {
    ...mapMutations("crud", [
      "setItemElementsInfo",
      "editItemElementsDialog",
    ]),
    ...mapActions("crud", [
      "getItemElements",
    ]),
    activityClass(isActive) {
      let className = ""
      if(['soft', 'both'].includes(this.deleteMode)){
        className = parseInt(isActive) == 1 ? 'row-active' : 'row-inactive'
      }
      return className
    },
    edit(id) {
      this.$parent.edit(id);
    },
    create() {
      this.$parent.create();
    },
    suspend(id) {
      this.$parent.suspend(id);
    },
    restore(id) {
      this.$parent.restore(id);
    },
    destroy(id) {
      this.$parent.destroy(id);
    },
    customHeaderAction(name) {
      this.$parent[name]()
    },
    updateColumnFilterMode(val, index) {
      let obj = this.filterColumns
      obj[index].mode = val
      this.$set(this, 'filterColumns', obj)
    },
    updateFilterColumns(val, index) {
      let obj = this.filterColumns
      obj[index].value = val
      this.$set(this, 'filterColumns', obj)
    },
    editItemElements(name, id) {
      let obj = this.itemElements[name];
      console.log (obj)
      this.setItemElementsInfo([id, obj]);
      this.getItemElements();
    },
    rowDblclickAction(id){
      if(this.editButton){
        this.edit(id)
      }
    }
  }
};
</script>

<style scoped>
.xs {
  width: 25px;
  height: 25px;
  margin: 3 !important;
}

.xs > div {
  padding: 3px !important;
}

.xs > div > i {
  height: 12px !important;
  width: 12px !important;
  line-height: 12px;
} 
.child-card {
  min-height: 400px;
  max-height: calc(100vh - 150px);
  overflow-y: auto;
}
.details-loader-container {
  position: absolute;
  top:200px;
  text-align: center;
  width: 100%;
}
.details-loader {
  height:100px !important;
  width:100px;
  background-color:rgba(255, 255, 255, 0.6);
  border-radius:100%;
  display: inline-block;
}
</style>
