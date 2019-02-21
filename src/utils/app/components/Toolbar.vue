<template>
  <v-toolbar clipped-left dark fixed app color="primary">
    <v-toolbar-title class="title">
        <router-link :to="titleLink">{{title}}</router-link>
    </v-toolbar-title>
    <slot name="left"></slot>
    <v-spacer></v-spacer>
    <img v-if="showLogo" class="logo" :src="require(`@/assets/images/${logo}`)">
    <v-spacer></v-spacer>
    <slot name="right"></slot>
    <v-menu menu-props="bottom" left v-if="$store.state.localeSelectable">
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
    <a v-on:click="logoutAttempt()">
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
    props: {
      title: {
        type: String,
        default: ''
      },
      titleLink: {
        type: String,
        default: '/'
      },
      showLogo: {
        type: Boolean,
        default: true
      },
      logo: {
        type: String,
        default: 'vue-crud-sm.png'
      },
    },
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
      },      
      logoutAttempt() {
        this.logout().then(() => {
          this.$router.push({path: '/login'})
        })
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
    height:50px;
    width:auto;
  }
  @media (max-width: 699px) {
    .logo {

      display:none;
    }
  }

</style>
