<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Heart, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  Settings, 
  Droplets, 
  Wind, 
  Zap, 
  ShieldCheck, 
  Smartphone,
  Star,
  Clock,
  Shield,
  CheckCircle2,
  Navigation,
  Quote,
  Calendar
} from 'lucide-vue-next';

const route = useRoute();
const carwash = ref(null);
const esFavorito = ref(false);

const direccion = ref({
  pais: "",
  region: "",
  provincia: "",
  municipio: "",
  ciudad: "",
  barrio: "",
  calle: ""
});

const images = [
  "https://images.unsplash.com/photo-1605559424843-9b8bcb64d409",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
  "https://images.unsplash.com/photo-1511910849309-0dffb8785146",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70"
];

const activeImage = ref(images[0]);

const nextImage = () => {
  const i = images.indexOf(activeImage.value);
  activeImage.value = images[(i + 1) % images.length];
};

const prevImage = () => {
  const i = images.indexOf(activeImage.value);
  activeImage.value = images[(i - 1 + images.length) % images.length];
};

const isOpen = () => {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 8 && hour < 19;
};

const toggleFavorito = () => {
  if (!carwash.value) return;
  const id = carwash.value.id_carwash;
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(f => f !== id);
    esFavorito.value = false;
  } else {
    favoritos.push(id);
    esFavorito.value = true;
  }
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
};

onMounted(async () => {
  try {
    const id = route.params.id;
    const res = await axios.get(`https://proyecto-bff.onrender.com/carwash/${id}`);
    carwash.value = res.data;
    
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    esFavorito.value = favoritos.includes(res.data.id_carwash);

    direccion.value = {
      pais: res.data?.direccion?.calle?.barrio?.ciudad?.municipio?.provincia?.region?.pais?.nombre || "",
      region: res.data?.direccion?.calle?.barrio?.ciudad?.municipio?.provincia?.region?.nombre || "",
      provincia: res.data?.direccion?.calle?.barrio?.ciudad?.municipio?.provincia?.nombre || "",
      municipio: res.data?.direccion?.calle?.barrio?.ciudad?.municipio?.nombre || "",
      ciudad: res.data?.direccion?.calle?.barrio?.ciudad?.nombre || "",
      barrio: res.data?.direccion?.calle?.barrio?.nombre || "",
      calle: res.data?.direccion?.calle?.nombre || ""
    };
  } catch (error) {
    console.error("Error cargando detalle:", error);
  }
});
</script>

