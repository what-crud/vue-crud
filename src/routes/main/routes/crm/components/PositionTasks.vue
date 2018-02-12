<template>
  <v-dialog v-model="tasks.show" max-width="600">
    <v-card>
      <v-card-title class="headline">{{ tasks.title }}</v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <v-card class="ma-2">
              <v-toolbar>
                <v-toolbar-title>{{ $t('available') }}</v-toolbar-title>
              </v-toolbar>
              <v-list class="item-elements-list">
                <v-list-tile avatar v-for="item in tasks.available" v-bind:key="item.title" @click="add(item.id)">
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item.name"></v-list-tile-title>
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
                <v-list-tile avatar v-for="item in tasks.selected" v-bind:key="item.title" @click="remove(item)">
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item.name"></v-list-tile-title>
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
    ],
    data() {
      return {}
    },
    computed: {
      ...mapState('crm', [
        'tasks',
      ]),
    },
    methods: {
      ...mapActions('crm', [
        'addPositionTask',
        'removePositionTask',
      ]),
      add(taskId) {
        let obj = {
          'position_id': this.tasks.positionId,
          'task_id': taskId
        }
        this.addPositionTask([
          this.tasks.positionId,
          obj,
          this.$t('global.alerts.added')
        ])
      },
      remove(item) {
        let positionTaskId = item.task_positions[0].id
        this.removePositionTask([
          positionTaskId,
          this.tasks.positionId,
          this.$t('global.alerts.removed')
        ])
      },
      close() {
        this.tasks.show = false
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
          alerts: {
            added: 'Dodano',
            addError: 'Błąd! Nie udało się dodać zadania',
            removed: 'Usunięto',
            removeError: 'Błąd! Nie udało się usunąć zadania',
          },
        },
        en: {
          available: 'Available',
          selected: 'Selected',
          buttons: {
            close: 'Close'
          },
          alerts: {
            added: 'Added',
            addError: 'Error! Add unsuccessful',
            removed: 'Removed',
            removeError: 'Error! Remove unsuccessful',
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
