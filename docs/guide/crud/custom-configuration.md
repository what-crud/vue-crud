# Custom configuration

## Primary key
The CRUD mechanism requires the supported table to contain the primary key. Ie. that the API, by sending data to the table, must also include in it a column that is the primary key. Thanks to this after clicking, for example, editing or deleting the key record 43, an appropriate request will be sent to the API (eg DELETE or PUT http://127.0.0.1/api/automotive/car-brands/43), thanks to which the backend application will know what to do.\
By default primary key column is `id`. That's why in last example primary key wasn't defined.\
If the primary key in your table is called differently (eg. 'CODE'), you must pass it as a parameter to the Crud component:
``` html
<template>
  <crud
    ...
    primary-key="CODE"
  >
  </crud>
</template>
```

## Delete mode
Vue CRUD supports 2 (or 3) delete modes:
- soft,
- hard,
- both

By default, the soft mode is set. This means that a record activation/deactivation button will appear next to each record, and a filter of active/inactive records will appear above the table. If soft mode is enabled, the record activity will be determined from the **active** column (bit/boolean) in the object sent by the API.\
To enable hard delete mode you must pass `deleteMode` parameter to the Crud component:
``` html
<template>
  <crud
    ...
    delete-mode="hard"
  >
  </crud>
</template>
```
Then, instead of the activation/deactivation button, the delete record button will be linked to the DELETE method in the API.

Set `deleteMode` to **both** if you want to show both activation/deactivation and delete button. If you don't want to show any button, set `deleteMode` to **none**.

## Activity column name
If the activity column is called differently (eg. 'ACTIVE' or 'activity' or 'opened'), you must pass `activeColumnName` to the Crud component:
``` html
<template>
  <crud
    ...
    active-column-name="opened"
  >
  </crud>
</template>
```

## Large table
If you want to manage a relatively small table, such as a list of all car brands, then the most efficient solution is to download the entire table when loading the page and managing it (sorting, filtering, pagination, etc.) on the client's side. But if the table you want to display is too big to download completely, you have to solve the problem by downloading only part of the records (selected page, with a given number of records on the page and specific filters and sorting).\
To enable server-side table management, pass the `mode` parameter to the component with **ServerSide** value:
``` html
<template>
  <crud
    ...
    mode="ServerSide"
  >
  </crud>
</template>
```
::: warning
Getting data in server-side mode is not done using the GET method but using the following path:\
POST [url]/[api path]/[module path]/[table path]/async (eg. POST http://127.0.0.1/api/automotive/offers/async). This is due to the fact that many parameters must be included in the query, such as:
- sorting by a specific column,
- sorting direction,
- page,
- rows per page,
- filters
:::
