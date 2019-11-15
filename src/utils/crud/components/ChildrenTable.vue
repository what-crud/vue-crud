<template>
  <div class="child-card">
    <controls
      :create-mode="createMode"
      :edit-mode="editMode"
      :delete-mode="deleteMode"
      :select-many-mode="false"
      :update-many-mode="false"
      :remove-many-mode="false"
      :main-filter="mainFilter"
      :field-filters="fieldFilters"
      :refresh-button="false"
      :export-button="exportButton"
      :excel-loading="excelLoading"
      :initialSearch="search"
      :initialSelectedStatuses="selectedStatuses"
      :initialColumnFilters="columnFilters"
      @create="create"
      @updateColumnFilterMode="updateColumnFilterMode"
      @updateColumnFilterValue="updateColumnFilterValue"
      @updateSearch="updateSearch"
      @updateSelectedStatuses="updateSelectedStatuses"
      @clearFilters="clearFilters"
      @exportToExcel="exportToExcel"
    >
      <template slot="left">
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
      </template>
    </controls>

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
      <template
        slot="footer.page-text"
        slot-scope="{ pageStart, pageStop, itemsLength }"
      >
        <table-footer
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

import ControlsHandlerMixin from '../mixins/controls-handler'
import ItemsViewMixin from '../mixins/items-view'
import ClientModeFilteringMixin from '../mixins/table-client-mode-filtering'
import HelperMixin from '../mixins/table'

import CrudButton from './Button.vue'
import Controls from './Controls.vue'

import crud from '@/config/crud'

export default {
  name: 'ChildrenTable',
  mixins: [
    ControlsHandlerMixin,
    ItemsViewMixin,
    ClientModeFilteringMixin,
    HelperMixin,
  ],
  components: {
    CrudButton,
    Controls,
  },
  props: {
    title: String,
    fieldsInfo: Array,
    editButton: {
      type: Boolean,
      default: crud.editButton || true,
    },
    deleteMode: {
      type: String,
      validator (value) {
        return [
          'none',
          'soft',
          'hard',
          'both',
        ].indexOf(value) !== -1
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
      default: () => { },
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
    createMode: {
      type: Boolean,
      default: crud.createMode === undefined ? true : crud.createMode,
    },
    editMode: {
      type: Boolean,
      default: crud.editMode === undefined ? true : crud.editMode,
    },
    mainFilter: {
      type: Boolean,
      default: crud.mainFilter === undefined ? true : crud.mainFilter,
    },
    fieldFilters: {
      type: Boolean,
      default: crud.fieldFilters === undefined ? true : crud.fieldFilters,
    },
    exportButton: {
      type: Boolean,
      default: crud.exportButton === undefined ? true : crud.exportButton,
    },
  },
  computed: {
    ...mapState('app', ['page']),
    ...mapState('crud', [
      'prefix',
      'path',
    ]),
    tableFields () {
      return this.fieldsInfo.filter(field => field.table !== false && field.type !== 'divider')
    },
    items () {
      return this.tableData
    },
    excelName () {
      return this.title || 'export'
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
    ...mapActions('crud', ['getItemElements']),
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
    editItemElements (name, id) {
      const obj = this.itemElements[name]
      this.setItemElementsInfo([
        id,
        obj,
      ])
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
  top: 200px;
  text-align: center;
  width: 100%;
}
.details-loader {
  height: 100px !important;
  width: 100px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 100%;
  display: inline-block;
}
</style>
