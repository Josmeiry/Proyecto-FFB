<template>
  <div class="login-page">
    <div class="background-illustration">
      <div class="bubbles-container">
        <div v-for="n in 15" :key="n" class="foam-bubble"></div>
      </div>
      
      <div class="foam-waves">
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.3)" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.2)" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.1)" />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.4)" />
          </g>
        </svg>
      </div>

      <div class="tech-shape ts1"></div>
      <div class="tech-shape ts2"></div>
    </div>

    <div class="login-card">
      <div class="logo-container">
        <img src="/logo.png" alt="MAJOAD Logo" class="login-logo" />
      </div>

      <h2 class="login-title">{{ mostrarRegistro ? 'Crea tu Cuenta' : 'Iniciar Sesión' }}</h2>
      
      <!-- LOGIN FORM -->
      <form v-if="!mostrarRegistro" @submit.prevent="loginUser" class="login-form">
        <div class="input-group">
          <Mail class="input-icon" :size="20" />
          <input type="email" v-model="loginCorreo" placeholder="Correo" required />
        </div>

        <div class="input-group">
          <Lock class="input-icon" :size="20" />
          <input type="password" v-model="loginContrasena" placeholder="Contraseña" required />
        </div>

        <button type="submit" class="btn-primary" :disabled="cargando">
          {{ cargando ? 'Accediendo...' : 'Entrar' }}
        </button>

        <p class="toggle-text">
          ¿No tienes cuenta? <span @click="toggleRegister">Regístrate aquí</span>
        </p>
      </form>

      <!-- REGISTER FORM -->
      <form v-else @submit.prevent="registerUser" class="login-form">
        <div class="input-group">
          <User class="input-icon" :size="20" />
          <input type="text" v-model="registerNombre" placeholder="Nombre completo" required />
        </div>
        <div class="input-group">
          <Mail class="input-icon" :size="20" />
          <input type="email" v-model="registerCorreo" placeholder="Correo electrónico" required />
        </div>
        <div class="input-group">
          <Lock class="input-icon" :size="20" />
          <input type="password" v-model="registerContrasena" placeholder="Contraseña" required />
        </div>
        <button type="submit" class="btn-primary" :disabled="cargando">
          {{ cargando ? 'Registrando...' : 'Crear Cuenta' }}
        </button>
        <p class="toggle-text">
          ¿Ya tienes cuenta? <span @click="toggleRegister">Inicia sesión</span>
        </p>
      </form>
      <button class="btn-admin-outline" @click="irAdmin">
        <ShieldCheck :size="20" />
        Acceso para administradores
      </button>

      <router-link to="/" class="btn-back">
        <ArrowLeft :size="16" />
        Volver al Inicio
      </router-link>

      <p v-if="mensaje" :class="['mensaje', { error: isError }]">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  ArrowLeft
} from 'lucide-vue-next';

const router = useRouter();
const cargando = ref(false);

const loginCorreo = ref("");
const loginContrasena = ref("");
const registerNombre = ref("");
const registerCorreo = ref("");
const registerContrasena = ref("");
const mostrarRegistro = ref(false);
const mensaje = ref("");
const isError = ref(false);

// TU WEBHOOK DE MAKE
const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/whj52np6oxjqdvhmmllrcptxvxneskco";

const toggleRegister = () => {
  mostrarRegistro.value = !mostrarRegistro.value;
  mensaje.value = "";
  isError.value = false;
};

const loginUser = async () => {
  if (!loginCorreo.value || !loginContrasena.value) return;
  
  cargando.value = true;
  mensaje.value = "Verificando credenciales...";
  isError.value = false;

  try {
    const response = await axios.post("https://proyecto-bff.onrender.com/login-usuario", {
      correo: loginCorreo.value,
      contrasena: loginContrasena.value,
    });

    console.log("Respuesta API:", response.data);
    const usuario = response.data.usuario;

    if (!usuario) {
      throw new Error("No se recibió información del usuario.");
    }

    // Guardar sesión
    localStorage.setItem("usuario", JSON.stringify(usuario));
    window.dispatchEvent(new Event("storage"));

    // Notificación a Make (Totalmente separada)
    axios.post(MAKE_WEBHOOK_URL, {
      evento: "login_exitoso",
      nombre: usuario.nombre,
      correo: usuario.correo,
      timestamp: new Date().toLocaleString()
    }).catch(e => console.warn("Make.com notification failed, continuing login."));

    // Redirección inteligente
    mensaje.value = "¡Acceso concedido! Redirigiendo...";
    
    setTimeout(() => {
      if (usuario.tipo === "carwash") {
        router.push("/Dashboard_CarWash");
      } else {
        router.push("/homeview"); // Redirige a /homeview para tipo 'usuario' o cualquier otro
      }
    }, 500);

  } catch (error) {
    console.error("Error en login:", error);
    isError.value = true;
    mensaje.value = error.response?.data?.msg || error.message || "Error de conexión con el servidor.";
  } finally {
    cargando.value = false;
  }
};

