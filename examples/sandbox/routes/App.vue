<template>
  <div>
    <toolbar
      :title="toolbarTitle"
      :titleLink="toolbarTitleLink"
      :showLogo="toolbarShowLogo"
      :logo="toolbarLogo"
      :profileBtn="toolbarProfileBtn"
      :localesBtn="toolbarLocalesBtn"
      :logoutBtn="toolbarLogoutBtn"
    >
      <template
        slot="left"
        v-if="toolbarLeftSlot"
      >
        <v-btn
          icon
          dark
        >
          <v-icon>code</v-icon>
        </v-btn>
      </template>
      <template
        slot="right"
        v-if="toolbarRightSlot"
      >
        <v-btn
          icon
          dark
        >
          <v-icon>code</v-icon>
        </v-btn>
      </template>
    </toolbar>
    <sidebar
      :items="sidebarShowItems ? sidebarItems : []"
      :expandOn="sidebarExpandOn"
      :lockSidebarBtn="sidebarLockBtn"
    >
      <template
        slot="title"
        v-if="sidebarSlotTitle"
      >
        <v-list-item-action>
          <v-icon color="primary">person</v-icon>
        </v-list-item-action>
        <v-list-item-title>User Name</v-list-item-title>
      </template>
      <template
        slot="over"
        v-if="sidebarSlotOver"
      >
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon color="primary">code</v-icon>
            </v-list-item-action>
            <v-list-item-title>Slot 1</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
      <template
        slot="under"
        v-if="sidebarSlotUnder"
      >
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon color="primary">code</v-icon>
            </v-list-item-action>
            <v-list-item-title>Slot 2</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </sidebar>
    <v-content class="content">
      <v-container
        fluid
        fill-height
        class="main-container"
      >
        <v-row style="width:100%">
          <v-col xs="12">
            <v-card
              flat
              class="main-card"
            >
              <v-card-text class="content-container">

                <v-tabs
                  v-model="activeTab"
                  slider-color="primary"
                >
                  <v-tab
                    key="toolbarConfig"
                    ripple
                  >Toolbar</v-tab>
                  <v-tab
                    key="sidebarConfig"
                    ripple
                  >Sidebar</v-tab>
                  <v-tab
                    key="footerConfig"
                    ripple
                  >Footer</v-tab>
                  <v-tab
                    key="template"
                    ripple
                  >Template</v-tab>
                  <v-tab
                    key="script"
                    ripple
                  >Script</v-tab>
                  <v-tab
                    key="style"
                    ripple
                  >Style</v-tab>
                  <v-tab
                    key="otherSites"
                    ripple
                  >Other sites</v-tab>

                  <v-tab-item key="toolbarConfig">
                    <v-card flat>
                      <v-card-text>
                        <v-row wrap>
                          <v-col
                            xs="12"
                            md="6"
                            lg="4"
                            px-5
                          >
                            <v-text-field
                              label="Title"
                              v-model="toolbarTitle"
                            ></v-text-field>
                            <v-text-field
                              label="Title link"
                              v-model="toolbarTitleLink"
                              disabled
                            ></v-text-field>
                            <v-switch
                              color="green"
                              label="Left slot"
                              v-model="toolbarLeftSlot"
                            ></v-switch>
                          </v-col>
                          <v-col
                            xs="12"
                            md="6"
                            lg="4"
                            px-5
                          >
                            <v-switch
                              color="green"
                              label="Show logo"
                              v-model="toolbarShowLogo"
                            ></v-switch>
                            <v-select
                              label="Logo"
                              :items="['vue-crud-sm.png', 'cake.png', 'donut.png']"
                              v-model="toolbarLogo"
                            ></v-select>
                            <v-switch
                              color="green"
                              label="Profile button"
                              v-model="toolbarProfileBtn"
                            ></v-switch>
                          </v-col>
                          <v-col
                            xs="12"
                            md="6"
                            lg="4"
                            px-5
                          >
                            <v-switch
                              color="green"
                              label="Right slot"
                              v-model="toolbarRightSlot"
                            ></v-switch>
                            <v-switch
                              color="green"
                              label="Locales button"
                              v-model="toolbarLocalesBtn"
                            ></v-switch>
                            <v-switch
                              color="green"
                              label="Logout button"
                              v-model="toolbarLogoutBtn"
                            ></v-switch>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item key="sidebarConfig">
                    <v-card flat>
                      <v-card-text>
                        <v-row wrap>
                          <v-col
                            xs="12"
                            md="6"
                            lg="4"
                            px-5
                          >
                            <v-select
                              label="Expand on"
                              :items="['click', 'mouseover']"
                              v-model="sidebarExpandOn"
                            ></v-select>
                            <v-switch
                              color="green"
                              label="Lock sidebar option"
                              v-model="sidebarLockBtn"
                            ></v-switch>
                          </v-col>
                          <v-col
                            xs="12"
                            md="6"
                            lg="4"
                            px-5
                          >
                            <v-switch
                              color="green"
                              label="Show routes"
                              v-model="sidebarShowItems"
                            ></v-switch>
                            <v-switch
                              color="green"
                              label="Title slot"
                              v-model="sidebarSlotTitle"
                            ></v-switch>
                          </v-col>
                          <v-col
                            xs="12"
                            md="6"
                            lg="4"
                            px-5
                          >
                            <v-switch
                              color="green"
                              label="Slot over routes"
                              v-model="sidebarSlotOver"
                            ></v-switch>
                            <v-switch
                              color="green"
                              label="Slot under routes"
                              v-model="sidebarSlotUnder"
                            ></v-switch>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item key="footerConfig">
                    <v-card flat>
                      <v-card-text>
                        <v-row wrap>
                          <v-col
                            xs="12"
                            md="6"
                            lg="4"
                            px-5
                          >
                            <v-switch
                              color="green"
                              label="Slot left"
                              v-model="footerSlotLeft"
                            ></v-switch>
                          </v-col>
                          <v-col
                            xs="12"
                            md="6"
                            lg="4"
                            px-5
                          >
                            <v-switch
                              color="green"
                              label="Slot center"
                              v-model="footerSlotCenter"
                            ></v-switch>
                          </v-col>
                          <v-col
                            xs="12"
                            md="6"
                            lg="4"
                            px-5
                          >
                            <v-switch
                              color="green"
                              label="Slot right"
                              v-model="footerSlotRight"
                            ></v-switch>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item key="template">
                    <v-card flat>
                      <v-card-text text-xs-center>
                        <code
                          style="width:100%;max-height: 400px;overflow-y:auto"
                          v-text="template"
                        ></code>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item key="script">
                    <v-card
                      flat
                      style="max-height: 400px;overflow-y:auto"
                    >
                      <v-card-text>
                        <code
                          style="width:100%"
                          v-text="script"
                        ></code>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item key="style">
                    <v-card
                      flat
                      style="max-height: 400px;overflow-y:auto"
                    >
                      <v-card-text>
                        <code
                          style="width:100%"
                          v-text="style"
                        ></code>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item key="otherSites">
                    <v-card
                      flat
                      style="max-height: 400px;overflow-y:auto"
                    >
                      <v-card-text>
                        <ul>
                          <li>
                            <router-link to="/crud">CRUD demo/sandbox</router-link>
                          </li>
                          <li>
                            <router-link to="/login">Login demo/sandbox</router-link>
                          </li>
                          <li>
                            <a
                              href="https://github.com/what-crud/vue-crud"
                              target="_blank"
                            >GitHub</a>
                          </li>
                          <li>
                            <a
                              href="https://vue-crud.github.io/"
                              target="_blank"
                            >Docs</a>
                          </li>
                        </ul>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>

              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <footnote v-if="footer">
      <template
        slot="left"
        v-if="footerSlotLeft"
      >
        <v-icon>code</v-icon>
      </template>
      <template
        slot="center"
        v-if="footerSlotCenter"
      >
        <v-icon>code</v-icon>
      </template>
      <template
        slot="right"
        v-if="footerSlotRight"
      >
        <v-icon>code</v-icon>
      </template>
    </footnote>
    <back-top></back-top>
    <profile v-if="profile"></profile>
  </div>
