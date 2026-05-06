<template>
  <div class="legal-page">
    <!-- PREMIUM LEGAL HERO -->
    <header class="legal-hero">
      <div class="hero-visual">
        <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" alt="Law & Order" />
        <div class="hero-overlay-blue"></div>
      </div>
      
      <div class="hero-content">
        <div class="legal-badge reveal-up">Protección Intelectual</div>
        <h1 class="reveal-up">Copyright & Aviso Legal</h1>
        <p class="reveal-up">Salvaguardando la integridad de la plataforma Majoad.</p>
      </div>
    </header>

    <div class="legal-container">
      <main class="legal-card reveal-up">
        <div class="copyright-header">
          <div class="c-icon">©</div>
          <div class="c-text">
            <h2>2026 Majoad Car Wash</h2>
            <span>Todos los derechos reservados.</span>
          </div>
        </div>

        <div class="legal-body">
          <section class="legal-section">
            <div class="section-title">
              <ShieldCheck :size="22" />
              <h3>Propósito de la Plataforma</h3>
            </div>
            <p>
              Majoad es una ecosistema digital de alta gama diseñado para facilitar la búsqueda,
              comparación y reserva de servicios de estética automotriz (car wash),
              ofreciendo a los usuarios una experiencia de usuario rápida, segura y de calidad superior.
            </p>
          </section>

          <section class="legal-section alert">
            <div class="section-title">
              <AlertTriangle :size="22" />
              <h3>Restricciones de Uso</h3>
            </div>
            <p>
              Queda estrictamente prohibida la reproducción total o parcial,
              distribución, ingeniería inversa, modificación o uso no autorizado de este sitio web,
              su código fuente, contenido o sus funcionalidades exclusivas, sin el consentimiento previo
              y por escrito de la junta directiva de Majoad.
            </p>
          </section>

          <section class="legal-section">
            <div class="section-title">
              <Info :size="22" />
              <h3>Marcas y Logotipos</h3>
            </div>
            <p>
              Todos los logotipos, nombres comerciales, imágenes y marcas registradas
              mostradas en la plataforma pertenecen a sus respectivos propietarios y están 
              protegidos bajo las leyes internacionales de propiedad intelectual.
            </p>
          </section>
        </div>

        <div class="legal-contact">
          <div class="contact-box">
            <Mail :size="20" />
            <div class="cb-info">
              <small>Soporte Legal</small>
              <strong>majoad@gmail.com</strong>
            </div>
          </div>
          <div class="contact-box">
            <Phone :size="20" />
            <div class="cb-info">
              <small>Línea de Atención</small>
              <strong>(800) 000-0000</strong>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  Mail, 
  Phone 
} from 'lucide-vue-next';
</script>

<style scoped>
.legal-page {
  background: #f0f4f8;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
}

/* HERO */
.legal-hero {
  position: relative;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
}

.hero-visual {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}
.hero-overlay-blue {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #002d72 0%, #004aad 100%);
  opacity: 0.9;
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
  padding: 0 20px;
}

.legal-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 20px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 24px;
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
}

.legal-hero h1 { font-size: clamp(32px, 5vw, 56px); font-weight: 900; margin-bottom: 12px; letter-spacing: -1.5px; color: #ffffff; }
.legal-hero p { font-size: 18px; color: rgba(255, 255, 255, 0.9); }

/* CONTAINER */
.legal-container {
  max-width: 900px;
  margin: -60px auto 0;
  padding: 0 24px 100px;
  position: relative;
  z-index: 20;
}

.legal-card {
  background: white;
  border-radius: 40px;
  padding: 60px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.05);
}

.copyright-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 50px;
  padding-bottom: 30px;
  border-bottom: 1px solid #f1f5f9;
}
.c-icon {
  width: 70px;
  height: 70px;
  background: #004aad;
  color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 800;
}
.c-text h2 { font-size: 24px; font-weight: 900; color: #1e293b; margin-bottom: 2px; }
.c-text span { font-size: 15px; color: #94a3b8; font-weight: 600; }

.legal-body { display: flex; flex-direction: column; gap: 40px; }

.legal-section { display: flex; flex-direction: column; gap: 12px; }
.section-title { display: flex; align-items: center; gap: 12px; color: #004aad; }
.section-title h3 { font-size: 20px; font-weight: 800; color: #1e293b; }

.legal-section p { font-size: 16px; line-height: 1.7; color: #64748b; }

.legal-section.alert {
  background: #fffcf0;
  padding: 24px;
  border-radius: 24px;
  border-left: 5px solid #ffc107;
}
.legal-section.alert .section-title { color: #d97706; }

/* CONTACT */
.legal-contact {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.contact-box {
  background: #f8fafc;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid #e2e8f0;
  transition: 0.3s;
}
.contact-box:hover { border-color: #004aad; transform: translateY(-3px); }
.contact-box svg { color: #004aad; }

.cb-info small { display: block; font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 2px; }
.cb-info strong { font-size: 15px; color: #1e293b; }

/* ANIMATIONS */
.reveal-up { animation: revealUp 0.8s cubic-bezier(0.2, 1, 0.2, 1) both; }
@keyframes revealUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 640px) {
  .legal-card { padding: 30px; }
  .legal-contact { grid-template-columns: 1fr; }
  .copyright-header { flex-direction: column; text-align: center; }
}
</style>