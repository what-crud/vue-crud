<template>
  <div @click="click()" @mouseleave="mouseleave()">
  <v-navigation-drawer
    permanent
    :mini-variant="$store.state.sidebarMini"
    dark clipped
    fixed
    app
    class="secondary main-sidebar"
    mini-variant-width="60"
  >
    <v-list dense>
      <template v-if="checkRole(item.guard)" v-for="(item) in items">
        <v-list-group v-model="item.model" :key="item.text" :prepend-icon="item.icon"
          append-icon="">
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ $t('global.routes.' + item.text) }}
              </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.model ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <template v-if="!$store.state.sidebarMini">
            <v-list-tile v-for="(child, i) in item.children" :key="i" :href="'#' + item.route + child.route">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ $t('global.routes.' + child.text) }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["sidebarMini", "sidebar"]),
    ...mapGetters("auth", ["checkRole"])
  },
  props: {
    source: String
  },
  methods: {
    ...mapMutations([
      'toggleSidebarWidth',
      'setSidebarWidth'
    ]),
    click() {
      if(this.sidebarMini) {
        this.setSidebarWidth(false)
      }
    },
    mouseleave() {
      this.setSidebarWidth(true)
    }
  },
  data: () => ({
    setSidebarMini: false,
    dialog: false,
    items: [
      {
        icon: "people",
        text: "crm.name",
        model: false,
        guard: "CRM",
        route: "/crm",
        children: [
          {
            text: "crm.companies",
            route: "/companies"
          },
          {
            text: "crm.companyTypes",
            route: "/company-types"
          },
          {
            text: "crm.companyFiles",
            route: "/company-files"
          },
          {
            text: "crm.companyComments",
            route: "/company-comments"
          },
          {
            text: "crm.companyCommentTypes",
            route: "/company-comment-types"
          },
          {
            text: "crm.people",
            route: "/people"
          },
          {
            text: "crm.personComments",
            route: "/person-comments"
          },
          {
            text: "crm.personCommentTypes",
            route: "/person-comment-types"
          },
          {
            text: "crm.positions",
            route: "/positions"
          },
          {
            text: "crm.positionTasks",
            route: "/position-tasks"
          },
          {
            text: "crm.tasks",
            route: "/tasks"
          }
        ]
      },
      {
        icon: "person_add_disabled",
        text: "admin.name",
        model: false,
        guard: "ADMIN",
        route: "/administration",
        children: [
          {
            text: "admin.users",
            route: "/users"
          },
          {
            text: "admin.permissions",
            route: "/permissions"
          },
          {
            text: "admin.userPermissions",
            route: "/user-permissions"
          }
        ]
      }
    ]
  }),
  computed: {
    ...mapGetters("auth", ["checkRole"])
  },
  props: {
    source: String
  }
};
</script>