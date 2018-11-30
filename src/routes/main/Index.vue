<template>
  <div>
    <sidebar></sidebar>
    <toolbar></toolbar>
    <v-content class="content">
      <v-container fluid fill-height class="main-container">
        <v-layout style="width:100%">
          <v-flex xs12>
            <v-card blue flat class="main-card">
              <v-card-title class="card-title">
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
import Sidebar from "./components/Sidebar.vue";
import Toolbar from "./components/Toolbar.vue";
import AlertBox from "./components/AlertBox.vue";
import Footnote from "./components/Footnote.vue";
import BackTop from "./components/BackTop.vue";
import Profile from "./components/Profile.vue";
import { mapGetters } from "vuex";

export default {
  name: "app",
  data: () => ({
  }),
  computed: {
    ...mapGetters("auth", ["isLogged"])
  },
  components: {
    Sidebar,
    Toolbar,
    AlertBox,
    Footnote,
    BackTop,
    Profile
  }
};
</script>
<style scoped>
.main-container {
  padding: 10px;
}
.content {
  min-height: 100vh;
  overflow-x: auto;
  background-color: #f2f2f2;
}
.main-card {
  background-color: #f2f2f2;
}
.card-title {
  padding: 0;
}
.content-container {
  margin-bottom: 100px;
  padding: 0;
}
.headline {
  padding-bottom: 10px;
}
</style>
