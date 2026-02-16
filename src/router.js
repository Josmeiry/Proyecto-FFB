import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import Loggin from './Loggin.vue'
/*import AdminLogin from './AdminLogin.vue'*/
import LogginCarWash  from './LogginCarWash.vue'
import RegistrarCarWash from './RegistrarCarWash.vue'
import HomeView from './HomeView.vue'
import Detally_CarWash from './Detally_CarWash.vue'
import Dashboard_Carwash from './Dashboard_Carwash.vue' 
import LoginAdmin from './LoginAdmin.vue'
import component from './component.vue'
import InicioPage from './InicioPage.vue'




const routes = [
  { path: '/', component: InicioPage },
  { path: '/login', component: Loggin },
  /*{path: '/AdminLogin', component: AdminLogin },*/
  {path: '/login-admin', component: LoginAdmin},
  {path: '/login-carwash', component: LogginCarWash},
  { path: '/registrar-carwash', component: RegistrarCarWash },
  {path: '/RegistrarCarWash', component: RegistrarCarWash },
  {path: '/home', component: Home },
  {path: '/carwash_d', component: Detally_CarWash },
  {path: '/homeview', component: HomeView},
  {path: '/Dashboard_CarWash', component: Dashboard_Carwash},
  
   {path: '/inicioP', component: InicioPage },

  {path: '/component', component: component}
]

export default createRouter({
  history: createWebHistory(),
  routes
})