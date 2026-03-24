<template>
  <header class="navbar">
    <div class="logo">🚗 Car Wash Finder</div>

    <nav class="menu">
      <span>Inicio</span>
      <span>Servicios</span>
      <span>Ubicaciones</span>
      <span>Contacto</span>
    </nav>

    <div class="profile-wrapper" @click="toggleMenu">
      <img
        class="avatar"
        :src="userImage"
        alt="avatar"
      />

      <div v-if="showMenu" class="dropdown">
        <div @click="goProfile">Perfil</div>
        <div @click="goSettings">Configuración</div>
        <div class="logout" @click="logout">Cerrar sesión</div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
      defaultImage:
        "https://i.pravatar.cc/150?img=32"
    };
  },
  computed: {
    userImage() {
      return localStorage.getItem("user_avatar") || this.defaultImage;
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    goProfile() {
      this.$router.push("/configuracion");
      this.showMenu = false;
    },
    goSettings() {
      this.$router.push("/configuracion");
      this.showMenu = false;
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 30px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
}

.logo {
  font-weight: bold;
}

.menu span {
  margin: 0 12px;
  cursor: pointer;
}

.profile-wrapper {
  position: relative;
  cursor: pointer;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #3b82f6;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 55px;
  background: white;
  border-radius: 12px;
  width: 180px;
  box-shadow: 0 10px 25px rgba(0,0,0,.1);
  overflow: hidden;
}

.dropdown div {
  padding: 12px 16px;
}

.dropdown div:hover {
  background: #f1f5f9;
}

.logout {
  color: #ef4444;
}
</style>