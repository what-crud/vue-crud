<template>
  <div>
    <div v-show="tableReady">
      <data-table
        :headers="headers"
        :customButtons="customButtons"
        :itemElements="itemElements"
        :softDeletes="softDeletes"
        :editButton="editButton"
      ></data-table>
      <item-details :title="detailsTitle" :fieldsInfo="fieldsInfo"></item-details>
      <item-elements></item-elements>
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
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    props: {
      prefix: String,
      path: String,
      headers: Array,
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
      itemElements: {
        type: Object,
        default: () => {}
      },
    },
    data() {
      return {}
    },
    computed: {
      ...mapState('crud', [
        'tableReady',
      ]),
    },
    created() {
      this.setPrefix(this.prefix)
      this.setPath(this.path)
      this.setPage(this.pageTitle)
    },
    methods: {
      ...mapMutations([
        'setPage',
      ]),
      ...mapMutations('crud', [
        'setPrefix',
        'setPath',
      ]),
      custom(name, id) {
        this.$parent.custom(name, id)
      },
    },
    components: {
      DataTable,
      ItemDetails,
      ItemElements
    },
  }

</script>
