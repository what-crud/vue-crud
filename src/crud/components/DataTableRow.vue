<template>
  <tr @dblclick="rowDblclickAction(props.item)" :class="activityClass(props.item.meta.active)">
    <td>
      <v-checkbox
        hide-details
        v-model="props.selected"
        color="black"
      ></v-checkbox>
    </td>
    <!-- action buttons -->
    <td class="cell-nowrap">
      <!-- edit record -->
      <v-tooltip top v-if="editButton">
        <v-btn fab small class="xs white--text" color="orange" @click="edit(props.item.meta.id)" slot="activator">
          <v-icon>edit</v-icon>
        </v-btn>
        <span>{{ $t('buttons.edit') }}</span>
      </v-tooltip>
      <!-- custom buttons -->
      <v-tooltip top v-for="(customButton) in customButtons" :key="customButton.name">
        <v-btn fab :disabled="!props.item.meta.buttons[customButton.name]" small class="xs white--text" :color="customButton.color" @click="custom(customButton.name, props.item)" slot="activator">
          <v-icon>{{ customButton.icon }}</v-icon>
        </v-btn>
        <span>{{ customButton.text }}</span>
      </v-tooltip>
      <!-- buttons for open modal with item elements -->
      <v-tooltip top v-for="(button, key) in itemElements" :key="key">
        <v-btn outline fab small class="xs white--text" :color="button.color" @click="editItemElements(key, props.item.meta.id)" slot="activator">
          <v-icon>{{ button.icon }}</v-icon>
        </v-btn>
        <span>{{ button.buttonText }}</span>
      </v-tooltip>
      <!-- suspend/restore record (if soft deletes are enabled) -->
      <template v-if="['soft', 'both'].includes(deleteMode)">
        <v-tooltip top v-if="props.item.meta.active == '1'">
          <v-btn outline fab small class="xs white--text" color="red" @click="suspend(props.item.meta.id)" slot="activator">
            <v-icon>undo</v-icon>
          </v-btn>
          <span>{{ $t('buttons.suspend') }}</span>
        </v-tooltip>
        <v-tooltip top v-else>
          <v-btn outline fab small class="xs white--text" color="green" @click="restore(props.item.meta.id)" slot="activator">
            <v-icon>redo</v-icon>
          </v-btn>
          <span>{{ $t('buttons.restore') }}</span>
        </v-tooltip>
      </template>
      <!-- hard delete -->
      <v-tooltip top v-if="['hard', 'both'].includes(deleteMode)">
        <v-btn outline fab small class="xs white--text" color="red" @click="destroy(props.item.meta.id)" slot="activator">
          <v-icon>delete</v-icon>
        </v-btn>
        <span>{{ $t('buttons.delete') }}</span>
      </v-tooltip>
    </td>
    <!-- table fields -->
    <td v-if="key != 'meta'" v-for="(field, key) in props.item" :key="key">
      <span v-if="columnTextModes[key] == 'html'" v-html="field"></span>
      <span v-else-if="columnTextModes[key] == 'cropped'" class="cell-nowrap">{{ field | cropped }}</span>
      <span v-else-if="columnTextModes[key] == 'text'">{{ field }}</span>
      <span v-else-if="columnTextModes[key] == 'file'">
        <file-details :field="fileFieldToJSON(field)"></file-details>
      </span>
    </td>
  </tr>
</template>

<script>
import MessagesMixin from "../mixins/messages-datatable-row.js";
import FileDetails from './FileDetails.vue'

export default {
  mixins: [MessagesMixin],
  components: {
    FileDetails 
  },
  props: [
    'props',
    'editButton',
    'customButtons',
    'deleteMode',
    'itemElements',
    "columnTextModes"
  ],
  filters: {
    cropped(field) {
      let rField
      let maxLength = 40
      if (typeof field === 'string' || field instanceof String) {
        rField = field.length <= maxLength ? field : field.substring(0, maxLength - 3) + '...'
      }
      else {
        rField = field
      }
      return rField
    },
  },
  methods: {
    fileFieldToJSON(field) {
      return JSON.parse(field)
    },
    activityClass(isActive) {
      let className = ""
      if(['soft', 'both'].includes(this.deleteMode)){
        className = parseInt(isActive) == 1 ? 'row-active' : 'row-inactive'
      }
      return className
    },
    rowDblclickAction(item) {
      if(this.editButton){
        this.edit(item.meta.id)
      }
      else {
        let goToItemButton = false
        for(let button of this.customButtons) {
          if (button.name == 'goToItem') {
            goToItemButton = true
            break
          }
        }
        if(goToItemButton){
          this.custom('goToItem', item)
        }
      }
    },
    edit(id) {this.$emit('edit', id)},
    custom(name, item) {this.$emit('custom', name, item)},
    suspend(id) {this.$emit('suspend', id)},
    restore(id) {this.$emit('restore', id)},
    destroy(id) {this.$emit('destroy', id)},
    editItemElements(name, id) {this.$emit('editItemElements', name, id)}
  }
};
</script>
