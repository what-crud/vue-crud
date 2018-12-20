export const config = {
    title: "Vue CRUD",
    api: {
        url: 'http://crm-api.id-a.pl/',
        path: {
            default: 'api',
            files: 'storage/'
        }
    },
    logoLg: 'vue-crud-lg.png',
    logoSm: 'vue-crud-sm.png',
    locales: [
      {name: 'en', text: 'English'},
      {name: 'pl', text: 'Polski'},
    ],
    localeSelectable: true,
    iconfont: 'md',
    primaryTheme: 'dark',
    secondaryTheme: 'dark',
    theme: {
        primary: '#34495e',
        secondary: '#41b883',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    }
}
