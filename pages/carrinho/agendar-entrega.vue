<template>
  <section id="carrinhoAgendarEntrega">
    <!-- <Header/> -->
    <!-- <Navbar/> -->

    <section class="hero" ref="cartSection">
      <div class="hero-body">
        <div class="section">
          <h1 class="title">Agendar entrega</h1>

          <div class="columns">
            <div class="column is-4 pr-2">
              <div class="field">
                <label class="label" for="">Data de entrega</label>
                <div class="control">
                  <datepicker 
                  :language="ptBR" 
                  :format="deliveryDateFormatter"
                  input-class="input" 
                  placeholder="Selecione..." 
                  v-model="deliveryDate">
                  </datepicker>
                </div>
              </div>
              <div class="field">
                <label class="label" for="deliveryObs">Informações para entrega</label>
                <div class="control">
                  <textarea class="textarea" name="deliveryObs" id="deliveryObs" v-model="deliveryObs"></textarea>
                </div>
              </div>
            </div>

            <div class="column is-8">
              <div class="box">
                <p class="subtitle is-size-4">Resumo do pedido</p>
                
                <div class="is-flex justify-between">
                  <p>Subtotal ({{ cartProducts.length }} produtos)</p>
                  <p>R$ {{ getAmount }}</p>
                </div>
                
                <hr class="divider-20">
                
                <div class="is-flex justify-between">
                  <p class="is-size-5 has-text-weight-bold">Total</p>
                  <p class="is-size-5 text-primary-light has-text-weight-bold">R$ {{ getAmount }}</p>
                </div>

                <hr class="divider-20">

                <p class="text-primary-light">
                  A entrega será realizada levando
                  em consideração primeiramente a rota logística de cada fornecedor
                  mas poderá eventualmente ser entregue nos horários sugeridos no cadastro. (mas não é obrigatório)
                </p>

                <hr class="divider-20">

                <button class="button is-danger light is-fullwidth" @click="toggleModal" v-if="formValidate">
                  Confirmar Pedido
                </button>
                
                <button class="button is-danger light is-fullwidth" disabled v-else>
                  Confirmar Pedido
                </button>

              </div>
            </div>
          </div>

          <!-- <div class="columns">
            <div class="column">
              <p class="text-primary-light">
                A entrega será realizada levando
                em consideração primeiramente a rota logística de cada fornecedor
                mas poderá eventualmente ser entregue nos horários sugeridos no cadastro. (mas não é obrigatório)
              </p>
            </div>
          </div> -->

        </div>
      </div>
    </section>

    <section>
      <div class="modal" :class="{'is-active': showModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head bg-primary">
            <p class="modal-card-title has-text-white">Vamos encaminhar o seu pedido!</p>
            <button class="delete" aria-label="close" @click="toggleModal"></button>
          </header>
          <section class="modal-card-body bg-primary">
            <p class="subtitle is-size-6 has-text-white">
              Acompanhe seu pedido pela <b>página de entregas!</b><br/>
              Se desejar, salve este pedido como um modelo.
            </p>
            <div class="is-flex flex-dir-col">
              <div class="field" v-if="showModelInput">
                <label class="label has-text-white" for="modelName">Nome do modelo:</label>
                <div class="control">
                  <input 
                  class="input" 
                  type="text" 
                  name="modelName" 
                  id="modelName" 
                  placeholder="Digite o nome do modelo..." 
                  v-model="modelName"
                  />
                </div>
              </div>

              <button class="button is-danger light is-outlined mb-1rem" @click="handleSaveWithModel">
                Enviar e salvar modelo
              </button>
              
              <button class="button is-danger light is-outlined" @click="handleSave">
                Enviar sem salvar modelo
              </button>
            </div>
          </section>
        </div>
      </div>
    </section>

    <!-- <Footer/> -->
  </section>
</template>

<script>

// import Header from '@/components/Header'
// import Sidebar from '@/components/Sidebar'
// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'

import Datepicker from 'vuejs-datepicker'
import { ptBR } from 'vuejs-datepicker/dist/locale'

import { mapActions, mapState } from 'vuex'
import _ from 'lodash'
import dayjs from 'dayjs'

