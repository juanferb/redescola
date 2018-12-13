<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Crear un curso</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCrearCurso">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="titulo" label="Titulo" id="titulo" v-model="titulo" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="lugar" label="Lugar" id="lugar" v-model="lugar" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary" @click="onSeleccionarImagen">Subir imaxe</v-btn>
              <input 
                type="file" 
                style="display:none" 
                ref="fileInput" 
                accept="image/*"
                @change="onImagenSeleccionada">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" width="100%">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                name="descripcion"
                label="Descripcion"
                id="descripcion"
                v-model="descripcion"
                multi-line
                required
              ></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Escolle data e hora</h4>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="fecha" 
                first-day-of-week="1"
                locale="es"></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker 
                v-model="hora"
                format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-btn class="primary" :disabled="!formIsValid" type="submit">Crear curso</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      titulo: '',
      lugar: '',
      imageUrl: '',
      descripcion: '',
      fecha: '',
      hora: new Date(),
      image: null
    }
  },
  computed: {
    formIsValid () {
      return this.titulo !== '' &&
      this.lugar !== '' &&
      this.imageUrl !== '' &&
      this.descripcion !== ''
    },
    submittableDateTime () {
      const fecha = new Date(this.fecha)
      if (typeof this.hora === 'string') {
        const horas = this.hora.match(/^(\d+)/)[1]
        const minutos = this.hora.match(/:(\d+)/)[1]
        fecha.setHours(horas)
        fecha.setMinutes(minutos)
      } else {
        fecha.setHours(this.hora.getHours())
        fecha.setMinutes(this.hora.getMinutes())
      }
      return fecha
    }
  },
  methods: {
    onCrearCurso () {
      if (!this.formIsValid) {
        return
      }
      if (!this.image) {
        return
      }
      const cursoData = {
        titulo: this.titulo,
        lugar: this.lugar,
        image: this.image,
        descripcion: this.descripcion,
        fecha: this.submittableDateTime
      }
      this.$store.dispatch('crearCurso', cursoData)
      this.$router.push('/cursos')
    },
    onSeleccionarImagen () {
      this.$refs.fileInput.click()
    },
    onImagenSeleccionada (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Por favor seleccione unha imaxe válida')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
