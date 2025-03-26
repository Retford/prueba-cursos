<template>
  <form @submit.prevent="agregarAlumno" class="form-container">
    <h2 class="form-title">Agregar Alumno</h2>

    <div class="form-group">
      <input v-model="alumno.nombres" class="input-field" placeholder="Nombres" required />
    </div>

    <div class="form-group">
      <input v-model="alumno.apellidos" class="input-field" placeholder="Apellidos" required />
    </div>

    <div class="form-group">
      <input v-model="alumno.email" class="input-field" placeholder="Correo Electrónico" required
        @blur="validarEmail" />
      <p v-if="errorEmail" class="error-message">El correo debe ser @outlook.com o @gmail.com</p>
    </div>

    <div class="form-group">
      <input v-model="alumno.codigo" class="input-field" placeholder="Código del Alumno" required />
    </div>

    <button type="submit" class="submit-btn">Agregar Alumno</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCourseStore } from '@/stores/courseStore';

const store = useCourseStore();
const route = useRoute();
const cursoId = route.params.id;

const alumno = ref({
  nombres: '',
  apellidos: '',
  email: '',
  codigo: ''
});
const errorEmail = ref(false);

const validarEmail = () => {
  const regex = /@gmail.com$|@outlook.com$/;
  errorEmail.value = !regex.test(alumno.value.email);
};

const agregarAlumno = async () => {
  if (!errorEmail.value) {
    await store.addAlumno(cursoId, alumno.value);
    alumno.value = { nombres: '', apellidos: '', email: '', codigo: '' };
  }
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.form-title {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border 0.3s ease;
}

.input-field:focus {
  border-color: #2563eb;
  outline: none;
  box-shadow: 0 0 4px rgba(37, 99, 235, 0.5);
}

.submit-btn {
  width: 100%;
  background: #2563eb;
  color: white;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #1e40af;
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
