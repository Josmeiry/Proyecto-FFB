<template>
  <div class="terms-page">
    <!-- PREMIUM TERMS HERO -->
    <header class="terms-hero">
      <div class="hero-bg-visual">
        <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000" alt="Legal Background" />
        <div class="hero-overlay-dark"></div>
      </div>
      
      <div class="hero-content">
        <div class="badge reveal-up">Centro de Ayuda Legal</div>
        <h1 class="reveal-up" style="transition-delay: 0.1s">Términos de Servicio</h1>
        <p class="reveal-up" style="transition-delay: 0.2s">Transparencia y compromiso con nuestros usuarios de Majoad.</p>
        
        <div class="hero-meta reveal-up" style="transition-delay: 0.3s">
          <div class="meta-pill"><Clock :size="14" /> Actualizado: 24 Mar 2026</div>
          <div class="meta-pill"><Shield :size="14" /> 100% Seguro</div>
        </div>
      </div>
    </header>

    <div class="terms-container">
      <main class="terms-card">
        <Transition name="fade-slide">
          <div v-if="showIntro" class="intro-text">
            <div class="intro-accent"></div>
            <Info :size="28" class="intro-icon" />
            <div class="intro-body">
              <h4>Protocolo de Bienvenida</h4>
              <p>
                Al utilizar Majoad, te unes a una comunidad dedicada al cuidado automotriz de alta gama. Al acceder, aceptas cumplir con los siguientes estándares:
              </p>
            </div>
          </div>
        </Transition>

        <div class="terms-grid">
          <!-- 1 -->
          <section class="term-section">
            <div class="section-head">
              <div class="num-box">01</div>
              <CheckCircle :size="20" />
              <h3>Aceptación</h3>
            </div>
            <p>
              Al acceder y utilizar Majoad, aceptas estos Términos de Servicio de manera vinculante y total.
            </p>
          </section>

          <!-- 2 -->
          <section class="term-section">
            <div class="section-head">
              <div class="num-box">02</div>
              <Smartphone :size="20" />
              <h3>El Servicio</h3>
            </div>
            <p>
              Majoad permite encontrar, comparar y reservar servicios de car wash de élite de forma organizada.
            </p>
          </section>

          <!-- 3 -->
          <section class="term-section">
            <div class="section-head">
              <div class="num-box">03</div>
              <Shield :size="20" />
              <h3>Uso Legal</h3>
            </div>
            <ul class="premium-list">
              <li>Uso exclusivo para fines lícitos.</li>
              <li>Protección de credenciales personales.</li>
              <li>Respeto a la integridad del sistema.</li>
            </ul>
          </section>

          <!-- 4 -->
          <section class="term-section">
            <div class="section-head">
              <div class="num-box">04</div>
              <FileText :size="20" />
              <h3>Propiedad</h3>
            </div>
            <p>
              Todo el ecosistema de Majoad es propiedad exclusiva protegida bajo leyes de propiedad intelectual.
            </p>
          </section>

          <!-- 5 -->
          <section class="term-section">
            <div class="section-head">
              <div class="num-box">05</div>
              <Zap :size="20" />
              <h3>Disponibilidad</h3>
            </div>
            <p>
              Nos esforzamos por un tiempo de actividad máximo, reservando derecho a mantenimientos críticos.
            </p>
          </section>

          <!-- 6 -->
          <section class="term-section">
            <div class="section-head">
              <div class="num-box">06</div>
              <Lock :size="20" />
              <h3>Privacidad</h3>
            </div>
            <p>
              Tu información es encriptada y tratada bajo estrictas políticas de confidencialidad.
            </p>
          </section>

          <!-- 7 -->
          <section class="term-section">
            <div class="section-head">
              <div class="num-box">07</div>
              <AlertTriangle :size="20" />
              <h3>Garantía</h3>
            </div>
            <p>
              Majoad actúa como intermediario de confianza, facilitando la mejor experiencia de servicio.
            </p>
          </section>

          <!-- 8 -->
          <section class="term-section">
            <div class="section-head">
              <div class="num-box">08</div>
              <Edit3 :size="20" />
              <h3>Cambios</h3>
            </div>
            <p>
              Nos reservamos el derecho de actualizar estos términos para reflejar mejoras en la plataforma.
            </p>
          </section>

          <!-- 9 -->
          <section class="term-section full-width">
            <div class="section-head">
              <div class="num-box">09</div>
              <Map :size="20" />
              <h3>Ley Dominicana</h3>
            </div>
            <p>
              Estos términos se rigen bajo las leyes vigentes de la República Dominicana y sus tribunales.
            </p>
          </section>
        </div>

        <footer class="terms-footer">
          <div class="footer-info">
            <p>© 2026 Majoad Car Wash.</p>
            <span>Seguridad Certificada por Majoad Tech</span>
          </div>
          <button class="btn-print-lux" @click="imprimir">
            <FileText :size="16" /> Imprimir Documento
          </button>
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { 
  CheckCircle, 
  Smartphone, 
  Shield, 
  FileText, 
  Clock, 
  Lock, 
  AlertTriangle, 
  Edit3, 
  Map,
  Info,
  Zap
} from 'lucide-vue-next';

