<template>
  <div>
    <v-layout row wrap mb-5>
      <v-flex xs12>
        <v-tabs
          v-model="activeTab"
          color="grey lighten-3"
          slider-color="primary"
        >
          <v-tab key="config" ripple>Configuration</v-tab>
          <v-tab key="template" ripple>Template</v-tab>
          <v-tab key="script" ripple>Script</v-tab>
          
          <v-tab-item key="config">
            <v-card flat>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 md6 lg3 px-5>
                      <v-text-field label="Login redirect" v-model="redirect" disabled></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6 lg3 px-5>
                      <v-switch color="green" label="Show logo" v-model="showLogo"></v-switch>
                  </v-flex>
                  <v-flex xs12 md6 lg3 px-5>
                      <v-select label="Logo" :items="['vue-crud-lg.png', 'cake.png', 'donut.png']" v-model="logo"></v-select>
                  </v-flex>
                  <v-flex xs12 md6 lg3 px-5>
                      <v-switch color="green" label="Locale selectable" v-model="localeSelectable"></v-switch>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item key="template">
            <v-card flat>
              <v-card-text text-xs-center>
                <code style="width:100%;max-height: 400px;overflow-y:auto" v-text="template"></code>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item key="script">
            <v-card flat style="max-height: 400px;overflow-y:auto">
              <v-card-text>
                <code style="width:100%" v-text="script"></code>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout> 
    <login-form
      :redirect="redirect"
      :localeSelectable="localeSelectable"
      :showLogo="showLogo"
      :logo="logo"
    ></login-form>
  </div>
  </template>
  
  <script>
  
  import LoginForm from '@/utils/auth/components/LoginForm.vue'
  
  export default {
    data: () => ({
      activeTab: 'config',
      redirect: "/app",
      localeSelectable: true,
      showLogo: true,
      logo: "vue-crud-lg.png",
    }),
    computed: {
      template() {
        return `
          <template>
            <login-form
              redirect="${this.redirect}" ${this.localeSelectable ? '' : `
              :localeSelectable="false"`}
              logo="${this.logo}" ${this.showLogo ? '' : `
              :showLogo="false"`}
            ></login-form>
          </template>
        `
      },
      script() {
        return `
          import LoginForm from '@/utils/auth/components/LoginForm.vue'

          export default {
            components: {
              LoginForm
            }
          }
        `
      }
    },
    components: {
      LoginForm
    }
  }
  
  </script>
  