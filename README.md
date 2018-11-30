<p align="center">
  <img width="460" height="300" src="https://user-images.githubusercontent.com/18534115/49319435-29ccf000-f4fd-11e8-9fc6-8678864132bd.png">
</p>

# Vue - based REST-ful CRUD application

> CRUD application written using Vue2, Vuex and Vuetify. The app uses REST API and JWT Tokens.
> Demo application is available [here](http:/crud.id-a.pl). To get login and password, contact me on my [personal site](http:/szczepanmasny.pl) or [company site](http://id-a.pl).

## Functions

The application contains a mechanism for managing the database tables. After adding table support to crud, the following record operations are possible:

* Store,
* Update,
* Suspend/Restore,
* Delete,
* Multiple Suspend/Restore,
* Multiple Delete

The record creation / editing form supports the following types of fields:

* Input,
* Textarea,
* Rich Text Box,
* Select,
* Datepicker,
* Timepicker

## Table management

Servicing the table requires creating a component with the configuration of the given table (field names and types, information about soft or hard deletion of records, reference to the source table in the case of foreign keys, etc.). Next and last step is to add routing to a given page and put a link to it in the sidebar.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

