<template>
  <div style="position:relative;">
    <div>
      <component
        :is="componentLoader"
        :itemsViewConfig="itemsViewConfig"
        :meta="meta"
        :custom-buttons="customButtons"
        :item-elements="itemElements"
        :delete-mode="deleteMode"
        :edit-button="editButton"
        :table-fields="tableFields"
        :primary-key="primaryKey"
        :active-column-name="activeColumnName"
        :create-mode="createMode"
        :edit-mode="editMode"
        :main-filter="mainFilter"
        :field-filters="fieldFilters"
        :refresh-button="refreshButton"
        :export-button="exportButton"
        :select-many-mode="selectManyMode"
        :update-many-mode="updateManyMode"
        :remove-many-mode="removeManyMode"
      >
        <!-- slots for fields -->
        <template
          v-for="field in tableFields"
          #[`field:${field.name}`]="{ value, item }"
        >
          <slot
            :name="`list-item-field:${field.name}`"
            :item="item"
            :value="value"
          />
        </template>
      </component>
      <item-details
        :title="detailsTitle"
        :details-fields="detailsFields"
        :width="itemDetailsWidth"
      >
        <!-- slot for item details title -->
        <template #title="{ title }">
          <slot
            name="item-details-title"
            :title="title"
          />
        </template>

        <!-- slot over fields -->
        <template #over-fields>
          <slot name="item-details-over-fields"/>
        </template>

        <!-- slots for fields -->
        <template
          v-for="field in detailsFields"
          #[`field:${field.name}`]="{
            value,
            fieldType,
            field,
            reload,
            rules,
            changeValue,
          }"
        >
          <slot
            :name="`item-details-field:${field.name}`"
            :value="value"
            :field-type="fieldType"
            :field="field"
            :reload="reload"
            :rules="rules"
            :change-value="changeValue"
          />
        </template>

        <!-- slot under fields -->
        <template #under-fields>
          <slot name="item-details-under-fields"/>
        </template>

        <!-- slot for custom actions -->
        <template #custom-actions>
          <slot name="item-details-custom-actions"/>
        </template>

      </item-details>
      <item-elements></item-elements>
      <image-container></image-container>
    </div>
    <div class="details-loader-container">
      <v-layout
        v-if="detailsLoading"
        class="details-loader"
        justify-center
        align-center
      >
        <v-progress-circular
          indeterminate
          :size="100"
          :width="3"
          color="primary"
        ></v-progress-circular>
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
import ItemDetails from './ItemDetails.vue'
import ItemElements from './ItemElements.vue'
import ImageContainer from './ImageContainer.vue'
import crud from '@/config/crud'

export default {
  components: {
    ItemDetails,
    ItemElements,
    ImageContainer,
  },
  props: {
    prefix: {
      type: String,
      default: null,
    },
    path: {
      type: String,
      default: null,
    },
    paths: {
      type: Object,
      default: () => ({}),
    },
    fieldsInfo: Array,
    detailsTitle: String,
    pageTitle: String,
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
          'filter',
        ].indexOf(value) !== -1
      },
      default: crud.deleteMode || 'soft',
    },
    customHeaderButtons: {
      type: Array,
      default: () => [],
    },
    customButtons: {
      type: Array,
      default: () => [],
    },
    meta: {
      type: Array,
      default: () => [],
    },
    itemElements: {
      type: Object,
      default: () => { },
    },
    watchForCreation: {
      type: Boolean,
      default: false,
    },
    primaryKey: {
      type: String,
      default: crud.primaryKey || 'id',
    },
    activeColumnName: {
      type: String,
      default: crud.activityColumnName || 'active',
    },
    mode: {
      type: String,
      validator (value) {
        return [
          'ClientSide',
          'ServerSide',
        ].indexOf(value) !== -1
      },
      default: 'ClientSide',
    },
    itemsView: {
      type: Object,
      validator (value) {
        const isTypeCorrect = (field) => {
          const fieldType = field ? field.type : 'table'
          return [
            'table',
            'tree',
          ].indexOf(fieldType) !== -1
        }
        const isModeCorrect = (field) => {
          const fieldMode = field ? field.mode : 'client'
          return [
            'client',
            'server',
          ].indexOf(fieldMode) !== -1
        }
        return isTypeCorrect(value) && isModeCorrect(value)
      },
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
    refreshButton: {
      type: Boolean,
      default: crud.refreshButton === undefined ? true : crud.refreshButton,
    },
    selectManyMode: {
      type: Boolean,
      default: crud.selectManyMode === undefined ? true : crud.selectManyMode,
    },
    updateManyMode: {
      type: Boolean,
      default: crud.updateManyMode === undefined ? true : crud.updateManyMode,
    },
    removeManyMode: {
      type: Boolean,
      default: crud.removeManyMode === undefined ? true : crud.removeManyMode,
    },
    itemDetailsWidth: {
      default: 600,
    },
  },
  data () {
    return {
      defaultItemsViewMode: 'client',
      defaultItemsViewType: 'table',
      componentTypesMap: {
        'table': 'Table',
        'tree': 'Tree',
      },
      componentModesMap: {
        'server': 'ServerMode',
        'client': 'ClientMode',
      },
    }
  },
  computed: {
    ...mapState('crud', ['detailsLoading']),
    tableFields () {
      return this.fieldsInfo.filter(field => field.table !== false && field.type !== 'divider')
    },
    detailsFields () {
      return this.fieldsInfo.filter(field => field.details !== false && field.type !== 'divider')
    },
    itemsViewType () {
      return this.itemsView && this.itemsView.type ? this.itemsView.type : this.defaultItemsViewType
    },
    itemsViewMode () {
      let itemsViewMode
      if (this.itemsView && this.itemsView.mode) {
        itemsViewMode = this.itemsView.mode
      } else if (this.mode) {
        itemsViewMode = this.calcitemsViewMode(this.mode)
      }
      return itemsViewMode || this.defaultItemsViewMode
    },
    itemsViewConfig () {
      let config = {}
      if (this.itemsViewType === 'tree' && this.itemsView) {
        config = this.itemsView.config || {}
      }
      return config
    },
    componentLoader () {
      const typeNamePart = this.componentTypesMap[this.itemsViewType]
      const modeNamePart = this.componentModesMap[this.itemsViewMode]
      return () => import(`./Crud${typeNamePart}${modeNamePart}.vue`)
    },
  },
  methods: {
    ...mapMutations('app', ['setPage']),
    ...mapMutations('crud', [
      'setPrefix',
      'setPath',
      'setPaths',
      'setCreationMode',
      'setItemsViewType',
    ]),
    ...mapActions('crud', ['runItemsViewRefreshing']),
    custom (name, item, index) {
      this.$parent[name](item, index)
    },
    itemElementsClosed () {
      this.runItemsViewRefreshing()
    },
    calcitemsViewMode (mode) {
      const modesMap = {
        ServerSide: 'server',
        ClientSide: 'client',
      }
      return modesMap[mode]
    },
  },
  created () {
    this.setPrefix(this.prefix)
    this.setPath(this.path)
    this.setPaths(this.paths)
    this.setPage(this.pageTitle)
    const creationMode = this.watchForCreation ? 'inform' : 'ignore'
    this.setCreationMode(creationMode)
    this.setItemsViewType(this.itemsViewType)
  },
}

</script>

<style scoped>
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
