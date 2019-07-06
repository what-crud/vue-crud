# Installation

::: warning COMPATIBILITY NOTE
Vue CRUD requires Node.js >= 8.
:::

## Creating a new project

Vue CRUD is an application template, not a library, so it can not be added as a library in dependencies.\
To set up a new project, you must download it or clone from the <a href="https://github.com/szczepanmasny/vue-crud" target="_blank">repository on GitHub</a>.

## Dependencies installation

Before you start working on a project, you need to install dependencies from the package.json file in your project. To do this, use the command line to enter the project location, and then enter one of the following commands:

```
npm install
# or
yarn
```

::: warning
To use 'yarn' command you must have <a href="https://yarnpkg.com/en/" target="_blank">yarn</a> installed.
:::

## Quick start

Do you want to test the application quickly, and you do not have an API ready? No problem, you can use the ready-made example in the **examples** folder. The API for this example is available on the internet, so you can connect to it by entering its address in the configuration file.

### Steps

1. Clone Vue CRUD:
``` console
git clone git@github.com:szczepanmasny/vue-crud.git
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

## API

By default, the examples in Vue CRUD connect to the existing API at http://crm-api.id-a.pl. You can create your own API or use the examples created by What CRUD !. At the moment the version created in PHP and Laravel is available:

<a href="https://github.com/what-crud/laravel-crud-api" target="_blank">Laravel CRUD API</a>

Steps:
1. Clone or download this project,
2. Open command line and go to the project directory,
3. Type:
```
composer install
```
4. Create database(s) for your project,
5. Create .env file based on .env.example and configure your project,
6. Type:
```
php artisan key:generate
```
7. Type:
```
php artisan load-template
```
and select one of available templates

8. Type:
```
php artisan migrate
```
9. Run seeders if available,
10. Type:
```
php artisan serve
```

Change api.js file in src/config directory:

**src/config/api.js:**
``` js
export const api = {
    url: 'http://127.0.0.1:8000/',
    path: {
        default: 'api',
        storage: 'storage/',
        upload: 'files/file-upload'
    }
}
```

