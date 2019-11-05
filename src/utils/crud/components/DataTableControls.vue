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
    <div>
      <!-- Dialog for creating item -->
      <crud-button
        v-if="createMode"
        x-large
        color="light-blue lighten-2"
        @clicked="create()"
        icon="add"
        :tooltip="$t('global.datatable.add')"
      ></crud-button>
      <!-- Multiple edit -->
      <crud-button
        v-if="editMode && selectManyMode && updateManyMode"
        large
        color="orange"
        @clicked="editSelected()"
        icon="edit"
        :tooltip="$t('global.datatable.buttons.editSelected')"
      ></crud-button>
      <!-- suspend/restore record (if soft deletes are enabled) -->
      <template v-if="['soft', 'both'].includes(deleteMode) && selectManyMode && updateManyMode">
        <crud-button
          large
          color="red"
          @clicked="suspendSelected()"
          icon="undo"
          :tooltip="$t('global.datatable.buttons.suspendSelected')"
        ></crud-button>
        <crud-button
          large
          color="green"
          @clicked="restoreSelected()"
          icon="redo"
          :tooltip="$t('global.datatable.buttons.restoreSelected')"
        ></crud-button>
      </template>
      <!-- hard delete -->
      <crud-button
        v-if="['hard', 'both'].includes(deleteMode) && selectManyMode && removeManyMode"
        large
        color="black"
        @clicked="destroySelected()"
        icon="delete"
        :tooltip="$t('global.datatable.buttons.deleteSelected')"
      ></crud-button>
      <slot name="left"></slot>
    </div>

    <div>
        <slot name="center"></slot>
        <crud-button
          v-if="mainFilter || fieldFilters"
          large
          color="grey"
          @clicked="clearFilters()"
          icon="delete_sweep"
          :tooltip="$t('global.datatable.buttons.clearFilters')"
        ></crud-button>
    </div>

    <div>

      <!-- Refresh table -->
      <crud-button
        v-if="refreshButton"
        large
        color="blue"
        @clicked="refreshTable()"
        icon="refresh"
        :tooltip="$t('global.datatable.buttons.refreshTable')"
      ></crud-button>
      <!-- Clear filters -->
      <slot name="right"></slot>
    </div>
  </div>

</template>

<script>
import CrudButton from './Button.vue'

export default {
  components: {
    CrudButton,
  },
  props: [
    'deleteMode',
    'createMode',
    'editMode',
    'mainFilter',
    'fieldFilters',
    'refreshButton',
    'selectManyMode',
    'updateManyMode',
    'removeManyMode',
  ],
  methods: {
    create () { this.$emit('create') },
    editSelected () { this.$emit('editSelected') },
    suspendSelected () { this.$emit('suspendSelected') },
    restoreSelected () { this.$emit('restoreSelected') },
    destroySelected () { this.$emit('destroySelected') },
    refreshTable () { this.$emit('refreshTable') },
    clearFilters () { this.$emit('clearFilters') },
  },
}
</script>
