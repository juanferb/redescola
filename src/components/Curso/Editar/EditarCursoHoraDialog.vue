<template>
  <v-dialog width="350px" persistent v-model="editarDialog">
    <v-btn accent slot="activator">
      Cambiar hora
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Cambiar data do curso</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker 
              v-model="nuevaHora" 
              format="24hr"
              actions>
                <template slot-scope="{save, cancel}">
                  <v-btn
                    class="blue--text darken-1"
                    flat
                    @click.native="editarDialog = false">Pechar</v-btn>
                  <v-btn
                    class="blue--text darken-1"
                    flat
                    @click.native="onGuardarDatos">Gardar</v-btn>
                </template>
            </v-time-picker>
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
      nuevaHora: null
    }
  },
  methods: {
    onGuardarDatos () {
      const newFecha = new Date(this.curso.fecha)
      const horas = this.nuevaHora.match(/^(\d+)/)[1]
      const minutos = this.nuevaHora.match(/:(\d+)/)[1]
      newFecha.setHours(horas)
      newFecha.setMinutes(minutos)
      this.$store.dispatch('actualizarDatosCurso', {
        id: this.curso.id,
        fecha: newFecha
      })
    }
  },
  created () {
    this.nuevaHora = new Date(this.curso.fecha)
  }
}
</script>
