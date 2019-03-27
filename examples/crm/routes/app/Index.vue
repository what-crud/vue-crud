<template>
  <div>
    <sidebar
      :items="sidebarItems"
      expandOn="click"
      :lockSidebarBtn="true"
    >
      <template slot="title">
        <v-list-tile-action>
          <v-icon color="primary">person</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>{{ userInfo.name }}</v-list-tile-title>
      </template>
    </sidebar>
    <toolbar
      :title="$store.state.title"
      titleLink="/home"
      :showLogo="true"
      logo="vue-crud-sm.png"
      :profileBtn="profile"
      :localesBtn="true"
      :logoutBtn="true"
    ></toolbar>
    <v-content class="content">
      <v-container fluid fill-height class="main-container">
        <v-layout style="width:100%">
          <v-flex xs12>
            <v-card blue flat class="main-card">
              <v-card-title class="card-title">
                <div class="headline">
                  <template v-if="$store.state.app.module !=null">
                      {{ $t('global.routes.' + $store.state.app.module) }}
                  </template>
                  <template v-if="$store.state.app.page !=null">
                      <v-icon slot="divider">forward</v-icon>
                      {{ $t('global.routes.' + $store.state.app.page) }}
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
    <footnote v-if="footer"></footnote>
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
        children: [{
          text: 'crm.companies',
          route: '/companies'
        },
        {
          text: 'crm.companyTypes',
          route: '/company-types'
        },
        {
          text: 'crm.companyFiles',
          route: '/company-files'
        },
        {
          text: 'crm.companyComments',
          route: '/company-comments'
        },
        {
          text: 'crm.companyCommentTypes',
          route: '/company-comment-types'
        },
        {
          text: 'crm.people',
          route: '/people'
        },
        {
          text: 'crm.personComments',
          route: '/person-comments'
        },
        {
          text: 'crm.personCommentTypes',
          route: '/person-comment-types'
        },
        {
          text: 'crm.positions',
          route: '/positions'
        },
        {
          text: 'crm.positionTasks',
          route: '/position-tasks'
        },
        {
          text: 'crm.tasks',
          route: '/tasks'
        }
        ]
      },
      {
        icon: 'person_add_disabled',
        text: 'admin.name',
        model: false,
        guard: 'ADMIN',
        route: '/administration',
        children: [{
          text: 'admin.users',
          route: '/users'
        },
        {
          text: 'admin.permissions',
          route: '/permissions'
        },
        {
          text: 'admin.userPermissions',
          route: '/user-permissions'
        }
        ]
      }
    ]
  }),
  computed: {
    ...mapGetters('auth', ['isLogged', 'userInfo'])
  },
  components: {
    Sidebar,
    Toolbar,
    AlertBox,
    Footnote,
    BackTop,
    Profile
  }
}
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
