<template>
  <div id="restaurant">
    <section class="hero" ref="restaurantSection">
      <div class="hero-body">
        <section class="section section-profile">
          <h1 class="title">Editar restaurante</h1>

          <!-- <div class="columns"> -->
            <!-- <div class="column"> -->
              <form class="mt-3" @submit.prevent="handleSaveRestaurant">
                <div class="columns is-multiline">
                  <div class="column is-4">
                    <div class="box">
                      <p class="subtitle text-primary-light">INFORMAÇÕES</p>

                      <div class="field">
                        <label class="label" for="cnpj">CNPJ</label>
                        <div class="control">
                          <input 
                          class="input" 
                          type="text" 
                          name="cnpj" 
                          id="cnpj"
                          v-model="restaurantForm.cnpj"
                          />
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" for="razaoSocial">Razão Social</label>
                        <div class="control">
                          <input 
                          class="input" 
                          type="text" 
                          name="razaoSocial" 
                          id="razaoSocial"
                          v-model="restaurantForm.razaoSocial"
                          />
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" for="nomeFantasia">Nome Fantasia</label>
                        <div class="control">
                          <input 
                          class="input" 
                          type="text" 
                          name="nomeFantasia" 
                          id="nomeFantasia"
                          v-model="restaurantForm.nomeFantasia"
                          />
                        </div>
                      </div>

                      <p class="subtitle text-primary-light mt-2">CONTATO</p>

                      <div class="field">
                        <label class="label" for="telefoneContato">Telefone</label>
                        <div class="control">
                          <input 
                          class="input" 
                          type="text" 
                          name="telefoneContato" 
                          id="telefoneContato"
                          v-model="restaurantForm.telefoneContato"
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
                          v-model="restaurantForm.emailContato"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="column is-4">
                    <div class="box">
                      <p class="subtitle text-primary-light">ENDEREÇO</p>

                      <div class="field">
                        <label class="label" for="cep">CEP</label>
                        <div class="control">
                          <input 
                          class="input" 
                          type="text" 
                          name="cep" 
                          id="cep"
                          v-model="restaurantForm.cep"
                          />
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" for="endereco">Endereço</label>
                        <div class="control">
                          <input 
                          class="input" 
                          type="text" 
                          name="endereco" 
                          id="endereco"
                          v-model="restaurantForm.endereco"
                          />
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" for="numero">Número</label>
                        <div class="control">
                          <input 
                          class="input" 
                          type="text" 
                          name="numero" 
                          id="numero"
                          v-model="restaurantForm.numero"
                          />
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" for="complemento">Complemento</label>
                        <div class="control">
                          <input 
                          class="input" 
                          type="text" 
                          name="complemento" 
                          id="complemento"
                          v-model="restaurantForm.complemento"
                          />
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" for="estado">Estado</label>
                        <div class="control">
                          <div class="select is-fullwidth">
                            <select v-model="restaurantForm.estado">
                              <option value="">Selecione...</option>
                              <option v-for="estado in ESTADOS" :value="estado.value" :key="estado.key">{{ estado.label }}</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" for="cidade">Cidade</label>
                        <div class="control">
                          <input 
                          class="input" 
                          type="text" 
                          name="cidade" 
                          id="cidade"
                          v-model="restaurantForm.cidade"
                          />
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" for="deliveryObs">OBS</label>
                        <div class="control">
                          <input 
                          class="input" 
                          type="text" 
                          name="deliveryObs" 
                          id="deliveryObs"
                          v-model="restaurantForm.deliveryObs"
                          />
                        </div>
                      </div>

                      <div class="field mt-2">
                        <input
                          id="mesmoEndereco"
                          type="checkbox"
                          name="mesmoEndereco"
                          class="switch is-rounded is-danger"
                          checked="checked"
                          v-model="restaurantForm.mesmoEndereco"
                        />
                        <!-- <label for="mesmoEndereco">Endereço do restaurante é o mesmo que o de entrega</label> -->
                        <label for="mesmoEndereco">Endereço de entrega é o mesmo</label>
                      </div>
                    </div>  
                  </div>

                  <div class="column is-4">
                    <div class="box">
                      <p class="subtitle text-primary-light">ENDEREÇO DE ENTREGA</p>

                      <div class="field">
                        <label class="label" for="cep">CEP</label>
                        <div class="control">
                          <input 
                          :disabled="restaurantForm.mesmoEndereco == true"
                          :readonly="restaurantForm.mesmoEndereco == true"
                          class="input" 
                          type="text" 
                          name="cep" 
                          id="cep"
                          v-model="restaurantForm.cepEntrega"
                          />
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" for="endereco">Endereço</label>
                        <div class="control">
                          <input 
                          :disabled="restaurantForm.mesmoEndereco == true"
                          :readonly="restaurantForm.mesmoEndereco == true"
                          class="input" 
                          type="text" 
                          name="endereco" 
                          id="endereco"
                          v-model="restaurantForm.enderecoEntrega"
                          />
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" for="numero">Número</label>
                        <div class="control">
                          <input 
                          :disabled="restaurantForm.mesmoEndereco == true"
                          :readonly="restaurantForm.mesmoEndereco == true"
                          class="input" 
                          type="text" 
                          name="numero" 
                          id="numero"
                          v-model="restaurantForm.numeroEntrega"
                          />
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" for="complemento">Complemento</label>
                        <div class="control">
                          <input 
                          :disabled="restaurantForm.mesmoEndereco == true"
                          :readonly="restaurantForm.mesmoEndereco == true"
                          class="input" 
                          type="text" 
                          name="complemento" 
                          id="complemento"
                          v-model="restaurantForm.complementoEntrega"
                          />
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" for="estado">Estado</label>
                        <div class="control">
                          <div class="select is-fullwidth">
                            <select 
                            :disabled="restaurantForm.mesmoEndereco == true"
                            :readonly="restaurantForm.mesmoEndereco == true"
                            v-model="restaurantForm.estadoEntrega"
                            >
                              <option value="">Selecione...</option>
                              <option v-for="estado in ESTADOS" :value="estado.value" :key="estado.key">{{ estado.label }}</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" for="cidade">Cidade</label>
                        <div class="control">
                          <input 
                          :disabled="restaurantForm.mesmoEndereco == true"
                          :readonly="restaurantForm.mesmoEndereco == true"
                          class="input" 
                          type="text" 
                          name="cidade" 
                          id="cidade"
                          v-model="restaurantForm.cidadeEntrega"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="box mt-2 has-text-centered">
                  <button class="button is-danger light mr-1rem">SALVAR</button>
                  <button class="button" @click.prevent="handleCancel">CANCELAR</button>
                </div>

              </form>
            <!-- </div> -->
          <!-- </div> -->
        </section>
      </div>
    </section>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import _ from 'lodash'

