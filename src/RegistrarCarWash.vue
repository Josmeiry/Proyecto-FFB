<template>
  <div class="login-page">
    <!-- CAPA DE FONDO: ILUSTRACIÓN ORGÁNICA (ULTRA DARK EDITION) -->
    <div class="background-illustration">
      <!-- Burbujas animadas con efecto Glow -->
      <div class="bubbles-container">
        <div v-for="n in 14" :key="n" class="foam-bubble"></div>
      </div>
      
      <!-- Ondas de espuma/agua en el fondo -->
      <div class="foam-waves">
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.15)" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.1)" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.05)" />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.2)" />
          </g>
        </svg>
      </div>

      <!-- Formas abstractas tecnológicas con iluminación tenue -->
      <div class="tech-shape ts1"></div>
      <div class="tech-shape ts2"></div>
    </div>

    <div class="login-card">
      <div class="logo-container">
        <img src="https://res.cloudinary.com/dhtdpmh6t/image/upload/v1778131006/majoapp/f8bqezuuplw33cagweq2.png" alt="MAJOAD Logo" class="login-logo" />
      </div>

      <h2 class="login-title">Registrar <span class="text-accent">Car Wash</span></h2>
      <p class="login-subtitle">Únete a la plataforma líder de gestión</p>
      
      <form @submit.prevent="crearCarWash" class="login-form">
        <div class="input-group">
          <User class="input-icon" :size="20" />
          <input v-model="nombre_carwash" placeholder="Nombre del negocio" required />
        </div>

        <div class="input-group">
          <Mail class="input-icon" :size="20" />
          <input v-model="correo" type="email" placeholder="Correo corporativo" required />
        </div>

        <div class="input-group">
          <Lock class="input-icon" :size="20" />
          <input v-model="contrasena" type="password" placeholder="Crea una contraseña" required />
        </div>

        <div class="input-group">
          <Phone class="input-icon" :size="20" />
          <input v-model="telefono" type="text" placeholder="Teléfono de contacto" />
        </div>

        <div class="input-group">
          <AlignLeft class="input-icon top" :size="20" />
          <textarea v-model="descripcion" placeholder="Breve descripción de tus servicios..."></textarea>
        </div>

        <button type="submit" class="btn-primary">
          <PlusCircle :size="20" />
          Completar Registro
        </button>

        <router-link to="/login-carwash" class="btn-back">
          <ArrowLeft :size="16" />
          Volver al inicio de sesión
        </router-link>
      </form>

      <p v-if="mensaje" :class="['mensaje', { error: mensaje.includes('Error') }]">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { User, Mail, Lock, Phone, AlignLeft, PlusCircle, ArrowLeft } from 'lucide-vue-next';

const router = useRouter();

const nombre_carwash = ref("");
const correo = ref("");
const contrasena = ref("");
const telefono = ref("");
const descripcion = ref("");
const mensaje = ref("");

const API_URL = "https://proyecto-bff.onrender.com";

const crearCarWash = async () => {
  try {
    await axios.post(`${API_URL}/registrar`, {
      nombre_carwash: nombre_carwash.value,
      correo: correo.value,
      contrasena: contrasena.value,
      telefono: telefono.value,
      descripcion: descripcion.value,
    });

    mensaje.value = "CarWash registrado correctamente ✔";
    setTimeout(() => {
      router.push("/Dashboard_CarWash");
    }, 1500);

  } catch (err) {
    console.error(err);
    mensaje.value = "Error al registrar ❌";
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
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #1E3A8A 100%);
  position: relative;
  overflow: hidden;
  padding: 40px 20px;
}

/* ILUSTRACIÓN DE FONDO */
.background-illustration {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* BURBUJAS CON EFECTO GLOW */
.bubbles-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.foam-bubble {
  position: absolute;
  bottom: -50px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3), inset 0 0 10px rgba(255,255,255,0.4);
  animation: rise 18s infinite ease-in;
}

.foam-bubble:nth-child(1) { left: 10%; width: 40px; height: 40px; animation-duration: 15s; }
.foam-bubble:nth-child(2) { left: 25%; width: 20px; height: 20px; animation-duration: 20s; animation-delay: 2s; }
.foam-bubble:nth-child(3) { left: 40%; width: 60px; height: 60px; animation-duration: 25s; animation-delay: 5s; }
.foam-bubble:nth-child(4) { left: 60%; width: 30px; height: 30px; animation-duration: 18s; animation-delay: 1s; }
.foam-bubble:nth-child(5) { left: 80%; width: 50px; height: 50px; animation-duration: 22s; animation-delay: 3s; }
.foam-bubble:nth-child(6) { left: 15%; width: 15px; height: 15px; animation-duration: 12s; animation-delay: 8s; }

@keyframes rise {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  10% { opacity: 0.6; }
  100% { transform: translateY(-110vh) scale(1.6); opacity: 0; }
}

/* ONDAS */
.foam-waves {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 12vh;
}

.waves { width: 100%; height: 12vh; min-height: 80px; }
.parallax > use { animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite; }
.parallax > use:nth-child(1) { animation-delay: -2s; animation-duration: 7s; }
.parallax > use:nth-child(2) { animation-delay: -3s; animation-duration: 10s; }
.parallax > use:nth-child(3) { animation-delay: -4s; animation-duration: 13s; }
.parallax > use:nth-child(4) { animation-delay: -5s; animation-duration: 20s; }

@keyframes move-forever {
  0% { transform: translate3d(-90px,0,0); }
  100% { transform: translate3d(85px,0,0); }
}

/* SHAPES TECH */
.tech-shape {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
}
.ts1 { width: 600px; height: 600px; top: -10%; left: -5%; }
.ts2 { width: 400px; height: 400px; bottom: 10%; right: -5%; }

/* TARJETA */
.login-card {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
  width: 100%;
  max-width: 460px;
  padding: 40px;
  border-radius: 32px;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 10;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.logo-container { display: flex; justify-content: center; margin-bottom: 20px; }
.login-logo { width: 150px; height: auto; }

.login-title { font-size: 26px; font-weight: 800; color: #0f172a; margin-bottom: 8px; }
.text-accent { color: #1e3a8a; }
.login-subtitle { font-size: 14px; color: #64748b; margin-bottom: 30px; }

.login-form { display: flex; flex-direction: column; gap: 16px; }
.input-group { position: relative; display: flex; align-items: center; }
.input-icon { position: absolute; left: 16px; color: #1e3a8a; }
.input-icon.top { top: 15px; transform: none; }

input, textarea {
  width: 100%;
  padding: 14px 16px 14px 52px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  font-size: 15px;
  color: #1e293b;
  transition: all 0.3s;
}

textarea { height: 90px; resize: none; padding-top: 15px; }

input:focus, textarea:focus {
  outline: none;
  border-color: #1e3a8a;
  background: white;
  box-shadow: 0 0 0 4px rgba(30, 58, 138, 0.08);
}

.btn-primary {
  background: #0f172a;
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
  margin-top: 8px;
}

.btn-primary:hover {
  background: #1e3a8a;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.3);
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

.btn-back:hover { color: #0f172a; }

.mensaje { margin-top: 20px; font-size: 14px; font-weight: 600; color: #10b981; }
.mensaje.error { color: #ef4444; }

@media (max-width: 480px) {
  .login-card { padding: 35px 25px; }
  .login-title { font-size: 22px; }
}
</style>
