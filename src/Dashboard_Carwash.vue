<template>
  <div class="layout">
    <!-- SIDEBAR -->
    <aside class="sidebar">
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
        <!--
        <button :class="{ active: active === 'estadisticas' }" @click="goTo('estadisticas')">
          Estadísticas Clientes
        </button>
        -->
        <button :class="{ active: active === 'configuracion' }" @click="goTo('configuracion')">
          Configuración
        </button>
        <button :class="{ active: active === 'galeria' }" @click="goTo('galeria')">
          Galería
        </button>
      </nav>
    </aside>

    <!-- MAIN -->
    <main class="main">
      <!-- DASHBOARD -->
      <section id="dashboard">
        <h1 class="title">Dashboard</h1>
        <div class="stats">
          <div class="stat"><span>Clientes</span><strong>120</strong></div>
          <div class="stat"><span>Servicios</span><strong>8</strong></div>
          <div class="stat"><span>Reservas</span><strong>34</strong></div>
          <div class="stat"><span>Ingresos</span><strong>$45,000</strong></div>
        </div>
      </section>

      <!-- PERFIL -->
      <section id="perfil" class="box">
        <h2>Perfil del CarWash</h2>

        <!-- FOTO PERFIL -->
        <div class="profile">
          <img :src="profileImage || defaultImg" />
          <input type="file" @change="changeProfile" />
        </div>

        <!-- DATOS -->
        <div class="form">
          <input placeholder="Nombre" v-model="carwash.nombre_carwash" />
          <input placeholder="Correo" v-model="carwash.correo" disabled />
          <input placeholder="Teléfono" v-model="carwash.telefono" />
        </div>
        <div class="btn-main" >
          <button  @click="guardarCambios">
            Guardar cambios
          </button>
        </div>
        <!-- DIRECCIÓN (NUEVO, TEXTO) -->
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

      <!-- ESTADISTICAS
      <section id="estadisticas" class="box">
        <h2>Estadísticas Clientes</h2>
        <p>Aquí irán gráficas y reportes.</p>
      </section>
 -->
      <!-- CONFIGURACION -->
      <section id="configuracion" class="box">
        <h2>Configuración</h2>
        <p>Ajustes del sistema.</p>
      </section>

      <!-- GALERIA -->
      <section id="galeria" class="box">
        <h2>Galería del CarWash</h2>

        <div class="gallery">
          <div v-for="(img, i) in galeria" :key="i" class="image">
            <img :src="img.base64" />
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

