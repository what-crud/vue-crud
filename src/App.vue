<template>
  <div id="app">
    <v-app app>
      <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" hide-overlay stateless app>
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="require(`@/assets/images/vue-crud-sm.png`)" style="height:auto;width:40px;border-radius:0;">
              </v-list-tile-avatar>
  
              <v-list-tile-content>
                <v-list-tile-title>Vue CRUD demo</v-list-tile-title>
              </v-list-tile-content>
  
              <v-list-tile-action>
                <v-btn icon @click.stop="mini = !mini">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
  
          <v-list-tile v-for="item in items" :key="item.title" :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
  
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
  
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        drawer: true,
        items: [{
            title: 'CRUD',
            icon: 'table_chart',
            link: '/crud'
          },
          {
            title: 'App layout',
            icon: 'dashboard',
            link: '/app'
          },
          {
            title: 'Login page',
            icon: 'verified_user',
            link: '/login'
          },
        ],
        mini: true,
        right: null
      }
    }
  }
export default {}
</script>

<style lang="stylus">
  @import "./assets/stylus/main.styl";
</style>
