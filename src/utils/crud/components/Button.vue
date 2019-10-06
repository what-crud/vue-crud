<template>
  <v-tooltip top>
    <v-btn
      fab
      :x-small="xSmall"
      :small="small"
      :dark="dark"
      :color="color"
      @click="emitClick()"
      slot="activator"
    >
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>

export default {
  props: {
    xSmall: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: true
    },
    color: {
      type: String
    },
    tooltip: {
      type: String
    },
    icon: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitClick () {
      this.$emit('clicked')
    }
  }
}

</script>
