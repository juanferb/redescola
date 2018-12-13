import { store } from '../store'

export default (to, from, next) => {
  if (store.getters.usuario) {
    next()
  } else {
    next('/login')
  }
}
