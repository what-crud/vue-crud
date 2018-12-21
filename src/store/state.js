import { configApi } from '@/config/api.js'
import { configParams } from '@/config/params.js'

let state = {
  title: configParams.title,
  locale: localStorage.getItem('locale'),
  locales: configParams.locales,
  localeSelectable: configParams.localeSelectable,
  primaryTheme: configParams.primaryTheme,
  secondaryTheme: configParams.secondaryTheme,
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
  filesPath: configApi.url + configApi.path.files,
  logoLg: configParams.logoLg,
  logoSm: configParams.logoSm
}

export default state