

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const openModal = ref(false);
const selectedVehicle = ref(null);
const carWashList = ref([]);

/* TIPOS DE VEHÍCULO */
const vehicleTypes = [
  { id: 1, label: "Sedán", icon: "🚗", type: "normal" },
  { id: 2, label: "SUV", icon: "🚙", type: "normal" },
  { id: 3, label: "Pickup", icon: "🚚", type: "normal" },
  { id: 4, label: "Moto", icon: "🏍️", type: "moto" },
  { id: 5, label: "Deportivo", icon: "🏎️", type: "premium" },
];


//  MAPA MANUAL (AQUÍ CONTROLAS TODO)
const tiposPorCarwash = {
  1: [1, 2], // BlueCar acepta Deportivo y SUV
  2: [3,2],    // otro carwash solo Sedan
  3: [1, 3]
};


/* CARGAR DESDE BACKEND */
// const idModeloSeleccionado = 1; //  el que el usuario elija

onMounted(async () => {
  try {
    const ids = [1, 2, 3,5 , 6 ,8, 9]; //  aquí podrías cargar dinámicamente los IDs disponibles

    const requests = ids.map(id =>
      axios.get(`http://localhost:2629/carwash/${id}`)
    );
   

    const responses = await Promise.all(requests);

    const data = responses.map(r => r.data);

    carWashList.value = data.map(cw => ({
      id: cw.id_carwash,
      name: cw.nombre_carwash,
      desc: cw.descripcion,
      // rating: cw.calificacion_promedio,
      tipos: tiposPorCarwash[cw.id_carwash] || [],
      image: "https://via.placeholder.com/140"
    }));

  } catch (error) {
    console.error("Error cargando carwash:", error);
  }
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



<style scoped>
.home {
  width: 100%;
}

/* ===============================
   HERO VIDEO
================================ */
.hero {
  position: relative;
  height: 80vh;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* overlay OSCURECE pero no tapa */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(20, 93, 160, 0.35),
    rgba(0, 0, 0, 0.35)
  );
  z-index: 1;
  pointer-events: none;
}

/* ===============================
   BOTÓN PRINCIPAL (ARREGLADO)
================================ */
.buscar-btn {
  all: unset;
  display: inline-flex;    
  align-items: center;
  justify-content: center;

  padding: 14px 28px;
  font-size: 18px;
  font-weight: 600;

  background: #1e73be;
  color: white;

  border-radius: 10px;
  cursor: pointer;
  z-index: 5;
}


/* quitar focus azul */
.buscar-btn:focus,
.buscar-btn:active {
  outline: none;
  box-shadow: 0 10px 25px rgba(0,0,0,0.35);
}
/* OVERLAY */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

/* MODAL */
.modal-pro {
  width: 650px;
  padding: 40px;
  border-radius: 28px;
  background: #1f7acb;
  /* background: rgba(15, 23, 42, 0.9); */
  backdrop-filter: blur(25px);

  box-shadow: 0 25px 80px rgba(0,0,0,0.6);
  text-align: center;
  color: white;
}

/* ICONO */
.top-icon {
  width: 65px;
  height: 65px;
  margin: 0 auto 15px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  font-size: 26px;

  background: linear-gradient(135deg, #3b82f6, #a855f7);
}

/* TEXTOS */
.title {
  font-size: 28px;
  font-weight: 700;
}

.subtitle {
  font-size: 14px;
  color: #cbd5e1;
  margin-bottom: 30px;
}

/* GRID */
.grid-pro {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

/* CARD BASE */
.card-pro {
  padding: 22px;
  border-radius: 18px;

  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);

  cursor: pointer;
  transition: 0.3s;
  position: relative;
  overflow: hidden;
}

/* HOVER ANIMACIÓN */
.card-pro:hover {
  transform: translateY(-6px) scale(1.04);
}

/* ICON */
.card-pro .icon {
  font-size: 30px;
  margin-bottom: 8px;
}

/* LABEL */
.card-pro .label {
  font-size: 16px;
  font-weight: 600;
}

/* DESC */
.card-pro .desc {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 5px;
}

/* ===== COLORES POR TIPO ===== */
.type-1 { border-color: #ec4899; }
.type-1:hover { box-shadow: 0 0 25px #ec4899; }

.type-2 { border-color: #3b82f6; }
.type-2:hover { box-shadow: 0 0 25px #3b82f6; }

.type-3 { border-color: #f97316; }
.type-3:hover { box-shadow: 0 0 25px #f97316; }

.type-4 { border-color: #a855f7; }
.type-4:hover { box-shadow: 0 0 25px #a855f7; }

.type-5 { border-color: #14b8a6; }
.type-5:hover { box-shadow: 0 0 25px #14b8a6; }

/* BOTÓN */
.btn-close {
  margin-top: 30px;
  width: 100%;
  padding: 14px;

  border: none;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.9);
  /* background: linear-gradient(135deg, #3b82f6, #a855f7); */
  color: white;
  font-weight: 600;

  cursor: pointer;
  transition: 0.3s;
}

.btn-close:hover {
  opacity: 0.9;
}

/* 📱 RESPONSIVE */
@media (max-width: 700px) {
  .modal-pro {
    width: 90%;
    padding: 25px;
  }

  .grid-pro {
    grid-template-columns: repeat(2, 1fr);
  }
}
/* ===============================
   VEHÍCULOS
================================ */
.vehicle-grid {
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.vehicle-card {
  background: linear-gradient(135deg, #145da0, #1e88e5);
  color: white;
  padding: 18px;
  border-radius: 14px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
}

.vehicle-card:hover {
  transform: translateY(-4px);
}

/* ===============================
   RESULTS
================================ */
.results {
  max-width: 1000px;
  margin: 50px auto;
  padding: 20px;
}
</style>







<template>
  <div class="home">

    <!-- HERO -->
    <div class="hero">
      <video autoplay muted loop class="hero-video">
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div class="hero-overlay"></div>

      <button class="buscar-btn" @click="openModal = true">
        Buscar mi tipo de carro
      </button>
    </div>

    <!-- MODAL  -->
<div v-if="openModal" class="modal-overlay">
  <div class="modal-pro">

    <!-- <div class="top-icon">🚘</div> -->

    <h2 class="title">Selecciona tu tipo de vehículo</h2>
    <p class="subtitle" style="background-color: transparent;" >
      Elige la categoría que mejor se adapte a tu vehículo
    </p>

    <div class="grid-pro" style="background-color: transparent; 
                                 background: rgba(15, 23, 42, 0.9); 
                                width: 570px; padding: 25px; border-radius: 28px;" >
      <div
        v-for="veh in vehicleTypes"
        :key="veh.id"
        class="card-pro"
        :class="'type-' + veh.id"
        @click="selectVehicle(veh)"
        style="background-color: transparent;"
      >
        <div style="background-color: transparent;" class="icon">{{ veh.icon }}</div>
        <div style="background-color: transparent;" class="label">{{ veh.label }}</div>
        <div style="background-color: transparent;" class="desc">
          {{ getDescription(veh.type) }}
        </div>
      </div>
    </div>

    <button class="btn-close" @click="openModal = false">
      Cerrar
    </button>

  </div>
</div>

    <!-- RESULTADOS -->
    <div v-if="selectedVehicle" class="results">
      <h2>Resultados para {{ selectedVehicle.label }}</h2>

      <div v-for="cw in filteredCarWash" :key="cw.id" class="card">
        <h3>{{ cw.name }}</h3>
        <p>{{ cw.desc }}</p>
        <p>⭐ {{ cw.rating }}</p>

        <button @click="$router.push(`/carwash_d/${cw.id}`)">
          Ver Detalles
        </button>

        <button @click="goToMaps(cw)">
          Cómo llegar
        </button>
      </div>
    </div>

  </div>
</template>

