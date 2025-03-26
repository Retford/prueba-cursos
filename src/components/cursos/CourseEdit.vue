<script setup>
import { api } from '@/config/api'
import { ref, onMounted } from 'vue'

const props = defineProps(['cursoId'])
const curso = ref(null)

const obtenerCurso = async () => {
  try {
    const respuesta = await api.get(`/cursos/${props.cursoId}`)
    curso.value = respuesta.data
  } catch (error) {
    console.error('Error al obtener curso:', error)
  }
}

onMounted(obtenerCurso)

const actualizarCurso = async () => {
  try {
    await api.put(`/cursos/${props.cursoId}`, curso.value)
    alert('Curso actualizado con éxito')
  } catch (error) {
    console.error('Error al actualizar curso:', error)
  }
}
</script>

<template>
  <div v-if="curso">
    <h2>Editar Curso</h2>
    <input v-model="curso.nombre" placeholder="Nombre del curso" required />
    <input v-model="curso.categoria" placeholder="Categoría" required />
    <textarea v-model="curso.descripcion" placeholder="Descripción"></textarea>
    <button @click="actualizarCurso">Actualizar</button>
  </div>
</template>
