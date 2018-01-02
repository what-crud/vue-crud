<template>
  <v-card>
    <v-card-title>
      <v-btn @click="$emit('update:add', true)" flat outline color="green">
        <v-icon>add</v-icon>
        {{ $t('add') }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" :label="$t('search')" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :no-results-text="$t('noMatchingResults')"
      :no-data-text="$t('noDataAvailable')"
      :rows-per-page-text="$t('rowsPerPageText')"
    >
      <template slot="items" slot-scope="props">
        <td v-for="field in props.item" class="text-xs-center">
          {{ field }}
        </td>
        <td class="text-xs-center">
          <v-btn outline fab small color="orange">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn outline fab small color="red">
            <v-icon>delete</v-icon>
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
      'add'
    ],
    data() {
      return {
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
      }
    },
    i18n: {
      messages:{
        pl: {
          search: "Szukaj",
          noMatchingResults: "Nie znaleziono pasujących rekordów",
          noDataAvailable: "Brak danych",
          rowsPerPageText: "Rekordów na stronę:",
          from: "od",
          to: "do",
          add: "Dodaj",
        },
        en: {
          search: "Search",
          noMatchingResults: "No matching records found",
          noDataAvailable: "No data available",
          rowsPerPageText: "Rows per page:",
          from: "from",
          to: "to",
          add: "Add",
        }
      }
    },
  }

</script>
