<template>
  <section id="header">
    <Overlay ref="overlay" />

    <!-- <section class="container header-container is-fullhd is-marginless has-background-light">
      <ul class="is-flex">
        <li class="pr-2">
          <a href>Como Comprar</a>
        </li>
        <li class="pr-2">
          <a href>Entrega</a>
        </li>
        <li class="pr-2">
          <a href>Formas de Pagamento</a>
        </li>
        <li class="pr-2">
          <a href>Lojas Físicas</a>
        </li>
        <li class="pr-2">
          <a href>Central de Atendimento</a>
        </li>
      </ul>
    </section> -->
    
    <section class="hero">
      <div class="hero-body">
        <div class="section section-header">
          <div class="columns header-cols is-vcentered">
            <!-- <div class="column is-4-tablet is-3 col-logo"> -->
            <!-- <div class="column is-2 col-logo"> -->
            <div class="column is-2 has-text-centered-mobile">
              <div class="is-flex flex-dir-col">
                <nuxt-link to="/">
                  <div>
                    <img
                      src="~/static/images/logo-marketplace-branco.svg"
                      alt="Logo"
                      width="80px"
                      height="80px"
                    />
                  </div>
                  <div>
                    <span class="title text-primary has-text-weight-normal ml-1rem">NOME_DA_EMPRESA</span>
                  </div>
                </nuxt-link>
              </div>
            </div>

            <!-- <div class="column is-4-tablet is-6 col-search"> -->
            <!-- <div class="column is-7 col-search pr-3"> -->
            <div class="column">
              <div class="filter-wrapper">
                <p class="is-size-4 mr-1rem mb-3">Restaurante:</p>
                <a class="is-size-4 is-flex align-center mb-3" @click.prevent="showRestaurantModal = true">
                  {{ currentRestaurant.name }}
                  <span class="iconify" data-icon="ion:md-arrow-dropdown" data-width="32" data-height="32"></span>
                </a>
              </div>
              
              <div class="search-wrapper">
                <div class="field search-field"
                :class="{'always-on-top': (overlay.iconBox == 'search')}"
                >
                  <div class="control has-icons-left">
                    <input
                      class="input is-large is-expanded is-danger placeholder-dark"
                      type="text"
                      placeholder="O que você deseja buscar?"
                      v-model="textSearch"
                      @keyup.enter="saveSearch"
                      @focus="fadeSearchBox"
                    >
                    <span class="icon is-left">
                      <font-awesome-icon :icon="['fas', 'search']" />
                    </span>
                  </div>
                </div>

                <div class="box search-box" :class="{'open': (overlay.iconBox == 'search')}">
                  <div class="search-box-results">
                    <div class="search-box-results__words" :class="{'border': textSearch.length > 0}">
                      
                      <template v-if="!textSearch">
                        <p class="subtitle has-text-dark has-text-weight-semibold">Você buscou:</p>
                        <ul v-if="searchHistory.length > 0">
                          <li v-for="(item, key) in searchHistory" :key="key">{{ item }}</li>
                        </ul>
                        <p v-else>Não há histórico de busca.</p>
                      </template>

                      <template v-if="textSearch">
                        <template v-if="!searchLoading && getSearchResults.length > 0">
                          <p class="subtitle has-text-dark has-text-weight-semibold">Você quis dizer:</p>
                          <ul>
                            <li v-for="(offer, key) in getSearchResults" :key="key">
                              <a @click.prevent="handleBuyProduct(offer)">{{ offer.title }}</a>
                            </li>
                          </ul>
                        </template>
                        
                        <p v-else-if="!searchLoading && getSearchResults.length <= 0">Nenhum produto encontrado para <b>{{ textSearch }}</b></p>

                        <p v-else>Buscando...</p>

                      </template>
                    </div>

                    <div class="search-box-results__products" v-if="!searchLoading && textSearch && getSearchResults.length > 0">
                      <p class="subtitle has-text-dark has-text-weight-semibold">Produtos sugeridos:</p>
                      <div class="columns is-multiline">
                        <div class="column is-full" v-for="offer in getSearchResults" :key="offer.id">
                          <div class="is-flex justify-between align-center">
                            <div class="is-flex align-center">
                              <div class="box-product-image mr-1rem">
                                <figure class="image is-128x128">
                                  <img :src="offer.image64" :alt="offer.title" v-if="offer.image64">
                                  <img src="~/static/images/no-picture.png" alt="Oferta sem imagem" v-else>
                                </figure>
                              </div>
                              <div class="box-product-content is-flex flex-dir-col align-start">
                                <p class="product-title has-text-weight-bold">{{ offer.title }}</p>
                                <p class="product-offers-price text-primary-light has-text-weight-bold is-size-6">R$ {{ offer.price.toFixed(2) }}</p>
                                <div class="box-supplier mt-1">
                                  <p class="is-size-6">{{ offer.supplier.name }}</p>
                                  <div class="product-rating">
                                    <i class="material-icons"
                                    :class="{'disabled': ( i > offer.supplier.rating )}" 
                                    v-for="i in 5" :key="i">star</i>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="box-arrow ml-2 mr-1rem">
                              <a @click.prevent="handleBuyProduct(offer)">
                                <span class="iconify" data-icon="simple-line-icons:arrow-right" data-width="28" data-height="28"></span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="column is-full-mobile is-3 col-icons"> -->
            <!-- <div class="column is-3 col-icons pl-3"> -->
            <div class="column">
              <div class="columns is-mobile is-multiline">
                <div class="column is-4-mobile is-4-tablet">
                  <a
                    class="is-flex flex-dir-col align-center justify-between"
                    @click.prevent="handleGoTo('index')"
                  >
                    <span class="iconify" data-icon="ant-design:percentage-outline" width="32" height="32"></span>
                    <span class="is-size-7 pt-1">OFERTAS</span>
                  </a>
                </div>

                <div class="column is-4-mobile is-4-tablet">
                  <nuxt-link class="is-flex flex-dir-col align-center justify-between" to="/modelos">
                    <span class="iconify" data-icon="whh:listalt" width="32" height="32"></span>
                    <span class="is-size-7 pt-1">MODELOS</span>
                  </nuxt-link>
                </div>

                <!-- <div class="level-item col-icons-item"> -->
                <div class="column is-4-mobile is-4-tablet">
                  <nuxt-link class="is-flex flex-dir-col align-center justify-between" to="/carrinho">
                    <div class="cart-icon-badge" v-if="cartTotalProducts > 0">
                      <span>{{ cartTotalProducts }}</span>
                    </div>
                    <img src="~/static/images/shopping-cart.svg" alt="Carrinho" width="40" height="40" style="padding-bottom: 1px; margin-right: 5px">
                    <span class="is-size-7">CARRINHO</span>
                  </nuxt-link>
                </div>

                <!-- <div class="level-item">
                  <nuxt-link class="is-flex flex-dir-col align-center justify-between" to="/carrinho">
                    <div class="cart-icon-badge" v-if="cartTotalProducts > 0">
                      <span>{{ cartTotalProducts }}</span>
                    </div>
                    <span class="iconify" data-icon="bytesize:cart" width="32" height="32"></span>
                    <span class="is-size-7 pt-1">CARRINHO</span>
                  </nuxt-link>
                </div> -->

                <div class="column is-4-mobile is-4-tablet">
                  <nuxt-link class="is-flex flex-dir-col align-center justify-between" to="/entregas">
                    <span class="iconify" data-icon="simple-line-icons:social-dropbox" width="32" height="32"></span>
                    <span class="is-size-7 pt-1">ENTREGAS</span>
                  </nuxt-link>
                </div>

                <div class="column is-4-mobile is-4-tablet">
                  <a class="is-flex flex-dir-col align-center justify-between" @click="handleGoTo('fornecedores')">
                    <span class="iconify" data-icon="feather:users" width="32" height="32"></span>
                    <span class="is-size-7 pt-1 pl-1">FORNECEDORES</span>
                  </a>
                </div>

                <!-- <div class="column is-4-mobile is-4-tablet">
                  <a class="is-flex flex-dir-col align-center justify-between" @click.prevent="handleLogout">
                    <span class="iconify" data-icon="simple-line-icons:logout" width="32" height="32"></span>
                    <span class="is-size-7 pt-1 pl-1">SAIR</span>
                  </a>
                </div> -->

                <div
                  class="column is-4-mobile is-4-tablet"
                  :class="{'always-on-top': (overlay.iconBox == 'login')}"
                  @click="handleGoTo('perfil')"
                >
                  <a
                    class="is-flex flex-dir-col align-center justify-between"
                    href="#"
                    @click="handleGoTo('perfil')"
                  >
                    <!-- <span class="iconify" data-icon="fa:user-o" width="32" height="32"></span> -->
                    <span class="iconify" data-icon="fa-regular:user" width="32" height="32"></span>
                    <span class="is-size-7 pt-1">PERFIL</span>

                    <!-- <span class="is-size-7 pt-1" v-if="!user.id">ENTRAR</span> -->
                    <!-- <span class="is-size-7 pt-1" v-else>OLÁ, {{ getUserFirstName }}</span> -->
                  </a>

                  <!-- IF USER IS NOT LOGGED -->

                  <!-- <div class="icon-box login-box" :class="{'open': (overlay.iconBox == 'login')}" v-if="!user.id">
                    <div class="pb-1">
                      <button class="button is-danger is-fullwidth">Entrar</button>
                    </div>
                    <div class="pb-1">
                      <span>ou</span>
                    </div>
                    <div class="pb-1-5">
                      <a class="button is-facebook is-fullwidth">
                        <span class="icon">
                          <i class="fab fa-facebook"></i>
                        </span>
                        <span>Entrar com Facebook</span>
                      </a>
                    </div>
                    <div class="pb-1">
                      <a href>Cliente novo? Cadastrar</a>
                    </div>
                    <hr style="height: 1px; margin: 10px 0; background: #e5e5e5;">
                    <div class="is-flex justify-between">
                      <a class="has-text-dark" href>Minha conta</a>
                      <span style="border-left: 1px solid #e5e5e5;"></span>
                      <a class="has-text-dark" href>Meus pedidos</a>
                    </div>
                  </div> -->

                  <!-- IF USER IS LOGGED -->

                  <!-- <div class="icon-box login-box logged" :class="{'open': (overlay.iconBox == 'login')}"> -->
                    <!-- <ul> -->
                      <!-- <li class="is-flex align-center">
                        <span class="iconify" data-icon="ant-design:percentage-outline" width="23" height="23"></span>
                        <a class="pl-1" @click.prevent="handleGoTo('index')">Ofertas</a>
                      </li> -->

                      <!-- <li class="is-flex align-center">
                        <span class="iconify" data-icon="whh:listalt" width="20" height="20"></span>
                        <a class="pl-1" @click.prevent="handleGoTo('modelos')">Modelos</a>
                      </li> -->

                      <!-- <li class="is-flex align-center item-orders">
                        <span class="iconify" data-icon="simple-line-icons:social-dropbox" width="23" height="23"></span>
                        <a class="pl-1" @click.prevent="handleGoTo('entregas')">Entregas</a>
                      </li> -->

                      <!-- <li class="is-flex align-center">
                        <span class="iconify" data-icon="fa:user-o" width="23" height="23"></span>
                        <a class="pl-1" @click.prevent="handleGoTo('perfil')">Perfil</a>
                      </li> -->

                      <!-- <li class="is-flex align-center">
                        <span class="iconify" data-icon="simple-line-icons:logout" width="23" height="23"></span>
                        <a class="pl-1" @click.prevent="handleLogout">Sair</a>
                      </li> -->
                    <!-- </ul> -->
                  <!-- </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="modal" :class="{'is-active': showRestaurantModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Trocar restaurante de entrega</p>
            <button class="delete" aria-label="close" @click="showRestaurantModal = false"></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <label class="label" for="txtRestaurantSearch">Busque pelo nome do restaurante:</label>
              <div class="control mb-2">
                <input class="input" type="text" name="txtRestaurantSearch" id="txtRestaurantSearch" v-model="txtRestaurantSearch">
              </div>
            </div>

            <p class="mb-1rem">{{ getRestaurantsList.length }} registros encontrados</p>

            <div class="is-flex justify-between align-center border-divider pt-2 pb-2" v-for="restaurant in getRestaurantsList" :key="restaurant.supplierId">
              <p class="is-size-4">{{ restaurant.name }}</p>
              <button class="button is-danger light" @click="handleCurrentRestaurant(restaurant)">Selecionar</button>
            </div>
          </section>
        </div>
      </div>
    </section>
  </section>
