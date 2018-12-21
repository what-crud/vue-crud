<template>
  <v-dialog v-model="companyDialog" fullscreen transition="dialog-bottom-transition" :overlay=true>
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
                <company-details :fieldsInfo="fields"></company-details>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 lg7 pa-3>
            <v-card>
              <v-tabs v-model="active" color="blue" dark slider-color="light-blue darken-4">
                <v-tab key="positions" ripple>{{ $t('positions') }}</v-tab>
                <v-tab key="comments" ripple>{{ $t('comments') }}</v-tab>
                <v-tab key="files" ripple>{{ $t('files') }}</v-tab>
                <!-- Positions -->
                <v-tab-item key="positions">
                  <v-card flat>
                    <v-card-text>
                      <company-positions></company-positions>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <!-- Comments -->
                <v-tab-item key="comments">
                  <v-card flat>
                    <v-card-text>
                      <company-comments></company-comments>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <!-- Files -->
                <v-tab-item key="files">
                  <v-card flat>
                    <v-card-text>
                      <company-files></company-files>
                      <image-container></image-container>
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
  import CompanyDetails from './CompanyDetails.vue'
  import CompanyPositions from './CompanyPositions.vue'
  import CompanyComments from './CompanyComments.vue'
  import CompanyFiles from './CompanyFiles.vue'
  import ImageContainer from './ImageContainer.vue'
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
      CompanyComments,
      CompanyFiles,
      ImageContainer
    },
    props: [
      'fields'
    ],
    data() {
      return {
        active: null,
      }
    },
    created() {
      //window.addEventListener('keyup', this.escapeHandler)
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
      escapeHandler(event) {
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
          files: 'Pliki',
        },
        en: {
          title: 'Company details',
          basicInformation: 'Basic information',
          positions: 'Positions',
          comments: 'Comments',
          files: 'Files',
        }
      }
    }
  }

</script>
