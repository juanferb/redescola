<template>
  <v-app>
    <!-- Componente drawer de Vuetify: Contenido fijo, menú lateral -->
    <v-navigation-drawer
      fixed 
      v-model="sideNav">
      <v-list>
        <v-list-tile  v-for="item in menuItems" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Componente toolbar de Vuetify: Contenido fijo -->
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon 
        @click="sideNav = !sideNav"
        class="hidden-sm-and-up">
      </v-toolbar-side-icon>
      <v-toolbar-title>Redescola</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- Contenido dinámico -->
    <main> 

    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      menuItems: [
        { icon: 'view_list', title: 'Ver Cursos'},
        { icon: 'room', title: 'Crear Curso'},
        { icon: 'person', title: 'Perfil'},
        { icon: 'face', title: 'Sign up'},
        { icon: 'lock_open', title: 'Sign in'},
      ]
    }
  },
  name: 'App'
}
</script>
