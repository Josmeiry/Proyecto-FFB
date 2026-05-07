<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { 
  Car, 
  Truck, 
  Bike, 
  Gauge, 
  Smartphone, 
  MapPin, 
  Star, 
  ChevronRight,
  XCircle,
  CarFront
} from 'lucide-vue-next';

const openModal = ref(false);
const selectedVehicle = ref(null);
const carWashList = ref([]);
const videoApp = ref("");
const showHeroText = ref(true);

/* TIPOS DE VEHÍCULO */
const vehicleTypes = [
  { id: 1, label: "Sedán", icon: Car, type: "normal" },
  { id: 2, label: "SUV", icon: CarFront, type: "normal" },
  { id: 3, label: "Pickup", icon: Truck, type: "normal" },
  { id: 4, label: "Moto", icon: Bike, type: "moto" },
  { id: 5, label: "Deportivo", icon: Gauge, type: "premium" },
];


//  MAPA MANUAL (AQUÍ CONTROLAS TODO)
const tiposPorCarwash = {
  1: [1, 2], // BlueCar acepta Deportivo y SUV
  2: [3,2],    // otro carwash solo Sedan
  3: [1, 3]
};


/* CARGAR DESDE BACKEND */
onMounted(async () => {
  try {
    const ids = [1, 2, 3,5 , 6 ,8,10]; 
    const requests = ids.map(id =>
      axios.get(`https://proyecto-bff.onrender.com/carwash/${id}`)
    );
    const responses = await Promise.all(requests);
    const data = responses.map(r => r.data);

    carWashList.value = data.map(cw => ({
      id: cw.id_carwash,
      name: cw.nombre_carwash,
      desc: cw.descripcion,
      tipos: tiposPorCarwash[cw.id_carwash] || [],
      image: "https://via.placeholder.com/140"
    }));

  } catch (error) {
    console.error("Error cargando carwash:", error);
  }
});

onMounted(async () => {
  try {
    const res = await axios.get(
      "https://proyecto-bff.onrender.com/media",
      {
        params: {
          entidad_tipo: "app",
          tipo: "video"
        }
      }
    );

    if (res.data.length) {
      videoApp.value = res.data[0].url.replace(
        "http://localhost:2629",
        "https://proyecto-bff.onrender.com",
        "https://proyecto-raewc36y4-josmeiry-munoz-inoas-projects.vercel.app"
      );
    }

  } catch (error) {
    console.error("Error cargando video:", error);
  }

  // Ocultar texto del hero después de 5 segundos
  setTimeout(() => {
    showHeroText.value = false;
  }, 6000);
});

/* FILTRO MULTI-TIPO */
const filteredCarWash = computed(() => {
  if (!selectedVehicle.value) return [];
  return carWashList.value.filter(cw =>
    cw.tipos.includes(selectedVehicle.value.id)
  );
});


function selectVehicle(veh) {
  selectedVehicle.value = veh;
  openModal.value = false;
}

function getDescription(type) {
  if (type === "normal") return "Uso diario";
  if (type === "moto") return "Motocicletas";
  if (type === "premium") return "Alta gama";
  return "";
}

/* GOOGLE MAPS */
function goToMaps(cw) {
  const query = encodeURIComponent(cw.name + " Santiago");
  const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
  window.open(url, "_blank");
}
</script>

<template>
  <div class="home-container">
    <!-- PREMIUM HERO -->
    <section class="hero-premium">
      <div class="hero-bg">
        <video autoplay muted loop playsinline class="hero-video">
          <source :src="videoApp || '/Cinematic Carwash Promo Video 4K - Audi S4 - Car Spa.mp4'" type="video/mp4" />
        </video>
        <div class="hero-overlay"></div>
      </div>

      <div class="hero-content">
        <Transition name="fade-slow">
          <div v-if="showHeroText" class="hero-text-box">
            <h1 class="hero-title">Premium care for your vehicle</h1>
            <p class="hero-subtitle">FAST, SAFE AND PROFESSIONAL SERVICE</p>
          </div>
        </Transition>
        
        <div class="hero-actions">
          <button @click="openModal = true" class="btn-main-premium">
            Buscar mi tipo de carro
          </button>
        </div>
      </div>
    </section>

    <!-- VEHICLE SELECTION MODAL -->
    <Transition name="fade">
      <div v-if="openModal" class="modal-overlay" @click.self="openModal = false">
        <div class="modal-glass">
          <h2 class="modal-title">Selecciona tu vehículo</h2>
          <p class="modal-sub">Elige la categoría para encontrar el servicio perfecto</p>

          <div class="vehicle-grid-premium">
            <div
              v-for="veh in vehicleTypes"
              :key="veh.id"
              class="vehicle-card-premium"
              @click="selectVehicle(veh)"
            >
              <div class="veh-icon-box">
                <component :is="veh.icon" :size="32" stroke-width="1.5" />
              </div>
              <div class="veh-info">
                <span class="veh-label">{{ veh.label }}</span>
                <span class="veh-desc">{{ getDescription(veh.type) }}</span>
              </div>
            </div>
          </div>

          <button class="btn-modal-close" @click="openModal = false">Cerrar</button>
        </div>
      </div>
    </Transition>

    <!-- RESULTS SECTION -->
    <section v-if="selectedVehicle" class="results-section">
      <div class="results-header">
        <div class="results-tag">Resultados encontrados</div>
        <h2>Especialistas para su {{ selectedVehicle.label }}</h2>
      </div>

      <div class="carwash-grid">
        <div v-for="cw in filteredCarWash" :key="cw.id" class="cw-card-premium">
          <div class="cw-image-box">
            <img :src="cw.image" alt="Car Wash" />
            <!-- <div class="cw-rating">⭐ 4.8</div> -->
          </div>
          <div class="cw-details">
            <h3>{{ cw.name }}</h3>
            <p>{{ cw.desc }}</p>
            <div class="cw-actions">
              <button class="btn-detail" @click="$router.push(`/carwash_d/${cw.id}`)">Ver Detalles</button>
              <button class="btn-maps" @click="goToMaps(cw)">Cómo llegar</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  background: #000a1a;
  min-height: 100vh;
}

