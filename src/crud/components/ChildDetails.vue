<template>
  <v-dialog persistent v-model="details.show" max-width="480">
    <v-card>
      <v-card-title class="headline">{{ $t('title') }}</v-card-title>
      <v-form v-model="details.formValid">
        <v-card-text>

          <div v-for="(field, i) in fields" :key="i">

            <!-- input -->
            <v-text-field :required="isRequired(field.required)" hide-details v-if="field.type == 'input'" :label="field.text"
              v-model="field.value"></v-text-field>

            <!-- number -->
            <v-text-field hide-details v-else-if="field.type == 'number'" :label="field.text" v-model="field.value" type="number" step="1" min="0"></v-text-field>

            <!-- decimal -->
            <v-text-field :required="isRequired(field.required)" hide-details v-else-if="field.type == 'decimal'" :label="field.text" v-model="field.value" type="number" step="0.01" min="0"></v-text-field>

            <!--date -->
            <v-text-field :required="isRequired(field.required)" hide-details v-else-if="field.type == 'date'" :label="field.text" v-model="field.value" mask="####-##-##" return-masked-value></v-text-field>

            <!--time -->
            <v-text-field :required="isRequired(field.required)" hide-details  v-else-if="field.type == 'time'" :label="field.text" v-model="field.value" mask="##:##" return-masked-value></v-text-field>

            <!--datetime -->
            <v-text-field :required="isRequired(field.required)" hide-details v-else-if="field.type == 'datetime'" :label="field.text" v-model="field.value" mask="####-##-## ##:##:##" return-masked-value></v-text-field>

            <!-- text area -->
            <v-text-field :required="isRequired(field.required)" hide-details v-else-if="field.type == 'textarea'" :label="field.text"
              v-model="field.value" multi-line></v-text-field>

            <!-- select -->
            <template v-else-if="field.type == 'select'">
              <v-select v-if="field.async"
                hide-details
                :required="isRequired(field.required)"
                :loading="searchLoading['search_' + field.name]"
                :items="searchData['search_' + field.name]"
                v-model="field.value"
                :search-input.sync="searchPhrases['search_' + field.name]"
                flat
                :item-text="field.list.text"
                :item-value="field.list.value"
                :label="field.text"
                bottom
                autocomplete
              ></v-select>
              <v-select v-else
                hide-details
                :required="isRequired(field.required)"
                :items="field.list.data"
                v-model="field.value"
                :item-text="field.list.text"
                :item-value="field.list.value"
                :label="field.text"
                bottom
                autocomplete
              ></v-select>
            </template>
            
            <span v-else-if="field.type == 'checkbox'">
              <input :required="isRequired(field.required)" type="checkbox" color="blue" :label="field.text" v-model="field.value">
              <label class="checkbox-label">{{field.text}}</label>
            </span>


          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" flat="flat" @click.native="close()">{{ $t('buttons.close') }}</v-btn>
          <v-btn :disabled="!details.formValid" v-if="details.action == 'create'" color="green" flat="flat" @click="store()">{{ $t('buttons.create') }}</v-btn>
          <v-btn :disabled="!details.formValid" v-else-if="details.action == 'edit'" color="blue" flat="flat" @click="update()">{{ $t('buttons.modify') }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import Vue from "vue";
import { functionsList } from "@/helpers/functions.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: {
    details: Object,
    fieldsInfo: Array,
  },
  data() {
    return {
      searchPhrases: {},
      searchLoading: {},
      searchData: {},
      customFilter(item, queryText, itemText) {
        const hasValue = val => (val != null ? val : "");
        const text = hasValue(item.name);
        const query = hasValue(queryText);
        return (
          text
            .toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase()) >= -1
        );
      }
    };
  },
  created() {
    for (let field of this.fields) {
      if (field.type == "select") {
        let url = field.url;
        if (field.async) {
          this.$set(this.searchPhrases, "search_" + field.name, "");
          this.$set(this.searchLoading, "search_" + field.name, false);
          this.$set(this.searchData, "search_" + field.name, [])
          this.$set(field.list, 'oldSearch', "")
        }
        else {
          Vue.http.get(url).then(response => {
            let items = response.body;
            if (typeof field.list.complexName != "undefined") {
              field.list.loading = false;
              field.list.data = items.map(item => {
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
              field.list.data = items;
            }
          });
        }
      }
    }
  },
  computed: {
    fields() {
      let filteredFields;
      filteredFields = this.fieldsInfo.filter(
        field => field.details != false && field.type != "divider"
      );
      let self = this;
      let result = filteredFields.map(field => {
        let rField = field;
        rField.value = this.details.item[field.column];
        if (field.type == "select") {
          rField.value = field.stringId
            ? this.details.item[field.column]
            : parseInt(this.details.item[field.column]) || 1;
        }
        if (field.apiObject){
          if (field.apiObject.useFunctionsInDetails){
            let functions = field.apiObject.functions || []
            let availableFunctions = functionsList

            for (let i = 0; i < functions.length; i++) {
              let functionName = functions[i]
              rField.value = availableFunctions[functionName](rField.value)
            }
          }
        }
        return rField;
      });
      return result;
    },
    itemData() {
      let self = this;
      let result = {};
      for (let field of this.fields) {
        result[field.column] = field.value ? field.value : null;
      }
      //result.files = self.files
      return result;
    },
    rules() {
      let self = this;
      return {
        input: [v => !!v || self.$t("rules.required")]
      };
    }
  },
  watch: {
    details: {
      handler(val) {
        if (val.show == true && val.action == 'edit') {
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
        }
      },
      deep: true
    },
    searchPhrases: {
      handler(val) {
        for (let field of this.fields) {
          if (field.type == "select") {
            if (field.async) {
              if (val["search_" + field.name] != undefined) {
                let url = field.url + "/phrase/" + val["search_" + field.name];
                this.$set(this.searchLoading, "search_" + field.name, true);
                Vue.http.get(url).then(response => {
                  this.$set(this.searchLoading, "search_" + field.name, false);
                  let items = response.body;
                  let data
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
        }
      },
      deep: true
    }
  },
  methods: {
    isRequired(required) {
      return required != undefined ? required : true;
    },
    reset() {
      this.$parent.reset();
    },
    close() {
      this.$parent.close();
    },
    update() {
      this.$parent.update(this.details.id, this.itemData);
    },
    store() {
      this.$parent.store(this.itemData);
    }
  },
  i18n: {
    messages: {
      pl: {
        title: "Szczegóły",
        rules: {
          required: "Pole jest wymagane",
          atLeast: "Pole musi mieć przynajmniej",
          less: "Pole musi mieć mniej niż",
          more: "Pole musi mieć więcej niż",
          characters: "znaków",
          emailMustBeValid: "E-mail musi mieć poprawny format",
          passwordMustDiffer: "Nowe hasło musi się różnić od poprzedniego",
          passwordMustBeSame: "Hasła nie mogą się różnić"
        },
        alerts: {
          updated: "Zaktualizowano",
          updateError: "Błąd! Aktualizacja nie powiodła się",
          stored: "Dodano",
          storeError: "Błąd! Nie udało się dodać rekordu"
        },
        buttons: {
          create: "Utwórz",
          modify: "Modyfikuj",
          close: "Zamknij"
        }
      },
      en: {
        title: "Details",
        rules: {
          required: "Field is required",
          atLeast: "Field must be at least",
          less: "Field must be less than",
          more: "Pole musi mieć more than",
          characters: "characters",
          emailMustBeValid: "E-mail must be valid",
          passwordMustDiffer:
            "New password must be different from the old password",
          passwordMustBeSame: "Password can't be different"
        },
        alerts: {
          updated: "Updated",
          updateError: "Error! Update unsuccessful",
          stored: "Dodano",
          storeError: "Error! Store unsuccessful"
        },
        buttons: {
          create: "Create",
          modify: "Modify",
          close: "Close"
        }
      }
    }
  }
};
</script>
<style scoped>
.checkbox-label {
  padding-left: 5px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 16px;
}
</style>
