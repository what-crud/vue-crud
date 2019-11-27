<template>
  <div>
    <v-row
      wrap
      mb-5
    >
      <v-col xs="12">
        <v-tabs
          v-model="activeTab"
          slider-color="primary"
        >
          <v-tab
            key="config"
            ripple
          >Configuration</v-tab>
          <v-tab
            key="template"
            ripple
          >Template</v-tab>
          <v-tab
            key="script"
            ripple
          >Script</v-tab>
          <v-tab
            key="otherSites"
            ripple
          >Other sites</v-tab>

          <v-tab-item key="config">
            <v-card flat>
              <v-card-text>
                <v-row wrap>
                  <v-col
                    xs="12"
                    md="6"
                    lg="3"
                    px-5
                  >
                    <v-text-field
                      label="Login redirect"
                      v-model="redirect"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col
                    xs="12"
                    md="6"
                    lg="3"
                    px-5
                  >
                    <v-switch
                      color="green"
                      label="Show logo"
                      v-model="showLogo"
                    ></v-switch>
                  </v-col>
                  <v-col
                    xs="12"
                    md="6"
                    lg="3"
                    px-5
                  >
                    <v-select
                      label="Logo"
                      :items="['vue-crud-lg.png', 'cake.png', 'donut.png']"
                      v-model="logo"
                    ></v-select>
                  </v-col>
                  <v-col
                    xs="12"
                    md="6"
                    lg="3"
                    px-5
                  >
                    <v-switch
                      color="green"
                      label="Locale selectable"
                      v-model="localeSelectable"
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item key="template">
            <v-card flat>
              <v-card-text text-xs-center>
                <code
                  style="width:100%;max-height: 400px;overflow-y:auto"
                  v-text="template"
                ></code>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item key="script">
            <v-card
              flat
              style="max-height: 400px;overflow-y:auto"
            >
              <v-card-text>
                <code
                  style="width:100%"
                  v-text="script"
                ></code>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item key="otherSites">
            <v-card
              flat
              style="max-height: 400px;overflow-y:auto"
            >
              <v-card-text>
                <ul>
                  <li>
                    <router-link to="/app">App layout demo/sandbox</router-link>
                  </li>
                  <li>
                    <router-link to="/CRUD">CRUD demo/sandbox</router-link>
                  </li>
                  <li>
                    <a
                      href="https://github.com/what-crud/vue-crud"
                      target="_blank"
                    >GitHub</a>
                  </li>
                  <li>
                    <a
                      href="https://vue-crud.github.io/"
                      target="_blank"
                    >Docs</a>
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
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
    redirect: '/',
    localeSelectable: true,
    showLogo: true,
    logo: 'vue-crud-lg.png',
  }),
  computed: {
    template () {
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
    script () {
      return `
          import LoginForm from '@/utils/auth/components/LoginForm.vue'

          export default {
            components: {
              LoginForm
            }
          }
        `
    },
  },
  components: {
    LoginForm,
  },
}

</script>
