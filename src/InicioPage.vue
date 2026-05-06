<template>
  <div class="landing">
    <div class="bubbles">
      <div class="bubble b1"></div>
      <div class="bubble b2"></div>
      <div class="bubble b3"></div>
      <div class="bubble b4"></div>
    </div>

    <!-- HEADER -->
    <header class="header">
      <nav class="navbar">
        <div class="nav-brand" @click="router.push('/')">
          <div class="brand-logo-img">
            <img src="/logo.png" alt="Logo" class="main-logo-graphic" />
          </div>
          <div class="brand-text">
            <strong class="brand-name">MAJOAD</strong>
            <small class="brand-sub">CAR WASH</small>
          </div>
        </div>

        <ul :class="['nav-links', { active: menuOpen }]">
          <li><a href="#inicio" @click="closeMenu">Inicio</a></li>
          <li><a href="#sobre-nosotros" @click="closeMenu">Sobre nosotros</a></li>
          <li><a href="#como-funciona" @click="closeMenu">Cómo funciona</a></li>
          <li><a href="#faq" @click="closeMenu">FAQ</a></li>
          <li><a href="#contacto" @click="closeMenu">Contacto</a></li>
        </ul>

        <div class="nav-right">
          <!-- Reloj Completo y Elegante -->
          <div class="nav-clock-refined">
            <Clock :size="16" stroke-width="2.5" color="#0066ff" />
            <div class="clock-info">
              <span class="clock-label-top">Hora actual</span>
              <span class="clock-time-main">{{ currentTime }}</span>
              <span class="clock-date-bottom">{{ currentDate }}</span>
            </div>
          </div>
          <div class="nav-auth-btns">
            <router-link to="/login" class="btn-nav-login">Iniciar sesión</router-link>
            <router-link to="/registrar-carwash" class="btn-nav-register">Registrar Car Wash</router-link>
          </div>
          <button class="btn-user-circle" @click="goProfile">
            <User :size="18" stroke-width="2.5" />
          </button>
        </div>

        <button class="menu-btn" @click="menuOpen = !menuOpen">
          <Menu v-if="!menuOpen" :size="28" />
          <X v-else :size="28" />
        </button>
      </nav>
    </header>

    <!-- HERO -->
    <section id="inicio" class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <div class="hero-tag-box">
            <span class="hero-tag">Encuentra • Compara • Elige</span>
          </div>
          <h1>Encuentra el car wash perfecto <span class="text-vibrant">cerca de ti</span></h1>
          <p class="hero-desc">Conectamos conductores con los mejores servicios de car wash según ubicación, precio y conveniencia.</p>
          <button @click="buscarCarwash" class="btn-buscar-main shimmer">
            <div class="icon-bg">
              <Search :size="20" stroke-width="3" />
            </div>
            <span>Buscar Car Wash</span>
          </button>
        </div>
        <div class="hero-image-box">
          <div class="hero-image-backdrop"></div>
          <img src="/blue-car-nobg-Photoroom.png" alt="Car Wash Premium" class="hero-img" />
        </div>
      </div>
    </section>

    <!-- WAVE DIVIDER -->
    <div class="wave-container">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 30L60 25C120 20 240 10 360 15C480 20 600 40 720 50C840 60 960 60 1080 50C1200 40 1320 20 1380 10L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V30Z" fill="white"/>
      </svg>
    </div>

    <!-- SOBRE NOSOTROS -->
    <section id="sobre-nosotros" class="about soft-water-section">
      <div class="soft-water-decor">
        <div class="sw-shape sw1"></div>
        <div class="sw-shape sw2"></div>
      </div>
      <div class="about-inner">
        <div class="about-content-left">
          <span class="section-tag-blue">Sobre nosotros</span>
          <h2 class="section-title">Somos tu aliado en limpieza y comodidad</h2>
          <p class="section-desc">Somos un equipo apasionado por la tecnología y el emprendimiento, enfocados en resolver la dificultad de encontrar un car wash confiable y cercano. Nuestra plataforma ayuda a conductores a elegir mejor y a los car wash a ganar visibilidad digital.</p>
        </div>
        <div class="about-card-premium">
          <div class="about-card-icon-circle">
            <Users :size="40" color="#0066ff" stroke-width="2" />
          </div>
          <h3 class="about-card-title">Equipo</h3>
          <p class="about-card-sub">Nuestra mejor fortaleza</p>
        </div>
      </div>
    </section>

    <!-- CÓMO FUNCIONA -->
    <section id="como-funciona" class="how soft-water-section">
      <div class="soft-water-decor">
        <div class="sw-shape sw3"></div>
        <div class="sw-shape sw4"></div>
      </div>
      <div class="section-header-center">
        <span class="section-tag-blue">Cómo funciona</span>
        <h2 class="section-title">Así de fácil</h2>
      </div>
      <div class="steps-container">
        <div class="step-card-modern">
          <div class="step-badge">1</div>
          <div class="step-icon-wrapper">
            <div class="step-icon-circle">
              <MapPin :size="32" stroke-width="2.5" />
            </div>
          </div>
          <h3>Busca tu ubicación</h3>
          <p>Ingresa tu ubicación o activa tu geolocalización.</p>
        </div>
        <div class="step-card-modern">
          <div class="step-badge">2</div>
          <div class="step-icon-wrapper">
            <div class="step-icon-circle">
              <DollarSign :size="32" stroke-width="2.5" />
            </div>
          </div>
          <h3>Compara opciones</h3>
          <p>Revisa precios, servicios y horarios disponibles.</p>
        </div>
        <div class="step-card-modern">
          <div class="step-badge">3</div>
          <div class="step-icon-wrapper">
            <div class="step-icon-circle">
              <Car :size="32" stroke-width="2.5" />
            </div>
          </div>
          <h3>Elige tu car wash</h3>
          <p>Escoge el mejor car wash y disfruta del servicio.</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="cta-card">
        <div class="cta-info">
          <div class="cta-icon-box">
            <Store :size="40" color="#fff" stroke-width="2" />
          </div>
          <div class="cta-text">
            <h2>¿Tienes un car wash?</h2>
            <p>Únete a Majoad y llega a más clientes.</p>
          </div>
        </div>
        <router-link to="/registrar-carwash" class="btn-cta-modern">
          <span>Registrar mi car wash</span>
          <ChevronRight :size="20" stroke-width="3" />
        </router-link>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="faq-section">
      <div class="section-header-center">
        <span class="section-tag-blue">Preguntas frecuentes</span>
        <h2 class="section-title">Resolvemos tus dudas</h2>
      </div>
      <div class="faq-container">
        <div class="faq-accordion-item" v-for="(item, index) in faqs" :key="index" @click="toggleFaq(index)" :class="{ active: item.open }">
          <div class="faq-header">
            <h3>{{ item.question }}</h3>
            <div class="faq-plus-icon">
              <Plus v-if="!item.open" :size="18" stroke-width="3" />
              <Minus v-else :size="18" stroke-width="3" />
            </div>
          </div>
          <transition name="faq-slide">
            <div v-if="item.open" class="faq-body">
              <p>{{ item.answer }}</p>
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- CONTACTO -->
    <section id="contacto" class="contact-section">
      <div class="contact-grid">
        <div class="contact-info-panel">
          <span class="section-tag-blue">Contacto</span>
          <h2 class="section-title">¿Tienes dudas o quieres más información?</h2>
          <p class="section-desc">Escríbenos y te responderemos lo antes posible.</p>
          <div class="contact-methods">
            <div class="contact-method">
              <div class="method-icon">
                <Mail :size="20" color="#0066ff" stroke-width="2" />
              </div>
              <span>hola@majoad.com</span>
            </div>
            <div class="contact-method">
              <div class="method-icon">
                <Phone :size="20" color="#0066ff" stroke-width="2" />
              </div>
              <span>+1 809 351 8191</span>
            </div>
          </div>
        </div>
        <div class="contact-form-panel">
          <form class="modern-form" @submit.prevent="handleSubmit">
            <div class="form-grid">
              <div class="form-group">
                <input v-model="form.name" type="text" placeholder="Nombre" required />
              </div>
              <div class="form-group">
                <input v-model="form.email" type="email" placeholder="Correo electrónico" required />
              </div>
            </div>
            <div class="form-group">
              <textarea v-model="form.message" rows="4" placeholder="Mensaje" required></textarea>
            </div>
            <button type="submit" class="btn-submit-modern" @click="sendEmail">
              <span>Enviar mensaje</span>
              <Send :size="18" stroke-width="2.5" />
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="main-footer">
      <div class="footer-top">
        <div class="footer-brand-box">
          <div class="footer-logo">
            <Droplets :size="32" color="#fff" stroke-width="2" />
          </div>
          <div class="footer-brand-text">
            <strong>MAJOAD</strong>
            <small>Car Wash</small>
          </div>
        </div>
        <div class="footer-nav">
          <router-link to="/copyright" target="_blank">Política de Privacidad</router-link>
          <router-link to="/terminos" target="_blank">Términos de Servicio</router-link>
          <a href="#contacto">Contacto</a>
        </div>
        <div class="footer-social-links">
          <a href="#" class="social-btn"><Globe :size="20" /></a>
          <a href="#" class="social-btn"><Instagram :size="20" /></a>
          <a href="#" class="social-btn"><Twitter :size="20" /></a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} Majoad. Todos los derechos reservados.</p>
      </div>
    </footer>

    <!-- MODAL -->
    <div v-if="showLoginModal" class="login-overlay">
      <div class="login-card">
        <div class="login-icon-box">
          <User :size="60" color="#0066ff" stroke-width="1.5" />
        </div>
        <h3>Inicia sesión</h3>
        <p>Para ver más resultados y guardar tus favoritos, inicia sesión en MAJOAD.</p>
        <div class="login-actions">
          <router-link to="/login" class="login-btn">Iniciar sesión</router-link>
          <button @click="showLoginModal = false" class="cancel-btn">Ahora no</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { 
  Droplets, 
  Clock, 
  User, 
  Menu, 
  X, 
  Search, 
  Users, 
  MapPin, 
  DollarSign, 
  Car, 
  Store, 
  ChevronRight, 
  Plus, 
  Minus, 
  Mail, 
  Phone, 
  Send,
  Globe,
  Instagram,
  Twitter
} from 'lucide-vue-next';

