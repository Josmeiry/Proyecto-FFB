<template>
  <AdminLogin 
    @close="closeModal" 
    @success="goToCarWash" 
  />
</template>

<script setup>
import AdminLogin from "./components/AdminLogin.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const closeModal = () => {
  router.back();   // Vuelve a la pantalla anterior
};

const goToCarWash = () => {
  router.push("/login-carwash");
};
</script>