import { ESTADOS } from '@/api/constants'

export default {
  components: {},

  data() {
    return {
      restaurantForm: {
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
      },

      deliveryAddress: {
        enderecoEntrega: '',
        numeroEntrega: '',
        cepEntrega: '',
        complementoEntrega: '',
        cidadeEntrega: '',
        estadoEntrega: '',
      },

      ESTADOS: ESTADOS,
    }
  },

  watch: {
    'restaurantForm.mesmoEndereco': function() {
      const { mesmoEndereco } = this.restaurantForm
      
      if (mesmoEndereco) {
        this.restaurantForm.enderecoEntrega = this.restaurantForm.endereco
        this.restaurantForm.numeroEntrega = this.restaurantForm.numero
        this.restaurantForm.cepEntrega = this.restaurantForm.cep
        this.restaurantForm.complementoEntrega = this.restaurantForm.complemento
        this.restaurantForm.cidadeEntrega = this.restaurantForm.cidade
        this.restaurantForm.estadoEntrega = this.restaurantForm.estado
      } else {
        for (const prop in this.deliveryAddress) {
          this.restaurantForm[prop] = this.deliveryAddress[prop]
        }
      }
    }
  },

  computed: {
    ...mapState({
      user: state => state.USER.data,
      restaurantsList: state => state.RESTAURANT.restaurantsList
    })
  },

  created() {
    const { id } = this.$route.params

    if (id != null && id != '0' && id != 0) {
      const customer = this.user.customers.find(o => o.id == id)

      this.restaurantForm.id = customer.id
      this.restaurantForm.cnpj = customer.cnpj
      this.restaurantForm.razaoSocial = customer.name
      this.restaurantForm.nomeFantasia = customer.tradeName
      this.restaurantForm.cep = customer.localAddress.cep
      this.restaurantForm.endereco = customer.localAddress.street
      this.restaurantForm.numero = customer.localAddress.number
      this.restaurantForm.complemento = customer.localAddress.complement
      this.restaurantForm.estado = customer.localAddress.state
      this.restaurantForm.cidade = customer.localAddress.city
      this.restaurantForm.deliveryObs = customer.deliveryObs
      this.restaurantForm.mesmoEndereco = false
      this.restaurantForm.telefoneContato = `${customer.telefoneDdd}${customer.telefoneNumero}`
      this.restaurantForm.emailContato = customer.orderEmail

      this.restaurantForm.enderecoEntrega = customer.deliveryAddress.street
      this.restaurantForm.numeroEntrega = customer.deliveryAddress.number
      this.restaurantForm.cepEntrega = customer.deliveryAddress.cep
      this.restaurantForm.complementoEntrega = customer.deliveryAddress.complement
      this.restaurantForm.cidadeEntrega = customer.deliveryAddress.cidade
      this.restaurantForm.estadoEntrega = customer.deliveryAddress.state

      // BACKUP DO ENDEREÇO DE ENTREGA CASO O USUÁRIO MARQUE 'ENDEREÇO DE ENTREGA É O MESMO'
      this.deliveryAddress.enderecoEntrega = customer.deliveryAddress.street
      this.deliveryAddress.numeroEntrega = customer.deliveryAddress.number
      this.deliveryAddress.cepEntrega = customer.deliveryAddress.cep
      this.deliveryAddress.complementoEntrega = customer.deliveryAddress.complement
      this.deliveryAddress.cidadeEntrega = customer.deliveryAddress.cidade
      this.deliveryAddress.estadoEntrega = customer.deliveryAddress.state
    }
  },

  methods: {
    ...mapActions([
      'fetchRestaurantList',
      'saveRestaurant',
      'setUserData',
      'setOverlay',
    ]),

    handleCancel() {
      this.$router.push({ name: 'perfil' })
    },

    handleSaveRestaurant() {
      let data = this.restaurantForm

      // if (!this.restaurantForm.mesmoEndereco) {
      //   data = { ...this.restaurantForm, ...this.deliveryAddress }
      // }

      let toastMsg = 'Nenhuma mensagem definida'

      this.saveRestaurant(data).then(async (response) => {
        if (response.data === 'Created' || response.data === 'Ok') {
          await this.fetchRestaurantList()

          let userAux = _.cloneDeep(this.user)
          
          setTimeout(() => {
            userAux.customers = this.restaurantsList
            this.setUserData(userAux)
            console.log(this.restaurantsList)
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
        // toastMsg = 'Problemas ao adicionar o restaurante, tente novamente em alguns minutos!'
        toastMsg = error.response.data
        this.setOverlay({
          open: true,
          toast: {
            title: 'Atenção!',
            content: toastMsg,
          }
        })
      })
    },
  }
}
</script>

<style lang="scss">

#restaurant {
  .hero {
    .hero-body {
      .section {
        padding: 0 5rem;
      }
    }
  }
}

</style>