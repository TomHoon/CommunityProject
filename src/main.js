import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from '@/router.js'
import GlobalJs from '@/js/global.js'

// 전역 컴포넌트 등록
import Login from '@/components/member/Login'
import Agreement from '@/components/member/Agreement'
import Join from '@/components/member/Join'
import Board from '@/components/board/Board'
import BoardWrite from '@/components/board/BoardWrite'
import BoardDetails from '@/components/board/BoardDetails'

const store = createStore({
    state() {
        return {
            mainLayer: [
                {pageName: 'Login', pageInfo: {temp: '1234'}, transferObj: {test: '1'}}
            ]
        };
    }
});

const app = createApp(App);
app.component('Login', Login);
app.component('Agreement', Agreement);
app.component('Join', Join);
app.component('Board', Board);
app.component('BoardWrite', BoardWrite);
app.component('BoardDetails', BoardDetails);

app.use(router);
app.use(store);
app.use(GlobalJs);
app.mount('#app');
