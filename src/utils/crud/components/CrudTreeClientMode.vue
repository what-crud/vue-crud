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
    </controls>
    <!-- Tree -->
    <div style="margin: 0 10px;">
    <v-treeview
      v-model="selected"
      :selectable="selectManyMode"
      :items="treeItems"
      :search="search"
      :filter="filter"
      class="tree"
      selected-color="#666666"
      color="primary"
      item-key="meta.id"
      activatable
      hoverable
      dense
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
                <list-item-field
                  :value="field.value"
                  :text-mode="textMode(item, key)"
                />
              </span>
            </v-col>
          </v-row>
        </div>
      </template>
    </v-treeview>
    </div>
  </div>
</template>

<script>

import {
  mapState,
  mapActions,
} from 'vuex'

import CrudInstanceMixin from '../mixins/crud-instance'
import ControlsHandlerMixin from '../mixins/controls-handler'
import ItemsViewMixin from '../mixins/items-view'

import Controls from './Controls.vue'

export default {
  name: 'CrudTreeClientMode',
  mixins: [
    CrudInstanceMixin,
    ControlsHandlerMixin,
    ItemsViewMixin,
  ],
  components: {
    Controls,
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('crud', [
      'loading',
      'detailsDialog',
      'isItemsViewRefreshed',
    ]),
    treeItems () {
      const parentColumnName = this.itemsViewConfig.parentColumnName || 'parent_id'
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
      let computedItems = addChildrenToItem(null)
      return computedItems
    },
    filter () {
      return (item, search) => {
        const lCaseSearch = search.toString().toLowerCase()
        let isFound = false
        for (const field of item.fields) {
          let fieldValue = field.value
          if (typeof fieldValue === 'string' || fieldValue instanceof String || typeof fieldValue === 'number') {
            fieldValue = fieldValue.toString().toLowerCase()
            if (fieldValue.indexOf(lCaseSearch) > -1) {
              isFound = true
              break
            }
          }
        }
        return isFound
      }
    },
  },
  methods: {
    ...mapActions('crud', ['getItems']),
    clearFilters () {},
    exportToExcel () {},
    startSearching () {},
    beforeGetItem (id) {},
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
