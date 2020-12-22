import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './style.scss';
import Index from './pages/Index';
import Profile from './pages/Profile';

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const routes = [
  {
    path: '/', component: Index
  },
  {
    path: '/profile/:username', component: Profile
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
