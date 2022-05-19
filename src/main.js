import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import vRegion from 'v-region'

// 引入自定义iconfont
import "@/assets/iconfont/iconfont.css";

Vue.config.productionTip = false
Vue.use(ElementUI, { size: "medium" });
Vue.use(vRegion, {})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
