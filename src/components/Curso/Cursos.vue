<template>
  <v-container>
    <v-layout row map>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  src="https://static1.ideal.es/www/multimedia/201811/01/media/cortadas/movil-kFzD-U601417053636zZC-624x385@Ideal.jpg"
                  height="130px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">Curso móviles</h5>
                    <div>15 Jul 2018</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                    <v-btn flat to="/cursos/1" >
                        Ver Curso
                    </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
