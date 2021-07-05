<template>
  <section id="index">
    <Header />

    <!-- <section class="hero">
      <div class="hero-body is-paddingless">
        <div class="section">
          <div class="tabs is-toggle is-fullwidth is-large">
            <ul>
              <li :class="{'is-active': filter == 1}">
                <a @click.prevent="setFilter(1)">
                  <span>OFERTAS</span>
                </a>
              </li>
              <li :class="{'is-active': filter == 2}">
                <a @click.prevent="setFilter(2)">
                  <span>FORNECEDORES</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section> -->

    <template v-if="filter == 1">
      <Navbar
      @setCurrentCategory="handleCurrentCategory"
      @setCategoryAndProduct="setCategoryAndProduct"
      />

      <section class="hero">
        <div class="hero-body is-paddingless">
          <section class="section section-categories">
            <template v-if="currentCategory">
              <h2 class="title has-text-white pb-1">{{ currentCategory.title }}</h2>
              <p class="subtitle has-text-white pb-1" v-if="currentCategory.products.length > 0">{{ currentCategory.products.length }} produtos encontrados</p>
              <p class="subtitle has-text-white pb-1" v-else>Nenhum produto encontrado</p>
            </template>

            <!-- PRODUCTS SWIPER -->
            <swiper class="productSwiper" :options="swiperOption" ref="productSwiper" v-if="currentCategory && currentCategory.products.length > 0">
              <swiper-slide v-for="product in currentCategory.products" :key="product.id">
                <a @click.prevent="handleProduct(product.id)">
                  <div class="card bg-primary-dark">
                    <div class="card-image light is-flex justify-center align-center" style="min-height: 100px;">
                      <img :src="currentCategory.image" :alt="currentCategory.title">
                    </div>
                    <div class="card-content">
                      <div class="content has-text-centered">
                        <span class="has-text-white is-size-6">{{ product.title }}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </swiper-slide>
              <div class="swiper-pagination product" slot="pagination"></div>
              <div class="swiper-button-prev product" slot="button-prev"></div>
              <div class="swiper-button-next product" slot="button-next"></div>
            </swiper>
          </section>

          <!-- <section class="section" style="padding: 2rem 7rem"> -->
          <section class="section">
            <h1 class="title pb-1" ref="offersSectionTitle">Ofertas</h1>
            <p class="subtitle" v-if="offers.length <= 0">Selecione um produto para ver as ofertas</p>
            <p class="subtitle pb-1" v-else>{{ offers.length }} ofertas encontradas</p>

            <div class="columns is-multiline">
              <div class="column is-3" v-for="offer in offers" :key="offer.id">
                <div class="card">
                  <div class="card-image">
                    <div class="box box-tag bg-primary" v-if="offer.deliveryUnit == 'CX'">
                      <span
                      class="iconify"
                      data-icon="uil-box"
                      data-inline="false"
                      width="48px"
                      height="48px"></span>
                      <span class="is-size-5">caixa</span>
                      <span class="is-size-5">{{ offer.quantity }} un</span>
                    </div>

                    <figure class="image is-200x200">
                      <img class="h-100" :src="offer.image64" :alt="offer.title" v-if="offer.image64">
                      <img class="h-100" src="~/static/images/no-picture.png" alt="Oferta sem imagem" v-else>
                    </figure>
                  </div>

                  <div
                  class="card-content card-offer"
                  :class="{
                    'min-height-2': (offer.promotionQuantity > 0 && offer.promotionQuantity2 > 0),
                    'min-height-3': (offer.promotionQuantity > 0 && offer.promotionQuantity2 > 0 && offer.promotionQuantity3 > 0),
                  }">
                    <div class="content is-flex flex-dir-col justify-between">
                      <p class="product-title is-size-5">{{ offer.title }}</p>

                      <p class="is-size-5 has-text-weight-bold text-primary-light">R$ {{ offer.price.toFixed(2) }} / {{ offer.unit }}</p>

                      <p class="product-price is-size-6 text-primary-light" v-if="offer.promotionQuantity > 0">
                        Acima de {{ offer.promotionQuantity }} {{ offer.unit }} por {{ offer.promotionPrice.toFixed(2) }} / {{ offer.unit }}
                      </p>

                      <p class="product-price is-size-6 text-primary-light" v-if="offer.promotionQuantity2 > 0">
                        Acima de {{ offer.promotionQuantity2 }} {{ offer.unit }} por {{ offer.promotionPrice2.toFixed(2) }} / {{ offer.unit }}
                      </p>

                      <p class="product-price is-size-6 text-primary-light" v-if="offer.promotionQuantity3 > 0">
                        Acima de {{ offer.promotionQuantity3 }} {{ offer.unit }} por {{ offer.promotionPrice3.toFixed(2) }} / {{ offer.unit }}
                      </p>

                      <div class="is-flex align-center pt-1rem">
                        <div>
                          <figure class="image is-64x64" style="margin-left: 0;">
                            <img class="is-rounded" :src="offer.supplier.logo" v-if="offer.supplier.logo != null">
                            <img class="is-rounded" src="~/static/images/supplier-teste.jpeg" v-else>
                          </figure>
                        </div>
                        
                        <div class="is-flex flex-dir-col align-start">
                          <span class="is-size-6">{{ offer.supplier.name }}</span>
                          <div class="product-rating">
                            <i class="material-icons"
                            :class="{'disabled': ( i > offer.supplier.rating )}" 
                            v-for="i in 5" :key="i">star</i>
                          </div>
                        </div>
                      </div>

                      <button
                      class="button is-danger light btn-comprar"
                      @click="handleBuyProduct(offer)">
                        COMPRAR
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </template>

    <template v-if="filter == 2">
      <section class="hero">
        <div class="hero-body is-paddingless">
          <section class="section section-suppliers">
            <swiper class="supplierSwiper" :options="swiperOption">
              <swiper-slide v-for="supplier in suppliersList" :key="supplier.id">
                <a @click.prevent>
                  <div :class="{
                    'card': true,
                    'is-active': true
                  }">
                    <div class="card-content">
                      <div class="is-flex flex-dir-col align-start">
                        <span class="is-size-6">{{ supplier.name }}</span>
                        <div class="product-rating">
                          <i class="material-icons"
                          :class="{'disabled': ( i > supplier.rating )}" 
                          v-for="i in 5" :key="i">star</i>
                        </div>
                        <p>{{ supplier.offersQuantity }} ofertas</p>
                      </div>
                    </div>
                  </div>
                </a>
              </swiper-slide>
              <div class="swiper-pagination supplier" slot="pagination"></div>
              <div class="swiper-button-prev supplier" slot="button-prev"></div>
              <div class="swiper-button-next supplier" slot="button-next"></div>
            </swiper>
          </section>
        </div>
      </section>
    </template>

    <Footer />
  </section>
