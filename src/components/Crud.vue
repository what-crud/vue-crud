<template>
  <div>
    <div v-show="tableReady">
      <data-table
        :meta="meta"
        :customButtons="customButtons"
        :itemElements="itemElements"
        :softDeletes="softDeletes"
        :editButton="editButton"
        :fileMode="fileMode"
        :tableFields="tableFields"
      ></data-table>
      <item-details :title="detailsTitle" :detailsFields="detailsFields"></item-details>
      <item-elements></item-elements>
      <image-container></image-container>
    </div>
    <v-layout v-show="!tableReady" style="height:400px;max-height:70vh;" justify-center align-center>
      <v-progress-circular indeterminate v-bind:size="100" v-bind:width="5" :color="$store.state.secondaryColor"></v-progress-circular>
    </v-layout>
  </div>
</template>

<script>
  import DataTable from '@/components/DataTable.vue'
  import ItemDetails from '@/components/ItemDetails.vue'
  import ItemElements from '@/components/ItemElements.vue'
  import ImageContainer from '@/components/ImageContainer.vue'
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    components: {
      DataTable,
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
      softDeletes: {
        type: Boolean,
        default: true
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
      fileMode: {
        type: Boolean,
        default: false
      },
      watchForCreation: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {}
    },
    computed: {
      ...mapState('crud', [
        'tableReady',
      ]),
      tableFields () {
        return this.fieldsInfo.filter(field => field.table != false)
      },
      detailsFields () {
        return this.fieldsInfo.filter(field => field.details != false)
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
      ...mapMutations([
        'setPage',
      ]),
      ...mapMutations('crud', [
        'setPrefix',
        'setPath',
        'setCreationMode',
      ]),
      custom(name, item) {
        this.$parent[name](item)
      },
    },
  }

</script>
