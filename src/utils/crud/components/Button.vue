<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn
        class="mr-1"
        icon
        :x-small="xSmall"
        :small="small"
        :large="large"
        :x-large="xLarge"
        :dark="dark"
        :color="color"
        @click="emitClick()"
        v-on="on"
        :loading="loading"
      >
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>

export default {
  props: {
    xSmall: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    xLarge: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
    },
    tooltip: {
      type: String,
    },
    icon: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emitClick () {
      this.$emit('clicked')
    },
  },
}

</script>
