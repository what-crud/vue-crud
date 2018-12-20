<template>
  <v-dialog persistent v-model="details.show" max-width="600" style="position:static !important;">
    <v-card>
      <v-card-title
        class="headline"
      >{{ details.action == 'multiedit' ? $t('multipleUpdateTitle') : title }}</v-card-title>
      <v-form v-model="details.formValid">
        <v-card-text class="details-list">
          <div
            v-for="(field, i) in fields"
            :key="i"
            v-if="field.multipleUpdate || details.action != 'multiedit'"
          >
            <v-layout row wrap>
              <v-flex class="sm1" v-if="details.action == 'multiedit'">
                <input type="checkbox" v-model="field.updateColumn">
              </v-flex>
              <v-flex :class="details.action == 'multiedit' ? 'sm11' : 'sm12'">
                <!-- input -->
                <v-text-field
                  hide-details
                  :required="isRequired(field.required)"
                  v-if="field.type == 'input'"
                  :label="field.text"
                  v-model="field.value"
                ></v-text-field>

                <!-- number -->
                <v-text-field
                  hide-details
                  :required="isRequired(field.required)"
                  v-else-if="field.type == 'number'"
                  :label="field.text"
                  v-model="field.value"
                  type="number"
                  step="1"
                  min="0"
                ></v-text-field>

                <!-- decimal -->
                <v-text-field
                  hide-details
                  :required="isRequired(field.required)"
                  v-else-if="field.type == 'decimal'"
                  :label="field.text"
                  v-model="field.value"
                  type="number"
                  step="0.01"
                  min="0"
                ></v-text-field>

                <!--date -->
                <v-text-field
                  hide-details
                  :required="isRequired(field.required)"
                  v-else-if="field.type == 'date'"
                  :label="field.text"
                  v-model="field.value"
                  mask="####-##-##"
                  return-masked-value
                ></v-text-field>

                <!--time -->
                <v-text-field
                  hide-details
                  :required="isRequired(field.required)"
                  v-else-if="field.type == 'time'"
                  :label="field.text"
                  v-model="field.value"
                  mask="##:##"
                  return-masked-value
                ></v-text-field>

                <!--datetime -->
                <v-text-field
                  hide-details
                  :required="isRequired(field.required)"
                  v-else-if="field.type == 'datetime'"
                  :label="field.text"
                  v-model="field.value"
                  mask="####-##-## ##:##:##"
                  return-masked-value
                ></v-text-field>

                <!-- text area -->
                <v-textarea
                  hide-details
                  :required="isRequired(field.required)"
                  v-else-if="field.type == 'textarea'"
                  :label="field.text"
                  v-model="field.value"
                ></v-textarea>

                <!-- file upload -->
                <template v-else-if="field.type == 'file'">
                  <v-btn dark class="blue jbtn-file">
                    {{ $t('upload') }}
                    <input
                      id="selectFile"
                      type="file"
                      @change="fileSelected"
                      accept="*"
                      :multiple="false"
                      :disabled="false"
                      ref="fileInput"
                    >
                  </v-btn>
                </template>

                <!-- select -->
                <template v-else-if="field.type == 'select'">
                  <v-autocomplete
                    v-if="field.async"
                    hide-details
                    :required="isRequired(field.required)"
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
                  <v-autocomplete
                    v-else
                    hide-details
                    :required="isRequired(field.required)"
                    :items="field.list.data"
                    v-model="field.value"
                    :item-text="field.list.text"
                    :item-value="field.list.value"
                    item-disabled="itemDisabled"
                    :label="field.text"
                    menu-props="bottom"
                   
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
                >
                  <v-text-field
                    hide-details
                    slot="activator"
                    :label="field.text"
                    v-model="field.value"
                    prepend-icon="event"
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
                  ></vue-editor>
                  <br>
                </template>

                <!-- checkbox -->
                <span v-else-if="field.type == 'checkbox'">
                  <input type="checkbox" color="blue" :label="field.text" v-model="field.value">
                  <label class="checkbox-label">{{field.text}}</label>
                </span>
              </v-flex>
            </v-layout>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" flat="flat" @click.native="close()">{{ $t('buttons.close') }}</v-btn>
          <v-btn
            :disabled="!details.formValid"
            v-if="details.action == 'create'"
            color="green"
            flat="flat"
            @click="store()"
          >{{ $t('buttons.create') }}</v-btn>
          <v-btn
            :disabled="!details.formValid"
            v-else-if="details.action == 'edit'"
            color="orange"
            flat="flat"
            @click="update()"
          >{{ $t('buttons.modify') }}</v-btn>
          <v-btn
            :disabled="!details.formValid"
            v-else-if="details.action == 'multiedit'"
            color="orange"
            flat="flat"
            @click="updateSelected()"
          >{{ $t('buttons.modifySelected') }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import Vue from "vue";
import { VueEditor } from "vue2-editor";
import { functionsList } from "@/helpers/functions.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    VueEditor
  },
  props: ["title", "detailsFields"],
  data() {
    return {
      upload: {
        active: false,
        data: {}
      },
      searchPhrases: {},
      searchLoading: {},
      searchData: {}
    };
  },
  created() {
    this.resetItem();
    this.upload.active = false;
    for (let field of this.fields) {
      field.required = field.required == false ? false : true;
      field.updateColumn = false;
      if (field.type == "select") {
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
    ...mapState("crud", ["details", "path", "prefix", "selectedIds"]),
    fields() {
      let self = this;
      let result = this.detailsFields.map(field => {
        let rField = field;
        rField.multipleUpdate =
          field.multipleUpdate != undefined ? field.multipleUpdate : true;
        rField.value = this.details.item[field.column];
        if (typeof rField.value != "undefined") {
          if (field.type == "select") {
            let defaultVal = field.list.default || 1
            rField.value = field.stringId
              ? this.details.item[field.column]
              : parseInt(this.details.item[field.column]) || defaultVal;
          } else if (field.type == "datePicker") {
            rField.value = this.details.item[field.column].substring(0, 10);
          } else if (field.type == "checkbox") {
            rField.value =
              this.details.item[field.column] == "1" ? true : false;
          }
          if (field.apiObject) {
            if (field.apiObject.useFunctionsInDetails) {
              let functions = field.apiObject.functions || [];
              let availableFunctions = functionsList;

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
      if (this.upload.active) {
        for (let key in this.upload.data) {
          result[key] = this.upload.data[key];
        }
      }
      return result;
    },
    rules() {
      let self = this;
      return {
        input: [v => !!v || self.$t("rules.required")]
      };
    }
  },
  methods: {
    ...mapActions("crud", ["updateItem", "storeItem", "mulitipleItemsUpdate"]),
    ...mapMutations("crud", ["resetItem"]),
    close() {
      this.details.show = false;
    },
    isRequired(required) {
      if (this.details.action == "multiedit") {
        return false;
      } else {
        return required != undefined ? required : true;
      }
    },
    update() {
      this.close();
      this.updateItem([
        this.details.id,
        this.itemData,
        this.$t("global.alerts.updated"),
        this.$t("global.alerts.updateError")
      ]);
    },
    store() {
      this.close();
      this.storeItem([
        this.itemData,
        this.$t("global.alerts.stored"),
        this.$t("global.alerts.storeError")
      ]);
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
        this.$t("global.alerts.suspended"),
        this.$t("global.alerts.suspendError")
      ]);
    },
    fileSelected(e) {
      let file = e.target.files[0];
      if (file) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("module", this.prefix);
        formData.append("folder", this.path);
        this.$http.post("files/file-upload", formData, {}).then(response => {
          this.upload = {
            active: true,
            data: {
              filename: file.name,
              mime: file.type,
              size: file.size,
              path: response.body,
              uploaded: 1
            }
          };
        });
      }
    }
  },
  i18n: {
    messages: {
      pl: {
        multipleUpdateTitle: "Aktualizacja wielu rekordów",
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
        buttons: {
          create: "Utwórz",
          modify: "Modyfikuj",
          modifySelected: "Modyfikuj wybrane rekordy",
          close: "Zamknij"
        },
        upload: "Wgraj plik"
      },
      en: {
        multipleUpdateTitle: "Multiple records update",
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
        buttons: {
          create: "Create",
          modify: "Modify",
          modifySelected: "Modify selected records",
          close: "Close"
        },
        upload: "Upload file"
      }
    }
  }
};
</script>

<style scoped>
.jbtn-file {
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
