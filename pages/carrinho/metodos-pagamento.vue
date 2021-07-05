<template>
  <section id="carrinhoMetodosPagamento">
    <!-- <Header/> -->
    <!-- <Navbar/> -->

    <section class="hero" ref="cartSection">
      <div class="hero-body">
        <div class="section">
          <h1 class="title">Metodos de pagamento</h1>

          <div v-if="!cartProducts || cartProducts.length <= 0">
            <p>
              Seu carrinho está vazio.
              <nuxt-link to="/">Voltar e continuar comprando.</nuxt-link>
            </p>
          </div>

          <div class="columns" v-else>
            <div class="column is-8 pr-3">
              <div class="is-flex justify-between">
                <table class="table is-narrow is-fullwidth">
                  <thead>
                    <tr>
                      <th>Fornecedor</th>
                      <th class="has-text-centered">Metodo de Pgto.</th>
                      <th class="has-text-centered">Itens</th>
                      <th class="has-text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="obj in cartPaymentMethods" :key="obj.supplierId">
                      <td width="40%">
                        <div class="is-flex justify-start align-center">
                          <div class="is-flex flex-dir-col">
                            <div class="pt-1">
                              <p class="is-size-6">{{ obj.supplierName }}</p>
                              <div class="product-rating">
                                <i v-for="i in 5" :key="i" class="material-icons">star</i>
                              </div>
                              <p class="is-size-6 pb-1 text-primary-light">Entrega: {{ obj.deliveryDays }}</p>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td width="20%">
                        <div class="select is-dark" v-if="!obj.hasMinOrderValueError">
                          <select @change="handleSelectPaymentMethod(obj.supplierId)" :ref="`slcPaymentMethod${obj.supplierId}`">
                            <option value="">Selecione...</option>
                            <option
                            v-for="paymentMethod in obj.paymentMethods" 
                            :key="paymentMethod.id"
                            :value="paymentMethod.id"
                            >{{ paymentMethod.title }}</option>
                          </select>
                        </div>
                        
                        <p class="text-primary pb-1" v-if="obj.hasMinOrderValueError">
                          O valor minimo é de R$ {{ obj.minOrderValue.toFixed(2) }}. Adicione mais produtos para continuar.
                        </p>

                        <button 
                        v-if="obj.hasMinOrderValueError"
                        class="button is-danger light is-small"
                        @click="handleBackToCart"
                        >
                          Voltar pro Carrinho
                        </button>
                      </td>

                      <td width="20%" class="has-text-centered">
                        <span>{{ obj.qtdItems }}</span>
                      </td>

                      <td width="20%" class="has-text-right">
                        <span class="is-size-5 text-primary-light has-text-weight-bold">R$ {{ obj.sumTotal }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div class="column is-4">
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

                <button 
                class="button is-danger light is-fullwidth" 
                @click="handleNextStep" 
                v-if="isValid && !hasMinOrderValueError"
                >Continuar</button>

                <button 
                class="button is-danger light is-fullwidth" 
                disabled 
                v-else
                >Continuar</button>

              </div>
            </div>
          </div>
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

import { mapActions, mapState } from 'vuex'
import _ from 'lodash'

export default {
  components: {
    // Header,
    // Navbar,
    // Sidebar,
    // Footer
  },

  data() {
    return {
      cartPaymentMethods: [],
      hasMinOrderValueError: false,
      isValid: false
    }
  },

  created() {
    this.handleInit()

    setTimeout(() => {
      this.$refs.cartSection.scrollIntoView()
    }, 500)
  },

  computed: {
    ...mapState({
      cartProducts: state => state.CART.cartProducts
    }),

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
      'logout',
      'toggleOverlay',
      'setIconBoxActive',
      'updateCart',
      'updateProductQuantity',
      'removeCartProduct',
    ]),

    handleInit() {
      const groupedList = _.groupBy(this.cartProducts, 'supplierId')
      const uniqList = _.uniqBy(this.cartProducts, 'supplierId')
      
      this.cartPaymentMethods = uniqList.map(item => {
        const {
          deliveryDays,
          paymentMethod,
          supplierId,
          supplier: { paymentMethods, name, rating, minOrderValue },
        } = item

        const itemGroupedList = groupedList[item.supplierId]
        const qtdItems = itemGroupedList.length

        this.isValid = itemGroupedList[0].hasOwnProperty('paymentMethodId')

        let sumTotal = _.sumBy(itemGroupedList, (item) => {
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

        sumTotal = sumTotal.toFixed(2)

        if (sumTotal < minOrderValue) {
          this.hasMinOrderValueError = true
        }

        return {
          supplierId,
          qtdItems,
          sumTotal,
          supplierName: name,
          supplierRating: rating,
          deliveryDays,
          paymentMethod,
          paymentMethods,
          minOrderValue,
          hasMinOrderValueError: (sumTotal < minOrderValue) ? true : false
        }
      })

      console.log(this.cartPaymentMethods)
    },

    handleSelectPaymentMethod(supplierId) {
      let value = this.$refs[`slcPaymentMethod${supplierId}`][0].value
      value = parseInt(value)

      if (!value) {
        this.isValid = false
      }

      const mappedCartProducts = this.cartProducts.map(product => {
        if (product.supplier.id == supplierId && value) {
          return { ...product, quantidade: product.quantidade, paymentMethodId: value }
        }
        return _.omit(product, 'paymentMethodId')
      })

      this.updateCart(mappedCartProducts)
      this.handleInit()
    },

    handleBackToCart() {
      this.$router.push({ name: 'carrinho' })
    },

    handleNextStep() {
      this.$router.push({ name: 'carrinho-agendar-entrega' })
    }
  }
}
</script>

<style lang="scss">

#carrinhoMetodosPagamento {
  .hero {
    .hero-body {
      .section {
        padding: 0 5rem;
      }
    }
  }
}

</style>