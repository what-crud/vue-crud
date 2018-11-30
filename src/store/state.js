import { config } from '@/config.js'

let state = {
  title: "Vue CRUD",
  locale: 'pl',
  locales: [
    {name: 'pl', text: 'Polski'},
    {name: 'en', text: 'English'}
  ],
  localeSelectable: true,
  primaryColor: 'rgb(52, 73, 94)',
  secondaryColor: 'rgb(65, 184, 131)',
  primaryTheme: 'dark',
  secondaryTheme: 'dark',
  module: null,
  page: null,
  drawer: true,
  activeModule: "",
  profileDialog: false,
  superuser: false,
  historyPermission: true,
  alert: {
    show: false,
    color: '',
    text: '',
    icon: ''
  },
  filesPath: config.api.url + config.api.path.files,
  logoLg: 'vue-crud-lg.png',
  logoSm: 'vue-crud-sm.png'
}

export default state