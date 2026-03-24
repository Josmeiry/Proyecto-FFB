<template>
  <div class="login-container px-4 sm:px-0">
    <div
      class="login-box w-full max-w-md mx-auto"
    >

      <h2 class="text-xl sm:text-2xl md:text-3xl">
        Iniciar Sesión
      </h2>

      <!-- LOGIN -->
      <form @submit.prevent="loginUser">
        <input type="email" v-model="loginCorreo" placeholder="Correo" required />
        <input type="password" v-model="loginContrasena" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>

      <p class="toggle-text text-sm sm:text-base">
        ¿No tienes cuenta?
        <span @click="toggleRegister">Regístrate aquí</span>
      </p>

      <!-- REGISTRO -->
      <div v-if="mostrarRegistro">
        <h2 class="text-lg sm:text-xl">Registro</h2>

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
    const response = await axios.post(
      "http://localhost:2629/login-usuario",
      {
        correo: loginCorreo.value,
        contrasena: loginContrasena.value,
      }
    );

    // 🔥 ESTA LÍNEA ES OBLIGATORIA
    const usuario = response.data.usuario;

    localStorage.setItem("usuario", JSON.stringify(usuario));

    window.dispatchEvent(new Event("storage"));

    if (usuario.tipo === "usuario") {
      router.push("/homeview");
    } else if (usuario.tipo === "carwash") {
      router.push("/Dashboard_CarWash");
    }

  } catch (error) {
    mensaje.value =
      error.response?.data?.msg || "Error al iniciar sesión";
  }
};


// const loginUser = async () => {
//   try {
//     const response = await axios.post("http://localhost:2629/login-usuario", {
//       correo: loginCorreo.value,
//       contrasena: loginContrasena.value,
//     });

//     const usuario = response.data.usuario;

//     // SOLO guardamos esto
//     localStorage.setItem("usuario", JSON.stringify(usuario));

//     // Redirigir según tipo
//     if (usuario.tipo === "usuario") {
//       router.push("/homeview");
//     } else if (usuario.tipo === "carwash") {
//       router.push("/dashboard-carwash");
//     }

//   } catch (error) {
//     mensaje.value =
//       error.response?.data?.msg || "Error al iniciar sesión";
//   }
// };


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

// localStorage.setItem("usuario", JSON.stringify(usuario));

// // 🔥 Forzar actualización del menú
// window.dispatchEvent(new Event("storage"));

// if (usuario.tipo === "usuario") {
//   router.push("/homeview");
// } else if (usuario.tipo === "carwash") {
//   router.push("/Dashboard_CarWash");
// }
</script>


<style scoped>
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
button {
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

button:hover {
  background: #2980b9;
}

/* BOTÓN ADMIN */
.btn-admin {
  background: #16a085;
  margin-top: 12px;
}

/* TEXTO */
.toggle-text {
  text-align: center;
  margin: 14px 0;
}

.toggle-text span {
  color: #3498db;
  font-weight: bold;
  cursor: pointer;
}

/* MENSAJE */
.mensaje {
  margin-top: 14px;
  text-align: center;
  color: red;
}

</style>
