<template>
  <v-autocomplete
    v-model="selection"
    :rules="rules"
    :items="items"
    :loading="loading"
    :item-text="options.text"
    :item-value="options.value"
    :search-input.sync="search"
    :label="label"
    :disabled="disabled"
    menu-props="bottom"
    class="field--limited-width"
    item-disabled="itemDisabled"
    hide-details
    @change="onChange()"
  >
    <template
      v-if="listRefreshable"
      v-slot:append-outer
    >
      <v-icon
        color="blue"
        @click="refreshList(url)"
      >
        refresh
      </v-icon>
    </template>
  </v-autocomplete>
</template>

<script>

import Vue from 'vue'

export default {
  name: 'SelectField',
  data: () => ({
    selection: undefined,
    items: [],
    search: '',
    oldSearch: '',
    loading: false,
    searchActive: true,
  }),
  props: {
    value: {},
    rules: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
    },
    async: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
    },
  },
  computed: {
    listRefreshable () {
      return !this.async && this.url !== undefined
    },
  },
  methods: {
    onChange () {
      this.$emit('input', this.selection)
      this.$emit('change')
    },
    refreshList (url) {
      this.searchActive = false
      let selectItems
      this.loading = true
      const required = this.required !== undefined ? this.required : true
      Vue.http.get(url).then((response) => {
        const items = response.body
        selectItems = items.map((item) => {
          const rItem = item
          if (typeof this.options.activeColumn !== 'undefined') {
            rItem.itemDisabled = item[this.options.activeColumn] === 0
          }
          if (typeof this.options.complexName !== 'undefined') {
            const textArray = this.options.complexName.map((textInfo) => {
              const splittedText = textInfo.split('.').reduce((object, property) => object[property] || '', item)
              return splittedText
            })
            rItem.complexName = textArray.join(', ')
          }
          return rItem
        })
        if (!required) {
          const nullElement = {}
          nullElement[this.options.value] = ''
          nullElement[this.options.text] = '-'
          this.items = [
            nullElement,
            ...selectItems,
          ]
        } else {
          this.items = selectItems
        }
        this.loading = false
        this.searchActive = true
      })
    },
  },
  mounted () {
    if (!this.url) {
      this.items = this.options.data
    } else {
      this.items = []
      if (this.async) {
        this.loading = false
      } else {
        this.refreshList(this.url)
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.selection = val
      },
    },
    search: {
      handler (val) {
        setTimeout(() => {
          if (this.async && this.searchActive) {
            if (this.search === val) {
              const url = `${this.url}/phrase/${val}`
              this.refreshList(url)
            }
          }
        }, 500)
      },
    },
  },
}
</script>
