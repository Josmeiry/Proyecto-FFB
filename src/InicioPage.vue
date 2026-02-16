<template>
  <div class="landing">

    <!-- Botón flotante -->
    <button class="floating-btn" title="Buscar car wash">
      🔍
    </button>

    <!-- HEADER -->
    <header>
      <nav class="navbar">
        <div class="logo">MAJOAD</div>
        <ul class="nav-links">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#sobre-nosotros">Sobre nosotros</a></li>
          <li><a href="#como-funciona">Cómo funciona</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
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
            <input
              type="text"
              placeholder="Ingresa tu ubicación"
              class="location-input"
            />
            <button class="primary-btn">Buscar car wash</button>
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

    <!-- FOOTER -->
    <footer class="footer">
      <p style="background-color: transparent;" >© {{ new Date().getFullYear() }} MAJOAD</p>
    </footer>

  </div>
</template>

<script>
export default {
  name: "InicioPage",
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: ""
      },

      faqs: [
        {
          question: "¿La plataforma cobra al usuario?",
          answer: "No, el uso es completamente gratuito.",
          open: false
        },
        {
          question: "¿Puedo registrar mi car wash?",
          answer: "Sí, desde el botón “Registrar mi car wash”.",
          open: false
        }
      ]
    };
  },
  methods: {
    handleSubmit() {
      alert("¡Gracias por contactarnos!");
      this.form = { name: "", email: "", message: "" };
    },
    toggleFaq(index) {
      this.faqs[index].open = !this.faqs[index].open;
    },
    sendEmail() {
      const phone = "8093518191"; // TU NÚMERO RD sin +

     const message = `
     📩 *Nuevo contacto desde MAJOAD*
     👤 Nombre: ${this.form.name}
     📧 Correo: ${this.form.email}
     💬 Mensaje: ${this.form.message}
       `;

     const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
     window.open(url, "_blank");

     this.form = { name: "", email: "", message: "" };
      alert("¡Gracias por contactarnos! Te responderemos pronto.");

    }

  }
};
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
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 48px;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(0,0,0,.05);
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


/* Footer */
.footer {
  padding: 24px;
  background: #0b1120;
  color: white;
  text-align: center;
}
</style>
