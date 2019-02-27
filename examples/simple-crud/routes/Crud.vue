<template>
    <div style="margin:20px;">
      <h1 style="text-align:center">CRUD confguration</h1>
      <v-layout row wrap>
        <v-flex xs12 md6 lg3 px-5>
          <v-text-field label="detailsTitle" v-model="detailsTitle"></v-text-field>
          <v-select label="deleteMode" :items="['none', 'soft', 'hard', 'both', 'filter']" v-model="deleteMode"></v-select>
          <v-switch color="green" label="refreshButton" v-model="refreshButton"></v-switch>
        </v-flex>
  
        <v-flex xs12 md6 lg3 px-5>
          <v-switch color="green" label="exportButton" v-model="exportButton"></v-switch>
          <v-switch color="green" label="fieldFilters" v-model="fieldFilters"></v-switch>
          <v-switch color="green" label="mainFilter" v-model="mainFilter"></v-switch>
        </v-flex>
  
        <v-flex xs12 md6 lg3 px-5>
          <v-switch color="green" label="createMode" v-model="createMode"></v-switch>
          <v-switch color="green" label="editMode" v-model="editMode"></v-switch>
          <v-switch color="green" label="editButton" v-model="editButton"></v-switch>
        </v-flex>
  
        <v-flex xs12 md6 lg3 px-5>
          <v-switch color="green" label="selectManyMode" v-model="selectManyMode"></v-switch>
          <v-switch color="green" label="updateManyMode" v-model="updateManyMode"></v-switch>
          <v-switch color="green" label="removeManyMode" v-model="removeManyMode"></v-switch>
        </v-flex>
      </v-layout>
      <h1 style="text-align:center">CRUD</h1>
      <crud
        :prefix="prefix"
        :path="path"
        :pageTitle="pageTitle"
        :fieldsInfo="fieldsInfo"
        :detailsTitle="detailsTitle"
        :deleteMode="deleteMode"
        :refreshButton="refreshButton"
        :exportButton="exportButton"
        :fieldFilters="fieldFilters"
        :mainFilter="mainFilter"
        :createMode="createMode"
        :editMode="editMode"
        :editButton="editButton"
        :selectManyMode="selectManyMode"
        :updateManyMode="updateManyMode"
        :removeManyMode="removeManyMode"
      >
      </crud>
      <alert-box></alert-box>
    </div>
  </template>
  
  <script>
    import Crud from '@/utils/crud/components/Crud.vue'
    import AlertBox from "@/utils/app/components/AlertBox.vue";
  
    export default {
      data() {
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
      created() {
        this.detailsTitle = this.$t('detailsTitle')
      },
      computed: {
        fieldsInfo() {
          return [{
              text: this.$t('fields.id'),
              name: 'id',
              details: false,
            },
            {
              type: 'input',
              column: 'name',
              text: this.$t('fields.name'),
              name: 'name',
              multiedit: false
            },
            {
              type: 'input',
              column: 'description',
              text: this.$t('fields.description'),
              name: 'description',
              required: false
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
              description: 'Description'
            }
          }
        }
      },
    }
  </script>