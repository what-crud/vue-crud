<template>
  <v-dialog v-model="detailsDialog" fullscreen transition="dialog-bottom-transition" :overlay=true>
    <v-card class="dialog-content">
      <v-toolbar dark class="primary">
        <v-layout row wrap justify-center align-center>
          <v-flex class="xs4 text-xs-left">
            <v-toolbar-title>{{ title }}</v-toolbar-title>
          </v-flex>
          <v-flex class="xs4 text-xs-center">
            <div class="details-loader-container">
              <v-layout v-if="detailsLoading" class="details-loader" justify-center align-center>
                <v-progress-circular indeterminate :size="50" :width="2" color="white"></v-progress-circular>
              </v-layout>
            </div>
          </v-flex>
          <v-flex class="xs4 text-xs-right">
            <v-btn icon dark @click.native="refresh()">
              <v-icon>refresh</v-icon>
            </v-btn>
            <v-btn icon dark @click.native="previous()">
              <v-icon>navigate_before</v-icon>
            </v-btn>
            <v-btn icon dark @click.native="next()">
              <v-icon>navigate_next</v-icon>
            </v-btn>
            <v-btn icon @click.native="close()" dark>
              <v-icon>close</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-toolbar>
      <div grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 lg5 pa-3>
            <item-details-extended :title="basicInformation" :fieldsInfo="fields"></item-details-extended>
          </v-flex>
          <v-flex xs12 lg7 pa-3>
            <v-card class="children-tabs">
              <v-tabs color="secondary" dark slider-color="primary">
                <slot></slot>
              </v-tabs>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
  import ItemDetailsExtended from '@/crud/components/ItemDetailsExtended.vue'

  export default {
    name: 'item-details',
    components: {
      ItemDetailsExtended
    },
    props: [
      'fields',
      'basicInformation',
      'title'
    ],
    data() {
      return {}
    },
    computed: {
      ...mapState('crud', [
        'item',
        'itemIdColumn',
        'detailsLoading',
        'detailsDialog',
      ]),
    },
    methods: {
      ...mapActions('crud', [
        'getItems',
        "getItemDetails",
      ]),
      ...mapMutations('crud', [
        'hideItemDetailsDialog',
        'setIdColumn',
        'setChildItemsMapping',
        'moveItem',
        'setNextItem'
      ]),
      escapeHandler(event) {
        if (event.which == 27) {
          this.close()
        }
      },
      refresh() {
       this.getItemDetails([this.item[this.itemIdColumn]])
      },
      close() {
        this.hideItemDetailsDialog()
      },
      previous() {
        this.moveItem(['previous', true])
      },
      next() {
        this.moveItem(['next', true])
      }
    },
  }

</script>
<style scoped>
  .dialog-content {
    background-color: #f2f2f2;
  }
</style>
