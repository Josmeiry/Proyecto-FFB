<template>
  <div class="admin-dashboard">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo-box">
          <ShieldCheck :size="28" class="logo-icon" />
          <span class="logo-text">MAJOAD <small>ADMIN</small></span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <a href="#" :class="{ active: currentTab === 'stats' }" @click.prevent="currentTab = 'stats'">
          <LayoutDashboard :size="20" /> Estadísticas
        </a>
        <a href="#" :class="{ active: currentTab === 'businesses' }" @click.prevent="currentTab = 'businesses'">
          <Building2 :size="20" /> Negocios
        </a>
        <a href="#" :class="{ active: currentTab === 'users' }" @click.prevent="currentTab = 'users'">
          <Users :size="20" /> Usuarios
        </a>
        <a href="#" :class="{ active: currentTab === 'logs' }" @click.prevent="currentTab = 'logs'">
          <History :size="20" /> Actividad
        </a>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdtr186nqiYg4KEk4Y2gVBb6kNRcirFiokzyYquUZZoWgR2ng/viewform?usp=publish-editor" target="_blank" class="support-link">
          <LifeBuoy :size="20" /> Soporte Técnico
        </a>
        <router-link to="/registrar-carwash" class="btn-nav-register">Registrar Car Wash</router-link>
      </nav>

      <div class="sidebar-footer">
        <button @click="logout" class="btn-logout">
          <LogOut :size="18" /> Cerrar Sesión
        </button>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="main-content">
      <header class="content-header">
        <div class="header-info">
          <h1>{{ tabTitle }}</h1>
          <p>Bienvenido al Centro de Comando de Majoad</p>
        </div>
        <div class="header-actions">
          <div class="admin-profile">
            <span class="admin-name">Administrador</span>
            <div class="admin-avatar">A</div>
          </div>
        </div>
      </header>

      <!-- STATS SECTION -->
      <section v-if="currentTab === 'stats'" class="tab-content stats-grid reveal-up">
        <div class="stat-card">
          <div class="stat-icon users-bg"><Users :size="24" /></div>
          <div class="stat-info">
            <h3>Total Usuarios</h3>
            <span class="stat-value">{{ stats.totalUsers }}</span>
            <span class="stat-trend up">↑ 12% este mes</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon business-bg"><Building2 :size="24" /></div>
          <div class="stat-info">
            <h3>Car Washes</h3>
            <span class="stat-value">{{ stats.totalBusinesses }}</span>
            <span class="stat-trend">Ver lista completa</span>
          </div>
        </div>
        <!-- <div class="stat-card">
          <div class="stat-icon pending-bg"><AlertCircle :size="24" /></div>
          <div class="stat-info">
            <h3>Pendientes</h3>
            <span class="stat-value">{{ stats.pendingApprovals }}</span>
            <span class="stat-trend warning">Acción requerida</span>
          </div>
        </div> -->
      </section>

      <!-- BUSINESSES TABLE -->
      <section v-if="currentTab === 'businesses'" class="tab-content reveal-up">
        <div class="table-container shadow-dark">
          <div class="table-header">
            <h2>Gestión de Negocios</h2>
            <div class="search-box">
              <Search :size="18" />
              <input type="text" placeholder="Buscar car wash..." v-model="searchBusiness">
            </div>
          </div>
          <table class="custom-table">
            <thead>
              <tr>
                <th>Negocio</th>
                <!-- <th>Propietario</th> -->
                <th>Estado</th>
                <!-- <th>Fecha</th> -->
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cw in filteredBusinesses" :key="cw.id">
                <td>
                  <div class="user-info">
                    <div class="user-avatar-small">{{ cw.nombre_carwash?.[0] || "C" }}</div>
                    <span>{{ cw.nombre_carwash }}</span>
                  </div>
                </td>
                <!-- <td>{{ cw.owner }}</td> -->
                <td>
                  <span :class="['badge', 'aprobado']">
                     Activo 
                  </span>
                </td>
                <!-- <td>{{ cw.fecha }}</td> -->
                <td>
                  <div class="action-buttons">
                    <button v-if="cw.estado === 'pendiente'" class="btn-action approve" @click="approveBusiness(cw.id)">
                      <Check :size="16" /> Aprobar
                    </button>
                    <button class="btn-action delete" @click="deleteBusiness(cw.id_carwash)">
                      <Trash2 :size="16" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- USERS TABLE -->
      <section v-if="currentTab === 'users'" class="tab-content reveal-up">
        <div class="table-container shadow-dark">
          <div class="table-header">
            <h2>Usuarios del Sistema</h2>
            <div class="search-box">
              <Search :size="18" />
              <input type="text" placeholder="Buscar usuario..." v-model="searchUser">
            </div>
          </div>
          <table class="custom-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Último Acceso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td>
                  <div class="user-info">
                    <div class="user-avatar-small">{{ user.nombre?.[0] || "U" }}</div>
                    <span>{{ user.nombre }}</span>
                  </div>
                </td>
                <td>{{ user.correo }}</td>
                <td><span class="badge user">{{ user.tipo }}</span></td>
                <td>{{ user.lastLogin || 'Hoy' }}</td>
                <td>
                  <button class="btn-action delete" @click="deleteUser(user.id)">
                    <UserMinus :size="16" /> Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { 
  ShieldCheck, LayoutDashboard, Building2, Users, History, LogOut, 
  Search, Check, Trash2, UserMinus, AlertCircle, TrendingUp, LifeBuoy 
} from 'lucide-vue-next';

