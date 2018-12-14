<template>
  <v-dialog persistent v-model="inscripcionDialog">
    <v-btn class="info" accent slot="activator">
      {{ estaUsuarioInscrito ? 'Desinscribirse' : 'Inscribirse' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="estaUsuarioInscrito">Desexa anular a inscripción a este curso?</v-card-title>
            <v-card-title v-else>Desexa inscribirse neste curso?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>Sempre pode cambiar de opinión.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                class="red--text darken-1"
                flat
                @click="inscripcionDialog = false">Cancelar</v-btn>
              <v-btn
                class="green--text darken-1"
                flat
                @click="onConfirmar">Confirmar</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['cursoId'],
  data () {
    return {
      inscripcionDialog: false
    }
  },
  computed: {
    estaUsuarioInscrito () {
      return this.$store.getters.usuario.cursosInscritos.findIndex(cursoId => {
        return cursoId === this.cursoId
      }) >= 0  // -1 si no encuentra el id en el array
    }
  },
  methods: {
    onConfirmar () {
      if (this.estaUsuarioInscrito) {
        this.$store.dispatch('desinscribirUsuarioDeCurso', this.cursoId)
      } else {
        this.$store.dispatch('inscribirUsuarioEnCurso', this.cursoId)
      }
    }
  }
}
</script>
