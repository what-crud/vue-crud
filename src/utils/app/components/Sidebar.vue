<template>
  <div @click="click()" @mouseover="mouseover()" @mouseleave="mouseleave()">
  <v-navigation-drawer
    permanent
    :mini-variant="sidebarMini"
    dark clipped
    fixed
    app
    class="secondary main-sidebar"
  >
  <v-list class="pa-1">
    <v-list-tile v-if="sidebarMini && lockSidebarBtn && !locked" @click.stop="toggleLock">
      <v-list-tile-action>
        <v-icon color="primary">{{ locked ? 'chevron_left' : 'chevron_right' }}</v-icon>
      </v-list-tile-action>
    </v-list-tile>
    <v-list-tile v-if="!sidebarMini">
      <v-list-tile-content>
        <v-list-tile-title>
          <slot name="title"></slot>
        </v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action v-if="lockSidebarBtn && locked">
        <v-btn icon @click.stop="toggleLock">
          <v-icon color="primary">chevron_left</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <slot name="over"></slot>
  </v-list>
    <v-list dense>
      <template v-if="checkPermission(item.guard)" v-for="(item) in items">
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
    ...mapGetters("auth", ["checkPermission"]),
    sidebarMini() {
      return this.locked ? false : !this.expanded
    }
  },
  watch: {
    expanded(val) {
      if (!val) {
        for(let item of this.items){
          item.model = false
        }
      }
    }
  },
  props: {
    source: String,
    items: {
      type: Array,
      default: []
    },
    expandOn: {
      type: String,
      default: 'mouseover',
      validator: function (value) {
        return ['click', 'mousover'].indexOf(value) !== -1
      },
    },
    lockSidebarBtn: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    ...mapMutations("app", [
      'toggleSidebarWidth',
      'setSidebarWidth'
    ]),
    toggleLock() {
      this.locked = !this.locked
      localStorage.setItem('sidebarLocked', this.locked)
      this.expanded = this.locked
    },
    click() {
      if(this.sidebarMini && this.expandOn == 'click' && !this.locked) {
        this.expanded = true
      }
    },
    mouseover() {
      if(this.sidebarMini && this.expandOn == 'mouseover' && this.locked) {
        this.expanded = true
      }
    },
    mouseleave() {
      if(!this.locked){
        this.expanded = false
      }
    }
  },
  data: () => ({
    setSidebarMini: false,
    dialog: false,
    locked: localStorage.getItem('sidebarLocked') || false,
    expanded: false
  }),
};
</script>
<style scoped>
  
</style>