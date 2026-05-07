<template>
  <AdminLogin 
    @close="emitClose"
    @success="goToAdminDashboard" 
  />
</template>

<script setup>
import AdminLogin from "./components/AdminLogin.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const closeModal = () => {
  router.back();   // Vuelve a la pantalla anterior
};

const goToAdminDashboard = () => {
  router.push("/admin-dashboard");
};
</script>
