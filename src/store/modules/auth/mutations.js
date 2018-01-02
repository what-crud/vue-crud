let mutations = {
  login(state) {
    state.logged = 1;
  },
  logout(state) {
    state.logged = 0;
  }
}
export default mutations
