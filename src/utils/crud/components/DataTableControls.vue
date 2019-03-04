<template>
  <v-card-title class="card-title table-controls">
    <v-layout row wrap>

      <v-flex xs12 lg3 text-xs-center>
        <!-- Dialog for creating item -->
        <v-tooltip top v-if="createMode">
          <v-btn fab dark color="green" @click="create()" slot="activator">
            <v-icon>add</v-icon>
          </v-btn>
          <span>{{ $t('global.datatable.add') }}</span>
        </v-tooltip>
        <!-- Multiple edit -->
        <v-tooltip top v-if="editMode && selectManyMode && updateManyMode">
          <v-btn fab small dark color="orange" @click="editSelected()" slot="activator">
            <v-icon>edit</v-icon>
          </v-btn>
          <span>{{ $t('global.datatable.buttons.editSelected') }}</span>
        </v-tooltip>
        <!-- suspend/restore record (if soft deletes are enabled) -->
        <template v-if="['soft', 'both'].includes(deleteMode) && selectManyMode && updateManyMode">
          <v-tooltip top>
            <v-btn class="white--text" fab small color="red" @click="suspendSelected()" slot="activator">
              <v-icon>undo</v-icon>
            </v-btn>
            <span>{{ $t('global.datatable.buttons.suspendSelected') }}</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn class="white--text" fab small color="green" @click="restoreSelected()" slot="activator">
              <v-icon>redo</v-icon>
            </v-btn>
            <span>{{ $t('global.datatable.buttons.restoreSelected') }}</span>
          </v-tooltip>
        </template>
        <!-- hard delete -->
        <v-tooltip top v-if="['hard', 'both'].includes(deleteMode) && selectManyMode && removeManyMode">
          <v-btn class="white--text" fab small color="red" @click="destroySelected()" slot="activator">
            <v-icon>delete</v-icon>
          </v-btn>
          <span>{{ $t('global.datatable.buttons.deleteSelected') }}</span>
        </v-tooltip>
        <slot name="left"></slot>
      </v-flex>

      <v-flex xs12 lg6 text-xs-center>
        <slot name="center"></slot>
      </v-flex>

      <v-flex xs12 lg3 text-xs-center>
        <!-- Refresh table -->
        <v-tooltip top v-if="refreshButton">
          <v-btn 
            class="white--text"
            fab
            small
            color="blue"
            @click="refreshTable()"
            slot="activator"
          >
            <v-icon>refresh</v-icon>
          </v-btn>
          <span>{{ $t('global.datatable.buttons.refreshTable') }}</span>
        </v-tooltip>
        <!-- Clear filters -->
        <v-tooltip top v-if="mainFilter || fieldFilters">
          <v-btn 
            class="white--text"
            fab
            small
            color="red"
            @click="clearFilters()"
            slot="activator"
          >
            <v-icon>delete_sweep</v-icon>
          </v-btn>
          <span>{{ $t('global.datatable.buttons.clearFilters') }}</span>
        </v-tooltip>
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
    'removeManyMode',
  ],
  methods: {
    create() {this.$emit('create')},
    editSelected() {this.$emit('editSelected')},
    suspendSelected() {this.$emit('suspendSelected')},
    restoreSelected() {this.$emit('restoreSelected')},
    destroySelected() {this.$emit('destroySelected')},
    refreshTable() {this.$emit('refreshTable')},
    clearFilters() {this.$emit('clearFilters')},
  }
};
</script>