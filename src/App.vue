<template>
  <div class="page">
    <header>
      <h2><img src="/public/logo.png" id="img" alt="Logo de MAJOAD Car Wash" > MAJOAD</h2>
      <nav>
        <router-link to="/">Inicio</router-link>
        <router-link to="/login">Login</router-link>
        <a href="#">Servicios</a>
        <router-link to="/component">Tarea</router-link>
  
      </nav>
      <meta name="description" content="Encuentra los mejores Car Wash en Santiago de los Caballeros. MAJOAD te muestra ubicaciones, horarios y servicios de lavado de autos.">

    </header>
    <router-view />
    
  </div>

  
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>