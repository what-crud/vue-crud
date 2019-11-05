<template>
  <crud-button
    :icon="icon"
    :text="text"
    :tooltip="tooltip"
    :color="active ? 'primary' : 'secondary'"
    x-small
    @clicked="emitClick()"
  />
</template>
<script>
import CrudButton from '../Button.vue'

export default {
  components: {
    CrudButton,
  },
  props: {
    icon: {
      type: String,
    },
    text: {
      type: String,
    },
    tooltip: {
      type: String,
    },
    active: {
      type: Boolean,
    },
  },
  methods: {
    emitClick () {
      this.$emit('clicked')
    },
  },
}
</script>
