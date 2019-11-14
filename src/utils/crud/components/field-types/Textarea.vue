<template>
  <v-textarea
    v-model="text"
    :rules="rules"
    :label="field.text"
    :disabled="field.disabled"
    hide-details
    @blur="onBlur()"
  />
</template>
<script>

export default {
  name: 'TextareaField',
  props: [
    'value',
    'field',
    'rules',
  ],
  data () {
    return {
      text: undefined,
    }
  },
  methods: {
    onBlur () {
      this.$emit('input', this.text)
    },
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.text = val
      },
    },
  },
}
</script>
