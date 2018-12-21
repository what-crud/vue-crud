import { configParams } from '@/config/params.js'

let getters = {
  lng: state => state.locale != null ? state.locale : configParams.defaultLocale,
}

export default getters