</template>

<script>

import Overlay from '@/components/Overlay'

// Vue Awesome Swipper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import { mapActions, mapState } from 'vuex'
// import _ from 'lodash'

export default {
  components: {
    Overlay,
    swiper,
    swiperSlide,
  },

  data() {
    return {
      showRestaurantModal: false,
      txtRestaurantSearch: '',

      textSearch: '',
      searchLoading: false,
      searchHistory: [],
      
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
    const searchHistoryStore = sessionStorage.getItem('searchHistory')
    this.searchHistory = JSON.parse(searchHistoryStore) || []
    this.setOverlay({ open: false, iconBox: null })
  },

  watch: {
    textSearch() {
      if (!this.textSearch) {
        this.resetSearch()
      } else {
        this.searchLoading = true
        setTimeout(async () => {
          await this.fetchProductSearch(this.textSearch)
          this.searchLoading = false
        }, 2000)
      }
    }
  },

  computed: {
    ...mapState({
      overlay: 'overlay',
      user: state => state.USER.data,
      currentRestaurant: state => state.RESTAURANT.currentRestaurant,
      restaurantsList: state => state.RESTAURANT.restaurantsList,
      searchResults: state => state.PRODUCTS.search,
      cartTotalProducts: state => state.CART.cartProducts.length,
    }),

    getRestaurantsList() {
      return this.restaurantsList.filter(
        restaurant => !this.txtRestaurantSearch ||
        restaurant.name.toLowerCase().includes(this.txtRestaurantSearch.toLowerCase())
      )
    },

    getSearchResults () {
      return this.searchResults.length > 0 ? this.searchResults.slice(0, 6) : []
    },

    getUserFirstName() {
      const firstName = this.user.name.split(' ', 1)[0]
      return firstName.toUpperCase()
    },
  },

  methods: {
    ...mapActions([
      'setCurrentRestaurant',
      'fetchProductSearch',
      'resetSearch',
      'setOverlay',
      'logout',
    ]),

    handleCurrentRestaurant(restaurant) {
      this.setOverlay({ open: true, loading: true })
      
      setTimeout(() => {
        this.setCurrentRestaurant(restaurant)
        this.showRestaurantModal = false
        this.setOverlay({ open: false, loading: false })
      }, 100)
    },

    handleBuyProduct(offer) {
      const offerAux = { ...offer, quantidade: 1 }
      this.$router.push({ path: `/ofertas/${offer.productId}/${offer.offerId}`})
    },

    handleGoTo(routeName) {
      if (this.$route.name == routeName) {
        location.reload()
      }
      
      setTimeout(() => {
        this.setOverlay({ open: false, iconBox: null })
        this.$router.push({ name: routeName })
      }, 100)
    },

    handleLogout() {
      this.setOverlay({ open: false })
      this.logout()
      this.$router.push({ name: 'login' })
    },

    async saveSearch() {
      if (!this.textSearch) {
        this.resetSearch()
      } else {
        await this.fetchProductSearch(this.textSearch)
        this.searchHistory.push(this.textSearch)
        sessionStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
        location.reload()
      }
    },

    fadeSearchBox() {
      this.setOverlay({ open: true, iconBox: 'search' })

      if (!this.textSearch) {
        this.resetSearch()
      } else {
        setTimeout(async () => {
          await this.fetchProductSearch(this.textSearch)
        }, 2000)
      }
    },

    fadeIconBox(box) {
      this.setOverlay({ open: true, iconBox: box })
    },
  }
}
</script>

<style lang="scss">

#header {
  .hero {
    .hero-body {
      padding: 2rem 0;
      .section.section-header {
        padding: 0 5rem;
      }
    }
  }
}

.cart-icon-badge {
  position: absolute;
  width: 25px;
  height: 25px;
  line-height: 25px;
  border-radius: 50%;
  background: #e04646;
  color: #fff;
  text-align: center;
  top: auto;
  left: auto;
  right: auto;
  margin-left: 1rem;
}

.cart-icon-badge span {
  padding-right: -2px;
}

</style>