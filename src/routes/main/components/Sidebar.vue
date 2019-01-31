<template>
  <div @click="click()" @mouseover="mouseover()" @mouseleave="mouseleave()">
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
      <template v-if="checkPermission(item.guard)" v-for="(item) in sidebarItems">
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
            <v-list-tile v-for="(child, i) in item.children" :key="i" :href="'#' + item.route + child.route" class="link">
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
    ...mapState(["sidebarMini", "sidebar", "sidebarItems", "sidebarExpandOn"]),
    ...mapGetters("auth", ["checkPermission"])
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
      if(this.sidebarMini && this.sidebarExpandOn == 'click') {
        this.setSidebarWidth(false)
      }
    },
    mouseover() {
      if(this.sidebarMini && this.sidebarExpandOn == 'mouseover') {
        this.setSidebarWidth(false)
      }
    },
    mouseleave() {
      this.setSidebarWidth(true)
      for(let item of this.sidebarItems){
        item.model = false
      }
    }
  },
  data: () => ({
    setSidebarMini: false,
    dialog: false
  }),
};
</script>
<style scoped>
  
</style>