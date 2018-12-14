<template>
  <v-container>
    <v-layout row wrap v-if="cargando">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="cargando">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
              <h2 class="primary--text" xs6>{{ curso.titulo }}</h2>
              <template v-if="usuarioEsCreador">
                <v-spacer></v-spacer>
                <app-editar-curso-detalles-dialog :curso="curso"></app-editar-curso-detalles-dialog>
              </template>
          </v-card-title>
          <v-img
            :src="curso.imageUrl"
            height="400px"
          ></v-img>
          <v-card-text>
            <div class="info--text">{{ curso.fecha | fecha }} - {{ curso.lugar }}</div>
            <div>
              <app-editar-curso-fecha-dialog
                :curso="curso"
                v-if="usuarioEsCreador">
              </app-editar-curso-fecha-dialog>
              <app-editar-curso-hora-dialog
                v-if="usuarioEsCreador" 
                :curso="curso">
              </app-editar-curso-hora-dialog>
            </div>
            <div>{{ curso.descripcion }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-inscripcion-dialog :cursoId="curso.id"></app-inscripcion-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: [ 'id' ],
  computed: {
    curso () {
      return this.$store.getters.cursoCargado(this.id)
    },
    usuarioEstaAutenticado () {
      return this.$store.getters.usuario !== null &&
        this.$store.getters.usuario !== undefined
    },
    usuarioEsCreador () {
      if (!this.usuarioEstaAutenticado) {
        return false
      }
      return this.$store.getters.usuario.id === this.curso.idUsuarioCreador
    },
    cargando () {
      return this.$store.getters.cargando
    }
  }
}
</script>

