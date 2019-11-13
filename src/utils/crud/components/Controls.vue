<template>
  <div
    class="
      card-title
      table-controls
      px-3
      d-flex
      align-center
      justify-space-between
    "
  >

    <!-- left side -->
    <div>

      <!-- dialog for creating item -->
      <crud-button
        v-if="createMode"
        x-large
        color="light-blue lighten-2"
        @clicked="create()"
        icon="add"
        :tooltip="$t('global.datatable.add')"
      />

      <!-- multiple edit -->
      <crud-button
        v-if="editMode && selectManyMode && updateManyMode"
        large
        color="orange"
        @clicked="editSelected()"
        icon="edit"
        :tooltip="$t('global.datatable.buttons.editSelected')"
      />

      <!-- suspend/restore record (if soft deletes are enabled) -->
      <template v-if="['soft', 'both'].includes(deleteMode) && selectManyMode && updateManyMode">
        <crud-button
          large
          color="red"
          @clicked="suspendSelected()"
          icon="undo"
          :tooltip="$t('global.datatable.buttons.suspendSelected')"
        />
        <crud-button
          large
          color="green"
          @clicked="restoreSelected()"
          icon="redo"
          :tooltip="$t('global.datatable.buttons.restoreSelected')"
        />
      </template>

      <!-- hard delete -->
      <crud-button
        v-if="['hard', 'both'].includes(deleteMode) && selectManyMode && removeManyMode"
        large
        color="black"
        @clicked="destroySelected()"
        icon="delete"
        :tooltip="$t('global.datatable.buttons.deleteSelected')"
      />

      <!-- slot -->
      <slot name="left"></slot>

    </div>

    <!-- center side -->
    <div>

      <!-- Search by fields -->
      <v-menu
        v-if="fieldFilters"
        :close-on-content-click="false"
        max-height="50vh"
        offset-y
      >
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
          <v-list-item
            v-for="(item, index) in columnFilters"
            :key="index"
          >
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
              @input="updateColumnFilterValue($event, index)"
            ></v-text-field>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Search in table -->
      <span
        v-if="mainFilter"
        class="crud-controls__search"
      >
        <v-text-field
          v-model="search"
          :label="$t('global.datatable.search')"
          class="crud-controls__search-input"
          append-icon="search"
          single-line
          hide-details
          @input="updateSearch"
        ></v-text-field>
      </span>

      <!-- Select statuses (active/inactive) -->
      <template v-if="['soft', 'both', 'filter'].includes(deleteMode)">
        <span class="crud-controls__select-statuses">
          <v-autocomplete
            v-model="selectedStatuses"
            :items="statuses"
            :label="$t('global.datatable.status.title')"
            item-text="text"
            item-value="value"
            single-line
            multiple
            chips
            @change="updateSelectedStatuses"
          ></v-autocomplete>
        </span>
      </template>

      <!-- clear filters -->
      <crud-button
        v-if="mainFilter || fieldFilters"
        large
        color="grey"
        @clicked="clearFilters()"
        icon="delete_sweep"
        :tooltip="$t('global.datatable.buttons.clearFilters')"
      />

      <!-- slot -->
      <slot name="center"></slot>

    </div>

    <!-- right side -->
    <div>

      <!-- Refresh table -->
      <crud-button
        v-if="refreshButton"
        large
        color="blue"
        @clicked="refreshItemsView()"
        icon="refresh"
        :tooltip="$t('global.datatable.buttons.refreshTable')"
      />

      <!-- Clear filters -->
      <crud-button
        v-if="exportButton"
        :loading="excelLoading"
        :tooltip="$t('global.datatable.buttons.copyToExcel')"
        color="green darken-4"
        icon="save_alt"
        large
        @clicked="exportToExcel"
      />

      <!-- slot -->
      <slot name="right"></slot>

    </div>
  </div>

</template>

<script>
import CrudButton from './Button.vue'

export default {
  name: 'Controls',
  components: {
    CrudButton,
  },
  props: [
    'createMode',
    'editMode',
    'deleteMode',
    'selectManyMode',
    'updateManyMode',
    'removeManyMode',
    'mainFilter',
    'fieldFilters',
    'refreshButton',
    'exportButton',
    'excelLoading',
    'initialSearch',
    'initialSelectedStatuses',
    'initialColumnFilters',
  ],
  data () {
    return {
      search: '',
      selectedStatuses: [],
      columnFilters: [],
    }
  },
  computed: {
    statuses () {
      return [
        {
          text: this.$t('global.datatable.status.active'),
          value: 1,
        },
        {
          text: this.$t('global.datatable.status.inactive'),
          value: 0,
        },
      ]
    },
    filterModes () {
      return [
        {
          name: 'like',
          text: this.$t('global.datatable.filterModes.options.like'),
        },
        {
          name: 'equals',
          text: this.$t('global.datatable.filterModes.options.equals'),
        },
        {
          name: 'list',
          text: this.$t('global.datatable.filterModes.options.list'),
        },
      ]
    },
  },
  methods: {
    create () {
      this.$emit('create')
    },
    editSelected () {
      this.$emit('editSelected')
    },
    suspendSelected () {
      this.$emit('suspendSelected')
    },
    restoreSelected () {
      this.$emit('restoreSelected')
    },
    destroySelected () {
      this.$emit('destroySelected')
    },
    refreshItemsView () {
      this.$emit('refreshItemsView')
    },
    updateSearch () {
      this.$emit('updateSearch', this.search)
    },
    updateSelectedStatuses () {
      this.$emit('updateSelectedStatuses', this.selectedStatuses)
    },
    updateColumnFilterMode (event, index) {
      this.$emit('updateColumnFilterMode', event, index)
    },
    updateColumnFilterValue (event, index) {
      this.$emit('updateColumnFilterValue', event, index)
    },
    updateColumnFilters () {
      this.$emit('updateColumnFilters', this.columnFilters)
    },
    clearFilters () {
      this.search = ''
      this.updateSearch()
      this.selectedStatuses = [1]
      this.updateSelectedStatuses()
      for (const column of this.columnFilters) {
        column.mode = 'like'
        column.value = ''
      }
      this.updateColumnFilters()
      this.$emit('clearFilters')
    },
    exportToExcel () {
      this.$emit('exportToExcel')
    },
  },
  created () {
    this.search = this.initialSearch
    this.selectedStatuses = this.initialSelectedStatuses
    this.columnFilters = this.initialColumnFilters
  },
}
</script>
<style lang="scss" scoped>
.crud-controls {
  &__search {
    margin: 0 15px;
    display: inline-block;
    width: 120px;
    @media (min-width: 500px) {
      width: 250px;
    }
  }
  &__search-input {
    margin-top: -8px;
  }
  &__select-statuses {
    margin: 0 15px;
    display: inline-block;
    width: 120px;
    @media (min-width: 500px) {
      width: 250px;
    }
  }
}
</style>