<template>
  <div class="luxury-detail-view">
    <!-- HERO HEADER (More Filled & Visual) -->
    <header class="luxury-hero">
      <!-- Image Background with overlay -->
      <div class="hero-image-bg">
        <img src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=2000" alt="Background" />
        <div class="hero-gradient-overlay"></div>
      </div>

      <div class="hero-content">
        <div class="brand-header reveal-up">
          <div class="badge-row">
            <span class="status-tag" :class="{ open: isOpen() }">
               {{ isOpen() ? 'Abierto ahora' : 'Cerrado' }}
            </span>
            <span class="premium-tag"><Star :size="14" /> Premium Partner</span>
          </div>
          
          <h1 v-if="carwash" class="main-title">{{ carwash.nombre_carwash }}</h1>
          <h1 v-else class="main-title loading-text">Cargando Carwash...</h1>
          
          <p v-if="carwash" class="main-desc">{{ carwash.descripcion || 'Especialistas en cuidado automotriz con los mejores estándares de calidad.' }}</p>
          
          <div class="hero-quick-actions">
            <button @click="toggleFavorito" class="btn-hero-action" :class="{ active: esFavorito }">
              <Heart :size="18" :fill="esFavorito ? '#ffc107' : 'none'" /> Favorito
            </button>
            <button class="btn-hero-action primary">
              <Calendar :size="18" /> Agendar Cita
            </button>
          </div>
        </div>

        <div class="hero-stats reveal-up">
          <div class="stat-card-lux">
            <div class="stat-icon-lux"><MapPin :size="24" /></div>
            <div class="stat-info-lux">
              <small>Ubicación</small>
              <span>{{ direccion.ciudad || 'Santiago, DR' }}</span>
            </div>
          </div>
          <div class="stat-card-lux">
            <div class="stat-icon-lux"><Star :size="24" /></div>
            <div class="stat-info-lux">
              <small>Valoración</small>
              <span>4.9 / 5.0</span>
            </div>
          </div>
          <div class="stat-card-lux">
            <div class="stat-icon-lux"><ShieldCheck :size="24" /></div>
            <div class="stat-info-lux">
              <small>Certificado</small>
              <span>Majoad Quality</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="main-layout">
      <!-- LEFT CONTENT -->
      <main class="content-side">
        <!-- GALLERY -->
        <section class="premium-gallery reveal-up">
          <div class="gallery-wrapper">
            <div class="main-viewport">
              <img :src="activeImage" alt="Gallery" />
              <div class="view-nav">
                <button @click="prevImage" class="arrow-btn"><ChevronLeft :size="24" /></button>
                <button @click="nextImage" class="arrow-btn"><ChevronRight :size="24" /></button>
              </div>
            </div>
            <div class="thumb-list">
              <div 
                v-for="(img, i) in images" 
                :key="i" 
                class="thumb-item" 
                :class="{ active: img === activeImage }"
                @click="activeImage = img"
              >
                <img :src="img" alt="Thumb" />
              </div>
            </div>
          </div>
        </section>

        <!-- INFO CARDS -->
        <section class="info-card-premium reveal-up">
          <div class="card-section">
            <h3><Info :size="22" /> Acerca del establecimiento</h3>
            <p v-if="carwash">{{ carwash.descripcion }}</p>
            <div class="contact-grid">
              <div class="contact-pill"><Phone :size="16" /> {{ carwash?.telefono }}</div>
              <div class="contact-pill"><Mail :size="16" /> {{ carwash?.correo }}</div>
              <div class="contact-pill address"><MapPin :size="16" /> {{ direccion.calle }}, {{ direccion.barrio }}</div>
            </div>
          </div>

          <div class="card-section">
            <h3><Settings :size="22" /> Nuestros Servicios</h3>
            <div class="services-grid-luxury">
              <div class="service-item-lux">
                <div class="s-icon"><Droplets :size="24" /></div>
                <span>Lavado Exterior</span>
              </div>
              <div class="service-item-lux">
                <div class="s-icon"><Wind :size="24" /></div>
                <span>Detallado Interior</span>
              </div>
              <div class="service-item-lux">
                <div class="s-icon"><Zap :size="24" /></div>
                <span>Pulido & Cera</span>
              </div>
              <div class="service-item-lux">
                <div class="s-icon"><ShieldCheck :size="24" /></div>
                <span>Protección Pro</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- RIGHT SIDEBAR (BOOKING) -->
      <aside class="sidebar-side">
        <div class="booking-glass-card reveal-up">
          <div class="booking-top">
            <h4>Reserva tu turno</h4>
            <p>Atención prioritaria para clientes Majoad</p>
          </div>
          
          <div class="booking-buttons">
            <button class="btn-lux btn-whatsapp">
              <Smartphone :size="20" /> WhatsApp
            </button>
            <button class="btn-lux btn-call">
              <Phone :size="20" /> Llamar ahora
            </button>
          </div>

          <button @click="toggleFavorito" class="btn-favorite-lux" :class="{ faved: esFavorito }">
            <Heart :size="20" :fill="esFavorito ? '#ffc107' : 'none'" /> 
            {{ esFavorito ? 'En tus favoritos' : 'Guardar en favoritos' }}
          </button>

          <div class="booking-footer">
            <div class="price-estimate">
              <small>Precio base</small>
              <strong>$500.00</strong>
            </div>
            <div class="time-estimate">
              <small>Duración aprox.</small>
              <strong>45 min</strong>
            </div>
          </div>
        </div>

        <!-- PROMO CARD -->
        <div class="luxury-promo reveal-up">
          <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70" alt="Promo" />
          <div class="promo-text">
            <span class="p-badge">OFERTA</span>
            <h5>Lavado de Motor</h5>
            <p>GRATIS con tu servicio Premium</p>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.luxury-detail-view {
  background: #0a192f;
  color: #fff;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

/* HERO IMPROVED */
.luxury-hero {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  overflow: hidden;
}

.hero-image-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero-image-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
  filter: saturate(1.2) contrast(1.1);
}
.hero-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #0a192f 20%, rgba(10, 25, 47, 0.8) 50%, rgba(10, 25, 47, 0.4) 100%);
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 5;
  padding-top: 60px;
}

