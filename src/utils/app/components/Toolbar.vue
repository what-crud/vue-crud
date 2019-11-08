<template>
  <v-app-bar
    class="toolbar"
    :dark="dark"
    :color="color"
    fixed
    app
  >
    <v-app-bar-nav-icon
      class="d-lg-none"
      @click.stop="showNavigationDrawer()"
    />
    <slot name="left"></slot>
    <v-spacer></v-spacer>
    <router-link :to="titleLink">
      <img
        v-if="showLogo"
        class="toolbar__logo"
        :src="require(`@/assets/images/${logo}`)"
      >
    </router-link>
    <router-link :to="titleLink">
      <v-toolbar-title class="toolbar__title">
        {{title}}
      </v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <slot name="right"></slot>
    <v-menu
      v-if="localesBtn"
      menu-props="bottom"
      left
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
        <v-list-item
          v-for="(locale, i) in locales"
          :key="i"
          @click="changeLocale(locale.name)"
        >
          <v-list-item-title>
            {{ locale.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
      v-if="profileBtn"
      icon
      @click.stop="openProfileDialog"
    >
      <v-icon>perm_identity</v-icon>
    </v-btn>
    <a
      v-if="logoutBtn"
      class="toolbar__logout-button"
      v-on:click="logoutAttempt()"
    >
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
  mapActions,
} from 'vuex'

export default {
  name: 'navbar-top',
  props: {
    title: {
      type: String,
      default: '',
    },
    titleLink: {
      type: String,
      default: '/',
    },
    showLogo: {
      type: Boolean,
      default: false,
    },
    logo: {
      type: String,
      default: 'vue-crud-sm.png',
    },
    color: {
      type: String,
      default: 'primary',
    },
    dark: {
      type: Boolean,
      default: true,
    },
    profileBtn: {
      type: Boolean,
      default: true,
    },
    localesBtn: {
      type: Boolean,
      default: true,
    },
    logoutBtn: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {}
  },
  computed: {
    ...mapState(['locales']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapMutations(['setLocale']),
    ...mapMutations('app', [
      'openProfileDialog',
      'showNavigationDrawer',
    ]),
    changeLocale (locale) {
      this.$i18n.locale = locale
      this.$vuetify.lang.current = locale
      this.setLocale(locale)
    },
    logoutAttempt () {
      this.logout().then(() => {
        this.$router.push({ path: '/login' })
      })
    },
  },
}

</script>
<style lang="scss" scoped>
.toolbar {
  &__logo {
    height:50px;
    width:auto;
    margin: 0 10px;
    @media (max-width: 699px) {
      display:none;
    }
  }
  &__title {
    margin: 0 10px 0 10px;
  }
  &__logout-button {
    color: inherit;
    text-decoration: none;
  }
}
</style>
