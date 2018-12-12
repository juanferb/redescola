<template>
  <v-container>
    <v-layout row map v-for="curso in cursos" :key="curso.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img :src="curso.imageUrl" height="130px"></v-img>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary>
                  <div>
                    <h2 class="white--text mb-0">{{ curso.titulo }}</h2>
                    <div>{{ curso.fecha | fecha }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/cursos/' + curso.id">Ver Curso</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    cursos () {
      return this.$store.getters.cursosCargados
    }
  }
}
</script>
