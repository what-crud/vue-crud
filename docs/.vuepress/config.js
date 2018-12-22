module.exports = {
  title: 'Vue CRUD',
  description: 'Vue.js based REST-ful CRUD application',
  head: [
    ['link', { rel: 'icon', href: '/images/icon/favicon.png' }]
  ],
  themeConfig: {
    logo: '/images/logo/vue-crud-sm.png',
    nav: [
      {
        text: 'Guide',
        link: '/guide/essentials/introduction'
      },
      {
        text: 'API',
        link: '/api/api/getting-started'
      },
      {
        text: 'Demo',
        link: 'http://crud.id-a.pl'
      },
      {
        text: 'Ecosystem',
        items: [
          {
            text: 'Vue.js',
            link: 'https://vuejs.org/'
          },
          {
            text: 'Vuex',
            link: 'https://vuex.vuejs.org/'
          },
          {
            text: 'Vuetify',
            link: 'https://vuetifyjs.com/en/'
          },
          {
            text: 'Laravel',
            link: 'https://laravel.com/'
          },
        ]
      },
      {
        text: 'Github',
        link: 'https://github.com/szczepanmasny/vue-crud'
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Essentials',
          collapsable: false,
          children: [
            '/guide/essentials/introduction',
            '/guide/essentials/installation',
            '/guide/essentials/configuration',
          ]
        },
        {
          title: 'Modules',
          collapsable: false,
          children: [
            '/guide/modules/router',
            '/guide/modules/home-page',
            '/guide/modules/admin-module',
            '/guide/modules/creating-own-modules',
          ]
        },
        {
          title: 'Table management',
          collapsable: false,
          children: [
            '/guide/table-management/basics',
            '/guide/table-management/large-tables',
            '/guide/table-management/extended-details',
            '/guide/table-management/item-elements',
          ]
        },
      ],
      '/api/': [
        {
          title: 'API',
          collapsable: false,
          children: [
            '/api/api/getting-started',
          ]
        },
      ],
      // fallback
      '/': [
        '',
      ]
    }
  }
}
