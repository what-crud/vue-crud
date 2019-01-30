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
  sidebarExpandOn: configParams.sidebarExpandOn || 'mouseover',
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
  filesPath: configApi.url + configApi.path.storage,
  uploadPath: configApi.url + configApi.path.default + '/' + configApi.path.upload,
  logoLg: configParams.logoLg,
  logoSm: configParams.logoSm,
  sidebarItems: configParams.sidebarItems,
  footer: configParams.footer,
  footerText: configParams.footerText
}

export default state