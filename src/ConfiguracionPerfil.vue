 <template> 
  <div class="page">

    <!-- Header degradado -->
    <div class="hero">
      <h1  >Configuración del Perfil</h1>
    </div>

    <div class="content">

      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="active">👤 Perfil</div>
        <div>🔔 Notificaciones</div>
        <div>🔒 Seguridad</div>
        <div>🛡 Privacidad</div>
      </aside>

      <!-- Formulario -->
      <main class="card">
        <div class="avatar-section">
          <img :src="avatar" class="big-avatar" />
          <label class="camera">
            📷
            <input type="file" hidden @change="changeAvatar" />
          </label>
        </div>

        <h2>{{ name }}</h2>
        <p class="email">{{ email }}</p>

        <button class="primary">Guardar cambios</button>

        <form>
          <label>Nombre completo</label>
          <input v-model="name" />

          <label>Correo electrónico</label>
          <input v-model="email" />

          <label>Contraseña</label>
          <input v-model="contrasena" />

          

          <div class="actions">
            <button type="button" class="secondary">Cancelar</button>
            <button type="button" class="primary" @click="guardarCambios" >Guardar cambios</button>
          </div>
        </form>
      </main>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
  return {
    id: null,
    avatar:
      localStorage.getItem("user_avatar") ||
      "https://i.pravatar.cc/150?img=32",
    name: "",
    email: "",
    contrasena: ""
  };
},

  mounted() {
  const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

  if (!usuarioGuardado) {
    alert("No hay sesión iniciada");
    this.$router.push("/login");
    return;
  }

  // 👇 Validamos usando el objeto real
  if (usuarioGuardado.tipo !== "usuario") {
    this.$router.push("/dashboard-carwash");
    return;
  }

  this.id = usuarioGuardado.id;
  this.name = usuarioGuardado.nombre;
  this.email = usuarioGuardado.correo;
  this.contrasena = usuarioGuardado.contrasena;

  this.obtenerUsuario();
},

  methods: {
    async obtenerUsuario() {
      try {
        const res = await axios.get(
          `http://localhost:2629/usuarios/${this.id}`
        );

        this.name = res.data.nombre;
        this.email = res.data.correo;
        this.contrasena = res.data.contrasena;

      } catch (error) {
        console.error(error);
      }
    },

    async guardarCambios() {
      try {
        await axios.put(
          `http://localhost:2629/usuarios/${this.id}`,
          {
            nombre: this.name,
            correo: this.email,
            contrasena: this.contrasena
          }
        );

        alert("Perfil actualizado correctamente");
        localStorage.setItem("usuario", JSON.stringify({
        id: this.id,
        nombre: this.name,
        correo: this.email,
        contrasena: this.contrasena
        }));

      } catch (error) {
        console.error(error);
      }
    },

    changeAvatar(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.avatar = reader.result;
        localStorage.setItem("user_avatar", reader.result);

        window.dispatchEvent(new Event("storage"));
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style scoped>
.page {
  background: #f8fafc;
  min-height: 100vh;
}

.hero {
  padding: 50px;
  background: linear-gradient(135deg, #023e8a, #0077b6);
  color: white;
}

.content {
  display: flex;
  padding: 40px;
  gap: 30px;
}

.sidebar {
  width: 220px;
  background: white;
  border-radius: 16px;
  padding: 20px;
}

.sidebar div {
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 8px;
}

.sidebar .active {
  background: #dbeafe;
  color: #2563eb;
  font-weight: bold;
}

.card {
  flex: 1;
  background: white;
  border-radius: 20px;
  padding: 40px;
}

.avatar-section {
  position: relative;
  text-align: center;
}

.big-avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
}

.camera {
  position: absolute;
  bottom: 10px;
  right: 45%;
  background: #3b82f6;
  color: white;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
}

.email {
  color: #64748b;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 20px;
  font-weight: 500;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  margin-top: 6px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  gap: 10px;
}

.primary {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 22px;
  border-radius: 10px;
}

.secondary {
  background: #e5e7eb;
  border: none;
  padding: 12px 22px;
  border-radius: 10px;
}
</style>