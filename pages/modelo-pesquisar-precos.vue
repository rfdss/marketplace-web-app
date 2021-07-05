<template>
  <section id="modeloPesquisarPrecos">
    <!-- <Header/> -->
    <!-- <Navbar/> -->

    <section class="hero">
      <div class="hero-body">
        <div class="section">
          <div class="model-price-search">
            <h1 class="title">Pesquisa de preço</h1>
            
            <button class="button is-danger light" @click="handleAddToCart" v-if="cartOrderModelItems.length > 0">
              ADICIONAR AO CARRINHO
            </button>

            <button class="button is-danger light" disabled v-else>
              ADICIONAR AO CARRINHO
            </button>
          </div>

          <h2 class="subtitle text-primary mb-2">Modelo: {{ currentModel.title }}</h2>

          <div class="columns is-multiline" v-if="orderModelItems.length > 0">
            <div class="column is-4" v-for="item in orderModelItems" :key="item.offerId">
              <div class="box">
                <p class="text-primary-light mb-1" v-if="!item.bestOffer">Sem oferta para este item</p>
                <p class="text-primary-light mb-1" v-else>Tem preço melhor</p>

                <p class="is-flex justify-between mb-1">
                  <span class="is-size-5">{{ item.todayOffer.title }}</span>
                  <span class="is-size-5 has-text-weight-bold">{{ item.quantity }} {{ item.todayOffer.unit }}</span>
                </p>
                
                <p class="mb-1">{{ item.todayOffer.supplier.name }}</p>

                <p class="is-flex justify-between mb-1">
                  Valor da última compra: <span class="is-size-5 has-text-weight-bold">R$ {{ item.totalItem.toFixed(2) }}</span>
                </p>

                <template v-if="item.bestOffer != null">
                  <hr/>

                  <p class="mb-1rem">Escolha o valor que deseja pagar:</p>

                  <div class="is-flex justify-between">
                    <a @click.prevent="handleSelectOffer(item, 'today')">
                      <div 
                      class="box is-marginless" 
                      :class="{'offer-selected': currentOfferSelected == 'today', 'offer-disabled': (currentOfferSelected != 'today' && currentOfferSelected != null)}">
                        <p>Preço de hoje</p>
                        <p class="is-size-7">{{ item.todayOffer.supplier.name }}</p>
                        <p class="has-text-weight-bold is-size-5">
                          R$ {{ item.todayOffer.price.toFixed(2) }} {{ item.todayOffer.unit }}
                        </p>
                      </div>
                    </a>
                    
                    <a @click.prevent="handleSelectOffer(item, 'best')">
                      <div
                      class="box ml-2"
                      :class="{'offer-selected': currentOfferSelected == 'best', 'offer-disabled': (currentOfferSelected != 'best' && currentOfferSelected != null)}">
                        <p>Melhor preço</p>
                        <p class="is-size-7">{{ item.bestOffer.supplier.name }}</p>
                        <p class="has-text-weight-bold is-size-5">
                          R$ {{ item.bestOffer.price.toFixed(2) }} {{ item.bestOffer.unit }}
                        </p>
                      </div>
                    </a>
                  </div>
                </template>

                <p class="is-flex justify-between" v-if="!item.bestOffer && item.todayOffer">
                  Preço de hoje: <span class="has-text-weight-bold is-size-5">R$ {{ item.todayOffer.price.toFixed(2) }}</span>
                </p>

              </div>
            </div>
          </div>

        </div> <!-- // container -->
      </div> <!-- // hero-body -->
    </section> <!-- // hero -->

    <!-- <Footer/> -->
  </section>
</template>

<script>

// import Header from '@/components/Header'
// import Sidebar from '@/components/Sidebar'
// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'

import { mapActions, mapState } from 'vuex'

export default {
  components: {
    // Header,
    // Navbar,
    // Sidebar,
    // Footer,
  },
  data() {
    return {
      loading: true,
      showModal: false,
      orderModelItems: [],
      cartOrderModelItems: [],
      currentOfferSelected: null,
    }
  },

  created() {
    setTimeout(() => {
      if (!this.currentModel.hasOwnProperty('id')) {
        this.$router.push({ name: 'modelos' })
      }

      this.setOverlay({ open: true, loading: true })

      setTimeout(() => {
        this.handleFetchOrderModelItems()
        this.setOverlay({ open: false, loading: false })
      }, 1000)
      
    }, 100)
  },

  computed: {
    ...mapState({
      currentModel: state => state.MODELS.currentModel,
    })
  },

  methods: {
    ...mapActions([
      'fetchOrderModelItems',
      'addCartProduct',
      'setOverlay',
    ]),

    handleFetchOrderModelItems() {
      const firstModelId = this.currentModel.orderModelItems[0].orderModelId

      this.fetchOrderModelItems(firstModelId).then(response => {
        this.orderModelItems = response.data
      })
      .catch(error => {
        console.debug('API ERROR:', error)
      })
    },

    handleSelectOffer(item, type) {
      this.currentOfferSelected = type

      const quantidade = item.quantity
      const hasTodayOfferItem = this.cartOrderModelItems.find(o => o.offerId == item.todayOffer.offerId)
      const hasBestOfferItem = this.cartOrderModelItems.find(o => o.offerId == item.bestOffer.offerId)
      
      if (type == 'today') {

        if (!hasTodayOfferItem && !hasBestOfferItem) {
          
          this.cartOrderModelItems.push({ ...item.todayOffer, quantidade })
          // console.log('ADICIONOU TODAY OFFER APENAS')

        } else if (!hasTodayOfferItem && hasBestOfferItem) {

          this.cartOrderModelItems = this.cartOrderModelItems.filter(o => o == item.bestOffer)
          this.cartOrderModelItems.push({ ...item.todayOffer, quantidade })
          // console.log('ADICIONOU TODAY OFFER E REMOVEU BEST OFFER')
        }

      } else {

        if (!hasBestOfferItem && !hasTodayOfferItem) {
          
          this.cartOrderModelItems.push({ ...item.bestOffer, quantidade })
          // console.log('ADICIONOU TODAY OFFER APENAS')

        } else if (!hasBestOfferItem && hasTodayOfferItem) {

          this.cartOrderModelItems = this.cartOrderModelItems.filter(o => o == item.todayOffer)
          this.cartOrderModelItems.push({ ...item.bestOffer, quantidade })
          // console.log('ADICIONOU BEST OFFER E REMOVEU TODAY OFFER')
        }
      }
      // console.log(this.cartOrderModelItems)
    },

    handleAddToCart() {
      this.cartOrderModelItems.forEach(item => {
        const { quantidade } = item
        this.addCartProduct({ ...item, quantidade })
      })

      alert('Produtos adicionados com sucesso!')

      this.$router.push({ name: 'carrinho' })
    },

    formatModelQtdProducts(length) {
      return (length > 1)
        ? `${length} produtos`
        : `${length} produto`
    }
  }
}
</script>

<style lang="scss">

#modeloPesquisarPrecos {
  .hero {
    .hero-body {
      .section {
        padding: 0 5rem;
      }
    }
  }
}

// .section-model-price-search {
//   padding: 0 5rem;
// }

.model-price-search {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media screen and (max-width: 425px) {
  .model-price-search {
    flex-direction: column;
  }
}

.offer-selected {
  border: 1px solid #417e86;
}

.offer-disabled {
  border: none;
  opacity: .5;
}

</style>