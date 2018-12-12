import Vue from 'vue'
import Router from 'vue-router'
 /* @ se refiere a src */
import Inicio from '@/components/Inicio'
import Cursos from '@/components/Curso/Cursos'
import Curso from '@/components/Curso/Curso'
import CrearCurso from '@/components/Curso/CrearCurso'
import Perfil from '@/components/Usuario/Perfil'
import Login from '@/components/Usuario/Login'
import Rexistro from '@/components/Usuario/Rexistro'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio
    },
    {
      path: '/cursos',
      name: 'Cursos',
      component: Cursos
    },
    {
      path: '/curso/crear',
      name: 'CrearCurso',
      component: CrearCurso
    },
    {
      path: '/cursos/:id',
      name: 'Curso',
      props: true,
      component: Curso
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/rexistro',
      name: 'Rexistro',
      component: Rexistro
    }
  ],
  mode: 'history' /* Evitar hashtag en la URL */
})
