<template>
  <v-tooltip top>
    <v-btn
      fab
      :small="small"
      :dark="dark"
      :class="{xs: xs}"
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
    small: {
      type: Boolean,
      default: true,
    },
    dark: {
      type: Boolean,
      default: true,
    },
    xs: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
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

<style scoped>
.xs {
  width: 25px;
  height: 25px;
  margin: 3 !important;
}

.xs > div {
  padding: 3px !important;
}

.xs > div > i {
  height: 12px !important;
  width: 12px !important;
  line-height: 12px;
}
</style>
