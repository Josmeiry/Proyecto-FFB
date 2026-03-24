<template>
  <div class="landing">

    <!-- Botón flotante -->
    <button class="floating-btn">🔍</button>

    <!-- HEADER -->
    <header>
      <nav class="navbar">

        <!-- <div class="logo">MAJOAD</div> -->

        <!-- MENÚ -->
        <ul :class="['nav-links', { active: menuOpen }]"  >
          <li style="background-color: transparent;" ><a href="#inicio" @click="closeMenu" style="background-color: transparent;" >Inicio</a></li>
          <li  style="background-color: transparent;" ><a href="#sobre-nosotros" @click="closeMenu" style="background-color: transparent;" >Sobre nosotros</a></li>
          <li style="background-color: transparent;" ><a href="#como-funciona" @click="closeMenu" style="background-color: transparent;" >Cómo funciona</a></li>
          <li style="background-color: transparent;" ><a href="#faq" @click="closeMenu" style="background-color: transparent;" >FAQ</a></li>
          <li style="background-color: transparent;" ><a href="#contacto" @click="closeMenu" style="background-color: transparent;" >Contacto</a></li>
        </ul>

        <!-- BOTÓN -->
        <button class="menu-btn" @click="menuOpen = !menuOpen">
          ☰
        </button>

      </nav>
    </header>

    <!-- HERO -->
    <section id="inicio" class="hero">
      <div class="hero-content" style="background-color: transparent;" >
        <div class="hero-text"  style="background-color: transparent;" >
          <h1  >Encuentra el car wash perfecto cerca de ti</h1>
          <p  style="background-color: transparent;" >
            Conectamos conductores con los mejores servicios de car wash según
            ubicación, precio y conveniencia.
          </p>

          <div class="hero-actions"  style="background-color: transparent;" >
            <!-- <input
              type="text"
              placeholder="Ingresa tu ubicación"
              class="location-input"
            /> -->
            

            <!-- <router-link to="/homeview" class="animation-btn">
             Buscar Car Wash
            </router-link> -->
            <button @click="buscarCarwash" class="animation-btn">
             Buscar Car Wash
            </button>
          </div>
        </div>

        <!-- <div class="hero-image">
          <img
            src="https://placehold.co/420x260?text=Car+Wash+Map"
            alt="Mapa con car wash cercanos"
          />
        </div> -->
      </div>
    </section>

    <!-- SOBRE NOSOTROS -->
    <section id="sobre-nosotros" class="about">
      <div class="about-content">
        <div class="about-text">
          <h2>Sobre nosotros</h2>
          <p>
            Somos un equipo apasionado por la tecnología y el emprendimiento,
            enfocados en resolver la dificultad de encontrar un car wash confiable
            y cercano.
          </p>
          <p>
            Nuestra plataforma ayuda a conductores a elegir mejor y a los car wash
            a ganar visibilidad digital.
          </p>
        </div>

        <div class="about-photo">
          <img
            src="https://placehold.co/300x300?text=Equipo"
            alt="Equipo"
          />
          <p class="photo-caption">Nuestro equipo fundador</p>
        </div>
      </div>
    </section>

    <!-- CÓMO FUNCIONA -->
    <section id="como-funciona" class="how-it-works">
      <h2>Cómo funciona</h2>

      <div class="steps">
        <div class="step">
          <span class="step-number">1</span>
          <h3>Busca tu ubicación</h3>
          <p>Ingresa tu ubicación o activa la geolocalización.</p>
        </div>

        <div class="step">
          <span class="step-number">2</span>
          <h3>Compara opciones</h3>
          <p>Revisa precios, servicios y horarios disponibles.</p>
        </div>

        <div class="step">
          <span class="step-number">3</span>
          <h3>Elige tu car wash</h3>
          <p>Dirígete directo al lugar sin perder tiempo.</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="business-cta">
      <div class="business-cta-content"  style="background-color: transparent;" >
        <div  style="background-color: transparent;" >
          <h2 >¿Tienes un car wash?</h2>
          <p style="background-color: transparent;" >Súmate a la plataforma y llega a más clientes.</p>
        </div>

        <router-link to="/registrar-carwash" class="secondary-btn">
          Registrar mi car wash
        </router-link>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="faq">
      <h2>Preguntas frecuentes</h2>

      <div class="faq-list">
        <div class="faq-item" v-for="(item, index) in faqs" 
        :key="index" @click="toggleFaq(index)">

          <div class="faq-question">
            <h3>{{ item.question }}</h3>
            <span :class="{ open: item.open }">+</span>
        </div>

        <transition name="fade">
          <p v-if="item.open" class="faq-answer">
          {{ item.answer }}
        </p>
        </transition>
        </div>
      </div>  
    </section>

    <!-- CONTACTO -->
    <section id="contacto" class="contact">
      <h2>Contacto</h2>
      <p>¿Tienes dudas o quieres más información?</p>

      <form class="contact-form" @submit.prevent="handleSubmit">
        <input v-model="form.name" type="text" placeholder="Nombre" required />
        <input v-model="form.email" type="email" placeholder="Correo" required />
        <textarea v-model="form.message" rows="4" placeholder="Mensaje" required />
        <button class="primary-btn" type="submit" @click="sendEmail">Enviar</button>
      </form>
    </section>

        <!-- MODAL LOGIN AUTOMÁTICO -->
    <div v-if="showLoginModal" class="login-overlay">
      <div class="login-card">
        <div class="login-icon">👤</div>
        <h3>Inicia sesión</h3>
        <p>
          Para ver más resultados y guardar tus favoritos,
          inicia sesión en MAJOAD.
        </p>

        <div class="login-actions">
          <router-link to="/login" class="login-btn">
            Iniciar sesión
          </router-link>

          <button @click="showLoginModal = false" class="cancel-btn" style="background-color: transparent; color: black;">
            Ahora no
          </button>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="footer">
      <p style="background-color: transparent;" >© {{ new Date().getFullYear() }} MAJOAD</p>
      <div class="footer-links" style="background-color: transparent;" >
        <a href="/copyright" style="background-color: transparent;"  target="_blank">Políticas de Privacidad</a> |
        <a href="/terminos" style="background-color: transparent;"  target="_blank">Términos de Servicio</a>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// MENU
