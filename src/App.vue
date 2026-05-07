<template>
  <div class="app-container">
    <!-- HEADER PREMIUM - Solo se muestra si el usuario ha iniciado sesión y no está en la landing -->
    <header v-if="showHeader" class="header">
      <nav class="navbar">
        <router-link to="/" class="nav-brand">
          <div class="brand-logo-img">
            <img src="https://res.cloudinary.com/dhtdpmh6t/image/upload/v1778131006/majoapp/f8bqezuuplw33cagweq2.png" alt="Logo" class="main-logo-graphic" onerror="this.style.display='none'" />
            <Droplets v-if="!logoExists" :size="24" color="#0066ff" />
          </div>
          <div class="brand-text">
            <strong class="brand-name">MAJOAD</strong>
            <small class="brand-sub">Car Wash</small>
          </div>
        </router-link>

        <!-- BOTÓN HAMBURGUESA (solo móvil) -->
        <button class="menu-btn" @click="menuOpen = !menuOpen">
          <Menu v-if="!menuOpen" :size="30" />
          <X v-else :size="30" />
        </button>

        <!-- MENÚ -->
        <ul :class="['nav-links', { active: menuOpen }]">
          <li><router-link @click="closeMenu" to="/">Inicio</router-link></li>
          
          <!-- Si NO está logueado -->
          <li v-if="!usuario">
            <router-link @click="closeMenu" to="/login">Iniciar sesión</router-link>
          </li>

          <!-- Usuario Cliente -->
          <template v-if="usuario?.tipo === 'usuario'">
            <li><router-link @click="closeMenu" to="/homeview">Buscar Car Wash</router-link></li>
            <li><router-link @click="closeMenu" to="/detalle-carwash">Mis Reservas</router-link></li>
          </template>

          <!-- Usuario Carwash -->
          <template v-if="usuario?.tipo === 'carwash'">
            <li><router-link @click="closeMenu" to="/Dashboard_CarWash">Panel de Control</router-link></li>
          </template>
        </ul>

        <div class="nav-right">
          <!-- Reloj Completo y Elegante -->
          <div class="nav-clock-refined">
            <Clock :size="16" stroke-width="2.5" color="#0066ff" />
            <div class="clock-info">
              <span class="clock-label-top">Hora actual</span>
              <span class="clock-time-main">{{ currentTime }}</span>
              <span class="clock-date-bottom">{{ currentDate }}</span>
            </div>
          </div>

          <!-- Perfil o Avatar -->
          <div v-if="usuario" class="nav-user-profile">
             <ProfileAvatar :usuario="usuario" />
          </div>
          <div v-else class="nav-auth-btns">
            <router-link to="/registrar-carwash" class="btn-nav-register">Unirse como negocio</router-link>
          </div>
        </div>
      </nav>
      <button class="google-btn" @click="loginGoogle">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" class="google-icon"/>
              
          </button>
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import ProfileAvatar from "../src/components/ProfileAvatar.vue";
import axios from "axios";
import { 
  Droplets, 
  Clock, 
  Menu, 
  X,
  User 
} from 'lucide-vue-next';


import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";


const loginGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = {
      nombre: result.user.displayName,
      email: result.user.email,
      foto: result.user.photoURL,
      tipo: "usuario"
    };

    localStorage.setItem("usuario", JSON.stringify(user));

    window.dispatchEvent(new Event("usuarioActualizado"));

    router.push("/homeview");

  } catch (error) {
    console.error(error);
  }
};


const router = useRouter();
const route = useRoute();
const menuOpen = ref(false);
const usuario = ref(null);
const logoApp = ref("");
const currentTime = ref("");
const currentDate = ref("");
const logoExists = ref(true); 
let clockTimer = null;

// Solo mostrar el header si hay usuario Y NO estamos en la landing page (porque la landing tiene su propio menu)
const showHeader = computed(() => {
  return usuario.value && route.path !== "/" && route.path !== "/inicioP";
});

const closeMenu = () => {
  menuOpen.value = false;
};

const updateClock = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString("es-DO", { hour12: false });
  currentDate.value = now.toLocaleDateString("es-DO", { day: "numeric", month: "long", year: "numeric" });
};

