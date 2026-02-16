<template>
  <div class="config-overlay">
    <div class="config-panel">

      <!-- HEADER -->
      <div class="config-header">
        <h2>Configuración</h2>
        <button class="close-btn" @click="emitClose">✕</button>
      </div>

      <!-- CUENTA -->
      <section class="section">
        <h4>Cuenta</h4>

        <!-- <div class="item blue" >
          <span style="background-color:transparent;"  >Editar Perfil</span>
          <span class="arrow" style="background-color:transparent;" >›</span>
        </div> -->

        <div  class="item gold" @click="dialogType = 'payment'">

          <span style="background-color:transparent;" >Métodos de Pago</span>
          <span class="arrow" style="background-color:transparent;" >›</span>
        </div>

        <div class="item red danger" @click="dialogType = 'delete'">
          <span style="background-color:transparent;" >Eliminar Cuenta</span>
          <span class="arrow" style="background-color:transparent;" >›</span>
        </div>
      </section>

      <!-- NOTIFICACIONES -->
      <section class="section">
        <h4>Notificaciones</h4>

        <div class="item red toggle">
          <span style="background-color:transparent;"  >Promociones</span>
          <label class="switch" style="background-color:transparent;" >
            <input type="checkbox" v-model="promos" />
            <span class="slider"></span>
          </label>
        </div>

      

        <div class="item coral toggle">
          <span style="background-color:transparent;" >Recordatorios</span>
          <label class="switch" style="background-color:transparent;" >
            <input type="checkbox" v-model="reminders" />
            <span class="slider"></span>
          </label>
        </div>
      </section>

      <!-- GENERAL -->
      <section class="section">
        <h4>General</h4>

        <div class="item blue" @click="dialogType = 'language'">
          <span style="background-color:transparent;" >Idioma</span>
          <span class="arrow" style="background-color:transparent;" >Español ›</span>
        </div>
      </section>

    </div>
  </div>
  <DialogsCW
  v-if="dialogType"
  :type="dialogType"
  @close="dialogType = null"
  @language="changeLanguage"
  />

</template>

<script setup>
import { ref } from "vue";

import DialogsCW from "./DialogsCW.vue";


const dialogType = ref(null);


const emit = defineEmits(["close"]);

const promos = ref(true);
const reviews = ref(false);
const reminders = ref(true);

const emitClose = () => emit("close");
</script>

<style scoped>
/* OVERLAY */
.config-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

/* PANEL */
.config-panel {
  width: 380px;
  max-height: 90vh;
  background: #fff;
  border-radius: 18px;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
}

/* HEADER */
.config-header {
  background: linear-gradient(135deg, #064f99, #1e88e5);
  color: white;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.25);
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  line-height: 1;

  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.close-btn:hover {
  background: rgba(255,255,255,0.4);
  transform: scale(1.05);
}


/* SECTION */
.section {
  padding: 18px;
}

.section h4 {
  margin-bottom: 12px;
  color: #333;
  font-size: 15px;
}

/* ITEM BASE */
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-radius: 14px;
  margin-bottom: 10px;
  color: white;
  font-weight: 500;
  
}

/* ARROW */
.arrow {
  opacity: 0.9;
}

/* COLORS / GRADIENTS */
.blue {
  background: linear-gradient(135deg, #1e88e5, #1565c0);
}

.gold {
  background: linear-gradient(135deg, #f6ad3f, #f39c12);
  color: #000;
}

.red {
  background: linear-gradient(135deg, #b71c1c, #8e0000);
}

.coral {
  background: linear-gradient(135deg, #ff5252, #ff1744);
}

.danger {
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.3);
}

/* TOGGLE */
.toggle {
  gap: 12px;
}

/* SWITCH */
.switch {
  position: relative;
  width: 42px;
  height: 22px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.35);
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s;
}

.slider::before {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  left: 2px;
  top: 2px;
  background: white;
  border-radius: 50%;
  transition: 0.3s;
}

.switch input:checked + .slider {
  background: rgba(255,255,255,0.7);
}

.switch input:checked + .slider::before {
  transform: translateX(20px);
}
</style>
