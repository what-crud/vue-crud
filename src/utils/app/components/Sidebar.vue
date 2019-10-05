<template>
  <div @click="click()" @mouseover="mouseover()" @mouseleave="mouseleave()">
  <v-navigation-drawer
    permanent
    :mini-variant="sidebarMini"
    class="main-sidebar"
    :class="sidebarColor"
    :dark="sidebarDark"
    fixed
    app
  >
    <router-link :to="titleLink" style="text-decoration:none">
      <v-toolbar
        v-if="title !== '' || showLogo"
        :class="titleColor"
      >
        <v-list>
          <v-list-item>
            <v-list-item-avatar tile v-if="showLogo" :size="logoSize" style="margin-right: 20px;">
              <img v-if="showLogo" class="logo" :src="require(`@/assets/images/${logo}`)">
            </v-list-item-avatar>
            <v-list-item-title class="title" :class="titleDark ? 'white--text' : 'black--text'">
              {{ title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-toolbar>
    </router-link>
    <v-divider></v-divider>
    <v-list class="pa-1" :class="`${navColor}--text`">
      <v-list-item v-if="sidebarMini && lockSidebarBtn && !locked" @click.stop="toggleLock">
        <v-list-item-action>
          <v-icon :color="navColor !== '' ? navColor : (sidebarDark ? 'white' : 'black')">chevron_right</v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-list-item v-if="!sidebarMini">
        <slot name="nav"></slot>
        <v-list-item-action v-if="lockSidebarBtn && locked">
          <v-btn icon @click.stop="toggleLock">
            <v-icon :color="navColor !== '' ? navColor : (sidebarDark ? 'white' : 'black')">chevron_left</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <slot name="over"></slot>
    <v-list dense>
      <template v-for="(item) in items">
        <v-list-group
          v-if="checkPermission(item.guard)"
          v-model="item.model"
          :key="item.text"
          :prepend-icon="item.icon"
          append-icon=""
          active-class="sidebarDark ? 'white--text' : 'black--text'"
        >
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('global.routes.' + item.text) }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.model ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-list-item-action>
          </v-list-item>
          <template v-if="!$store.state.sidebarMini">
            <v-list-item v-for="(child, i) in item.children" :key="i" :href="'#' + item.route + child.route" class="link">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t('global.routes.' + child.text) }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-group>
      </template>
    </v-list>
    <slot name="under"></slot>
  </v-navigation-drawer>
  </div>
</template>

<script>
import {
  mapGetters,
  mapMutations
} from 'vuex'

export default {
  created () {
    this.locked = JSON.parse(localStorage.getItem('sidebarLocked')) || false
  },
  computed: {
    ...mapGetters('auth', ['checkPermission']),
    sidebarMini () {
      return this.locked ? false : !this.expanded
    }
  },
  watch: {
    expanded (val) {
      if (!val) {
        for (const item of this.items) {
          item.model = false
        }
      }
    }
  },
  props: {
    source: String,
    title: {
      type: String,
      default: ''
    },
    titleLink: {
      type: String,
      default: '/'
    },
    showLogo: {
      type: Boolean,
      default: true
    },
    logo: {
      type: String,
      default: 'vue-crud-avatar.png'
    },
    logoSize: {
      type: Number,
      default: 50
    },
    navColor: {
      type: String,
      default: ''
    },
    titleColor: {
      type: String,
      default: 'secondary'
    },
    titleDark: {
      type: Boolean,
      default: true
    },
    sidebarColor: {
      type: String,
      default: 'white'
    },
    sidebarDark: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    },
    expandOn: {
      type: String,
      default: 'mouseover',
      validator (value) {
        return ['click', 'mousover'].indexOf(value) !== -1
      }
    },
    lockSidebarBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    ...mapMutations('app', [
      'toggleSidebarWidth',
      'setSidebarWidth'
    ]),
    toggleLock () {
      this.locked = !this.locked
      localStorage.setItem('sidebarLocked', this.locked)
      this.expanded = this.locked
    },
    click () {
      if (this.sidebarMini && this.expandOn === 'click' && !this.locked) {
        this.expanded = true
      }
    },
    mouseover () {
      if (this.sidebarMini && this.expandOn === 'mouseover' && this.locked) {
        this.expanded = true
      }
    },
    mouseleave () {
      if (!this.locked) {
        this.expanded = false
      }
    }
  },
  data: () => ({
    setSidebarMini: false,
    dialog: false,
    locked: false,
    expanded: false
  })
}
</script>
<style scoped>

</style>
