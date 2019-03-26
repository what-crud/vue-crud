<template>
  <v-dialog persistent v-model="details.show" max-width="600" style="position:static !important;">
    <v-card>
      <v-card-title
        class="headline"
      >{{ details.action == 'multiedit' ? $t('global.details.multipleUpdateTitle') : title }}</v-card-title>
      <v-form v-model="details.formValid">
        <v-card-text class="details-list">
          <div
            v-for="(field, i) in fields"
            :key="i"
          >
            <v-layout row wrap>
              <v-flex class="sm1" v-if="details.action == 'multiedit'">
                <input type="checkbox" v-model="field.updateColumn">
              </v-flex>
              <v-flex :class="details.action == 'multiedit' ? 'sm11' : 'sm12'">

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

              </v-flex>
            </v-layout>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" flat="flat" @click.native="close()">{{ $t('global.details.buttons.close') }}</v-btn>
          <v-btn
            :disabled="!details.formValid"
            v-if="details.action == 'create'"
            color="green"
            flat="flat"
            @click="store()"
          >{{ $t('global.details.buttons.create') }}</v-btn>
          <v-btn
            :disabled="!details.formValid"
            v-else-if="details.action == 'edit'"
            color="orange"
            flat="flat"
            @click="update()"
          >{{ $t('global.details.buttons.modify') }}</v-btn>
          <v-btn
            :disabled="!details.formValid"
            v-else-if="details.action == 'multiedit'"
            color="orange"
            flat="flat"
            @click="updateSelected()"
          >{{ $t('global.details.buttons.modifySelected') }}</v-btn>
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
  props: ["title", "detailsFields"],
  data() {
    return {
      uploadStatuses: {},
      uploadLoaders: {},
      searchPhrases: {},
      searchLoading: {},
      searchData: {},
      masks: {
        date: '####-##-##',
        time: '##:##',
        datetime: '####-##-## ##:##:##'
      }
    };
  },
  created() {
    this.resetItem();
    for (let field of this.fields) {
      field.required = field.required == false ? false : true;
      field.updateColumn = false;
      if (field.type == "file") {
        this.$set(this.uploadLoaders, field.name, false);
        this.$set(this.uploadStatuses, field.name, 'ready');
      }
      else if (field.type == "select") {
        let url = field.url;
        if (field.async) {
          this.$set(this.searchPhrases, "search_" + field.name, "");
          this.$set(this.searchLoading, "search_" + field.name, false);
          this.$set(this.searchData, "search_" + field.name, []);
          this.$set(field.list, "oldSearch", "");
        } else {
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
    details: {
      handler(val) {
        if (val.show == true) {
          for (let field of this.fields) {
            if (field.type == "file") {
              this.$set(this.uploadLoaders, field.name, false);
              this.$set(this.uploadStatuses, field.name, 'ready');
            }
          }
        }
        if (val.show == true && val.action == "edit") {
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
    ...mapState('crud', ["uploadPath"]),
    ...mapState("crud", ["details", "path", "prefix", "selectedIds"]),
    fields() {
      let self = this
      let fields = this.detailsFields.filter(field => {
        let isIncluded = true
        if(this.details.action == 'create'){
          isIncluded = field.create == false ? false : true
        }
        else if (this.details.action == 'multiedit'){
          isIncluded = field.multiedit == false ? false : true
        }
        return isIncluded
      })
      let result = fields.map(field => {
        let rField = field;
        rField.value = this.details.item[field.column];
        if (typeof rField.value != "undefined") {
          if (field.type == "select") {
            let defaultVal = field.list.default || 1
            rField.value = field.stringId ? this.details.item[field.column] : parseInt(this.details.item[field.column]) || defaultVal;
          } else if (field.type == "datePicker") {
            rField.value = this.details.item[field.column].substring(0, 10);
          } else if (field.type == "checkbox") {
            rField.value =
              this.details.item[field.column] == "1" ? true : false;
          }
          if (field.apiObject) {
            if (field.apiObject.useFunctionsInDetails) {
              let functions = field.apiObject.functions || [];
              let availableFunctions = fieldModifiers;

              for (let i = 0; i < functions.length; i++) {
                let functionName = functions[i];
                rField.value = availableFunctions[functionName](rField.value);
              }
            }
          }
        } else {
          if (field.type == "checkbox") {
            rField.value = false;
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
      return result;
    },
    rules() {
      let self = this;
      return {
        required: v => !!v || self.$t("global.details.rules.required"),
        minLength: (v) => v.length >= 24 || 'Min ' + 24 + ' characters',
        maxLength: (v, val) => v.length <= val || 'Max ' + val + ' characters'
      };
    }
  },
  methods: {
    ...mapActions("crud", ["updateItem", "storeItem", "mulitipleItemsUpdate"]),
    ...mapMutations("crud", ["resetItem"]),
    ...mapMutations(["alertValidationError", "alertError"]),
    fileUploadBtn(status) {
      let btnClasses = {
        ready: 'primary',
        success: 'success',
        error: 'error'
      }
      return btnClasses[status]
    },
    fileUploadIcon(status) {
      let icons = {
        ready: 'save_alt',
        success: 'check',
        error: 'close'
      }
      return icons[status]
    },
    close() {
      this.details.show = false;
    },
    fieldRules(field) {
      let rules = []
      let required = field.required != undefined ? field.required : true;
      if (this.details.action != "multiedit"){
        if (required) {
          rules.push(this.rules.required)
        }
      }
      return rules
    },
    update() {
      this.updateItem([
        this.details.id,
        this.itemData,
        this.$t("global.alerts.updated"),
        this.$t("global.alerts.updateError")
      ]).then(response => {
        this.close();
      })
    },
    store() {
      this.storeItem([
        this.itemData,
        this.$t("global.alerts.stored"),
        this.$t("global.alerts.storeError")
      ]).then(response => {
        this.close();
      })
    },
    updateSelected() {
      let filteredFields = this.fields.filter(field => field.updateColumn);
      let keyValuePairs = {};
      for (let field of filteredFields) {
        keyValuePairs[field.column] = field.value;
      }
      this.mulitipleItemsUpdate([
        {
          ids: this.selectedIds,
          request: keyValuePairs
        },
        this.$t("global.alerts.updated"),
        this.$t("global.alerts.updateError")
      ]);
    },
    fileSelected(e, field) {
      let file = e.target.files[0];
      if (file) {
        this.$set(this.uploadLoaders, field.name, true);
        let formData = new FormData();
        formData.append("file", file);
        formData.append("module", this.prefix);
        formData.append("table", this.path);
        formData.append("field", field.column);
        this.$http.post(this.uploadPath, formData, {}).then(response => {
          if(response.body.status == 0){
            field.value = JSON.stringify({
              filename: file.name,
              mime: file.type,
              size: file.size,
              path: response.body.path,
              uploaded: 1
            })
            this.$set(this.uploadStatuses, field.name, 'success');
          }
          else {
            this.$set(this.uploadStatuses, field.name, 'error');
            if (response.body.status == -1) {
              this.alertError(response.body.msg)
            }
            else if (response.body.status == -2) {
              this.alertValidationError(response.body.msg)
            }
          }
          this.$set(this.uploadLoaders, field.name, false);
        }, error => {
          this.$set(this.uploadLoaders, field.name, false);
          this.$set(this.uploadStatuses, field.name, 'error');
        })
      }
    },
  },
};
</script>

<style scoped>
.field-label {
  font-size:12px;
  color:#777;
}
.file-container {
  margin-top:4px;
}
.jbtn-file {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 0px;
}
.jbtn-file input[type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  cursor: inherit;
  display: block;
}
.details-list {
  max-height: 60vh;
  overflow-y: auto;
}
.checkbox-label {
  padding-left: 5px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 16px;
}
</style>
