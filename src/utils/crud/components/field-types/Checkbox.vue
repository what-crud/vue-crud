<template>
  <v-checkbox
    v-model="isChecked"
    :label="field.text"
    :disabled="field.disabled"
    color="primary"
    hide-details
    @change="onChange()"
  ></v-checkbox>
</template>
<script>

export default {
  name: 'CheckboxField',
  props: [
    'value',
    'field',
  ],
  data () {
    return {
      isChecked: false,
    }
  },
  methods: {
    onChange () {
      this.isChecked = this.isChecked ? 1 : 0
      this.$emit('input', this.isChecked)
    },
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.isChecked = val
      },
    },
  },
}
</script>
