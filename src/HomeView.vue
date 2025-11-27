<template>
  <div class="home">

    <!-- Botón principal -->
    <button class="btn-main" @click="openModal = true">
      Buscar mi tipo de carro
    </button>

    <!-- Modal Selección de Vehículo -->
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
            <i class="icon">{{ veh.icon }}</i>
            <p>{{ veh.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Resultados Car Wash -->
    <div class="results" v-if="selectedVehicle">
      <h2>Car Wash recomendados para {{ selectedVehicle.label }}</h2>

      <div 
        class="carwash-card"
        v-for="cw in filteredCarWash"
        :key="cw.id"
      >
        <img :src="cw.image" class="cw-img" />

        <div class="cw-info">
          <h3>{{ cw.name }}</h3>
          <p>{{ cw.desc }}</p>

          <p class="cw-rating">⭐ {{ cw.rating }} • {{ cw.distance }} km • {{ cw.price }}</p>

          <div class="btn-row">
            <button 
              class="btn-details"
              @click="$router.push(`/carwash/${cw.id}`)"
            > 
              Ver Detalles
            </button>

            <button class="btn-route">Cómo Llegar</button>
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
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}

/* Botón principal */
.btn-main {
  background-color: #64d9d9;
  padding: 15px 25px;
  border: none;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #64d9d9;
  padding: 25px;
  border-radius: 14px;
  width: 500px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: #700c0c;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 50%;
  cursor: pointer;
}

.vehicle-grid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.vehicle-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
}

/* 🔥 BLOQUE COMPLETO CON FONDO VINO */
.carwash-card {
  background: #600000;   /* Color vino */
  color: white;
  display: flex;
  border-radius: 12px;
  padding: 15px;
  margin-top: 20px;
  gap: 15px;
  align-items: center;
}

/* Imagen */
.cw-img {
  width: 130px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
}

/* Información sin fondo separado */
.cw-info {
  flex: 1;
  background: transparent;
}

/* Botones */
.btn-row {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn-details,
.btn-route {
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-details {
  background: #64d9d9;
  color: black;
}

.btn-route {
  background: #145da0;
  color: white;
}
</style>
