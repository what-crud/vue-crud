<template>
  <v-layout row wrap>
    <v-flex :class="field.grid" v-for="(field, i) in fields" :key="i" pr-2>

      <!-- input -->
      <v-text-field v-if="field.type == 'input'" :label="field.text" v-model="field.value" @blur="update(field)"></v-text-field>

      <!-- text area -->
      <v-text-field v-else-if="field.type == 'textarea'" :label="field.text" v-model="field.value" multi-line @blur="update(field)"></v-text-field>

      <!-- select -->
      <v-select v-else-if="field.type == 'select'" :items="field.list.data" v-model="field.value" :item-text="field.list.text" :item-value="field.list.value"
        :label="field.text" bottom autocomplete @change="update(field)"></v-select>

      <!-- checkbox -->
      <v-checkbox color="blue" v-else-if="field.type == 'checkbox'" :label="field.text" v-model="field.value" @change="update(field)"></v-checkbox>
    </v-flex>
  </v-layout>
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
      'fieldsInfo',
    ],
    data() {
      return {
        files: null
      }
    },
    created() {
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
      fields() {
        return this.fieldsInfo
      }
    },
    methods: {
      update(field) {
        setTimeout(() => {
          this.$parent.update(field.column, field.value)
        }, 100)
      },
    },
  }

</script>
