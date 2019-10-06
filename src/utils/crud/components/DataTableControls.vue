<template>
  <v-card-title class="card-title table-controls px-3">
    <v-row no-gutters>

      <v-col
        xs="12"
        lg="3"
        class="
          d-flex
          align-center
          justify-center
          justify-lg-start
        "
      >
        <!-- Dialog for creating item -->
        <v-tooltip top v-if="createMode">
          <template v-slot:activator="{ on }">
            <v-btn
              fab dark
              color="light-blue lighten-2"
              class="mx-1"
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
              class="mx-1"
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
                class="mx-1"
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
                class="mx-1"
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
              class="mx-1"
              @click="destroySelected()"
              v-on="on"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('global.datatable.buttons.deleteSelected') }}</span>
        </v-tooltip>
        <slot name="left"></slot>
      </v-col>

      <v-col
        xs="12"
        lg="6"
        class="
          d-flex
          align-center
          justify-center
        "
      >
        <slot name="center"></slot>
        <v-tooltip top v-if="mainFilter || fieldFilters">
          <template v-slot:activator="{ on }">
            <v-btn
              fab dark small
              color="red"
              class="mx-1"
              @click="clearFilters()"
              v-on="on"
            >
              <v-icon>delete_sweep</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('global.datatable.buttons.clearFilters') }}</span>
        </v-tooltip>
      </v-col>

      <v-col
        xs="12"
        lg="3"
        class="
          d-flex
          align-center
          justify-center
          justify-lg-end
        "
      >
        <!-- Refresh table -->
        <v-tooltip top v-if="refreshButton">
          <template v-slot:activator="{ on }">
            <v-btn
              fab dark small
              color="blue"
              class="mx-1"
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
      </v-col>

    </v-row>
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
