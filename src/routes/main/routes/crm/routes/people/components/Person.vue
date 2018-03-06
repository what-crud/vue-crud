<template>
  <v-dialog v-model="personDialog" fullscreen transition="dialog-bottom-transition" :overlay=true>
    <v-card>
      <v-toolbar style="flex: 0 0 auto;" dark class="blue">
        <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="close()" dark>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <div grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs12 lg5 pa-3>
              <v-card>
                <v-card-title dark class="blue white--text">
                    <div class="headline">{{ $t('basicInformation') }}</div>
                </v-card-title>
                <v-card-text>
                  <person-details :fieldsInfo="fields"></person-details>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 lg7 pa-3>
              <v-card>
                <v-tabs v-model="active" color="blue" dark slider-color="light-blue darken-4">
                  <v-tab key="positions" ripple>{{ $t('positions') }}</v-tab>
                  <v-tab key="comments" ripple>{{ $t('comments') }}</v-tab>
                  <!-- Positions -->
                  <v-tab-item key="positions">
                    <v-card flat>
                      <v-card-text>
                        <person-positions></person-positions>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <!-- Comments -->
                  <v-tab-item key="comments">
                    <v-card flat>
                      <v-card-text>
                        <person-comments></person-comments>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </v-card>
            </v-flex>
          </v-layout>
        </div>
    </v-card>
  </v-dialog>
</template>

<script>
  import PersonDetails from './PersonDetails.vue'
  import PersonPositions from './PersonPositions.vue'
  import PersonComments from './PersonComments.vue'
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    name: 'Person',
    components: {
      PersonDetails,
      PersonPositions,
      PersonComments
    },
    props: [
      'fields'
    ],
    data() {
      return {
        active: null,
      }
    },
    created () {
      window.addEventListener('keyup', this.escapeHandler)
    },
    computed: {
      ...mapState('crm', [
        'personDialog',
      ]),
    },
    methods: {
      ...mapActions('crud', [
        'getItems'
      ]),
      ...mapMutations('crm', [
        'hidePersonDialog'
      ]),
      escapeHandler (event) {
        if (event.which == 27) {
          this.close()
        }
      },
      close() {
        this.getItems()
        this.hidePersonDialog()
      }
    },
    i18n: {
      messages: {
        pl: {
          title: 'Szczegóły osoby',
          basicInformation: 'Dane podstawowe',
          positions: 'Stanowiska',
          comments: 'Komentarze',
        },
        en: {
          title: 'Person details',
          basicInformation: 'Basic information',
          positions: 'Positions',
          comments: 'Comments',
        }
      }
    }
  }

</script>
