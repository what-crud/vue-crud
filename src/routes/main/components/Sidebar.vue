<template>
  <v-navigation-drawer dark clipped fixed app v-model="$store.state.drawer" class="light-blue darken-4">
    <v-list dense>
        <template v-for="(item, i) in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="i"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" no-action>
            <v-list-tile slot="item" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click=""
              :href="'#' + item.route + child.route"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'CRM',
          model: false,
          route: '/crm',
          children: [
            { text: 'Firmy', route: '/companies' },
            { text: 'Osoby', route: '/people' },
            { text: 'Stanowiska', route: '/positions' },
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Hurtownie',
          model: false,
          route: '/wholesalers',
          children: [
            { text: 'Hurtownie', route: '/wholesalers' },
            { text: 'Użytkownicy', route: '/users' },
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Apteki',
          model: false,
          route: '/pharmacies',
          children: [
            { text: 'Apteki', route: '/pharmacies' },
            { text: 'Użytkownicy', route: '/users' },
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Szpitale',
          model: false,
          route: '/hospitals',
          children: [
            { text: 'Szpitale', route: '/hospitals' },
            { text: 'Użytkownicy', route: '/users' },
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Administracja',
          model: false,
          route: '/administration',
          children: [
            { text: 'Użytkownicy', route: '/users' },
            { text: 'Uprawnienia', route: '/permissions' },
            { text: 'Użytkownicy - uprawnienia', route: '/user-permissions' },
          ]
        },
      ]
    }),
    props: {
      source: String
    }
  }
</script>

<style scoped>
  
</style>