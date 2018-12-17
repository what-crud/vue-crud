# Configuration

## API

First of all you must define the path to your API. To do this, you have to create config.js file in src folder.

``` js{3,5-6}
export const config = {
    api: {
        url: '', /* Your API domain, eg. http://127.0.0.1:8000/ */
        path: {
            default: 'api', /* path to API on defined domain. The 'api' value means that appplication will be request to address: http://127.0.0.1:8000/api */
            files: 'storage/' /* path to file storage on defined domain */
        }
    }
}
```

## Theme
You can configure your own theme

``` js{4-6}
Vue.use(Vuetify, {
  theme: {
    primary: '#34495e',
    secondary: '#41b883',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
```