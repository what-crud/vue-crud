<p align="center">
  <img width="300" height="auto" src="https://user-images.githubusercontent.com/18534115/49319435-29ccf000-f4fd-11e8-9fc6-8678864132bd.png">
</p>
<h1 align="center">Vue CRUD</h1>
<div align="center">
  <a><img alt="price" src="https://img.shields.io/badge/price-FREE-blue.svg"></a>
  <a><img alt="license" src="https://img.shields.io/badge/license-MIT-brightgreen.svg"></a>
  <a><img alt="version" src="https://img.shields.io/badge/version-v0.8.0-yellow.svg"></a>
  <a><img alt="PRs" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
</div>

<h4 align="center">Vue.js based REST-ful CRUD application.</h4>

* Application is build as SPA (Single Page Application) so it works much faster than apps based on Wordpress, Joomla, etc.
* Vue CRUD uses the vue along with its ecosystem. Enjoy the benefits of the most popular JS framework in the world.
* The application architecture is adapted to work with REST API

![vue-crud](https://user-images.githubusercontent.com/18534115/50497274-5b6ea380-0a36-11e9-8dd6-2a7bc6875fe6.gif)

## Documentation
To check out docs, visit <a href="https://vue-crud.github.io/" target="_blank">vue-crud.github.io</a>.

## Demo version
Here is available <a href="http://crud.id-a.pl" target="_blank">demo application</a>.\
Credentials with limited privileges (readonly):\
Login:  guest@vue.crud\
Pass:   ajSGenC0\
To get full user account, contact me on my <a href="http://id-a.pl" target="_blank">company site</a>.

## Functions
The application contains a mechanism for managing the database tables. After adding table support to crud, the following record operations are possible:

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

## API
The application requires a connection with the appropriate API. API can be created in any technology - the condition is its compliance with the Vue CRUD communication specification. If you need to create your API and do not know how to get started, and you don't mind PHP and Laravel, download or clone the <a href="https://github.com/szczepanmasny/vue-crud-laravel-api" target="_blank">Vue CRUD Laravel API project</a>.

## Contributing
If you have an idea about improving Vue CRUD, do not hesitate.

Developers interested in contributing should read the [Code of Conduct](./CODE_OF_CONDUCT.md).

## License
[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2018-present, Szczepan Masny
