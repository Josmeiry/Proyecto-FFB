<template>
  <div class="dialog-overlay" @click.self="emitClose">
    <div class="dialog-box">

      <!-- HEADER -->
      <div class="dialog-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="emitClose">✕</button>
      </div>

      <!-- CONTENIDO -->
      <div class="dialog-content">

        <!-- MÉTODOS DE PAGO -->
        <div v-if="type === 'payment'">
          <p class="desc">
            Los pagos por promociones se realizarán mediante transferencia bancaria.
          </p>

          <div class="card">
            <span style="background-color: transparent;" >Banco</span>
            <span class="placeholder">Popular</span>
          </div>

          <div class="card">
            <span style="background-color: transparent;" >Cuenta</span>
            <span class="placeholder">000-000000-0</span>
          </div>

          <div class="card">
            <span style="background-color: transparent;" >Titular</span>
            <span class="placeholder">Josmeiry Muñoz Inoa</span>
          </div>
        </div>

        <!-- ELIMINAR CUENTA -->
        <div v-if="type === 'delete'">
          <p class="warning">
            Esta acción eliminará tu cuenta permanentemente.
          </p>

          <button class="danger-btn">
            Eliminar cuenta
          </button>
        </div>

        <!-- IDIOMA -->
        <div v-if="type === 'language'">
          <div class="lang-option" @click="selectLang('es')">
            🇪🇸 Español
          </div>

          <div class="lang-option" @click="selectLang('en')">
            🇺🇸 English
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: String
});

const emit = defineEmits(["close", "language"]);

const emitClose = () => emit("close");

const selectLang = (lang) => {
  emit("language", lang);
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.dialog-box {
  width: 360px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

/* HEADER */
.dialog-header {
  background: linear-gradient(135deg, #1e88e5, #1565c0);
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* CONTENT */
.dialog-content {
  padding: 20px;
}

.desc {
  color: #444;
  margin-bottom: 16px;
}

.card {
  background: #f4f6f8;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.placeholder {
  opacity: 0.6;
}

/* DELETE */
.warning {
  color: #b71c1c;
  font-weight: 500;
  margin-bottom: 20px;
}

.danger-btn {
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #b71c1c, #8e0000);
  color: white;
  font-weight: bold;
  cursor: pointer;
}

/* LANGUAGE */
.lang-option {
  padding: 14px;
  border-radius: 14px;
  background: #f4f6f8;
  margin-bottom: 10px;
  cursor: pointer;
  font-weight: 500;
}

.lang-option:hover {
  background: #e3f2fd;
}
</style>
