<template>
  <div class="layout">
    <!-- CAPA DE FONDO DINÁMICA -->
    <div class="dashboard-bg">
      <div class="glow g1"></div>
      <div class="glow g2"></div>
      <div class="glow g3"></div>
    </div>

    <!-- SIDEBAR PREMIUM -->
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false"></div>
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-header">
        <div class="brand">
          <Droplets class="brand-icon" :size="28" />
          <span>MAJOAD <small>ADMIN</small></span>
        </div>
      </div>

      <div class="sidebar-user">
        <div class="avatar-wrapper">
          <img :src="profileImage || defaultImg" alt="Avatar" class="avatar" />
          <div class="online-indicator"></div>
        </div>
        <div class="user-info">
          <h3>{{ carwash.nombre_carwash || 'Mi Negocio' }}</h3>
          <p>Socio Premium</p>
        </div>
      </div>

      <nav class="menu">
        <button :class="{ active: active === 'dashboard' }" @click="goTo('dashboard')">
          <LayoutDashboard :size="20" />
          <span>Dashboard</span>
        </button>
        <button :class="{ active: active === 'perfil' }" @click="goTo('perfil')">
          <UserCircle :size="20" />
          <span>Gestión de Perfil</span>
        </button>
        <button @click="open = true">
          <Settings :size="20" />
          <span>Configuración</span>
        </button>
        <button :class="{ active: active === 'galeria' }" @click="goTo('galeria')">
          <Image :size="20" />
          <span>Galería de Fotos</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <button class="btn-public" @click="goPublicProfile">
          <ExternalLink :size="18" />
          <span>Ver Perfil Público</span>
        </button>
        <button class="btn-logout" @click="logout">
          <LogOut :size="18" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="main">
      <header class="main-header">
        <button class="mobile-toggle" @click="sidebarOpen = !sidebarOpen">
          <Menu :size="24" />
        </button>
        <div class="header-search">
          <Search :size="18" class="search-icon" />
          <input type="text" v-model="searchQuery" placeholder="Buscar en el panel..." @input="handleSearch" />
        </div>
        <div class="header-actions">
          <div class="notification-wrapper">
            <button class="notification-btn" @click="showNotifications = !showNotifications">
              <Bell :size="20" />
              <span class="badge" v-if="notifications.length">{{ notifications.length }}</span>
            </button>
            
            <transition name="fade">
              <div v-if="showNotifications" class="notifications-dropdown glass">
                <div class="dropdown-header">
                  <span>Notificaciones</span>
                  <button @click="notifications = []" class="btn-clear">Limpiar</button>
                </div>
                <div class="dropdown-body">
                  <div v-for="(n, i) in notifications" :key="i" class="notification-item">
                    <div class="n-dot"></div>
                    <div class="n-content">
                      <p>{{ n.text }}</p>
                      <small>{{ n.time }}</small>
                    </div>
                  </div>
                  <div v-if="!notifications.length" class="n-empty">No hay notificaciones</div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </header>

      <div class="content-wrapper">
        <!-- DASHBOARD SECTION -->
        <section id="dashboard" class="content-section">
          <div class="section-header">
            <h1 class="title">Panel de <span class="text-gradient">Control</span></h1>
            <p class="subtitle">Resumen general de tu actividad</p>
          </div>

          <div class="stats-grid">
            <div class="stat-card glass blue">
              <div class="stat-icon"><Users :size="24" /></div>
              <div class="stat-info">
                <span>Clientes Totales</span>
                <strong>120</strong>
              </div>
              <div class="stat-trend positive">+12% este mes</div>
            </div>
            <div class="stat-card glass red">
              <div class="stat-icon"><Briefcase :size="24" /></div>
              <div class="stat-info">
                <span>Servicios Activos</span>
                <strong>8</strong>
              </div>
              <div class="stat-trend">+2 nuevos</div>
            </div>
            <div class="stat-card glass orange">
              <div class="stat-icon"><CalendarClock :size="24" /></div>
              <div class="stat-info">
                <span>Siguiente Pago</span>
                <strong>8 Mar</strong>
              </div>
              <div class="stat-trend warning">Vence pronto</div>
            </div>
            <div class="stat-card glass green">
              <div class="stat-icon"><DollarSign :size="24" /></div>
              <div class="stat-info">
                <span>Cuota Mensual</span>
                <strong>$20,000</strong>
              </div>
              <div class="stat-trend">Pago al día</div>
            </div>
          </div>
        </section>

        <!-- PROFILE SECTION -->
        <section id="perfil" class="content-section glass-box">
          <div class="section-header">
            <h2 class="section-title">Información del Negocio</h2>
            <div class="header-actions">
              <button @click="guardarCambios" class="btn-save-top">
                <Save :size="18" /> Guardar
              </button>
            </div>
          </div>

          <div class="profile-layout">
            <div class="profile-image-section">
              <div class="image-preview">
                <img :src="profileImage || defaultImg" alt="Profile" />
                <label class="upload-overlay">
                  <Camera :size="24" />
                  <input type="file" @change="changeProfile" hidden />
                </label>
              </div>
              <p>Foto de Perfil</p>
            </div>

            <div class="profile-form">
              <div class="form-grid">
                <div class="form-group">
                  <label>Nombre del Negocio</label>
                  <div class="input-wrapper">
                    <Store :size="18" />
                    <input v-model="carwash.nombre_carwash" placeholder="Ej. Spa Auto Detailing" />
                  </div>
                </div>
                <div class="form-group">
                  <label>Correo Corporativo</label>
                  <div class="input-wrapper disabled">
                    <Mail :size="18" />
                    <input v-model="carwash.correo" disabled />
                  </div>
                </div>
                <div class="form-group">
                  <label>Teléfono de Contacto</label>
                  <div class="input-wrapper">
                    <Phone :size="18" />
                    <input v-model="carwash.telefono" placeholder="809-000-0000" />
                  </div>
                </div>
                <div class="form-group">
                  <label>Horario de Atención</label>
                  <div class="input-wrapper">
                    <Clock :size="18" />
                    <input v-model="carwash.horario" placeholder="8AM - 6PM Lun-Sab" />
                  </div>
                </div>
                <div class="form-group full">
                  <label>Descripción de Servicios</label>
                  <div class="input-wrapper textarea">
                    <AlignLeft :size="18" />
                    <textarea v-model="carwash.descripcion" placeholder="Describe brevemente tus servicios..."></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="address-section">
            <h3 class="section-subtitle">Ubicación y Dirección</h3>
            <div class="form-grid">
              <div class="form-group"><label>País</label><div class="input-wrapper"><input v-model="direccion.pais" placeholder="País" /></div></div>
              <div class="form-group"><label>Región</label><div class="input-wrapper"><input v-model="direccion.region" placeholder="Región" /></div></div>
              <div class="form-group"><label>Provincia</label><div class="input-wrapper"><input v-model="direccion.provincia" placeholder="Provincia" /></div></div>
              <div class="form-group"><label>Municipio</label><div class="input-wrapper"><input v-model="direccion.municipio" placeholder="Municipio" /></div></div>
              <div class="form-group"><label>Ciudad</label><div class="input-wrapper"><input v-model="direccion.ciudad" placeholder="Ciudad" /></div></div>
              <div class="form-group"><label>Barrio</label><div class="input-wrapper"><input v-model="direccion.barrio" placeholder="Barrio" /></div></div>
              <div class="form-group full"><label>Calle y Número</label><div class="input-wrapper"><input v-model="direccion.calle" placeholder="Calle y número" /></div></div>
            </div>
            <button class="btn-save-address" @click="guardarOActualizarDireccion">
              <MapPin :size="20" />
              {{ carwash.id_direccion ? "Actualizar Dirección" : "Guardar Dirección" }}
            </button>
          </div>
        </section>

        <!-- GALLERY SECTION -->
        <section id="galeria" class="content-section glass-box">
          <div class="section-header">
            <h2 class="section-title">Galería de Fotos</h2>
            <label class="btn-upload-new">
              <Plus :size="18" /> Subir Fotos
              <input type="file" multiple @change="agregarImagenes" hidden />
            </label>
          </div>

          <div class="gallery-container">
            <div class="main-viewer glass" v-if="galeria.length">
              <button class="nav-btn prev" @click="prev"><ChevronLeft :size="32" /></button>
              <div class="viewer-img-container" @click="abrirModal(galeria[index].url)">
                <img :src="getImageUrl(galeria[index].url)" />
                <div class="img-overlay">
                  <Maximize2 :size="24" />
                </div>
              </div>
              <button class="nav-btn next" @click="next"><ChevronRight :size="32" /></button>
            </div>

            <div class="thumbs-scroll">
              <div v-for="(img, i) in galeria" :key="i" class="thumb-item" :class="{ active: index === i }">
                <img :src="getImageUrl(img.url)" @click="index = i" />
                <button class="delete-img" @click.stop="eliminarImagen(img)">
                  <Trash2 :size="14" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- FOOTER -->
      <footer class="content-footer">
        <p>&copy; 2026 MAJOAD CAR WASH. Todos los derechos reservados.</p>
        <div class="footer-links">
          <a href="#">Privacidad</a>
          <a href="#">Soporte</a>
        </div>
      </footer>
    </main>

    <!-- OVERLAYS -->
    <ConfiguracionCW v-if="open" @close="open = false" />

    <div v-if="modal" class="image-modal" @click="modal = false">
      <div class="modal-content glass" @click.stop>
        <button class="modal-close" @click="modal = false"><X :size="24" /></button>
        <img :src="getImageUrl(imagenActiva)" />
      </div>
    </div>

    <!-- TOAST MESSAGE -->
    <transition name="toast">
      <div v-if="mensaje" class="toast-message glass" :class="{ error: mensaje.includes('Error') }">
        <CheckCircle v-if="!mensaje.includes('Error')" :size="20" />
        <AlertCircle v-else :size="20" />
        <span>{{ mensaje }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import ConfiguracionCW from "./components/ConfiguracionCW.vue";
import { 
  Droplets, LayoutDashboard, UserCircle, Settings, Image, 
  ExternalLink, LogOut, Menu, Search, Bell, Users, 
  Briefcase, CalendarClock, DollarSign, Save, Camera,
  Store, Mail, Phone, Clock, AlignLeft, MapPin, Plus,
  ChevronLeft, ChevronRight, Maximize2, Trash2, X,
  CheckCircle, AlertCircle
} from 'lucide-vue-next';

const router = useRouter();

// UI State
const open = ref(false);
const sidebarOpen = ref(false);
const active = ref("dashboard");
const mensaje = ref("");
const index = ref(0);
const modal = ref(false);
const imagenActiva = ref("");
const searchQuery = ref("");
const showNotifications = ref(false);
const notifications = ref([
  { text: "Nueva reserva recibida para hoy a las 3:00 PM", time: "Hace 5 min" },
  { text: "Tu suscripción premium vence en 3 días", time: "Hace 2 horas" },
  { text: "Un cliente dejó un comentario positivo", time: "Ayer" }
]);

// Methods
const handleSearch = () => {
  const q = searchQuery.value.toLowerCase().trim();
  if (q.length < 2) return;
  
  let target = "";
  if ("perfil".includes(q) || "gestión".includes(q) || "nombre".includes(q) || "información".includes(q)) target = "perfil";
  else if ("galería".includes(q) || "fotos".includes(q) || "imagenes".includes(q) || "galeria".includes(q)) target = "galeria";
  else if ("dashboard".includes(q) || "resumen".includes(q) || "clientes".includes(q) || "panel".includes(q)) target = "dashboard";
  else if ("ubicación".includes(q) || "dirección".includes(q) || "calle".includes(q) || "ciudad".includes(q)) target = "perfil";

  if (target) {
    active.value = target;
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Efecto de resaltado temporal
      el.style.boxShadow = "0 0 30px rgba(59, 130, 246, 0.5)";
      setTimeout(() => {
        el.style.boxShadow = "";
      }, 2000);
    }
  }
};
const id_carwash = ref(null);
const defaultImg = "https://via.placeholder.com/150?text=CarWash";
const profileImage = ref(null);
const carwash = ref({ id_direccion: null, nombre_carwash: "", correo: "", telefono: "", horario: "", descripcion: "" });
const direccion = ref({ pais: "", region: "", provincia: "", municipio: "", ciudad: "", barrio: "", calle: "" });
const galeria = ref([]);

