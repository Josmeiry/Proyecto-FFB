<template>
  <div class="details-page" v-if="carwash">
    
    <!-- Título -->
    <h1>{{ carwash.name }}</h1>

    <!-- Información -->
    <section class="info-section">
      <h2>Acerca de</h2>
      <p>{{ carwash.description }}</p>

      <ul>
        <li v-for="(item, i) in carwash.services" :key="i">
          ✔ {{ item }}
        </li>
      </ul>
    </section>

    <!-- GALERÍA -->
    <section class="gallery-section">
      <h2>Galería</h2>

      <div class="gallery-grid">
        <img
          v-for="(img, i) in carwash.gallery"
          :key="i"
          :src="img"
          class="gallery-img"
        />
      </div>
    </section>

    <!-- ANUNCIOS -->
    <section class="ads-section">
      <h2>Anuncios</h2>

      <div class="ads-placeholder">
        <!-- Aquí tú agregas tu anuncio -->
        <p>Espacio para promociones</p>
      </div>
    </section>

    <!-- VIDEO -->
    <section class="video-section">
      <h2>Video promocional</h2>

      <div class="video-placeholder">
        <!-- Aquí agregas un iframe o video -->
        <p>Insertar video aquí</p>
      </div>
    </section>

    <!-- CONTACTO -->
    <section class="contact-section">
      <h2>Contacto</h2>

      <p>📞 {{ carwash.phone }}</p>
      <p>📧 {{ carwash.email }}</p>

      <button class="btn-cta">Agendar cita</button>
    </section>

  </div>

  <!-- SI NO EXISTE EL ID -->
  <div v-else class="not-found">
    <h2>CarWash no encontrado</h2>
    <p>El ID solicitado no existe.</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const carwash = ref(null);

/* BASE DE DATOS LOCAL (IGUAL QUE EN HomeView) */
const carwashData = [
  {
    id: 1,
    name: "Car Wash Rápido",
    description: "Lavado rápido y eficiente.",
    phone: "+1 555 123 456",
    email: "info@carwashrapido.com",
    services: [
      "Lavado exterior",
      "Pulido",
      "Aspirado interior",
      "Lavado de motor",
    ],
    gallery: [
      "https://picsum.photos/350",
      "https://picsum.photos/351",
      "https://picsum.photos/352",
    ],
  },

  {
    id: 2,
    name: "Car Wash Ecológico",
    description: "Lavado con productos biodegradables.",
    phone: "+1 555 987 654",
    email: "contacto@ecowash.com",
    services: [
      "Lavado ecológico",
      "Limpieza interior sin químicos",
      "Aspirado profundo",
    ],
    gallery: [
      "https://picsum.photos/353",
      "https://picsum.photos/354",
      "https://picsum.photos/355",
    ],
  },
];

onMounted(() => {
  const id = Number(route.params.id);
  carwash.value = carwashData.find(c => c.id === id) || null;
});
</script>

<style scoped>
.details-page {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  color: white;
}

/* Secciones */
.info-section,
.gallery-section,
.ads-section,
.video-section,
.contact-section {
  background: #700c0c;
  padding: 20px;
  margin-top: 20px;
  border-radius: 14px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.gallery-img {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
}

.ads-placeholder,
.video-placeholder {
  background: rgba(255, 255, 255, 0.15);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  height: 180px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-cta {
  background: #64d9d9;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;
}

.not-found {
  text-align: center;
  margin-top: 50px;
  color: #700c0c;
}
</style>
