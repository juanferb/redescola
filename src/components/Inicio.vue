<template>
  <v-container>
    <!-- Botones superiores -->
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/cursos" class="info">Ver Cursos</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/curso/crear" class="info">Crear Curso</v-btn>
      </v-flex>
    </v-layout>

    <!-- Carousel -->
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item 
            v-for="curso in cursos" 
            :src="curso.imageUrl" 
            :key="curso.id"
            @click="onLoadCurso(curso.id)">
            <div class="title">{{ curso.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <!-- Párrafo inferior -->
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center text-sm-right">
        <p style="text-align:center">Disfruta dos nosos cursos!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    cursos () {
      return this.$store.getters.cursosDestacados
    }
  },
  methods: {
    onLoadCurso (id) {
      this.$router.push('/cursos/' + id)
    }
  }
}
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 15px;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
}
</style>