const registerUser = async () => {
  cargando.value = true;
  mensaje.value = "Creando cuenta...";
  isError.value = false;

  try {
    const response = await axios.post("https://proyecto-bff.onrender.com/registrar-usuario", {
      nombre: registerNombre.value,
      correo: registerCorreo.value,
      contrasena: registerContrasena.value,
    });
    
    if (response.status === 201 || response.status === 200) {
      // Notificar a Make
      axios.post(MAKE_WEBHOOK_URL, {
        evento: "nuevo_registro",
        nombre: registerNombre.value,
        correo: registerCorreo.value
      }).catch(e => {});

      isError.value = false;
      mensaje.value = "¡Registro exitoso! Ya puedes iniciar sesión.";
      
      setTimeout(() => { 
        mostrarRegistro.value = false;
        loginCorreo.value = registerCorreo.value;
      }, 2000);
    }
  } catch (error) {
    isError.value = true;
    mensaje.value = error.response?.data?.msg || "Error al crear la cuenta. Intenta con otro correo.";
  } finally {
    cargando.value = false;
  }
};

const irAdmin = () => router.push("/login-admin");
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.login-page {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0a192f 0%, #004aad 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.background-illustration { position: absolute; inset: 0; pointer-events: none; }
.bubbles-container { position: absolute; width: 100%; height: 100%; }
.foam-bubble {
  position: absolute;
  bottom: -100px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  box-shadow: inset 0 0 15px rgba(255,255,255,0.3);
  animation: rise 15s infinite ease-in;
  pointer-events: none;
}

.foam-bubble:nth-child(1) { left: 10%; width: 40px; height: 40px; animation-delay: 0s; animation-duration: 12s; }
.foam-bubble:nth-child(2) { left: 20%; width: 20px; height: 20px; animation-delay: 2s; animation-duration: 18s; }
.foam-bubble:nth-child(3) { left: 35%; width: 60px; height: 60px; animation-delay: 4s; animation-duration: 25s; }
.foam-bubble:nth-child(4) { left: 50%; width: 30px; height: 30px; animation-delay: 1s; animation-duration: 15s; }
.foam-bubble:nth-child(5) { left: 65%; width: 50px; height: 50px; animation-delay: 6s; animation-duration: 20s; }
.foam-bubble:nth-child(6) { left: 80%; width: 25px; height: 25px; animation-delay: 3s; animation-duration: 14s; }
.foam-bubble:nth-child(7) { left: 90%; width: 45px; height: 45px; animation-delay: 5s; animation-duration: 22s; }
.foam-bubble:nth-child(8) { left: 15%; width: 35px; height: 35px; animation-delay: 8s; animation-duration: 19s; }
.foam-bubble:nth-child(9) { left: 45%; width: 20px; height: 20px; animation-delay: 10s; animation-duration: 16s; }
.foam-bubble:nth-child(10) { left: 70%; width: 55px; height: 55px; animation-delay: 7s; animation-duration: 24s; }

@keyframes rise { 
  0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0; } 
  10% { opacity: 0.8; }
  100% { transform: translateY(-120vh) scale(1.5) rotate(360deg); opacity: 0; } 
}

.foam-waves { position: absolute; bottom: 0; width: 100%; height: 15vh; opacity: 0.2; }
.tech-shape { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%); }
.ts1 { width: 600px; height: 600px; top: -10%; left: -10%; }
.ts2 { width: 400px; height: 400px; bottom: 10%; right: -5%; }

.login-card {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  width: 100%;
  max-width: 440px;
  padding: 50px;
  border-radius: 36px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, 0.8);
  text-align: center;
}

.logo-container { display: flex; justify-content: center; margin-bottom: 30px; }
.login-logo { width: 160px; height: auto; }
.login-title { font-size: 26px; font-weight: 800; color: #002d72; margin-bottom: 32px; letter-spacing: -0.5px; }

.login-form { display: flex; flex-direction: column; gap: 18px; }
.input-group { position: relative; display: flex; align-items: center; }
.input-icon { position: absolute; left: 18px; color: #004aad; }

input {
  width: 100%;
  padding: 16px 16px 16px 54px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  font-size: 15px;
  transition: 0.3s;
}
input:focus { outline: none; border-color: #004aad; background: white; box-shadow: 0 0 0 4px rgba(0, 74, 173, 0.1); }

.btn-primary {
  background: linear-gradient(135deg, #004aad 0%, #002d72 100%);
  color: white; border: none; padding: 16px; border-radius: 18px;
  font-size: 16px; font-weight: 800; cursor: pointer; transition: 0.3s;
}
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0, 74, 173, 0.3); }

.btn-admin-outline {
  margin-top: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: white;
  border: 2px solid #f1f5f9;
  padding: 16px;
  border-radius: 20px;
  font-weight: 700;
  color: #004aad;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-admin-outline:hover { 
  background: #f8fafc; 
  border-color: #004aad;
  transform: translateY(-2px);
}

.btn-back { 
  text-decoration: none; 
  color: #94a3b8; 
  font-size: 14px; 
  font-weight: 600; 
  margin-top: 25px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  gap: 8px; 
  transition: all 0.3s;
}
.btn-back:hover { 
  color: #002d72; 
  transform: translateX(-4px); 
}

.toggle-text { font-size: 14px; color: #64748b; margin-top: 10px; }
.toggle-text span { color: #004aad; font-weight: 800; cursor: pointer; margin-left: 5px; }

.mensaje { margin-top: 20px; padding: 12px; border-radius: 12px; font-size: 14px; font-weight: 600; background: #ecfdf5; color: #10b981; }
.mensaje.error { background: #fef2f2; color: #ef4444; }

@media (max-width: 480px) { .login-card { padding: 40px 24px; } }
</style>
