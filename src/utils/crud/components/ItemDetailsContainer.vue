<template>
  <v-dialog
    v-model="detailsDialog"
    fullscreen
    transition="dialog-bottom-transition"
    hide-overlay
    persistent
    no-click-animation
  >
    <v-card>
      <v-toolbar dark color="primary" style="border-radius: 0;">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="details-loader-container">
          <v-layout v-if="detailsLoading" class="details-loader" justify-center align-center>
            <v-progress-circular indeterminate :size="50" :width="2" color="white"></v-progress-circular>
          </v-layout>
        </div>
        <v-spacer></v-spacer>
        <div>
          <template v-if="isItemsViewFlat">
            <v-btn icon dark @click.native="previous()">
              <v-icon>navigate_before</v-icon>
            </v-btn>
            <v-btn icon dark @click.native="next()">
              <v-icon>navigate_next</v-icon>
            </v-btn>
          </template>
          <v-btn icon dark @click.native="refresh()">
            <v-icon>refresh</v-icon>
          </v-btn>
          <v-btn icon @click.native="close()" dark>
            <v-icon>close</v-icon>
          </v-btn>
        </div>
      </v-toolbar>
      <v-row no-gutters>
        <v-col cols="12" lg="5" class="pa-3">
          <item-details-extended
            :title="basicInformation"
            :fields-info="fields"
          >
            <template
              v-for="field in fields"
              #[`field:${field.name}`]="{
                value,
                fieldType,
                field,
                reload,
                rules,
                changeValue,
              }"
            >
              <slot
                :name="`item-details-field:${field.name}`"
                :value="value"
                :field-type="fieldType"
                :field="field"
                :reload="reload"
                :rules="rules"
                :change-value="changeValue"
              />
            </template>
          </item-details-extended>
        </v-col>
        <v-col cols="12" lg="7" class="pa-3">
          <v-tabs slider-color="secondary">
            <slot></slot>
          </v-tabs>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex'
import ItemDetailsExtended from '@/utils/crud/components/ItemDetailsExtended.vue'

export default {
  name: 'item-details',
  components: {
    ItemDetailsExtended,
  },
  props: [
    'fields',
    'basicInformation',
    'title',
  ],
  data () {
    return {}
  },
  computed: {
    ...mapState('crud', [
      'item',
      'itemIdColumn',
      'detailsLoading',
      'detailsDialog',
      'isItemsViewFlat',
    ]),
  },
  methods: {
    ...mapActions('crud', [
      'getItems',
      'getItemDetails',
    ]),
    ...mapMutations('crud', [
      'hideItemDetailsDialog',
      'setIdColumn',
      'setChildItemsMapping',
      'moveItem',
      'setNextItem',
      'itemDetails',
    ]),
    escapeHandler (event) {
      if (event.which === 27) {
        this.close()
      }
    },
    refresh () {
      this.getItemDetails([this.item[this.itemIdColumn]])
    },
    close () {
      this.hideItemDetailsDialog()
    },
    previous () {
      this.moveItem([
        'previous',
        true,
      ])
    },
    next () {
      this.moveItem([
        'next',
        true,
      ])
    },
  },
  destroyed () {
    this.itemDetails({})
  },
}

</script>
