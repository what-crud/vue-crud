<template>
    <v-footer :class="[color, dark ? 'white--text' : 'black--text']" class="pa-1" app>
        <slot name="left"></slot>
        <v-spacer></v-spacer>
        <slot name="center"></slot>
        <v-spacer></v-spacer>
        <slot name="right"></slot>
    </v-footer>
</template>
<script>
export default {
  name: 'footnote',
  props: {
    color: {
      type: String,
      default: 'secondary',
    },
    dark: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
