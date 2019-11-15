# Application layout

## Toolbar

### Import:
**import Toolbar from '@/utils/app/components/Toolbar.vue'**

### Props:

<!-- @vuese:navbar-top:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|title|-|`String`|`false`|''|
|titleLink|-|`String`|`false`|'/'|
|showLogo|-|`Boolean`|`false`|false|
|logo|-|`String`|`false`|'vue-crud-sm.png'|
|color|-|`String`|`false`|'primary'|
|dark|-|`Boolean`|`false`|true|
|profileBtn|-|`Boolean`|`false`|true|
|localesBtn|-|`Boolean`|`false`|true|
|logoutBtn|-|`Boolean`|`false`|true|

<!-- @vuese:navbar-top:props:end -->


### Slots:

<!-- @vuese:navbar-top:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|left|-|-|
|right|-|-|

<!-- @vuese:navbar-top:slots:end -->

### Example:

``` html
<template>
  <div>
    <toolbar
      :title="$store.state.title"
      title-link="/home"
      :show-logo="true"
      logo="vue-crud-sm.png"
      :profile-btn="profile"
      :locales-btn="true"
      :logout-btn="true"
    >
      <template slot="left"></template>
      <template slot="right"></template>
    </toolbar>
    <profile v-if="profile"></profile>
  </div>
</template>

<script>
import Toolbar from "@/utils/app/components/Toolbar.vue";
import Profile from "@/utils/app/components/Profile.vue";

export default {
  name: "app",
  data: () => ({
    profile: true,
  }),
  components: {
    Toolbar,
    Profile
  }
};
</script>
```

## Sidebar

#### Import:
**import Sidebar from '@/utils/app/components/Sidebar.vue'**

### Props:

<!-- @vuese:[name]:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|source|-|`String`|`false`|-|
|title|-|`String`|`false`|''|
|titleLink|-|`String`|`false`|'/'|
|showLogo|-|`Boolean`|`false`|true|
|logo|-|`String`|`false`|'vue-crud-avatar.png'|
|logoSize|-|`Number`|`false`|50|
|navColor|-|`String`|`false`|''|
|titleColor|-|`String`|`false`|'secondary'|
|titleDark|-|`Boolean`|`false`|true|
|sidebarColor|-|`String`|`false`|'white'|
|sidebarDark|-|`Boolean`|`false`|false|
|items|-|`Array`|`false`||
|expandOn|-|`String`|`false`|'mouseover'|
|lockSidebarBtn|-|`Boolean`|`false`|true|

<!-- @vuese:[name]:props:end -->

### Slots:

<!-- @vuese:[name]:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|nav|-|-|
|over|-|-|
|under|-|-|

<!-- @vuese:[name]:slots:end -->

### Example:

``` html
<template>
  <div>
    <sidebar
      :items="sidebarItems"
      expand-on="click"
      :lock-sidebar-btn="true"
    >
      <template slot="title">
        <v-list-item-action>
          <v-icon color="primary">person</v-icon>
        </v-list-item-action>
        <v-list-item-title>{{ userInfo.name }}</v-list-item-title>
      </template>
      <template slot="over"></template>
      <template slot="under"></template>
    </sidebar>
  </div>
</template>

<script>
import Sidebar from "@/utils/app/components/Sidebar.vue";
import { mapGetters } from "vuex";

export default {
  name: "app",
  data: () => ({
    profile: true,
    footer: true,
    sidebarItems: [
        {
            icon: "people",
            text: "crm.name",
            model: false,
            guard: "CRM",
            route: "/crm",
            children: [{
                    text: "crm.companies",
                    route: "/companies"
                },
                {
                    text: "crm.companyTypes",
                    route: "/company-types"
                },
            ]
        },
        {
            icon: "person_add_disabled",
            text: "admin.name",
            model: false,
            guard: "ADMIN",
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
    ]
  }),
  computed: {
    ...mapGetters("auth", ["userInfo"])
  },
  components: {
    Sidebar
  }
};
</script>
```

## Footer

### Import:
**import Footnote from '@/utils/app/components/Footnote.vue'**

### Props:

<!-- @vuese:footnote:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|color|-|`String`|`false`|'secondary'|
|dark|-|`Boolean`|`false`|true|

<!-- @vuese:footnote:props:end -->

### Slots:

<!-- @vuese:footnote:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|left|-|-|
|center|-|-|
|right|-|-|

<!-- @vuese:footnote:slots:end -->

### Example:

``` html
<template>
  <div>
    <footnote v-if="footer">
      <template slot="left"></template>
      <template slot="center"></template>
      <template slot="right"></template>
    </footnote>
  </div>
</template>

<script>
import Footnote from "@/utils/app/components/Footnote.vue";

export default {
  name: "app",
  data: () => ({
    footer: true,
  }),
  components: {
    Footnote
  }
};
</script>
```

## Back to top

### Import:
**import BackTop from '@/utils/app/components/BackTop.vue'**

### Props:

<!-- @vuese:backTop:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|speed|-|`Number`|`false`|0.1|

<!-- @vuese:backTop:props:end -->

### Slots:

<!-- @vuese:backTop:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:backTop:slots:end -->

### Example:

``` html
<template>
  <div>
    <back-top></back-top>
  </div>
</template>

<script>

import BackTop from '@/utils/app/components/BackTop.vue'

export default {
  components: {
    BackTop
  }
}

</script>
```

## Alerts

#### Import:
**import AlertBox from "@/utils/app/components/AlertBox.vue"**

### Example:

``` html
<template>
  <div>
    <v-content class="content">
      <v-container fluid fill-height class="main-container">
        <v-layout style="width:100%">
          <v-flex xs12>
            <v-card blue flat class="main-card">
              <v-card-text class="content-container">

                <router-view style="margin: 0 auto;"></router-view>

                <alert-box></alert-box>

              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import AlertBox from "@/utils/app/components/AlertBox.vue";

export default {
  name: "app",
  components: {
    AlertBox,
  }
};
</script>
```