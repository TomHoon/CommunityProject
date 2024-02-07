export default {
  setToken(state, token) {
    state.token = token;
  },
  setId(state, id) {
    state.id = id;
  },
  setProfile_nickname(state, profile_nickname) {
    state.profile_nickname = profile_nickname;
  },
  setProfile_image_url(state, profile_image_url) {
    state.profile_image_url = profile_image_url;
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