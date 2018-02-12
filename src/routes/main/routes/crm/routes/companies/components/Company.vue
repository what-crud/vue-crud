<template>
  <v-dialog v-model="companyDialog" fullscreen transition="dialog-bottom-transition" :overlay=false scrollable>
    <v-card>
      <v-toolbar style="flex: 0 0 auto;" dark :class="$store.state.primaryColor">
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
                <v-card-title dark class="white--text" :class="$store.state.secondaryColor">
                    <div class="headline">{{ $t('basicInformation') }}</div>
                </v-card-title>
                <v-card-text>
                  <company-details :fieldsInfo="fields"></company-details>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 lg7 pa-3>
              <v-card>
                  <v-tabs v-model="active">
                    <v-tabs-bar :class="$store.state.secondaryColor" dark>
                      <v-tabs-item key="positions" href="#positions" ripple>{{ $t('positions') }}</v-tabs-item>
                      <v-tabs-item key="comments" href="#comments" ripple>{{ $t('comments') }}</v-tabs-item>
                      <v-tabs-slider color="light-blue darken-4"></v-tabs-slider>
                    </v-tabs-bar>
                    <v-tabs-items>
                      <!-- Positions -->
                      <v-tabs-content key="positions" id="positions">
                        <v-card flat>
                          <v-card-text>
                            <company-positions></company-positions>
                          </v-card-text>
                        </v-card>
                      </v-tabs-content>
                      <!-- Comments -->
                      <v-tabs-content key="comments" id="comments">
                        <v-card flat>
                          <v-card-text>
                            <company-comments></company-comments>
                          </v-card-text>
                        </v-card>
                      </v-tabs-content>
                    </v-tabs-items>
                  </v-tabs>
              </v-card>
            </v-flex>
          </v-layout>
        </div>
    </v-card>
  </v-dialog>
</template>

<script>
  import CompanyDetails from './CompanyDetails.vue'
  import CompanyPositions from './CompanyPositions.vue'
  import CompanyComments from './CompanyComments.vue'
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    name: 'company',
    components: {
      CompanyDetails,
      CompanyPositions,
      CompanyComments
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
        'companyDialog',
      ]),
    },
    methods: {
      ...mapActions('crud', [
        'getItems'
      ]),
      ...mapMutations('crm', [
        'hideCompanyDialog'
      ]),
      escapeHandler (event) {
        if (event.which == 27) {
          this.close()
        }
      },
      close() {
        this.getItems()
        this.hideCompanyDialog()
      }
    },
    i18n: {
      messages: {
        pl: {
          title: 'Szczegóły firmy',
          basicInformation: 'Dane podstawowe',
          positions: 'Stanowiska',
          comments: 'Komentarze',
        },
        en: {
          title: 'Company details',
          basicInformation: 'Basic information',
          positions: 'Positions',
          comments: 'Comments',
        }
      }
    }
  }

</script>
