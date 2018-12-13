<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card-text>
          <v-container>
            <form @submit.prevent="onSignup">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="email"
                    label="Mail"
                    id="email"
                    v-model="email"
                    type="email"
                    required>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="password"
                    label="Contrasinal"
                    id="password"
                    v-model="password"
                    type="password"
                    required>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="confirmPassword"
                    label="Confirmar contrasinal"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    type="password"
                    :rules="[compararPasswords]">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn type="submit" :loading="cargando">
                      Rexistrarse
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    compararPasswords () {
      return this.password !== this.confirmPassword ? 'As contrasinais non coinciden' : ''
    },
    usuario () {
      return this.$store.getters.usuario
    },
    error () {
      return this.$store.getters.error
    },
    cargando () {
      return this.$store.getters.cargando
    }
  },
  watch: {
    usuario (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignup () {
      this.$store.dispatch('registrarUsuario', {
        email: this.email,
        password: this.password
      })
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<!-- Estilos para que gire el spinner de cargando -->
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>