const router = useRouter();
const currentTab = ref('stats');
const searchBusiness = ref('');
const searchUser = ref('');

// ESTADOS DE DATOS
const stats = ref({
  totalUsers: 0,
  totalBusinesses: 0,
  pendingApprovals: 0
});

const businesses = ref([]);
const usersList = ref([]);

const tabTitle = computed(() => {
  const titles = { stats: 'Dashboard Global', businesses: 'Control de Negocios', users: 'Directorio de Usuarios', logs: 'Registro de Actividad' };
  return titles[currentTab.value];
});

// FILTROS
const filteredBusinesses = computed(() => {
  return businesses.value.filter(b =>
    b.nombre_carwash?.toLowerCase().includes(
      searchBusiness.value.toLowerCase()
    )
  );
});

const filteredUsers = computed(() => {
  return usersList.value.filter(u => u.nombre.toLowerCase().includes(searchUser.value.toLowerCase()));
});

// CARGAR DATOS
const loadData = async () => {
  try {

    // =========================
    // CAR WASHES
    // =========================
    const carwashRes = await axios.get(
      "https://proyecto-bff.onrender.com/carwash"
    );

    businesses.value = carwashRes.data;

    // =========================
    // USUARIOS
    // =========================
    const usersRes = await axios.get(
      "https://proyecto-bff.onrender.com/usuarios"
    );

    usersList.value = usersRes.data;

    // =========================
    // STATS
    // =========================
    stats.value = {
  totalUsers: usersList.value.length,
  totalBusinesses: businesses.value.length,
  pendingApprovals: 0
};

  } catch (err) {
    console.error("Error cargando panel:", err);
  }
};

// ACCIONES
const approveBusiness = async (id) => {
  try {

    await axios.put(
      `https://proyecto-bff.onrender.com/carwash/${id}`,
      {
        estado: "aprobado"
      }
    );

    const biz = businesses.value.find(
      b => b.id_carwash === id
    );

    if (biz) {
      biz.estado = "aprobado";
    }

    stats.value.pendingApprovals =
      businesses.value.filter(
        b => b.estado !== "aprobado"
      ).length;

  } catch (error) {
    console.error("Error aprobando negocio:", error);
  }
};

const deleteUser = async (id) => {
  if (!confirm("¿Eliminar este usuario?")) return;

  try {

    await axios.delete(
      `https://proyecto-bff.onrender.com/usuarios/${id}`
    );

    usersList.value = usersList.value.filter(
      u => u.id !== id
    );

    stats.value.totalUsers--;

  } catch (error) {
    console.error("Error eliminando usuario:", error);
  }
};

