<template>
  <div class="overlay">
    <div class="modal">

      <div class="modal-header">
        <h2>Acceso de Administrador</h2>
        <button class="close-btn" @click="emitClose">✕</button>
      </div>

      <p class="subtext">Ingresa tus credenciales para continuar.</p>

      <form class="form" @submit.prevent="loginAdmin">
        <label class="label">Correo</label>
        <input v-model="correo" type="email" placeholder="Introduce tu correo" required />

        <label class="label">Contraseña</label>
        <input v-model="contrasena" type="password" placeholder="Introduce la contraseña" required />

        <div class="buttons">
          <button type="button" class="btn-cancel" @click="emitClose">Cancelar</button>
          <button type="submit" class="btn-access">Acceder</button>
        </div>
      </form>

      <p class="msg" v-if="mensaje" :class="autenticado ? 'success' : 'error'">
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

/* Emitir evento para cerrar el modal */
const emitClose = () => {
  emit("close");
};

/* Proceso de login */
const loginAdmin = async () => {
  try {
    const res = await axios.post(`${API_URL}/admin/admin-login`, {
      correo: correo.value,
      contrasena: contrasena.value,
    });

    autenticado.value = res.data.autenticado;
    mensaje.value = res.data.mensaje;

    if (autenticado.value) {
      emit("success"); // Notificar al padre que el login fue exitoso
    }
  } catch (err) {
    mensaje.value = err.response?.data?.mensaje || "Error de conexión con el servidor ❌";
    autenticado.value = false;
  }
};
</script>

<style scoped>
/* --- TU MISMO CSS, SIN CAMBIOS --- */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(3px);
  z-index: 9999;
}

.modal {
  width: 420px;
  background: white;
  border-radius: 14px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 4px 30px rgba(0,0,0,0.2);
  animation: fadeIn 0.25s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.subtext {
  margin-top: -5px;
  font-size: 14px;
  color: #666;
}

.close-btn {
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
}

.form {
  margin-top: 20px;
  text-align: left;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 15px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.btn-cancel,
.btn-access {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 15px;
}

.btn-cancel {
  background: #e5e5e5;
}

.btn-access {
  background: #0d6efd;
  color: white;
}

.msg {
  margin-top: 15px;
  font-weight: bold;
}
.success {
  color: green;
}
.error {
  color: red;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