const menuOpen = ref(false);
const closeMenu = () => {
  menuOpen.value = false;
};

// MODAL
const showLoginModal = ref(false);

// FORM
const form = ref({
  name: "",
  email: "",
  message: ""
});

// FAQ
const faqs = ref([
  {
    question: "¿La plataforma cobra al usuario?",
    answer: "No, el uso es completamente gratuito.",
    open: false
  },
   {
    question: "¿Puedo registrar mi car wash?",
    answer: "Sí, desde el botón “Registrar mi car wash”.",
    open: false
   },
  {
    question: "¿Qué tipos de servicios puedo encontrar en Majoad?",
    answer: "Podrás encontrar lavado básico, lavado premium, detailing, limpieza interior, encerado y otros servicios.",
    open: false
    }
]);

// FUNCIONES
const handleSubmit = () => {
  alert("¡Gracias por contactarnos!");
  form.value = { name: "", email: "", message: "" };
};

const toggleFaq = (index) => {
  faqs.value[index].open = !faqs.value[index].open;
};

const sendEmail = () => {
  const phone = "8093518191";

  const message = `
📩 Nuevo contacto
Nombre: ${form.value.name}
Correo: ${form.value.email}
Mensaje: ${form.value.message}
`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  form.value = { name: "", email: "", message: "" };
};

const buscarCarwash = () => {
  const usuario = localStorage.getItem("usuario");

  if (!usuario) {
    localStorage.setItem("redirectAfterLogin", "/homeview");
    showLoginModal.value = true;
  } else {
    router.push("/homeview");
  }
};

// MOUNTED
onMounted(() => {
  const usuario = localStorage.getItem("usuario");

  if (!usuario) {
    setTimeout(() => {
      showLoginModal.value = true;
    }, 10000);
  }
});
</script>



<style scoped>
.landing {
  font-family: 'Inter', system-ui, sans-serif;
  background: #f8fafc;
  color: #0f172a;
  line-height: 1.6;
}

/* Botón flotante */
.floating-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #0ea5e9, #38bdf8);
  color: white;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(14,165,233,.4);
  z-index: 50;
}

/* Navbar */

.navbar {
  position: relative; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background: rgba(255,255,255,0.95);
  z-index: 100;
  background-color: transparent;
}

/* LINKS DESKTOP */
.nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
}

/* BOTÓN */
.menu-btn {
  display: none;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
}



/* MOBILE */
@media (max-width: 768px) {

  .menu-btn {
    display: block;
  }

  .nav-links {
  position: absolute;
  top: 100%; /* 🔥 justo debajo del navbar */
  left: 0;
  width: 100%;
  background: #145da0;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  display: none;
  z-index: 99;
  display: none;
}

  .nav-links {
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.nav-links.active {
  display: flex;
  opacity: 1;
  transform: translateY(0);
  display: flex;
}

  .nav-links a {
    color: white;
  }
}


.logo {
  font-weight: 800;
  color: #0ea5e9;
  font-size: 20px;
  
}

.nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
}

