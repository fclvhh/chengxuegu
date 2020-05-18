import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store'
// 测试 跨域 参数配置
// console.log(process.env.VUE_APP_SERVICE_URL)
Vue.config.productionTip = false
Vue.use(ElementUI);

// 权限拦截
// import '@/Permission/permission'
import './permission'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
