<template>
  <div style="position:relative;">
    <div>
      <component
        :is="componentLoader"
        :meta="meta"
        :customButtons="customButtons"
        :itemElements="itemElements"
        :deleteMode="deleteMode"
        :editButton="editButton"
        :tableFields="tableFields"
        :primaryKey="primaryKey"
        :activeColumnName="activeColumnName"
        :creator="creator"
        :editor="editor"
      ></component>
      <item-details :title="detailsTitle" :detailsFields="detailsFields"></item-details>
      <item-elements></item-elements>
      <image-container></image-container>
    </div>
    <div class="details-loader-container">
      <v-layout v-if="detailsLoading" class="details-loader" justify-center align-center>
        <v-progress-circular indeterminate :size="100" :width="3" color="primary"></v-progress-circular>
      </v-layout>
    </div>
  </div>
</template>

<script>

import ItemDetails from '../components/ItemDetails.vue'
import ItemElements from '../components/ItemElements.vue'
import ImageContainer from '../components/ImageContainer.vue'
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'

export default {
  components: {
    ItemDetails,
    ItemElements,
    ImageContainer
  },
  props: {
    prefix: String,
    path: String,
    fieldsInfo: Array,
    detailsTitle: String,
    pageTitle: String,
    editButton: {
      type: Boolean,
      default: true
    },
    deleteMode: {
      type: String,
      validator: function (value) {
        return ['none', 'soft', 'hard', 'both', 'filter'].indexOf(value) !== -1
      },
      default: 'soft'
    },
    customHeaderButtons: {
      type: Array,
      default: () => []
    },
    customButtons: {
      type: Array,
      default: () => []
    },
    meta: {
      type: Array,
      default: () => []
    },
    itemElements: {
      type: Object,
      default: () => {}
    },
    watchForCreation: {
      type: Boolean,
      default: false
    },
    primaryKey: {
      type: String,
      default: 'id'
    },
    activeColumnName: {
      type: String,
      default: 'active'
    },
    mode: {
      type: String,
      validator: function (value) {
        return ['ClientSide', 'ServerSide'].indexOf(value) !== -1
      },
      default: 'ClientSide'
    },
    creator: {
      type: Boolean,
      default: true
    },
    editor: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('crud', [
      'detailsLoading'
    ]),
    tableFields() {
      return this.fieldsInfo.filter(field => field.table != false && field.type != 'divider')
    },
    detailsFields() {
      return this.fieldsInfo.filter(field => field.details != false && field.type != 'divider')
    },
    componentLoader () { 
      return () => import('./DataTable' + this.mode + '.vue')
    }
  },
  created() {
    this.setPrefix(this.prefix)
    this.setPath(this.path)
    this.setPage(this.pageTitle)
    let creationMode = this.watchForCreation ? 'inform' : 'ignore'
    this.setCreationMode(creationMode)
  },
  methods: {
    ...mapMutations('app', [
      'setPage',
    ]),
    ...mapMutations("crud", [
      "refreshTable",
      'setPrefix',
      'setPath',
      'setCreationMode',
    ]),
    custom(name, item, index) {
      this.$parent[name](item, index)
    },
    itemElementsClosed(){
      this.refreshTable()
    }
  },
}

</script>

<style scoped>
  .details-loader-container {
    position: absolute;
    top:200px;
    text-align: center;
    width: 100%;
  }
  .details-loader {
    height:100px !important;
    width:100px;
    background-color:rgba(255, 255, 255, 0.6);
    border-radius:100%;
    display: inline-block;
  }
</style>