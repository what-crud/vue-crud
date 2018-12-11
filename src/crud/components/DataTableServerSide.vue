<template>
  <v-card>
    <v-card-title class="card-title table-controls">
      <v-layout row wrap>

        <v-flex xs12 lg4>

          <!-- Dialog for creating item -->
          <v-tooltip top>
            <v-btn fab dark color="green" @click="create()" slot="activator">
              <v-icon>add</v-icon>
            </v-btn>
            <span>{{ $t('add') }}</span>
          </v-tooltip>
          <!-- Multiple edit -->
          <v-tooltip top>
            <v-btn fab small dark color="orange" @click="editSelected()" slot="activator">
              <v-icon>edit</v-icon>
            </v-btn>
            <span>{{ $t('buttons.editSelected') }}</span>
          </v-tooltip>
          <!-- suspend/restore record (if soft deletes are enabled) -->
          <template v-if="['soft', 'both'].includes(deleteMode)">
            <v-tooltip top>
              <v-btn outline class="white--text" fab small color="red" @click="suspendSelected" slot="activator">
                <v-icon>undo</v-icon>
              </v-btn>
              <span>{{ $t('buttons.suspendSelected') }}</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn outline class="white--text" fab small color="green" @click="restoreSelected" slot="activator">
                <v-icon>redo</v-icon>
              </v-btn>
              <span>{{ $t('buttons.restoreSelected') }}</span>
            </v-tooltip>
          </template>
          <!-- hard delete -->
          <v-tooltip top v-if="['hard', 'both'].includes(deleteMode)">
            <v-btn outline class="white--text" fab small color="red" @click="destroySelected" slot="activator">
              <v-icon>delete</v-icon>
            </v-btn>
            <span>{{ $t('buttons.deleteSelected') }}</span>
          </v-tooltip>
          <!-- Refresh table -->
          <v-tooltip top>
            <v-btn 
              outline
              class="white--text"
              fab
              small
              color="blue"
              @click="refreshTable()"
              slot="activator"
            >
              <v-icon>refresh</v-icon>
            </v-btn>
            <span>{{ $t('buttons.refreshTable') }}</span>
          </v-tooltip>

        </v-flex>

        <v-flex xs12 lg8 text-xs-left text-lg-right>

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
                  @input="updateColumnFilterModeEvent($event, index)"
                ></v-select>
                <v-text-field v-model="item.value" hide-details :label="item.text" @input="filterColumnsEvent($event, index)"></v-text-field>
              </v-list-tile>
            </v-list>
          </v-menu>

          <!-- Search in table -->
          <span style="display:inline-block;margin-left:50px;width:250px;">
            <v-text-field append-icon="search" :label="$t('search')" single-line hide-details v-model="search" min-width="200" @input="searchItems()"></v-text-field>
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
      :no-results-text="$t('noMatchingResults')"
      :no-data-text="$t('noDataAvailable')"
      :rows-per-page-text="$t('rowsPerPageText')"
      :total-items="totalItems"
      :loading="loading"
    >
      <template slot="items" slot-scope="props">
        <tr @dblclick="rowDblclickAction(props.item)">
          <td>
            <v-checkbox
              hide-details
              v-model="props.selected"
              color="black"
            ></v-checkbox>
          </td>
          <!-- action buttons -->
          <td class="cell-nowrap">
            <!-- edit record -->
            <v-tooltip top v-if="editButton">
              <v-btn fab small class="xs white--text" color="orange" @click="edit(props.item.meta.id)" slot="activator">
                <v-icon>edit</v-icon>
              </v-btn>
              <span>{{ $t('buttons.edit') }}</span>
            </v-tooltip>
            <!-- custom buttons -->
            <v-tooltip top v-for="(customButton) in customButtons" :key="customButton.name">
              <v-btn fab :disabled="!props.item.meta.buttons[customButton.name]" small class="xs white--text" :color="customButton.color" @click="custom(customButton.name, props.item)" slot="activator">
                <v-icon>{{ customButton.icon }}</v-icon>
              </v-btn>
              <span>{{ customButton.text }}</span>
            </v-tooltip>
            <!-- buttons for open modal with item elements -->
            <v-tooltip top v-for="(button, key) in itemElements" :key="key">
              <v-btn outline fab small class="xs white--text" :color="button.color" @click="editItemElements(key, props.item.meta.id)" slot="activator">
                <v-icon>{{ button.icon }}</v-icon>
              </v-btn>
              <span>{{ button.buttonText }}</span>
            </v-tooltip>
            <!-- suspend/restore record (if soft deletes are enabled) -->
            <template v-if="['soft', 'both'].includes(deleteMode)">
              <v-tooltip top v-if="props.item.meta.active == '1'">
                <v-btn outline fab small class="xs white--text" color="red" @click="suspend(props.item.meta.id)" slot="activator">
                  <v-icon>undo</v-icon>
                </v-btn>
                <span>{{ $t('buttons.suspend') }}</span>
              </v-tooltip>
              <v-tooltip top v-else>
                <v-btn outline fab small class="xs white--text" color="green" @click="restore(props.item.meta.id)" slot="activator">
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
            <!-- file mode -->
            <template v-if="fileMode">
              <v-tooltip top>
                <v-btn outline fab small class="xs white--text" color="blue" @click="download(props.item)" slot="activator">
                  <v-icon>file_download</v-icon>
                </v-btn>
                <span>{{ $t('buttons.download') }}</span>
              </v-tooltip>
              <v-tooltip top v-if="isImage(props.item.type)">
                <v-btn outline fab small class="xs white--text" color="blue" @click="showImage(props.item)" slot="activator">
                  <v-icon>search</v-icon>
                </v-btn>
                <span>{{ $t('buttons.show') }}</span>
              </v-tooltip>
            </template>
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
  </v-card>
</template>

<script>
import MainMixin from "../mixins/datatable-main.js";
import HelperMixin from "../mixins/datatable-helper.js";
import MessagesMixin from "../mixins/datatable-messages.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  mixins: [MainMixin, HelperMixin, MessagesMixin],
  data() {
    return {
      searching: false,
      newSearchRequest: false
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
    }
  },
  watch: {
    pagination: {
      handler() {
        this.getItemsServerSide([this.params]);
      },
      deep: true
    },
    detailsDialog(val) {
      if (!val) {
        this.getItemsServerSide([this.params]);
      }
    },
    selectedStatuses(val) {
      this.getItemsServerSide([this.params]);
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
      this.searchItems()
    },
    filterColumnsEvent(val, index) {
      this.updateFilterColumns(val, index)
      this.searchItems()
    },
    searchItems(){
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
