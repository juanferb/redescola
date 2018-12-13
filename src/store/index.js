import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    cursosCargados: [
      {
        imageUrl:
         'https://static1.ideal.es/www/multimedia/201811/01/media/cortadas/movil-kFzD-U601417053636zZC-624x385@Ideal.jpg',
        id: '1',
        titulo: 'Curso móviles',
        fecha: new Date(),
        lugar: 'Ateneo',
        descripcion: 'Todo sobre Android'
      },
      {
        imageUrl:
         'https://cdn.pixabay.com/photo/2017/04/26/16/06/mobile-2262928_960_720.jpg',
        id: '2',
        titulo: 'Curso móviles 2',
        fecha: new Date(),
        lugar: 'AAVV Ferrol Vello',
        descripcion: 'Todo sobre Iphone'
      }
    ],
    usuario: null
  },
  mutations: {
    crearCurso (state, payload) {
      state.cursosCargados.push(payload)
    },
    setUsuario (state, payload) {
      state.usuario = payload
    }
  },
  actions: {
    crearCurso ({commit}, payload) {
      const curso = {
        titulo: payload.titulo,
        lugar: payload.lugar,
        imageUrl: payload.imageUrl,
        descripcion: payload.descripcion,
        fecha: payload.fecha,
        id: '3'
      }
      // Guardarlo en Firebase
      commit('crearCurso', curso)
    },
    registrarUsuario ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(
        payload.email,
        payload.password)
        .then(
          usuario => {
            const nuevoUsuario = {
              id: usuario.uid,
              cursosInscritos: []
            }
            commit('setUsuario', nuevoUsuario)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    loginUsuario ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          usuario => {
            const nuevoUsuario = {
              id: usuario.uid,
              cursosInscritos: []
            }
            commit('setUsuario', nuevoUsuario)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    }
  },
  getters: {
    cursosCargados (state) {
      return state.cursosCargados.sort((cursoA, cursoB) => {
        return cursoA.fecha > cursoB.fecha
      })
    },
    cursosDestacados (state, getters) {
      return getters.cursosCargados.slice(0, 5)
    },
    cursoCargado (state) {
      return (cursoId) => {
        return state.cursosCargados.find((curso) => {
          return curso.id === cursoId
        })
      }
    },
    usuario (state) {
      return state.usuario
    }
  }
})
