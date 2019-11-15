<template>
  <v-dialog persistent v-model="details.show" max-width="480">
    <v-card>
      <slot name="title">
        <v-card-title class="headline">{{ $t('global.details.title') }}</v-card-title>
      </slot>
      <v-form v-model="details.formValid">
        <v-card-text>
          <slot name="over-fields" />
          <div v-for="(field, i) in fields" :key="i">
            <item-details-field
              :field="field"
              :field-value="field.value"
              :reload="reload"
              @valueChanged="valueChanged"
            >
              <template
                #default="{
                  value,
                  fieldType,
                  field,
                  reload,
                  rules,
                  changeValue,
                }"
              >
                <slot
                  :name="`field:${field.name}`"
                  :value="value"
                  :field-type="fieldType"
                  :field="field"
                  :reload="reload"
                  :rules="rules"
                  :change-value="changeValue"
                />
              </template>
            </item-details-field>
          </div>
          <slot name="under-fields" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="custom-actions" />
          <v-btn
            color="black"
            text
            @click.native="close()"
          >
            {{ $t('global.details.buttons.close') }}
          </v-btn>
          <v-btn
            :disabled="!details.formValid"
            v-if="details.action == 'create'"
            color="green"
            text
            @click="store()"
          >
            {{ $t('global.details.buttons.create') }}
          </v-btn>
          <v-btn
            :disabled="!details.formValid"
            v-else-if="details.action == 'edit'"
            color="blue"
            text
            @click="update()"
          >
            {{ $t('global.details.buttons.modify') }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import ItemDetailsField from './ItemDetailsField.vue'
import { fieldModifiers } from '@/utils/crud/helpers/functions'

export default {
  components: {
    ItemDetailsField,
  },
  props: {
    details: Object,
    fieldsInfo: Array,
  },
  data () {
    return {
      fields: [],
      masks: {
        date: '####-##-##',
        time: '##:##',
        datetime: '####-##-## ##:##:##',
      },
      reload: false,
      customFilter (item, queryText, itemText) {
        const hasValue = val => (val != null ? val : '')
        const text = hasValue(item.name)
        const query = hasValue(queryText)
        return (
          text
            .toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase()) >= -1
        )
      },
    }
  },
  mounted () {
    this.setFields()
  },
  computed: {
    itemData () {
      const result = {}
      for (const field of this.fields) {
        result[field.column] = field.value ? field.value : null
      }
      // result.files = self.files
      return result
    },
    rules () {
      const self = this
      return {
        input: [v => !!v || self.$t('global.details.rules.required')],
        required: v => !!v || self.$t('global.details.rules.required'),
      }
    },
    detailsShow () {
      return this.details.show
    },
  },
  watch: {
    detailsShow: function (val) {
      if (val) {
        this.setFields()
        this.reload = true
        setTimeout(() => {
          this.reload = false
        }, 100)
      }
    },
  },
  methods: {
    setFields () {
      let filteredFields
      filteredFields = this.fieldsInfo.filter(
        field => field.details !== false && field.type !== 'divider'
      )
      const result = filteredFields.map((field) => {
        const rField = field
        let show = true
        if (this.details.action === 'create') {
          show = field.create !== false
        }
        rField.show = show
        rField.value = this.details.item[field.column]
        if (typeof rField.value !== 'undefined') {
          if (field.type === 'select') {
            const defaultVal = field.list.default || field.required ? 1 : undefined
            rField.value = field.stringId ? this.details.item[field.column] : parseInt(this.details.item[field.column]) || defaultVal
          } else if (field.type === 'date') {
            rField.value = (this.details.item[field.column] || '').substring(0, 10)
          } else if (field.type === 'checkbox') {
            rField.value = parseInt(this.details.item[field.column]) === 1
          }
          if (field.apiObject) {
            if (field.apiObject.useFunctionsInDetails) {
              const functions = field.apiObject.functions || []
              const availableFunctions = fieldModifiers

              for (let i = 0; i < functions.length; i++) {
                const functionName = functions[i]
                rField.value = availableFunctions[functionName](rField.value)
              }
            }
          }
        } else if (field.type === 'checkbox') {
          rField.value = false
        }
        return rField
      })
      this.$set(this, 'fields', result)
    },
    valueChanged (val, fieldColumn) {
      const field = this.fields[this.fields.findIndex(el => el.column === fieldColumn)]
      this.$set(field, 'value', val)
      if (field.onChange) {
        field.onChange(val, this.fields)
      }
    },
    fieldRules (field) {
      const rules = []
      const required = field.required !== undefined ? field.required : true
      if (required) {
        rules.push(this.rules.required)
      }
      return rules
    },
    reset () {
      this.$parent.reset()
    },
    close () {
      this.$parent.close()
    },
    update () {
      this.$parent.update(this.details.id, this.itemData)
    },
    store () {
      this.$parent.store(this.itemData)
    },
  },
}
</script>
<style scoped>
.checkbox-label {
  padding-left: 5px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 16px;
}
</style>
