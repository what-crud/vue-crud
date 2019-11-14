<template>
  <v-dialog
    v-model="details.show"
    :max-width="width"
    persistent
    no-click-animation
  >
    <v-card>
      <slot
        name="title"
        :title="title"
      >
        <v-card-title
          class="headline"
        >
          {{ details.action == 'multiedit' ? $t('global.details.multipleUpdateTitle') : title }}
        </v-card-title>
      </slot>
      <v-form v-model="details.formValid">
        <v-card-text class="details-list">
          <slot name="over-fields" />
          <div
            v-for="(field, i) in fields"
            :key="i"
          >
            <v-layout row wrap>
              <v-flex
                v-if="details.action == 'multiedit' && field.show"
                class="sm1"
              >
                <input
                  type="checkbox"
                  v-model="field.updateColumn"
                >
              </v-flex>
              <v-flex :class="details.action == 'multiedit' ? 'sm11' : 'sm12'">
                <item-details-field
                  :field="field"
                  :dynamic-field-type="dynamicFieldType(field.typeField)"
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
              </v-flex>
            </v-layout>
          </div>
          <slot name="under-fields" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="custom-actions" />
          <v-btn color="black" text @click.native="close()">{{ $t('global.details.buttons.close') }}</v-btn>
          <v-btn
            :disabled="!details.formValid"
            v-if="details.action == 'create'"
            color="green"
            text
            @click="store()"
          >{{ $t('global.details.buttons.create') }}</v-btn>
          <v-btn
            :disabled="!details.formValid"
            v-else-if="details.action == 'edit'"
            color="orange"
            text
            @click="update()"
          >{{ $t('global.details.buttons.modify') }}</v-btn>
          <v-btn
            v-else-if="details.action == 'multiedit'"
            color="orange"
            text
            @click="updateSelected()"
          >{{ $t('global.details.buttons.modifySelected') }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import ItemDetailsField from './ItemDetailsField.vue'
import { fieldModifiers } from '@/utils/crud/helpers/functions'
import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex'

export default {
  components: {
    ItemDetailsField,
  },
  props: [
    'title',
    'detailsFields',
    'width',
  ],
  data () {
    return {
      reload: false,
      fields: [],
    }
  },
  watch: {
    detailsShow: function (val) {
      if (val) {
        this.setFields()
        if (this.details.action === 'edit') {
          this.reload = true
          setTimeout(() => {
            this.reload = false
          }, 100)
        }
      }
    },
  },
  mounted () {
    this.resetItem()
    this.setFields()
  },
  computed: {
    ...mapState('crud', [
      'details',
      'path',
      'prefix',
      'selectedIds',
    ]),
    itemData () {
      const result = {}
      for (const field of this.fields) {
        result[field.column] = field.value !== undefined ? field.value : null
      }
      return result
    },
    detailsShow () {
      return this.details.show
    },
  },
  methods: {
    ...mapActions('crud', [
      'updateItem',
      'storeItem',
      'mulitipleItemsUpdate',
    ]),
    ...mapActions(['openAlertBox']),
    ...mapMutations('crud', ['resetItem']),
    setFields () {
      const result = this.detailsFields.map((field) => {
        const rField = field
        let show = true
        if (this.details.action === 'create') {
          show = field.create !== false
        } else if (this.details.action === 'multiedit') {
          show = field.multiedit !== false
        } else if (this.details.action === 'edit') {
          show = field.edit !== false
        }
        rField.show = show
        rField.value = this.details.item[field.column]
        if (typeof rField.value !== 'undefined') {
          const fieldValue = this.details.item[field.column]
          if (field.type === 'select') {
            const defaultVal = field.list.default || field.required ? 1 : undefined
            rField.value = field.stringId ? fieldValue : parseInt(fieldValue) || defaultVal
          } else if (field.type === 'date') {
            rField.value = (fieldValue || '').substring(0, 10)
          } else if (field.type === 'checkbox') {
            if ([
              1,
              '1',
              true,
              'true',
            ].includes(fieldValue)) {
              rField.value = 1
            } else if ([
              0,
              '0',
              false,
              'false',
            ].includes(fieldValue)) {
              rField.value = 0
            }
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
          rField.value = 0
        }
        return rField
      })
      this.$set(this, 'fields', result)
    },
    dynamicFieldType (fieldType) {
      const refField = this.fields.find((field) => field.name === fieldType)
      return refField ? refField.value : undefined
    },
    valueChanged (val, fieldColumn) {
      const field = this.fields[this.fields.findIndex(el => el.column === fieldColumn)]
      this.$set(field, 'value', val)
      if (field.onChange) {
        field.onChange(val, this.fields)
      }
    },
    close () {
      this.details.show = false
    },
    update () {
      this.updateItem([
        this.details.id,
        this.itemData,
        this.$t('global.alerts.updated'),
        this.$t('global.alerts.updateError'),
      ]).then((response) => {
        this.close()
      })
    },
    store () {
      this.storeItem([
        this.itemData,
        this.$t('global.alerts.stored'),
        this.$t('global.alerts.storeError'),
      ]).then((response) => {
        this.close()
      })
    },
    updateSelected () {
      const filteredFields = this.fields.filter(field => field.updateColumn)
      const keyValuePairs = {}
      for (const field of filteredFields) {
        keyValuePairs[field.column] = field.value
      }
      this.mulitipleItemsUpdate([
        {
          ids: this.selectedIds,
          request: keyValuePairs,
        },
        this.$t('global.alerts.updated'),
        this.$t('global.alerts.updateError'),
      ])
    },
  },
}
</script>

<style scoped>
.details-list {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}
</style>
