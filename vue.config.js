const { defineConfig } = require('@vue/cli-service')

const 사설ip = 'http://192.168.25.28:18080';
const 운영 = 'http://tomhoon.duckdns.org:18080';
const 개발 = 'http://localhost:8082';

/**
 * 프론트개발시 - 운영
 * 백엔드개발시 - 개발
 * 튜브만 해당 - 사설ip
 */

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '/': {
        target: 운영,
        ws: true
      }
    }
  },
})
