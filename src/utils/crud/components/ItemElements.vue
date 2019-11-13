<template>
  <v-dialog
    v-model="itemElements.show"
    max-width="800"
    persistent
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
        v-model="selected"
        :options.sync="pagination"
        :headers="headers"
        :items="filteredItems"
        :no-results-text="$t('global.itemElements.noMatchingResults')"
        :no-data-text="$t('global.itemElements.noDataAvailable')"
        :footer-props="footerProps"
        :items-per-page="10"
        show-select
        multi-sort
        dense
      >
        <template
          v-for="(header, i) in headers"
          v-slot:[`item.${header.value}`]="{ item }"
        >
          <span :key="i">
            <!-- add/remove connection (if soft deletes are enabled) -->
            <template v-if="header.value === 'actions'">
              <crud-button
                v-if="item.added"
                small
                color="red"
                @clicked="remove(item.connectionId)"
                icon="delete"
                :tooltip="$t('global.itemElements.buttons.remove')"
              />
              <crud-button
                v-else
                small
                color="green"
                @clicked="add(item.id)"
                icon="add"
                :tooltip="$t('global.itemElements.buttons.add')"
              />
            </template>
            <span
              v-else-if="!['id', 'connectionId', 'filterStatus', 'added'].includes(header.value)"
              v-html="item[header.value]"
            />
            <template v-else-if="header.value === 'added'">
              <span hidden>{{ item[header.value] }}</span>
              <v-icon>{{ item[header.value] ? 'check' : 'clear' }}</v-icon>
            </template>
          </span>
        </template>
        <template
          slot="footer.page-text"
          slot-scope="{ pageStart, pageStop, itemsLength }"
        >
          <table-footer
            :pagination="pagination"
            :pageStart="pageStart"
            :pageStop="pageStop"
            :itemsLength="itemsLength"
            @setPage="setPage()"
          />
        </template>
      </v-data-table>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="black"
          text
          @click.native="close()"
        >
          {{ $t('global.itemElements.buttons.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import CrudButton from './Button.vue'
import TableFooter from '../components/TableFooter.vue'
import {
  mapState,
  mapActions,
} from 'vuex'

export default {
  components: {
    CrudButton,
    TableFooter,
  },
  props: ['details'],
  data () {
    return {
      selected: [],
      tmp: '',
      search: '',
      pagination: {
        sortBy: ['added'],
        sorDesc: [true],
      },
      selectedStatuses: [
        1,
        0,
      ],
    }
  },
  computed: {
    ...mapState('crud', ['itemElements']),
    statuses () {
      return [
        {
          text: this.$t('global.itemElements.status.added'),
          value: 1,
        },
        {
          text: this.$t('global.itemElements.status.noAdded'),
          value: 0,
        },
      ]
    },
    headers () {
      const { columns } = this.itemElements
      const headers = columns.map((column) => {
        const header = {}
        header.text = column.header
        header.value = column.name
        return header
      })
      const actionHeader = [
        {
          text: this.$t('global.itemElements.fields.action'),
          value: 'actions',
          sortable: false,
        },
      ]
      const addedHeader = [
        {
          text: this.$t('global.itemElements.fields.added'),
          value: 'added',
        },
      ]
      return [
        ...actionHeader,
        ...headers,
        ...addedHeader,
      ]
    },
    itemsPerPageOptions () {
      return [
        5,
        10,
        20,
        50,
        100,
      ]
    },
    footerProps () {
      return {
        showFirstLastPage: true,
        rowsPerPageText: this.$t('global.datatable.rowsPerPageText'),
        itemsPerPageOptions: this.itemsPerPageOptions,
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
            rItem.added = true
            rItem.filterStatus = 1
            rItem.connectionId = item[statusObject][0][connectionKeyName]
          } else {
            rItem.added = false
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
    },
  },
  methods: {
    ...mapActions('crud', [
      'addItemElement',
      'removeItemElement',
      'addManyItemElements',
      'removeManyItemElements',
    ]),
    add (foreignId) {
      const obj = {}
      obj[this.itemElements.primaryId] = this.itemElements.id
      obj[this.itemElements.foreignId] = foreignId
      this.addItemElement([
        obj,
        this.$t('global.alerts.added'),
        this.$t('global.alerts.addError'),
      ])
    },
    remove (id) {
      this.removeItemElement([
        id,
        this.$t('global.alerts.removed'),
        this.$t('global.alerts.removeError'),
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
          items: obj,
        },
        this.$t('global.alerts.added'),
        this.$t('global.alerts.addError'),
      ])
      this.clearSelected()
    },
    removeMany () {
      const obj = this.selected
        .filter(item => item.connectionId !== undefined)
        .map(item => item.connectionId)
      this.removeManyItemElements([
        {
          ids: obj,
        },
        this.$t('global.alerts.removed'),
        this.$t('global.alerts.removeError'),
      ])
      this.clearSelected()
    },
    close () {
      this.itemElements.show = false
      this.$parent.itemElementsClosed()
    },
    clearSelected () {
      this.selected = []
    },
    setPage (page) {
      this.pagination.page = parseInt(page)
    },
  },
}
</script>
<style scoped>
.item-elements-list {
  height: 400px;
  overflow-y: auto;
}
</style>
