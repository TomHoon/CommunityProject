import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router.js'
import { createStore } from 'vuex'
import Login from '@/components/Login'
import GlobalJs from '@/js/global.js'

const store = createStore({
    state() {
        return {
            mainLayer: []
        };
    }
});

const app = createApp(App);
app.component('Login', Login);
app.use(router);
app.use(store);
app.use(GlobalJs);
app.mount('#app');
