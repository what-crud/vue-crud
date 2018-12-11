<template>
  <v-card class="child-card">
    <v-card-title class="card-title table-controls">
      <v-layout row wrap>

        <v-flex xs12 xl4>
          <!-- Dialog for creating item -->
          <v-tooltip top v-if="createButton">
            <v-btn fab small dark color="green" @click="create()" slot="activator">
              <v-icon>add</v-icon>
            </v-btn>
            <span>{{ $t('add') }}</span>
          </v-tooltip>
          <!-- custom buttons -->
          <v-tooltip top v-for="(customHeaderButton) in customHeaderButtons" :key="customHeaderButton.name">
            <v-btn fab small class="white--text" :color="customHeaderButton.color" @click="customHeaderAction(customHeaderButton.name)" slot="activator">
              <v-icon>{{ customHeaderButton.icon }}</v-icon>
            </v-btn>
            <span>{{ customHeaderButton.text }}</span>
          </v-tooltip>
        </v-flex>

        <v-flex xs12 xl8 text-xs-left text-xl-right>

          <!-- Search by fields -->
          <v-menu offset-y :close-on-content-click="false">
            <v-btn small fab dark slot="activator" class="primary">
              <v-icon>filter_list</v-icon>
            </v-btn>
            <v-list style="overflow-y:false;">
              <v-list-tile v-for="(item, index) in filterColumns" :key="index">
                <v-select
                  :items="filterModes"
                  v-model="item.mode"
                  item-text="text"
                  item-value="name"
                  :label="$t('filterModes.label')"
                  hide-details
                  @input="updateColumnFilterMode($event, index)"
                ></v-select>
                <v-text-field v-model="item.value" hide-details :label="item.text" @input="updateFilterColumns($event, index)"></v-text-field>
              </v-list-tile>
            </v-list>
          </v-menu>

          <!-- Search in table -->
          <span style="display:inline-block;margin-left:50px;width:250px;">
            <v-text-field append-icon="search" :label="$t('search')" single-line hide-details v-model="search" min-width="200"></v-text-field>
          </span>

          <!-- Select statuses (active/inactive) -->
          <template v-if="['soft', 'both'].includes(deleteMode)">
            <span style="display:inline-block;margin-left:50px;width:250px;">
              <v-select :label="$t('status.title')" v-bind:items="statuses" v-model="selectedStatuses" single-line item-text="text" item-value="value" multiple chips></v-select>
            </span>
          </template>

        </v-flex>
      </v-layout>
    </v-card-title>

    <!-- Table -->
    <v-data-table 
      :disable-initial-sort="true"
      :must-sort="true"
      :rows-per-page-items="[10, 25, { text: $t('all'), value: -1 }]"
      light
      :headers="headers"
      :items="filteredItems"
      :no-results-text="$t('noMatchingResults')"
      :no-data-text="$t('noDataAvailable')"
      :rows-per-page-text="$t('rowsPerPageText')">
      <template slot="items" slot-scope="props">
        <tr @dblclick="rowDblclickAction(props.item.meta.id)">
          <!-- action buttons -->
          <td class="cell-nowrap">
            <!-- edit record -->
            <v-tooltip top v-if="editButton">
              <v-btn fab small class="xs white--text" color="orange" @click="edit(props.item.meta.id)" slot="activator">
                <v-icon>edit</v-icon>
              </v-btn>
              <span>{{ $t('buttons.edit') }}</span>
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
                <span>{{ $t('buttons.suspend') }}</span>
              </v-tooltip>
              <v-tooltip top v-else>
                <v-btn fab small outline class="xs white--text" color="green" @click="restore(props.item.meta.id)" slot="activator">
                  <v-icon>redo</v-icon>
                </v-btn>
                <span>{{ $t('buttons.restore') }}</span>
              </v-tooltip>
            </template>
            <!-- hard delete -->
            <v-tooltip top v-if="['hard', 'both'].includes(deleteMode)">
              <v-btn outline fab small class="xs white--text" color="red" @click="destroy(props.item.meta.id)" slot="activator">
                <v-icon>delete</v-icon>
              </v-btn>
              <span>{{ $t('buttons.delete') }}</span>
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
          {{ $t('records') }} {{ pageStart }} - {{ pageStop }} {{ $t('from') }} {{ itemsLength }}
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
import MessagesMixin from "../mixins/datatable-messages.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  mixins: [ClientSideFilteringMixin, HelperMixin, MessagesMixin],
  props: {
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
    fileMode: {
      type: Boolean,
      default: false
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
  computed: {
    tableFields() {
      return this.fieldsInfo.filter(field => field.table != false && field.type != 'divider');
    },
    items() {
      return this.tableData;
    },
  },
  methods: {
    ...mapMutations("crud", [
      "setItemElementsInfo",
      "editItemElementsDialog",
    ]),
    ...mapActions("crud", [
      "getItemElements",
    ]),
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
