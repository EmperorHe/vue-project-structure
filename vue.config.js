const path = require('path') // 导入Node的path模块

// 解析函数，在配置引入别名时用到
function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js的主体配置
module.exports = {
  publicPath: '/', // 部署应用包时的基本 URL。用法和 webpack 本身的 output.publicPath 一致。
  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
  assetsDir: 'assets', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  css: { // 对css的一些配置
    extract: true, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    sourceMap: false, // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
  },
  lintOnSave: process.env.NODE_ENV === 'development', // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
  devServer: { // 服务相关的设置
    host: '127.0.0.1',  // 指定一个主机名
    port: 8000,         // 指定一个端口号
    open: true,         // 运行成功后是否自动打开页面
    proxy: {            // 代理相关。如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器
      '/api': {         // 对请求接口中出现的api进行代理
        target: process.env.VUE_APP_PROXY_URL, // 代理的目标地址，这个取值在后面的文件会讲到
        changeOrigin: true,   // 是否改变域名，
        ws: false,   // 是否开启webSocket
        pathRewrite: { // 路径重写，如果默认不重写路径，那么`/api/users`会被代理到`target路径/api/users`
          '^/api': ''  // 对api进行路径重写，重写后，那么`/api/users`会被代理到`target路径/users`
        }
      }
    }
  },
  // webpack相关的配置，可以设置plugins和别名解析等
  configureWebpack: {
    // 解析设置
    resolve: {
      // 别名配置，用来创建 import 或 require 的别名，来确保模块引入变得更简单。
      alias: {
        // 用'@'表示src的路径， @/views/Home.vue 等同于 src/views/Home.vue.
        '@': resolve('src'),
        // 同理，用@components 表示 src/components目录
        '@components': resolve('src/components'),
        '@assets': resolve('src/assets')
      }
    },
    // 配置webpack的plugins
    plugins: []
  },
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false
}