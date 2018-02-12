<template>
  <v-dialog v-model="itemElements.show" max-width="600">
    <v-card>
      <v-card-title class="headline">{{ itemElements.title }}</v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <v-card class="ma-2">
              <v-toolbar>
                <v-toolbar-title>{{ $t('available') }}</v-toolbar-title>
              </v-toolbar>
              <v-list class="item-elements-list">
                <v-list-tile avatar v-for="item in itemElements.available" v-bind:key="item.title" @click="add(item.id)">
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item[itemElements.column]"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card class="ma-2">
              <v-toolbar>
                <v-toolbar-title>{{ $t('selected') }}</v-toolbar-title>
              </v-toolbar>
              <v-list class="item-elements-list">
                <v-list-tile avatar v-for="item in itemElements.selected" v-bind:key="item.title" @click="remove(item)">
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item[itemElements.column]"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black" flat="flat" @click.native="close()">{{ $t('buttons.close') }}</v-btn>
      </v-card-actions>
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

  export default {
    props: [
      'details'
    ],
    data() {
      return {}
    },
    computed: {
      ...mapState('crud', [
        'itemElements',
      ]),
    },
    methods: {
      ...mapActions('crud', [
        'addItemElement',
        'removeItemElement',
      ]),
      add(foreignId) {
        let obj = {}
        obj[this.itemElements.primaryId] = this.itemElements.id
        obj[this.itemElements.foreignId] = foreignId
        this.addItemElement([
          obj,
          this.$t('global.alerts.added'),
          this.$t('global.alerts.addError')
        ])
      },
      remove(item) {
        let id = item[this.itemElements.itemObject][0].id
        this.removeItemElement([
          id,
          this.$t('global.alerts.removed'),
          this.$t('global.alerts.removeError')
        ])
      },
      close() {
        this.itemElements.show = false
      },
    },
    i18n: {
      messages: {
        pl: {
          available: 'Dostępne',
          selected: 'Wybrane',
          buttons: {
            close: 'Zamknij'
          },
        },
        en: {
          available: 'Available',
          selected: 'Selected',
          buttons: {
            close: 'Close'
          },
        },
      }
    }
  }

</script>
<style scoped>
  .item-elements-list {
    height: 400px;
    overflow-y: auto;
  }

</style>