const router = useRouter();
const menuOpen = ref(false);
const closeMenu = () => { menuOpen.value = false; };
const showLoginModal = ref(false);
const currentTime = ref("");
const currentDate = ref("");
const logoExists = ref(true); 
let timer = null;

const updateClock = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString("es-DO", { hour12: false });
  currentDate.value = now.toLocaleDateString("es-DO", { day: "numeric", month: "long", year: "numeric" });
};

const form = ref({ name: "", email: "", message: "" });

const faqs = ref([
  { question: "¿La plataforma cobra al usuario?", answer: "No, el uso es completamente gratuito.", open: false },
  { question: "¿Puedo registrar mi car wash?", answer: "Sí, desde el botón Registrar mi car wash.", open: false },
  { question: "¿Qué tipos de servicios puedo encontrar en Majoad?", answer: "Podrás encontrar lavado básico, lavado premium, detailing, limpieza interior, encerado y otros servicios.", open: false }
]);

const handleSubmit = () => {
  alert("¡Gracias por contactarnos!");
  form.value = { name: "", email: "", message: "" };
};

const toggleFaq = (i) => { faqs.value[i].open = !faqs.value[i].open; };

const sendEmail = () => {
  const phone = "8093518191";
  const message = `📩 Nuevo contacto\nNombre: ${form.value.name}\nCorreo: ${form.value.email}\nMensaje: ${form.value.message}`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
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

const goProfile = () => {
  const usuario = localStorage.getItem("usuario");
  if (usuario) router.push("/configuracion");
  else showLoginModal.value = true;
};

onMounted(() => {
  updateClock();
  timer = setInterval(updateClock, 1000);
  const usuario = localStorage.getItem("usuario");
  if (!usuario) {
    setTimeout(() => { 
      showLoginModal.value = true; 
    }, 10000);
  }
});

onUnmounted(() => { if (timer) clearInterval(timer); });
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.landing { font-family: 'Inter', system-ui, sans-serif; color: #0f172a; line-height: 1.6; background: #f4f8ff; position: relative; overflow-x: hidden; min-height: 100vh; }

/* BUBBLES BACKGROUND */
.bubbles { position: absolute; width: 100%; height: 100%; top: 0; left: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.bubble { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(0, 102, 255, 0.1) 0%, transparent 70%); }
.b1 { width: 400px; height: 400px; top: -100px; right: -100px; }
.b2 { width: 300px; height: 300px; top: 20%; left: -100px; }
.b3 { width: 500px; height: 500px; bottom: 10%; right: -200px; }
.b4 { width: 250px; height: 250px; top: 60%; left: 10%; background: radial-gradient(circle, rgba(0, 102, 255, 0.05) 0%, transparent 70%); }

/* SHIMMER EFFECT */
.shimmer { position: relative; overflow: hidden; }
.shimmer::after { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent); transform: rotate(45deg); animation: shimmer 4s infinite; }
@keyframes shimmer { 0% { transform: translateX(-150%) rotate(45deg); } 100% { transform: translateX(150%) rotate(45deg); } }

/* HEADER */
.header { 
  background: #002d72; 
  position: sticky; 
  top: 0; 
  z-index: 100; 
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  width: 100%;
}

.navbar { 
  max-width: 1600px; 
  margin: auto; 
  display: flex; 
  align-items: center; 
  padding: 14px 32px; 
  gap: 16px; 
}
.nav-brand { display: flex; align-items: center; gap: 12px; color: #fff; text-decoration: none; flex-shrink: 0; }
.brand-logo-img { 
  width: 55px; 
  height: auto; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
}
.main-logo-graphic {
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}
.brand-name { display: block; font-size: 18px; font-weight: 800; letter-spacing: 1px; line-height: 1; }
.brand-sub { display: block; font-size: 10px; opacity: .5; text-transform: uppercase; font-weight: 700; margin-top: 2px; }

.nav-links { 
  display: flex; 
  gap: 24px; 
  list-style: none; 
  margin-left: auto; 
  padding: 0; 
  margin-right: 32px;
}
.nav-links a { 
  color: rgba(255,255,255,.8); 
  text-decoration: none; 
  font-size: 13px; 
  font-weight: 600; 
  transition: all .3s; 
  position: relative;
  padding: 2px 0;
  white-space: nowrap;
}

/* INDICADOR ACTIVO / HOVER */
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #0066ff;
  transition: width 0.3s ease;
}

.nav-links a:hover { color: #fff; }
.nav-links a:hover::after { width: 100%; }

.nav-right { 
  display: flex; 
  align-items: center; 
  gap: 16px; 
}
.nav-clock-card { 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  background: rgba(255, 255, 255, 0.08); 
  padding: 6px 12px; 
  border-radius: 10px; 
  border: 1px solid rgba(255, 255, 255, 0.1); 
  min-width: 140px;
}
.clock-icon { color: #0066ff; width: 16px; height: 16px; }
.clock-content { display: flex; flex-direction: column; line-height: 1.1; }
.clock-label { font-size: 8px; text-transform: uppercase; letter-spacing: 0.5px; color: rgba(255,255,255,0.5); font-weight: 700; }
.clock-time { font-size: 13px; font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; }
.clock-date { font-size: 8px; opacity: 0.5; }

/* RELOJ REFINADO */
.nav-clock-refined {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.clock-info {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.clock-label-top {
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(255,255,255,0.5);
  font-weight: 700;
}

.clock-time-main {
  font-size: 13px;
  font-weight: 800;
  color: #fff;
  font-variant-numeric: tabular-nums;
}

.clock-date-bottom {
  font-size: 8px;
  color: rgba(255,255,255,0.4);
  font-weight: 500;
}

.nav-auth-btns { display: flex; gap: 10px; }
.btn-nav-login { 
  color: #fff; 
  border: 1px solid rgba(255,255,255,0.2); 
  padding: 6px 14px; 
  border-radius: 6px; 
  font-size: 12px; 
  font-weight: 600; 
  text-decoration: none; 
  transition: all .3s; 
  white-space: nowrap;
}
.btn-nav-login:hover { background: rgba(255,255,255,0.1); }
.btn-nav-register { 
  background: #fff; 
  color: #002d72; 
  padding: 7px 16px; 
  border-radius: 6px; 
  font-size: 12px; 
  font-weight: 700; 
  text-decoration: none; 
  transition: all .3s; 
  white-space: nowrap;
}
.btn-nav-register:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }

.btn-user-circle { width: 40px; height: 40px; background: rgba(255, 255, 255, 0.15); border: none; border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .3s; }
.btn-user-circle:hover { background: rgba(255, 255, 255, 0.25); }

.menu-btn { display: none; background: none; border: none; color: #fff; cursor: pointer; padding: 5px; border-radius: 8px; }

/* HERO */
.hero { padding: 80px 32px 100px; position: relative; z-index: 1; }
.hero-content { max-width: 1300px; margin: auto; display: flex; align-items: center; gap: 60px; }
.hero-text { flex: 1.2; }
.hero-tag-box { margin-bottom: 20px; }
.hero-tag { background: rgba(0, 102, 255, 0.1); color: #0066ff; padding: 8px 16px; border-radius: 40px; font-weight: 800; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; border: 1px solid rgba(0, 102, 255, 0.2); }
.hero-text h1 { font-size: 56px; font-weight: 900; line-height: 1.1; margin-bottom: 24px; color: #002d72; }
.text-vibrant { color: #0066ff; }
.hero-desc { font-size: 19px; color: #4b5563; margin-bottom: 40px; max-width: 90%; line-height: 1.6; }

.btn-buscar-main { display: flex; align-items: center; gap: 16px; background: #0066ff; color: #fff; border: none; padding: 12px 32px 12px 12px; border-radius: 16px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all .4s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 10px 30px rgba(0, 102, 255, 0.3); }
.icon-bg { width: 44px; height: 44px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; border-radius: 12px; color: #fff; }
.btn-buscar-main:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0, 102, 255, 0.4); background: #0052cc; }

.hero-image-box { flex: 1; position: relative; display: flex; justify-content: center; }
.hero-image-backdrop { position: absolute; width: 120%; height: 120%; background: radial-gradient(circle, rgba(0, 102, 255, 0.2) 0%, transparent 70%); top: -10%; left: -10%; filter: blur(60px); z-index: -1; }
.hero-img { width: 100%; filter: drop-shadow(0 20px 50px rgba(0, 45, 114, 0.3)); transform: perspective(1000px) rotateY(-5deg) rotateX(2deg); transition: transform 0.5s; }
.hero-image-box:hover .hero-img { transform: perspective(1000px) rotateY(0deg) rotateX(0deg); }

/* WAVE DIVIDER */
.wave-container { width: 100%; height: 120px; line-height: 0; background: transparent; transform: translateY(-1px); }
.wave-container svg { width: 100%; height: 100%; }

/* SECTIONS COMMON */
.section-tag-blue { color: #0066ff; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 3px; display: block; margin-bottom: 12px; }
.section-title { font-size: 36px; font-weight: 900; color: #002d72; margin-bottom: 20px; line-height: 1.2; }
.section-desc { font-size: 17px; color: #4b5563; line-height: 1.8; }
.section-header-center { text-align: center; margin-bottom: 60px; max-width: 700px; margin-left: auto; margin-right: auto; }

/* ABOUT */
.about { padding: 100px 32px; background: #fff; position: relative; z-index: 1; }
.about-inner { max-width: 1200px; margin: auto; display: flex; align-items: center; gap: 80px; flex-wrap: wrap; }
.about-content-left { flex: 1.5; min-width: 320px; }
.about-card-premium { flex: 1; background: #f8fafc; border-radius: 30px; padding: 60px 40px; text-align: center; border: 1px solid #eef2f6; box-shadow: 0 15px 50px rgba(0,0,0,0.03); transition: transform 0.3s; }
.about-card-premium:hover { transform: translateY(-10px); }
.about-card-icon-circle { width: 100px; height: 100px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
.about-card-title { font-size: 24px; font-weight: 800; color: #002d72; margin-bottom: 8px; }
.about-card-sub { color: #64748b; font-size: 15px; }

/* HOW IT WORKS */
.how { padding: 100px 32px; background: #fdfdfe; }
.steps-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; max-width: 1200px; margin: auto; }
.step-card-modern { background: #fff; border-radius: 30px; padding: 40px; position: relative; text-align: center; border: 1px solid #f1f5f9; box-shadow: 0 10px 40px rgba(0,0,0,0.04); transition: all .4s; }
.step-card-modern:hover { transform: translateY(-12px); box-shadow: 0 20px 60px rgba(0,0,0,0.08); border-color: #0066ff22; }
.step-badge { position: absolute; top: 20px; left: 20px; width: 32px; height: 32px; background: #f0f7ff; color: #0066ff; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 14px; }
.step-icon-wrapper { margin-bottom: 24px; }
.step-icon-circle { width: 80px; height: 80px; background: #f0f7ff; color: #0066ff; border-radius: 24px; display: flex; align-items: center; justify-content: center; margin: 0 auto; transition: all .4s; }
.step-card-modern:hover .step-icon-circle { background: #0066ff; color: #fff; transform: scale(1.1) rotate(5deg); }
.step-card-modern h3 { font-size: 20px; font-weight: 800; color: #002d72; margin-bottom: 12px; }
.step-card-modern p { font-size: 15px; color: #64748b; line-height: 1.6; }

/* CTA SECTION */
.cta-section { padding: 60px 32px; }
.cta-card { max-width: 1200px; margin: auto; background: linear-gradient(135deg, #0066ff, #002d72); border-radius: 30px; padding: 50px 60px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 40px; box-shadow: 0 20px 60px rgba(0, 102, 255, 0.3); }
.cta-info { display: flex; align-items: center; gap: 30px; }
.cta-icon-box { width: 80px; height: 80px; background: rgba(255,255,255,0.15); border-radius: 24px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.2); }
.cta-text { color: #fff; }
.cta-text h2 { font-size: 32px; font-weight: 900; margin: 0; color: #fff; }
.cta-text p { font-size: 17px; color: #fff; margin: 8px 0 0; }
.btn-cta-modern { display: flex; align-items: center; gap: 16px; background: #fff; color: #0066ff; padding: 16px 36px; border-radius: 20px; font-weight: 800; text-decoration: none; font-size: 16px; transition: all .3s; }
.btn-cta-modern:hover { transform: scale(1.05); box-shadow: 0 10px 30px rgba(255,255,255,0.2); }

/* FAQ SECTION */
.faq-section { padding: 100px 32px; background: #fff; }
.faq-container { max-width: 800px; margin: auto; display: flex; flex-direction: column; gap: 16px; }
.faq-accordion-item { background: #f8fafc; border: 1px solid #eef2f6; border-radius: 20px; padding: 24px 30px; cursor: pointer; transition: all .3s; }
.faq-accordion-item:hover { border-color: #0066ff33; box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
.faq-accordion-item.active { border-color: #0066ff; background: #fff; box-shadow: 0 15px 40px rgba(0, 102, 255, 0.08); }
.faq-header { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
.faq-header h3 { font-size: 18px; font-weight: 700; color: #002d72; margin: 0; }
.faq-plus-icon { width: 32px; height: 32px; background: #f0f7ff; color: #0066ff; border-radius: 10px; display: flex; align-items: center; justify-content: center; transition: all .3s; }
.faq-accordion-item.active .faq-plus-icon { background: #0066ff; color: #fff; transform: rotate(180deg); }
.faq-body { padding-top: 20px; color: #64748b; font-size: 16px; line-height: 1.7; border-top: 1px solid #f1f5f9; margin-top: 20px; }

/* CONTACT SECTION */
.contact-section { padding: 100px 32px; background: #fcfdfe; }
.contact-grid { max-width: 1200px; margin: auto; display: grid; grid-template-columns: 1fr 1.5fr; gap: 80px; align-items: center; }
.contact-methods { margin-top: 40px; display: flex; flex-direction: column; gap: 20px; }
.contact-method { display: flex; align-items: center; gap: 16px; font-size: 17px; color: #4b5563; font-weight: 600; }
.method-icon { width: 44px; height: 44px; background: #fff; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 15px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; }

.contact-form-panel { background: #fff; padding: 50px; border-radius: 30px; box-shadow: 0 20px 70px rgba(0, 45, 114, 0.06); border: 1px solid #f1f5f9; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
.form-group input, .form-group textarea { width: 100%; padding: 16px 20px; background: #f8fafc; border: 1px solid #eef2f6; border-radius: 14px; font-family: inherit; font-size: 15px; transition: all .3s; }
.form-group input:focus, .form-group textarea:focus { outline: none; background: #fff; border-color: #0066ff; box-shadow: 0 0 0 4px rgba(0, 102, 255, 0.1); }
.btn-submit-modern { width: 100%; padding: 18px; background: linear-gradient(135deg, #0066ff, #002d72); color: #fff; border: none; border-radius: 16px; font-size: 16px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; transition: all .3s; margin-top: 10px; }
.btn-submit-modern:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0, 45, 114, 0.2); }

/* FOOTER */
.main-footer { background: #001a42; color: #fff; padding: 80px 32px 40px; position: relative; z-index: 1; }
.footer-top { max-width: 1200px; margin: auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 40px; padding-bottom: 50px; border-bottom: 1px solid rgba(255,255,255,0.1); }
.footer-brand-box { display: flex; align-items: center; gap: 16px; }
.footer-logo { background: rgba(255,255,255,0.1); width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; border-radius: 16px; }
.footer-brand-text strong { display: block; font-size: 22px; letter-spacing: 2px; }
.footer-brand-text small { display: block; font-size: 12px; opacity: 0.5; text-transform: uppercase; letter-spacing: 1px; }
.footer-nav { display: flex; gap: 30px; }
.footer-nav a { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 15px; font-weight: 600; transition: color .3s; }
.footer-nav a:hover { color: #fff; }
.footer-social-links { display: flex; gap: 12px; }
.social-btn { width: 44px; height: 44px; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; border-radius: 12px; color: #fff; text-decoration: none; transition: all .3s; }
.social-btn:hover { background: #0066ff; transform: translateY(-5px); }
.footer-bottom { text-align: center; padding-top: 40px; }
.footer-bottom p { font-size: 14px; opacity: 0.4; }

/* MODAL */
.login-overlay { position: fixed; inset: 0; background: rgba(0, 45, 114, 0.6); backdrop-filter: blur(10px); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.login-card { background: #fff; width: 400px; padding: 50px; border-radius: 30px; text-align: center; box-shadow: 0 30px 100px rgba(0,0,0,0.3); animation: modalIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
@keyframes modalIn { from { opacity: 0; transform: translateY(30px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
.login-icon-box { display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.login-card h3 { font-size: 26px; font-weight: 800; color: #002d72; margin-bottom: 12px; }
.login-card p { color: #64748b; font-size: 16px; margin-bottom: 30px; line-height: 1.6; }
.login-actions { display: flex; flex-direction: column; gap: 12px; }
.login-btn { background: #0066ff; color: #fff; padding: 16px; border-radius: 16px; font-weight: 800; text-decoration: none; transition: all .3s; }
.login-btn:hover { background: #0052cc; transform: translateY(-2px); }
.cancel-btn { background: #f8fafc; border: 1px solid #eef2f6; padding: 14px; border-radius: 16px; font-weight: 700; color: #64748b; cursor: pointer; transition: all .3s; }
.cancel-btn:hover { background: #f1f5f9; }

/* RESPONSIVE */
@media (max-width: 1100px) {
  .hero-content { flex-direction: column; text-align: center; gap: 40px; }
  .hero-text { flex: 1; }
  .hero-desc { margin-left: auto; margin-right: auto; }
  .btn-buscar-main { margin: 0 auto; }
  .hero-img { transform: none; }
  .hero-image-box:hover .hero-img { transform: none; }
  .nav-clock-card { display: none; }
}

@media (max-width: 900px) {
  .nav-auth-btns { display: none; }
  .menu-btn { display: block; }
  .nav-links {
    position: absolute; top: 100%; left: 0; width: 100%;
    background: #002d72; flex-direction: column; align-items: center;
    padding: 30px 0; z-index: 99; opacity: 0; pointer-events: none;
    transform: translateY(-10px); transition: all .3s ease; display: flex;
  }
  .nav-links.active { opacity: 1; pointer-events: all; transform: translateY(0); }
  .contact-grid { grid-template-columns: 1fr; gap: 40px; }
  .contact-info-panel { text-align: center; }
  .contact-methods { align-items: center; }
  .about-inner { flex-direction: column; text-align: center; }
  .cta-card { flex-direction: column; text-align: center; padding: 40px 30px; }
  .cta-info { flex-direction: column; gap: 20px; }
  .footer-top { flex-direction: column; text-align: center; }
  .footer-nav { flex-direction: column; gap: 15px; }
}

@media (max-width: 500px) {
  .hero-text h1 { font-size: 36px; }
  .form-grid { grid-template-columns: 1fr; }
  .contact-form-panel { padding: 30px 20px; }
}

/* ANIMATIONS */
.faq-slide-enter-active, .faq-slide-leave-active { transition: all 0.3s ease-out; max-height: 200px; overflow: hidden; }
.faq-slide-enter-from, .faq-slide-leave-to { max-height: 0; opacity: 0; padding-top: 0; margin-top: 0; }
</style>
