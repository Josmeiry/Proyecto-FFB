<template>
  <div class="bg-slate-55 min-h-screen">

    <!-- HERO -->
    <section class="relative bg-[#ffa000] pb-32"  >
  <div class="max-w-7xl mx-auto px-6 pt-16 pb-40"  style="background-color: transparent;" >

    <!-- CARD HERO -->
    <div class="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

      <!-- INFO -->
      <div>
        <h1 class="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
          Brilliant Shine Auto Spa
        </h1>

        <p class="text-slate-500 mb-4">
          Premium Car Wash & Auto Detailing
        </p>

        <!-- <div class="flex items-center gap-3 text-sm mb-2">
          <span class="text-yellow-400">★★★★★</span>
          <span class="font-semibold text-slate-700">4.8</span>
          <span class="text-slate-400">123 reseñas</span>
        </div> -->

        <p class="text-slate-500 flex items-center gap-2">
          📍 123 Avenida Principal, Ciudad
        </p>

        <p class="text-emerald-500 font-medium mt-2">
          ● Abierto ahora
        </p>
      </div>

      <!-- ACTIONS -->
      <div class="flex gap-4">
        <button
          class="px-6 py-3 rounded-full font-semibold bg-white shadow-lg border hover:scale-105 transition"
        >
          🤍 Favorito
        </button>

        <button
          class="px-7 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-xl hover:scale-105 transition"
        >
          💬 Contactar
        </button>
      </div>

    </div>
  </div>

  <!-- CURVA -->
  <div class="absolute bottom-0 w-full overflow-hidden">
    <svg viewBox="0 0 1440 120" class="w-full h-[160px]">
      <path
        fill="#f8fafc"
        d="M0,64 C240,96 480,96 720,80 960,64 1200,32 1440,48 L1440,160 L0,160 Z"
      />
    </svg>
  </div>
       
      <!-- Professional soft transition -->
      <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent via-sky-100/40 to-white blur-xl pointer-events-none"></div>
</section>

    <!-- GALERÍA -->
    <section class="relative -mt-28 z-10 max-w-5xl mx-auto px-6">
  <div class="bg-white rounded-[32px] shadow-[0_40px_80px_rgba(0,0,0,0.25)] p-6">

    <div class="relative overflow-hidden rounded-3xl">
      <img
        :src="activeImage"
        class="w-full h-[360px] md:h-[400px] object-cover"
      />

      <!-- overlay sutil -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

      <!-- arrows -->
      <button
        @click="prevImage"
        class="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow flex items-center justify-center text-xl"
      >
        ‹
      </button>

      <button
        @click="nextImage"
        class="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow flex items-center justify-center text-xl"
      >
        ›
      </button>
    </div>

    <!-- thumbs -->
    <div class="flex gap-3 mt-5 overflow-x-auto">
      <img
        v-for="(img, i) in images"
        :key="i"
        :src="img"
        @click="activeImage = img"
        class="w-24 h-16 rounded-xl object-cover cursor-pointer transition"
        :class="img === activeImage
          ? 'ring-4 ring-blue-600'
          : 'opacity-50 hover:opacity-100'"
      />
    </div>

  </div>
</section>

    <!-- CONTENT -->
    <section class="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">

      <!-- LEFT -->
      <div class="space-y-8">
        <div class="bg-white rounded-2xl p-6 shadow">
          <h3 class="text-xl font-bold mb-3">Acerca de</h3>
          <p class="text-slate-600 leading-relaxed">
            Brilliant Shine Auto Spa ofrece servicios premium de lavado,
            detallado y cuidado profesional para mantener tu vehículo impecable.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow">
          <h3 class="text-xl font-bold mb-4">Servicios</h3>
          <ul class="space-y-3 text-slate-700">
            <li>💧 Lavado exterior</li>
            <li>🧽 Lavado interior detallado</li>
            <li>✨ Pulido y encerado</li>
            <li>🌬️ Tratamiento de ozono</li>
          </ul>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="space-y-8">
        <div class="bg-white rounded-2xl p-6 shadow border border-blue-100">
          <h3 class="text-xl font-bold mb-4">Reserva ahora</h3>

          <ul class="space-y-3 mb-6">
            <li>💧 Lavado exterior</li>
            <li>🧽 Lavado interior detallado</li>
            <li>✨ Pulido y encerado</li>
            <li>🌬️ Tratamiento de ozono</li>
          </ul>

          <div class="flex gap-4">
            <button class="flex-1 bg-green-500 text-white py-3 rounded-full font-semibold">
              WhatsApp
            </button>
            <button class="flex-1 bg-blue-600 text-white py-3 rounded-full font-semibold">
              Llamar ahora
            </button>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
            class="h-48 w-full object-cover"
          />
          <div class="p-4">
            <p class="font-bold text-lg">20 % descuento</p>
            <p class="text-slate-600 text-sm">
              lavado profundo esta semana
            </p>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

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
  activeImage.value =
    images[(i - 1 + images.length) % images.length];
};
</script>