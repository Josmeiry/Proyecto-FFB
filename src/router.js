import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import Loggin from './Loggin.vue'
import AdminLogin from './AdminLogin.vue'
import LogginCarWash  from './LogginCarWash.vue'
import RegistrarCarWash from './RegistrarCarWash.vue'
import HomeView from './HomeView.vue'
import Detally_CarWash from './Detally_CarWash.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Loggin },
  {path: '/AdminLogin', component: AdminLogin },
  {path: '/login-carwash', component: LogginCarWash},
  { path: '/registrar-carwash', component: RegistrarCarWash },
  {path: '/RegistrarCarWash', component: RegistrarCarWash },
  {path: '/home', component: Home },
  {path: '/carwash/:id', component: Detally_CarWash },
  {path: '/homeview', component: HomeView}
]

export default createRouter({
  history: createWebHistory(),
  routes
})