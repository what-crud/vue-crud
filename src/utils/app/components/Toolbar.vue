<template>
  <v-app-bar :dark="dark" :color="color" fixed app>

    <slot name="left"></slot>
    <v-spacer></v-spacer>
    <router-link :to="titleLink">
      <img v-if="showLogo" class="logo" :src="require(`@/assets/images/${logo}`)">
    </router-link>
    <router-link :to="titleLink">
      <v-toolbar-title class="title">
        {{title}}
      </v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <slot name="right"></slot>
    <v-menu
      menu-props="bottom"
      left
      v-if="localesBtn"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          icon dark fab
        >
          <v-icon>translate</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(locale, i) in locales" :key="i" @click="changeLocale(locale.name)">
          <v-list-item-title>{{ locale.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn v-if="profileBtn" icon @click.stop="openProfileDialog">
      <v-icon>perm_identity</v-icon>
    </v-btn>
    <a v-if="logoutBtn" v-on:click="logoutAttempt()">
      <v-btn icon>
        <v-icon>power_settings_new</v-icon>
      </v-btn>
    </a>

  </v-app-bar>
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
      default: false
    },
    logo: {
      type: String,
      default: 'vue-crud-sm.png'
    },
    color: {
      type: String,
      default: 'primary'
    },
    dark: {
      type: Boolean,
      default: true
    },
    profileBtn: {
      type: Boolean,
      default: true
    },
    localesBtn: {
      type: Boolean,
      default: true
    },
    logoutBtn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'locales'
    ])
  },
  methods: {
    ...mapActions('auth', [
      'logout'
    ]),
    ...mapMutations([
      'setLocale'
    ]),
    ...mapMutations('app', [
      'openProfileDialog'
    ]),
    changeLocale (locale) {
      this.$i18n.locale = locale
      this.setLocale(locale)
    },
    logoutAttempt () {
      this.logout().then(() => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}

</script>
<style scoped>
  a {
    color: inherit;
    text-decoration: none;
  }
  .logo {
    height:50px;
    width:auto;
    margin: 0 10px 0 10px;
  }
  .title {
    margin: 0 10px 0 10px;
  }
  @media (max-width: 699px) {
    .logo {

      display:none;
    }
  }

</style>
