<template>
  <div style="margin:20px;">
    <h1 style="text-align:center">CRUD confguration</h1>
    <v-layout row wrap>
      <v-flex xs12 md6 lg3 px-5>
        <v-text-field label="Details title" v-model="detailsTitle"></v-text-field>
        <v-select label="Delete mode" :items="['none', 'soft', 'hard', 'both', 'filter']"
          v-model="deleteMode"></v-select>
        <v-switch color="green" label="Refresh button" v-model="refreshButton"></v-switch>
      </v-flex>

      <v-flex xs12 md6 lg3 px-5>
        <v-switch color="green" label="Export button" v-model="exportButton"></v-switch>
        <v-switch color="green" label="Field filters" v-model="fieldFilters"></v-switch>
        <v-switch color="green" label="Main filter" v-model="mainFilter"></v-switch>
      </v-flex>

      <v-flex xs12 md6 lg3 px-5>
        <v-switch color="green" label="Create mode" v-model="createMode"></v-switch>
        <v-switch color="green" label="Edit mode" v-model="editMode"></v-switch>
        <v-switch color="green" label="Edit button" v-model="editButton"></v-switch>
      </v-flex>

      <v-flex xs12 md6 lg3 px-5>
        <v-switch color="green" label="Select many mode" v-model="selectManyMode"></v-switch>
        <v-switch color="green" label="Update many mode" v-model="updateManyMode"></v-switch>
        <v-switch color="green" label="Remove many mode" v-model="removeManyMode"></v-switch>
      </v-flex>
    </v-layout>
    <h1 style="text-align:center">CRUD</h1>
    <crud
      :prefix="prefix"
      :path="path"
      :page-title="pageTitle"
      :fields-info="fieldsInfo"
      :details-title="detailsTitle"
      :delete-mode="deleteMode"
      :refresh-button="refreshButton"
      :export-button="exportButton"
      :field-filters="fieldFilters"
      :main-filter="mainFilter"
      :create-mode="createMode"
      :edit-mode="editMode"
      :edit-button="editButton"
      :select-many-mode="selectManyMode"
      :update-many-mode="updateManyMode"
      :remove-many-mode="removeManyMode"
    >
    </crud>
    <alert-box></alert-box>
  </div>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'
import AlertBox from '@/utils/app/components/AlertBox.vue'

export default {
  data () {
    return {
      prefix: 'demo',
      path: 'tasks',
      pageTitle: 'demo.tasks',
      detailsTitle: '',
      deleteMode: 'soft',
      refreshButton: true,
      exportButton: true,
      fieldFilters: true,
      mainFilter: true,
      createMode: true,
      editMode: true,
      editButton: true,
      selectManyMode: true,
      updateManyMode: true,
      removeManyMode: true,
    }
  },
  created () {
    this.detailsTitle = this.$t('detailsTitle')
  },
  computed: {
    fieldsInfo () {
      return [
        {
          text: this.$t('fields.id'),
          name: 'id',
          details: false,
        },
        {
          type: 'input',
          column: 'name',
          text: this.$t('fields.name'),
          name: 'name',
          multiedit: false,
        },
        {
          type: 'textarea',
          column: 'description',
          text: this.$t('fields.description'),
          name: 'description',
          required: false,
        },
      ]
    },
  },
  components: {
    Crud,
    AlertBox,
  },
  i18n: {
    messages: {
      en: {
        detailsTitle: 'Task',
        fields: {
          id: 'Id',
          name: 'Name',
          description: 'Description',
        },
      },
    },
  },
}

</script>