</template>

<script>

import Header from '@/components/Header'
// import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Vue Awesome Swipper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import { mapActions, mapState } from 'vuex'

export default {
  layout: 'index-layout',
  components: {
    Header,
    Navbar,
    Footer,
    swiper,
    swiperSlide,
  },
  
  data() {
    return {
      filter: 1,
      selectedRestaurant: null,
      categoryId: null,
      currentProduct: null,
      offers: [],

      swiperOption: {
        loop: false,
        slidesPerView: 4,
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
    const { params } = this.$route

    if (params.hasOwnProperty('categoryId')) {
      setTimeout(() => {
        this.setCurrentCategory(params.categoryId)
        
        if (params.hasOwnProperty('productId')) {
          this.handleProduct(params.productId)
        }

      }, 1000)
    }

    this.setOverlay({ open: true, loading: true })

    setTimeout(() => {
      this.fetchRestaurantSuppliers()
      this.setOverlay({ open: false, loading: false })
    }, 1500)
  },
  
  computed: {
    ...mapState({
      suppliersList: state => state.RESTAURANT.restaurantSuppliers,
      currentRestaurant: state => state.RESTAURANT.currentRestaurant,
      currentCategory: state => state.PRODUCTS.currentCategory,
      cartProducts: state => state.CART.cartProducts
    })
  },

  methods: {
    ...mapActions([
      'fetchRestaurantSuppliers',
      'fetchRestaurantList',
      'fetchCategoriesList',
      'fetchOffersByProduct',
      'setCurrentCategory',
      'addCartProduct',
      'updateProductQuantity',
      'setOverlay',
    ]),

    setFilter(filter) {
      this.setOverlay({ open: true, loading: true })
      
      setTimeout(() => {
        this.filter = filter
      }, 100)

      setTimeout(() => {
        this.setOverlay({ open: false, loading: false })
      }, 500)
    },

    handleBuyProduct(offer) {
      const offerAux = { ...offer, quantidade: 1 }
      this.$router.push({ path: `/ofertas/${this.currentProduct}/${offer.offerId}`})
    },

    handleSubQuantity(offerId) {
      const quantidade = parseInt(this.$refs[`offer${offerId}Qtd`][0].value)
      const sub = _.subtract(quantidade, 1)
      this.$refs[`offer${offerId}Qtd`][0].value = (sub >= 1) ? sub : 1
    },

    handleAddQuantity(offerId) {
      const quantidade = parseInt(this.$refs[`offer${offerId}Qtd`][0].value)
      const add = _.add(quantidade, 1)
      this.$refs[`offer${offerId}Qtd`][0].value = (add <= 100) ? add : 100
    },

    handleAddProduct(offer) {
      const quantidade = parseInt(this.$refs[`offer${offer.offerId}Qtd`][0].value)
      
      if (quantidade < 1 || quantidade > 100) return false
      
      const isOfferAdded = this.cartProducts.find(o => o.offerId == offer.offerId)
      
      if (!isOfferAdded) {
        this.addCartProduct({ ...offer, quantidade })
      } else {
        this.updateProductQuantity({ item: offer, quantidade })
      }

      this.setOverlay({
        open: true,
        toast: { 
          title: 'Atenção', 
          content: 'Produto adicionado com sucesso!'
        }
      })
    },

    handleCurrentCategory() {
      this.currentProduct = null
      this.offers = []
    },

    setCategoryAndProduct(payload) {
      this.setOverlay({ iconBox: null })
      this.handleProduct(payload.productId)
    },

    async handleProduct(id) {
      this.setOverlay({ open: true, loading: true })

      await this.fetchOffersByProduct(id)
      const { PRODUCTS } = this.$store.state
      
      this.offers = PRODUCTS.offers
      this.currentProduct = id
      
      setTimeout(() => {
        this.setOverlay({ open: false, loading: false })
        this.$refs.offersSectionTitle.scrollIntoView()
      }, 100)
    },
  }
}
</script>

<style lang="scss">

.section-categories {
  background-image: url('https://www.sondadelivery.com.br/Arquivos/Banners/2620.jpg');
  padding: 3rem 7rem;
}

.productSwiper {
  .swiper-wrapper {
    height: 230px;
  }
  .swiper-pagination {
    // .swiper-pagination-bullet {
      // background: #fff;
      // opacity: 0.5;
    // }
    .swiper-pagination-bullet-active {
      background: #c54a4e;
      background: #fff;
      opacity: 1;
    }
  }
}

.swiper-button-prev.product,
.swiper-button-next.product {
  filter : brightness(0) contrast(10%);
  top: 30%;
}

.supplierSwiper {
  padding: 1rem 4.5rem 0 4.1rem;
  .swiper-wrapper {
    height: 250px;
  }
  .swiper-pagination {
    .swiper-pagination-bullet-active {
      background: #c54a4e;
      opacity: 1;
    }
  }
}

.swiper-button-prev.supplier,
.swiper-button-next.supplier {
  filter : brightness(0) contrast(10%);
  top: 38%;
}

.card-offer {
  min-height: 320px;
  // padding-bottom: 0;

  &.min-height-2 {
    min-height: 350px;
  }

  &.min-height-3 {
    min-height: 380px;
  }

  .content {
    .btn-comprar {
      bottom: 1rem;
      position: absolute;
      width: 87%;
    }
  }
}

</style>