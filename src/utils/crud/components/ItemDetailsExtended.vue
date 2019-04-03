<template>
  <v-card>
    <v-card-text dark class="secondary white--text">
      <h4 style="text-transform:uppercase;">{{ title }}</h4>
    </v-card-text>
    <v-card-text class="details-container">
      <v-layout row wrap>
        <v-flex class="field" :class="field.grid" v-for="(field, i) in fields" :key="i" pr-2>
          <!-- divider -->
          <h3 v-if="field.type == 'divider'" class="text-xs-center section-header">{{ field.text }}</h3>

          <!-- text field: input / number / decimal / date / time / datetime -->
          <v-text-field
            hide-details
            :rules="fieldRules(field)"
            v-if="['input', 'number', 'decimal', 'date', 'time', 'datetime'].includes(field.type)"
            :label="field.text"
            v-model="field.value"
            :disabled="field.disabled"
            :type="['number', 'decimal'].includes(field.type) ? 'number' : 'text'"
            :step="field.type == 'decimal' ? 0.01 : 1"
            min="0"
            :mask="['date', 'time', 'datetime'].includes(field.type) ? masks[field.type] : undefined"
            :return-masked-value="['date', 'time', 'datetime'].includes(field.type) ? true : false"
            @focus="remember(field)"
            @blur="update(field)"
          ></v-text-field>

          <!-- text area -->
          <v-textarea
            hide-details
            v-else-if="field.type == 'textarea'"
            :label="field.text"
            v-model="field.value"
            @focus="remember(field)"
            @blur="update(field)"
            :disabled="field.disabled"
          ></v-textarea>

          <!-- select -->
          <template v-else-if="field.type == 'select'">
            <v-autocomplete
              v-if="field.async"
              hide-details
              :loading="searchLoading['search_' + field.name]"
              :items="searchData['search_' + field.name]"
              v-model="field.value"
              :search-input.sync="searchPhrases['search_' + field.name]"
              flat
              :item-text="field.list.text"
              :item-value="field.list.value"
              item-disabled="itemDisabled"
              :label="field.text"
              menu-props="bottom"
              :disabled="field.disabled"
              @focus="remember(field)"
              @change="update(field)"
            ></v-autocomplete>
            <v-autocomplete
              v-else
              hide-details
              :items="field.list.data"
              v-model="field.value"
              :item-text="field.list.text"
              :item-value="field.list.value"
              item-disabled="itemDisabled"
              :label="field.text"
              menu-props="bottom"
              :disabled="field.disabled"
              @focus="remember(field)"
              @change="update(field)"
            ></v-autocomplete>
          </template>

          <!-- rich text editor -->
          <template v-else-if="field.type == 'richTextBox'">
            <label>{{field.text}}</label>
            <vue-editor
              id="editor"
              v-model="field.value"
              :editorOptions="{bounds: '#editor'}"
              :disabled="field.disabled"
              @focus="remember(field)"
              @blur="update(field)"
            ></vue-editor>
            <br>
          </template>

          <!-- checkbox -->
          <v-checkbox v-else-if="field.type == 'checkbox'"
            color="primary"
            v-model="field.value"
            :label="field.text"
            @focus="remember(field)"
            @change="update(field)"
          ></v-checkbox>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue'
