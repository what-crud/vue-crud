const env = require('./env');

module.exports = {
  ...env.config,
  serviceWorker: true,
  title: 'Vue CRUD',
  description: 'Vue.js based REST-ful CRUD system',
  plugins: {
    ...env.plugins,
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        message: "New content is available.",
        buttonText: "Refresh"
      }
    }
  },
  head: [
    ['link', {
      rel: 'icon',
      href: '/images/icon/favicon.png'
    }],
    ['link', {
      rel: 'manifest',
      href: '/manifest.json'
    }],
    ['meta', {
      name: 'theme-color',
      content: '#3eaf7c'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }],
    ['link', {
      rel: 'apple-touch-icon',
      href: '/icons/apple-touch-icon-152x152.png'
    }],
    ['link', {
      rel: 'mask-icon',
      href: '/icons/safari-pinned-tab.svg',
      color: '#3eaf7c'
    }],
    ['meta', {
      name: 'msapplication-TileImage',
      content: '/icons/msapplication-icon-144x144.png'
    }],
    ['meta', {
      name: 'msapplication-TileColor',
      content: '#000000'
    }],
  ],
  themeConfig: {
    serviceWorker: {
      updatePopup: {
        message: "New content is available.",
        buttonText: "Refresh"
      }
    },
    logo: '/images/logo/vue-crud-sm.png',
    nav: [{
        text: 'Guide',
        link: '/guide/essentials/introduction'
      },
      {
        text: 'API',
        link: '/api/rest/getting-started'
      },
      {
        text: 'Demo',
        link: '/guide/essentials/introduction#demo-version'
      },
      {
        text: 'Ecosystem',
        items: [{
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
          {
            text: 'VuePress',
            link: 'https://vuepress.vuejs.org/'
          }
        ]
      },
      {
        text: 'GitHub',
        link: 'https://github.com/szczepanmasny/vue-crud'
      },
    ],
    sidebar: {
      '/guide/': [{
          title: 'Essentials',
          collapsable: false,
          children: [
            '/guide/essentials/introduction',
            '/guide/essentials/installation',
            '/guide/essentials/configuration',
          ]
        },
        {
          title: 'Components',
          collapsable: false,
          children: [
            '/guide/components/auth',
            '/guide/components/app',
            '/guide/components/crud',
          ]
        },
        {
          title: 'CRUD',
          collapsable: false,
          children: [
            '/guide/crud/basics',
            '/guide/crud/custom-configuration',
            '/guide/crud/field-options',
            '/guide/crud/items-view',
            '/guide/crud/extended-details',
            '/guide/crud/item-elements',
          ]
        },
        {
          title: 'Cookbook',
          collapsable: false,
          children: [
            '/guide/cookbook/getting-started',
            '/guide/cookbook/authentication',
            '/guide/cookbook/application-layout',
            '/guide/cookbook/routing',
            '/guide/cookbook/modules',
          ]
        },
      ],
      '/api/': [{
        title: 'REST',
        collapsable: false,
        children: [
          '/api/rest/getting-started',
          '/api/rest/authentication',
          '/api/rest/profile',
          '/api/rest/crud',
        ]
      }, 
      {
        title: 'GraphQL',
        collapsable: false,
        children: []
      },],
      // fallback
      '/': [
        '',
      ]
    }
  }
}