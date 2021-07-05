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

          <div class="level-item title-item step-3">
            <div class="is-flex flex-dir-col">
              <template v-if="step == 1">
                <h1 class="title pb-3">
                  Oi {{ user.name }}!
                </h1>

                <h2 class="subtitle">
                  Vamos registrar seu primeiro restaurante na plataforma?<br>
                  Nao se preocupe, você poderá adicionar <span class="has-text-weight-bold">mais restaurantes</span> depois!
                </h2>
              </template>

              <template v-if="step == 2">
                <h1 class="title pb-3">
                  Cadastro {{ form.name }}
                </h1>

                <h2 class="subtitle">
                  Nos conte mais sobre seu restaurante
                </h2>
              </template>

              <template v-if="step == 3">
                <h1 class="title pb-3">
                  Informações {{ form.name }}
                </h1>
              </template>

              <template v-if="step == 4">
                <h1 class="title pb-3">
                  Contato em {{ form.name }}
                </h1>
              </template>

            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="section signup-section-content">
      <div class="section">
        <article v-if="hasError && overlay.open" class="message is-danger">
          <div class="message-header">
            <p>Atenção</p>
            <button @click="closeOverlay" class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">{{ errorMsg }}</div>
        </article>

        <form @submit.prevent="handleNext">
          <div class="field" v-show="step == 1">
            <label class="label is-size-5 has-text-weight-bold">Nome do restaurante</label>
            <div class="control">
              <input 
              v-model="form.name" 
              class="input is-medium" 
              type="text" 
              placeholder="Insira o nome do restaurante"
              />
            </div>
            <p class="help" v-if="errors.includes('name')">* Campo obrigatório</p>
          </div>

          <section v-show="step == 2">
            <div class="field">
              <label class="label has-text-weight-normal">Qual o CNPJ?</label>
              <div class="control">
                <input 
                v-model="form.cnpj" 
                class="input is-medium" 
                type="text" 
                placeholder="CNPJ"
                />
              </div>
              <p class="help" v-if="errors.includes('cnpj')">* Campo obrigatório</p>
            </div>

            <div class="field">
              <label class="label has-text-weight-normal">Qual a razão social?</label>
              <div class="control">
                <input 
                v-model="form.razaoSocial" 
                class="input is-medium" 
                type="text" 
                placeholder="razão social"
                />
              </div>
              <p class="help" v-if="errors.includes('razaoSocial')">* Campo obrigatório</p>
            </div>

            <div class="field">
              <label class="label has-text-weight-normal">Qual o nome fantasia?</label>
              <div class="control">
                <input 
                v-model="form.nomeFantasia" 
                class="input is-medium" 
                type="text" 
                placeholder="nome fantasia"
                />
              </div>
              <p class="help" v-if="errors.includes('nomeFantasia')">* Campo obrigatório</p>
            </div>
          </section>

          <section v-show="step == 3">
            <div class="columns">
              <div class="column is-6">
                <div class="field">
                  <label class="label has-text-weight-normal">Qual o CEP do restaurante?</label>
                  <div class="control">
                    <input 
                    v-model="form.cep" 
                    class="input is-medium" 
                    type="text"
                    />
                  </div>
                  <p class="help" v-if="errors.includes('cep')">* Campo obrigatório</p>
                </div>

                <div class="field">
                  <label class="label has-text-weight-normal">Qual o endereço do restaurante?</label>
                  <div class="control">
                    <input 
                    v-model="form.endereco" 
                    class="input is-medium" 
                    type="text"
                    />
                  </div>
                  <p class="help" v-if="errors.includes('endereco')">* Campo obrigatório</p>
                </div>

                <div class="field">
                  <label class="label has-text-weight-normal">Qual o número do restaurante?</label>
                  <div class="control">
                    <input 
                    v-model="form.numero" 
                    class="input is-medium" 
                    type="text" 
                    />
                  </div>
                  <p class="help" v-if="errors.includes('numero')">* Campo obrigatório</p>
                </div>

                <div class="field">
                  <label class="label has-text-weight-normal">Qual o complemento do restaurante?</label>
                  <div class="control">
                    <input 
                    v-model="form.complemento" 
                    class="input is-medium" 
                    type="text" 
                    />
                  </div>
                  <p class="help" v-if="errors.includes('complemento')">* Campo obrigatório</p>
                </div>

                <div class="field mt-3">
                  <input
                    id="mesmoEndereco"
                    type="checkbox"
                    name="mesmoEndereco"
                    class="switch is-rounded is-danger"
                    checked="checked"
                    v-model="form.mesmoEndereco"
                  />
                  <label for="mesmoEndereco">Endereço de entrega é o mesmo</label>
                </div>
              </div>

              <div class="column is-6">
                <div class="field">
                  <label class="label has-text-weight-normal">Qual o CEP do endereço de entrega?</label>
                  <div class="control">
                    <input 
                    :disabled="form.mesmoEndereco == true"
                    :readonly="form.mesmoEndereco == true"
                    v-model="form.cepEntrega" 
                    class="input is-medium" 
                    type="text"
                    />
                  </div>
                  <p class="help" v-if="errors.includes('cepEntrega')">* Campo obrigatório</p>
                </div>

                <div class="field">
                  <label class="label has-text-weight-normal">Qual o endereço de entrega?</label>
                  <div class="control">
                    <input 
                    :disabled="form.mesmoEndereco == true"
                    :readonly="form.mesmoEndereco == true"
                    v-model="form.enderecoEntrega" 
                    class="input is-medium" 
                    type="text" 
                    />
                  </div>
                  <p class="help" v-if="errors.includes('enderecoEntrega')">* Campo obrigatório</p>
                </div>

                <div class="field">
                  <label class="label has-text-weight-normal">Qual o número de entrega?</label>
                  <div class="control">
                    <input 
                    :disabled="form.mesmoEndereco == true"
                    :readonly="form.mesmoEndereco == true"
                    v-model="form.numeroEntrega" 
                    class="input is-medium" 
                    type="text"
                    />
                  </div>
                  <p class="help" v-if="errors.includes('numeroEntrega')">* Campo obrigatório</p>
                </div>

                <div class="field">
                  <label class="label has-text-weight-normal">Qual o complemento de entrega?</label>
                  <div class="control">
                    <input 
                    :disabled="form.mesmoEndereco == true"
                    :readonly="form.mesmoEndereco == true"
                    v-model="form.complementoEntrega" 
                    class="input is-medium" 
                    type="text"
                    />
                  </div>
                  <p class="help" v-if="errors.includes('complementoEntrega')">* Campo obrigatório</p>
                </div>

                <div class="field">
                  <label class="label has-text-weight-normal">Em que horários aceitam entrega?</label>
                  <div class="control">
                    <input 
                    v-model="form.horariosEntrega" 
                    class="input is-medium" 
                    type="text"
                    />
                  </div>
                  <p class="help" v-if="errors.includes('horariosEntrega')">* Campo obrigatório</p>
                </div>
              </div>
            </div>
          </section>

          <section v-show="step == 4">
            <div class="field">
              <label class="label" for="telefoneContato">Telefone</label>
              <div class="control">
                <input 
                class="input" 
                type="text" 
                name="telefoneContato" 
                id="telefoneContato"
                v-model="form.telefoneContato"
                />
              </div>
            </div>

            <div class="field">
              <label class="label" for="emailContato">E-mail</label>
              <div class="control">
                <input 
                class="input" 
                type="text" 
                name="emailContato" 
                id="emailContato"
                v-model="form.emailContato"
                />
              </div>
            </div>
          </section>

          <div class="field field-buttons" v-if="step <= 4">
            <button class="button is-danger is-fullwidth" v-if="step < 4">Próximo</button>
            <button class="button is-danger is-fullwidth" v-else>Finalizar cadastro</button>
            <a class="is-flex align-center justify-center pt-3" @click.prevent="handlePrevious" v-if="step > 1">Voltar</a>
          </div>
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
        id: 0,
        cnpj: '',
        razaoSocial: '',
        nomeFantasia: '',
        telefoneContato: '',
        emailContato: '',

        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        estado: '',
        cidade: '',
        deliveryObs: '',
        mesmoEndereco: '',

        enderecoEntrega: '',
        numeroEntrega: '',
        cepEntrega: '',
        complementoEntrega: '',
        cidadeEntrega: '',
        estadoEntrega: '',
        horariosEntrega: '',
      },

      deliveryAddress: {
        enderecoEntrega: '',
        numeroEntrega: '',
        cepEntrega: '',
        complementoEntrega: '',
        cidadeEntrega: '',
        estadoEntrega: '',
      },

      errors: []
    }
  },
  
  created() {},

  watch: {
    'form.mesmoEndereco': function() {
      const { mesmoEndereco } = this.form
      
      if (mesmoEndereco) {
        this.form.enderecoEntrega = this.form.endereco
        this.form.numeroEntrega = this.form.numero
        this.form.cepEntrega = this.form.cep
        this.form.complementoEntrega = this.form.complemento
        this.form.cidadeEntrega = this.form.cidade
        this.form.estadoEntrega = this.form.estado
      } else {
        for (const prop in this.deliveryAddress) {
          this.form[prop] = this.deliveryAddress[prop]
        }
      }
    }
  },

  computed: {
    ...mapState({
      overlay: 'overlay',
      hasError: 'hasError',
      errorMsg: 'errorMsg',
      user: state => state.USER.data
    }),
  },
  
  methods: {
    ...mapActions([
      'fetchRestaurantList',
      'saveRestaurant',
      'setUserData',
      'setError',
      'setOverlay',
      'logout'
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

      } else {
        let formAux = _.omit(this.form, 'id')

        if (this.step == 2) {
          formAux = _.omit(this.form, ["id", "deliveryObs", "telefoneContato", "emailContato", "cep", "endereco", "numero", "complemento", "estado", "cidade", "deliveryObs", "mesmoEndereco", "enderecoEntrega", "numeroEntrega", "cepEntrega", "complementoEntrega", "cidadeEntrega", "estadoEntrega", "horariosEntrega"])
        } else if (this.step == 3) {
          formAux = _.omit(this.form, ["id", "deliveryObs", "telefoneContato", "emailContato", "estado", "cidade", "estadoEntrega", "cidadeEntrega"])
        } else if (this.step == 4) {
          formAux = _.omit(this.form, ["id", "deliveryObs", "estado", "cidade", "estadoEntrega", "cidadeEntrega"])
        }

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
      // if (this.step == 5) this.$router.push({ name: 'login' })
      if (this.isFormValid()) {
        this.step++
        if (this.step == 5) this.handleSaveRestaurant()
      } else console.log(this.errors)
    },

    handlePrevious() {
      if (this.step == 1) return
      this.step--
    },

    handleSaveRestaurant() {
      let data = this.form

      // if (!this.form.mesmoEndereco) {
      //   data = { ...this.form, ...this.deliveryAddress }
      // }

      let toastMsg = 'Nenhuma mensagem definida'

      this.saveRestaurant(data).then(async (response) => {
        if (response.data === 'Created' || response.data === 'Ok') {
          // await this.fetchRestaurantList()

          let userAux = _.cloneDeep(this.user)
          
          setTimeout(() => {
            // userAux.customers = this.restaurantsList
            this.setUserData(userAux)
            this.logout()
            this.$router.push({ name: 'login' })
          }, 1000)
          
          toastMsg = 'Alterações salvas com sucesso!'

        } else {
          toastMsg = 'Problemas ao adicionar o restaurante, tente novamente em alguns minutos!'
        }

        this.setOverlay({
          open: true,
          toast: {
            title: 'Atenção!',
            content: toastMsg,
          }
        })

      }).catch(error => {
        toastMsg = 'Problemas ao adicionar o restaurante, tente novamente em alguns minutos!'
        this.setOverlay({
          open: true,
          toast: {
            title: 'Atenção!',
            content: toastMsg,
          }
        })
      })
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
