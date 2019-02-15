<template>
  <v-dialog persistent v-model="details.show" max-width="480">
    <v-card>
      <v-card-title class="headline">{{ $t('global.details.title') }}</v-card-title>
      <v-form v-model="details.formValid">
        <v-card-text>

          <div v-for="(field, i) in fields" :key="i">

            <!-- input -->
            <v-text-field :rules="fieldRules(field)" hide-details v-if="field.type == 'input'" :label="field.text"
              v-model="field.value"></v-text-field>

            <!-- number -->
            <v-text-field hide-details v-else-if="field.type == 'number'" :label="field.text" v-model="field.value" type="number" step="1" min="0"></v-text-field>

            <!-- decimal -->
            <v-text-field :rules="fieldRules(field)" hide-details v-else-if="field.type == 'decimal'" :label="field.text" v-model="field.value" type="number" step="0.01" min="0"></v-text-field>

            <!--date -->
            <v-text-field :rules="fieldRules(field)" hide-details v-else-if="field.type == 'date'" :label="field.text" v-model="field.value" mask="####-##-##" return-masked-value></v-text-field>

            <!--time -->
            <v-text-field :rules="fieldRules(field)" hide-details  v-else-if="field.type == 'time'" :label="field.text" v-model="field.value" mask="##:##" return-masked-value></v-text-field>

            <!--datetime -->
            <v-text-field :rules="fieldRules(field)" hide-details v-else-if="field.type == 'datetime'" :label="field.text" v-model="field.value" mask="####-##-## ##:##:##" return-masked-value></v-text-field>

            <!-- text area -->
            <v-textarea :rules="fieldRules(field)" hide-details v-else-if="field.type == 'textarea'" :label="field.text"
              v-model="field.value"></v-textarea>

            <!-- select -->
            <template v-else-if="field.type == 'select'">
              <v-autocomplete v-if="field.async"
                hide-details
                :rules="fieldRules(field)"
                :loading="searchLoading['search_' + field.name]"
                :items="searchData['search_' + field.name]"
                v-model="field.value"
                :search-input.sync="searchPhrases['search_' + field.name]"
                flat
                :item-text="field.list.text"
                :item-value="field.list.value"
                item-disabled="itemDisabled"
                :label="field.text"
                menu-props="bottom"
               
              ></v-autocomplete>
              <v-autocomplete v-else
                hide-details
                :rules="fieldRules(field)"
                :items="field.list.data"
                v-model="field.value"
                :item-text="field.list.text"
                :item-value="field.list.value"
                item-disabled="itemDisabled"
                :label="field.text"
                menu-props="bottom"
               
              ></v-autocomplete>
            </template>
            
            <span v-else-if="field.type == 'checkbox'">
              <input :rules="fieldRules(field)" type="checkbox" color="blue" :label="field.text" v-model="field.value">
              <label class="checkbox-label">{{field.text}}</label>
            </span>


          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" flat="flat" @click.native="close()">{{ $t('global.details.buttons.close') }}</v-btn>
          <v-btn :disabled="!details.formValid" v-if="details.action == 'create'" color="green" flat="flat" @click="store()">{{ $t('global.details.buttons.create') }}</v-btn>
          <v-btn :disabled="!details.formValid" v-else-if="details.action == 'edit'" color="blue" flat="flat" @click="update()">{{ $t('global.details.buttons.modify') }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import Vue from "vue";
import { fieldModifiers } from "@/config/field-modifiers.js";
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
          let defaultVal = field.list.default || 1
          rField.value = field.stringId
            ? this.details.item[field.column]
            : parseInt(this.details.item[field.column]) || defaultVal;
        }
        if (field.apiObject){
          if (field.apiObject.useFunctionsInDetails){
            let functions = field.apiObject.functions || []
            let availableFunctions = fieldModifiers

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
        input: [v => !!v || self.$t("global.details.rules.required")],
        required: v => !!v || self.$t("global.details.rules.required")
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
    fieldRules(field) {
      let rules = []
      let required = field.required != undefined ? field.required : true;
      rules.push(this.rules.required)
      return rules
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
};
</script>
<style scoped>
.checkbox-label {
  padding-left: 5px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 16px;
}
</style>