.nav-links a {
  text-decoration: none;
  color: #0f172a;
  font-weight: 500;
}

/* Hero */
.hero {
  padding: 96px 32px;
  background: linear-gradient(135deg, #e0f2fe, #ffffff);
}

.hero-content {
  max-width: 1100px;
  margin: auto;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  align-items: center;
}

.hero-text h1 {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 16px;
}

.hero-text p {
  font-size: 18px;
  color: #475569;
}

.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.location-input {
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #cbd5f5;
  width: 260px;
}

/* Botones */
.primary-btn {
  background: linear-gradient(135deg, #0ea5e9, #38bdf8);
  color: white;
  border: none;
  border-radius: 999px;
  padding: 12px 22px;
  font-weight: 600;
  cursor: pointer;
}

.secondary-btn {
  background: white;
  color: #0ea5e9;
  padding: 12px 22px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
}

/* Secciones */
.about, .faq, .contact {
  padding: 72px 32px;
  background: white;
}

.about-content {
  max-width: 1000px;
  margin: auto;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.about-photo img {
  border-radius: 16px;
}

.how-it-works {
  padding: 72px 32px;
  background: #f1f5f9;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  max-width: 1000px;
  margin: auto;
}

.step {
  background: white;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,.05);
}

.step-number {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #0ea5e9;
  color: white;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

/* CTA */
.business-cta {
  background: linear-gradient(135deg, #0ea5e9, #38bdf8);
  color: white;
  padding: 72px 32px;
}

.business-cta-content {
  max-width: 1000px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}

/* Contacto */
.contact-form {
  max-width: 420px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-form input,
.contact-form textarea {
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #cbd5f5;
}

.faq {
  padding: 80px 32px;
  background: linear-gradient(135deg, #f8fafc, #ffffff);
}

.faq h2 {
  text-align: center;
  font-size: 34px;
  font-weight: 800;
  margin-bottom: 40px;
}

.faq-list {
  max-width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
  background: white;
  border-radius: 16px;
  padding: 20px 24px;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(0,0,0,0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.faq-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(0,0,0,0.08);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question h3 {
  font-size: 18px;
  font-weight: 600;
}

.faq-question span {
  font-size: 26px;
  font-weight: bold;
  color: #0ea5e9;
  transition: transform 0.3s ease;
}

.faq-question span.open {
  transform: rotate(45deg);
}

.faq-answer {
  margin-top: 12px;
  color: #475569;
  font-size: 16px;
  line-height: 1.6;
}

.animation-btn  {
  font-size: 1rem;
  padding: 0.8em 2em;
  background-color: #0ea5e9;
  border: 3px solid #f6ad3f;
  border-radius: 1em;
  color: #fff;
  font-weight: bolder;
  transition: cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.4s;
  box-shadow: -5px 5px 0px 0px #f6ad3f;
}

.animation-btn:hover {
  transform: translate(5px, -5px);
}

.animation-btn{
  display: inline-block;
  width: auto;
  max-width: 260px;
}

/* Animación */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* LOGIN MODAL */
.login-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  backdrop-filter: blur(4px);
}

.login-card {
  background: white;
  width: 320px;
  padding: 28px;
  border-radius: 18px;
  text-align: center;
  box-shadow: 0 25px 60px rgba(0,0,0,0.2);
  animation: fadeInScale 0.3s ease;
}

.login-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.login-card h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.login-card p {
  color: #475569;
  font-size: 15px;
  margin-bottom: 20px;
}

.login-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.login-btn {
  background: linear-gradient(135deg, #0ea5e9, #38bdf8);
  color: white;
  padding: 12px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
}

.cancel-btn {
  background: white;
  border: 1px solid #cbd5f5;
  padding: 10px;
  border-radius: 999px;
  cursor: pointer;
}

/* BOTÓN HAMBURGUESA */
.menu-btn {
  display: none;
  font-size: 28px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

/* ===== RESPONSIVE btn ===== */
@media (max-width: 768px) {
  .menu-btn {
    display: block;
  }

  nav {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background: #145da0;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 20px 0;
    display: none;
  }

  nav.open {
    display: flex;
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Footer */
.footer {
  padding: 24px;
  background: #0b1120;
  color: white;
  text-align: center;
}
</style>
