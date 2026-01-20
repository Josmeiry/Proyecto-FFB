<template>
  <div class="container">
    <TaskForm @tarea-agregada="agregarTarea" />

    <ul class="lista">
      <li v-for="(t, index) in tareas" :key="index">{{ t }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TaskForm from "./components/TaskForm.vue";

const tareas = ref([]);

const agregarTarea = (tarea) => {
  tareas.value.push(tarea);
};
</script>

<style scoped>
.container {
  width: 280px;
  margin: auto;
  margin-top: 20px;
  font-family: Arial, sans-serif;
}

.lista {
  margin-top: 15px;
  padding-left: 18px;
  font-size: 14px;
}
</style>
