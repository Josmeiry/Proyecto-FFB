<template>
  <div class="login-page">
    <div class="background-illustration">
      <div class="bubbles-container">
        <div v-for="n in 30" :key="n" class="foam-bubble"></div>
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
        <img src="https://res.cloudinary.com/dhtdpmh6t/image/upload/v1778131006/majoapp/f8bqezuuplw33cagweq2.png" alt="MAJOAD Logo" class="login-logo" />
      </div>

      <h2 class="login-title">{{ mostrarRegistro ? 'Crea tu Cuenta' : 'Iniciar Sesión' }}</h2>
      
      <form v-if="!mostrarRegistro" @submit.prevent="loginUser" class="login-form">
        <div class="input-group">
          <Mail class="input-icon" :size="20" />
          <input type="email" v-model="loginCorreo" placeholder="Correo" required data-cy="email-login"/>
        </div>
        <div class="input-group">
          <Lock class="input-icon" :size="20" />
          <input :type="showPassword ? 'text' : 'password'" v-model="loginContrasena" placeholder="Contraseña" required data-cy="pass-login"/>
          <button type="button" class="toggle-password" @click="showPassword = !showPassword">
            <Eye v-if="!showPassword" :size="20" />
            <EyeOff v-else :size="20" />
          </button>
        </div>
        <button type="submit" class="btn-primary" :disabled="cargando" data-cy="btn-login"> 
          {{ cargando ? 'Accediendo...' : 'Entrar' }}
        </button>
        <p class="toggle-text">
          ¿No tienes cuenta? <span @click="toggleRegister">Regístrate aquí</span>
        </p>
      </form>

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
          <input :type="showRegisterPassword ? 'text' : 'password'" v-model="registerContrasena" placeholder="Contraseña" required data-cy="pass-register"/>
          <button type="button" class="toggle-password" @click="showRegisterPassword = !showRegisterPassword">
            <Eye v-if="!showRegisterPassword" :size="20" />
            <EyeOff v-else :size="20" />
          </button>
        </div>
        <button type="submit" class="btn-primary" :disabled="cargando">
          {{ cargando ? 'Registrando...' : 'Crear Cuenta' }}
        </button>
        <p class="toggle-text">
          ¿Ya tienes cuenta? <span @click="toggleRegister">Inicia sesión</span>
        </p>
      </form>

      <button class="btn-admin-outline" @click="irAdmin">
        <ShieldCheck :size="20" /> Acceso para administradores
      </button>
      <button class="btn-admin-outline" @click="irCarWash">  
        <Car :size="20" /> Acceso para Car Wash
      </button>
      <button class="btn-admin-outline" @click="loginGoogle">
            <img style="width: 20px; height: 20px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" class="google-icon"/>
              
          </button>
      <router-link to="/" class="btn-back">
        <ArrowLeft :size="16" /> Volver al Inicio
      </router-link>

      <p v-if="mensaje" :class="['mensaje', { error: isError }]">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { Mail, Lock, User, ShieldCheck, ArrowLeft, Car, Eye, EyeOff } from 'lucide-vue-next';

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
const usuario = ref(null);
const showPassword = ref(false);
const showRegisterPassword = ref(false);

const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/whj52np6oxjqdvhmmllrcptxvxneskco";


import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";


const loginGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = {
      nombre: result.user.displayName,
      email: result.user.email,
      foto: result.user.photoURL,
      tipo: "usuario"
    };

    localStorage.setItem("usuario", JSON.stringify(user));

    window.dispatchEvent(new Event("usuarioActualizado"));

    router.push("/homeview");

  } catch (error) {
    console.error(error);
  }
};


const toggleRegister = () => {
  mostrarRegistro.value = !mostrarRegistro.value;
  mensaje.value = "";
  isError.value = false;
};

