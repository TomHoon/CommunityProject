const { defineConfig } = require('@vue/cli-service')

const 사설ip = '192.168.25.28:18080';
const 운영 = 'tomhoon.duckdns.org:18080';
const 개발 = 'localhost:8082';

/**
 * 프론트개발시 - 운영
 * 백엔드개발시 - 개발
 * 튜브만 해당 - 사설ip
 */

const 프로토콜 = {
  API: 'http://',
  WS: 'ws://'
}

const access_point = 개발;  // <-- 🎈🎈 여기만 바꾸면 됨

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '/': {
        target: `${ 프로토콜.API }${ access_point }`,
        changeOrigin: true,
        ws: false
      },
      '/ws/chat': {
        target: `${ 프로토콜.WS }${ access_point }`,
        changeOrigin: true,
        ws: true
      },
    }
  },
})