</template>

<script>
import Sidebar from '@/utils/app/components/Sidebar.vue'
import Toolbar from '@/utils/app/components/Toolbar.vue'
import Footnote from '@/utils/app/components/Footnote.vue'
import BackTop from '@/utils/app/components/BackTop.vue'
import Profile from '@/utils/app/components/Profile.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data: () => ({
    activeTab: 'toolbarConfig',
    profile: true,
    toolbarTitle: 'Your App',
    toolbarTitleLink: '/app',
    toolbarShowLogo: true,
    toolbarLogo: 'vue-crud-sm.png',
    toolbarProfileBtn: true,
    toolbarLocalesBtn: true,
    toolbarLogoutBtn: true,
    toolbarLeftSlot: true,
    toolbarRightSlot: true,
    sidebarExpandOn: 'click',
    sidebarLockBtn: true,
    sidebarShowItems: true,
    sidebarSlotTitle: true,
    sidebarSlotOver: true,
    sidebarSlotUnder: true,
    footer: true,
    footerSlotLeft: true,
    footerSlotCenter: false,
    footerSlotRight: true,
    sidebarItems: [
      {
        icon: 'people',
        text: 'blog.name',
        model: false,
        route: '/app',
        children: [
          {
            text: 'blog.posts',
            route: '',
          },
          {
            text: 'blog.categories',
            route: '',
          },
          {
            text: 'blog.tags',
            route: '',
          },
        ],
      },
      {
        icon: 'person_add_disabled',
        text: 'admin.name',
        model: false,
        route: '/app',
        children: [
          {
            text: 'admin.users',
            route: '',
          },
          {
            text: 'admin.permissions',
            route: '',
          },
          {
            text: 'admin.userPermissions',
            route: '',
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
    template () {
      return `
          <template>
            <div>
              <sidebar ${this.sidebarShowItems ? `
                :items="sidebarItems"` : ''} ${this.expandOn === 'mouseover' ? '' : `
                expandOn="${this.sidebarExpandOn}"`} ${this.lockSidebarBtn ? '' : `
                :lockSidebarBtn="false"`}
              > ${this.sidebarSlotTitle ? `
                <template slot="title">
                  <v-list-item-action>
                    <v-icon color="primary">person</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>User Name</v-list-item-title>
                </template>` : ''} ${this.sidebarSlotOver ? `
                <template slot="over">
                  <v-list>
                    <v-list-item>
                        <v-list-item-action>
                          <v-icon color="primary">code</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>Slot 1</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </template>` : ''} ${this.sidebarSlotUnder ? `
                <template slot="under">
                  <v-list>
                    <v-list-item>
                        <v-list-item-action>
                          <v-icon color="primary">code</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>Slot 2</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </template>` : ''}
              </sidebar>
              <toolbar
                title="${this.toolbarTitle}"
                titleLink="${this.toolbarTitleLink}" ${this.toolbarShowLogo ? `
                logo="${this.toolbarLogo}"` : `
                :showLogo="false"`} ${this.toolbarProfileBtn ? `` : `
                :profileBtn="false"`} ${this.toolbarLocalesBtn ? `` : `
                :loclesBtn="false"`} ${this.toolbarLogoutBtn ? `` : `
                :logoutBtn="false"`}
              > ${this.toolbarLeftSlot ? `
                <template slot="left" v-if="toolbarLeftSlot">
                  <v-btn icon dark>
                    <v-icon>code</v-icon>
                  </v-btn>
                </template>` : ''} ${this.toolbarRightSlot ? `
                <template slot="right" v-if="toolbarRightSlot">
                  <v-btn icon dark>
                    <v-icon>code</v-icon>
                  </v-btn>
                </template>
              </toolbar>` : ''}
              <v-content class="content">
                <v-container fluid fill-height class="main-container">
                  <v-row style="width:100%">
                    <v-col xs="12">
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
                    </v-col>
                  </v-row>
                </v-container>
              </v-content>
              <footnote v-if="footer"> ${this.footerSlotLeft ? `
                <template slot="left">
                  <v-icon>code</v-icon>
                </template>` : ''} ${this.footerSlotCenter ? `
                <template slot="center">
                  <v-icon>code</v-icon>
                </template>` : ''} ${this.footerSlotRight ? `
                <template slot="right">
                  <v-icon>code</v-icon>
                </template>` : ''}
              </footnote>
              <back-top></back-top> ${this.toolbarProfileBtn ? `
              <profile v-if="profile"></profile>` : ''}
            </div>
          </template>
        `
    },
    script () {
      return `
          import Sidebar from "@/utils/app/components/Sidebar.vue";
          import Toolbar from "@/utils/app/components/Toolbar.vue";
          import AlertBox from "@/utils/app/components/AlertBox.vue";
          import Footnote from "@/utils/app/components/Footnote.vue";
          import BackTop from "@/utils/app/components/BackTop.vue"; ${this.toolbarProfileBtn ? `
          import Profile from "@/utils/app/components/Profile.vue";` : ''}
          import { mapGetters } from "vuex";

          export default {
            name: "app",
            data: () => ({
              profile: ${this.toolbarProfileBtn ? 'true' : 'false'},
              footer: true, ${this.toolbarProfileBtn ? 'true' : 'false'}, ${this.sidebarShowItems ? `
              sidebarItems: [
                  {
                      icon: "people",
                      text: "crm.name",
                      model: false,
                      route: "/crm",
                      children: [
                        {
                          text: 'blog.posts',
                          route: ''
                        },
                        {
                          text: 'blog.categories',
                          route: ''
                        },
                        {
                          text: 'blog.tags',
                          route: ''
                        },
                      ]
                  },
                  {
                      icon: "person_add_disabled",
                      text: "admin.name",
                      model: false,
                      route: "/administration",
                      children: [{
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
              ],` : ''}
            }),
            computed: {
              ...mapGetters("auth", ["isLogged", "userInfo"])
            },
            components: {
              Sidebar,
              Toolbar,
              AlertBox,
              Footnote,
              BackTop, ${this.toolbarProfileBtn ? `
              Profile,` : ''}
            }
          };
        `
    },
    style () {
      return `
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
        `
    },
  },
  components: {
    Sidebar,
    Toolbar,
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
