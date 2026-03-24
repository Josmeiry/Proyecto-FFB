<template>
  <div class="page">
    <header class="header">
      <!-- LOGO -->
      <h2 class="logo">
        <img src="/logo.png" id="img" alt="Logo MAJOAD" />
        MAJOAD
      </h2>

      <!-- BOTÓN HAMBURGUESA (solo móvil) -->
      <button class="menu-btn" @click="menuOpen = !menuOpen" >
        ☰
      </button>

      <!-- MENÚ -->
      <nav :class="{ open: menuOpen }">

  <!-- Siempre visible -->
  <router-link @click="closeMenu" to="/inicioP" style="background-color: transparent;" >
    Inicio
  </router-link>

  <!-- Si NO está logueado -->
  <router-link 
    v-if="!usuario"
    @click="closeMenu" to="/login" style="background-color: transparent;" >
    Login
  </router-link>
  <!-- <router-link 
    v-if="!usuario"
    @click="closeMenu" style="background-color: transparent;" >
    
  </router-link> -->
  <a @click="closeMenu" href="/#"></a>

  <!-- Usuario -->
  <template v-if="usuario?.tipo === 'usuario'">
    <router-link @click="closeMenu" to="/homeview" style="background-color: transparent;" >Home</router-link>
    <router-link @click="closeMenu" to="/detalle-carwash" style="background-color: transparent;" >
      Detalle Car Wash
    </router-link>
    <ProfileAvatar :usuario="usuario" style="background-color: transparent;" />
    <a @click="closeMenu" href="/#"></a>
  </template>

  <!-- Carwash -->
  <template v-if="usuario?.tipo === 'carwash'">
    <router-link @click="closeMenu" to="/Dashboard_CarWash"  style="background-color: transparent;" >
      Dashboard Car Wash
    </router-link>
  </template>

</nav>
    </header>

    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import ProfileAvatar from "../src/components/ProfileAvatar.vue";

const menuOpen = ref(false);
const usuario = ref(null);

const closeMenu = () => {
  menuOpen.value = false;
};

// Cargar usuario al iniciar app
onMounted(() => {
  const user = localStorage.getItem("usuario");
  usuario.value = user ? JSON.parse(user) : null;
});

// 🔥 Escuchar cambios en otras páginas (login/logout)
window.addEventListener("storage", () => {
  const user = localStorage.getItem("usuario");
  usuario.value = user ? JSON.parse(user) : null;
});
</script>

<style scoped>
/* HEADER */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 25px;
  background: linear-gradient(90deg, #1f7acb , #145da0, #0e3f6f);
  
  
  color: white;
}

/* LOGO */
.logo {
  display: flex;
  align-items: center;
  gap: 20px;
  
}

#img {
  width: 70px;

}

.header img {
  background: transparent;
}

/* MENÚ */
nav {
  display: flex;
  gap: 20px;
  background-color: transparent;
}



nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

/* BOTÓN HAMBURGUESA */
.menu-btn {
  display: none;
  font-size: 28px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 2;
}

.profile-avatar {
  border: 2px solid #93c5fd;
  box-shadow: 0 0 0 2px #1e3a8a;
 
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .menu-btn {
    display: block;
  }

  nav {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background: #145da0;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 20px 0;
    display: none;
  }

  nav.open {
    display: flex;
  }
}
</style>
