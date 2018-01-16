<template>
  <v-card dark class="blue">
    <v-card-title>
      <v-btn color="green" @click="create()">
        <v-icon>add</v-icon>
        {{ $t('add') }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" :label="$t('search')" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table :rows-per-page-items="[10, 25, { text: $t('all'), value: -1 }]" light :headers="headers" :items="items" :search="search"
      :no-results-text="$t('noMatchingResults')" :no-data-text="$t('noDataAvailable')" :rows-per-page-text="$t('rowsPerPageText')">
      <template slot="items" slot-scope="props">
        <td v-if="key != 'active'" v-for="(field, key) in props.item" class="text-xs-center">
          {{ field }}
        </td>
        <td class="text-xs-center">
          <v-btn outline fab small color="orange" @click="edit(props.item.id)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn v-if="props.item.active == '1'" outline fab small color="red" @click="suspend(props.item.id)">
            <v-icon>delete</v-icon>
          </v-btn>
          <v-btn v-else outline fab small color="green" @click="restore(props.item.id)">
            <v-icon>restore</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        {{ $t('from') }} {{ pageStart }} {{ $t('to') }} {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    props: [
      'items',
      'headers',
      'details'
    ],
    data() {
      return {
        tmp: '',
        search: '',
        pagination: {},
      }
    },
    computed: {
    },
    methods: {
      edit: function (id) {
        this.$parent.editDialog(id)
      },
      create: function () {
        this.$parent.createDialog()
      },
      suspend: function (id) {
        this.$parent.suspend(id)
      },
      restore: function (id) {
        this.$parent.restore(id)
      }
    },
    i18n: {
      messages: {
        pl: {
          search: "Szukaj",
          noMatchingResults: "Nie znaleziono pasujących rekordów",
          noDataAvailable: "Brak danych",
          rowsPerPageText: "Rekordów na stronę:",
          from: "od",
          to: "do",
          add: "Dodaj",
          all: "Wszystko",
        },
        en: {
          search: "Search",
          noMatchingResults: "No matching records found",
          noDataAvailable: "No data available",
          rowsPerPageText: "Rows per page:",
          from: "from",
          to: "to",
          add: "Add",
          all: "All",
        }
      }
    },
  }

</script>
