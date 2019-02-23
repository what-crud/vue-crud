<p align="center">
  <img width="300" height="auto" src="https://user-images.githubusercontent.com/18534115/49319435-29ccf000-f4fd-11e8-9fc6-8678864132bd.png">
</p>
<h1 align="center">Vue CRUD</h1>
<div align="center">
  <a><img alt="price" src="https://img.shields.io/badge/price-FREE-blue.svg"></a>
  <a><img alt="license" src="https://img.shields.io/badge/license-MIT-brightgreen.svg"></a>
  <a><img alt="version" src="https://img.shields.io/badge/version-v0.9.0-yellow.svg"></a>
  <a><img alt="PRs" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
</div>

<h4 align="center">Vue.js based REST-ful CRUD system.</h4>

* Vue CRUD allows to create both a mechanism for managing a single table, as well as a CMS or extended CRM with a login system and modules
* Application built with Vue CRUD is SPA (Single Page Application) so it works much faster than apps based on Wordpress, Joomla, etc.
* Vue CRUD uses the vue along with its ecosystem (Vuex, Vuetify, etc). Enjoy the benefits of the most popular JS framework in the world.
* The application architecture is adapted to work with REST API

![vue-crud](https://user-images.githubusercontent.com/18534115/50497274-5b6ea380-0a36-11e9-8dd6-2a7bc6875fe6.gif)

## Documentation
To check out docs, visit :
#### <a href="https://vue-crud.github.io/" target="_blank">vue-crud.github.io</a>.

## Demo version

#### <a href="http://vue-crud-simple.id-a.pl" target="_blank">Simple CRUD demo</a>

#### <a href="http://vue-crud-crm.id-a.pl" target="_blank">CRM demo</a>
Credentials with limited privileges (readonly):\
Login:  guest@vue.crud\
Pass:   ajSGenC0\
To get full user account, contact me on my <a href="http://id-a.pl" target="_blank">company site</a>.

## Functions
Vue CRUD provides a set of utitlities, from which you can compose your own application. Features included in the system can communicate with each other thanks to the use of the Vuex library. Vue CRUD includes the following elements:

- CRUD,
- Authentication system:
  - login form (built-in communitation with API, validation),
  - optional locale selection,
  - redirecting to the app,
- App layuout components:
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

The CRUD is a mechanism for managing the database tables. Included CRUD system allows the following operations:

* Store,
* Update,
* Suspend/Restore,
* Delete,
* Multiple update,
* Multiple Suspend/Restore,
* Multiple Delete

The record creation / editing form supports the following types of fields:

* Input,
* Number,
* Decimal
* Textarea,
* Rich Text Box,
* Select (list from related table),
* Datepicker,
* Timepicker,
* Checkbox,
* Files

Datatable is available in 2 versions:
* Client side (small tables < 2000 records)
* Server side (> 2000 records)

Each version has its own filtering system:
* Show active/inactive records,
* Search phrase in whole table,
* Search phrase in selected column (exact, like and list mode)

Another functions and features:
* datatable mechanism allows selection of the number of records per page, page transition and sorting,
* management of a child table from the parent table module,
* language versions,
* simple configuration of themes,

## Quick start

Do you want to test the application quickly, and you do not have a ready API? No problem, you can use the ready-made example in the **examples** folder. The API for this example is available on the internet, so you can connect to it by entering its address in the configuration file.

### Steps

- Select template from **examples** folder you want to use, e.g. **examples/simple-crud**. Then:
- Copy **examples/simple-crud/public** folder to the root directory,
- Copy the rest of files and folders (**config**, **locales**, **routes**, **main.js**, **router.js**) from **examples/simple-crud** folder to the **src** directory,
- If you have your own API prepared, modify **src/config/api.js** file,
- Type following commands:

``` console
yarn
:: or
npm install
```
and then:
``` console
yarn serve
:: or
npm run serve
```
... and your app is already running (probably at http://localhost:8080).

## API
The application requires a connection with the appropriate API. API can be created in any technology - the condition is its compliance with the Vue CRUD communication specification. If you need to create your API and do not know how to get started, and you don't mind PHP and Laravel, download or clone the <a href="https://github.com/szczepanmasny/vue-crud-laravel-api" target="_blank">Vue CRUD Laravel API project</a>.

## Contributing
If you have an idea about improving Vue CRUD, do not hesitate.

Developers interested in contributing should read the [Code of Conduct](./CODE_OF_CONDUCT.md).

## License
[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2018-present, Szczepan Masny
