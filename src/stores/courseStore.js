import { api } from '@/config/api'
import { defineStore } from 'pinia'

export const useCourseStore = defineStore('course', {
  state: () => ({
    cursos: [],
    alumnos: [],
  }),

  actions: {
    async fetchCursos() {
      const response = await api.get('/cursos')
      this.cursos = response.data
    },

    async addCurso(curso) {
      await api.post('/cursos', curso)
      this.fetchCursos()
    },

    async updateCurso(curso) {
      await api.put(`/cursos/${curso.id}`, curso)
      this.fetchCursos()
    },

    async fetchAlumnos(cursoId) {
      try {
        const response = await api.get(`/cursos/${cursoId}`)
        this.alumnos = response.data.alumnos
      } catch (error) {
        console.error('Error obteniendo los alumnos:', error)
      }
    },

    async addAlumno(cursoId, alumno) {
      try {
        const nuevoAlumno = { ...alumno, cursoId }
        await api.post(`/alumnos`, nuevoAlumno)
        this.fetchAlumnos(cursoId)
      } catch (error) {
        console.error('Error agregando el alumno:', error)
      }
    },
  },
})
