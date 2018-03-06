<template>
  <v-card>
    <v-card-title>

      <!-- Dialog for creating item -->
      <v-tooltip top>
        <v-btn fab small dark color="green" @click="create()" slot="activator">
          <v-icon>add</v-icon>
        </v-btn>
        <span>{{ $t('add') }}</span>
      </v-tooltip>
      <!-- suspend/restore record (if soft deletes are enabled) -->
      <template v-if="softDeletes">
        <v-tooltip top>
          <v-btn outline fab small color="red" @click="suspendMany" slot="activator">
            <v-icon>undo</v-icon>
          </v-btn>
          <span>{{ $t('buttons.suspendMany') }}</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn outline fab small color="green" @click="restoreMany" slot="activator">
            <v-icon>redo</v-icon>
          </v-btn>
          <span>{{ $t('buttons.restoreMany') }}</span>
        </v-tooltip>
      </template>
      <!-- hard delete -->
      <v-tooltip top v-else>
        <v-btn outline fab small color="red" @click="destroyMany" slot="activator">
          <v-icon>close</v-icon>
        </v-btn>
        <span>{{ $t('buttons.deleteMany') }}</span>
      </v-tooltip>

      <!-- Search in table -->
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" :label="$t('search')" single-line hide-details v-model="search"></v-text-field>

      <!-- Select statuses (active/inactive) -->
      <template v-if="softDeletes">
        <v-spacer></v-spacer>
        <v-select :label="$t('status.title')" v-bind:items="statuses" v-model="selectedStatuses" single-line item-text="text" item-value="value"
          multiple chips></v-select>
      </template>
    </v-card-title>
    <!-- Table -->
    <v-data-table
      class="datatable"
      :disable-initial-sort="true"
      :must-sort="true"
      v-model="selected"
      select-all
      :rows-per-page-items="[10, 25, { text: $t('all'), value: -1 }]"
      light
      :headers="headers"
      :items="filteredItems"
      :search="search"
      :no-results-text="$t('noMatchingResults')"
      :no-data-text="$t('noDataAvailable')"
      :rows-per-page-text="$t('rowsPerPageText')"
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox
            hide-details
            v-model="props.selected"
          ></v-checkbox>
        </td>
        <!-- action buttons -->
        <td>
          <!-- edit record -->
          <v-tooltip top v-if="editButton">
            <v-btn outline fab small class="xs" color="orange" @click="edit(props.item.id)" slot="activator">
              <v-icon>edit</v-icon>
            </v-btn>
            <span>{{ $t('buttons.edit') }}</span>
          </v-tooltip>
          <!-- custom buttons -->
          <v-tooltip top v-for="(customButton) in customButtons" :key="customButton.name">
            <v-btn outline fab small class="xs" :color="customButton.color" @click="custom(customButton.name, props.item)" slot="activator">
              <v-icon>{{ customButton.icon }}</v-icon>
            </v-btn>
            <span>{{ customButton.text }}</span>
          </v-tooltip>
          <!-- buttons for open modal with item elements -->
          <v-tooltip top v-for="(button, key) in itemElements" :key="key">
            <v-btn outline fab small class="xs" :color="button.color" @click="editItemElements(key, props.item.id)" slot="activator">
              <v-icon>{{ button.icon }}</v-icon>
            </v-btn>
            <span>{{ button.buttonText }}</span>
          </v-tooltip>
          <!-- suspend/restore record (if soft deletes are enabled) -->
          <template v-if="softDeletes">
            <v-tooltip top v-if="props.item.meta.active == '1'">
              <v-btn outline fab small class="xs" color="red" @click="suspend(props.item.id)" slot="activator">
                <v-icon>undo</v-icon>
              </v-btn>
              <span>{{ $t('buttons.suspend') }}</span>
            </v-tooltip>
            <v-tooltip top v-else>
              <v-btn outline fab small class="xs" color="green" @click="restore(props.item.id)" slot="activator">
                <v-icon>redo</v-icon>
              </v-btn>
              <span>{{ $t('buttons.restore') }}</span>
            </v-tooltip>
          </template>
          <!-- hard delete -->
          <v-tooltip top v-else>
            <v-btn outline fab small class="xs" color="red" @click="destroy(props.item.id)" slot="activator">
              <v-icon>close</v-icon>
            </v-btn>
            <span>{{ $t('buttons.delete') }}</span>
          </v-tooltip>
          <!-- file mode -->
          <template v-if="fileMode">
            <v-tooltip top>
              <v-btn outline fab small class="xs" color="blue" @click="download(props.item)" slot="activator">
                <v-icon>file_download</v-icon>
              </v-btn>
              <span>{{ $t('buttons.download') }}</span>
            </v-tooltip>
            <v-tooltip top v-if="isImage(props.item.type)">
              <v-btn outline fab small class="xs" color="blue" @click="showImage(props.item)" slot="activator">
                <v-icon>search</v-icon>
              </v-btn>
              <span>{{ $t('buttons.show') }}</span>
            </v-tooltip>
          </template>
        </td>
        <!-- table fields -->
        <td v-if="key != 'meta'" v-for="(field, key) in props.item" class="text-xs-center" v-html="field"></td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop, itemsLength }">
          {{ $t('records') }} {{ pageStart }} - {{ pageStop }} {{ $t('from') }} {{ itemsLength }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
  import {
    download
  } from '@/helpers/functions.js'

  export default {
    props: [
      'tableFields',
      'softDeletes',
      'customButtons',
      'itemElements',
      'editButton',
      'fileMode',
      'meta',
    ],
    data() {
      return {
        selected: [],
        tmp: '',
        search: '',
        pagination: {},
        selectedStatuses: [1],
      }
    },
    computed: {
      ...mapState([
        'filesPath'
      ]),
      ...mapState('crud', [
        'prefix',
        'path',
      ]),
      ...mapGetters('crud', [
        'itemsList',
      ]),
      selectedIds() {
        return this.selected.map(item => item.id)
      },
      headers() {
        let actionHeader = [{
          text: this.$t('fields.action'),
          align: 'center',
          sortable: false,
        }]
        let headers = this.tableFields.map(field => {
          let header = {}
          header.align = 'center'
          header.text = field.text
          header.value = field.name
          if (field.sortable != undefined){
            header.sortable = field.sortable
          }
          return header
        })
        return [...actionHeader,...headers]
      },
      items() {
        return this.itemsList(this.tableFields, this.meta)
      },
      statuses() {
        return [{
            text: this.$t('status.active'),
            value: 1
          },
          {
            text: this.$t('status.inactive'),
            value: 0
          },
        ]
      },
      filteredItems() {
        return this.softDeletes ? this.items.filter(item => this.selectedStatuses.includes(parseInt(item.meta.active))) :
          this.items
      },
    },
    created() {
      this.resetItems()
      this.getItems()
    },
    methods: {
      ...mapMutations([
        'alertError'
      ]),
      ...mapMutations('crud', [
        'resetItems',
        'resetItem',
        'editItemDialog',
        'createItemDialog',
        'setItemElementsInfo',
        'editItemElementsDialog',
        'openImageContainer'
      ]),
      ...mapActions('crud', [
        'getItems',
        'getItem',
        'updateItem',
        'storeItem',
        'deleteItem',
        'getItemElements',
        'mulitipleItemsUpdate',
        'mulitipleItemsDelete'
      ]),
      edit (id) {
        this.getItem([id])
        this.editItemDialog(id)
      },
      create () {
        this.resetItem()
        this.createItemDialog()
      },
      suspend (id) {
        this.updateItem([
          id,
          {active: 0},
          this.$t('global.alerts.suspended'),
          this.$t('global.alerts.suspendError')
        ])
      },
      restore (id) {
        this.updateItem([
          id,
          {active: 1},
          this.$t('global.alerts.restored'),
          this.$t('global.alerts.restoreError')
        ])
      },
      destroy (id) {
        this.deleteItem([
          id,
          this.$t('global.alerts.deleted'),
          this.$t('global.alerts.deleteError')
        ])
      },
      checkSelected () {
        if(this.selected.length == 0){
          this.alertError(this.$t('noItemsSelected'))
          return false
        }
        else {
          if (confirm(this.$t('confirm'))) {
            return true
          } else {
            return false
          }
        }
      },
      suspendMany () {
        if(this.checkSelected()){
          this.mulitipleItemsUpdate([
            {
              ids: this.selectedIds,
              request: {active: 0}
            },
            this.$t('global.alerts.suspended'),
            this.$t('global.alerts.suspendError')
          ])
        }
      },
      restoreMany () {
        if(this.checkSelected()){
          this.mulitipleItemsUpdate([
            {
              ids: this.selectedIds,
              request: {active: 1}
            },
            this.$t('global.alerts.restored'),
            this.$t('global.alerts.restoreError')
          ])
        }
      },
      destroyMany () {
        if(this.checkSelected()){
          this.mulitipleItemsDelete([
            {
              ids: this.selectedIds,
            },
            this.$t('global.alerts.deleted'),
            this.$t('global.alerts.deleteError')
          ])
        }
      },
      custom (name, item) {
        this.$parent.custom(name, item)
      },
      editItemElements (name, id) {
        let obj = this.itemElements[name]
        this.setItemElementsInfo([
          id,
          obj
        ])
        this.getItemElements()
      },
      download (item) {
        download(this.filesPath + item.meta.path, item.filename)
      },
      isImage (mime) {
        let supportedMimeTypes = ['image/jpeg', 'image/png']
        return supportedMimeTypes.includes(mime)
      },
      showImage(image) {
        this.openImageContainer(image)
      },
    },
    i18n: {
      messages: {
        pl: {
          noItemsSelected: 'Nie wybrano żadnego elementu',
          confirm: 'Czy na pewno chcesz to zrobić?',
          fields: {
            action: 'Akcja',
          },
          status: {
            title: "Statusy",
            active: "Aktywne",
            inactive: "Nieaktywne",
          },
          search: "Szukaj",
          noMatchingResults: "Nie znaleziono pasujących rekordów",
          noDataAvailable: "Brak danych",
          rowsPerPageText: "Rekordów na stronę:",
          records: "Rekordy",
          from: "z",
          add: "Dodaj",
          all: "Wszystko",
          buttons: {
            edit: 'Edytuj',
            suspend: 'Zawieś',
            restore: 'Przywróć',
            delete: 'Usuń',
            suspendMany: 'Zawieś wiele',
            restoreMany: 'Przywróć wiele',
            deleteMany: 'Usuń wiele',
            download: 'Pobierz',
            show: 'Pokaż',
          },
        },
        en: {
          noItemsSelected: 'No items selected',
          confirm: 'Are you sure?',
          fields: {
            action: 'Action',
          },
          status: {
            title: "Statuses",
            active: "Active",
            inactive: "Inactive",
          },
          search: "Search",
          noMatchingResults: "No matching records found",
          noDataAvailable: "No data available",
          rowsPerPageText: "Rows per page:",
          records: "Records",
          from: "from",
          add: "Add",
          all: "All",
          buttons: {
            edit: 'Edit',
            suspend: 'Suspend',
            restore: 'Restore',
            delete: 'Delete',
            suspendMany: 'Suspend many',
            restoreMany: 'Restore many',
            deleteMany: 'Delete many',
            download: 'Download',
            show: 'Show',
          },
        }
      }
    },
  }

</script>
