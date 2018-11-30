<template>
  <v-card>
    <v-card-title>

      <!-- Dialog for creating item -->
      <v-btn outline color="green" @click="create()">
        <v-icon>add</v-icon>
        {{ $t('add') }}
      </v-btn>

      <!-- Select statuses (active/inactive) -->
      <template>
        <v-spacer></v-spacer>
        <v-select :label="$t('status.title')" v-bind:items="statuses" v-model="selectedStatuses" single-line item-text="text" item-value="value"
          multiple chips></v-select>
      </template>

      <!-- Search in table -->
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" :label="$t('search')" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>

    <!-- Table -->
    <v-data-table :rows-per-page-items="[10, 25, { text: $t('all'), value: -1 }]" light :headers="finalHeaders" :items="filteredItems"
      :search="search" :no-results-text="$t('noMatchingResults')" :no-data-text="$t('noDataAvailable')" :rows-per-page-text="$t('rowsPerPageText')">
      <template slot="items" slot-scope="props">
        <!-- action buttons -->
        <td class="cell-nowrap">
          <!-- edit record -->
          <v-tooltip top>
            <v-btn outline fab small class="xs" color="orange" @click="edit(props.item.id)" slot="activator">
              <v-icon>edit</v-icon>
            </v-btn>
            <span>{{ $t('buttons.edit') }}</span>
          </v-tooltip>
          <!-- suspend/restore record (if soft deletes are enabled) -->
          <template>
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
          <!-- file mode -->
          <template>
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
        <td v-if="key != 'meta'" v-for="(field, key) in props.item" :key="key" class="text-xs-center">
          {{ field }}
        </td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        {{ $t('from') }} {{ pageStart }} {{ $t('to') }} {{ pageStop }}
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
      'headers',
      'itemElements',
      'editButton',
      'tableData',
    ],
    data() {
      return {
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
      finalHeaders() {
        let headers = this.headers.map(header => {
          header.align = 'center'
          return header
        })
        let actionHeader = [{
          text: this.$t('fields.action'),
          align: 'center',
          sortable: false,
        }]
        return [...actionHeader,...headers]
      },
      items() {
        return this.tableData
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
        return this.items.filter(item => this.selectedStatuses.includes(parseInt(item.meta.active)))
      },
    },
    methods: {
      ...mapActions('crm', [
        'getPositionTasks'
      ]),
      ...mapMutations('crm', [,
        'openImageContainer'
      ]),
      edit(id) {
        this.$parent.edit(id)
      },
      create() {
        this.$parent.create()
      },
      suspend(id) {
        this.$parent.suspend(id)
      },
      restore(id) {
        this.$parent.restore(id)
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
          from: "od",
          to: "do",
          add: "Dodaj",
          all: "Wszystko",
          buttons: {
            edit: 'Edytuj',
            suspend: 'Zawieś',
            restore: 'Przywróć',
            tasks: 'Zadania',
            download: 'Pobierz',
            show: 'Pokaż',
          },
          alerts: {
            suspended: 'Zawieszono',
            suspendError: 'Błąd! nie udało się zawiesić rekordu',
            restored: 'Przywrócono',
            restoreError: 'Błąd! Nie udało się przywrócić rekordu'
          }
        },
        en: {
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
          from: "from",
          to: "to",
          add: "Add",
          all: "All",
          buttons: {
            edit: 'Edit',
            suspend: 'Suspend',
            restore: 'Restore',
            tasks: 'Tasks',
            download: 'Download',
            show: 'Show',
          },
          alerts: {
            suspended: 'Suspended',
            suspendError: 'Error! Suspend unsuccessful',
            restored: 'Restored',
            restoreError: 'Error! Restore unsuccessful'
          }
        }
      }
    },
  }

</script>
<style scoped>
  .xs {
    width: 25px;
    height: 25px;
    margin: 3 !important;
  }

  .xs>div {
    /* height: 15px !important;
    line-height: 12px !important; */
    padding: 3px !important;
  }

  .xs>div>i {
    height: 12px !important;
    width: 12px !important;
    line-height: 12px;
  }

</style>
