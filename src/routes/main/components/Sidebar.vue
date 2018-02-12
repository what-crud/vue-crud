<template>
  <v-navigation-drawer dark clipped fixed app v-model="$store.state.drawer" :class="$store.state.secondaryColor">
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
                  {{ $t('global.routes.' + item.text) }}
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
                  {{ $t('global.routes.' + child.text) }}
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
          model: true,
          guard: 'CRM',
          route: '/crm',
          children: [
            { text: 'crm.companies', route: '/companies' },
            { text: 'crm.people', route: '/people' },
            { text: 'crm.positions', route: '/positions' },
            { text: 'crm.companyComments', route: '/company-comments' },
            { text: 'crm.personComments', route: '/person-comments' },
            { text: 'crm.positionTasks', route: '/position-tasks' },
            { text: 'crm.companyTypes', route: '/company-types' },
            { text: 'crm.companyCommentTypes', route: '/company-comment-types' },
            { text: 'crm.personCommentTypes', route: '/person-comment-types' },
            { text: 'crm.tasks', route: '/tasks' },
            // { text: 'crm.companyFiles', route: '/company-files' },
            // { text: 'crm.personFiles', route: '/person-files' },
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'whs.name',
          model: false,
          guard: 'WHS',
          route: '/wholesalers',
          children: [
            { text: 'whs.wholesalers', route: '/wholesalers' },
            { text: 'whs.groups', route: '/groups' },
            { text: 'whs.bigGroups', route: '/big-groups' },
            { text: 'whs.clients', route: '/clients' },
            { text: 'whs.clientTypes', route: '/client-types' },
            { text: 'whs.wholesalerClients', route: '/wholesaler-clients' },
            { text: 'whs.news', route: '/news' },
            { text: 'whs.newsCategories', route: '/news-categories' },
            { text: 'whs.users', route: '/users' },
            { text: 'whs.permissions', route: '/permissions' },
            { text: 'whs.userPermissions', route: '/user-permissions' },
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'pha.name',
          model: false,
          guard: 'PHA',
          route: '/pharmacies',
          children: [
            { text: 'pha.pharmacies', route: '/pharmacies' },
            { text: 'pha.users', route: '/users' },
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'hos.name',
          model: false,
          guard: 'HOS',
          route: '/hospitals',
          children: [
            { text: 'hos.hospitals', route: '/hospitals' },
            { text: 'hos.users', route: '/users' },
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
  }
</script>

<style scoped>
  
</style>