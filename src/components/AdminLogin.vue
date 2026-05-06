<template>
  <div class="login-page">
    <!-- CAPA DE FONDO: NIGHT MODE TECH -->
    <div class="background-illustration">
      <!-- Burbujas con Brillo Eléctrico -->
      <div class="bubbles-container">
        <div v-for="n in 12" :key="n" class="foam-bubble"></div>
      </div>
      
      <!-- Ondas de espuma/agua en el fondo (Modo Noche) -->
      <div class="foam-waves">
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(37,99,235,0.15)" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(59,130,246,0.1)" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(15,23,42,0.5)" />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(37,99,235,0.2)" />
          </g>
        </svg>
      </div>

      <!-- Iluminaciones sutiles en azul eléctrico -->
      <div class="tech-glow g1"></div>
      <div class="tech-glow g2"></div>
      
      <!-- Formas fluidas abstractas -->
      <div class="fluid-shape s1"></div>
      <div class="fluid-shape s2"></div>
    </div>

    <div class="login-card">
      <div class="logo-container">
        <img src="/logo.png" alt="MAJOAD Logo" class="login-logo" />
      </div>

      <h2 class="login-title">Acceso <span class="text-accent">Admin</span></h2>
      <p class="login-subtitle">Panel de control de alta seguridad</p>
      
      <form @submit.prevent="loginAdmin" class="login-form">
        <div class="input-group">
          <Mail class="input-icon" :size="20" />
          <input v-model="correo" type="email" placeholder="Usuario administrador" required />
        </div>

        <div class="input-group">
          <Lock class="input-icon" :size="20" />
          <input v-model="contrasena" type="password" placeholder="Clave de seguridad" required />
        </div>

        <button type="submit" class="btn-primary">
          <ShieldAlert :size="20" />
          Autenticar
        </button>

        <router-link to="/login" class="btn-cancel">
          <ArrowLeft :size="16" />
          Regresar
        </router-link>
      </form>

      <p v-if="mensaje" :class="['mensaje', { success: autenticado, error: !autenticado }]">
        {{ mensaje }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { Mail, Lock, ShieldAlert, ArrowLeft } from 'lucide-vue-next';

const emit = defineEmits(["close", "success"]);

const correo = ref("");
const contrasena = ref("");
const mensaje = ref("");
const autenticado = ref(false);

const API_URL = "https://proyecto-bff.onrender.com";

const loginAdmin = async () => {
  try {
    const res = await axios.post(`${API_URL}/admin/admin-login`, {
      correo: correo.value,
      contrasena: contrasena.value,
    });

    autenticado.value = res.data.autenticado;
    mensaje.value = res.data.mensaje;

    if (autenticado.value) {
      setTimeout(() => {
        emit("success");
      }, 800);
    }
  } catch (err) {
    mensaje.value = err.response?.data?.mensaje || "Error de conexión ❌";
    autenticado.value = false;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.login-page {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #020617 0%, #0B1120 50%, #0F172A 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

/* ILUSTRACIÓN DE FONDO: NIGHT MODE */
.background-illustration {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* BURBUJAS CON GLOW ELÉCTRICO */
.bubbles-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.foam-bubble {
  position: absolute;
  bottom: -50px;
  background: rgba(37, 99, 235, 0.2);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(37, 99, 235, 0.4), inset 0 0 10px rgba(255,255,255,0.2);
  animation: rise 16s infinite ease-in;
}

.foam-bubble:nth-child(1) { left: 15%; width: 45px; height: 45px; animation-duration: 14s; }
.foam-bubble:nth-child(2) { left: 35%; width: 25px; height: 25px; animation-duration: 18s; animation-delay: 2s; }
.foam-bubble:nth-child(3) { left: 50%; width: 60px; height: 60px; animation-duration: 22s; animation-delay: 4s; }
.foam-bubble:nth-child(4) { left: 75%; width: 30px; height: 30px; animation-duration: 15s; animation-delay: 1s; }
.foam-bubble:nth-child(5) { left: 85%; width: 50px; height: 50px; animation-duration: 20s; animation-delay: 3s; }

@keyframes rise {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  10% { opacity: 0.7; }
  100% { transform: translateY(-110vh) scale(1.4); opacity: 0; }
}

/* ONDAS OSCURAS */
.foam-waves {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 15vh;
}

.waves { width: 100%; height: 15vh; min-height: 100px; }
.parallax > use { animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite; }
.parallax > use:nth-child(1) { animation-delay: -2s; animation-duration: 7s; }
.parallax > use:nth-child(2) { animation-delay: -3s; animation-duration: 10s; }
.parallax > use:nth-child(3) { animation-delay: -4s; animation-duration: 13s; }
.parallax > use:nth-child(4) { animation-delay: -5s; animation-duration: 20s; }

@keyframes move-forever {
  0% { transform: translate3d(-90px,0,0); }
  100% { transform: translate3d(85px,0,0); }
}

/* TECH GLOW */
.tech-glow {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%);
  filter: blur(50px);
}
.g1 { width: 500px; height: 500px; top: -10%; right: -10%; }
.g2 { width: 400px; height: 400px; bottom: 0; left: -5%; }

/* FLUID SHAPES */
.fluid-shape {
  position: absolute;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  background: rgba(37, 99, 235, 0.05);
  animation: morph 20s infinite alternate;
}
.s1 { width: 400px; height: 400px; top: 15%; left: 10%; }
.s2 { width: 350px; height: 350px; bottom: 15%; right: 10%; animation-delay: -10s; }

@keyframes morph {
  0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  100% { border-radius: 70% 30% 30% 70% / 60% 40% 40% 60%; }
}

/* TARJETA */
.login-card {
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(20px);
  width: 100%;
  max-width: 420px;
  padding: 45px;
  border-radius: 32px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(37, 99, 235, 0.1);
  position: relative;
  z-index: 10;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.logo-container { display: flex; justify-content: center; margin-bottom: 24px; }
.login-logo { width: 140px; height: auto; filter: drop-shadow(0 0 10px rgba(37, 99, 235, 0.3)); }

.login-title { font-size: 28px; font-weight: 900; color: #fff; margin-bottom: 8px; letter-spacing: 1px; }
.text-accent { color: #3B82F6; }
.login-subtitle { font-size: 14px; color: #94a3b8; margin-bottom: 35px; }

.login-form { display: flex; flex-direction: column; gap: 20px; }
.input-group { position: relative; display: flex; align-items: center; }
.input-icon { position: absolute; left: 16px; color: #3B82F6; }

input {
  width: 100%;
  padding: 15px 16px 15px 52px;
  background: rgba(2, 6, 23, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  font-size: 15px;
  color: #fff;
  transition: all 0.3s;
}

input:focus {
  outline: none;
  border-color: #3B82F6;
  background: rgba(2, 6, 23, 0.9);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
}

.btn-primary {
  background: linear-gradient(135deg, #2563EB 0%, #1e3a8a 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s;
  text-transform: uppercase;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.4);
}

.btn-cancel {
  text-decoration: none;
  font-size: 13px;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
  transition: all 0.3s;
}
.btn-cancel:hover { color: #fff; }

.mensaje { margin-top: 20px; font-size: 14px; font-weight: 600; }
.success { color: #10b981; }
.error { color: #f87171; }

@media (max-width: 480px) {
  .login-card { padding: 35px 25px; }
}
</style>