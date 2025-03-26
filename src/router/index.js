import { createRouter, createWebHistory } from 'vue-router'
import CourseManagement from '@/views/cursos/CourseManagement.vue'
import StudentManagement from '@/views/estudiantes/StudentManagement.vue'

const routes = [
  { path: '/', component: CourseManagement },
  { path: '/cursos/:id/alumnos', component: StudentManagement },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
