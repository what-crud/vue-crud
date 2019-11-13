<template>
  <!-- action buttons -->
  <span style="white-space: nowrap">
    <!-- edit record -->
    <crud-button
      v-if="editButton && editMode"
      small
      color="orange"
      icon="edit"
      :tooltip="$t('global.datatable.buttons.edit')"
      @clicked="edit(item.meta.id)"
    ></crud-button>
    <!-- custom buttons -->
    <crud-button
      v-for="(customButton) in customButtons"
      :key="customButton.name"
      :disabled="!item.meta.buttons[customButton.name]"
      small
      :color="customButton.color"
      :icon="customButton.icon"
      :tooltip="customButton.text"
      @clicked="custom(customButton.name, item)"
    ></crud-button>
    <!-- buttons for open modal with item elements -->
    <crud-button
      v-for="(button, key) in itemElements"
      :key="key"
      small
      :color="button.color"
      :icon="button.icon"
      :tooltip="button.buttonText"
      @clicked="editItemElements(key, item.meta.id)"
    ></crud-button>
    <!-- suspend/restore record (if soft deletes are enabled) -->
    <template v-if="['soft', 'both'].includes(deleteMode)">
      <!-- suspend button -->
      <crud-button
        v-if="item.meta.active == '1'"
        small
        color="red"
        icon="undo"
        :tooltip="$t('global.datatable.buttons.suspend')"
        @clicked="suspend(item.meta.id)"
      ></crud-button>
      <!-- restore button -->
      <crud-button
        v-else
        small
        color="green"
        icon="redo"
        :tooltip="$t('global.datatable.buttons.restore')"
        @clicked="restore(item.meta.id)"
      ></crud-button>
    </template>
    <!-- hard delete -->
    <crud-button
      v-if="['hard', 'both'].includes(deleteMode)"
      small
      color="black"
      icon="delete"
      :tooltip="$t('global.datatable.buttons.delete')"
      @clicked="destroy(item.meta.id)"
    ></crud-button>
  </span>
</template>

<script>
import CrudButton from './Button.vue'

export default {
  components: {
    CrudButton,
  },
  props: {
    item: {},
    editButton: {},
    customButtons: {},
    deleteMode: {},
    itemElements: {},
    dynamicTextModes: {},
    editMode: {},
    selectManyMode: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    edit (id) { this.$emit('edit', id) },
    custom (name, item) { this.$emit('custom', name, item) },
    suspend (id) { this.$emit('suspend', id) },
    restore (id) { this.$emit('restore', id) },
    destroy (id) { this.$emit('destroy', id) },
    editItemElements (name, id) { this.$emit('editItemElements', name, id) },
  },
}
</script>
