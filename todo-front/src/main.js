import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueSession from 'vue-session'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import router from './router/index.js' 랑 똑같은거라 생각.

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueSession)
// 이렇게까지 해줘야 세션 스토리지 사용 가능.

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
