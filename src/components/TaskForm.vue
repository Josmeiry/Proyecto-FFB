<template>
  <div class="task-form">
    <h2 class="titulo">Nueva Tarea</h2>

    <input 
      type="text" 
      v-model="titulo" 
      class="input"
      placeholder="Escribe una tarea..."
    />

    <div class="opc">
      <span>¿Quieres guardar la tarea?</span>
      <label>
        <input type="radio" value="true" v-model="guardar" /> Sí
      </label>
      <label>
        <input type="radio" value="false" v-model="guardar" /> No
      </label>
    </div>

    <button class="btn" @click="enviar">Agregar</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const titulo = ref("");
const guardar = ref("false");

const emit = defineEmits(["tarea-agregada"]);

const enviar = () => {
  if (guardar.value === "true") {
    emit("tarea-agregada", titulo.value);
  }

  titulo.value = "";
  guardar.value = "false";
};
</script>

<style scoped>
.task-form {
  width: 250px;
  padding: 12px;
  border-radius: 10px;
  background: #f7f7f7;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
}

.titulo {
  margin: 0;
  font-size: 16px;
  text-align: center;
}

.input {
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.opc {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  padding: 6px;
  border: none;
  background: #4a90e2;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn:hover {
  background: #3578c8;
}
</style>
