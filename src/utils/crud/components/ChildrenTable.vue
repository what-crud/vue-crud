<template>
  <div class="child-card">
    <div
      class="
        card-title
        table-controls
        px-3
        d-flex
        justify-space-between
      "
    >
      <div>
        <!-- Dialog for creating item -->
        <crud-button
          v-if="createButton"
          x-large
          color="light-blue lighten-2"
          @clicked="create()"
          icon="add"
          :tooltip="$t('global.datatable.add')"
        />
        <!-- custom buttons -->
        <crud-button
          v-for="(customHeaderButton) in customHeaderButtons"
          :key="customHeaderButton.name"
          large
          :color="customHeaderButton.color"
          @clicked="customHeaderAction(customHeaderButton.name)"
          :icon="customHeaderButton.icon"
          :tooltip="customHeaderButton.text"
        />
      </div>

      <div>
        <!-- Search by fields -->
        <v-menu offset-y :close-on-content-click="false" max-height="50vh" style="margin-right:30px;">
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
              />
              <v-text-field
                v-model="item.value"
                hide-details
                :label="item.text"
                @input="updateFilterColumns($event, index)"
              />
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Search in table -->
        <span style="margin-right:30px;display:inline-block;width:250px;">
          <v-text-field
            v-model="search"
            :label="$t('global.datatable.search')"
            append-icon="search"
            min-width="200"
            single-line
            hide-details
          />
        </span>

        <!-- Select statuses (active/inactive) -->
        <template v-if="['soft', 'both'].includes(deleteMode)">
          <span style="margin-right:30px;display:inline-block;width:250px;">
            <v-autocomplete
              v-model="selectedStatuses"
              :label="$t('global.datatable.status.title')"
              :items="statuses"
              item-text="text"
              item-value="value"
              single-line
              multiple
              chips
            />
          </span>
        </template>
      </div>

      <div>
        <!-- Clear filters -->
        <crud-button
          large
          color="grey"
          @clicked="clearFilters()"
          icon="delete_sweep"
          :tooltip="$t('global.datatable.buttons.clearFilters')"
        />

        <!-- Export to Excel -->
        <crud-button
          large
          color="green darken-4"
          @clicked="exportToExcel()"
          icon="save_alt"
          :tooltip="$t('global.datatable.buttons.copyToExcel')"
          :loading="excelLoading"
        />
      </div>

    </div>

    <!-- Table -->
    <v-data-table
      :must-sort="true"
      :options.sync="pagination"
      :headers="headers"
      :items="filteredItems"
      :no-results-text="$t('global.datatable.noMatchingResults')"
      :no-data-text="$t('global.datatable.noDataAvailable')"
      :items-per-page="10"
      :footer-props="footerProps"
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
      <template
        slot="footer.page-text"
        slot-scope="{ pageStart, pageStop, itemsLength }"
      >
        <data-table-footer
          :pagination="pagination"
          :pageStart="pageStart"
          :pageStop="pageStop"
          :itemsLength="itemsLength"
          @setPage="setPage"
        />
      </template>
    </v-data-table>
    <div class="details-loader-container">
      <v-layout
        v-if="detailsLoader"
        class="details-loader"
        justify-center
        align-center
      >
        <v-progress-circular
          :size="100"
          :width="3"
          color="primary"
          indeterminate
        />
      </v-layout>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex'
import ClientSideFilteringMixin from '../mixins/datatable-client-side-filtering'
import HelperMixin from '../mixins/datatable-helper'
import ListItemActions from '../components/ListItemActions.vue'
import ListItemField from '../components/ListItemField.vue'
import CrudButton from './Button.vue'
import crud from '@/config/crud'

export default {
  mixins: [ClientSideFilteringMixin, HelperMixin],
  components: {
    ListItemActions,
    ListItemField,
    CrudButton,
  },
  props: {
    title: String,
    fieldsInfo: Array,
    deleteMode: {
      type: String,
      validator (value) {
        return ['none', 'soft', 'hard', 'both'].indexOf(value) !== -1
      },
      default: 'soft',
    },
    customHeaderButtons: {
      type: Array,
      default: () => [],
    },
    customButtons: {
      type: Array,
      default: () => [],
    },
    itemElements: {
      type: Object,
      default: () => {},
    },
    createButton: {
      type: Boolean,
      default: true,
    },
    editButton: {
      type: Boolean,
      default: true,
    },
    meta: {
      type: Array,
      default: () => [],
    },
    primaryKey: {
      type: String,
      default: 'id',
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    detailsLoader: {
      type: Boolean,
      default: false,
    },
    editMode: {
      type: Boolean,
      default: crud.editMode === undefined ? true : crud.editMode,
    },
  },
  computed: {
    ...mapState('app', ['page']),
    ...mapState('crud', ['prefix', 'path']),
    tableFields () {
      return this.fieldsInfo.filter(field => field.table !== false && field.type !== 'divider')
    },
    items () {
      return this.tableData
    },
    excelName () {
      return `${this.$t(`global.routes.${this.page}`)} - ${this.title}`
    },
    columnTextModes () {
      return this.setColumnTextModes()
    },
  },
  methods: {
    ...mapMutations('crud', [
      'setItemElementsInfo',
      'editItemElementsDialog',
    ]),
    ...mapActions('crud', [
      'getItemElements',
    ]),
    resolveRowDoubleClick (item) {
      this.edit(item.meta.id)
    },
    edit (id) {
      this.$parent.edit(id)
    },
    create () {
      this.$parent.create()
    },
    suspend (id) {
      this.$parent.suspend(id)
    },
    restore (id) {
      this.$parent.restore(id)
    },
    destroy (id) {
      this.$parent.destroy(id)
    },
    customHeaderAction (name) {
      this.$parent[name]()
    },
    custom (name, item, index) {
      this.$parent[name](item, index)
    },
    updateColumnFilterMode (val, index) {
      const obj = this.filterColumns
      obj[index].mode = val
      this.$set(this, 'filterColumns', obj)
    },
    updateFilterColumns (val, index) {
      const obj = this.filterColumns
      obj[index].value = val
      this.$set(this, 'filterColumns', obj)
    },
    editItemElements (name, id) {
      const obj = this.itemElements[name]
      this.setItemElementsInfo([id, obj])
      this.getItemElements()
    },
  },
}
</script>

<style scoped>
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
