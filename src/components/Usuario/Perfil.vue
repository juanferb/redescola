<template>
  <v-container>
    <v-layout row wrap class="white light-5 pa-1 primary--text">
        <h3 class="headline ml-5 pl-3 mb-3">Cursos nos que estás inscrito</h3>
      <v-flex xs12 md9>
        <v-layout wrap row v-for="curso in cursosInscritos" :key="curso.id" class="mb-3">
          <v-flex offset-md1 xs12>
            <v-card>
              <v-container fluid>
                <v-layout>
                  <v-flex xs5 sm4 md3>
                    <v-card-media :src="curso.imageUrl" height="150px"></v-card-media>
                  </v-flex>
                  <v-flex xs7 sm8 md9>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline font-weight-light font-italic mb0">{{curso.titulo}}</div>
                        <div>{{curso.fecha | fecha}}</div>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn large flat :to="'/cursos/' + curso.id">
                        Ver curso
                      </v-btn>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      cursosInscritos: []
    }
  },
  computed: {
    user () {
      return this.$store.getters.usuario
    }
  },
  created () {
    const cursosId = this.$store.getters.usuario.cursosInscritos
    for (var i = 0; i < cursosId.length; i++) {
      this.cursosInscritos.push(
        this.$store.getters.cursoCargado(cursosId[i])
      )
    }
  }
}
</script>