<script setup>
import { ref, onMounted } from "vue";

const avatar = ref(null);

// Cargar avatar guardado al entrar
onMounted(() => {
  const savedAvatar = localStorage.getItem("userAvatar");
  if (savedAvatar) {
    avatar.value = savedAvatar;
  }
});

// Cuando el usuario selecciona imagen
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    avatar.value = reader.result;
    localStorage.setItem("userAvatar", reader.result);
  };
  reader.readAsDataURL(file);
};
</script>

<template>
  <div class="settings-container">
    <h2>Configuración de perfil</h2>

    <!-- Avatar -->
    <div class="avatar-preview">
      <img
        :src="avatar || '/avatar-default.png'"
        alt="Avatar"
      />
    </div>

    <!-- Input -->
    <input
      type="file"
      accept="image/*"
      @change="onFileChange"
    />
  </div>
</template>

<style scoped>
.settings-container {
  max-width: 400px;
}

.avatar-preview {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #1e88e5;
  margin-bottom: 12px;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>