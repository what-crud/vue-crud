import { config } from '@/config.js'

let state = {
  title: config.title,
  locale: localStorage.getItem('locale'),
  locales: config.locales,
  localeSelectable: config.localeSelectable,
  primaryTheme: config.primaryTheme,
  secondaryTheme: config.secondaryTheme,
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
  logoLg: config.logoLg,
  logoSm: config.logoSm
}

export default state