const loadUser = () => {
  const user = localStorage.getItem("usuario");
  usuario.value = user ? JSON.parse(user) : null;
};

onMounted(async () => {
  loadUser();
  updateClock();
  clockTimer = setInterval(updateClock, 1000);

  try {
    const res = await axios.get(
      "https://proyecto-bff.onrender.com/media",
      {
        params: {
          entidad_tipo: "app",
          tipo: "logo"
        }
      }
    );

    if (res.data.length) {
      logoApp.value = res.data[0].url.replace(
        "http://localhost:2629",
        "https://proyecto-bff.onrender.com",
        "https://majoad.space"
      );
    }
  } catch (error) {
    console.error("Error cargando logo:", error);
  }
});

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer);
});

// 🔥 Escuchar cambios en otras páginas (login/logout)
window.addEventListener("usuarioActualizado", () => {
  loadUser();
});

window.dispatchEvent(new Event("usuarioActualizado"));
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.app-container {
  font-family: 'Inter', system-ui, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* HEADER PREMIUM (Igual a InicioPage) */
.header {
  background: rgba(0, 45, 114, 0.95);
  backdrop-filter: blur(15px);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  width: 100%;
}

.navbar {
  max-width: 1600px;
  margin: auto;
  display: flex;
  align-items: center;
  padding: 14px 32px;
  gap: 16px;
}

/* BRAND / LOGO */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  text-decoration: none;
  flex-shrink: 0;
}

.brand-logo-img {
  width: 75px;
  height: auto;
  display: flex;
  align-items: center;
}

.main-logo-graphic {
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.brand-sub {
  font-size: 10px;
  opacity: .7;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* LINKS */
.nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
  margin-left: 40px; /* Alineado a la izquierda cerca de la marca */
  padding: 0;
  margin-right: 32px; /* Espacio antes de los botones de login */
}

.nav-links li {
  background: transparent;
}

.nav-links a {
  color: rgba(255,255,255,.8);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: all .3s;
  background: transparent;
  position: relative;
  padding: 2px 0;
  white-space: nowrap;
}

/* INDICADOR ACTIVO / HOVER */
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #0066ff;
  transition: width 0.3s ease;
}

.nav-links a:hover, .nav-links a.router-link-active {
  color: #fff;
}

.nav-links a:hover::after, .nav-links a.router-link-active::after {
  width: 100%;
}

/* RIGHT SECTION */
.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* RELOJ REFINADO */
.nav-clock-refined {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.clock-info {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.clock-label-top {
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(255,255,255,0.5);
  font-weight: 700;
}

.clock-time-main {
  font-size: 13px;
  font-weight: 800;
  color: #fff;
  font-variant-numeric: tabular-nums;
}

.clock-date-bottom {
  font-size: 8px;
  color: rgba(255,255,255,0.4);
  font-weight: 500;
}

.btn-nav-login {
  color: #fff;
  border: 1px solid rgba(255,255,255,0.2);
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all .3s;
  white-space: nowrap;
}

.btn-nav-login:hover {
  background: rgba(255,255,255,0.1);
}

.btn-nav-register {
  background: #fff;
  color: #002d72;
  padding: 7px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: all .3s;
  white-space: nowrap;
}

.btn-nav-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

/* MOBILE MENU BTN */
.menu-btn {
  display: none;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 5px;
  border-radius: 8px;
  transition: background 0.3s;
}

.menu-btn:hover {
  background: rgba(255,255,255,0.1);
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .nav-clock-card {
    display: none;
  }
}

@media (max-width: 768px) {
  .menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #002d72;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 20px 0;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: all .3s ease;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }

  .nav-links.active {
    opacity: 1;
    pointer-events: all;
    transform: translateY(0);
  }

  .nav-right {
    gap: 10px;
  }
}

.main-content {
  flex: 1;
}

.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
 

  border: none;
  border-radius: 10px;


  color: #333;

  cursor: pointer;

  transition: 0.3s;
}



.google-icon {
  width: 22px;
  height: 22px;
}
</style>
