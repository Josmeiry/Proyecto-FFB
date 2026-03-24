<template>
  <div class="layout">

    <!-- HEADER MOBILE -->
    <header class="mobile-header">
      <button class="menu-btn" @click="sidebarOpen = !sidebarOpen">☰</button>
      
    </header>

    <!-- SIDEBAR -->
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-top">
        <img class="avatar" :src="profileImage || defaultImg" />
        <h3>{{ carwash.nombre_carwash }}</h3>
        <small>Perfil del CarWash</small>
      </div>

      <nav class="menu">
        <button :class="{ active: active === 'dashboard' }" @click="goTo('dashboard')">
          Dashboard
        </button>
        <button :class="{ active: active === 'perfil' }" @click="goTo('perfil')">
          Gestión de Perfil
        </button>
        <button @click="open = true">
          Configuración
        </button>
        <ConfiguracionCW v-if="open" @close="open = false" />
        
        <button :class="{ active: active === 'galeria' }" @click="goTo('galeria')">
          Galería
        </button>
      </nav>

      <div class="sidebar-footer">
        <button class="btn-public" @click="goPublicProfile">
          Ver Perfil Público
        </button>
      

        <button class="btn-link" @click="goHelp" style="color: green;" >
          Centro de Ayuda
        </button>

        <button class="btn-link logout" @click="logout">
          Cerrar Sesión
        </button>
      </div>
    </aside>

    <!-- MAIN -->
    <main class="main">

      <!-- DASHBOARD -->
      <section id="dashboard">
        <h1 class="title">Dashboard</h1>
        <div class="stats">
          <div class="stat"><span>Clientes</span><strong>120</strong></div>
          <div class="stat"><span>Servicios</span><strong>8</strong></div>
          <div class="stat"><span>Siguiente Pago</span><strong>8 Marzo</strong></div>
          <div class="stat"><span>Cuota</span><strong>$20,000</strong></div>
        </div>
      </section>

      <!-- PERFIL -->
      <section id="perfil" class="box">
        <h2>Perfil del CarWash</h2>

        <div class="profile">
          <img :src="profileImage || defaultImg" />
          <input type="file" @change="changeProfile" />
        </div>

        <div class="form">
          <input placeholder="Nombre" v-model="carwash.nombre_carwash" />
          <input placeholder="Correo" v-model="carwash.correo" disabled />
          <input placeholder="Teléfono" v-model="carwash.telefono" />
          <input placeholder="Horario" v-model="carwash.horario" />
          <input placeholder="Descripcion" v-model="carwash.descripcion" />
        </div>

        <div class="btn-main">
          <button @click="guardarCambios">Guardar cambios</button>
        </div>

        <h3 class="sub">Dirección</h3>

        <div class="form">
          <input placeholder="País" v-model="direccion.pais" />
          <input placeholder="Región" v-model="direccion.region" />
          <input placeholder="Provincia" v-model="direccion.provincia" />
          <input placeholder="Municipio" v-model="direccion.municipio" />
          <input placeholder="Ciudad" v-model="direccion.ciudad" />
          <input placeholder="Barrio" v-model="direccion.barrio" />
          <input placeholder="Calle" v-model="direccion.calle" />
        </div>

        <div class="botones">
          <button @click="guardarOActualizarDireccion">
            {{ carwash.id_direccion ? "Actualizar dirección" : "Guardar dirección" }}
          </button>
        </div>

        <p v-if="mensaje">{{ mensaje }}</p>
      </section>

      <!-- GALERIA -->
      <section id="galeria" class="box">
        <h2>Galería</h2>

        <div class="gallery">
          <div v-for="(img, i) in galeria" :key="i" class="image">
            <img :src="img.url" />
            <button @click="eliminarImagen(i)">X</button>
          </div>
        </div>

        <input type="file" multiple @change="agregarImagenes" />
      </section>

    </main>



      
    

  </div>
</template>

<script>
import axios from "axios";
import ConfiguracionCW from "./components/ConfiguracionCW.vue";



