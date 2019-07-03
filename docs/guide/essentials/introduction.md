---
sidebarDepth: 2
---

# Introduction

## About

### What is Vue CRUD?

Vue CRUD is a system based on Vue.js, Vuex and Vuetify. It can used to create applications such as CRMs and CMSs based on CRUD (create, read update, and delete). The application created with the help of Vue CRUD works as a SPA (Single Page Application) and communicates with the server via the API.

### Functions

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
  - versions:
    - client side (small tables < 2000 records)
    - cerver side (> 2000 records)
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
* Select (list from related table),
* Datepicker,
* Timepicker,
* Checkbox,
* Files

## Demo

- **<a href="http://vue-crud-simple.id-a.pl" target="_blank">Simple CRUD demo</a>**
- **<a href="http://vue-crud-crm.id-a.pl" target="_blank">CRM demo</a>**\
    Credentials with limited privileges (readonly):\
    Login:  guest@vue-crud.com\
    Pass:   ajSGenC0\
    To get full user account, contact me (Szczepan Masny) on my
    <a href="http://id-a.pl" target="_blank">company site</a>.

## License
[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2018-present, Szczepan Masny