const showIntro = ref(true);

onMounted(() => {
  setTimeout(() => {
    showIntro.value = false;
  }, 8000);
});

const imprimir = () => {
  window.print();
};
</script>

<style scoped>
.terms-page {
  background: #f0f4f8;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
}

/* HERO IMPROVED */
.terms-hero {
  position: relative;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
}

.hero-bg-visual {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero-bg-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}
.hero-overlay-dark {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #002d72 0%, rgba(0, 74, 173, 0.9) 100%);
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
  padding: 0 20px;
}

.badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
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

.terms-hero h1 { font-size: clamp(32px, 5vw, 64px); font-weight: 900; margin-bottom: 16px; letter-spacing: -2px; color: #ffffff; }
.terms-hero p { font-size: 18px; opacity: 0.8; margin-bottom: 32px; }

.hero-meta { display: flex; gap: 15px; justify-content: center; }
.meta-pill {
  background: rgba(0,0,0,0.2);
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
}

/* CONTAINER */
.terms-container {
  max-width: 1000px;
  margin: -60px auto 0;
  padding: 0 24px 100px;
  position: relative;
  z-index: 20;
}

.terms-card {
  background: white;
  border-radius: 40px;
  padding: 50px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.05);
}

.intro-text {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 30px;
  background: #f8fafc;
  border-radius: 24px;
  margin-bottom: 50px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}
.intro-accent {
  position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 6px;
  background: #ffc107;
}
.intro-icon { color: #004aad; flex-shrink: 0; margin-top: 4px; }
.intro-body h4 { font-size: 18px; font-weight: 800; margin-bottom: 4px; color: #1e293b; }
.intro-body p { font-size: 15px; line-height: 1.6; color: #64748b; }

/* GRID */
.terms-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.full-width { grid-column: span 2; }

.section-head { display: flex; align-items: center; gap: 12px; color: #004aad; margin-bottom: 12px; }
.num-box {
  font-size: 11px; font-weight: 900; background: #f1f5f9; width: 30px; height: 30px;
  display: flex; align-items: center; justify-content: center; border-radius: 10px; color: #94a3b8;
}
.section-head h3 { font-size: 19px; font-weight: 800; color: #1e293b; }

.term-section p { font-size: 14px; line-height: 1.7; color: #64748b; }

.premium-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.premium-list li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #64748b; }
.premium-list li::before { content: ''; width: 5px; height: 5px; background: #ffc107; border-radius: 50%; }

/* FOOTER */
.terms-footer {
  margin-top: 60px; padding-top: 40px; border-top: 1px solid #f1f5f9;
  display: flex; justify-content: space-between; align-items: center;
}
.footer-info p { font-size: 14px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
.footer-info span { font-size: 12px; color: #94a3b8; }

.btn-print-lux {
  background: #1e293b; border: none; padding: 12px 24px; border-radius: 14px;
  font-weight: 700; color: white; cursor: pointer; transition: 0.3s;
  display: flex; align-items: center; gap: 10px;
}
.btn-print-lux:hover { background: #004aad; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0, 74, 173, 0.2); }

/* ANIMATIONS */
.reveal-up { animation: revealUp 0.8s cubic-bezier(0.2, 1, 0.2, 1) both; }
@keyframes revealUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(-20px); margin-bottom: 0; }

@media (max-width: 768px) {
  .terms-grid { grid-template-columns: 1fr; }
  .full-width { grid-column: auto; }
}
</style>