<template>


  <div class="page">
    <div class="content">
      <!-- Lista de Car Wash -->
      <div class="carwash-list">
        <h2  >Ubicaciones de los Car Wash</h2>
        <div
          class="carwash-item"
          v-for="(carwash, index) in carwashes"
          :key="index"
          @click="showOnMap(carwash)"
        >
          <strong>{{ carwash.name }}</strong>
          <p>{{ carwash.address }}</p>
        </div>
      </div>

      <!-- Mapa -->
      <div id="map"></div>
    </div>

    <footer>
      <article>
        <h3>Links</h3>
        <div class="footer-links" style="background-color: transparent;" >
          <a href="/copyright" style="background-color: transparent;"  target="_blank">Políticas de Privacidad</a> |
          <a href="/terminos" style="background-color: transparent;"  target="_blank">Términos de Servicio</a>
        </div>
        <p>Contact Us</p>
      </article>

      <article>
        <h3>Follow Us</h3>
        <p>Facebook</p>
        <p>Twitter</p>
        <p>Instagram</p>
      </article>

      <small>&copy;2025 MAJOAD</small>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const carwashes = [
  { name: 'S52 Auto Spa', address: 'Carr. Duarte, Santiago de los Caballeros 51000', lat: 19.456393496498297, lng: -70.66472146167517 },
  { name: 'H2O Car Wash', address: 'C8J9+VR5, C. Mama Tingo, Santiago de los Caballeros 51000', lat: 19.433294152871795, lng: -70.67915059927826 },
  { name: 'Express Wash Factory', address: 'Av. Juan Pablo Duarte, Santiago de los Caballeros 51000', lat: 19.454668288796945, lng: -70.69556193520054 }
]

let map = null
let userMarker = null
let carwashMarkers = []

onMounted(async () => {
  await nextTick()

  map = L.map('map', {
    center: [19.45, -70.68],
    zoom: 13
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  map.whenReady(() => setTimeout(() => map.invalidateSize(), 200))

  // Agregar control personalizado (botón para localizar)
  addLocateControl()
})

// Iconos personalizados
const userIcon = L.icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

const carwashIcon = L.icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

// Control 📍
function addLocateControl() {
  const LocateControl = L.Control.extend({
    options: { position: 'topright' },
    onAdd: function () {
      const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control locate-control')
      const button = L.DomUtil.create('a', '', container)
      button.href = '#'
      button.title = 'Mostrar mi ubicación'
      button.innerHTML = '📍'
      L.DomEvent.disableClickPropagation(container)
      L.DomEvent.on(button, 'click', L.DomEvent.stop)
      L.DomEvent.on(button, 'click', async (e) => {
        e.preventDefault()
        await locateAndShow()
      })
      return container
    }
  })
  map.addControl(new LocateControl())
}

// Localizar usuario + mostrar marcadores
async function locateAndShow() {
  if (!navigator.geolocation) {
    alert('Tu navegador no soporta geolocalización')
    return
  }

  try {
    const pos = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true })
    )

    const lat = pos.coords.latitude
    const lng = pos.coords.longitude

    if (userMarker) {
      userMarker.setLatLng([lat, lng])
    } else {
      userMarker = L.marker([lat, lng], { icon: userIcon })
        .addTo(map)
        .bindPopup('<b>📍 Estás aquí</b>')
        .openPopup()
    }

    // Añadir los car wash si aún no están
    if (carwashMarkers.length === 0) {
      carwashes.forEach(cw => {
        const m = L.marker([cw.lat, cw.lng], { icon: carwashIcon })
          .addTo(map)
          .bindPopup(`<b>${cw.name}</b><br>${cw.address}`)
        carwashMarkers.push(m)
      })
    }

    // Ajustar vista para mostrar todo
    const bounds = L.latLngBounds([
      [lat, lng],
      ...carwashes.map(c => [c.lat, c.lng])
    ])
    map.fitBounds(bounds.pad(0.2))
  } catch (err) {
    console.error('Error de geolocalización:', err)
    alert('No se pudo obtener tu ubicación.')
  }
}

// Click desde la lista
function showOnMap(carwash) {
  if (!map) return
  map.setView([carwash.lat, carwash.lng], 16)
  L.popup()
    .setLatLng([carwash.lat, carwash.lng])
    .setContent(`<b>${carwash.name}</b><br>${carwash.address}`)
    .openOn(map)
}
</script>
