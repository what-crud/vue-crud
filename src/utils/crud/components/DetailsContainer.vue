<template>
  <v-layout row wrap>
    <v-flex :class="field.grid" v-for="(field, i) in fields" :key="i" pr-2>

      <!-- divider -->
      <h3 v-if="field.type == 'divider'" class="text-xs-center section-header">{{ field.text }}</h3>

      <!-- input -->
      <v-text-field v-if="field.type == 'input'" :label="field.text" v-model="field.value" @blur="update(field)" :disabled="field.disabled"></v-text-field>

      <!-- decimal -->
      <v-text-field v-else-if="field.type == 'decimal'" :label="field.text" v-model="field.value" type="number" step="0.01" min="0" @blur="update(field)" :disabled="field.disabled"></v-text-field>

      <!--date -->
      <v-text-field v-else-if="field.type == 'date'" :label="field.text" v-model="field.value" mask="####-##-##" @blur="update(field)" :disabled="field.disabled"></v-text-field>

      <!-- text area -->
      <v-textarea v-else-if="field.type == 'textarea'" :label="field.text" v-model="field.value" @blur="update(field)" :disabled="field.disabled"></v-textarea>

      <!-- select -->
      <v-autocomplete v-else-if="field.type == 'select'" :items="field.list.data" v-model="field.value" :item-text="field.list.text" :item-value="field.list.value"
        :label="field.text" menu-props="bottom" @change="update(field)"></v-autocomplete>

      <!-- checkbox -->
      <v-checkbox color="blue" v-else-if="field.type == 'checkbox'" :label="field.text" v-model="field.value" @change="update(field)"></v-checkbox>
    </v-flex>
  </v-layout>
</template>
<script>
import Vue from "vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: ["fieldsInfo"],
  data() {
    return {
      files: null
    };
  },
  created() {
    for (let field of this.fields) {
      field.required = field.required == false ? false : true
      if (field.type == "select") {
        Vue.http.get(field.url).then(response => {
          let items = response.body;
          field.list.data = [];
          let selectItems;
          if (typeof field.list.complexName != "undefined") {
            selectItems = items.map(item => {
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
            selectItems = items;
          }
          if (!field.required) {
            let nullElement = {};
            nullElement[field.list.value] = '';
            nullElement[field.list.text] = "----";
            field.list.data = [nullElement, ...selectItems];
          } else {
            field.list.data = selectItems;
          }
        });
      }
    }
  },
  computed: {
    fields() {
      return this.fieldsInfo;
    }
  },
  methods: {
    update(field) {
      setTimeout(() => {
        this.$parent.update(field.column, field.value);
      }, 100);
    }
  }
};
</script>
<style>
.section-header {
  padding-top: 20px;
  padding-bottom: 40px;
}
</style>