export default {
  components: {
    // Header,
    // Navbar,
    // Sidebar,
    // Footer,
    Datepicker
  },
  
  data() {
    return {
      ptBR: ptBR,
      deliveryDate: null,
      deliveryObs: '',
      modelName: '',
      showModal: false,
      showModelInput: false,
    }
  },

  created() {
    setTimeout(() => {
      this.$refs.cartSection.scrollIntoView()
    }, 500)
  },

  computed: {
    ...mapState({
      cartProducts: state => state.CART.cartProducts
    }),

    formValidate() {
      return (
        this.deliveryDate && 
        this.deliveryDate != 'Invalid Date'
      ) ? true : false
    },

    getAmount() {
      const amount = _.sumBy(this.cartProducts, (item) => {
        const {
          promotionPrice, promotionQuantity, price, quantidade,
          promotionPrice2, promotionQuantity2, promotionPrice3, promotionQuantity3,
          approximateWeight
        } = item

        let auxPrice = 0

        if (quantidade > promotionQuantity3 && promotionQuantity3 > 0 ) {
          auxPrice = promotionPrice3
          if (approximateWeight > 0) auxPrice *= approximateWeight
          return quantidade * auxPrice
        }
        
        if (quantidade >  promotionQuantity2  && promotionQuantity2 > 0 ) {
          auxPrice = promotionPrice2
          if (approximateWeight > 0) auxPrice *= approximateWeight
          return quantidade * auxPrice
        }
        
        if (quantidade >  promotionQuantity  && promotionQuantity > 0) {
          auxPrice = promotionPrice
          if (approximateWeight > 0) auxPrice *= approximateWeight
          return quantidade * auxPrice
        }

        auxPrice = price
        
        if (approximateWeight > 0) auxPrice *= approximateWeight
        
        return quantidade * auxPrice
      })

      return amount.toFixed(2)
    }
  },

  methods: {
    ...mapActions([
      'saveOrder',
      'resetCart',
      'setOverlay'
    ]),

    toggleModal() {
      this.showModal = !this.showModal
    },

    handleSaveWithModel() {
      if (!this.showModelInput) {
        this.showModelInput = true
      } else {
        this.handleSave()
      }
    },

    handleSave() {
      const deliveryDateFormatted = dayjs(this.deliveryDate).format('YYYY-MM-DD')

      let toastMsg = 'Nenhuma mensagem definida'
      let toastRedirect = null
      
      this.saveOrder({ deliveryDate: deliveryDateFormatted, deliveryObs: this.deliveryObs, model: this.modelName})
      .then(({ data }) => {

        this.resetCart()
        
        toastMsg = 'Pedido enviado com sucesso!'
        this.setOverlay({
          open: true,
          toast: {
            title: 'Atenção!',
            content: toastMsg,
            redirect: 'carrinho'
          }
        })

      }).catch(error => {
        console.log(error.response.data)
        toastMsg = 'Ocorreu um erro ao enviar seu pedido. Tente novamente em alguns instantes.'
        this.setOverlay({
          open: true,
          toast: {
            title: 'Atenção!',
            content: toastMsg,
            redirect: 'carrinho'
          }
        })
      })

      
    },
    
    deliveryDateFormatter(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
  }
}
</script>

<style lang="scss" scoped>

#carrinhoAgendarEntrega {
  .hero {
    .hero-body {
      .section {
        padding: 0 5rem;
      }
    }
  }
}

.modal-card {
  width: 450px;
}

.modal-card-head {
  border-bottom: none;
}

.modal-card-body {
  padding: 0 20px 30px;
}

.modal-card-foot {
  border-top: none;
}

@media screen and (min-width: 320px) {
  .modal-card-title {
    font-size: 0.90rem;
  }
}

@media screen and (min-width: 375px) {
  .modal-card-title {
    font-size: 1rem;
  }
}

@media screen and (min-width: 425px) {
  .modal-card-title {
    font-size: 1.3rem;
  }
}

@media screen and (max-width: 425px) {
  .modal-card {
    width: calc(100vw - 30px);
  }
}

</style>