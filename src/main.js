/**
 * 导入整个项目需要用到的组件或插件
 */
import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import Mock from './mock'
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'


//使用Vue.use来使用引入的组件或插件

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

//创建路由

const router = new VueRouter({
  routes
})

// 在项目载入的时候，通过路由和箭头函数先载入login进行登录验证

router.beforeEach((to, from, next) => {
  //NProgress.start();
  // 通过当前登录路径来判断用户信息进行验证
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  // 如果当前登录信息是非法或者超时，通过路由配置的路径返回登录页面
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

// 创建Vue实例并载入相关组件
new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

