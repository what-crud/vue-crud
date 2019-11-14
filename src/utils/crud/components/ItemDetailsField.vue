<template>
  <div
    v-if="field.show"
    :class="{'field--limited-width': isWidthLimited}"
  >
    <component
      v-model="value"
      :is="fieldComponent"
      :field-type="fieldType"
      :field="field"
      :reload="reload"
      :rules="fieldRules(field)"
    />
  </div>
</template>
<script>

export default {
  name: 'ItemDetailsField',
  props: [
    'field',
    'fieldValue',
    'reload',
    'dynamicFieldType',
  ],
  data () {
    return {
      value: null,
      isEmitLocked: false,
      componentsMap: {
        input: 'Text',
        number: 'Text',
        decimal: 'Text',
        time: 'Text',
        datetime: 'Text',
        date: 'Date',
        textarea: 'Textarea',
        file: 'File',
        richTextBox: 'RichTextBox',
        select: 'Select',
        checkbox: 'Checkbox',
      },
    }
  },
  computed: {
    fieldType () {
      return this.field.type === 'dynamic' ? this.dynamicFieldType : this.field.type
    },
    componentName () {
      return this.componentsMap[this.fieldType]
    },
    fieldComponent () {
      return this.componentName ? () => import(`./field-types/${this.componentName}.vue`) : undefined
    },
    isWidthLimited () {
      return ![
        'richTextBox',
        'textarea',
      ].includes(this.fieldType)
    },
    rules () {
      const self = this
      return {
        required: (v) => !!v || self.$t('global.details.rules.required'),
      }
    },
  },
  methods: {
    fieldRules (field) {
      const rules = []
      const required = field.required !== undefined ? field.required : true
      if (required) {
        rules.push(this.rules.required)
      }
      return rules
    },
  },
  watch: {
    fieldValue: {
      immediate: true,
      handler (val) {
        this.isEmitLocked = true
        this.value = val
        this.isEmitLocked = false
      },
    },
    value: {
      handler (val) {
        if (!this.isEmitLocked) {
          this.$emit('valueChanged', val, this.field.column)
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.field {
  &--limited-width {
    max-width: 600px;
  }
}
</style>