export default {
   components: {
    ConfiguracionCW
  },
  data() {
    return {
      /* UI */
      open: false,
      sidebarOpen: false, // PARA RESPONSIVE
      error: false,
      settings: {
        promo: true,
        reviews: false,
        reminders: true,
        location: true,
        darkMode: false
      },

      /* APP */
      active: "dashboard",
      mensaje: "",
      id_carwash: null,
      defaultImg: "https://via.placeholder.com/100",
      profileImage: null,

      carwash: {
        id_direccion: null
      },

      direccion: {
        pais: "",
        region: "",
        provincia: "",
        municipio: "",
        ciudad: "",
        barrio: "",
        calle: ""
      },

      galeria: []
    };
  },

  async mounted() {
    // this.id_carwash = localStorage.getItem("id_carwash");
    // if (!this.id_carwash) {
    //   this.$router.push("/login-carwash");
    //   return;
    // }

    // await this.cargarDatos();
    // this.cargarFotoPerfil();
    // this.cargarGaleriaLocal();
    // await this.cargarGaleria();
    const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario || usuario.tipo !== "carwash") {
    this.$router.push("/login");
    return;
  }

  this.id_carwash = usuario.id_carwash;

  await this.cargarDatos();
  this.cargarFotoPerfil();
  this.cargarGaleriaLocal();
  await this.cargarGaleria();
    
  },

  watch: {
    // 🌙 DARK MODE REAL
    "settings.darkMode"(val) {
      document.body.classList.toggle("dark", val);
    }
  },

  methods: {
    /* ===============================
       🔹 UI
    =============================== */
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },

    goTo(section) {
      this.active = section;
      this.sidebarOpen = false;

      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },

    /* ===============================
       🔹 DATOS CARWASH
    =============================== */
    async cargarDatos() {
      try {
        const res = await axios.get(
          `http://localhost:2629/carwash/${this.id_carwash}`
        );

        this.carwash = res.data || {};

        if (this.carwash.DireccionCarwash) {
          this.mapearDireccionDesdeBackend(this.carwash.DireccionCarwash);
        }

        console.log(this.carwash);
      } catch (error) {
        console.error("Error cargando carwash:", error);
      }
    },

    mapearDireccionDesdeBackend(direccion) {
      if (!direccion || !direccion.Calle) return;

      this.carwash.id_direccion = direccion.id_direccion;

      this.direccion = {
        pais: direccion.Calle.Barrio?.Ciudad?.Municipio?.Provincia?.Region?.Pais?.nombre || "",
        region: direccion.Calle.Barrio?.Ciudad?.Municipio?.Provincia?.Region?.nombre || "",
        provincia: direccion.Calle.Barrio?.Ciudad?.Municipio?.Provincia?.nombre || "",
        municipio: direccion.Calle.Barrio?.Ciudad?.Municipio?.nombre || "",
        ciudad: direccion.Calle.Barrio?.Ciudad?.nombre || "",
        barrio: direccion.Calle.Barrio?.nombre || "",
        calle: direccion.Calle?.nombre || ""
      };
    },

    async guardarCambios() {
      await axios.put(
        `http://localhost:2629/carwash/${this.id_carwash}`,
        this.carwash
      );
      this.mensaje = "Datos actualizados ✔";
    },

    async guardarOActualizarDireccion() {
      try {
        if (this.carwash.id_direccion) {
          await axios.put(
            `http://localhost:2629/direccion/${this.carwash.id_direccion}`,
            { direccion: this.direccion }
          );
          this.mensaje = "Dirección actualizada ✔";
        } else {
          const res = await axios.post(
            "http://localhost:2629/direccion",
            {
              id_carwash: this.id_carwash,
              direccion: this.direccion
            }
          );
          this.carwash.id_direccion = res.data.id_direccion;
          this.mensaje = "Dirección guardada ✔";
        }

        await this.cargarDatos();
      } catch (error) {
        console.error(error);
        this.mensaje = "Error al guardar la dirección ❌";
      }
    },

    /* ===============================
       🔹 PERFIL / GALERÍA
    =============================== */
    changeProfile(e) {
      const r = new FileReader();
      r.onload = ev => {
        this.profileImage = ev.target.result;
        localStorage.setItem("profileImage", ev.target.result);
      };
      r.readAsDataURL(e.target.files[0]);
    },

    cargarFotoPerfil() {
      const img = localStorage.getItem("profileImage");
      if (img) this.profileImage = img;
    },

    agregarImagenes(e) {
  const files = e.target.files;

  for (const file of files) {
    const formData = new FormData();
    formData.append("imagen", file);

    axios.post(
      `http://localhost:2629/galeria/${this.id_carwash}`,
      formData
    ).then(res => {
      this.galeria.push(res.data);
    });
  }
},

    eliminarImagen(i) {
  this.galeria.splice(i, 1);
  localStorage.setItem(
    `galeria_carwash_${this.id_carwash}`,
    JSON.stringify(this.galeria)
  );
},
    

    cargarGaleriaLocal() {
    const g = localStorage.getItem(`galeria_carwash_${this.id_carwash}`);
    if (g) this.galeria = JSON.parse(g);
    },

    async cargarGaleria() {
    const res = await axios.get(
    `http://localhost:2629/galeria/${this.id_carwash}`
    );
    this.galeria = res.data;
   },

    /* ===============================
       🔹 FOOTER SIDEBAR
    =============================== */
    goPublicProfile() {
      if (!this.id_carwash) return;
      this.$router.push(`/detalle-carwash`);
    },

    goHelp() {
      this.$router.push("/help");
    },

    logout() {
  // 1️⃣ Borrar sesión completa
  localStorage.removeItem("usuario");
  localStorage.removeItem("user_avatar");
  localStorage.removeItem("id_carwash"); 

  // 2️⃣ Notificar a App.vue
  window.dispatchEvent(new Event("storage"));

  // 3️⃣ Redirigir correctamente
  this.$router.push("/inicioP");
}
  }
};
</script>





