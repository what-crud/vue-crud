<template>
  <v-navigation-drawer dark clipped fixed app v-model="$store.state.drawer" class="light-blue darken-4">
    <v-list dense>
        <template v-if="checkRole(item.guard)" v-for="(item, i) in items">
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
                  {{ $t(item.text) }}
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
                  {{ $t(child.text) }}
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
                {{ $t(item.text) }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'crm.name',
          model: false,
          guard: 'CRM',
          route: '/crm',
          children: [
            { text: 'crm.companies', route: '/companies' },
            { text: 'crm.people', route: '/people' },
            { text: 'crm.positions', route: '/positions' },
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'someModule.name',
          model: false,
          guard: 'someModule',
          route: '/some-module',
          children: [
            { text: 'someModule.pageOne', route: '/page-one' },
            { text: 'someModule.pageTwo', route: '/page-two' },
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'admin.name',
          model: false,
          guard: 'ADMIN',
          route: '/administration',
          children: [
            { text: 'admin.users', route: '/users' },
            { text: 'admin.permissions', route: '/permissions' },
            { text: 'admin.userPermissions', route: '/user-permissions' },
          ]
        },
      ]
    }),
    computed: {
      ...mapGetters('auth', [
        'checkRole',
      ])
    },
    props: {
      source: String
    },
    i18n: {
      messages:{
        pl: {
          crm: {
            name: 'CRM',
            companies: 'Firmy',
            people: 'Osoby',
            positions: 'Stanowiska',
          },
          someModule: {
            name: 'Jakiś moduł',
            pageOne: 'Strona 1',
            pageTwo: 'Strona 2',
          },
          admin: {
            name: 'Administracja',
            permissions: 'Uprawnienia',
            users: 'Użytkownicy',
            userPermissions: 'Użytkownicy - uprawnienia',
          },
        },
        en: {
          crm: {
            name: 'CRM',
            companies: 'Companies',
            people: 'People',
            positions: 'Positions',
          },
          someModule: {
            name: 'Some module',
            pageOne: 'Page 1',
            pageTwo: 'Page 2',
          },
          admin: {
            name: 'Administration',
            permissions: 'Permissions',
            users: 'Users',
            userPermissions: 'Users - permissions',
          },
        }
      }
    },
  }
</script>

<style scoped>
  
</style>