const loginUser = async () => {
  const mail = loginCorreo.value.trim();
  const pass = loginContrasena.value.trim();

  if (!mail || !pass) return;
  
  cargando.value = true;
  mensaje.value = "Iniciando...";

  // LLAVE MAESTRA DE ADMINISTRADOR - MÁXIMA PRIORIDAD
  if (mail === "admin@majoad.com" && pass === "majoad2026") {
    console.log("¡LLAVE MAESTRA ACTIVADA! Redirigiendo a Admin Dashboard...");
    localStorage.clear(); // Limpiar basuras previas
    localStorage.setItem("usuario", JSON.stringify({ nombre: "Admin Maestro", correo: mail, tipo: "admin" }));
    window.dispatchEvent(new Event("storage"));
    router.push("/admin-dashboard");
    return;
  }

  try {
    const response = await axios.post("https://proyecto-bff.onrender.com/login-usuario", {
      correo: mail,
      contrasena: pass,
    });

    const usuario = response.data.usuario;
    localStorage.setItem("usuario", JSON.stringify(usuario));
    window.dispatchEvent(new Event("storage"));

    // Notificar a Make (Silent)
    axios.post(MAKE_WEBHOOK_URL, { evento: "login", nombre: usuario.nombre, correo: usuario.correo }).catch(() => {});

    if (usuario.tipo === "carwash") router.push("/Dashboard_CarWash");
    else if (usuario.tipo === "admin") router.push("/admin-dashboard");
    else router.push("/homeview");

  } catch (error) {
    isError.value = true;
    mensaje.value = error.response?.data?.msg || "Error de red. Prueba con la Llave Maestra si el servidor no responde.";
  } finally {
    cargando.value = false;
  }
};

const registerUser = async () => {
  cargando.value = true;
  try {
    await axios.post("https://proyecto-bff.onrender.com/registrar-usuario", {
      nombre: registerNombre.value,
      correo: registerCorreo.value,
      contrasena: registerContrasena.value,
    });
    mostrarRegistro.value = false;
    mensaje.value = "¡Registro exitoso! Ya puedes entrar.";
  } catch (error) {
    isError.value = true;
    mensaje.value = "Error al registrar.";
  } finally {
    cargando.value = false;
  }
};

const irAdmin = () => router.push("/login-admin");
const irCarWash = () => router.push("/login-carwash");

const loadUser = () => {
  const user = localStorage.getItem("usuario");
  usuario.value = user ? JSON.parse(user) : null;
};

// 🔥 Escuchar cambios en otras páginas (login/logout)
window.addEventListener("usuarioActualizado", () => {
  loadUser();
});

onMounted(() => {
  loadUser();
});

window.dispatchEvent(new Event("usuarioActualizado"));
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

.background-illustration { position: absolute; inset: 0; pointer-events: none; z-index: 1; }

.bubbles-container { position: absolute; width: 100%; height: 100%; }
.foam-bubble {
  position: absolute;
  bottom: -100px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  box-shadow: inset 0 0 10px rgba(255,255,255,0.2);
  animation: rise 15s infinite ease-in;
  pointer-events: none;
}

/* Bubbles variety */
.foam-bubble:nth-child(3n) { width: 30px; height: 30px; animation-duration: 12s; animation-delay: 1s; }
.foam-bubble:nth-child(3n+1) { width: 50px; height: 50px; animation-duration: 18s; animation-delay: 3s; }
.foam-bubble:nth-child(3n+2) { width: 20px; height: 20px; animation-duration: 15s; animation-delay: 5s; }
.foam-bubble:nth-child(5n) { left: 15%; }
.foam-bubble:nth-child(5n+1) { left: 35%; }
.foam-bubble:nth-child(5n+2) { left: 55%; }
.foam-bubble:nth-child(5n+3) { left: 75%; }
.foam-bubble:nth-child(5n+4) { left: 95%; }

@keyframes rise { 
  0% { transform: translateY(0) scale(1); opacity: 0; } 
  10% { opacity: 0.5; }
  90% { opacity: 0.5; }
  100% { transform: translateY(-120vh) scale(1.5); opacity: 0; } 
}

