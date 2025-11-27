<template>
  <div class="page">
    <div class="card">
      <h2>Registrar Car Wash</h2>

      <form @submit.prevent="crearCarWash">
        <label>Nombre del CarWash</label>
        <input v-model="nombre_carwash" required />

        <label>Correo</label>
        <input v-model="correo" type="email" required />

        <label>Contraseña</label>
        <input v-model="contrasena" type="password" required />

        <label>Teléfono</label>
        <input v-model="telefono" type="text" />

        <label>Descripción</label>
        <textarea v-model="descripcion"></textarea>

        <button class="btn-login" type="submit">Registrar</button>
      </form>

      <p v-if="mensaje" class="msg">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const nombre_carwash = ref("");
const correo = ref("");
const contrasena = ref("");
const telefono = ref("");
const descripcion = ref("");
const mensaje = ref("");

const API_URL = "http://localhost:2629";

const crearCarWash = async () => {
  try {
    await axios.post(`${API_URL}/registrar-carwash`, {
      nombre_carwash: nombre_carwash.value,
      correo: correo.value,
      contrasena: contrasena.value,
      telefono: telefono.value,
      descripcion: descripcion.value,
    });

    mensaje.value = "CarWash registrado correctamente ✔";
  } catch (err) {
    mensaje.value = "Error al registrar ❌";
  }
};
</script>

<style scoped>
/* --- ESTILO EXACTO DEL LOGIN QUE MOSTRASTE --- */

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #145da0;
  /*background: #004aad;  azul igual a tu pantalla */
}

/* card centrado, igual al login */
.card {
  width: 330px;
  background: #ffffff;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
}

/* título igual estilo */
.card h2 {
  margin-bottom: 15px;
  color: #003366;
  font-size: 22px;
  font-weight: bold;
}

/* etiquetas igual estilo */
label {
  display: block;
  margin-top: 12px;
  text-align: left;
  font-weight: 600;
  color: #003366;
  font-size: 14px;
}

/* inputs igual estilo */
input,
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 4px;
  border-radius: 10px;
  border: 1px solid #ced4da;
  background: #f7f7f7;
  outline: none;
  font-size: 14px;
}

textarea {
  height: 70px;
  resize: none;
}

/* botón igual estilo del login */
.btn-login {
  width: 100%;
  padding: 12px;
  margin-top: 18px;
  background: #004aad;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.btn-login:hover {
  background: #002244;
}

/* mensaje */
.msg {
  margin-top: 15px;
  font-weight: bold;
  color: #007b00;
  font-size: 15px;
}
</style>
