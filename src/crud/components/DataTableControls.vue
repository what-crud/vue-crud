<template>
  <span>
    <!-- Dialog for creating item -->
    <v-tooltip top>
      <v-btn fab dark color="green" @click="create()" slot="activator">
        <v-icon>add</v-icon>
      </v-btn>
      <span>{{ $t('global.datatable.add') }}</span>
    </v-tooltip>
    <!-- Multiple edit -->
    <v-tooltip top>
      <v-btn fab small dark color="orange" @click="editSelected()" slot="activator">
        <v-icon>edit</v-icon>
      </v-btn>
      <span>{{ $t('global.datatable.buttons.editSelected') }}</span>
    </v-tooltip>
    <!-- suspend/restore record (if soft deletes are enabled) -->
    <template v-if="['soft', 'both'].includes(deleteMode)">
      <v-tooltip top>
        <v-btn outline class="white--text" fab small color="red" @click="suspendSelected()" slot="activator">
          <v-icon>undo</v-icon>
        </v-btn>
        <span>{{ $t('global.datatable.buttons.suspendSelected') }}</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn outline class="white--text" fab small color="green" @click="restoreSelected()" slot="activator">
          <v-icon>redo</v-icon>
        </v-btn>
        <span>{{ $t('global.datatable.buttons.restoreSelected') }}</span>
      </v-tooltip>
    </template>
    <!-- hard delete -->
    <v-tooltip top v-if="['hard', 'both'].includes(deleteMode)">
      <v-btn outline class="white--text" fab small color="red" @click="destroySelected()" slot="activator">
        <v-icon>delete</v-icon>
      </v-btn>
      <span>{{ $t('global.datatable.buttons.deleteSelected') }}</span>
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
      <span>{{ $t('global.datatable.buttons.refreshTable') }}</span>
    </v-tooltip>
  </span>
</template>

<script>
export default {
  props: [
    'deleteMode',
  ],
  methods: {
    create() {this.$emit('create')},
    editSelected() {this.$emit('editSelected')},
    suspendSelected() {this.$emit('suspendSelected')},
    restoreSelected() {this.$emit('restoreSelected')},
    destroySelected() {this.$emit('destroySelected')},
    refreshTable() {this.$emit('refreshTable')},
  }
};
</script>