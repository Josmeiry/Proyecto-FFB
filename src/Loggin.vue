<template>
  <div class="login-container">
    <div class="login-box">

      <h2>Iniciar Sesión</h2>

      <form @submit.prevent="loginUser">
        <input type="email" v-model="correo" placeholder="Correo" required />
        <input type="password" v-model="contrasena" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>

      <p class="toggle-text">
        ¿No tienes cuenta?
        <span @click="toggleRegister">Regístrate aquí</span>
      </p>

      <!-- Registro -->
      <div v-if="mostrarRegistro">
        <h2>Registro</h2>
        <form @submit.prevent="registerUser">
          <input type="text" v-model="nombre" placeholder="Nombre completo" required />
          <input type="email" v-model="correo" placeholder="Correo" required />
          <input type="password" v-model="contrasena" placeholder="Contraseña" required />
          <button type="submit">Registrar</button>
        </form>
      </div>

      <!-- BOTÓN PARA ADMINS -->
      <button class="btn-admin" @click="irAdmin">
        Acceso para administradores
      </button>

      <!-- MENSAJES -->
      <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

// Campos
const correo = ref("");
const contrasena = ref("");
const nombre = ref("");

// Registro visible o no
const mostrarRegistro = ref(false);

// Mensaje de respuesta
const mensaje = ref("");

// Cambiar entre login y registro
const toggleRegister = () => {
  mostrarRegistro.value = !mostrarRegistro.value;
};

// 🔹 LOGIN
const loginUser = async () => {
  try {
    const response = await axios.post("http://localhost:2629/login", {
      correo: correo.value,
      contrasena: contrasena.value,
    });

    if (response.data.usuario) {
      mensaje.value = "Inicio de sesión exitoso";
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
      router.push("/HomeView");
    } else {
      mensaje.value = "Correo o contraseña incorrectos";
    }
  } catch (error) {
    mensaje.value = error.response?.data?.error || "Error al iniciar sesión";
  }
};

// 🔹 REGISTRO
const registerUser = async () => {
  try {
    const response = await axios.post("http://localhost:2629/registrar", {
      nombre: nombre.value,
      correo: correo.value,
      contrasena: contrasena.value,
    });

    if (response.status === 200) {
      mensaje.value = "Usuario registrado correctamente";
      mostrarRegistro.value = false;
      nombre.value = "";
      correo.value = "";
      contrasena.value = "";
    }
  } catch (error) {
    mensaje.value = error.response?.data?.error || "Error al registrar usuario";
  }
};

// 🔹 IR A LOGIN DE ADMIN
const irAdmin = () => {
  router.push("/AdminLogin");
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
}

.login-box {
  background: white;
  padding: 30px;
  width: 380px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  background: #3498db;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #2980b9;
}

.btn-admin {
  background: #16a085;
  margin-top: 15px;
}

.toggle-text span {
  color: #3498db;
  cursor: pointer;
  font-weight: bold;
}

.mensaje {
  margin-top: 15px;
  color: red;
}
</style>