// Methods
const getImageUrl = (url) => {
  if (!url) return "";
  return url.replace("http://localhost:2629", "https://proyecto-bff.onrender.com");
};

const next = () => { if (galeria.value.length) index.value = (index.value + 1) % galeria.value.length; };
const prev = () => { if (galeria.value.length) index.value = (index.value - 1 + galeria.value.length) % galeria.value.length; };

const abrirModal = (url) => {
  imagenActiva.value = getImageUrl(url);
  modal.value = true;
};

const goTo = (section) => {
  active.value = section;
  sidebarOpen.value = false;
  const el = document.getElementById(section);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const cargarDatos = async () => {
  try {
    const res = await axios.get(`https://proyecto-bff.onrender.com/carwash/${id_carwash.value}`);
    carwash.value = res.data || {};
    galeria.value = carwash.value.imagenes || [];
    if (carwash.value.direccion) mapearDireccion(carwash.value.direccion);
  } catch (err) {
    console.error("Error cargando carwash:", err);
  }
};

const mapearDireccion = (dir) => {
  if (!dir || !dir.calle) return;
  carwash.value.id_direccion = dir.id_direccion;
  direccion.value = {
    pais: dir.calle.barrio?.ciudad?.municipio?.provincia?.region?.pais?.nombre || "",
    region: dir.calle.barrio?.ciudad?.municipio?.provincia?.region?.nombre || "",
    provincia: dir.calle.barrio?.ciudad?.municipio?.provincia?.nombre || "",
    municipio: dir.calle.barrio?.ciudad?.municipio?.nombre || "",
    ciudad: dir.calle.barrio?.ciudad?.nombre || "",
    barrio: dir.calle.barrio?.nombre || "",
    calle: dir.calle?.nombre || ""
  };
};

const guardarCambios = async () => {
  try {
    await axios.put(`https://proyecto-bff.onrender.com/carwash/${id_carwash.value}`, carwash.value);
    showToast("Datos actualizados ✔");
  } catch (err) {
    showToast("Error al guardar ❌");
  }
};

const guardarOActualizarDireccion = async () => {
  try {
    if (carwash.value.id_direccion) {
      await axios.put(`https://proyecto-bff.onrender.com/direccion/${carwash.value.id_direccion}`, { direccion: direccion.value });
      showToast("Dirección actualizada ✔");
    } else {
      const res = await axios.post("https://proyecto-bff.onrender.com/direccion", { id_carwash: id_carwash.value, direccion: direccion.value });
      carwash.value.id_direccion = res.data.id_direccion;
      showToast("Dirección guardada ✔");
    }
    await cargarDatos();
  } catch (err) {
    showToast("Error al guardar dirección ❌");
  }
};

const changeProfile = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    profileImage.value = ev.target.result;
    localStorage.setItem("profileImage", ev.target.result);
  };
  reader.readAsDataURL(file);
};

