<template>
  <section>
    <section class="section signup-section-top bg-primary-dark">
      <div class="container">
        <div class="level">
          <div class="level-item logo-item">
            <div class="signup-logo-marketplace is-flex flex-dir-col">
              <img src="~/static/images/logo-marketplace-branco.svg" alt="Logo" width="48" height="48" />
              <h1 class="subtitle is-5 has-text-white has-text-weight-normal">NOME_DA_EMPRESA</h1>
            </div>
          </div>

          <div class="level-item title-item" :class="{'step-3': (step == 3)}">
            <div class="is-flex flex-dir-col">

              <!-- STEP 1 -->

              <h1 class="title pb-3" v-if="step == 1">
                Bem-vindo ao NOME_DA_EMPRESA!
              </h1>

              <h2 class="subtitle" v-if="step == 1">
                A plataforma que conecta seu<br/> restaurante aos melhores<br/> fornecedores!
              </h2>

              <!-- STEP 2 -->

              <h1 class="title pb-3" v-if="step == 2">
                Oi {{ form.name }}!
              </h1>

              <h2 class="subtitle" v-if="step == 2">
                Precisamos saber só algumas<br/> coisas sobre você!
              </h2>

              <!-- STEP 3: FINISH -->

              <h1 class="title pb-3" v-if="step == 3">
                Bem-vindo, {{ form.name }}!
              </h1>

              <h2 class="subtitle" v-if="step == 3">
                Acesse seu e-mail para validar o<br/>
                seu cadastro e em breve<br/>
                liberaremos o acesso ao aplicativo!
              </h2>

            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="section signup-section-content">
      <div class="container">
        <article v-if="hasError && overlay.open" class="message is-danger">
          <div class="message-header">
            <p>Atenção</p>
            <button @click="closeOverlay" class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">{{ errorMsg }}</div>
        </article>

        <form @submit.prevent="handleNext">
          <!-- <p class="title">Bem-vindo ao NOME_DA_EMPRESA!</p> -->
          <!-- <p class="subtitle">A plataforma que conecta seu restaurante aos melhores fornecedores!</p> -->

          <div class="field" v-show="step == 1">
            <label class="label is-size-5 has-text-weight-bold">Qual o seu nome?</label>
            <div class="control">
              <input 
              v-model="form.name" 
              class="input is-medium" 
              type="text" 
              placeholder="Insira seu nome completo"
              />
            </div>
            <p class="help" v-if="errors.includes('name')">* Campo obrigatório</p>
          </div>

          <section v-show="step == 2">
            <div class="field">
              <label class="label has-text-weight-normal">Qual seu CPF?</label>
              <div class="control">
                <input 
                v-model="form.cpf" 
                class="input is-medium" 
                type="text" 
                placeholder="CPF"
                />
              </div>
              <p class="help" v-if="errors.includes('cpf')">* Campo obrigatório</p>
            </div>

            <div class="field">
              <label class="label has-text-weight-normal">Qual seu telefone?</label>
              <div class="control">
                <input 
                v-model="form.phone" 
                class="input is-medium" 
                type="text" 
                placeholder="Telefone"
                />
              </div>
              <p class="help" v-if="errors.includes('phone')">* Campo obrigatório</p>
            </div>

            <div class="field">
              <label class="label has-text-weight-normal">Em que e-mail podemos te contatar?</label>
              <div class="control">
                <input 
                v-model="form.email" 
                class="input is-medium" 
                type="text" 
                placeholder="E-mail"
                />
              </div>
              <p class="help" v-if="errors.includes('email')">* Campo obrigatório</p>
            </div>

            <div class="field">
              <label class="label has-text-weight-normal">Crie uma senha</label>
              <div class="control">
                <input 
                v-model="form.password" 
                class="input is-medium" 
                type="password"
                placeholder="Senha"
                />
              </div>
              <p class="help" v-if="errors.includes('password')">* Campo obrigatório</p>
            </div>

            <div class="field">
              <label class="label has-text-weight-normal">Confirme sua senha</label>
              <div class="control">
                <input 
                v-model="form.passwordConfirm" 
                class="input is-medium" 
                type="password"
                placeholder="Senha"
                />
              </div>
              <p class="help" v-if="errors.includes('passwordConfirm')">* Campo obrigatório</p>
            </div>
          </section>

          <div class="field field-buttons" v-if="step < 3">
            <button class="button is-danger is-fullwidth" v-if="step == 1">Próximo</button>
            <button class="button is-danger is-fullwidth" v-if="step == 2">Criar usuário</button>
            <a class="is-flex align-center justify-center pt-3" @click.prevent="handlePrevious" v-if="step == 2">Voltar</a>
          </div>

          <template v-if="step >= 3">
            <div class="field field-buttons">
              <button class="button is-danger is-fullwidth">REENVIAR E-MAIL</button>
            </div>

            <div class="field field-buttons">
              <nuxt-link class="is-flex align-center justify-center" to="/login">
                Ir para o login
                <span
                class="iconify"
                data-icon="ion:ios-arrow-round-forward" 
                width="28" height="28"
                />
              </nuxt-link>
            </div>

            <!-- <div class="field field-buttons">
              <a class="is-flex align-center justify-center" @click.prevent>
                Preciso de ajuda
                <span
                class="iconify"
                data-icon="ion:ios-arrow-round-forward" 
                width="28" height="28"
                />
              </a>
            </div> -->
          </template>

        </form>

      </div>
    </section>

  </section>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import _ from 'lodash'

