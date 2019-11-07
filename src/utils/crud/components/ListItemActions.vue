<template>
  <!-- action buttons -->
  <span style="white-space: nowrap">
    <!-- edit record -->
    <crud-button
      v-if="editButton && editMode"
      small
      color="orange"
      @clicked="edit(item.meta.id)"
      icon="edit"
      :tooltip="$t('global.datatable.buttons.edit')"
    ></crud-button>
    <!-- custom buttons -->
    <crud-button
      v-for="(customButton) in customButtons"
      :key="customButton.name"
      :disabled="!item.meta.buttons[customButton.name]"
      small
      :color="customButton.color"
      @clicked="custom(customButton.name, item)"
      :icon="customButton.icon"
      :tooltip="customButton.text"
    ></crud-button>
    <!-- buttons for open modal with item elements -->
    <crud-button
      v-for="(button, key) in itemElements"
      :key="key"
      small
      :color="button.color"
      @clicked="editItemElements(key, item.meta.id)"
      :icon="button.icon"
      :tooltip="button.buttonText"
    ></crud-button>
    <!-- suspend/restore record (if soft deletes are enabled) -->
    <template v-if="['soft', 'both'].includes(deleteMode)">
      <!-- suspend button -->
      <crud-button
        v-if="item.meta.active == '1'"
        small
        color="red"
        @clicked="suspend(item.meta.id)"
        icon="undo"
        :tooltip="$t('global.datatable.buttons.suspend')"
      ></crud-button>
      <!-- restore button -->
      <crud-button
        v-else
        small
        color="green"
        @clicked="restore(item.meta.id)"
        icon="redo"
        :tooltip="$t('global.datatable.buttons.restore')"
      ></crud-button>
    </template>
    <!-- hard delete -->
    <crud-button
      v-if="['hard', 'both'].includes(deleteMode)"
      small
      color="black"
      @clicked="destroy(item.meta.id)"
      icon="delete"
      :tooltip="$t('global.datatable.buttons.delete')"
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
