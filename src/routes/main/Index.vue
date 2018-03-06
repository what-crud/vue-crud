<template>
  <div>
    <sidebar></sidebar>
    <toolbar></toolbar>
    <v-content style="min-height:100vh;overflow-x:auto;">
      <v-container fluid fill-height>
        <v-layout>
          <v-flex xs12>
            <v-card blue flat style="background-color: inherit;">
              <v-card-title>
                <div class="headline">
                  <template v-if="$store.state.module !=null">
                      {{ $t('global.routes.' + $store.state.module) }}
                  </template>
                  <template v-if="$store.state.page !=null">
                      <v-icon slot="divider">forward</v-icon>
                      {{ $t('global.routes.' + $store.state.page) }}
                  </template>
                </div>
              </v-card-title>
              <v-card-text class="content-container">
                <router-view style="margin: 0 auto;"></router-view>
                <alert-box></alert-box>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <footnote></footnote>
    <back-top></back-top>
    <profile></profile>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar.vue'
  import Toolbar from './components/Toolbar.vue'
  import AlertBox from './components/AlertBox.vue'
  import Footnote from './components/Footnote.vue'
  import BackTop from './components/BackTop.vue'
  import Profile from './components/Profile.vue'
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'app',
    data() {
      return {};
    },
    computed: {
      ...mapGetters('auth', [
        'isLogged'
      ]),
    },
    components: {
      Sidebar,
      Toolbar,
      AlertBox,
      Footnote,
      BackTop,
      Profile,
    }
  }

</script>
<style scoped>
  .content-container {
    margin-bottom: 100px;
  }
</style>
