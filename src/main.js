import { createApp } from 'vue'


import './assets/main.css'
import './style.css'

import router from './router'
import App from './App.vue'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'



delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const firebaseConfig = {
  apiKey: "AIzaSyAeJS1ErJSTBQlmzSuCqmCWmrZNtMlNuiA",
  authDomain: "majoad-auth.firebaseapp.com",
  projectId: "majoad-auth",
  storageBucket: "majoad-auth.firebasestorage.app",
  messagingSenderId: "234585198380",
  appId: "1:234585198380:web:df71e491ee737bc944a689"
};



createApp(App).use(router).mount('#app')



