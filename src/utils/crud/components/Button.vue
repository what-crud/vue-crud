<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn
        :class="noMargin ? '' : 'mr-1'"
        :icon="!dark"
        :fab="dark"
        :dark="dark"
        :x-small="xSmall"
        :small="small"
        :large="large"
        :x-large="xLarge"
        :color="color"
        :loading="loading"
        v-on="on"
        @click="emitClick()"
      >
        <v-icon
          :dark="dark"
          v-if="icon"
        >{{ icon }}</v-icon>
        <template v-if="text">{{ text }}</template>
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
      default: false,
    },
    color: {
      type: String,
      default: 'primary',
    },
    tooltip: {
      type: String,
    },
    icon: {
      type: String,
    },
    text: {
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
    active: {
      type: Boolean,
      default: false,
    },
    noMargin: {
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
