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
    usuario: null,
    cargando: false,
    error: null
  },
  mutations: {
    setCursosCargados (state, payload) {
      state.cursosCargados = payload
    },
    crearCurso (state, payload) {
      state.cursosCargados.push(payload)
    },
    actualizarCurso (state, payload) {
      const curso = state.cursosCargados.find(curso => {
        return curso.id === payload.id
      })
      if (payload.titulo) {
        curso.titulo = payload.titulo
      }
      if (payload.descripcion) {
        curso.descripcion = payload.descripcion
      }
      if (payload.fecha) {
        curso.fecha = payload.fecha
      }
    },
    setUsuario (state, payload) {
      state.usuario = payload
    },
    setCargando (state, payload) {
      state.cargando = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: { // Código asíncrono (nunca ejecutamos código asíncrono en mutations)
    cargarCursos ({commit}) {
      commit('setCargando', true)
      firebase.database().ref('cursos').once('value')
        .then((data) => {
          const cursos = []
          const obj = data.val()
          for (let key in obj) {
            cursos.push({
              id: key,
              titulo: obj[key].titulo,
              descripcion: obj[key].descripcion,
              imageUrl: obj[key].imageUrl,
              fecha: obj[key].fecha,
              lugar: obj[key].lugar,
              idUsuarioCreador: obj[key].idUsuarioCreador
            })
          }
          commit('setCursosCargados', cursos)
          commit('setCargando', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setCargando', false)
          }
        )
    },
    crearCurso ({commit, getters}, payload) {
      const curso = {
        titulo: payload.titulo,
        lugar: payload.lugar,
        descripcion: payload.descripcion,
        fecha: payload.fecha.toISOString(),
        idUsuarioCreador: getters.usuario.id
      }
      let imageUrl
      let key
      firebase.database().ref('cursos').push(curso)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('cursos/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          let imagePath = fileData.metadata.fullPath
          return firebase.storage().ref().child(imagePath).getDownloadURL()
            .then(url => {
              imageUrl = url
              return firebase.database().ref('cursos').child(key).update({imageUrl: imageUrl})
            })
        })
        .then(() => {
          commit('crearCurso', {
            ...curso,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    actualizarDatosCurso ({commit}, payload) {
      commit('setCargando', true)
      const updateObj = {}
      if (payload.titulo) {
        updateObj.titulo = payload.titulo
      }
      if (payload.descripcion) {
        updateObj.descripcion = payload.descripcion
      }
      if (payload.fecha) {
        updateObj.fecha = payload.fecha.toISOString()
      }
      firebase.database().ref('cursos').child(payload.id).update(updateObj)
        .then(() => {
          commit('setCargando', false)
          commit('actualizarCurso', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setCargando', false)
        })
    },
    registrarUsuario ({commit}, payload) {
      commit('setCargando', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(
        payload.email,
        payload.password)
        .then(
          usuario => {
            commit('setCargando', false)
            const nuevoUsuario = {
              id: usuario.uid,
              cursosInscritos: []
            }
            commit('setUsuario', nuevoUsuario)
          }
        )
        .catch(
          error => {
            commit('setCargando', false)
            commit('setError', error)
          }
        )
    },
    loginUsuario ({commit}, payload) {
      commit('setCargando', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          usuario => {
            commit('setCargando', false)
            const nuevoUsuario = {
              id: usuario.uid,
              cursosInscritos: []
            }
            commit('setUsuario', nuevoUsuario)
          }
        )
        .catch(
          error => {
            commit('setCargando', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoLogin ({commit}, payload) {
      commit('setUsuario', { id: payload.uid, cursosInscritos: [] })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUsuario', null)
    },
    clearError ({commit}) {
      commit('clearError')
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
    },
    cargando (state) {
      return state.cargando
    },
    error (state) {
      return state.error
    }
  }
})
