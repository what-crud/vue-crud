<template>
  <div>
    <controls
      :create-mode="createMode"
      :edit-mode="editMode"
      :delete-mode="deleteMode"
      :select-many-mode="selectManyMode"
      :update-many-mode="updateManyMode"
      :remove-many-mode="removeManyMode"
      :main-filter="mainFilter"
      :field-filters="fieldFilters"
      :refresh-button="refreshButton"
      :export-button="exportButton"
      :excel-loading="excelLoading"
      :initialSearch="search"
      :initialSelectedStatuses="selectedStatuses"
      :initialColumnFilters="columnFilters"
      @create="create"
      @editSelected="editSelected"
      @suspendSelected="suspendSelected"
      @restoreSelected="restoreSelected"
      @destroySelected="destroySelected"
      @refreshItemsView="refreshItemsView"
      @updateColumnFilterMode="updateColumnFilterMode"
      @updateColumnFilterValue="updateColumnFilterValue"
      @updateSearch="updateSearch"
      @updateSelectedStatuses="updateSelectedStatuses"
      @clearFilters="clearFilters"
      @exportToExcel="exportToExcel"
    >
      <template slot="left">
        <template v-if="movingItemStarted">
          <crud-button
            small
            color="pink darken-4"
            icon="play_for_work"
            :tooltip="$t('global.datatable.buttons.insertUnassigned')"
            @clicked="insertItem(unassignedItemParent)"
          />
          <crud-button
            v-if="movingItemStarted"
            color="pink darken-4"
            icon="cancel"
            :tooltip="$t('global.datatable.buttons.cancelMove')"
            @clicked="cancelMovingItem()"
          />
        </template>
      </template>
    </controls>
    <!-- Tree -->
    <v-treeview
      v-model="selected"
      :selectable="selectManyMode"
      :items="treeItems"
      :search="searchIterationNumber"
      :filter="filter"
      class="tree"
      color="default"
      item-key="meta.id"
      selection-type="independent"
      hoverable
      dense
      transition
      return-object
    >
      <template v-slot:label="{ item }">
        <div class="tree-item">
          <v-row
            class="tree-item__field"
            dense
          >
            <v-col class="tree-item__field-label">
              {{ $t('global.datatable.fields.action') }}
            </v-col>
            <v-col>
              <span class="tree-item__field-value">
                <crud-button
                  v-if="createMode"
                  small
                  color="light-blue lighten-2"
                  @clicked="createChildNode(item.meta.id)"
                  icon="add"
                  :tooltip="$t('global.datatable.add')"
                />
                <list-item-actions
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
                />
                <template v-if="editMode">
                  <crud-button
                    v-if="!movingItemStarted"
                    small
                    color="pink darken-4"
                    icon="swap_vert"
                    :tooltip="$t('global.datatable.buttons.move')"
                    @clicked="moveItem(item)"
                  />
                  <crud-button
                    v-else-if="isInsertAllowed(item)"
                    small
                    color="pink darken-4"
                    icon="play_for_work"
                    :tooltip="$t('global.datatable.buttons.insert')"
                    @clicked="insertItem(item.meta.id)"
                  />
                </template>
              </span>
            </v-col>
          </v-row>
          <v-row
            v-for="(field, key) in item.fields"
            :key="key"
            class="tree-item__field"
            dense
          >
            <v-col class="tree-item__field-label">
              {{ field.label }}
            </v-col>
            <v-col>
              <span class="tree-item__field-value">
                <slot
                  :name="`field:${field.name}`"
                  :value="field.value"
                  :item="item"
                >
                  <list-item-field
                    :value="field.value"
                    :text-mode="textMode(item, field.name)"
                  />
                </slot>
              </span>
            </v-col>
          </v-row>
        </div>
      </template>
    </v-treeview>
  </div>
</template>

<script>

import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex'

import CrudInstanceMixin from '../mixins/crud-instance'
import ControlsHandlerMixin from '../mixins/controls-handler'
import ItemsViewMixin from '../mixins/items-view'

import Controls from './Controls.vue'
import CrudButton from './Button.vue'