const deleteBusiness = async (id) => {

  if (!confirm("¿Eliminar este negocio del sistema?")) {
    return;
  }

  try {

    await axios.delete(
      `https://proyecto-bff.onrender.com/carwash/${id}`
    );

    businesses.value =
      businesses.value.filter(
        b => b.id_carwash !== id
      );

    stats.value.totalBusinesses =
      businesses.value.length;

  } catch (error) {
    console.error("Error eliminando negocio:", error);
  }
};

const logout = () => {
  localStorage.removeItem("usuario");
  router.push("/login");
};

onMounted(loadData);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.admin-dashboard {
  font-family: 'Inter', sans-serif;
  display: flex;
  min-height: 100vh;
  background-color: #020617;
  color: #f8fafc;
}

/* SIDEBAR */
.sidebar {
  width: 280px;
  background-color: #0b1120;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar-header { margin-bottom: 40px; }
.logo-box { display: flex; align-items: center; gap: 12px; color: #3b82f6; }
.logo-text { font-size: 20px; font-weight: 900; letter-spacing: 1px; }
.logo-text small { font-size: 10px; background: #3b82f6; color: #fff; padding: 2px 6px; border-radius: 4px; vertical-align: middle; }

.sidebar-nav { display: flex; flex-direction: column; gap: 8px; flex: 1; }
.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: 12px;
  color: #94a3b8;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}
.sidebar-nav a:hover, .sidebar-nav a.active {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.btn-logout {
  margin-top: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 14px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}
.btn-logout:hover { background: #ef4444; color: #fff; }

/* MAIN CONTENT */
.main-content { flex: 1; padding: 40px; overflow-y: auto; }

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}
.content-header h1 { font-size: 32px; font-weight: 900; margin-bottom: 4px; }
.content-header p { color: #64748b; font-size: 15px; }

.admin-profile { display: flex; align-items: center; gap: 14px; }
.admin-name { font-weight: 700; font-size: 14px; }
.admin-avatar {
  width: 45px; height: 45px; background: #3b82f6; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; font-weight: 900;
}

/* STATS */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}
.stat-card {
  background: #0b1120;
  padding: 25px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  gap: 20px;
}
.stat-icon {
  width: 60px; height: 60px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
}
.users-bg { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.business-bg { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.pending-bg { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

.stat-info h3 { color: #64748b; font-size: 14px; margin-bottom: 6px; }
.stat-value { font-size: 28px; font-weight: 900; display: block; margin-bottom: 4px; }
.stat-trend { font-size: 12px; font-weight: 700; color: #64748b; }
.stat-trend.up { color: #10b981; }
.stat-trend.warning { color: #ef4444; }

/* TABLES */
.table-container {
  background: #0b1120;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
}
.table-header {
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.table-header h2 { font-size: 20px; font-weight: 800; }

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #020617;
  padding: 10px 18px;
  border-radius: 14px;
  width: 300px;
}
.search-box input {
  background: transparent; border: none; color: #fff; font-size: 14px; width: 100%;
}
.search-box input:focus { outline: none; }

.custom-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.custom-table th { padding: 20px 30px; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
.custom-table td { padding: 18px 30px; border-top: 1px solid rgba(255, 255, 255, 0.05); }

.user-info { display: flex; align-items: center; gap: 12px; }
.user-avatar-small {
  width: 35px; height: 35px; background: #1e293b; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px;
}

.badge {
  padding: 4px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase;
}
.badge.aprobado { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.badge.pendiente { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.badge.user { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }

.btn-action {
  padding: 8px 12px; border-radius: 8px; border: none; cursor: pointer; transition: 0.3s;
  display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 12px;
}
.btn-action.approve { background: #10b981; color: #fff; }
.btn-action.delete { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
.btn-action.delete:hover { background: #ef4444; color: #fff; }

.reveal-up {
  animation: revealUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes revealUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1024px) {
  .sidebar { width: 80px; padding: 20px 10px; }
  .logo-text, .sidebar-nav a span, .admin-name, .sidebar-nav a { display: none; }
  .sidebar-nav a { justify-content: center; font-size: 0; }
  .sidebar-nav a svg { display: block !important; margin: 0; }
}
</style>
