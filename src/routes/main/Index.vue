<template>
  <div>
    <sidebar></sidebar>
    <toolbar></toolbar>
    <v-content style="height:100vh; overflow-y:auto;">
      <v-container fluid fill-height>
        <v-layout>
          <v-flex xs12>
            <v-card>
              <router-view></router-view>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <footnote></footnote>
    <back-top></back-top>
    <profile></profile>
    <help></help>
</div>
</template>

<script>
  import Sidebar from './components/Sidebar.vue'
  import Toolbar from './components/Toolbar.vue'
  import Footnote from './components/Footnote.vue'
  import BackTop from './components/BackTop.vue'
  import Profile from './components/Profile.vue'
  import Help from './components/Help.vue'
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'app',
    data() {
      return {};
    },
    computed: mapGetters([
      'isLogged'
    ]),
    components: {
        Sidebar,
        Toolbar,
        Footnote,
        BackTop,
        Profile,
        Help,
    }
  }

</script>
