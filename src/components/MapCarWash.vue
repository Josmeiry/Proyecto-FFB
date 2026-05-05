<template>
  <div>
    <div ref="map" style="width: 100%; height: 400px;"></div>

    <p v-if="distance">
      Distancia: {{ distance }} <br />
      Tiempo estimado: {{ duration }}
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

const map = ref(null);
const distance = ref("");
const duration = ref("");

// 📍 Coordenadas del car wash (cámbialas)
const carWashLocation = {
  lat: 19.4517,
  lng: -70.6970
};

onMounted(async () => {
  const loader = new Loader({
    apiKey: "24b4ab708289293b474cb5c2b4a462bb443c0b7fe91a683cb7cca8c2fb0a493d",
    version: "weekly",
    libraries: ["places"]
  });

  const google = await loader.load();

  // 📍 Obtener ubicación del usuario
  navigator.geolocation.getCurrentPosition((position) => {
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    // 🗺️ Crear mapa
    const mapInstance = new google.maps.Map(map.value, {
      center: userLocation,
      zoom: 14
    });

    // 📍 Marcador usuario
    new google.maps.Marker({
      position: userLocation,
      map: mapInstance,
      label: "Tú"
    });

    // 🚗 Marcador car wash
    new google.maps.Marker({
      position: carWashLocation,
      map: mapInstance,
      label: "Car Wash"
    });

    // 🧭 Ruta
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(mapInstance);

    directionsService.route(
      {
        origin: userLocation,
        destination: carWashLocation,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result);

          const leg = result.routes[0].legs[0];
          distance.value = leg.distance.text;
          duration.value = leg.duration.text;
        }
      }
    );
  });
});
</script>