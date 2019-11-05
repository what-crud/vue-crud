const getters = {
  lng: state => (state.locale != null ? state.locale : state.defaultLocale),
}

export default getters