/* HERO PREMIUM */
.hero-premium {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-bg { position: absolute; inset: 0; z-index: 0; }
.hero-video { width: 100%; height: 100%; object-fit: cover; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0, 10, 26, 0.4), rgba(0, 10, 26, 0.9)); }

.hero-content { z-index: 10; text-align: center; max-width: 900px; padding: 0 20px; }
.hero-title { font-size: clamp(40px, 6vw, 84px); font-weight: 800; color: #fff; line-height: 0.95; margin-bottom: 24px; }
.hero-subtitle { font-size: 16px; color: rgba(255,255,255,0.7); font-weight: 600; letter-spacing: 4px; margin-bottom: 48px; text-transform: uppercase; }

.btn-main-premium {
  background: #0066ff;
  color: #fff;
  border: none;
  padding: 18px 48px;
  border-radius: 100px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0, 102, 255, 0.3);
}
.btn-main-premium:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0, 102, 255, 0.5); }

/* MODAL GLASSMORPHISM */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 5, 15, 0.8);
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-glass {
  background: rgba(13, 27, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 750px;
  max-width: 95%;
  padding: 60px 40px;
  border-radius: 40px;
  text-align: center;
  box-shadow: 0 50px 100px rgba(0,0,0,0.8);
  position: relative;
}

.modal-title { 
  font-size: 36px; 
  font-weight: 800; 
  color: #fff; 
  margin-bottom: 12px; 
  letter-spacing: -0.5px;
}
.modal-sub { color: rgba(255,255,255,0.4); font-size: 15px; margin-bottom: 50px; }

.vehicle-grid-premium { 
  display: grid; 
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px; 
}

.vehicle-card-premium {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 35px 20px;
  border-radius: 28px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
  overflow: hidden;
}

.vehicle-card-premium::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(239, 68, 68, 0.15) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s;
}

.vehicle-card-premium:hover { 
  transform: translateY(-8px); 
  background: rgba(255, 255, 255, 0.06); 
  border-color: #ef4444;
  box-shadow: 0 20px 40px rgba(239, 68, 68, 0.2);
}

.vehicle-card-premium:hover::before { opacity: 1; }

.veh-icon-box {
  width: 64px;
  height: 64px;
  background: rgba(0, 102, 255, 0.1);
  color: #0066ff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s;
  z-index: 1;
}

.vehicle-card-premium:hover .veh-icon-box {
  background: #ef4444;
  color: #fff;
  transform: scale(1.1);
}

.veh-info { z-index: 1; }
.veh-label { display: block; font-size: 19px; font-weight: 700; color: #fff; margin-bottom: 4px; }
.veh-desc { font-size: 11px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600; }

.btn-modal-close { 
  margin-top: 50px; 
  background: rgba(255, 255, 255, 0.05); 
  border: 1px solid rgba(255, 255, 255, 0.1); 
  color: rgba(255, 255, 255, 0.8); 
  padding: 14px 40px; 
  border-radius: 16px; 
  font-weight: 700;
  cursor: pointer; 
  transition: all 0.3s; 
}
.btn-modal-close:hover { 
  background: #fff; 
  color: #0d1b2a; 
  transform: translateY(-2px);
}

/* RESULTS */
.results-section { max-width: 1200px; margin: 0 auto; padding: 100px 32px; }
.results-header { text-align: center; margin-bottom: 60px; }
.results-tag { color: #0066ff; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; margin-bottom: 12px; }
.results-header h2 { font-size: 36px; font-weight: 800; color: #fff; }

.carwash-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 30px; }
.cw-card-premium {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 30px;
  overflow: hidden;
  transition: all 0.4s;
}
.cw-card-premium:hover { transform: translateY(-10px); border-color: rgba(255,255,255,0.1); }
.cw-image-box { height: 200px; position: relative; }
.cw-image-box img { width: 100%; height: 100%; object-fit: cover; }
.cw-rating { position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); color: #fff; padding: 5px 12px; border-radius: 10px; font-weight: 700; font-size: 14px; }

.cw-details { padding: 30px; }
.cw-details h3 { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 12px; }
.cw-details p { color: rgba(255,255,255,0.5); font-size: 15px; margin-bottom: 24px; line-height: 1.6; }

.cw-actions { display: flex; gap: 12px; }
.btn-detail { flex: 1; background: #0066ff; color: #fff; border: none; padding: 14px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: 0.3s; }
.btn-maps { flex: 1; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); padding: 14px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: 0.3s; }

/* ANIMATIONS */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.fade-slow-enter-active, .fade-slow-leave-active { transition: opacity 1.5s ease-in-out; }
.fade-slow-enter-from, .fade-slow-leave-to { opacity: 0; }
</style>
