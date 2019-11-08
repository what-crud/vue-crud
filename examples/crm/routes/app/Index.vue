<template>
  <div>
    <sidebar
      :items="sidebarItems"
      expand-on="click"
      :lock-sidebar-btn="true"
      :title="$store.state.title"
      title-link="/home"
      :show-logo="true"
      logo="vue-crud-avatar.png"
      sidebar-color="primary"
      :sidebar-dark="true"
      title-color="white"
      :title-dark="false"
      nav-color="secondary"
    >
      <template slot="nav">
        <v-list-item-action>
          <v-icon color="secondary">person</v-icon>
        </v-list-item-action>
        <v-list-item-title class="white--text">{{ userInfo.name }}</v-list-item-title>
      </template>
    </sidebar>
    <toolbar
      :profile-btn="profile"
      :locales-btn="true"
      :logout-btn="true"
      color="primary"
      :dark="true"
    >
      <template slot="left">
        <div class="headline d-none d-md-inline">
          <template v-if="$store.state.app.module !=null">
              {{ $t('global.routes.' + $store.state.app.module) }}
          </template>
          <template v-if="$store.state.app.page !=null">
              <v-icon slot="divider">forward</v-icon>
              {{ $t('global.routes.' + $store.state.app.page) }}
          </template>
        </div>
      </template>
    </toolbar>
    <v-content class="content">
      <v-container fluid fill-height class="main-container">
        <v-layout style="width:100%">
          <v-flex xs12>
            <v-card flat class="main-card">
              <v-card-text class="content-container">

                <router-view style="margin: 0 auto;"></router-view>

                <alert-box></alert-box>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <footnote
      v-if="footer"
      color="secondary"
      :dark="true"
    >
      <template slot="left">
        <a href="https://vue-crud.github.io/" target="_blank" style="color:white;text-decoration:none;">
          <v-icon color="white">help</v-icon>  vue-crud.github.io
        </a>
      </template>
      <template slot="center">
        Your Company
      </template>
      <template slot="right">
        &#9400; {{ year }}
      </template>
    </footnote>
    <back-top></back-top>
    <profile v-if="profile"></profile>
  </div>
</template>

<script>
import Sidebar from '@/utils/app/components/Sidebar.vue'
import Toolbar from '@/utils/app/components/Toolbar.vue'
import AlertBox from '@/utils/app/components/AlertBox.vue'
import Footnote from '@/utils/app/components/Footnote.vue'
import BackTop from '@/utils/app/components/BackTop.vue'
import Profile from '@/utils/app/components/Profile.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data: () => ({
    profile: true,
    footer: true,
    sidebarItems: [
      {
        icon: 'people',
        text: 'crm.name',
        model: false,
        guard: 'CRM',
        route: '/crm',
        children: [
          {
            text: 'crm.companies',
            route: '/companies',
          },
          {
            text: 'crm.companyTypes',
            route: '/company-types',
          },
          {
            text: 'crm.companyFiles',
            route: '/company-files',
          },
          {
            text: 'crm.companyComments',
            route: '/company-comments',
          },
          {
            text: 'crm.companyCommentTypes',
            route: '/company-comment-types',
          },
          {
            text: 'crm.people',
            route: '/people',
          },
          {
            text: 'crm.personComments',
            route: '/person-comments',
          },
          {
            text: 'crm.personCommentTypes',
            route: '/person-comment-types',
          },
          {
            text: 'crm.positions',
            route: '/positions',
          },
          {
            text: 'crm.positionTasks',
            route: '/position-tasks',
          },
          {
            text: 'crm.tasks',
            route: '/tasks',
          },
        ],
      },
      {
        icon: 'person_add_disabled',
        text: 'admin.name',
        model: false,
        guard: 'ADMIN',
        route: '/administration',
        children: [
          {
            text: 'admin.users',
            route: '/users',
          },
          {
            text: 'admin.permissions',
            route: '/permissions',
          },
          {
            text: 'admin.userPermissions',
            route: '/user-permissions',
          },
        ],
      },
    ],
  }),
  computed: {
    ...mapGetters('auth', [
      'isLogged',
      'userInfo',
    ]),
    year () {
      let year = new Date()
      return year.getFullYear()
    },
  },
  components: {
    Sidebar,
    Toolbar,
    AlertBox,
    Footnote,
    BackTop,
    Profile,
  },
}
</script>
<style scoped>
.main-container {
  padding: 10px 0 0 0;
  background-color: white;
}
.content {
  min-height: 100vh;
  overflow-x: auto;
  background-color: white;
}
.main-card {
  background-color: white;
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
