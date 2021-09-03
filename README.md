## vue项目结构详细说明

<br>

### 0. 前言

> 在我目前的工中很少自己动手搭建一个项目，所以对于开发开始前的项目搭建以及项目各项配置相对理解的不够透彻。这次需要开发一个终端上运行的售楼签约系统。由于UI的不适配决定从头开始创建一个新项目。于是在此对项目的创建和配置做一个总结

- 创建vue项目可以有多种方式，这里介绍脚手架创建方式

  全局安装`vue-cli`: 

  ```shell
  npm install -g @vue/cli
  # OR
  yarn global add @vue/cli
  ```

  创建一个项目:

  ```shell
  // 进到你希望项目放到的那个文件夹目录下，然后运行如下命令
  vue create XXX-XXX  (项目名称)
  ```

  运行完创建命令后会出现选择预设的选项，我这里选的是`manually select features`,然后选择了

  `Babel`、`Router`、`Vuex`、`CSS Pre-processors`、`Lint`这些插件，并选择在创建单独的文件用于配置这些插件。


### 1. 结构分析

具体的功能文件，这里不做过多的介绍，主要介绍以下配置文件的内容

1.  `.browserslistrc`

    该文件的作用是根据提供的目标浏览器的环境来，智能添加css前缀，js的polyfill垫片,来兼容旧版本浏览器。避免不必要的兼容代码，以提高代码的编译质量。

    | 例子                       | 说明                                                  |
    | -------------------------- | ----------------------------------------------------- |
    | > 1%                       | 全球超过1%人使用的浏览器                              |
    | > 5% in US                 | 指定国家使用率覆盖                                    |
    | last 2 versions            | 所有浏览器兼容到最后两个版本根据CanIUse.com追踪的版本 |
    | Firefox ESR                | 火狐最新版本                                          |
    | Firefox > 20               | 指定浏览器的版本范围                                  |
    | not ie <=8                 | 方向排除部分版本                                      |
    | Firefox 12.1               | 指定浏览器的兼容到指定版本                            |
    | unreleased versions        | 所有浏览器的beta测试版本                              |
    | unreleased Chrome versions | 指定浏览器的测试版本                                  |
    | since 2013                 | 2013年之后发布的所有版本                              |

