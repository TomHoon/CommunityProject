const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    // 💕운영
    proxy: 'http://gnsdl2846.cafe24.com' 

    // 💕개발
    // proxy: 'http://localhost:8081' 
  }
})