.foam-waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 2;
  line-height: 0;
}

.waves {
  position: relative;
  width: 100%;
  height: 100px;
  min-height: 100px;
  max-height: 150px;
}

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
}
.parallax > use:nth-child(1) { animation-delay: -2s; animation-duration: 7s; }
.parallax > use:nth-child(2) { animation-delay: -3s; animation-duration: 10s; }
.parallax > use:nth-child(3) { animation-delay: -4s; animation-duration: 13s; }
.parallax > use:nth-child(4) { animation-delay: -5s; animation-duration: 20s; }

@keyframes move-forever {
  0% { transform: translate3d(-90px,0,0); }
  100% { transform: translate3d(85px,0,0); }
}

.tech-shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  z-index: 1;
}
.ts1 { width: 400px; height: 400px; top: -100px; right: -100px; animation: rotate 30s linear infinite; }
.ts2 { width: 300px; height: 300px; bottom: 100px; left: -50px; animation: rotate 20s linear infinite reverse; }

@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  width: 100%;
  max-width: 440px;
  padding: 50px;
  border-radius: 36px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, 0.5);
  text-align: center;
  transition: transform 0.3s ease;
}

.login-card:hover { transform: translateY(-5px); }

.logo-container { display: flex; justify-content: center; margin-bottom: 30px; }
.login-logo { width: 160px; height: auto; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1)); }
.login-title { font-size: 26px; font-weight: 800; color: #002d72; margin-bottom: 32px; letter-spacing: -0.5px; }

.login-form { display: flex; flex-direction: column; gap: 18px; }
.input-group { position: relative; display: flex; align-items: center; }
.input-icon { position: absolute; left: 18px; color: #004aad; transition: color 0.3s; }

input {
  width: 100%;
  padding: 16px 16px 16px 54px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 18px;
  font-size: 15px;
  transition: all 0.3s ease;
}

input:focus {
  background: white;
  border-color: #004aad;
  box-shadow: 0 0 0 4px rgba(0, 74, 173, 0.1);
  outline: none;
}

input:focus + .input-icon { color: #002d72; }

.btn-primary {
  background: linear-gradient(135deg, #004aad 0%, #002d72 100%);
  color: white; border: none; padding: 16px; border-radius: 18px;
  font-size: 16px; font-weight: 800; cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 74, 173, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 25px rgba(0, 74, 173, 0.3);
  filter: brightness(1.1);
}

.btn-primary:active { transform: translateY(0); }

.btn-admin-outline {
  margin-top: 30px; width: 100%; display: flex; align-items: center; justify-content: center; gap: 12px;
  background: white; border: 2px solid #f1f5f9; padding: 16px; border-radius: 20px;
  font-weight: 700; color: #004aad; cursor: pointer;
  transition: all 0.3s ease;
}

.btn-admin-outline:hover { background: #f8fafc; border-color: #004aad; }

.toggle-text { margin-top: 20px; color: #64748b; font-size: 14px; }
.toggle-text span { color: #004aad; font-weight: 700; cursor: pointer; text-decoration: underline; }

.btn-back { 
  text-decoration: none; color: #94a3b8; font-size: 14px; font-weight: 600; 
  margin-top: 25px; display: flex; align-items: center; justify-content: center; gap: 8px; 
  transition: color 0.3s;
}

.btn-back:hover { color: #64748b; }

.mensaje { margin-top: 20px; padding: 12px; border-radius: 12px; font-size: 14px; font-weight: 600; background: #ecfdf5; color: #10b981; }
.mensaje.error { background: #fef2f2; color: #ef4444; }

@media (max-width: 480px) { 
  .login-card { padding: 40px 24px; }
  .login-title { font-size: 22px; }
  .foam-waves { height: 60px; }
  .waves { height: 60px; }
}

.toggle-password {
  position: absolute;
  right: 18px;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: #004aad;
}
</style>
