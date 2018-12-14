import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import EditarCursoDetallesDialog from './components/Curso/Editar/EditarCursoDetallesDialog.vue'
import EditarCursoFechaDialog from './components/Curso/Editar/EditarCursoFechaDialog.vue'
import EditarCursoHoraDialog from './components/Curso/Editar/EditarCursoHoraDialog.vue'
import InscripcionDialog from './components/Curso/Inscripcion/InscripcionDialog.vue'

Vue.use(Vuetify,
  {
    theme: {
      primary: colors.purple.darken2,
      accent: colors.red.accent2,
      secondary: colors.grey.lighten2,
      info: colors.purple.lighten1,
      warning: colors.amber.darken2,
      error: colors.red.accent4,
      success: colors.green.lighten2
    }
  }
)

Vue.config.productionTip = false

Vue.filter('fecha', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-editar-curso-detalles-dialog', EditarCursoDetallesDialog)
Vue.component('app-editar-curso-fecha-dialog', EditarCursoFechaDialog)
Vue.component('app-editar-curso-hora-dialog', EditarCursoHoraDialog)
Vue.component('app-inscripcion-dialog', InscripcionDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDyJMV3g5dwUCW2GnWu5CpDFXxn92k0EFk',
      authDomain: 'redescola-c35ad.firebaseapp.com',
      databaseURL: 'https://redescola-c35ad.firebaseio.com',
      projectId: 'redescola-c35ad',
      storageBucket: 'redescola-c35ad.appspot.com'
    })
    firebase.auth().onAuthStateChanged((usuario) => {
      if (usuario) {
        this.$store.dispatch('autoLogin', usuario)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('cargarCursos')
  }
})