.badge-row { display: flex; gap: 12px; margin-bottom: 24px; }
.status-tag { 
  display: flex; align-items: center; gap: 6px; 
  padding: 8px 16px; border-radius: 100px; font-size: 12px; font-weight: 800;
  background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.4);
  backdrop-filter: blur(10px);
}
.status-tag.open { background: rgba(34, 197, 94, 0.2); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.4); }
.premium-tag { 
  display: flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 100px; font-size: 12px; font-weight: 800;
  background: rgba(255, 193, 7, 0.2); color: #ffc107; border: 1px solid rgba(255, 193, 7, 0.4);
  backdrop-filter: blur(10px);
}

.main-title { font-size: clamp(40px, 7vw, 84px); font-weight: 900; letter-spacing: -2px; margin-bottom: 16px; line-height: 1; color: #fff; text-shadow: 0 10px 30px rgba(0,0,0,0.5); }
.loading-text { opacity: 0.3; }

.main-desc { font-size: 20px; opacity: 0.8; max-width: 650px; margin-bottom: 40px; line-height: 1.6; }

.hero-quick-actions { display: flex; gap: 16px; margin-bottom: 60px; }
.btn-hero-action {
  padding: 14px 28px; border-radius: 14px; font-weight: 800; font-size: 14px;
  display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.3s;
  background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
}
.btn-hero-action.primary { background: #ffc107; color: #000; border: none; }
.btn-hero-action:hover { transform: translateY(-3px); background: rgba(255,255,255,0.1); }
.btn-hero-action.primary:hover { background: #ff9100; box-shadow: 0 10px 20px rgba(255, 193, 7, 0.3); }

/* STAT CARDS */
.hero-stats { display: flex; gap: 24px; }
.stat-card-lux {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  padding: 20px 30px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  backdrop-filter: blur(20px);
}
.stat-icon-lux { color: #ffc107; opacity: 0.8; }
.stat-info-lux small { display: block; font-size: 11px; text-transform: uppercase; opacity: 0.5; letter-spacing: 1px; }
.stat-info-lux span { font-weight: 800; font-size: 18px; color: #fff; }

/* LAYOUT */
.main-layout {
  max-width: 1200px;
  margin: -60px auto 0;
  padding: 0 40px 100px;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
  position: relative;
  z-index: 10;
}

.premium-gallery { margin-bottom: 40px; }
.gallery-wrapper { background: #112240; border-radius: 32px; padding: 12px; border: 1px solid rgba(255,255,255,0.05); }
.main-viewport { position: relative; height: 520px; border-radius: 24px; overflow: hidden; }
.main-viewport img { width: 100%; height: 100%; object-fit: cover; }
.view-nav { position: absolute; inset: 0; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; pointer-events: none; }
.arrow-btn { 
  width: 54px; height: 54px; border-radius: 50%; background: rgba(0,0,0,0.6); backdrop-filter: blur(10px); 
  border: 1px solid rgba(255,255,255,0.1); color: #fff; cursor: pointer; pointer-events: auto;
  display: flex; align-items: center; justify-content: center; transition: 0.3s;
}
.arrow-btn:hover { background: #ffc107; color: #000; transform: scale(1.1); }

.thumb-list { display: flex; gap: 12px; margin-top: 12px; }
.thumb-item { width: 110px; height: 70px; border-radius: 12px; overflow: hidden; cursor: pointer; opacity: 0.4; transition: 0.3s; }
.thumb-item.active { opacity: 1; ring: 2px solid #ffc107; transform: translateY(-5px); }
.thumb-item img { width: 100%; height: 100%; object-fit: cover; }

.info-card-premium { background: #112240; border-radius: 32px; padding: 40px; border: 1px solid rgba(255,255,255,0.05); }
.card-section { margin-bottom: 40px; }
.card-section h3 { font-size: 22px; font-weight: 800; display: flex; align-items: center; gap: 12px; margin-bottom: 24px; color: #ffc107; }
.card-section p { font-size: 16px; opacity: 0.8; line-height: 1.8; margin-bottom: 30px; }

.contact-grid { display: flex; flex-wrap: wrap; gap: 12px; }
.contact-pill { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 10px 20px; border-radius: 14px; font-size: 14px; font-weight: 700; display: flex; align-items: center; gap: 10px; color: #fff; }

.services-grid-luxury { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.service-item-lux { 
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); 
  padding: 28px; border-radius: 24px; display: flex; align-items: center; gap: 20px; transition: 0.3s;
}
.service-item-lux:hover { background: rgba(255, 193, 7, 0.1); border-color: #ffc107; transform: translateY(-5px); }
.s-icon { color: #ffc107; }

/* SIDEBAR */
.booking-glass-card { background: rgba(17, 34, 64, 0.85); backdrop-filter: blur(20px); border-radius: 32px; padding: 40px; border: 1px solid rgba(255,255,255,0.1); position: sticky; top: 40px; box-shadow: 0 40px 80px rgba(0,0,0,0.5); }
.booking-top h4 { font-size: 26px; font-weight: 900; margin-bottom: 10px; color: #fff; }
.booking-top p { font-size: 15px; opacity: 0.6; margin-bottom: 32px; }

.booking-buttons { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
.btn-lux { padding: 18px; border-radius: 16px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 12px; cursor: pointer; transition: 0.3s; border: none; font-size: 15px; }
.btn-whatsapp { background: #22c55e; color: #fff; }
.btn-call { background: #fff; color: #000; }
.btn-lux:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.4); }

.btn-favorite-lux { width: 100%; padding: 15px; background: transparent; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; color: #fff; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; transition: 0.3s; }
.btn-favorite-lux:hover { border-color: #ffc107; color: #ffc107; }

.booking-footer { display: flex; justify-content: space-between; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.05); }
.booking-footer small { display: block; font-size: 11px; opacity: 0.5; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 1px; }
.booking-footer strong { font-size: 20px; color: #ffc107; font-weight: 900; }

.luxury-promo { margin-top: 40px; position: relative; height: 260px; border-radius: 32px; overflow: hidden; }
.luxury-promo img { width: 100%; height: 100%; object-fit: cover; }
.promo-text { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); padding: 32px; display: flex; flex-direction: column; justify-content: flex-end; }
.p-badge { background: #ffc107; color: #000; padding: 4px 12px; border-radius: 6px; font-weight: 900; font-size: 10px; width: fit-content; margin-bottom: 12px; }
.promo-text h5 { font-size: 22px; font-weight: 800; margin-bottom: 6px; color: #fff; }
.promo-text p { font-size: 14px; opacity: 0.8; color: #fff; }

/* REVEAL ANIMATION */
.reveal-up { animation: revealUp 0.8s cubic-bezier(0.2, 1, 0.2, 1) both; }
@keyframes revealUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1024px) {
  .main-layout { grid-template-columns: 1fr; }
  .luxury-hero { height: auto; padding: 120px 24px; text-align: center; }
  .badge-row, .hero-stats, .hero-quick-actions { justify-content: center; flex-wrap: wrap; }
}
</style>