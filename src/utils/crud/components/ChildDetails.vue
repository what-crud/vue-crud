<template>
  <v-dialog persistent v-model="details.show" max-width="480">
    <v-card>
      <v-card-title class="headline">{{ $t('global.details.title') }}</v-card-title>
      <v-form v-model="details.formValid">
        <v-card-text>

          <div v-for="(field, i) in fields" :key="i">

            <!-- text field: input / number / decimal / date / time / datetime -->
            <v-text-field
              hide-details
              :rules="fieldRules(field)"
              v-if="['input', 'number', 'decimal', 'date', 'time', 'datetime'].includes(field.type)"
              :label="field.text"
              v-model="field.value"
              :disabled="field.disabled"
              :type="['number', 'decimal'].includes(field.type) ? 'number' : 'text'"
              :step="field.type == 'decimal' ? 0.01 : 1"
              min="0"
              :mask="['date', 'time', 'datetime'].includes(field.type) ? masks[field.type] : undefined"
              :return-masked-value="['date', 'time', 'datetime'].includes(field.type) ? true : false"
            ></v-text-field>

            <!-- text area -->
            <v-textarea
              hide-details
              :rules="fieldRules(field)"
              v-else-if="field.type == 'textarea'"
              :label="field.text"
              v-model="field.value"
              :disabled="field.disabled"
            ></v-textarea>

            <!-- file upload -->
            <div v-else-if="field.type == 'file'" class="file-container">
              <div class="field-label">{{ field.text }}</div>
              <v-btn dark class="jbtn-file" :loading="uploadLoaders[field.name]" :class="fileUploadBtn(uploadStatuses[field.name])">
                {{ $t('global.details.files.upload') }}
                <v-icon dark right>
                  {{ fileUploadIcon(uploadStatuses[field.name]) }}
                </v-icon>
                <input
                  :id="field.name"
                  type="file"
                  @change="fileSelected($event, field)"
                  accept="*"
                  :multiple="false"
                  :disabled="field.disabled"
                  ref="fileInput"
                >
              </v-btn>
            </div>

            <!-- select -->
            <template v-else-if="field.type == 'select'">
              <v-autocomplete
                v-if="field.async"
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
                :disabled="field.disabled"
              ></v-autocomplete>
              <v-autocomplete
                v-else
                hide-details
                :rules="fieldRules(field)"
                :items="field.list.data"
                v-model="field.value"
                :item-text="field.list.text"
                :item-value="field.list.value"
                item-disabled="itemDisabled"
                :label="field.text"
                menu-props="bottom"
                :disabled="field.disabled"
              ></v-autocomplete>
            </template>

            <!-- date picker -->
            <v-menu
              v-else-if="field.type == 'datePicker'"
              lazy
              :close-on-content-click="true"
              v-model="field.show"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
              :return-value.sync="field.value"
              :disabled="field.disabled"
            >
              <v-text-field
                hide-details
                slot="activator"
                :label="field.text"
                v-model="field.value"
                prepend-icon="event"
                :disabled="field.disabled"
              ></v-text-field>
              <v-date-picker v-model="field.value" no-title scrollable></v-date-picker>
            </v-menu>

            <!-- rich text editor -->
            <template v-else-if="field.type == 'richTextBox'">
              <label>{{field.text}}</label>
              <vue-editor
                id="editor"
                v-model="field.value"
                :editorOptions="{bounds: '#editor'}"
                :disabled="field.disabled"
              ></vue-editor>
              <br>
            </template>

            <!-- checkbox -->        
            <v-checkbox v-else-if="field.type == 'checkbox'"
              hide-details
              color="primary"
              v-model="field.value"
              :label="field.text"
              :disabled="field.disabled"
            ></v-checkbox>

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
import { VueEditor } from "vue2-editor";
import { fieldModifiers } from "@/utils/crud/helpers/functions.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    VueEditor
  },
  props: {
    details: Object,
    fieldsInfo: Array,
  },
  data() {
    return {
      searchPhrases: {},
      searchLoading: {},
      searchData: {},
      masks: {
        date: '####-##-##',
        time: '##:##',
        datetime: '####-##-## ##:##:##'
      },
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
