<template>
  <v-dialog v-model="details.show" max-width="600" style="position:static !important;">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-form v-model="details.formValid">
        <v-card-text>

          <div v-for="(field, i) in fields" :key="i">

            <!-- input -->
            <v-text-field required v-if="field.type == 'input'" :rules="field.required == false ? [] : rules.input" :label="field.text"
              v-model="field.value"></v-text-field>

            <!-- text area -->
            <v-text-field required v-else-if="field.type == 'textarea'" :rules="field.required == false ? [] : rules.input" :label="field.text"
              v-model="field.value" multi-line></v-text-field>

            <!-- file upload -->
            <template v-else-if="field.type == 'file'">
              <input type="file" accept="*" :multiple="false" :disabled="false" ref="fileInput" @change="onFileChange">
              </v-layout>
            </template>

            <!-- select -->
            <v-select required v-else-if="field.type == 'select'" :rules="[]" :items="field.list.data" v-model="field.value" :item-text="field.list.text"
              :item-value="field.list.value" :label="field.text" bottom autocomplete></v-select>

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
              <vue-editor id="editor" v-model="field.value" :editorOptions="{bounds: '#editor'}"></vue-editor>
              <br>
            </template>

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
  import Vue from 'vue'
  import {
    VueEditor
  } from 'vue2-editor'
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    components: {
      VueEditor
    },
    props: [
      'title',
      'fieldsInfo',
    ],
    data() {
      return {
        files: null
      }
    },
    created() {
      this.resetItem()
      for (let field of this.fields) {
        if (field.type == 'select') {
          Vue.http.get(field.url)
            .then((response) => {
              let items = response.body
              if (typeof field.list.complexName != 'undefined') {
                field.list.data = items.map(item => {
                  let rItem = item
                  let textArray = field.list.complexName.map(textInfo => {
                    let splittedText = textInfo.split('.')
                      .reduce(function (object, property) {
                        return object[property];
                      }, item);
                    return splittedText
                  })
                  rItem.complexName = textArray.join(', ')
                  return rItem
                })
              } else {
                field.list.data = items
              }
            })
        }
      }
    },
    computed: {
      ...mapState('crud', [
        'details',
      ]),
      fields() {
        let self = this
        let result = this.fieldsInfo.map(field => {
          let rField = field
          rField.value = this.details.item[field.column]
          if (typeof rField.value != 'undefined') {
            if (field.type == 'select') {
              rField.value = parseInt(this.details.item[field.column]) || 1
            } else if (field.type == 'datePicker') {
              rField.value = this.details.item[field.column].substring(0, 10)
            }
          }
          return rField
        })
        return result
      },
      itemData() {
        let self = this
        let result = {}
        for (let field of this.fields) {
          result[field.column] = field.value ? field.value : null
        }
        //result.files = self.files
        return result
      },
      rules() {
        let self = this
        return {
          input: [
            (v) => !!v || self.$t('rules.required'),
          ],
        }
      },
    },
    methods: {
      ...mapActions('crud', [
        'updateItem',
        'storeItem',
      ]),
      ...mapMutations('crud', [
        'resetItem',
      ]),
      close() {
        this.details.show = false
      },
      update() {
        this.close()
        this.updateItem([
          this.details.id,
          this.itemData,
          this.$t('global.alerts.updated'),
          this.$t('global.alerts.updateError')
        ])
      },
      store() {
        this.close()
        this.storeItem([
          this.itemData,
          this.$t('global.alerts.stored'),
          this.$t('global.alerts.storeError')
        ])
      },
      getFormData(files) {
        const forms = []
        for (const file of files) {
          const form = new FormData()
          form.append('data', file, file.name)
          forms.push(form)
        }
        return forms
      },
      onFocus() {
        if (!this.disabled) {
          this.$refs.fileInput.click()
        }
      },
      onFileChange($event) {
        const files = $event.target.files || $event.dataTransfer.files
        let filename
        if (files) {
          if (files.length > 0) {
            filename = [...files].map(file => file.name).join(', ')
          }
        } else {
          filename = $event.target.value.split('\\').pop()
        }
        this.name = filename
        this.files = this.getFormData(files)
      }
    },
    i18n: {
      messages: {
        pl: {
          rules: {
            required: 'Pole jest wymagane',
            atLeast: 'Pole musi mieć przynajmniej',
            less: 'Pole musi mieć mniej niż',
            more: 'Pole musi mieć więcej niż',
            characters: 'znaków',
            emailMustBeValid: 'E-mail musi mieć poprawny format',
            passwordMustDiffer: 'Nowe hasło musi się różnić od poprzedniego',
            passwordMustBeSame: 'Hasła nie mogą się różnić'
          },
          buttons: {
            create: 'Utwórz',
            modify: 'Modyfikuj',
            close: 'Zamknij',
          }
        },
        en: {
          rules: {
            required: 'Field is required',
            atLeast: 'Field must be at least',
            less: 'Field must be less than',
            more: 'Pole musi mieć more than',
            characters: 'characters',
            emailMustBeValid: 'E-mail must be valid',
            passwordMustDiffer: 'New password must be different from the old password',
            passwordMustBeSame: 'Password can\'t be different'
          },
          buttons: {
            create: 'Create',
            modify: 'Modify',
            close: 'Close',
          }
        },
      }
    }
  }

</script>