export default {
  name: 'CrudTreeClientMode',
  mixins: [
    CrudInstanceMixin,
    ControlsHandlerMixin,
    ItemsViewMixin,
  ],
  components: {
    Controls,
    CrudButton,
  },
  data () {
    return {
      searchIterationNumber: '0',
      movingItemStarted: false,
      itemsDisabledForInsert: [],
      movedItemId: undefined,
    }
  },
  computed: {
    ...mapState('crud', [
      'loading',
      'detailsDialog',
      'isItemsViewRefreshed',
    ]),
    parentColumnName () {
      return this.itemsViewConfig.parentColumnName || 'parent_id'
    },
    unassignedItemParent () {
      return this.itemsViewConfig.unassignedItemParent || null
    },
    treeItems () {
      const parentColumnName = this.parentColumnName
      let otherItems = this.items
      const addChildrenToItem = (id) => {
        let children = []
        for (const child of otherItems) {
          const parentId = child.meta.item[parentColumnName]
          if (id === parentId) {
            const childId = child.meta.id
            const computedChild = {}
            const computeFields = (item) => {
              return this.tableFields.map(field => {
                return {
                  name: field.name,
                  label: field.text,
                  value: item[field.name],
                }
              })
            }
            computedChild.fields = computeFields(child)
            computedChild.meta = child.meta
            computedChild.children = addChildrenToItem(childId)
            children.push(computedChild)
          }
        }
        return children
      }
      let computedItems = addChildrenToItem(this.unassignedItemParent)
      return computedItems
    },
    filter () {
      return (item) => {
        let isTestPassed

        // check if selected statuses contain item status
        isTestPassed = [
          'soft',
          'both',
        ].includes(this.deleteMode)
          ? this.selectedStatuses.includes(parseInt(item.meta.active))
          : true
        if (!isTestPassed) return false

        // check if item contain all search phrases
        const phrases = this.search === '' ? [] : this.search.toLowerCase().split(' ')
        for (const phrase of phrases) {
          isTestPassed = false
          for (const field of item.fields) {
            let fieldValue = field.value
            if (typeof fieldValue === 'string' || fieldValue instanceof String || typeof fieldValue === 'number') {
              fieldValue = fieldValue.toString().toLowerCase()
              if (fieldValue.indexOf(phrase) > -1) {
                isTestPassed = true
                break
              }
            }
          }
          if (!isTestPassed) return false
        }

        // check if item contain phrases from column filters
        for (const filter of this.columnFilters) {
          if (filter.value !== '') {
            isTestPassed = false
            const colName = filter.name
            let field = item.meta.item[colName]
            if (typeof field === 'string' || field instanceof String || typeof field === 'number') {
              field = field.toString().toLowerCase()
              switch (filter.mode) {
                case 'like':
                  if (field.includes(filter.value)) {
                    isTestPassed = true
                  }
                  break
                case 'equals':
                  if (field === filter.value) {
                    isTestPassed = true
                  }
                  break
                case 'list':
                  const tmpList = filter.value.split(';')
                  if (tmpList.includes(field)) {
                    isTestPassed = true
                  }
                  break
                default:
                  break
              }
            }
            if (!isTestPassed) return false
          }
        }

        return true
      }
    },
  },
  methods: {
    ...mapActions('crud', ['getItems']),
    ...mapMutations('crud', ['setItem']),
    clearFilters () {},
    exportToExcel () {},
    startSearching () {
      this.searchIterationNumber = parseInt(this.searchIterationNumber + 1).toString()
    },
    beforeGetItem (id) {},
    moveItem (item) {
      const addItemsDisabledForInsert = (node) => {
        this.itemsDisabledForInsert.push(node.meta.id)
        if (node.children) {
          for (const child of node.children) {
            addItemsDisabledForInsert(child)
          }
        }
      }
      this.itemsDisabledForInsert = []
      addItemsDisabledForInsert(item)
      this.movedItemId = item.meta.id
      this.movingItemStarted = true
    },
    insertItem (id) {
      this.movingItemStarted = false
      const obj = {}
      obj[this.parentColumnName] = id
      this.updateItem([
        this.movedItemId,
        obj,
        this.$t('global.alerts.updated'),
        this.$t('global.alerts.updateError'),
      ])
    },
    cancelMovingItem () {
      this.movingItemStarted = false
    },
    isInsertAllowed (item) {
      return !this.itemsDisabledForInsert.includes(item.meta.id)
    },
    createChildNode (id) {
      this.resetItem()
      const initialItem = {}
      initialItem[this.parentColumnName] = id
      this.setItem(initialItem)
      this.createItemDialog()
    },
  },
  created () {
    this.resetItems()
    this.getItems()
    this.testItems = this.treeItems
  },
  watch: {
    detailsDialog (val) {
      if (!val) {
        this.getItems()
      }
    },
    isItemsViewRefreshed (val) {
      if (val) {
        this.getItems()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.tree {
  max-width: 100%;
  margin: 0 10px;
}
.tree-item {
  padding-left: 10px;
  &__field {
    max-width: 800px;
    &:not(:last-child) {
      border-bottom: 1px dotted #ccc;
    }
  }
  &__field-label {
    font-weight: bold;
  }
  &__field-value {
    float: right;
  }
}
</style>
