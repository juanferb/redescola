<template>
  <v-dialog width="350px" persistent v-model="editarDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Editar curso</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field 
                name="titulo" 
                label="Titulo" 
                id="titulo" 
                v-model="nuevoTitulo" 
                required></v-text-field>
              <v-textarea
                name="descripcion"
                label="Descripcion"
                id="descripcion"
                v-model="nuevaDescripcion"
                multi-line
                required></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn 
                flat 
                class="blue--text darken-1" 
                @click="editarDialog = false">
                Pechar</v-btn>
              <v-btn 
                flat 
                class="blue--text darken-1" 
                @click="onGuardarDatos">
                Gardar</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['curso'],
  data () {
    return {
      editarDialog: false,
      nuevoTitulo: this.curso.titulo,
      nuevaDescripcion: this.curso.descripcion
    }
  },
  methods: {
    onGuardarDatos () {
      if (this.nuevoTitulo.trim() === '' || this.nuevaDescripcion.trim() === '') {
        return
      }
      this.editarDialog = false // Cerrar dialogo
      this.$store.dispatch('actualizarDatosCurso', {
        id: this.curso.id,
        titulo: this.nuevoTitulo,
        descripcion: this.nuevaDescripcion
      })
    }
  }
}
</script>
