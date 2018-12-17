module.exports = {
  title: 'Vue CRUD',
  description: 'Just playing around',
  themeConfig: {
    logo: '/images/logo/vue-crud-sm.png',
    nav: [
      {
        text: 'Guide',
        link: '/guide/'
      },
      {
        text: 'API',
        link: '/api/'
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
            '/guide/essentials/introduction',
            '/guide/essentials/installation',
            '/guide/essentials/configuration',
          ]
        },
        {
          title: 'Table management',
          collapsable: false,
          children: [
            '/guide/essentials/introduction',
            '/guide/essentials/installation',
            '/guide/essentials/configuration',
          ]
        },
      ],

      '/api/': [
        '',
        'three',
        'four'
      ],
      // fallback
      '/': [
        '',
      ]
    }
  }
}
