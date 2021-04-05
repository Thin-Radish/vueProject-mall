import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from "components/common/toast/index"

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()     //创建事件总线

//安装toast插件
Vue.use(toast)     //Vue.use本质是调用toast的install

// 解决移动端300ms延迟
FastClick.attach(document.body)

//使用图片懒加载插件
Vue.use(VueLazyLoad,{
  loading: require('./assets/image/common/placeholder.png')   //占位图片
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
