import { config } from '@/config.js'

let state = {
  title: "Vue CRUD",
  locale: localStorage.getItem('locale'),
  locales: [
    {name: 'en', text: 'English'},
    {name: 'pl', text: 'Polski'},
  ],
  localeSelectable: true,
  primaryTheme: 'dark',
  secondaryTheme: 'dark',
  module: null,
  page: null,
  sidebarMini: true,
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