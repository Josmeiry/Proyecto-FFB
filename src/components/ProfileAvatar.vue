<template>
  <div class="profile-container">
    <img
      :src="avatar"
      class="profile-avatar"
      @click="toggleMenu"
    />

    <div v-if="open" class="profile-menu">
      <div @click="goConfig">⚙️ Configuración</div>
      <div @click="goProfile" style="color: black;" >👤 Mi perfil</div>
      <div class="logout" @click="logout">🚪 Cerrar sesión</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      defaultAvatar: "https://i.pravatar.cc/100?img=12"
    };
  },
  computed: {
    avatar() {
      return (
        localStorage.getItem("user_avatar") || this.defaultAvatar
      );
    }
  },
  mounted() {
  window.addEventListener("storage", () => {
    this.$forceUpdate();
  });
},
  methods: {
  toggleMenu() {
    this.open = !this.open;
  },

  goProfile() {
    this.$router.push('/configuracion');
    this.open = false;
  },

  logout() {
   localStorage.removeItem("usuario");
   localStorage.removeItem("tipo");

   // 🔥 NO borres la imagen
   // localStorage.removeItem("user_avatar");

   this.open = false;
   window.dispatchEvent(new Event("storage"));
   this.$router.push("/inicioP");
  }
}
};
</script>

<style scoped>
.profile-container {
  position: relative;
}

.profile-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px #2563eb;
}

.profile-menu {
  position: absolute;
  right: 0;
  top: 55px;
  background: white;
  border-radius: 12px;
  min-width: 180px;
  box-shadow: 0 10px 25px rgba(0,0,0,.12);
  overflow: hidden;
  z-index: 50;
}

.profile-menu div {
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
}

.profile-menu div:hover {
  background: #f1f5f9;
}

.logout {
  color: #ef4444;
  font-weight: 500;
}
</style>