2. **`.eslintrc.js`**

   这个文件主要用于配置项目的eslint校验，对于一个团队来说，每个人有每个人写代码的风格和习惯，有人喜欢结尾加分号，有人不加，有人习惯使用双引号，有人习惯单引号，当然这些不足以影响项目的运行，但是eslint还可以配置更加重要的规范，来统一代码风格和预防一些代码隐患。所以这个文件相对团队开发来说是比较重要的。

   `.eslintrc.js`文件默认导出一个对象，以下是创建vue项目后eslintrc文件的默认内容，结尾处会提供一个更详细的eslint配置文件。

   ```js
   module.exports = {
     // 默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
     root: true,
     // env表示一个环境，预定义了一组全局变量
     env: {
       node: true, // 定义了Node.js 全局变量和 Node.js 作用域。
     },
     // extends 一个配置文件可以被基础配置中的已启用的规则继承，如下设置继承了数组中的三项规则。其中值为 "eslint:recommended" 的 extends 属性会启用一系列eslint核心规则。
     extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
     // ESLint 允许你指定你想要支持的 JavaScript 语言选项。默认情况下，ESLint 支持 ECMAScript 5 语法。你可以覆盖该设置，以启用对 ECMAScript 其它版本和 JSX 的支持。
     parserOptions: {
       parser: "babel-eslint",
     },
     // rules 表示eslint校验规则
     rules: {
       "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
       "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
     },
   };
   ```

   **rules配置规则格式**

   规则格式是`<规则名称>: <告警级别>`，告警级别分为三种:

   - "0"表示忽略问题，等同于"off";
   - "1"表示给出警告，等同于"warn";
   - "2"表示直接报错，等同于"error"。

   更多的ESLint配置可以前往 [ESLint中文网](https://eslint.bootcss.com/docs/user-guide/configuring) 查看

3. `gitignore`

   该文件正如其名字的意思，告知git那些文件或文件夹不需要添加到版本管理中。内容如下：

   ```shell
   .DS_Store
   node_modules
   /dist
   
   # local env files
   .env.local
   .env.*.local
   
   # Log files
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*
   pnpm-debug.log*
   
   # Editor directories and files
   .idea
   .vscode
   *.suo
   *.ntvs*
   *.njsproj
   *.sln
   *.sw?
   ```

4. `README.md`

   这个文件就是项目的介绍文件，使用markdown语法。

5. `babel.config.js`

   Babel是一个JavaScript编译器，可以对JavaScript文件进行转码，类似的有ES6转为ES5兼容不同的浏览器。

   `babel.config.js`是babel的配置文件，`presets`字段设定转码规则，此处 `@vue/cli-plugin-babel/preset`就是规则。

   ```js
   module.exports = {
     presets: ["@vue/cli-plugin-babel/preset"],
   };
   ```

6. `package.json`

   `package.json`文件提供了很多项目相关的信息，主要有这个项目所需要的各种模块；以及项目的配置信息（比如名称、版本、许可证等元数据）；还可以配置一些简化`script`执行脚本

   ```json
   {
     "name": "vue-project", // 项目的名称
     "version": "0.1.0",    // 项目的版本号  大版本号.小版本号.修订版本号[.日期版本号]
     "private": true,       // 是否对外开发，private为true表示不对外开放
     "scripts": {           // script配置脚本对象，表示npm run XXX 
       "serve": "vue-cli-service serve", // 配置serve脚本，表示npm run serve 等同于 vue-cli-service serve 命令
       "build": "vue-cli-service build",
       "lint": "vue-cli-service lint"
     },
     "dependencies": {      // 依赖的相关信息，这里主要是生产和开发依赖,一般用npm install XXX --save 安装的依赖就会添加到这里
       "core-js": "^3.6.5",
       "vue": "^2.6.11",
       "vue-router": "^3.2.0",
       "vuex": "^3.4.0"
     },
     "devDependencies": {    // 开发依赖的相关信息，这里的主要是开发过程的依赖，生产环境中不会存在,一般用 npm install XXX --save-dev 安装的依赖会添加到这里
       "@vue/cli-plugin-babel": "~4.5.0",
       "@vue/cli-plugin-eslint": "~4.5.0",
       "@vue/cli-plugin-router": "~4.5.0",
       "@vue/cli-plugin-vuex": "~4.5.0",
       "@vue/cli-service": "~4.5.0",
       "@vue/eslint-config-prettier": "^6.0.0",
       "babel-eslint": "^10.1.0",
       "eslint": "^6.7.2",
       "eslint-plugin-prettier": "^3.3.1",
       "eslint-plugin-vue": "^6.2.2",
       "lint-staged": "^9.5.0",
       "node-sass": "^4.12.0",
       "prettier": "^2.2.1",
       "sass-loader": "^8.0.2",
       "vue-template-compiler": "^2.6.11"
     }
   }
   ```

   

### 2. 额外的文件

除了上述`vue-cli`创建项目后默认生成的文件外，我们在开发过程中还需要很多配置文件，且都是在根目录中自己创建的。下面介绍几个相关文件

1. **`vue.config.js`**

   这个文件表示vue的配置文件，像一些简单的前端服务运行的端口号，是否自动打开，代理地址等。下面是一些简单的配置

   ```js
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
   
   ```

2. `.env.development`、`.env.production`、`.env.mock` 配置文件

   这里可以自己创建以上上个配置文件，用于配置不同环境下的环境变量，其中

   - `.env.development`表示开发环境的环境变量
   - `.env.production`表示生产环境的环境变量
   - `.env.mock`表示mock运行状态下的环境变量

   这些环境变量可以在全局使用，使用方法就是`process.env.XXXX`。其中xxxx表示变量名

   由于上面在`vue.config.js`配置文件中`proxy`代理配置的属性`target`的值使用了`process.env.VUE_APP_PROXY_URL`变量。所以我在`env.development`文件里定义如下变量：

   ```js
   VUE_APP_PROXY_ROOT = 'http://192.168.2.25:6060/'
   ```

   于是在开发过程中，向 `/api/user` 地址发送请求就等同于向  `http://192.168.2.25:6060/user ` 地址发送请求

3.  `.prettierrc`文件

   - `Prettier`是一个代码格式化工具，可以在开发过程中，使代码格式化成你想要的风格和规范。

   开发前端的过程中，我们要求开发人员都在`VSCode`中装入`Prettier`插件，方便格式化。与ESLint一样，为了统一代码风格和规范，所以Prettier也是在团队开发中重要的一员。

   - `prettierrc`文件就是配置使用Prettier格式化代码的方式

   ```json
   {
     "eslintIntegration": true, // eslint集成
     "stylelintIntegration": true, // 样式嵌入
     "singleQuote": true,  // 是否使用单引号
     "semi": false,  // 结尾是否保留分号，设置为false表示结尾不会有分号
     "trailingComma": "none", // 对象、数组等，最后一个是否保留逗号，设置为none表示不保留逗号， es5表示保留es5的结尾逗号
     "arrowParens": "avoid", // 箭头函数中只有一个参数是否保留括号，aviod表示不保留括号，always表示保留括号
     "bracketSpacing": true, // 对象中的空格 默认true
     "useTabs": false, // 使用tab缩进，默认false
     "tabWidth": 2,  // tab缩进大小，2个空格
   }
   
   ```

### 3. 更多的项目内容可以查看以下github地址



### 参考连接

1. [vue脚手架创建项目](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)
2. [browserslist的作用](https://blog.csdn.net/weixin_39936058/article/details/87523416)
3. [ESLint 配置文件 .eslintrc 示例及说明](https://www.jianshu.com/p/a09a5a222a76)
4. [Babel配置文件](https://babel.docschina.org/docs/en/config-files/#project-wide-configuration)
5. [vue配置参考](https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE)
6. [Prettier配置](https://prettier.io/docs/en/options.html)