<template>
  <v-app>
    <!-- Componente drawer de Vuetify: Contenido fijo, menú lateral -->
    <v-navigation-drawer fixed v-model="sideNav" temporary>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Componente toolbar de Vuetify: Contenido fijo -->
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Redescola</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- Contenido dinámico -->
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'face', title: 'Rexistro', link: '/rexistro' },
        { icon: 'lock_open', title: 'Login', link: '/login' }
      ]
      if (this.usuarioEstaAutenticado) {
        menuItems = [
          { icon: 'view_list', title: 'Ver Cursos', link: '/cursos' },
          { icon: 'room', title: 'Crear Curso', link: '/curso/crear' },
          { icon: 'person', title: 'Perfil', link: '/perfil' }
        ]
      }
      return menuItems
    },
    usuarioEstaAutenticado () {
      return this.$store.getters.usuario !== null &&
        this.$store.getters.usuario !== undefined
    }
  },
  name: 'App'
}
</script>
