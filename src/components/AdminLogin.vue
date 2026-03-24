<template>
  <div class="login-container px-4 sm:px-0">
    <div class="login-box w-full max-w-md mx-auto">

      <h2 class="text-xl sm:text-2xl md:text-3xl">
        Acceso de Administrador
      </h2>

      <form @submit.prevent="loginAdmin">
        <input
          v-model="correo"
          type="email"
          placeholder="Correo"
          required
        />

        <input
          v-model="contrasena"
          type="password"
          placeholder="Contraseña"
          required
        />

        <button type="submit">Entrar</button>
      </form>

      <!-- <button class="btn-cancel" @click="emitClose">
        Cancelar
      </button> -->

      <router-link to="/login" class="btn-cancel">
          Cancelar
        </router-link>

      

      <p
        v-if="mensaje"
        class="mensaje"
        :class="autenticado ? 'success' : 'error'"
      >
        {{ mensaje }}
      </p>

    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import axios from "axios";

const emit = defineEmits(["close", "success"]);

const correo = ref("");
const contrasena = ref("");
const mensaje = ref("");
const autenticado = ref(false);

const API_URL = "http://localhost:2629";

const emitClose = () => emit("close");

const loginAdmin = async () => {
  try {
    const res = await axios.post(`${API_URL}/admin/admin-login`, {
      correo: correo.value,
      contrasena: contrasena.value,
    });

    autenticado.value = res.data.autenticado;
    mensaje.value = res.data.mensaje;

    if (autenticado.value) {
      emit("success");
    }
  } catch (err) {
    mensaje.value =
      err.response?.data?.mensaje || "Error de conexión ❌";
    autenticado.value = false;
  }
};
</script>

<style>
/* CONTENEDOR */
.login-container {
  min-height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #145da0;
}

/* CAJA LOGIN */
.login-box {
  background: white;
  padding: 28px 24px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
}

/* INPUTS */
input {
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

/* BOTONES */
button{
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: none;
  border-radius: 8px;
  background: #3498db;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.btn-cancel {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border-radius: 8px;
  background: #e5e5e5;
  color: #333;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}



button:hover {
  background: #2980b9;
}

/* BOTÓN CANCELAR */
.btn-cancel {
  background: #e5e5e5;
  color: #333;
}

.btn-cancel:hover {
  background: #ccc;
}

/* MENSAJES */
.mensaje {
  margin-top: 14px;
  text-align: center;
  font-weight: bold;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>