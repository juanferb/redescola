import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