export default {
  data() {
    return {
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
    this.id_carwash = localStorage.getItem("id_carwash");
    if (!this.id_carwash) {
      this.$router.push("/login-carwash");
      return;
    }

    await this.cargarDatos();
    this.cargarFotoPerfil();
    this.cargarGaleriaLocal();
  },

  methods: {
    /* ===============================
       🔹 CARGAR DATOS DEL CARWASH
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
      } catch (error) {
        console.error("Error cargando carwash:", error);
      }
    },

    /* ===============================
       🔹 MAPEAR DIRECCIÓN
    =============================== */
    mapearDireccionDesdeBackend(direccion) {
      if (!direccion || !direccion.Calle) return;

      this.carwash.id_direccion = direccion.id_direccion;

      this.direccion = {
        pais:
          direccion.Calle.Barrio?.Ciudad?.Municipio?.Provincia?.Region?.Pais
            ?.nombre || "",
        region:
          direccion.Calle.Barrio?.Ciudad?.Municipio?.Provincia?.Region
            ?.nombre || "",
        provincia:
          direccion.Calle.Barrio?.Ciudad?.Municipio?.Provincia?.nombre || "",
        municipio:
          direccion.Calle.Barrio?.Ciudad?.Municipio?.nombre || "",
        ciudad: direccion.Calle.Barrio?.Ciudad?.nombre || "",
        barrio: direccion.Calle.Barrio?.nombre || "",
        calle: direccion.Calle?.nombre || ""
      };
    },

    /* ===============================
       🔹 GUARDAR DATOS CARWASH
    =============================== */
    async guardarCambios() {
      await axios.put(
        `http://localhost:2629/carwash/${this.id_carwash}`,
        this.carwash
      );
      this.mensaje = "Datos actualizados ✔";
    },

    /* ===============================
       🔹 GUARDAR / ACTUALIZAR DIRECCIÓN
    =============================== */
    async guardarOActualizarDireccion() {
      try {
        if (this.carwash.id_direccion) {
          // 🔁 ACTUALIZAR
          await axios.put(
            `http://localhost:2629/direccion/${this.carwash.id_direccion}`,
            { direccion: this.direccion }
          );
          this.mensaje = "Dirección actualizada ✔";
        } else {
          // 🆕 CREAR
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

        // 🔄 RECARGAR DATOS PARA QUE SE QUEDE
        await this.cargarDatos();
      } catch (error) {
        console.error(error);
        this.mensaje = "Error al guardar la dirección ❌";
      }
    },

    /* ===============================
       🔹 PERFIL Y GALERÍA
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
      [...e.target.files].forEach(f => {
        const r = new FileReader();
        r.onload = ev => {
          this.galeria.push({ base64: ev.target.result });
          localStorage.setItem(
            "galeria_carwash",
            JSON.stringify(this.galeria)
          );
        };
        r.readAsDataURL(f);
      });
    },

    eliminarImagen(i) {
      this.galeria.splice(i, 1);
      localStorage.setItem(
        "galeria_carwash",
        JSON.stringify(this.galeria)
      );
    },

    cargarGaleriaLocal() {
      const g = localStorage.getItem("galeria_carwash");
      if (g) this.galeria = JSON.parse(g);
    },

    goTo(section) {
      this.active = section;
      document
        .getElementById(section)
        .scrollIntoView({ behavior: "smooth" });
    }
  }
};
</script>





<style scoped>
* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

/* LAYOUT */
.layout {
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #e6f0fa, #ffffff);
}

/* SIDEBAR */
.sidebar {
  width: 260px;
  background: white;
  color: white;
  padding: 25px 15px;
  display: flex;
  flex-direction: column;
}

.sidebar-top {
  text-align: center;
  margin-bottom: 30px;
}

.sidebar-top h3,
.sidebar-top small {
  color: black;
}

.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 3px solid #ffc107;
}

/* MENU */
.menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar button {
  width: 100%;
  padding: 12px 15px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  text-align: left;
  font-size: 14px;
  transition: 0.3s;
}

.sidebar button:hover {
  background: rgba(255, 255, 255, 0.15);
}

.sidebar button.active {
  background: linear-gradient(135deg, #ffc107, #ffda44);
  color: black;
  font-weight: bold;
}

/* MAIN */
.main {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

.title {
  font-size: 30px;
  margin-bottom: 25px;
  color: #145da0;
}

/* STATS */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.stat {
  padding: 22px;
  border-radius: 16px;
  color: white;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.stat:nth-child(1) {
  background: linear-gradient(135deg, #145da0, #1e88e5);
}

.stat:nth-child(2) {
  background: linear-gradient(135deg, #7b0d0d, #b71c1c);
}

.stat:nth-child(3) {
  background: linear-gradient(135deg, #f3ca50, #f6ad3f);
  color: black;
}

.stat:nth-child(4) {
  background: linear-gradient(135deg, #7b0d0d, #ff5252);
}

.stat span {
  background: rgba(255,255,255,0.9);
  color: black;
  padding: 5px 10px;
  border-radius: 8px;
  font-weight: bold;
}

.stat strong {
  font-size: 28px;
  display: block;
  margin-top: 12px;
}
.stat strong {
  background-color: transparent;
}

/* BOX */
.box {
  background: linear-gradient(135deg, #ffffff, #f1f6fb);
  padding: 30px;
  border-radius: 18px;
  margin-bottom: 30px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

/* PROFILE */
.profile {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.profile img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 3px solid #145da0;
}

/* FORM */
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.form input {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

/* BOTONES */
.btn-main {
  display: flex;
  gap: 15px;
  margin-bottom: 40px;
}

.btn-main button {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  transition: 0.3s;
}

.btn-main button:first-child {
  background: linear-gradient(135deg, #f3ca50, #f6ad3f);
}



.btn-main button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.2);
}





.botones {
  display: flex;
  gap: 15px;
  margin-bottom: 40px;
}

.botones button {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  transition: 0.3s;
}

.botones button:first-child {
  background: linear-gradient(135deg, #145da0, #1e88e5);
}

.botones button:last-child {
  background: linear-gradient(135deg, #7b0d0d, #d32f2f);
}

.botones button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.2);
}

/* GALERIA */
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
}

.gallery .image {
  position: relative;
}

.gallery img {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid #145da0;
}

.gallery button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: red;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  padding: 2px 6px;
}



.textarea {
  width: 100%;
  margin-top: 15px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
}
.sub {
  margin: 25px 0 10px;
  color: #145da0;
}



/* RESPONSIVE */
@media (max-width: 900px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .form {
    grid-template-columns: 1fr;
  }

  .botones {
    flex-direction: column;
  }
}
</style>
