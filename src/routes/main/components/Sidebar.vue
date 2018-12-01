<template>
  <v-navigation-drawer dark clipped fixed app v-model="$store.state.drawer" class="secondary" value="false">
    <v-list dense>
      <template v-if="checkRole(item.guard)" v-for="(item) in items">
        <v-list-group v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon="">
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ $t('global.routes.' + item.text) }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
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
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
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
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
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