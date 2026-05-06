<template>
  <div class="login-page">
    <!-- CAPA DE FONDO: ILUSTRACIÓN ORGÁNICA (DARK EDITION) -->
    <div class="background-illustration">
      <!-- Burbujas animadas -->
      <div class="bubbles-container">
        <div v-for="n in 12" :key="n" class="foam-bubble"></div>
      </div>
      
      <!-- Ondas de espuma/agua en el fondo -->
      <div class="foam-waves">
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.2)" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.15)" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.05)" />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.3)" />
          </g>
        </svg>
      </div>

      <!-- Formas abstractas tecnológicas -->
      <div class="tech-shape ts1"></div>
      <div class="tech-shape ts2"></div>
    </div>

    <div class="login-card">
      <div class="logo-container">
        <img src="/logo.png" alt="MAJOAD Logo" class="login-logo" />
      </div>

      <h2 class="login-title">Dueños de <span class="text-accent">Car Wash</span></h2>
      <p class="login-subtitle">Gestiona tu negocio de forma profesional</p>
      
      <form @submit.prevent="loginCarwash" class="login-form">
        <div class="input-group">
          <Mail class="input-icon" :size="20" />
          <input type="email" v-model="correo" placeholder="Correo corporativo" required />
        </div>

        <div class="input-group">
          <Lock class="input-icon" :size="20" />
          <input type="password" v-model="contrasena" placeholder="Contraseña" required />
        </div>

        <button type="submit" class="btn-primary">
          <LogIn :size="20" />
          Entrar al Panel
        </button>

        <div class="divider">
          <span>o también</span>
        </div>

        <router-link to="/registrar-carwash" class="btn-secondary">
          Registrar mi Car Wash
        </router-link>

        <router-link to="/login" class="btn-back">
          <ArrowLeft :size="16" />
          Volver al Login Principal
        </router-link>
      </form>

      <p v-if="mensaje" :class="['mensaje', { error: mensaje.includes('incorrecta') }]">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-vue-next';

const router = useRouter();
const correo = ref("");
const contrasena = ref("");
const mensaje = ref("");

const API_URL = "https://proyecto-bff.onrender.com";

const loginCarwash = async () => {
  try {
    const res = await axios.post(`${API_URL}/login-car`, {
      correo: correo.value,
      contrasena: contrasena.value
    });

    mensaje.value = "Inicio de sesión exitoso ✔";
    localStorage.setItem("id_carwash", res.data.carwash.id_carwash);
    localStorage.setItem("usuario", JSON.stringify(res.data.carwash));
    
    setTimeout(() => {
      router.push("/Dashboard_CarWash");
    }, 1000);

  } catch (err) {
    mensaje.value = "Correo o contraseña incorrecta ❌";
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
  background: linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #2563EB 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

/* ILUSTRACIÓN DE FONDO */
.background-illustration {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* BURBUJAS */
.bubbles-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.foam-bubble {
  position: absolute;
  bottom: -50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  box-shadow: inset 0 0 8px rgba(255,255,255,0.3);
  animation: rise 15s infinite ease-in;
}

.foam-bubble:nth-child(1) { left: 15%; width: 40px; height: 40px; animation-duration: 14s; }
.foam-bubble:nth-child(2) { left: 30%; width: 25px; height: 25px; animation-duration: 18s; animation-delay: 2s; }
.foam-bubble:nth-child(3) { left: 45%; width: 55px; height: 55px; animation-duration: 22s; animation-delay: 4s; }
.foam-bubble:nth-child(4) { left: 70%; width: 35px; height: 35px; animation-duration: 16s; animation-delay: 1s; }
.foam-bubble:nth-child(5) { left: 85%; width: 45px; height: 45px; animation-duration: 20s; animation-delay: 3s; }

@keyframes rise {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  10% { opacity: 0.6; }
  100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
}

/* ONDAS */
.foam-waves {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 15vh;
}

.waves {
  width: 100%;
  height: 15vh;
  min-height: 100px;
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

/* SHAPES */
.tech-shape {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
}
.ts1 { width: 600px; height: 600px; top: -20%; left: -10%; }
.ts2 { width: 500px; height: 500px; bottom: -10%; right: -5%; }

/* TARJETA */
.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  width: 100%;
  max-width: 440px;
  padding: 45px;
  border-radius: 32px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 10;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.login-logo { width: 160px; height: auto; }

.login-title { font-size: 26px; font-weight: 800; color: #1e3a8a; margin-bottom: 8px; }
.text-accent { color: #2563EB; }
.login-subtitle { font-size: 15px; color: #64748b; margin-bottom: 35px; }

.login-form { display: flex; flex-direction: column; gap: 18px; }
.input-group { position: relative; display: flex; align-items: center; }
.input-icon { position: absolute; left: 16px; color: #2563EB; }

input {
  width: 100%;
  padding: 15px 16px 15px 52px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  font-size: 15px;
  color: #1e293b;
  transition: all 0.3s;
}

input:focus {
  outline: none;
  border-color: #2563EB;
  background: white;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.btn-primary {
  background: #1e3a8a;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(30, 58, 138, 0.3);
}

.divider {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 10px 0;
}
.divider::before, .divider::after { content: ""; flex: 1; height: 1px; background: #e2e8f0; }
.divider span { font-size: 13px; color: #94a3b8; }

.btn-secondary {
  text-decoration: none;
  color: #1e3a8a;
  font-weight: 700;
  font-size: 15px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #f8fafc;
  border-color: #1e3a8a;
}

.btn-back {
  text-decoration: none;
  font-size: 14px;
  color: #64748b;
  font-weight: 600;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: color 0.3s;
}

.btn-back:hover { color: #1e3a8a; }

.mensaje { margin-top: 20px; font-size: 14px; font-weight: 600; color: #10b981; }
.mensaje.error { color: #ef4444; }

@media (max-width: 480px) {
  .login-card { padding: 35px 25px; }
}
</style>
