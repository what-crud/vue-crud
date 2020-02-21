

<p align="center">
  <img width="300" height="auto" src="https://user-images.githubusercontent.com/18534115/49319435-29ccf000-f4fd-11e8-9fc6-8678864132bd.png">
</p>
<h1 align="center">Vue CRUD</h1>
<div align="center">
  <a><img alt="license" src="https://img.shields.io/badge/license-MIT-brightgreen.svg"></a>
  <a><img alt="version" src="https://img.shields.io/badge/version-v0.15.2-yellow.svg"></a>
  <a><img alt="build" src="https://travis-ci.org/what-crud/vue-crud.svg?branch=master"></a>
  <a><img alt="PRs" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
  <a><img alt="Gitpod Ready-to-Code" src="https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod"></a>
</div>

<h4 align="center">Vue.js based REST-ful CRUD system.</h4>

* Vue CRUD allows to create both a mechanism for managing a single table, as well as a CMS or extended CRM with a login system and modules
* Application built with Vue CRUD is SPA (Single Page Application) so it works much faster than apps based on Wordpress, Joomla, etc.
* Vue CRUD uses the vue along with its ecosystem (Vuex, Vuetify, etc). Enjoy the benefits of the most popular JS framework in the world.
* The application architecture is adapted to work with REST API

![Vue CRUD demo](https://user-images.githubusercontent.com/18534115/55162114-646f2e00-5167-11e9-8948-c4fc964daa28.gif)

## Functions
Vue CRUD provides a set of utilities, from which you can compose your own application. Features included in the system can communicate with each other thanks to the use of the Vuex library. Vue CRUD includes the following elements:

- **CRUD** | <a href="http://vue-crud-demo.id-a.pl/#/crud" target="_blank">DEMO / SANDBOX</a>:
  - operations on records:
    - Store,
    - Update,
    - Suspend/Restore,
    - Delete,
    - Multiple update,
    - Multiple Suspend/Restore,
    - Multiple Delete
  - filtering:
    - Show active/inactive records,
    - Search phrase in whole table,
    - Search phrase in selected column (exact, like and list mode)
  - items view versions:
    - client side (small tables),
    - server side (big tables)
  - items view types:
    - table,
    - **NEW!** tree
  - other functions and features:
    - datatable mechanism allows selection of the number of records per page, page transition and sorting,
    - management of a child table from the parent table module,
    - export to excel (xlsx),
    - table refreshing,
- **Authentication system** | <a href="http://vue-crud-demo.id-a.pl/#/login" target="_blank">DEMO / SANDBOX</a>:
  - login form (built-in communication with API, validation),
  - optional locale selection,
  - redirecting to the app,
- **App layout components** | <a href="http://vue-crud-demo.id-a.pl/#/app" target="_blank">DEMO / SANDBOX</a>:
  - Toolbar (with optional elements):
    - title,
    - logo,
    - user profile,
    - locale selection,
    - logout,
    - slots for developer
  - Sidebar:
    - List of routes,
    - Slot for title or user avatar,
    - Slot for developer,
    - Customizable sidebar behaviour
  - Alerts system,
  - Footer,
  - ... and others

The record creation / editing form supports the following types of fields:

* Input,
* Number,
* Decimal
* Textarea,
* Rich Text Box,
* Select (hardcoded list or obtained from API),
* Datepicker,
* Timepicker,
* Checkbox,
* Files,
* **NEW!** Dynamic (user can select field type separately for each record),
* **NEW!** Custom (with slots)

## Support for mobile devices

### App layout on desktop...
 <img
  width="auto"
  height="400"
  src="https://user-images.githubusercontent.com/18534115/68077595-9fed6d00-fdc6-11e9-9e52-37dad9bb4bc1.png"
  alt="app layout on desktop"
/>

### ... and on mobile device
 <img
  width="auto"
  height="400"
  src="https://user-images.githubusercontent.com/18534115/68077552-3ff6c680-fdc6-11e9-9b8c-3e92dce596c5.png"
  alt="app layout on mobile device"
/>


## Demo versions

#### <a href="http://vue-crud-demo.id-a.pl" target="_blank">DEMO / SANDBOX</a>

#### <a href="http://vue-crud-crm.id-a.pl" target="_blank">CRM DEMO</a>
Credentials with limited privileges (readonly):\
Login:  guest@vue-crud.com\
Pass:   ajSGenC0\
To get full user account, contact me on my <a href="http://id-a.pl" target="_blank">company site</a>.

## Quick start

Do you want to test the application quickly, and you do not have an API ready? No problem, you can use the ready-made example in the **examples** folder. The API for this example is available on the internet, so you can connect to it by entering its address in the configuration file.

### Steps

1. Clone Vue CRUD:
``` console
git clone git@github.com:what-crud/vue-crud.git
```
2. Type following commands:
``` console
yarn
:: or
npm install
```
3. Choose one of the following templates:
- `empty`,
- `simple-crud`,
- `sandbox`,
- `crm`,
- `cms`

...and type e.g.:
``` console
yarn load-template simple-crud
:: or
npm run load-template simple-crud
```
4. If you have your own API prepared, modify **src/config/api.js** file.

5. Serve your app:
``` console
yarn serve
:: or
npm run serve
```
6. Your app is already running (probably at http://localhost:8080).

### Usage

The simplest possible code that supports CRUD operations for one table will look something like this:
``` html
<template>
  <div>
    <crud
      :prefix="prefix"
      :path="path"
      :page-title="pageTitle"
      :fields-info="fieldsInfo"
      :details-title="$t('detailsTitle')"
    >
    </crud>
    <alert-box></alert-box>
  </div>
</template>

<script>
  import Crud from '@/utils/crud/components/Crud.vue'
  import AlertBox from "@/utils/app/components/AlertBox.vue";
  export default {
    data() {
      return {
        prefix: 'demo',
        path: 'tasks',
        pageTitle: 'demo.tasks',
      }
    },
    computed: {
      fieldsInfo() {
        return [{
            text: this.$t('fields.id'),
            name: 'id',
            details: false,
          },
          {
            type: 'input',
            column: 'name',
            text: this.$t('fields.name'),
            name: 'name',
            multiedit: false
          },
          {
            type: 'input',
            column: 'description',
            text: this.$t('fields.description'),
            name: 'description',
            required: false
          },
        ]
      },
    },
    components: {
      Crud,
      AlertBox,
    },
    i18n: {
      messages: {
        en: {
          detailsTitle: 'Task',
          fields: {
            id: 'Id',
            name: 'Name',
            description: 'Description'
          }
        }
      }
    },
  }
</script>
```

## API
The application requires a connection with the appropriate API. API can be created in any technology - the condition is its compliance with the Vue CRUD communication specification. If you need to create your API and do not know how to get started, and you don't mind PHP and Laravel, download or clone the <a href="https://github.com/oh-crud/laravel-crud-api" target="_blank">Laravel CRUD API</a> project.

## Documentation
To check out docs, visit :
#### <a href="https://vue-crud.github.io/" target="_blank">vue-crud.github.io</a>.

## Contributing
If you have an idea about improving Vue CRUD, do not hesitate.

Developers interested in contributing should read the [Code of Conduct](./CODE_OF_CONDUCT.md).

## License
[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2018-present, Szczepan Masny
