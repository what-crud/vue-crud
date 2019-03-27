<template>
  <v-dialog v-model="tasks.show" max-width="600">
    <v-card>
      <v-card-title class="headline">{{ tasks.title }}</v-card-title>

      <v-card-title>

        <!-- add/remove connection -->
        <template>
          <v-tooltip top>
            <v-btn class="white--text" fab small color="red" @click="removeMany()" slot="activator">
              <v-icon>undo</v-icon>
            </v-btn>
            <span>{{ $t('buttons.removeMany') }}</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn class="white--text" fab small color="green" @click="addMany()" slot="activator">
              <v-icon>redo</v-icon>
            </v-btn>
            <span>{{ $t('buttons.addMany') }}</span>
          </v-tooltip>
        </template>

        <!-- Search in table -->
        <v-spacer></v-spacer>
        <v-text-field append-icon="search" :label="$t('search')" single-line hide-details v-model="search"></v-text-field>
      </v-card-title>
      <!-- Table -->
      <v-data-table v-model="selected" :pagination.sync="pagination" select-all :rows-per-page-items="[10, 25, { text: $t('all'), value: -1 }]"
        light :headers="headers" :items="items" :search="search" :no-results-text="$t('noMatchingResults')" :no-data-text="$t('noDataAvailable')"
        :rows-per-page-text="$t('rowsPerPageText')">
        <template slot="items" slot-scope="props">
          <td>
            <v-checkbox hide-details v-model="props.selected"></v-checkbox>
          </td>
          <!-- action buttons -->
          <td class="text-xs-center">
            <!-- add/remove connection (if soft deletes are enabled) -->
            <template>
              <v-tooltip top v-if="props.item.added == '<span hidden>1</span>Tak'">
                <v-btn fab small class="xs white--text" color="red" @click="remove(props.item.connectionId)" slot="activator">
                  <v-icon>undo</v-icon>
                </v-btn>
                <span>{{ $t('buttons.remove') }}</span>
              </v-tooltip>
              <v-tooltip top v-else>
                <v-btn fab small class="xs white--text" color="green" @click="add(props.item.id)" slot="activator">
                  <v-icon>redo</v-icon>
                </v-btn>
                <span>{{ $t('buttons.add') }}</span>
              </v-tooltip>
            </template>
          </td>
          <!-- table fields -->
          <template v-for="(field, key) in props.item">
            <td v-if="!['id', 'connectionId'].includes(key)" :key="key" class="text-xs-center" v-html="field"></td>
          </template>
        </template>
        <template slot="pageText" slot-scope="{ pageStart, pageStop, itemsLength }">
          {{ $t('records') }} {{ pageStart }} - {{ pageStop }} {{ $t('from') }} {{ itemsLength }}
        </template>
      </v-data-table>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black" flat="flat" @click.native="close()">{{ $t('buttons.close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  props: [
  ],
  data () {
    return {
      selected: [],
      tmp: '',
      search: '',
      pagination: {
        sortBy: 'added',
        descending: true
      }
    }
  },
  computed: {
    ...mapState('crm', [
      'tasks'
    ]),
    headers () {
      return [
        {
          text: this.$t('fields.action'),
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('fields.task'),
          align: 'center',
          value: 'task'
        },
        {
          text: this.$t('fields.added'),
          value: 'added'
        }
      ]
    },
    items () {
      let items = this.tasks.data.map(item => {
        let rItem = {}
        rItem.id = item.id
        rItem.task = item.name
        if (typeof item.task_positions !== 'undefined') {
          if (item.task_positions.length > 0) {
            rItem.added = '<span hidden>1</span>Tak'
            rItem.connectionId = item.task_positions[0].id
          } else {
            rItem.added = '<span hidden>0</span>Nie'
          }
        }
        return rItem
      })
      return items
    }
  },
  methods: {
    ...mapActions('crm', [
      'addPositionTask',
      'removePositionTask',
      'addManyPositionTasks',
      'removeManyPositionTasks'
    ]),
    add (taskId) {
      let obj = {
        'position_id': this.tasks.positionId,
        'task_id': taskId
      }
      this.addPositionTask([
        this.tasks.positionId,
        obj,
        this.$t('global.alerts.added')
      ])
    },
    remove (id) {
      this.removePositionTask([
        id,
        this.tasks.positionId,
        this.$t('global.alerts.removed')
      ])
    },
    addMany () {
      let obj = this.selected.filter(item => item.connectionId === undefined).map(item => {
        let rItem = {
          'position_id': this.tasks.positionId,
          'task_id': item.id
        }
        return rItem
      })
      this.addManyPositionTasks([
        {
          items: obj
        },
        this.$t('global.alerts.added'),
        this.$t('global.alerts.addError')
      ])
      this.clearSelected()
    },
    removeMany () {
      let obj = this.selected.filter(item => item.connectionId !== undefined).map(item => item.connectionId)
      this.removeManyPositionTasks([
        {
          ids: obj
        },
        this.$t('global.alerts.added'),
        this.$t('global.alerts.addError')
      ])
      this.clearSelected()
    },
    close () {
      this.tasks.show = false
    },
    clearSelected () {
      this.selected = []
    }
  },
  i18n: {
    messages: {
      pl: {
        noItemsSelected: 'Nie wybrano żadnego elementu',
        confirm: 'Czy na pewno chcesz to zrobić?',
        fields: {
          action: 'Akcja',
          name: 'Nazwa',
          task: 'Zadanie',
          added: 'Dodano'
        },
        search: 'Szukaj',
        noMatchingResults: 'Nie znaleziono pasujących rekordów',
        noDataAvailable: 'Brak danych',
        rowsPerPageText: 'Rekordów na stronę:',
        records: 'Rekordy',
        from: 'z',
        add: 'Dodaj',
        all: 'Wszystko',
        buttons: {
          remove: 'Usuń',
          add: 'Dodaj',
          removeMany: 'Usuń wiele',
          addMany: 'Dodaj wiele',
          close: 'Zamknij'
        }
      },
      en: {
        noItemsSelected: 'No items selected',
        confirm: 'Are you sure?',
        fields: {
          action: 'Action',
          name: 'Name',
          task: 'Task',
          added: 'Added'
        },
        search: 'Search',
        noMatchingResults: 'No matching records found',
        noDataAvailable: 'No data available',
        rowsPerPageText: 'Rows per page:',
        records: 'Records',
        from: 'from',
        add: 'Add',
        all: 'All',
        buttons: {
          remove: 'Dalete',
          add: 'Add',
          removeMany: 'Delete many',
          addMany: 'Add many',
          close: 'Close'
        }
      }
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
