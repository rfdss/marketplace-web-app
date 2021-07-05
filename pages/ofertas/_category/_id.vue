<template>
  <section id="ofertaDetalhes">
    <section class="hero" ref="offerDetailSection">
      <div class="hero-body">
        <div class="section">
          <h1 class="title">Detalhes da oferta</h1>
          
          <div class="columns">
            <div class="column is-5">
              <div class="box product-detail__box-image" v-if="offer">
                <figure class="image is-flex" v-if="offer.image64">
                  <img class="h-100" :src="offer.image64" :alt="offer.title">
                </figure>
                <figure class="image image-default" v-else>
                  <img class="no-offer-image" src="~/static/images/no-picture.png" alt="Oferta sem imagem">
                </figure>
              </div>
            </div>

            <div class="column is-7" v-if="offer">
              <div class="box">
                <div class="is-flex flex-dir-col justify-between">
                    <div class="box-divider mb-1rem">
                      <p class="is-size-5">{{ offer.title }}</p>
                      <p class="is-size-5 has-text-weight-bold text-primary-light mb-1">
                        R$ {{ offer.price.toFixed(2) }} / {{ offer.unit }}
                      </p>

                      <p class="is-size-6 text-primary-light" v-if="offer.promotionQuantity > 0">
                        Acima de {{ offer.promotionQuantity }} {{ offer.unit }} por {{ offer.promotionPrice.toFixed(2) }} / {{ offer.unit }}
                      </p>
                      
                      <p class="is-size-6 text-primary-light" v-if="offer.promotionQuantity2 > 0">
                        Acima de {{ offer.promotionQuantity2 }} {{ offer.unit }} por {{ offer.promotionPrice2.toFixed(2) }} / {{ offer.unit }}
                      </p>

                      <p class="is-size-6 text-primary-light" v-if="offer.promotionQuantity3 > 0">
                        Acima de {{ offer.promotionQuantity3 }} {{ offer.unit }} por {{ offer.promotionPrice3.toFixed(2) }} / {{ offer.unit }}
                      </p>
                    </div>

                    <div class="box-divider mb-1rem is-flex align-center">
                      <div class="mr-1rem">
                        <figure class="image is-64x64" style="margin-left: 0;">
                          <img class="is-rounded" src="~/static/images/supplier-teste.jpeg">
                        </figure>
                      </div>
                      
                      <div class="is-flex flex-dir-col align-start">
                        <span class="is-size-6">{{ offer.supplier.name }}</span>
                        <div class="product-rating">
                          <i class="material-icons"
                          :class="{'disabled': ( i > offer.supplier.rating )}" 
                          v-for="i in 5" :key="i">star</i>
                        </div>
                        <p class="is-size-6 pb-1 text-primary-light">Entrega: {{ offer.deliveryDays }}</p>
                      </div>
                    </div>

                    <div class="mt-1rem is-flex align-center justify-start">
                      <div class="qtd-box is-flex align-center mr-2">
                        <button class="btn-handle-qtd text-primary is-flex align-center pr-1rem" @click="handleSubQuantity">
                          <span class="iconify" data-icon="simple-line-icons:minus" data-width="28" data-height="28"></span>
                        </button>
                        
                        <input class="input has-text-centered" type="text" v-model="offer.quantidade">

                        <button class="btn-handle-qtd text-primary is-flex align-center pl-1rem" @click.prevent="handleAddQuantity">
                          <span class="iconify" data-icon="simple-line-icons:plus" data-width="28" data-height="28"></span>
                        </button>
                      </div>
                      <button 
                      class="button is-danger light btn-comprar"
                      @click="handleAddProduct"
                      >ADICIONAR AO CARRINHO</button>
                    </div>
                    
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="hero hero-top-offers" ref="sectionTopOffers">
      <div class="hero-body">
        <div class="section">
          <h2 class="title">Top ofertas</h2>

          <swiper class="topOffersSwiper" :options="swiperOption" v-if="offer && topOffers && topOffers.length > 0">
            <swiper-slide v-for="topOffer in topOffers" :key="topOffer.id">
              <a @click.prevent="handleSelectTopOffer(topOffer)">
                <div :class="{
                  'box box-top-offers': true,
                  'is-active': offer && offer.offerId == topOffer.offerId
                }">
                  <p class="is-size-5 has-text-weight-bold mb-1">{{ topOffer.title }}</p>
                  <p class="is-size-5 text-primary-light has-text-weight-bold mb-1">R$ {{ topOffer.price.toFixed(2) }}</p>
                  <p class="is-size-6 mb-1">{{ topOffer.supplier.name }}</p>
                </div>
              </a>
            </swiper-slide>
            <div class="swiper-pagination topOffer" slot="pagination"></div>
            <div class="swiper-button-prev topOffer" slot="button-prev"></div>
            <div class="swiper-button-next topOffer" slot="button-next"></div>
          </swiper>

        </div>
      </div>
    </section>
  </section>
