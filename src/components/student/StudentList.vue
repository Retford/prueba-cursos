<template>
  <div class="container">
    <h2 class="title">Alumnos del Curso</h2>

    <ul v-if="store.alumnos.length" class="student-list">
      <li v-for="alumno in store.alumnos" :key="alumno.id" class="student-item">
        <span class="student-name">{{ alumno.nombres }}</span>
        <span class="student-email">{{ alumno.correo }}</span>
      </li>
    </ul>

    <p v-else class="empty-message">Cargando alumnos o no hay alumnos inscritos en este curso.</p>

    <button @click="goBack" class="back-button">Volver</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCourseStore } from "@/stores/courseStore";

const route = useRoute();
const router = useRouter();
const store = useCourseStore();

onMounted(async () => {
  await store.fetchAlumnos(route.params.id);
});

const goBack = () => {
  router.push("/");
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  font-size: 1.6rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
}

.student-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.student-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #e5e7eb;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.student-item:hover {
  background: #d1d5db;
}

.student-name {
  font-weight: bold;
  color: #374151;
}

.student-email {
  font-size: 0.9rem;
  color: #6b7280;
}

.empty-message {
  font-size: 1rem;
  color: #6b7280;
  margin-top: 1rem;
}

.back-button {
  margin-top: 1.5rem;
  background: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.back-button:hover {
  background: #1e40af;
}
</style>
