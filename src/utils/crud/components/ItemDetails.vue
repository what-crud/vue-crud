<template>
  <v-dialog persistent v-model="details.show" max-width="600" style="position:static !important;">
    <v-card>
      <v-card-title
        class="headline"
      >{{ details.action == 'multiedit' ? $t('global.details.multipleUpdateTitle') : title }}</v-card-title>
      <v-form v-model="details.formValid">
        <v-card-text class="details-list">
          <div
            v-for="(field, i) in fields"
            :key="i"
          >
            <v-layout row wrap>
              <v-flex class="sm1" v-if="details.action == 'multiedit' && field.show">
                <input type="checkbox" v-model="field.updateColumn">
              </v-flex>
              <v-flex :class="details.action == 'multiedit' ? 'sm11' : 'sm12'">
                <field
                  :field="field"
                  :fieldValue="field.value"
                  :reload="reload"
                  @valueChanged="valueChanged"
                ></field>
              </v-flex>
            </v-layout>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" flat="flat" @click.native="close()">{{ $t('global.details.buttons.close') }}</v-btn>
          <v-btn
            :disabled="!details.formValid"
            v-if="details.action == 'create'"
            color="green"
            flat="flat"
            @click="store()"
          >{{ $t('global.details.buttons.create') }}</v-btn>
          <v-btn
            :disabled="!details.formValid"
            v-else-if="details.action == 'edit'"
            color="orange"
            flat="flat"
            @click="update()"
          >{{ $t('global.details.buttons.modify') }}</v-btn>
          <v-btn
            v-else-if="details.action == 'multiedit'"
            color="orange"
            flat="flat"
            @click="updateSelected()"
          >{{ $t('global.details.buttons.modifySelected') }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import Field from './Field.vue'
import { fieldModifiers } from '@/utils/crud/helpers/functions'
import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex'

export default {
  components: {
    Field
  },
  props: ['title', 'detailsFields'],
  data () {
    return {
      reload: false,
      fields: []
    }
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
    }
  },
  mounted () {
    this.resetItem()
    this.setFields()
  },
  computed: {
    ...mapState('crud', ['details', 'path', 'prefix', 'selectedIds']),
    itemData () {
      const result = {}
      for (const field of this.fields) {
        result[field.column] = field.value !== undefined ? field.value : null
      }
      return result
    },
    detailsShow () {
      return this.details.show
    }
  },
  methods: {
    ...mapActions('crud', ['updateItem', 'storeItem', 'mulitipleItemsUpdate']),
    ...mapActions([
      'openAlertBox'
    ]),
    ...mapMutations('crud', ['resetItem']),
    setFields () {
      const result = this.detailsFields.map((field) => {
        const rField = field
        let show = true
        if (this.details.action === 'create') {
          show = field.create !== false
        } else if (this.details.action === 'multiedit') {
          show = field.multiedit !== false
        }
        rField.show = show
        rField.value = this.details.item[field.column]
        if (typeof rField.value !== 'undefined') {
          if (field.type === 'select') {
            const defaultVal = field.list.default || 1
            rField.value = field.stringId ? this.details.item[field.column] : parseInt(this.details.item[field.column]) || defaultVal
          } else if (field.type === 'datePicker') {
            rField.value = this.details.item[field.column].substring(0, 10)
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
      this.$set(this.fields[this.fields.findIndex(el => el.column === fieldColumn)], 'value', val)
    },
    close () {
      this.details.show = false
    },
    update () {
      this.updateItem([
        this.details.id,
        this.itemData,
        this.$t('global.alerts.updated'),
        this.$t('global.alerts.updateError')
      ]).then((response) => {
        this.close()
      })
    },
    store () {
      this.storeItem([
        this.itemData,
        this.$t('global.alerts.stored'),
        this.$t('global.alerts.storeError')
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
          request: keyValuePairs
        },
        this.$t('global.alerts.updated'),
        this.$t('global.alerts.updateError')
      ])
    }
  }
}
</script>

<style scoped>
.details-list {
  max-height: 60vh;
  overflow-y: auto;
}
</style>
