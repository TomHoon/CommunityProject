import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from '@/router.js'
import GlobalJs from '@/js/global.js'
import getters from '@/store/getters'
import mutations from '@/store/mutations';
import actions from '@/store/actions'

// 전역 컴포넌트 등록
import Login from '@/components/member/Login'
import Agreement from '@/components/member/Agreement'
import Join from '@/components/member/Join'
import MemberUpdate from '@/components/member/MemberUpdate'
import Board from '@/components/board/Board'
import BoardWrite from '@/components/board/BoardWrite'
import BoardModify from '@/components/board/BoardModify'
import BoardDetails from '@/components/board/BoardDetails'
import Header from '@/components/header/Header'
import HeaderMenu from '@/components/header/HeaderMenu'
import chat from '@/components/chat'
import Comment from '@/components/board/Comment'
import Admin from '@/components/admin/adminMain'

import defaultImg from '@/assets/defaultImg.png'
import { getAuthFromCookie, getUserFromCookie } from '@/utils/cookies'

const store = createStore({
  state() {
    return {
      mainLayer: [
        {pageName: 'Board', pageInfo: {temp: '1234'}, transferObj: {test: '1'}}
      ],
      defaultImgpath : defaultImg,
            
      id : getUserFromCookie() || '',
      token : getAuthFromCookie() || '',

    };
  },
  getters,
  mutations,
  actions,
});

export default store;

const app = createApp(App);

app.component('Header', Header);
app.component('HeaderMenu', HeaderMenu);
app.component('Login', Login);
app.component('Agreement', Agreement);
app.component('Join', Join);
app.component('MemberUpdate', MemberUpdate);
app.component('Board', Board);
app.component('BoardWrite', BoardWrite);
app.component('BoardDetails', BoardDetails);
app.component('BoardModify', BoardModify);
app.component('Chat', chat);
app.component('Admin', Admin)
app.component('Comment', Comment)

app.use(router);
app.use(store);
app.use(GlobalJs);
app.mount('#app');