const agregarImagenes = async (e) => {
  const files = e.target.files;
  for (const file of files) {
    const formData = new FormData();
    formData.append("imagen", file);
    try {
      const res = await axios.post(`https://proyecto-bff.onrender.com/galeria/${id_carwash.value}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      galeria.value.push(res.data);
    } catch (err) {
      console.error("Error subiendo imagen:", err);
    }
  }
  e.target.value = "";
};

const eliminarImagen = async (img) => {
  const id = img.id_imagen || img.id;
  if (!id || !confirm("¿Eliminar esta imagen?")) return;
  try {
    await axios.delete(`https://proyecto-bff.onrender.com/galeria/${id}`);
    galeria.value = galeria.value.filter(i => (i.id_imagen || i.id) !== id);
    if (index.value >= galeria.value.length) index.value = Math.max(0, galeria.value.length - 1);
  } catch (err) {
    console.error("Error eliminando imagen", err);
  }
};

const showToast = (msg) => {
  mensaje.value = msg;
  setTimeout(() => { mensaje.value = ""; }, 3000);
};

const goPublicProfile = () => router.push(`/detalle-carwash`);
const logout = () => {
  localStorage.clear();
  window.dispatchEvent(new Event("storage"));
  router.push("/inicioP");
};

onMounted(() => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario || usuario.tipo !== "carwash") {
    router.push("/login");
    return;
  }
  id_carwash.value = usuario.id_carwash;
  cargarDatos();
  const img = localStorage.getItem("profileImage");
  if (img) profileImage.value = img;
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.layout {
  display: flex;
  min-height: 100vh;
  background: #020617;
  color: #f8fafc;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow-x: hidden;
}

/* BACKGROUND GLOWS */
.dashboard-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}
.g1 { width: 600px; height: 600px; top: -100px; right: -100px; background: rgba(37, 99, 235, 0.1); }
.g2 { width: 500px; height: 500px; bottom: -100px; left: -100px; background: rgba(30, 58, 138, 0.15); }
.g3 { width: 400px; height: 400px; top: 40%; left: 20%; background: rgba(37, 99, 235, 0.05); }

/* SIDEBAR PREMIUM */
.sidebar {
  width: 280px;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 100;
}

.sidebar-header {
  margin-bottom: 40px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 900;
  font-size: 20px;
  color: #fff;
  letter-spacing: 1px;
}
.brand-icon { color: #3b82f6; }
.brand small { font-size: 10px; opacity: 0.5; vertical-align: middle; }

.sidebar-user {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.03);
  padding: 15px;
  border-radius: 20px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.avatar-wrapper { position: relative; }
.avatar { width: 50px; height: 50px; border-radius: 15px; object-fit: cover; }
.online-indicator {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  background: #10b981;
  border: 2px solid #0f172a;
  border-radius: 50%;
}
.user-info h3 { font-size: 14px; font-weight: 700; margin-bottom: 2px; color: #fff; }
.user-info p { font-size: 11px; color: #64748b; }

.menu { display: flex; flex-direction: column; gap: 8px; }
.menu button {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: #94a3b8;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  font-weight: 600;
}
.menu button:hover { background: rgba(255, 255, 255, 0.05); color: #fff; }
.menu button.active { background: #3b82f6; color: #fff; box-shadow: 0 10px 20px rgba(59, 130, 246, 0.2); }

.sidebar-footer { margin-top: auto; display: flex; flex-direction: column; gap: 10px; }
.btn-public {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: 12px;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
}
.btn-public:hover { background: #3b82f6; color: #fff; }
.btn-logout {
  background: transparent;
  color: #ef4444;
  border: none;
  padding: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* MAIN CONTENT */
.main { flex: 1; position: relative; z-index: 1; }
.main-header {
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(2, 6, 23, 0.5);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: sticky;
  top: 0;
  z-index: 90;
}
.header-search { position: relative; width: 300px; }
.search-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #64748b; }
.header-search input {
  width: 100%;
  padding: 10px 15px 10px 45px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
}
.notification-btn {
  background: rgba(255, 255, 255, 0.05);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  color: #94a3b8;
  cursor: pointer;
  position: relative;
}
.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #3b82f6;
  color: #fff;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  border: 2px solid #0f172a;
  font-weight: 800;
}
.notification-wrapper { position: relative; }
.notifications-dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  width: 300px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  z-index: 1000;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}
.dropdown-header {
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dropdown-header span { font-weight: 800; font-size: 14px; }
.btn-clear { background: transparent; border: none; color: #3b82f6; font-size: 11px; cursor: pointer; font-weight: 700; }
.dropdown-body { max-height: 350px; overflow-y: auto; }
.notification-item {
  padding: 15px 20px;
  display: flex;
  gap: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  transition: 0.3s;
}
.notification-item:hover { background: rgba(255, 255, 255, 0.03); }
.n-dot { width: 8px; height: 8px; border-radius: 50%; background: #3b82f6; margin-top: 5px; flex-shrink: 0; }
.n-content p { font-size: 13px; margin: 0; color: #e2e8f0; line-height: 1.4; }
.n-content small { font-size: 11px; color: #64748b; display: block; margin-top: 5px; }
.n-empty { padding: 40px 20px; text-align: center; color: #64748b; font-size: 14px; }

.content-wrapper { padding: 40px; max-width: 1300px; margin: 0 auto; }

.section-header { margin-bottom: 30px; display: flex; align-items: flex-end; justify-content: space-between; }
.title { font-size: 32px; font-weight: 900; margin: 0; color: #fff; }
.text-gradient { background: linear-gradient(135deg, #3b82f6, #1e40af); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.subtitle { color: #64748b; margin: 5px 0 0; font-size: 16px; }

/* STATS GRID */
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 40px; }
.stat-card {
  padding: 25px;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.stat-card.blue { background: linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(30, 58, 138, 0.1)); border-color: rgba(37, 99, 235, 0.3); }
.stat-card.red { background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(153, 27, 27, 0.1)); border-color: rgba(239, 68, 68, 0.3); }
.stat-card.orange { background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(180, 83, 9, 0.1)); border-color: rgba(245, 158, 11, 0.3); }
.stat-card.green { background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 95, 70, 0.1)); border-color: rgba(16, 185, 129, 0.3); }

.stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; background: rgba(255, 255, 255, 0.1); }
.stat-info span { font-size: 13px; color: #94a3b8; font-weight: 500; }
.stat-info strong { display: block; font-size: 28px; font-weight: 800; color: #fff; margin-top: 5px; }
.stat-trend { margin-top: 15px; font-size: 12px; font-weight: 700; color: #64748b; }
.stat-trend.positive { color: #10b981; }
.stat-trend.warning { color: #f59e0b; }

/* GLASS BOX SECTION */
.glass-box {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 32px;
  padding: 40px;
  margin-bottom: 40px;
}
.section-title { font-size: 24px; font-weight: 800; margin: 0; color: #fff; }
.btn-save-top { background: #3b82f6; color: #fff; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.3s; }
.btn-save-top:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4); }

/* PROFILE LAYOUT */
.profile-layout { display: grid; grid-template-columns: 200px 1fr; gap: 40px; margin-top: 30px; }
.profile-image-section { text-align: center; }
.image-preview { position: relative; width: 160px; height: 160px; margin: 0 auto 15px; border-radius: 30px; overflow: hidden; border: 4px solid rgba(59, 130, 246, 0.2); }
.image-preview img { width: 100%; height: 100%; object-fit: cover; }
.upload-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.3s; cursor: pointer; }
.image-preview:hover .upload-overlay { opacity: 1; }
.profile-image-section p { font-size: 14px; font-weight: 600; color: #64748b; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group.full { grid-column: span 2; }
.form-group label { font-size: 13px; font-weight: 700; color: #94a3b8; }
.input-wrapper { display: flex; align-items: center; gap: 12px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 0 15px; transition: 0.3s; }
.input-wrapper:focus-within { border-color: #3b82f6; background: rgba(255, 255, 255, 0.07); box-shadow: 0 0 15px rgba(59, 130, 246, 0.2); }
.input-wrapper svg { color: #3b82f6; }
.input-wrapper input, .input-wrapper textarea { width: 100%; padding: 14px 0; background: transparent; border: none; color: #fff; font-size: 15px; outline: none; }
.input-wrapper input::placeholder { color: #475569; }
.input-wrapper.textarea { align-items: flex-start; padding-top: 10px; }
.input-wrapper textarea { height: 100px; resize: none; }
.input-wrapper.disabled { opacity: 0.6; cursor: not-allowed; }

.address-section { margin-top: 20px; background: rgba(255, 255, 255, 0.02); padding: 30px; border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.05); }
.section-subtitle { font-size: 18px; font-weight: 800; margin-bottom: 25px; color: #fff; }
.btn-save-address { margin-top: 30px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); padding: 16px; border-radius: 16px; width: 100%; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.3s; }
.btn-save-address:hover { background: rgba(255,255,255,0.1); border-color: #3b82f6; }

/* GALLERY SECTION */
.btn-upload-new { background: #10b981; color: #fff; padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 14px; }
.gallery-container { margin-top: 30px; }
.main-viewer { position: relative; height: 500px; border-radius: 24px; overflow: hidden; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; }
.viewer-img-container { width: 100%; height: 100%; cursor: pointer; position: relative; }
.viewer-img-container img { width: 100%; height: 100%; object-fit: contain; }
.img-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); opacity: 0; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
.viewer-img-container:hover .img-overlay { opacity: 1; }
.nav-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: none; width: 60px; height: 60px; border-radius: 50%; color: #fff; cursor: pointer; z-index: 5; transition: 0.3s; }
.nav-btn:hover { background: #3b82f6; }
.nav-btn.prev { left: 20px; }
.nav-btn.next { right: 20px; }

.thumbs-scroll { display: flex; gap: 15px; overflow-x: auto; padding-bottom: 10px; }
.thumb-item { position: relative; min-width: 100px; height: 100px; border-radius: 15px; overflow: hidden; cursor: pointer; border: 2px solid transparent; transition: 0.3s; }
.thumb-item.active { border-color: #3b82f6; transform: scale(1.05); }
.thumb-item img { width: 100%; height: 100%; object-fit: cover; }
.delete-img { position: absolute; top: 5px; right: 5px; background: #ef4444; color: #fff; border: none; width: 24px; height: 24px; border-radius: 8px; cursor: pointer; opacity: 0; transition: 0.3s; }
.thumb-item:hover .delete-img { opacity: 1; }

/* MODAL */
.image-modal { position: fixed; inset: 0; z-index: 2000; background: rgba(0,0,0,0.9); backdrop-filter: blur(15px); display: flex; align-items: center; justify-content: center; padding: 40px; }
.modal-content { max-width: 90%; max-height: 90%; position: relative; padding: 10px; border-radius: 20px; }
.modal-content img { max-width: 100%; max-height: 80vh; border-radius: 10px; }
.modal-close { position: absolute; top: -20px; right: -20px; background: #fff; color: #000; border: none; width: 44px; height: 44px; border-radius: 50%; cursor: pointer; }

/* TOAST */
.toast-message { position: fixed; bottom: 40px; right: 40px; padding: 15px 25px; border-radius: 16px; border: 1px solid rgba(16, 185, 129, 0.3); display: flex; align-items: center; gap: 12px; z-index: 2100; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
.toast-message.error { border-color: rgba(239, 68, 68, 0.3); color: #ef4444; }
.toast-enter-active, .toast-leave-active { transition: all 0.5s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(20px); }

/* MOBILE */
.mobile-toggle { display: none; background: transparent; border: none; color: #fff; cursor: pointer; }
.sidebar-overlay { display: none; }

@media (max-width: 1024px) {
  .sidebar { width: 80px; padding: 30px 10px; align-items: center; }
  .brand span, .menu span, .sidebar-user .user-info, .sidebar-footer span { display: none; }
  .sidebar-user { padding: 10px; justify-content: center; width: 50px; }
  .menu button { justify-content: center; padding: 15px; }
  .profile-layout { grid-template-columns: 1fr; }
  .content-wrapper { padding: 30px; }
}

@media (max-width: 768px) {
  .sidebar { position: fixed; left: -280px; height: 100vh; width: 280px; transition: 0.3s; z-index: 2000; }
  .sidebar.open { left: 0; }
  .sidebar.open .brand span, .sidebar.open .menu span, .sidebar.open .user-info, .sidebar.open .sidebar-footer span { display: block; }
  .sidebar-user { width: 100%; justify-content: flex-start; }
  .menu button { justify-content: flex-start; }
  
  .sidebar-overlay { display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); z-index: 1999; }
  
  .mobile-toggle { display: block; margin-right: 15px; }
  .main-header { padding: 15px 20px; }
  .header-search { display: none; }
  
  .content-wrapper { padding: 20px; }
  .form-grid { grid-template-columns: 1fr; }
  .stat-card { padding: 20px; }
  .stats-grid { grid-template-columns: 1fr; }
  
  .section-header { flex-direction: column; align-items: flex-start; gap: 15px; }
  .btn-save-top { width: 100%; justify-content: center; }
  
  .main-viewer { height: 300px; }
  .nav-btn { width: 44px; height: 44px; }
  
  .glass-box { padding: 25px 20px; border-radius: 20px; }
  .profile-layout { gap: 20px; }
}

@media (max-width: 480px) {
  .title { font-size: 24px; }
  .section-title { font-size: 20px; }
  .stat-info strong { font-size: 24px; }
}
</style>