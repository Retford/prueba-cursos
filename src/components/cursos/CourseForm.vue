<template>
  <form @submit.prevent="manejarEnvio" class="form-container">
    <h2 class="form-title">{{ esEdicion ? 'Editar Curso' : 'Agregar Curso' }}</h2>

    <div class="form-group">
      <label>Nombre del curso</label>
      <input v-model="cursoLocal.nombre" type="text" placeholder="Ej. Desarrollo Web" required />
    </div>

    <div class="form-group">
      <label>Categoría</label>
      <select v-model="cursoLocal.categoria" multiple>
        <option value="programacion">Programación</option>
        <option value="diseño">Diseño</option>
        <option value="marketing">Marketing</option>
      </select>
    </div>

    <div class="form-group">
      <label>Descripción</label>
      <textarea v-model="cursoLocal.descripcion" placeholder="Breve descripción del curso" required></textarea>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label>Capacidad</label>
        <input v-model.number="cursoLocal.capacidad" type="number" placeholder="Cantidad de alumnos" required />
      </div>

      <div class="form-group">
        <label>Precio</label>
        <input v-model.number="cursoLocal.precio" type="number" placeholder="S/ 0.00" required />
      </div>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label>Fecha de Inicio</label>
        <input v-model="cursoLocal.fechaInicio" type="date" required />
      </div>

      <div class="form-group">
        <label>Fecha de Fin</label>
        <input v-model="cursoLocal.fechaFin" type="date" required />
      </div>
    </div>

    <button type="submit" class="submit-button">
      {{ esEdicion ? 'Actualizar Curso' : 'Agregar Curso' }}
    </button>

    <button v-if="esEdicion" type="button" @click="cancelarEdicion" class="cancel-button">
      Cancelar
    </button>
  </form>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useCourseStore } from '@/stores/courseStore';

const props = defineProps({
  curso: Object,
});

const emit = defineEmits(['cancelar', 'curso-actualizado', 'curso-agregado']);
const store = useCourseStore();

const cursoLocal = ref({
  nombre: '',
  categoria: [],
  descripcion: '',
  capacidad: 0,
  fechaInicio: '',
  fechaFin: '',
  precio: 0
});

const esEdicion = computed(() => !!props.curso);

watch(() => props.curso, (nuevoCurso) => {
  if (nuevoCurso) {
    cursoLocal.value = { ...nuevoCurso };

    if (!Array.isArray(cursoLocal.value.categoria)) {
      cursoLocal.value.categoria = [cursoLocal.value.categoria];
    }
  }
}, { immediate: true });

const manejarEnvio = () => {
  if (esEdicion.value) {
    store.updateCurso(cursoLocal.value);
    emit('curso-actualizado');
  } else {
    store.addCurso(cursoLocal.value);
    emit('curso-agregado');
  }
};

const cancelarEdicion = () => {
  emit('cancelar');
};
</script>


<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.form-title {
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 4px rgba(37, 99, 235, 0.3);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.submit-button {
  width: 100%;
  background: #2563eb;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-button:hover {
  background: #1d4ed8;
}
</style>