export default {
  layout: 'login-layout',
  
  components: {},

  data() {
    return {
      step: 1,
      
      form: {
        name: '',
        cpf: '',
        phone: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },

      errors: []
    }
  },
  
  created() {},

  computed: {
    ...mapState({
      overlay: 'overlay',
      hasError: 'hasError',
      errorMsg: 'errorMsg',
    }),
  },
  
  methods: {
    ...mapActions([
      'register',
      'setUserData',
      'setError',
      'setOverlay'
    ]),

    isFormValid() {

      if (this.step == 1) {
        
        if (!this.form['name']) {
          this.errors.push('name')
          return false
        } else {
          this.errors = this.errors.filter(item => item != 'name')
          return true
        }

      } else if (this.step == 2) {
        const formAux = _.omit(this.form, 'name')

        for (let prop in formAux) {
          if (!formAux[prop]) this.errors.push(prop)
          else {
            this.errors = this.errors.filter(item => item != prop)
          }
        }
      }

      return this.errors.length > 0 ? false : true
    },

    handleNext() {
      if (this.step == 3) this.$router.push({ name: 'login' })
      if (this.isFormValid()) {
        this.step++
        if (this.step == 3) this.handleSignUp()
      }
    },

    handlePrevious() {
      if (this.step == 1) return
      this.step--
    },

    handleSignUp() {
      if (this.isFormValid()) {
        const values = _.omit(this.form, 'passwordConfirm')

        this.register(values).then(response => {
          console.log(response.data)
        })
        .catch(({ response }) => {
          console.log(response)
          this.setError({ hasError: true, errorMsg: response.data })
        })
      }
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

.signup-section-top {
  /* padding: 1rem 0.50rem 0.50rem 0.50rem; */
  padding: 3rem;
}

.signup-section-content {
  padding: 1.5rem 1.5rem 3rem 1.5rem;
}

.signup-section-content > .container {
  max-width: 360px;
  margin: 1rem auto 0;
}

.signup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-item {
  justify-content: flex-start;
}

.title-item {
  justify-content: flex-start;
  padding-right: 7.5rem;
}

.title-item.step-3 {
  padding-right: 5rem;
}

.title-item > div > h1,
.title-item > div > h2 {
  color: #fff;
}

/* .title-item > div > h2 { */
  /* text-align: center; */
/* } */

.signup-logo-marketplace > h1 {
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
