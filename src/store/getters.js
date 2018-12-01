let getters = {
  lng: state => state.locale != null ? state.locale : 'en',
}

export default getters
