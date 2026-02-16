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
        <router-link @click="closeMenu" to="/inicioP" style="background-color: transparent; margin-right: 40px; " >Inicio</router-link>
        <router-link @click="closeMenu" to="/login" style="background-color: transparent; margin-right: 50px; " >Login</router-link>
        <!-- <a href="#">Servicios</a>
        <router-link @click="closeMenu" to="/component">Tarea</router-link> -->
      </nav>
    </header>

    <router-view />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

const menuOpen = ref(false);

const closeMenu = () => {
  menuOpen.value = false;
};
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
