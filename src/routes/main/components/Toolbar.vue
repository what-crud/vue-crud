<template>
  <v-toolbar clipped-left dark fixed app :class="$store.state.primaryColor">
    <v-toolbar-side-icon @click.stop="$store.state.drawer = !$store.state.drawer"></v-toolbar-side-icon>
    <v-toolbar-title class="title">
      <router-link to="/home">{{$store.state.title}}</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <img class="logo" src="../../../assets/images/logo.png">
    <v-spacer></v-spacer>
    <v-menu bottom left>
      <v-btn icon slot="activator" dark>
        <v-icon>translate</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for="(locale, i) in locales" :key="i" @click="changeLocale(locale.name)">
          <v-list-tile-title>{{ locale.text }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-btn icon @click.stop="openProfileDialog">
      <v-icon>perm_identity</v-icon>
    </v-btn>
    <a v-on:click="logout">
      <v-btn icon>
        <v-icon>power_settings_new</v-icon>
      </v-btn>
    </a>
  </v-toolbar>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    name: 'navbar-top',
    data() {
      return {};
    },
    computed: {
      ...mapState([
        'locales',
      ]),
    },
    methods: {
      ...mapActions('auth', [
        'logout',
      ]),
      ...mapMutations([
        'setLocale',
        'openProfileDialog'
      ]),
      changeLocale (locale) {
        this.$i18n.locale = locale
        this.setLocale(locale)
      }
    },
  };

</script>
<style scoped>
  a {
    color: inherit;
    text-decoration: none;
  }

  .logo {
    height: 30px;
    width: auto;
  }

  @media (max-width: 699px) {
    .logo {

      display: none;
    }
  }

</style>
