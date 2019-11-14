<template>
  <v-text-field
    v-model="text"
    :type="['number', 'decimal'].includes(fieldType) ? 'number' : 'text'"
    :label="field.text"
    :disabled="field.disabled"
    :rules="rules"
    :step="fieldType == 'decimal' ? 0.01 : 1"
    :mask="['date', 'time', 'datetime'].includes(fieldType) ? masks[fieldType] : undefined"
    :return-masked-value="['date', 'time', 'datetime'].includes(fieldType) ? true : false"
    min="0"
    hide-details
    @blur="onBlur()"
  ></v-text-field>
</template>

<script>

export default {
  name: 'TextField',
  props: [
    'value',
    'fieldType',
    'field',
    'rules',
  ],
  data () {
    return {
      text: undefined,
      masks: {
        date: '####-##-##',
        time: '##:##',
        datetime: '####-##-## ##:##:##',
      },
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
