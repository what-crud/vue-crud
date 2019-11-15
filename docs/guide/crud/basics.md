# Basics

## About CRUD
CRUD is an abbreviation of the 4 most popular operations performed on tables: Create, Read, Update and Delete. The core of this application is a system that makes it very easy to perform these operations (and several others) on tables from your database. In the **src/crud** and **store/modules/crud** location there is a system that will perform for you all operations that are needed to manage the table, i.e. download a list of records from a given table, generate a table, sort, filter, retrieve record details, send a foundation request/editing the record, etc.

## Example
If you have read the previous chapters and have already done the steps described in them, then you should have created your own module with several nested paths. Let's assume that you created the *automotive* module and in it you added your CRUD system to manage the *car_brands* table. Your CRUD should be located in the file `src/routes/main/routes/automotive/routes/car-brands/Index.vue` and it should look like that:

``` html
<template>
  <crud
    :prefix="prefix"
    :path="path"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    :details-title="$t('detailsTitle')"
  >
  </crud>
</template>

<script>
  import Crud from '@/utils/crud/components/Crud.vue'

  export default {
    data() {
      return {
        prefix: 'automotive', /* API path prefix */
        path: 'car-brands', /* path to your REST API controller */
        pageTitle: 'automotive.carBrands', /* parameter in src/locales/[locale]/routes.js file */
      }
    },
    computed: {
      fieldsInfo () {
        return [
          {
            text: this.$t('fields.id'),
            name: 'id',
            details: false,
          },
          {
            type: 'input',
            column: 'name',
            text: this.$t('fields.name'),
            name: 'name'
          },
          {
            type: 'input',
            column: 'country',
            text: this.$t('fields.country'),
            name: 'country'
          },
          {
            type: 'input',
            column: 'establishment_year',
            text: this.$t('fields.establishmentYear'),
            name: 'establishment_year'
          },
        ]
      },
    },
    components: {
      Crud
    },
    i18n: {
      messages: {
        pl: {
          detailsTitle: 'Marka samochodu',
          fields: {
            id: 'Id',
            name: 'Nazwa',
            country: 'Kraj',
            establishmentYear: 'Rok powstania'
          }
        },
        en: {
          detailsTitle: 'Car brands',
          fields: {
            id: 'Id',
            name: 'Name',
            country: 'Country',
            establishmentYear: 'Year of establishment'
          }
        }
      }
    },
  }
</script>
```
As a result, after entering such a defined page, the user will see a table with a list of car brands downloaded from the API. Above the table on the left side there will be buttons for managing table contents, and filters will appear on the right.\
Assuming that in the configuration file api.js we have defined the `url` as **http://127.0.0.1:8000/** and the `path.default` parameter as **api**, then the address for the car brands controller in the API will look like this:\
**http://127.0.0.1:8000/api/automotive/car-brands**

According to the REST rules, the API should be structured as follows:
| METHOD    | ADDRESS   | RESOURCE                  |
|-----------|-----------|---------------------------|
| GET       | /         | get table data            |
| GET       | /{id}     | get {id} record details   |
| PUT       | /{id}     | edit {id} record          |
| POST      | /         | store new record          |
| DELETE    | /{id}     | delete {id} record        |