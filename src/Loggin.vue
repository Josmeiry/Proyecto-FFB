<template>
  <div class="login-container">
    <div class="login-box">

      <h2>Iniciar Sesión</h2>

      <!-- LOGIN -->
      <form @submit.prevent="loginUser">
        <input type="email" v-model="loginCorreo" placeholder="Correo" required />
        <input type="password" v-model="loginContrasena" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>

      <p class="toggle-text">
        ¿No tienes cuenta?
        <span @click="toggleRegister">Regístrate aquí</span>
      </p>

      <!-- REGISTRO -->
      <div v-if="mostrarRegistro">
        <h2>Registro</h2>

        <form @submit.prevent="registerUser">
          <input type="text" v-model="registerNombre" placeholder="Nombre completo" required />
          <input type="email" v-model="registerCorreo" placeholder="Correo" required />
          <input type="password" v-model="registerContrasena" placeholder="Contraseña" required />
          <button type="submit">Registrar</button>
        </form>
      </div>

      <button class="btn-admin" @click="irAdmin">
        Acceso para administradores
      </button>

      <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

// LOGIN CAMPOS
const loginCorreo = ref("");
const loginContrasena = ref("");

// REGISTRO CAMPOS
const registerNombre = ref("");
const registerCorreo = ref("");
const registerContrasena = ref("");

const mostrarRegistro = ref(false);
const mensaje = ref("");

// Mostrar/ocultar registro
const toggleRegister = () => {
  mostrarRegistro.value = !mostrarRegistro.value;
};




// LOGIN
const loginUser = async () => {
  try {
    const response = await axios.post("http://localhost:2629/login-usuario", {
      correo: loginCorreo.value,
      contrasena: loginContrasena.value,
    });

    // Guardar usuario en localStorage
    localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

    mensaje.value = "Inicio de sesión exitoso";

    // Redirigir
    router.push("/HomeView");

  } catch (error) {
    mensaje.value =
      error.response?.data?.msg || "Error al iniciar sesión";
  }
};



// REGISTRO
const registerUser = async () => {
  try {
    const response = await axios.post("http://localhost:2629/registrar-usuario", {
      nombre: registerNombre.value,
      correo: registerCorreo.value,
      contrasena: registerContrasena.value,
    });

    if (response.status === 201) {
      mensaje.value = "Usuario registrado correctamente";
      mostrarRegistro.value = false;
    }

  } catch (error) {
    mensaje.value =
      error.response?.data?.msg || "Error al registrar";
  }
};


const irAdmin = () => router.push("/login-admin");
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #145da0;
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