<style scoped>
/* RESET */
* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

/* ===== LAYOUT ===== */
.layout {
  display: flex;
  min-height: 100vh;
  background: #f5f8fc;
}

/* ===== SIDEBAR ===== */
.sidebar {
  width: 260px;
  min-width: 260px;
  background: #ffffff;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eee;
}

.sidebar-top {
  text-align: center;
  margin-bottom: 30px;
}

.sidebar-top h3 {
  margin: 10px 0 4px;
  color: #000;
}

.sidebar-top small {
  color: #555;
}

.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 3px solid #ffc107;
}

/* MENU */
.menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu button {
  width: 100%;
  padding: 12px 15px;
  border-radius: 12px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  color: #333;
  font-size: 14px;
}

.menu button.active {
  background: #ffc107;
  font-weight: bold;
}



/* FOOTER */
.sidebar-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-public {
  background: #f2b705;
  border: none;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}

.btn-link {
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
}

.logout {
  color: #c0392b;
}

/* ===== MAIN ===== */
.main {
  flex: 1;
  padding: 40px;
}

/* CONTENEDOR INTERNO (ESTO ES LA CLAVE) */
.main > section {
  max-width: 1200px;
}

/* ===== TITULOS ===== */
.title {
  font-size: 32px;
  margin-bottom: 25px;
  color: #145da0;
}

/* ===== STATS ===== */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 35px;
}

.stat {
  padding: 22px;
  border-radius: 16px;
  color: white;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.stat span {
  background: rgba(255,255,255,0.9);
  color: black;
  padding: 5px 10px;
  border-radius: 8px;
  font-weight: bold;
  
}

.stat strong {
  display: block;
  font-size: 26px;
  margin-top: 12px;
  background-color: transparent;
}

.stat:nth-child(1) { background: #1e88e5; }
.stat:nth-child(2) { background: #b71c1c; }
.stat:nth-child(3) { background: #f6ad3f; color: black; }
.stat:nth-child(4) { background: #ff5252; }

/* ===== BOX ===== */
.box {
  background: white;
  padding: 30px;
  border-radius: 18px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  margin-bottom: 40px;
}

/* ===== PROFILE ===== */
.profile {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.profile img {
  width: 110px;
  height: 110px;
  object-fit: contain;
}

/* ===== FORM ===== */
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form input {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

/* ===== BOTONES ===== */
.btn-main {
  margin: 30px 0;
}

.btn-main button {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: #f6ad3f;
  font-weight: bold;
  cursor: pointer;
}

/* ===== GALERIA ===== */
.gallery {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.gallery img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    min-width: 100%;
    border-right: none;
  }

  .form {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: 1fr;
  }
}

/* ===== HEADER MOBILE ===== */
.mobile-header {
  display: none;
}

@media (max-width: 768px) {
  .mobile-header {
    display: block;
    position: fixed;
    top: 10px;
    left: 15px; /* cambia a right:15px si lo quieres a la derecha */
    z-index: 2000;
    background: transparent;
    padding: 0;
  }

  .menu-btn {
    font-size: 24px;
    background: #145da0;
    border: none;
    color: white;
    width: 38px;
    height: 45px;
    border-radius: 12px;
    cursor: pointer;
    align-items: center;
  }
}


@media (max-width: 768px) {
  .main {
    padding-top: 70px;
  }
}


/* ===== SIDEBAR MOBILE ===== */
@media (max-width: 768px) {
  .mobile-header {
    display: flex;
    align-items: center;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 260px;
    background: white;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main {
    padding: 20px;
  }
}


</style>