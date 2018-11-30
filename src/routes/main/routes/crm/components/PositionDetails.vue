<template>
  <v-dialog v-model="details.show" max-width="480">
    <v-card>
      <v-card-title class="headline">{{ $t('title') }}</v-card-title>
      <v-form v-model="details.formValid">
        <v-card-text>

          <div v-for="(field, i) in fields" :key="i">

            <!-- input -->
            <v-text-field required v-if="field.type == 'input'" :rules="field.required == false ? [] : rules.input" :label="field.text"
              v-model="field.value"></v-text-field>

            <!-- text area -->
            <v-text-field required v-else-if="field.type == 'textarea'" :rules="field.required == false ? [] : rules.input" :label="field.text"
              v-model="field.value" multi-line></v-text-field>

            <!-- select -->
            <v-select v-else-if="field.type == 'select'" required :rules="[]" :items="field.list.data" v-model="field.value" :item-text="field.list.text"
              :item-value="field.list.value" :label="field.text" bottom autocomplete></v-select>

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
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    props: [
      'details',
      'fieldsInfo',
    ],
    data() {
      return {}
    },
    created() {
      for (let field of this.fields) {
        if (field.type == 'select') {
          Vue.http.get(field.url)
            .then((response) => field.list.data = response.body)
        }
      }
    },
    computed: {
      fields() {
        let self = this
        let result = this.fieldsInfo.map(field => {
          let rField = field
          rField.value = this.details.item[field.column]
          if (field.type == 'select') {
            rField.value = parseInt(this.details.item[field.column]) || 1
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
      reset() {
        this.$parent.reset()
      },
      close() {
        this.$parent.close()
      },
      update() {
        this.$parent.update(this.details.id, this.itemData)
      },
      store() {
        this.$parent.store(this.itemData)
      },
    },
    i18n: {
      messages: {
        pl: {
          title: 'Stanowisko',
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
          alerts: {
            updated: 'Zaktualizowano',
            updateError: 'Błąd! Aktualizacja nie powiodła się',
            stored: 'Dodano',
            storeError: 'Błąd! Nie udało się dodać rekordu',
          },
          buttons: {
            create: 'Utwórz',
            modify: 'Modyfikuj',
            close: 'Zamknij',
          }
        },
        en: {
          title: 'Position',
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
          alerts: {
            updated: 'Updated',
            updateError: 'Error! Update unsuccessful',
            stored: 'Dodano',
            storeError: 'Error! Store unsuccessful',
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
