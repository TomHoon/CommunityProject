import store from '@/main'
import { checkToken } from '@/api/index';
import { deleteCookie } from '@/utils/cookies'


export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(async function (config) {
    // Do something before request is sent
    config.headers.Authorization = store.state.token;
    
    if( config.headers.requiresToken) {

      const pushContent = window.$app.config.globalProperties.$pushContents;
      const res = await checkToken(store.state.id, store.state.token)
      
      if(res.data !== "유효한 토큰입니다"){
        alert("잘못된 토큰입니다")
        // this.$pushContents('Login')
        store.commit('clearId') 
        store.commit('clearToken')
        deleteCookie("token")
        deleteCookie("id")
        pushContent('Login')

        // return Promise.reject(new Error("Invalid token"))
        throw new Error("Invalid token")
      }
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  return instance
}