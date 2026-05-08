import { createRouter, createWebHistory } from 'vue-router'

import Home from './Home.vue'
import Loggin from './Loggin.vue'
import LogginCarWash from './LogginCarWash.vue'
import RegistrarCarWash from './RegistrarCarWash.vue'
import HomeView from './HomeView.vue'
import Detally_CarWash from './Detally_CarWash.vue'
import Dashboard_Carwash from './Dashboard_Carwash.vue'
import LoginAdmin from './LoginAdmin.vue'
import component from './component.vue'
import InicioPage from './InicioPage.vue'
import Detalle_CarWash from './Detalle_Carwash.vue'
import ConfiguracionPerfil from './ConfiguracionPerfil.vue'
import Copyright from './Views/Copyright.vue'
import Terminos from './Views/Terminos.vue'
import AdminDashboard from './Views/AdminDashboard.vue'

const routes = [

  // 🔓 Públicas
  { path: '/', component: InicioPage },

  { path: '/login', component: Loggin },

  { path: '/login-admin', component: LoginAdmin },

  { path: '/login-carwash', component: LogginCarWash },

  { path: '/registrar-carwash', component: RegistrarCarWash },

  { path: '/RegistrarCarWash', component: RegistrarCarWash },

  { path: '/home', component: Home },

  { path: '/inicioP', component: InicioPage },

  { path: '/copyright', name: 'copyright', component: Copyright },

  { path: '/terminos', name: 'terminos', component: Terminos },

  { path: '/detalle-carwash', component: Detalle_CarWash },

  {
    path: '/carwash_d/:id',
    name: 'CarwashDetalle',
    component: Detalle_CarWash
  },

  { path: '/component', component: component },


  // 🔐 Usuario logueado
  {
    path: '/homeview',
    component: HomeView,
    meta: { requiresAuth: true }
  },

  {
    path: '/configuracion',
    component: ConfiguracionPerfil,
    meta: { requiresAuth: true }
  },


  // 🔐 SOLO ADMIN
  {
    path: '/admin-dashboard',
    component: AdminDashboard,
    meta: { requiresAdmin: true }
  },


  // 🔐 SOLO CARWASH
  {
    path: '/Dashboard_CarWash',
    component: Dashboard_Carwash,
    meta: { requiresCarWash: true }
  },

  {
    path: '/carwash_d',
    component: Detally_CarWash,
    meta: { requiresCarWash: true }
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})


// 🔥 Middleware de protección
router.beforeEach((to, from, next) => {

  const usuario = JSON.parse(localStorage.getItem("usuario"))

  // 🔐 Requiere login
  if (to.meta.requiresAuth) {

    if (!usuario) {
      return next('/login')
    }

  }

  // 🔐 Solo admin
  if (to.meta.requiresAdmin) {

    if (!usuario || usuario.tipo !== 'admin') {
      return next('/login-admin')
    }

  }

  // 🔐 Solo carwash
  if (to.meta.requiresCarWash) {

    if (!usuario || usuario.tipo !== 'carwash') {
      return next('/login-carwash')
    }

  }

  next()

})

export default router