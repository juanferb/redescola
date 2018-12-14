<template>
  <v-dialog width="350px" persistent v-model="editarDialog">
    <v-btn accent slot="activator">
      Cambiar data
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
            <v-date-picker 
              v-model="nuevaFecha" 
              style="width: 100%"
              first-day-of-week="1"
              locale="es"
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
            </v-date-picker>
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
      nuevaFecha: null
    }
  },
  methods: {
    onGuardarDatos () {
      const nuevaFecha = new Date(this.curso.fecha)
      const nuevoDia = new Date(this.nuevaFecha).getUTCDate()
      const nuevoMes = new Date(this.nuevaFecha).getUTCMonth()
      const nuevoAno = new Date(this.nuevaFecha).getUTCFullYear()
      nuevaFecha.setUTCDate(nuevoDia)
      nuevaFecha.setUTCMonth(nuevoMes)
      nuevaFecha.setUTCFullYear(nuevoAno)
      this.$store.dispatch('actualizarDatosCurso', {
        id: this.curso.id,
        fecha: nuevaFecha
      })
    }
  },
  created () {
    this.nuevaFecha = new Date(this.curso.fecha).toISOString().substr(0, 10)
  }
}
</script>
