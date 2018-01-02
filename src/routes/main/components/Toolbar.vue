<template>
  <v-toolbar clipped-left dark fixed app class="blue">
    <v-toolbar-side-icon @click.stop="$store.state.drawer = !$store.state.drawer"></v-toolbar-side-icon>
    <v-toolbar-title>
      {{$store.state.title}}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click.stop="openProfileDialog">
      <v-icon>perm_identity</v-icon>
    </v-btn>
    <v-btn icon @click.stop="$store.state.helpDialog = true">
      <v-icon>help_outline</v-icon>
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
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    name: 'navbar-top',
    data() {
      return {};
    },
    methods: {
      // logout() {
      //   this.$store.dispatch('auth/logout');
      // },
      ...mapActions('auth', [
        'logout',
      ]),
      ...mapMutations([
        'openProfileDialog'
      ]),
    },
  };

</script>
<style scoped>
  a {
    text-decoration: none;
  }

</style>
