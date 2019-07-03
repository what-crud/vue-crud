# Getting started

Vue CRUD is an interface-providing system that facilitates operations on tables. This system, of course, doesn't communicate with the database, it only sends and receives requests in accordance with the REST architecture. Therefore, for the application to work properly, the appropriate API must work in addition to the application based on Vue CRUD. The connection configuration with the API has been discussed in the <a href="/guide/essentials/configuration.html#api-configuration" target="_blank">guide</a>.

The API must contain the following elements:
- authentication mechanism,
- user data management,
- methods (list, record details, creating, editing, deleting, etc.) for managing individual tables.

::: tip
API can be created in any technology - the condition is its compliance with the Vue CRUD communication specification. If you need to create your API and do not know how to get started, and you don't mind PHP and Laravel, download or clone the <a href="https://github.com/szczepanmasny/vue-crud-laravel-api" target="_blank">Vue CRUD Laravel API project</a>.
:::

In the following chapters, information on the API construction requirements is described, in particular:
- routes that the API must provide,
- routes naming conventions,
- format of parameters sent by requests to API,
- required API response format.

A header is attached to all requests in the following form:
| Name | Value |
| - | - |
| Authorization | Bearer `token` |

Where the `token` is the token returned by the API during login.

::: tip EXPLANATION
In the text, some items will be marked with asterisks. Below is their explanation:

(*)  - API URL, e.g. https://your-site.com/api
(**) - File uploading URL, e.g. https://your-site.com/api/files/file-upload
:::

