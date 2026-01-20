<template>
  <div class="home">

    <!-- VIDEO HERO -->
    <div class="hero">
      <video autoplay muted loop playsinline >
        <source src="/videocaewash.mp4" type="video/mp4" />
      </video>

      <div class="hero-overlay"></div>

      <button class="btn-main" @click="openModal = true">
        Buscar mi tipo de carro
      </button>
    </div>

    <!-- MODAL -->
    <div class="modal-overlay" v-if="openModal">
      <div class="modal">
        <div class="modal-header">
          <h3>Selecciona tu tipo de vehículo</h3>
          <button class="close-btn" @click="openModal = false">✕</button>
        </div>

        <div class="vehicle-grid">
          <div
            class="vehicle-card"
            v-for="veh in vehicleTypes"
            :key="veh.id"
            @click="selectVehicle(veh)"
          >
            <span class="icon">{{ veh.icon }}</span>
            <p>{{ veh.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- RESULTADOS -->
    <div class="results" v-if="selectedVehicle">
      <h2>Car Wash recomendados para {{ selectedVehicle.label }}</h2>

      <div class="carwash-card" v-for="cw in filteredCarWash" :key="cw.id">
        <img :src="cw.image" class="cw-img" />

        <div class="cw-info">
          <h3>{{ cw.name }}</h3>
          <p>{{ cw.desc }}</p>

          <p class="cw-rating">
            ⭐ {{ cw.rating }} • {{ cw.distance }} km • {{ cw.price }}
          </p>

          <div class="btn-row">
            
            <button  class="btn-details" @click="$router.push(`/carwash_d`)">
              Ver Detalles
            </button>

            
            <button class="btn-route">Cómo llegar</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script setup>
import { ref, computed } from "vue";

const openModal = ref(false);
const selectedVehicle = ref(null);

/* TIPOS DE VEHÍCULO */
const vehicleTypes = [
  { id: 1, label: "Sedán / Compacto", icon: "🚗", type: "normal" },
  { id: 2, label: "SUV / 4x4", icon: "🚙", type: "normal" },
  { id: 3, label: "Camioneta / Pick-up", icon: "🚚", type: "normal" },
  { id: 4, label: "Van / Minivan", icon: "🚐", type: "normal" },
  { id: 5, label: "Motocicleta", icon: "🏍️", type: "normal" },
  { id: 6, label: "Deportivo / Coupé", icon: "🏎️", type: "premium" },
];

/* BASE DE DATOS LOCAL DE CAR WASH */
const carWashList = [
  {
    id: 1,
    type: "normal",
    name: "Car Wash Rápido",
    desc: "Ideal para vehículos normales.",
    rating: 4.5,
    distance: 1.2,
    price: "$",
    image: "https://via.placeholder.com/140"
  },
  {
    id: 2,
    type: "normal",
    name: "Car Wash Ecológico",
    desc: "Lavado ecológico con productos biodegradables.",
    rating: 4.2,
    distance: 2.0,
    price: "$$",
    image: "https://via.placeholder.com/140"
  },
  {
    id: 3,
    type: "premium",
    name: "Car Wash Premium",
    desc: "Especial para deportivos y autos de lujo.",
    rating: 4.8,
    distance: 3.1,
    price: "$$$",
    image: "https://via.placeholder.com/140"
  },
];

/* FILTRO AUTOMÁTICO */
const filteredCarWash = computed(() => {
  if (!selectedVehicle.value) return [];
  return carWashList.filter(cw => cw.type === selectedVehicle.value.type);
});

/* FUNCIÓN AL SELECCIONAR VEHÍCULO */
function selectVehicle(veh) {
  selectedVehicle.value = veh;
  openModal.value = false;
}
</script>

<style scoped>
.home {
  width: 100%;
}

/* HERO VIDEO */
.hero {
  position: relative;
  height: 80vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero video {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(20, 93, 160, 0.7),
    rgba(0, 0, 0, 0.7)
  );
}

.btn-main {
  position: relative;
  z-index: 2;
  padding: 18px 35px;
  font-size: 20px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  color: white;
  font-weight: bold;
  background: linear-gradient(135deg, #145da0, #1e88e5);
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
  transition: 0.3s;
}

.btn-main:hover {
  transform: scale(1.05);
}

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal {
  width: 520px;
  padding: 30px;
  border-radius: 20px;
  background: linear-gradient(135deg, #ffffff, #f1f6fb);
  box-shadow: 0 15px 40px rgba(0,0,0,0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: linear-gradient(135deg, #7b0d0d, #d32f2f);
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 50%;
  cursor: pointer;
}

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

.vehicle-card:nth-child(3n) {
  background: linear-gradient(135deg, #ffc107, #ff9800);
  color: black;
}

.vehicle-card:nth-child(2n) {
  background: linear-gradient(135deg, #7b0d0d, #c62828);
}

.vehicle-card:hover {
  transform: translateY(-5px);
}

/* RESULTS */
.results {
  max-width: 1000px;
  margin: 50px auto;
  padding: 20px;
}

.carwash-card {
  display: flex;
  gap: 15px;
  padding: 18px;
  border-radius: 16px;
  margin-top: 20px;
  color: white;
  background: linear-gradient(135deg, #7b0d0d, #b71c1c);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.cw-img {
  width: 140px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
}

.cw-info {
  flex: 1;
}

.btn-row {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn-details {
  background: linear-gradient(135deg, #145da0, #1e88e5);
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
}

.btn-route {
  background: linear-gradient(135deg, #ffc107, #ff9800);
  color: black;
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
}

</style>
