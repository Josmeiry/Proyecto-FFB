<template>
  <div class="profile-settings-page">
    <!-- PREMIUM HEADER -->
    <header class="profile-hero">
      <div class="hero-blur"></div>
      <div class="hero-content">
        <h1>Configuración de Cuenta</h1>
        <p>Gestiona tu información personal y preferencias de seguridad</p>
      </div>
    </header>

    <div class="settings-container">
      <!-- SIDEBAR NAV -->
      <aside class="settings-sidebar">
        <nav class="nav-menu">
          <div class="nav-item active">
            <UserIcon :size="20" /> <span>Perfil</span>
          </div>
          <div class="nav-item">
            <Bell :size="20" /> <span>Notificaciones</span>
          </div>
          <div class="nav-item">
            <Shield :size="20" /> <span>Seguridad</span>
          </div>
          <div class="nav-item">
            <Lock :size="20" /> <span>Privacidad</span>
          </div>
        </nav>
        
        <div class="sidebar-footer">
          <div class="status-card">
            <div class="dot"></div>
            <span>Usuario Verificado</span>
          </div>
        </div>
      </aside>

      <!-- MAIN FORM CARD -->
      <main class="settings-main">
        <div class="profile-card-premium">
          <div class="profile-header-section">
            <div class="avatar-wrapper">
              <img :src="avatar" class="profile-avatar" alt="User Avatar" />
              <label class="camera-btn">
                <CameraIcon :size="18" />
                <input type="file" hidden @change="changeAvatar" />
              </label>
            </div>
            <div class="profile-intro">
              <h2>{{ name }}</h2>
              <p>{{ email }}</p>
              <div class="badge-premium">Miembro Majoad</div>
            </div>
            <button class="btn-save-top" @click="guardarCambios">Guardar cambios</button>
          </div>

          <div class="form-divider"></div>

          <form class="premium-form" @submit.prevent="guardarCambios">
            <div class="form-grid">
              <div class="form-group">
                <label>Nombre completo</label>
                <div class="input-wrapper">
                  <UserIcon :size="18" class="input-icon" />
                  <input v-model="name" placeholder="Tu nombre" />
                </div>
              </div>

              <div class="form-group">
                <label>Correo electrónico</label>
                <div class="input-wrapper">
                  <Mail :size="18" class="input-icon" />
                  <input v-model="email" placeholder="tu@email.com" />
                </div>
              </div>

              <div class="form-group">
                <label>Contraseña</label>
                <div class="input-wrapper">
                  <Lock :size="18" class="input-icon" />
                  <input type="password" v-model="contrasena" placeholder="********" />
                </div>
              </div>
            </div>

            <div class="form-actions-bottom">
              <button type="button" class="btn-cancel">Cancelar</button>
              <button type="submit" class="btn-submit">Actualizar Perfil</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { 
  User as UserIcon, 
  Bell, 
  Shield, 
  Lock, 
  Camera as CameraIcon, 
  Mail,
  CheckCircle 
} from 'lucide-vue-next';

export default {
  components: {
    UserIcon,
    Bell,
    Shield,
    Lock,
    CameraIcon,
    Mail,
    CheckCircle
  },
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
          `https://proyecto-bff.onrender.com/usuarios/${this.id}`
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
          `https://proyecto-bff.onrender.com/usuarios/${this.id}`,
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
        alert("Error al actualizar el perfil");
      }
    },

    changeAvatar(e) {
      const file = e.target.files[0];
      if (!file) return;
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
.profile-settings-page {
  background: #f0f4f8;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #1a202c;
}

/* HERO */
.profile-hero {
  position: relative;
  background: linear-gradient(135deg, #004aad 0%, #002d72 100%);
  height: 240px;
  display: flex;
  align-items: center;
  padding: 0 60px;
  color: white;
  overflow: hidden;
}

.hero-blur {
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(80px);
  border-radius: 50%;
}

.hero-content h1 { font-size: 32px; font-weight: 800; margin-bottom: 8px; color: #ffffff; }
.hero-content p { font-size: 16px; color: rgba(255, 255, 255, 0.9); }

/* LAYOUT */
.settings-container {
  max-width: 1200px;
  margin: -60px auto 0;
  padding: 0 40px 100px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  position: relative;
  z-index: 10;
}

/* SIDEBAR */
.settings-sidebar {
  background: white;
  border-radius: 24px;
  padding: 30px 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: fit-content;
}

.nav-menu { display: flex; flex-direction: column; gap: 8px; }
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-radius: 14px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s;
}
.nav-item:hover { background: #f1f5f9; color: #004aad; }
.nav-item.active { background: #e0e7ff; color: #004aad; }

.status-card {
  margin-top: 40px;
  background: #f8fafc;
  padding: 15px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 700;
  color: #166534;
}
.status-card .dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; }

/* MAIN CONTENT */
.profile-card-premium {
  background: white;
  border-radius: 32px;
  padding: 40px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.05);
}

.profile-header-section {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 40px;
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}
.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f8fafc;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.camera-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #004aad;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 3px solid white;
  transition: transform 0.3s;
}
.camera-btn:hover { transform: scale(1.1); }

.profile-intro h2 { font-size: 24px; font-weight: 800; margin-bottom: 4px; }
.profile-intro p { font-size: 15px; color: #64748b; margin-bottom: 12px; }
.badge-premium {
  background: #fff9e6;
  color: #d97706;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 800;
  display: inline-block;
}

.btn-save-top {
  margin-left: auto;
  background: #004aad;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}
.btn-save-top:hover { background: #002d72; transform: translateY(-2px); }

.form-divider { height: 1px; background: #f1f5f9; margin-bottom: 40px; }

/* FORM */
.premium-form { display: flex; flex-direction: column; gap: 30px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group:last-child { grid-column: span 2; }
.form-group label { font-size: 14px; font-weight: 700; color: #475569; margin-left: 4px; }

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.input-icon {
  position: absolute;
  left: 16px;
  color: #94a3b8;
}
.input-wrapper input {
  width: 100%;
  padding: 14px 14px 14px 48px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  font-size: 15px;
  transition: all 0.3s;
}
.input-wrapper input:focus {
  outline: none;
  border-color: #004aad;
  background: white;
  box-shadow: 0 0 0 4px rgba(0, 74, 173, 0.1);
}

.form-actions-bottom {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}
.btn-cancel {
  background: #f1f5f9;
  color: #475569;
  border: none;
  padding: 14px 28px;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
}
.btn-submit {
  background: #004aad;
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}
.btn-submit:hover { background: #002d72; box-shadow: 0 10px 20px rgba(0, 74, 173, 0.2); }

@media (max-width: 900px) {
  .settings-container { grid-template-columns: 1fr; }
  .profile-header-section { flex-direction: column; text-align: center; }
  .btn-save-top { margin: 20px auto 0; }
  .form-grid { grid-template-columns: 1fr; }
  .form-group:last-child { grid-column: auto; }
}
</style>