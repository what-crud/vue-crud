<template>
  <v-dialog v-model="detailsDialog" fullscreen transition="dialog-bottom-transition" :overlay=true>
    <v-card class="dialog-content">
      <v-toolbar style="flex: 0 0 auto;" dark :class="$store.state.primaryColor">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="close()" dark>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <div grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 lg5 pa-3>
            <item-details-extended :title="basicInformation" :fieldsInfo="fields"></item-details-extended>
          </v-flex>
          <v-flex xs12 lg7 pa-3>
            <v-card class="children-tabs">
              <v-tabs :color="$store.state.secondaryColor" dark :slider-color="$store.state.primaryColor">
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
        'detailsDialog',
      ]),
    },
    methods: {
      ...mapActions('crud', [
        'getItems'
      ]),
      ...mapMutations('crud', [
        'hideItemDetailsDialog',
        'setIdColumn',
        'setChildItemsMapping'
      ]),
      escapeHandler(event) {
        if (event.which == 27) {
          this.close()
        }
      },
      close() {
        this.hideItemDetailsDialog()
      }
    },
  }

</script>
<style scoped>
  .dialog-content {
    background-color: #f2f2f2;
  }
</style>
