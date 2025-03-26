<template>
  <div class="container">
    <h2 class="title">Cursos</h2>

    <div class="filters">
      <input v-model="search" placeholder="Buscar curso..." class="search-input" />
      <select v-model="selectedCategory" class="category-select">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <ul class="course-list">
      <li v-for="curso in filteredCursos" :key="curso.id" class="course-item">
        <span class="course-name">{{ curso.nombre }} ({{ curso.categoria }})</span>
        <div class="buttons">
          <button class="btn view-btn" @click="verAlumnos(curso.id)">Ver Alumnos</button>
          <button class="btn edit-btn" @click="editarCurso(curso)">Editar</button>
        </div>
      </li>
    </ul>

    <CourseForm v-if="cursoEditando" :curso="cursoEditando" @cancelar="cursoEditando = null" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCourseStore } from '@/stores/courseStore';
import { useRouter } from 'vue-router';
import CourseForm from './CourseForm.vue';

const store = useCourseStore();
const router = useRouter();

const search = ref('');
const selectedCategory = ref('');
const cursoEditando = ref(null);

onMounted(store.fetchCursos);

const categorias = computed(() => {
  const todasCategorias = store.cursos.map(c => c.categoria).flat();
  return [...new Set(todasCategorias)];
});

const filteredCursos = computed(() => {
  return store.cursos.filter(curso =>
    curso.nombre.toLowerCase().includes(search.value.toLowerCase()) &&
    (selectedCategory.value === '' || curso.categoria.includes(selectedCategory.value))
  );
});

const verAlumnos = (id) => router.push(`/cursos/${id}/alumnos`);
const editarCurso = (curso) => cursoEditando.value = { ...curso };
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-input,
.category-select {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus,
.category-select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 4px rgba(37, 99, 235, 0.3);
}

.course-list {
  list-style: none;
  padding: 0;
}

.course-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: #f9fafb;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.course-name {
  font-weight: 500;
  color: #374151;
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
}

.view-btn {
  background: #10b981;
  color: white;
}

.view-btn:hover {
  background: #059669;
}

.edit-btn {
  background: #2563eb;
  color: white;
}

.edit-btn:hover {
  background: #1d4ed8;
}
</style>