import { VueEditor } from 'vue2-editor'
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  components: {
    VueEditor
  },
  name: 'item-details-extended',
  props: ['fieldsInfo', 'title'],
  data () {
    return {
      files: null,
      searchPhrases: {},
      searchLoading: {},
      searchData: {},
      masks: {
        date: '####-##-##',
        time: '##:##',
        datetime: '####-##-## ##:##:##'
      },
      reload: false,
      fields: []
    }
  },
  mounted () {
    this.setFields()
    for (const field of this.fields) {
      field.required = field.required !== false
      if (field.type === 'select') {
        const { url } = field
        if (field.async) {
          this.$set(this.searchPhrases, `search_${field.name}`, '')
          this.$set(this.searchLoading, `search_${field.name}`, false)
          this.$set(this.searchData, `search_${field.name}`, [])
          this.$set(field.list, 'oldSearch', '')
        } else {
          field.list.data = []
          let selectItems
          Vue.http.get(url).then((response) => {
            const items = response.body
            selectItems = items.map((item) => {
              const rItem = item
              if (typeof field.list.activeColumn !== 'undefined') {
                rItem.itemDisabled = item[field.list.activeColumn] === 0
              }
              if (typeof field.list.complexName !== 'undefined') {
                const textArray = field.list.complexName.map((textInfo) => {
                  const splittedText = textInfo
                    .split('.')
                    .reduce((object, property) => object[property] || '', item)
                  return splittedText
                })
                rItem.complexName = textArray.join(', ')
              }
              return rItem
            })
            if (!field.required) {
              const nullElement = {}
              nullElement[field.list.value] = ''
              nullElement[field.list.text] = '-'
              field.list.data = [nullElement, ...selectItems]
            } else {
              field.list.data = selectItems
            }
          })
        }
      }
    }
  },
  watch: {
    item: {
      handler (val) {
        this.setFields()
      },
      deep: true
    },
    detailsDialog: {
      handler (val) {
        if (val === true) {
          this.setFields()
          for (const field of this.fields) {
            if (field.type === 'select') {
              if (field.async) {
                field.list.oldSearch = ''
                let data
                const url = `${field.url}/id/${field.value}`
                Vue.http.get(url).then((response) => {
                  const items = response.body
                  if (typeof field.list.complexName !== 'undefined') {
                    data = items.map((item) => {
                      const rItem = item
                      const textArray = field.list.complexName.map((textInfo) => {
                        const splittedText = textInfo
                          .split('.')
                          .reduce((object, property) => object[property] || '', item)
                        return splittedText
                      })
                      rItem.complexName = textArray.join(', ')
                      return rItem
                    })
                  } else {
                    data = items
                  }
                  this.$set(this.searchData, `search_${field.name}`, data)
                })
              }
            }
          }
          val = false
        }
      },
      deep: true
    },
    searchPhrases: {
      handler (val) {
        setTimeout(() => {
          for (const field of this.fields) {
            if (field.type === 'select' && field.async) {
              const search = val[`search_${field.name}`]
              const newSearch = this.searchPhrases[`search_${field.name}`]
              if (
                search !== null &&
                search !== undefined &&
                search !== field.list.oldSearch &&
                search === newSearch
              ) {
                field.list.oldSearch = search
                let data
                const url = `${field.url}/phrase/${val[`search_${field.name}`]}`
                this.$set(this.searchLoading, `search_${field.name}`, true)
                Vue.http.get(url).then((response) => {
                  this.$set(this.searchLoading, `search_${field.name}`, false)
                  const items = response.body
                  if (typeof field.list.complexName !== 'undefined') {
                    data = items.map((item) => {
                      const rItem = item
                      const textArray = field.list.complexName.map((textInfo) => {
                        const splittedText = textInfo
                          .split('.')
                          .reduce((object, property) => object[property] || '', item)
                        return splittedText
                      })
                      rItem.complexName = textArray.join(', ')
                      return rItem
                    })
                  } else {
                    data = items
                  }
                  this.$set(this.searchData, `search_${field.name}`, data)
                })
              }
            }
          }
        }, 500)
      },
      deep: true
    }
  },
  computed: {
    ...mapState('crud', ['item', 'itemIdColumn', 'detailsDialog']),
    rules () {
      const self = this
      return {
        input: [v => !!v || self.$t('global.details.rules.required')],
        required: v => !!v || self.$t('global.details.rules.required')
      }
    }
  },
  methods: {
    ...mapActions('crud', ['updateItemDetail']),
    setFields () {
      const result = this.fieldsInfo.map((field) => {
        const rField = field
        rField.value = this.item[field.column]
        rField.oldValue = rField.value
        if (field.type === 'select') {
          const defaultVal = field.list.default || ''
          rField.value = (field.stringId
            ? this.item[field.column]
            : parseInt(this.item[field.column])) || defaultVal
        }
        if (field.type === 'checkbox') {
          rField.value = parseInt(this.item[field.column]) === 1
        }
        return rField
      })
      this.$set(this, 'fields', result)
    },
    update (field) {
      setTimeout(() => {
        if (field.value !== field.oldValue) {
          Vue.set(this.item, field.column, field.value)
          setTimeout(() => {
            const obj = {}
            obj[field.column] = field.value
            this.updateItemDetail([
              this.item[this.itemIdColumn],
              obj,
              this.$t('global.alerts.updated')
            ])
          }, 100)
        }
      }, 100)
    },
    fieldRules (field) {
      const rules = []
      const required = field.required !== undefined ? field.required : true
      if (required) {
        rules.push(this.rules.required)
      }
      return rules
    },
    remember (field) {
      field.oldValue = field.value
    }
  }
}
</script>
<style scoped>
.details-container {
  max-height: calc(100vh - 150px);
  overflow-y: auto;
}
.section-header {
  padding-top: 20px;
  padding-bottom: 10px;
}
.checkbox-label {
  padding-left: 5px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 16px;
}
.field {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
