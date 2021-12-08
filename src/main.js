import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaiduMap from 'vue-baidu-map'
import axios from "axios";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
//这个是根组件对于一些基础的组件，比如输入框，下拉选择框，使用的频率很高。我们没有必要在每一个需要的地方使用。而是采取在根组件中注册。根组件中的注册是全局注册。全局注册了之后就可以在根组件下的任何子组件中使用。
Vue.use(BaiduMap, {
  ak: '6AkHTjjkauYTPjG1M0dSC9LAtrD3WeWs'    //这个地方是官方提供的ak密钥
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
