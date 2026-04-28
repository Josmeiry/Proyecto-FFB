<template>
  <div class="bg-slate-55 min-h-screen">

    <!-- HERO -->
    <section class="relative bg-[#ffa000] pb-32"  >
  <div class="max-w-7xl mx-auto px-6 pt-16 pb-40"  style="background-color: transparent;" >

    <!-- CARD HERO -->
    <div class="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

      <!-- INFO -->
      <div style="background-color: transparent;" >
        <!-- <h1 class="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
          Brilliant Shine Auto Spa
        </h1> -->
         <h1 v-if="carwash"  class="text-5xl lg:text-6xl font-black tracking-tight text-slate-900" style="background-color: transparent;">
            {{ carwash.nombre_carwash }}
         </h1>
         
         <p v-if="carwash" class="text-lg text-slate-500 mt-2" style="background-color: transparent;"> 
            {{ carwash.descripcion }}
         </p>

         <div class="mt-4 space-y-2 text-slate-600 text-base" style="background-color: transparent;" >
           <p v-if="carwash" class="text-slate-500 flex items-center gap-2" style="background-color: transparent;" >
              📞 {{ carwash.telefono }}
           </p>

           <p v-if="carwash" class="text-slate-500 flex items-center gap-2" style="background-color: transparent;" >
              ✉️ {{ carwash.correo }}
           </p>
            
         </div>
        <!-- <p v-if="carwash" class="text-slate-500 flex items-center gap-2" >
              📍 {{ carwash.direccion }}
            </p> -->
            <p class="text-slate-500 flex items-center gap-2" style="background-color: transparent;">
             📍 {{ direccion.calle }}, {{ direccion.barrio }}, {{ direccion.ciudad }}
            </p>


        <p class="font-medium mt-2":class="isOpen() ? 'text-emerald-500' : 'text-red-500'" style="background-color: transparent;">
          ● {{ isOpen() ? "Abierto ahora" : "Cerrado" }}
        </p>
      </div>

      <!-- ACTIONS -->
      <div class="flex gap-4" style="background-color: transparent;" >
        <button @click="toggleFavorito" class="px-6 py-3 rounded-full font-semibold shadow-lg border hover:scale-105 transition text-black" style="background-color: transparent;" >
          {{ esFavorito ? "❤️ Favorito" : "🤍 Favorito" }}
        </button>

        <button
          class="px-7 py-3 rounded-full font-semibold text-black bg-gradient-to-r from-blue-600 to-blue-500 shadow-xl hover:scale-105 transition"
          style="background-color: transparent;"
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
          
          <p v-if="carwash" class="text-slate-600 leading-relaxed"> 
            {{ carwash.descripcion }}
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
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";

const direccion = ref({
  pais: "",
  region: "",
  provincia: "",
  municipio: "",
  ciudad: "",
  barrio: "",
  calle: ""
});
const route = useRoute();
const carwash = ref(null);
const esFavorito = ref(false);



const toggleFavorito = () => {
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

const isOpen = () => {
  const now = new Date();
  const hour = now.getHours(); // 0 - 23

  return hour >= 8 && hour < 19; // 8am a 7pm
};

// onMounted(async () => {
//   try {
//     const id = route.params.id;

//     const res = await axios.get(`http://localhost:2629/carwash/${id}`);

//     carwash.value = res.data;

//   } catch (error) {
//     console.error("Error cargando detalle:", error);
//   }
// });

onMounted(async () => {
  try {
    const id = route.params.id;
    const res = await axios.get(`http://localhost:2629/carwash/${id}`);
const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

esFavorito.value = favoritos.includes(res.data.id_carwash);
    carwash.value = res.data;

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