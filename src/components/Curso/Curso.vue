<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h2 class="primary--text">{{ curso.titulo }}</h2>
            </div>
          </v-card-title>
          <v-card-media
            :src="curso.imageUrl"
            height="400px"
          ></v-card-media>
          <v-card-text>
            <div>{{ curso.fecha }}</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt eligendi nisi
              obcaecati rerum mollitia esse sapiente, autem quia doloribus, fugit quam nobis
              doloremque sed voluptatibus id quas vel fugiat exercitationem?
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Inscribirse</v-btn>
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
    }
  }
}
</script>

