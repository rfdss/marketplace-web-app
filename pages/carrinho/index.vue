<template>
  <section id="carrinho">
    <!-- <Header /> -->
    <!-- <Navbar /> -->

    <section class="hero" ref="cartSection">
      <div class="hero-body">
        <div class="section">
          <h1 class="title">Meu Carrinho</h1>

          <div v-if="!cartProducts || cartProducts.length <= 0">
            <p>
              Seu carrinho está vazio.
              <nuxt-link to="/">Voltar e continuar comprando.</nuxt-link>
            </p>
          </div>

          <div class="columns" v-else>
            <div class="column is-9 pr-3">
              <div class="is-flex justify-between">
                <div class="box">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Produto</th>
                        <th class="has-text-centered">Qtd.</th>
                        <th class="has-text-right">Preço</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="offer in cartProducts" :key="offer.offerId">
                        <td width="50%">
                          <div class="is-flex justify-start align-center">
                            <div class="pr-2">
                              <figure class="image is-96x96">
                                <img :src="offer.image64" :alt="offer.title" v-if="offer.image64">
                                <img src="~/static/images/no-picture.png" alt="Oferta sem imagem" v-else>
                              </figure>
                            </div>
                            <div class="is-flex flex-dir-col">
                              <p class="product-title is-size-5">{{ offer.title }}</p>

                              <p class="product-price text-primary-light" v-if="offer.promotionQuantity > 0">
                                Acima de {{ offer.promotionQuantity }} {{ offer.unit }} por {{ offer.promotionPrice }} / {{ offer.unit }}
                              </p>
                              <p class="product-price text-primary-light" v-if="offer.promotionQuantity2 > 0">
                                Acima de {{ offer.promotionQuantity2 }} {{ offer.unit }} por {{ offer.promotionPrice2 }} / {{ offer.unit }}
                              </p>
                              <p class="product-price text-primary-light" v-if="offer.promotionQuantity3 > 0">
                                Acima de {{ offer.promotionQuantity3 }} {{ offer.unit }} por {{ offer.promotionPrice3 }} / {{ offer.unit }}
                              </p>

                              <div class="pt-1">
                                <span class="is-size-6">{{ offer.supplier.name }}</span>
                                <div class="product-rating">
                                  <i v-for="i in 5" :key="i" class="material-icons">star</i>
                                </div>
                                <p class="is-size-6 pb-1 text-primary-light">Entrega: {{ offer.deliveryDays }}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td width="20%">
                          <div class="is-flex flex-dir-col">
                            <div class="is-flex align-center">
                              <button class="btn-handle-qtd text-primary is-flex align-center pr-1rem" @click.prevent="handleSubQuantity(offer)">
                                <span class="iconify" data-icon="simple-line-icons:minus" data-width="28" data-height="28"></span>
                              </button>
                              
                              <input 
                              class="input has-text-centered" 
                              type="text" 
                              :value="offer.quantidade" 
                              :ref="`offer${offer.offerId}Qtd`" 
                              @keyup.enter="handleUpdateProductQuantity(offer)"
                              />
                              
                              <button class="btn-handle-qtd text-primary is-flex align-center pl-1rem" @click.prevent="handleAddQuantity(offer)">
                                <span class="iconify" data-icon="simple-line-icons:plus" data-width="28" data-height="28"></span>
                              </button>
                            </div>
                            <!-- <div class="has-text-centered pt-1">
                              <span class="is-size-7 has-text-danger">Quantidade máxima: 100</span>
                              <span class="is-size-7 has-text-danger">Quantidade minima: 1</span>
                            </div> -->
                          </div>
                        </td>
                        <td width="20%" class="has-text-right">
                          <span class="is-size-5 text-primary-light has-text-weight-bold">R$ {{ offer.price }} / {{ offer.unit }}</span>
                        </td>
                        <td width="10%">
                          <button
                          class="btn-handle-qtd text-primary is-flex align-center pl-1rem"
                          @click.prevent="handleRemoveCartProduct(offer.offerId)"
                          >
                            <span class="iconify" data-icon="simple-line-icons:close" data-width="28" data-height="28"></span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="column is-3">
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
                <button class="button is-danger light is-fullwidth" @click="handleNext">Continuar</button>
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

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import { mapActions, mapState } from 'vuex'
import _ from 'lodash'

export default {
  components: {
    Header,
    Navbar,
    Sidebar,
    Footer
  },
  data() {
    return {}
  },
  created() {
    setTimeout(() => this.$refs.cartSection.scrollIntoView(), 500)
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
        
        if (quantidade > promotionQuantity2  && promotionQuantity2 > 0 ) {
          auxPrice = promotionPrice2
          if (approximateWeight > 0) auxPrice *= approximateWeight
          return quantidade * auxPrice
        }
        
        if (quantidade > promotionQuantity && promotionQuantity > 0) {
          if (approximateWeight > 0) auxPrice *= approximateWeight
          return quantidade * auxPrice
        }

        auxPrice = price
        
        if (approximateWeight > 0) {
          auxPrice = auxPrice * approximateWeight
        }
        
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
      'updateProductQuantity',
      'removeCartProduct'
    ]),

    handleNext() {
      this.$router.push({ name: 'carrinho-metodos-pagamento' })
    },

    handleSubQuantity(offer) {
      const quantidade = parseInt(this.$refs[`offer${offer.offerId}Qtd`][0].value)
      const sub = _.subtract(quantidade, 1)
      this.$refs[`offer${offer.offerId}Qtd`][0].value = (sub >= 1) ? sub : 1
      this.handleUpdateProductQuantity(offer)
    },

    handleAddQuantity(offer) {
      const quantidade = parseInt(this.$refs[`offer${offer.offerId}Qtd`][0].value)
      const add = _.add(quantidade, 1)
      this.$refs[`offer${offer.offerId}Qtd`][0].value = (add <= 100) ? add : 100
      this.handleUpdateProductQuantity(offer)
    },

    handleUpdateProductQuantity(offer) {
      const quantidade = this.$refs[`offer${offer.offerId}Qtd`][0].value
      this.updateProductQuantity({ item: offer, quantidade })
    },

    handleRemoveCartProduct(offerId) {
      this.removeCartProduct({ items: this.cartProducts, itemId: offerId })
    },
  }
}
</script>

<style lang="scss">

#carrinho {
  .hero {
    .hero-body {
      .section {
        padding: 0 3rem;
      }
    }
  }
}

</style>