</template>

<script>

// Vue Awesome Swipper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import { mapActions, mapState } from 'vuex'
import _ from 'lodash'
import dayjs from 'dayjs'

export default {
  components: {
    swiper,
    swiperSlide,
  },
  
  data() {
    return {
      offer: null,

      swiperOption: {
        loop: false,
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          }
        }
      }
    }
  },

  created() {
    const { category, id } = this.$route.params
    
    if (!category || !id) {
      this.$router.push({ name: 'index' })
    }

    this.handleProduct(category, id)
  },

  computed: {
    ...mapState({
      offers: state => state.PRODUCTS.offers,
      topOffers: state => state.PRODUCTS.topOffers,
      cartProducts: state => state.CART.cartProducts,
    }),
  },

  methods: {
    ...mapActions([
      'fetchOffersByProduct',
      'fetchTopOffers',
      'addCartProduct',
      'updateProductQuantity',
      'setOverlay',
    ]),

    async handleProduct(category, id) {
      this.setOverlay({ open: true, loading: true })

      await this.fetchOffersByProduct(category)
      
      setTimeout(async () => {
        const offerAux = this.offers.find(o => o.offerId == id)

        if (offerAux) {
          this.offer = { ...offerAux, quantidade: 1 }
          await this.fetchTopOffers(this.offer.offerId)
        }

        setTimeout(() => {
          this.setOverlay({ open: false, loading: false })
          this.$refs.offerDetailSection.scrollIntoView()
        }, 100)
      }, 1000)
    },

    handleSelectTopOffer(topOffer) {
      this.offer = { ...topOffer, quantidade: 1 }
      this.$refs.offerDetailSection.scrollIntoView()
    },

    handleSubQuantity() {
      const { quantidade } = this.offer
      const sub = _.subtract(quantidade, 1)
      this.offer.quantidade = (sub >= 1) ? sub : 1
    },

    handleAddQuantity() {
      const { quantidade } = this.offer
      const add = _.add(quantidade, 1)
      this.offer.quantidade = (add <= 100) ? add : 100
    },

    handleAddProduct() {
      const { quantidade } = this.offer
      
      if (quantidade < 1 || quantidade > 100) return false
      
      const offerInCart = this.cartProducts.find(o => o.offerId == this.offer.offerId)
      let toastMsg = 'Produto adicionado com sucesso!'
      
      if (!offerInCart) {
        this.addCartProduct({ ...this.offer })
      } else {
        const sumQtd = parseInt(quantidade + offerInCart.quantidade)
        toastMsg = 'O produto já existe no carrinho. Quantidade alterada com sucesso!'
        this.updateProductQuantity({ item: this.offer, quantidade: sumQtd })
      }

      this.setOverlay({
        open: true,
        toast: { 
          title: 'Atenção', 
          content: toastMsg
        }
      })
    },
    
    deliveryDateFormatter(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
  }
}
</script>

<style lang="scss">
#ofertaDetalhes {
  .hero {
    .hero-body {
      .section {
        padding: 0 5rem;
      }
    }

    &.hero-top-offers {
      .hero-body {
        padding: 0 1.5rem;
      }
    }
  }
}

.topOffersSwiper {
  padding: 1rem 5rem;
  .swiper-wrapper {
    height: 230px;
  }
  .swiper-pagination {
    .swiper-pagination-bullet-active {
      background: #c54a4e;
      opacity: 1;
    }
  }
}

.swiper-button-prev.topOffer,
.swiper-button-next.topOffer {
  filter : brightness(0) contrast(10%);
  top: 40%;
}

.qtd-box {
  width: 10rem;
}

.box-top-offers {
  min-height: 190px;
}

.box.is-active {
  border: 1px solid #417e86;
}

.box-divider {
  box-shadow: 0 4px 8px -10px;
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 1rem;
}

.product-detail__box-image {
  max-height: 400px !important;
  height: 100%;
}

.product-detail__box-image > figure,
.product-detail__box-image > figure > img {
  max-height: 400px !important;
  height: 100%;
}
</style>