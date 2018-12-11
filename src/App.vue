<template>
  <v-app>
    <!-- Componente drawer de Vuetify: Contenido fijo, menú lateral -->
    <v-navigation-drawer
      fixed 
      v-model="sideNav">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>view_list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>VER CURSOS</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Componente toolbar de Vuetify: Contenido fijo -->
    <v-toolbar>
      <v-toolbar-side-icon 
        @click="sideNav = !sideNav"
        class="hidden-sm-and-up">
      </v-toolbar-side-icon>
      <v-toolbar-title>Redescola</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items
        class="hidden-xs-only">
        <v-btn flat>
          <v-icon left>view_list</v-icon>
          VER CURSOS
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
      sideNav: false
    }
  },
  name: 'App'
}
</script>
