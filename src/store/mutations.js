export default {
  setToken(state, token) {
    state.token = token;
  },
  setId(state, id) {
    state.id = id;
  },
  clearId(state){
    state.id = '';
  },
  clearToken(state){
    state.token = '';
  },
  clearUserAll(state){
    state.token = '';
    state.id = '';
  },
}