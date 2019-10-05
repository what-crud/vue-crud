<template>
  <v-card-title class="card-title table-controls">
    <v-layout row wrap>

      <v-flex xs12 lg3 text-xs-center>
        <!-- Dialog for creating item -->
        <v-tooltip top v-if="createMode">
          <template v-slot:activator="{ on }">
            <v-btn
              fab dark
              color="light-blue lighten-2"
              @click="create()"
              v-on="on"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('global.datatable.add') }}</span>
        </v-tooltip>
        <!-- Multiple edit -->
        <v-tooltip top v-if="editMode && selectManyMode && updateManyMode">
          <template v-slot:activator="{ on }">
            <v-btn
              fab dark small
              color="orange"
              @click="editSelected()"
              v-on="on"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('global.datatable.buttons.editSelected') }}</span>
        </v-tooltip>
        <!-- suspend/restore record (if soft deletes are enabled) -->
        <template v-if="['soft', 'both'].includes(deleteMode) && selectManyMode && updateManyMode">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                fab dark small
                color="red"
                @click="suspendSelected()"
                v-on="on"
              >
                <v-icon>undo</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('global.datatable.buttons.suspendSelected') }}</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                fab dark small
                color="green"
                @click="restoreSelected()"
                v-on="on"
              >
                <v-icon>redo</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('global.datatable.buttons.restoreSelected') }}</span>
          </v-tooltip>
        </template>
        <!-- hard delete -->
        <v-tooltip
          top
          v-if="['hard', 'both'].includes(deleteMode) && selectManyMode && removeManyMode"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              fab dark small
              color="black"
              @click="destroySelected()"
              v-on="on"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('global.datatable.buttons.deleteSelected') }}</span>
        </v-tooltip>
        <slot name="left"></slot>
      </v-flex>

      <v-flex xs12 lg6 text-xs-center>
        <slot name="center"></slot>
        <v-tooltip top v-if="mainFilter || fieldFilters">
          <template v-slot:activator="{ on }">
            <v-btn
              fab dark small
              color="red"
              @click="clearFilters()"
              v-on="on"
            >
              <v-icon>delete_sweep</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('global.datatable.buttons.clearFilters') }}</span>
        </v-tooltip>
      </v-flex>

      <v-flex xs12 lg3 text-xs-center>
        <!-- Refresh table -->
        <v-tooltip top v-if="refreshButton">
          <template v-slot:activator="{ on }">
            <v-btn
              fab dark small
              color="blue"
              @click="refreshTable()"
              v-on="on"
            >
              <v-icon>refresh</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('global.datatable.buttons.refreshTable') }}</span>
        </v-tooltip>
        <!-- Clear filters -->
        <slot name="right"></slot>
      </v-flex>

    </v-layout>
  </v-card-title>

</template>

<script>
export default {
  props: [
    'deleteMode',
    'createMode',
    'editMode',
    'mainFilter',
    'fieldFilters',
    'refreshButton',
    'selectManyMode',
    'updateManyMode',
    'removeManyMode'
  ],
  methods: {
    create () { this.$emit('create') },
    editSelected () { this.$emit('editSelected') },
    suspendSelected () { this.$emit('suspendSelected') },
    restoreSelected () { this.$emit('restoreSelected') },
    destroySelected () { this.$emit('destroySelected') },
    refreshTable () { this.$emit('refreshTable') },
    clearFilters () { this.$emit('clearFilters') }
  }
}
</script>
