<template>
  <section>
    <Overlay ref="overlay" />

    <section class="section login-section-top bg-primary-dark">
      <div class="container">
        <div class="level">
          <div class="level-item logo-item">
            <div class="login-logo-marketplace is-flex flex-dir-col">
              <img src="~/static/images/logo-marketplace-branco.svg" alt="Logo" width="48" height="48" />
              <h1 class="subtitle is-5 has-text-white has-text-weight-normal">NOME_DA_EMPRESA</h1>
            </div>
          </div>

          <div class="level-item title-item">
            <h1 class="title has-text-white has-text-weight-normal">Área do cliente</h1>
          </div>
        </div>
      </div>
    </section>

    <section class="section login-section-content">
      <div class="container">
        <div v-if="hasError && overlay.open" class="message is-danger">
          <div class="message-header">
            <p>Atenção</p>
            <button @click="closeOverlay" class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">{{ errorMsg }}</div>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="field">
            <label class="label has-text-weight-normal">E-mail:</label>
            <div class="control">
              <input 
              v-model="email" 
              class="input is-medium" 
              :class="{'hasError': hasEmailError}"
              type="text" 
              placeholder="Digite seu e-mail..."
              />
            </div>
            <p class="help" v-if="hasEmailError">* Campo obrigatório</p>
          </div>

          <div class="field">
            <div class="is-flex justify-between">
              <label class="label has-text-weight-normal">Senha:</label>
              <a class="label-recovery" href="">Esqueci minha senha</a>
            </div>
            
            <div class="control">
              <input 
              v-model="password" 
              class="input is-medium" 
              :class="{'hasError': hasPasswordError}"
              :type="getPasswordType" 
              placeholder="Digite sua senha de acesso..."
              />
              <a @click.prevent="togglePassword" class="password-icon-eye">
                <font-awesome-icon :icon="['far', 'eye']" />
              </a>
            </div>
            
            <p class="help" v-if="hasPasswordError">* Campo obrigatório</p>
          </div>

          <div class="field field-buttons">
            <button class="button is-danger is-fullwidth">ENTRAR</button>
          </div>

          <div class="field field-buttons has-text-centered">
            <p>Não tem uma conta? <nuxt-link to="/cadastro">Cadastre-se aqui</nuxt-link></p>
          </div>

        </form>
      </div>
    </section>

  </section>
</template>

<script>

import Overlay from '@/components/Overlay'

import { mapActions, mapState } from 'vuex'
import _ from 'lodash'

export default {
  layout: 'login-layout',

  components: {
    Overlay,
  },

  data() {
    return {
      showPassword: false,
      email: '',
      password: '',
      hasEmailError: false,
      hasPasswordError: false,
    }
  },
  
  created() {
    setTimeout(() => {
      this.setOverlay({ open: false })
    }, 100)
  },

  computed: {
    ...mapState({
      overlay: 'overlay',
      hasError: 'hasError',
      errorMsg: 'errorMsg',
    }),

    getPasswordType() {
      return !this.showPassword ? 'password' : 'text'
    },
  },

  methods: {
    ...mapActions([
      'login',
      'setUserData',
      'setError',
      'setOverlay'
    ]),

    validateForm() {
      if (!this.email && !this.password) {
        this.hasEmailError = true
        this.hasPasswordError = true
        return false
      }

      if (!this.email && this.password) {
        this.hasEmailError = true
        this.hasPasswordError = false
        return false
      }
      
      if (this.email && !this.password) {
        this.hasEmailError = false
        this.hasPasswordError = true
        return false
      }
      
      if (this.email && this.password) {
        this.hasEmailError = false
        this.hasPasswordError = false
        return true
      }
    },

    handleLogin() {
      if (!this.validateForm()) return

      this.setOverlay({ open: true, loading: true })

      this.login({ email: this.email, password: this.password })
      .then(({ data }) => {
        const userData = _.omit(data, 'password')
        
        this.setOverlay({ open: false, loading: false })
        this.setUserData(userData)

        const { customers } = userData

        if (customers && customers.length > 0) {
          this.$router.push({ name: 'index' })
        } else {
          this.$router.push({ name: 'cadastro-primeiro-restaurante' })
        }

      })
      .catch(({ response }) => {
        this.setError({ hasError: true, errorMsg: response.data })
        this.setOverlay({ open: true, loading: false })
      })
    },

    closeOverlay() {
      this.setOverlay({ open: false })
    },

    togglePassword() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>

<style scoped>

.input::placeholder {
  color: #999;
}

.input {
  font-size: 1rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-color: #999;
}

.login-section-top {
  padding: 1rem 0.50rem 0.50rem 0.50rem;
}

.login-section-content {
  padding: 1.5rem 1.5rem 3rem 1.5rem;
}

.login-section-content > .container {
  max-width: 360px;
  margin: 1rem auto 0;
}

.login-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-item {
  justify-content: flex-start;
}

.title-item {
  justify-content: flex-start;
  padding-right: 4rem;
}

.login-logo-marketplace > h1 {
  margin-top: 5px;
}

.message {
  position: relative;
  z-index: 9999;
}

.field {
  margin-bottom: 1.5rem;
}

.field.field-buttons {
  /* margin-top: 2.5rem; */
  margin-top: 2rem;
}

.label-recovery {
  font-size: 14px;
}

.password-icon-eye {
  font-size: 1.5rem !important;
  position: absolute;
  right: 0;
  left: 89%;
  top: 8px;
}

.hasError {
  border-color: red !important;
}

/* .hasError::placeholder {
  color: red !important;
} */

.help {
  margin: .40rem 0 1.5rem .40rem;
  color: red;
}

.button {
  height: 50px;
}

@media screen and (max-width: 768px) {
  .logo-item {
    justify-content: center;
  }
  .title-item {
    justify-content: center;
    padding-right: 0;
  }
}

</style>
