<template>
  <v-dialog persistent v-model="itemElements.show" max-width="800">
    <v-card>
      <v-card-title class="headline">{{ itemElements.title }}</v-card-title>
      <v-card-title>

        <!-- add/remove connection -->
        <template>
          <v-tooltip top>
            <v-btn class="white--text" fab small color="red" @click="removeMany()" slot="activator">
              <v-icon>delete</v-icon>
            </v-btn>
            <span>{{ $t('buttons.removeMany') }}</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn class="white--text" fab small color="green" @click="addMany()" slot="activator">
              <v-icon>add</v-icon>
            </v-btn>
            <span>{{ $t('buttons.addMany') }}</span>
          </v-tooltip>
        </template>

        <!-- Select statuses (added/no added) -->
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
      <v-data-table
        :disable-initial-sort="true"
        :must-sort="true"
        v-model="selected"
        :pagination.sync="pagination" 
        select-all="black"
        :rows-per-page-items="[10, 25, { text: $t('all'), value: -1 }]"
        light
        :headers="headers"
        :items="filteredItems"
        :no-results-text="$t('noMatchingResults')"
        :no-data-text="$t('noDataAvailable')"
        :rows-per-page-text="$t('rowsPerPageText')"
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
                <span>{{ $t('buttons.remove') }}</span>
              </v-tooltip>
              <v-tooltip top v-else>
                <v-btn fab small class="xs white--text" color="green" @click="add(props.item.id)" slot="activator">
                  <v-icon>add</v-icon>
                </v-btn>
                <span>{{ $t('buttons.add') }}</span>
              </v-tooltip>
            </template>
          </td>
          <!-- table fields -->
          <td v-if="!['id', 'connectionId', 'filterStatus'].includes(key)" v-for="(field, key) in props.item" class="text-xs-center" v-html="field" :key="key"></td>
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
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: ["details"],
  data() {
    return {
      selected: [],
      tmp: "",
      search: "",
      pagination: {
        sortBy: "added",
        descending: true
      },
      selectedStatuses: [1, 0]
    };
  },
  computed: {
    ...mapState("crud", ["itemElements"]),
    statuses() {
      return [
        {
          text: this.$t("status.added"),
          value: 1
        },
        {
          text: this.$t("status.noAdded"),
          value: 0
        }
      ];
    },
    headers() {
      let columns = this.itemElements.columns;
      let headers = columns.map(column => {
        let header = {};
        header.text = column.header;
        header.align = "center";
        header.value = column.name;
        return header;
      });
      let actionHeader = [
        {
          text: this.$t("fields.action"),
          align: "center",
          sortable: false
        }
      ];
      let addedHeader = [
        {
          text: this.$t("fields.added"),
          value: "added"
        }
      ];
      return [...actionHeader, ...headers, ...addedHeader];
    },
    items() {
      let statusObject = this.itemElements.itemObject;
      let columns = this.itemElements.columns;
      let items = this.itemElements.data.map(item => {
        let rItem = {};
        rItem.id = item.id;
        for (let column of columns) {
          let prop = column.obj.split(".").reduce(function(object, property) {
            return object[property] || "";
          }, item);
          rItem[column.name] = prop;
        }
        if (typeof item[statusObject] != "undefined") {
          if (item[statusObject].length > 0) {
            rItem.added = "<span hidden>1</span>Tak";
            rItem.filterStatus = 1;
            rItem.connectionId = item[statusObject][0].id;
          } else {
            rItem.added = "<span hidden>0</span>Nie";
            rItem.filterStatus = 0;
          }
        }
        return rItem;
      });
      return items;
    },
    filteredItems() {
      let items = this.items.filter(item =>
        this.selectedStatuses.includes(item.filterStatus)
      )
      let phrases = this.search == "" ? [] : this.search.toLowerCase().split(" ")
      let filteredItems = items.filter(item => {
        let found = true;
        for (let i = 0; i < phrases.length; i++) {
          found = false;
          for (let key in item) {
            let field = item[key];
            if (
              typeof field === "string" ||
              field instanceof String ||
              typeof field === "number"
            ) {
              field = field.toString().toLowerCase();
              if (field.includes(phrases[i])) {
                found = true;
              }
            }
          }
          if (!found) break;
        }
        return found
      })
      return filteredItems
    }
  },
  methods: {
    ...mapActions("crud", [
      "addItemElement",
      "removeItemElement",
      "addManyItemElements",
      "removeManyItemElements"
    ]),
    add(foreignId) {
      let obj = {};
      obj[this.itemElements.primaryId] = this.itemElements.id;
      obj[this.itemElements.foreignId] = foreignId;
      this.addItemElement([
        obj,
        this.$t("global.alerts.added"),
        this.$t("global.alerts.addError")
      ]);
    },
    remove(id) {
      this.removeItemElement([
        id,
        this.$t("global.alerts.removed"),
        this.$t("global.alerts.removeError")
      ]);
    },
    addMany() {
      let obj = this.selected
        .filter(item => item.connectionId == undefined)
        .map(item => {
          let rItem = {};
          rItem[this.itemElements.primaryId] = this.itemElements.id;
          rItem[this.itemElements.foreignId] = item.id;
          return rItem;
        });
      this.addManyItemElements([
        {
          items: obj
        },
        this.$t("global.alerts.added"),
        this.$t("global.alerts.addError")
      ]);
      this.clearSelected();
    },
    removeMany() {
      let obj = this.selected
        .filter(item => item.connectionId !== undefined)
        .map(item => item.connectionId);
      this.removeManyItemElements([
        {
          ids: obj
        },
        this.$t("global.alerts.added"),
        this.$t("global.alerts.addError")
      ]);
      this.clearSelected();
    },
    close() {
      this.itemElements.show = false;
      this.$parent.itemElementsClosed();
    },
    clearSelected() {
      this.selected = [];
    }
  },
  i18n: {
    messages: {
      pl: {
        available: "Dostępne",
        selected: "Wybrane",
        noItemsSelected: "Nie wybrano żadnego elementu",
        confirm: "Czy na pewno chcesz to zrobić?",
        fields: {
          action: "Akcja",
          name: "Nazwa",
          added: "Dodano"
        },
        status: {
          title: "Status",
          added: "Dodane",
          noAdded: "Nie dodane"
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
          remove: "Usuń",
          add: "Dodaj",
          removeMany: "Usuń wiele",
          addMany: "Dodaj wiele",
          close: "Zamknij"
        }
      },
      en: {
        available: "Available",
        selected: "Selected",
        noItemsSelected: "No items selected",
        confirm: "Are you sure?",
        fields: {
          action: "Action",
          name: "Name",
          added: "Added"
        },
        status: {
          title: "Status",
          added: "Added",
          noAdded: "No added"
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
          remove: "Dalete",
          add: "Add",
          removeMany: "Delete many",
          addMany: "Add many",
          close: "Close"
        }
      }
    }
  }
};
</script>
<style scoped>
.item-elements-list {
  height: 400px;
  overflow-y: auto;
}
</style>
