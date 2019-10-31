<template>
  <v-dialog
    persistent
    v-model="itemElements.show"
    max-width="800"
  >
    <v-card>
      <v-card-title class="headline">
        {{ itemElements.title }}
      </v-card-title>
      <v-card-title>

        <!-- add/remove connection -->
        <template>
          <crud-button
            large
            color="red"
            @clicked="removeMany()"
            icon="delete"
            :tooltip="$t('global.itemElements.buttons.removeMany')"
          />
          <crud-button
            large
            color="green"
            @clicked="addMany()"
            icon="add"
            :tooltip="$t('global.itemElements.buttons.addMany')"
          />
        </template>

        <v-spacer></v-spacer>

        <!-- Select statuses (added/no added) -->
        <template>
          <v-autocomplete
            v-model="selectedStatuses"
            :label="$t('global.itemElements.status.title')"
            :items="statuses"
            item-text="text"
            item-value="value"
            single-line
            multiple
            chips
          />
        </template>

        <v-spacer></v-spacer>

        <!-- Search in table -->
        <v-text-field
          v-model="search"
          :label="$t('global.itemElements.search')"
          append-icon="search"
          single-line
          hide-details
        />
      </v-card-title>
      <!-- Table -->
      <v-data-table
        :must-sort="true"
        v-model="selected"
        :pagination.sync="pagination"
        show-select
        light
        :headers="headers"
        :items="filteredItems"
        :no-results-text="$t('global.itemElements.noMatchingResults')"
        :no-data-text="$t('global.itemElements.noDataAvailable')"
        :footer-props="footerProps"
        :items-per-page="20"
      >
        <template slot="items" slot-scope="props">
          <td>
            <v-checkbox hide-details v-model="props.selected" color="black"></v-checkbox>
          </td>
          <!-- action buttons -->
          <td class="text-xs-center">
            <!-- add/remove connection (if soft deletes are enabled) -->
            <template>
              <v-tooltip top v-if="props.item.added == '<span hidden>1</span>Tak'">
                <v-btn fab small class="xs white--text" color="red" @click="remove(props.item.connectionId)" slot="activator">
                  <v-icon>delete</v-icon>
                </v-btn>
                <span>{{ $t('global.itemElements.buttons.remove') }}</span>
              </v-tooltip>
              <v-tooltip top v-else>
                <v-btn fab small class="xs white--text" color="green" @click="add(props.item.id)" slot="activator">
                  <v-icon>add</v-icon>
                </v-btn>
                <span>{{ $t('global.itemElements.buttons.add') }}</span>
              </v-tooltip>
            </template>
          </td>
          <!-- table fields -->
          <template v-for="(field, key) in props.item">
            <td v-if="!['id', 'connectionId', 'filterStatus'].includes(key)" class="text-xs-center" v-html="field" :key="key"></td>
          </template>
        </template>
        <template slot="pageText" slot-scope="{ pageStart, pageStop, itemsLength }">
          {{ $t('global.itemElements.records') }} {{ pageStart }} - {{ pageStop }} {{ $t('global.itemElements.from') }} {{ itemsLength }}
        </template>
      </v-data-table>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black" text @click.native="close()">{{ $t('global.itemElements.buttons.close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import CrudButton from './Button.vue'
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  components: {
    CrudButton
  },
  props: ['details'],
  data () {
    return {
      selected: [],
      tmp: '',
      search: '',
      pagination: {
        sortBy: 'added',
        descending: true
      },
      selectedStatuses: [1, 0]
    }
  },
  computed: {
    ...mapState('crud', ['itemElements']),
    statuses () {
      return [
        {
          text: this.$t('global.itemElements.status.added'),
          value: 1
        },
        {
          text: this.$t('global.itemElements.status.noAdded'),
          value: 0
        }
      ]
    },
    headers () {
      const { columns } = this.itemElements
      const headers = columns.map((column) => {
        const header = {}
        header.text = column.header
        header.align = 'center'
        header.value = column.name
        return header
      })
      const actionHeader = [
        {
          text: this.$t('global.itemElements.fields.action'),
          align: 'center',
          sortable: false
        }
      ]
      const addedHeader = [
        {
          text: this.$t('global.itemElements.fields.added'),
          value: 'added'
        }
      ]
      return [...actionHeader, ...headers, ...addedHeader]
    },
    itemsPerPageOptions () {
      return [
        5,
        10,
        20,
        50,
        100
      ]
    },
    footerProps () {
      return {
        showFirstLastPage: true,
        rowsPerPageText: this.$t('global.datatable.rowsPerPageText'),
        itemsPerPageOptions: this.itemsPerPageOptions
      }
    },
    items () {
      const statusObject = this.itemElements.itemObject
      const { columns } = this.itemElements
      const connectionKeyName = this.itemElements.connectionKeyName || 'id'
      const dictionaryKeyName = this.itemElements.dictionaryKeyName || 'id'
      const items = this.itemElements.data.map((item) => {
        const rItem = {}
        rItem.id = item[dictionaryKeyName]
        for (const column of columns) {
          const prop = column.obj.split('.').reduce((object, property) => object[property] || '', item)
          rItem[column.name] = prop
        }
        if (typeof item[statusObject] !== 'undefined') {
          if (item[statusObject].length > 0) {
            rItem.added = '<span hidden>1</span>Tak'
            rItem.filterStatus = 1
            rItem.connectionId = item[statusObject][0][connectionKeyName]
          } else {
            rItem.added = '<span hidden>0</span>Nie'
            rItem.filterStatus = 0
          }
        }
        return rItem
      })
      return items
    },
    filteredItems () {
      const items = this.items.filter(item => this.selectedStatuses.includes(item.filterStatus))
      const phrases = this.search === '' ? [] : this.search.toLowerCase().split(' ')
      const filteredItems = items.filter((item) => {
        let found = true
        for (let i = 0; i < phrases.length; i++) {
          found = false
          for (const key in item) {
            let field = item[key]
            if (
              typeof field === 'string' ||
              field instanceof String ||
              typeof field === 'number'
            ) {
              field = field.toString().toLowerCase()
              if (field.includes(phrases[i])) {
                found = true
              }
            }
          }
          if (!found) break
        }
        return found
      })
      return filteredItems
    }
  },
  methods: {
    ...mapActions('crud', [
      'addItemElement',
      'removeItemElement',
      'addManyItemElements',
      'removeManyItemElements'
    ]),
    add (foreignId) {
      const obj = {}
      obj[this.itemElements.primaryId] = this.itemElements.id
      obj[this.itemElements.foreignId] = foreignId
      this.addItemElement([
        obj,
        this.$t('global.alerts.added'),
        this.$t('global.alerts.addError')
      ])
    },
    remove (id) {
      this.removeItemElement([
        id,
        this.$t('global.alerts.removed'),
        this.$t('global.alerts.removeError')
      ])
    },
    addMany () {
      const obj = this.selected
        .filter(item => item.connectionId === undefined)
        .map((item) => {
          const rItem = {}
          rItem[this.itemElements.primaryId] = this.itemElements.id
          rItem[this.itemElements.foreignId] = item.id
          return rItem
        })
      this.addManyItemElements([
        {
          items: obj
        },
        this.$t('global.alerts.added'),
        this.$t('global.alerts.addError')
      ])
      this.clearSelected()
    },
    removeMany () {
      const obj = this.selected
        .filter(item => item.connectionId !== undefined)
        .map(item => item.connectionId)
      this.removeManyItemElements([
        {
          ids: obj
        },
        this.$t('global.alerts.removed'),
        this.$t('global.alerts.removeError')
      ])
      this.clearSelected()
    },
    close () {
      this.itemElements.show = false
      this.$parent.itemElementsClosed()
    },
    clearSelected () {
      this.selected = []
    }
  }
}
</script>
<style scoped>
.item-elements-list {
  height: 400px;
  overflow-y: auto;
}
</style>
