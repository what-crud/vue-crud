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

          <!-- input -->
          <v-text-field
            hide-details
            v-if="field.type == 'input'"
            :label="field.text"
            v-model="field.value"
            @focus="remember(field)"
            @blur="update(field)"
            :disabled="field.disabled"
          ></v-text-field>

          <!-- decimal -->
          <v-text-field
            hide-details
            v-else-if="field.type == 'decimal'"
            :label="field.text"
            v-model="field.value"
            type="number"
            step="0.01"
            min="0"
            @focus="remember(field)"
            @blur="update(field)"
            :disabled="field.disabled"
          ></v-text-field>

          <!--date -->
          <v-text-field
            hide-details
            v-else-if="field.type == 'date'"
            :label="field.text"
            v-model="field.value"
            mask="####-##-##"
            return-masked-value
            @focus="remember(field)"
            @blur="update(field)"
            :disabled="field.disabled"
          ></v-text-field>

          <!-- text area -->
          <v-text-field
            hide-details
            v-else-if="field.type == 'textarea'"
            :label="field.text"
            v-model="field.value"
            multi-line
            @focus="remember(field)"
            @blur="update(field)"
            :disabled="field.disabled"
          ></v-text-field>

          <!-- select -->
          <template v-else-if="field.type == 'select'">
            <v-select
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
              bottom
              autocomplete
              @focus="remember(field)"
              @change="update(field)"
            ></v-select>
            <v-select
              v-else
              hide-details
              :items="field.list.data"
              v-model="field.value"
              :item-text="field.list.text"
              :item-value="field.list.value"
              item-disabled="itemDisabled"
              :label="field.text"
              bottom
              autocomplete
              @focus="remember(field)"
              @change="update(field)"
            ></v-select>
          </template>

          <!-- checkbox -->
          <span v-else-if="field.type == 'checkbox'">
            <input
              hide-details
              color="blue"
              type="checkbox"
              :label="field.text"
              v-model="field.value"
              @focus="remember(field)"
              @change="update(field)"
            >
            <label class="checkbox-label">{{field.text}}</label>
          </span>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "item-details-extended",
  props: ["fieldsInfo", "title"],
  data() {
    return {
      files: null,
      searchPhrases: {},
      searchLoading: {},
      searchData: {},
      reload: false
    };
  },
  created() {
    for (let field of this.fields) {
      field.required = field.required == false ? false : true;
      if (field.type == "select") {
        let url = field.url;
        if (field.async) {
          this.$set(this.searchPhrases, "search_" + field.name, "");
          this.$set(this.searchLoading, "search_" + field.name, false);
          this.$set(this.searchData, "search_" + field.name, []);
          this.$set(field.list, "oldSearch", "");
        }
        else {
          field.list.data = [];
          let selectItems;
          Vue.http.get(url).then(response => {
            let items = response.body;
            selectItems = items.map(item => {
              let rItem = item;
              if (typeof field.list.activeColumn != "undefined") {
                rItem.itemDisabled = item[field.list.activeColumn] == 0 ? true : false
              }
              if (typeof field.list.complexName != "undefined") {
                let textArray = field.list.complexName.map(textInfo => {
                  let splittedText = textInfo
                    .split(".")
                    .reduce(function(object, property) {
                      return object[property] || "";
                    }, item);
                  return splittedText;
                });
                rItem.complexName = textArray.join(", ");
              }
              return rItem;
            });
            if (!field.required) {
              let nullElement = {};
              nullElement[field.list.value] = "";
              nullElement[field.list.text] = "-";
              field.list.data = [nullElement, ...selectItems];
            } else {
              field.list.data = selectItems;
            }
          });
        }
      }
    }
  },
  watch: {
    detailsDialog: {
      handler(val) {
        if (val == true) {
          for (let field of this.fields) {
            if (field.type == "select") {
              if (field.async) {
                field.list.oldSearch = "";
                let data;
                let url = field.url + "/id/" + field.value;
                Vue.http.get(url).then(response => {
                  let items = response.body;
                  if (typeof field.list.complexName != "undefined") {
                    data = items.map(item => {
                      let rItem = item;
                      let textArray = field.list.complexName.map(textInfo => {
                        let splittedText = textInfo
                          .split(".")
                          .reduce(function(object, property) {
                            return object[property] || "";
                          }, item);
                        return splittedText;
                      });
                      rItem.complexName = textArray.join(", ");
                      return rItem;
                    });
                  } else {
                    data = items;
                  }
                  this.$set(this.searchData, "search_" + field.name, data);
                });
              }
            }
          }
          val = false;
        }
      },
      deep: true
    },
    searchPhrases: {
      handler(val) {
        setTimeout(() => {
          for (let field of this.fields) {
            if (field.type == "select" && field.async) {
              let search = val["search_" + field.name];
              let newSearch = this.searchPhrases["search_" + field.name];
              if (
                search != null &&
                search != undefined &&
                search != field.list.oldSearch &&
                search == newSearch
              ) {
                field.list.oldSearch = search;
                let data;
                let url = field.url + "/phrase/" + val["search_" + field.name];
                this.$set(this.searchLoading, "search_" + field.name, true);
                Vue.http.get(url).then(response => {
                  this.$set(this.searchLoading, "search_" + field.name, false);
                  let items = response.body;
                  if (typeof field.list.complexName != "undefined") {
                    data = items.map(item => {
                      let rItem = item;
                      let textArray = field.list.complexName.map(textInfo => {
                        let splittedText = textInfo
                          .split(".")
                          .reduce(function(object, property) {
                            return object[property] || "";
                          }, item);
                        return splittedText;
                      });
                      rItem.complexName = textArray.join(", ");
                      return rItem;
                    });
                  } else {
                    data = items;
                  }
                  this.$set(this.searchData, "search_" + field.name, data);
                });
              }
            }
          }
        }, 500);
      },
      deep: true
    }
  },
  computed: {
    ...mapState("crud", ["item", "itemIdColumn", "detailsDialog"]),
    fields() {
      let self = this;
      let result = this.fieldsInfo.map(field => {
        let rField = field;
        rField.value = this.item[field.column];
        rField.oldValue = rField.value;
        if (field.type == "select") {
          let defaultVal = field.list.default || ""
          rField.value =
            (field.stringId
              ? this.item[field.column]
              : parseInt(this.item[field.column])) || defaultVal;
        }
        if (field.type == "checkbox") {
          rField.value = this.item[field.column] == "1" ? true : false;
        }
        return rField;
      });
      return result;
    }
  },
  methods: {
    ...mapActions("crud", ["updateItemDetail"]),
    update(field) {
      setTimeout(() => {
        if (field.value != field.oldValue) {
          Vue.set(this.item, field.column, field.value);
          setTimeout(() => {
            let obj = {};
            obj[field.column] = field.value;
            this.updateItemDetail([
              this.item[this.itemIdColumn],
              obj,
              this.$t("global.alerts.updated")
            ]);
          }, 100);
        }
      }, 100);
    },
    remember(field) {
      field.oldValue = field.value;
    }
  }
};
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
