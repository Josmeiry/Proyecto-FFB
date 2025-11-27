<template>
  <div class="login-page">
    <div class="login-card">
      <img src="/logo.png" class="logo" alt="Logo" />

      <h2>Iniciar Sesión - Car Wash</h2>

      <form @submit.prevent="loginCarwash">
        <label>Correo</label>
        <input v-model="correo" type="email" required />

        <label>Contraseña</label>
        <input v-model="contrasena" type="password" required />

        <button class="btn" type="submit">Iniciar Sesión</button>
      </form>

      <p v-if="mensaje" class="msg">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const correo = ref("");
const contrasena = ref("");
const mensaje = ref("");

const API_URL = "http://localhost:2629";

const loginCarwash = async () => {
  try {
    const res = await axios.post(`${API_URL}/login-carwash`, {
      correo: correo.value,
      contrasena: contrasena.value
    });

    mensaje.value = "Inicio de sesión exitoso ✔";
    
    // Redirigir a la pantalla que quieras
    // window.location.href = "/homeview";

  } catch (err) {
    mensaje.value = "Correo o contraseña incorrecta ❌";
  }
};
</script>

<style>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #eef2f3;
}

.login-card {
  background: white;
  width: 360px;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.logo {
  width: 120px;
  margin-bottom: 10px;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

label {
  display: block;
  text-align: left;
  margin-top: 12px;
  color: #444;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #bbb;
  border-radius: 8px;
}

.btn {
  width: 100%;
  background: #007bff;
  color: white;
  padding: 12px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  font-size: 17px;
}

.msg {
  margin-top: 15px;
  color: #d9534f;
  font-weight: 500;
}
</style>
