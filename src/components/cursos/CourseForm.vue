<template>
  <form @submit.prevent="agregarCurso" class="form-container">
    <h2 class="form-title">Agregar Curso</h2>

    <div class="form-group">
      <label>Nombre del curso</label>
      <input v-model="curso.nombre" type="text" placeholder="Ej. Desarrollo Web" required />
    </div>

    <div class="form-group">
      <label>Categoría</label>
      <select v-model="curso.categoria" multiple>
        <option value="programacion">Programación</option>
        <option value="diseño">Diseño</option>
        <option value="marketing">Marketing</option>
      </select>
    </div>

    <div class="form-group">
      <label>Descripción</label>
      <textarea v-model="curso.descripcion" placeholder="Breve descripción del curso" required></textarea>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label>Capacidad</label>
        <input v-model.number="curso.capacidad" type="number" placeholder="Cantidad de alumnos" required />
      </div>

      <div class="form-group">
        <label>Precio</label>
        <input v-model.number="curso.precio" type="number" placeholder="S/ 0.00" required />
      </div>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label>Fecha de Inicio</label>
        <input v-model="curso.fechaInicio" type="date" required />
      </div>

      <div class="form-group">
        <label>Fecha de Fin</label>
        <input v-model="curso.fechaFin" type="date" required />
      </div>
    </div>

    <button type="submit" class="submit-button">
      Agregar Curso
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useCourseStore } from '@/stores/courseStore';

const store = useCourseStore();
const curso = ref({
  nombre: '',
  categoria: [],
  descripcion: '',
  capacidad: 0,
  fechaInicio: '',
  fechaFin: '',
  precio: 0
});

const agregarCurso = () => {
  store.addCurso(curso.value);
  curso.value = { nombre: '', categoria: [], descripcion: '', capacidad: 0, fechaInicio: '', fechaFin: '', precio: 0 };
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
