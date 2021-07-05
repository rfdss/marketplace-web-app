<template>
  <section id="entregas">
    <!-- <Header/> -->
    <!-- <Navbar/> -->

    <section class="hero" ref="sectionDeliveries">
      <div class="hero-body">
        <div class="section">
          <h1 class="title">Minhas entregas</h1>

          <div class="tabs is-toggle">
            <ul>
              <li :class="{'is-active': filter == 1}">
                <a @click.prevent="setFilter(1)">
                  <span>EM ANDAMENTO</span>
                </a>
              </li>
              <li :class="{'is-active': filter == 0}">
                <a @click.prevent="setFilter(0)">
                  <span>HISTÓRICO</span>
                </a>
              </li>
            </ul>
          </div>

          <template v-if="!deliveriesList || deliveriesList.length <= 0">
            <p>Sem entregas marcadas!</p>
            <p>Encomende os produtos que você desejar e acompanhe por aqui.</p>
          </template>

          <swiper class="deliverySwiper" :options="swiperOption" v-else>
            <swiper-slide v-for="delivery in deliveriesList" :key="delivery.id">
              <a @click.prevent="handleSelectDelivery(delivery)">
                <div :class="{
                  'card': true,
                  'is-active': currentDelivery && currentDelivery.id == delivery.id
                }">
                  <div class="card-content">
                    <div class="is-flex align-center justify-between mb-1rem">
                      <p class="is-size-5 has-text-weight-bold">#{{ delivery.id }} {{ formatDate(delivery.insertDate) }}</p>
                      <p class="tag is-danger">{{ delivery.status }}</p>
                    </div>

                    <div class="card-divider mb-1rem">
                      <p>{{ delivery.supplierTradeName }}</p>
                    </div>

                    <div>
                      <p>
                        <b>Data de Entrega:</b> {{ formatDate(delivery.deliveryDate) }}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </swiper-slide>
            <div class="swiper-pagination delivery" slot="pagination"></div>
            <div class="swiper-button-prev delivery" slot="button-prev"></div>
            <div class="swiper-button-next delivery" slot="button-next"></div>
          </swiper>

          <section class="section section-empty-deliveries" v-if="!currentDelivery && deliveriesList.length > 0">
            <h2 class="subtitle is-4">Selecione uma entrega para visualizar os itens.</h2>
          </section>

          <section class="section section-current-delivery" ref="currentDeliverySection" v-if="currentDelivery">
            <p class="title">
              Entrega <span class="text-primary-light">#{{ currentDelivery.id }}</span> {{ formatDate(currentDelivery.insertDate) }} <span class="tag is-danger">{{ currentDelivery.status }}</span>
            </p>

            <div class="delivery-list mb-1rem">
              <p class="subtitle is-marginless">Lista de itens</p>
              
              <button 
              class="button is-danger light"
              @click="showModal = !showModal"
              v-if="['PENDENTE', 'ACEITO'].includes(currentDelivery.status)"
              >CANCELAR</button>

            </div>

            <div class="box">
              <table class="table is-fullwidth is-striped">
                <thead>
                  <tr>
                    <th>Produto / Fornecedor</th>
                    <th class="">Qtd.</th>
                    <th class="has-text-right">Preço Unitário</th>
                    <th class="has-text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in currentDelivery.orderCustomerItems" :key="index">
                    <td>
                      <p>{{ item.offerTitle }}</p>
                      <p class="is-size-7">{{ currentDelivery.supplierTradeName }}</p>
                    </td>
                    <td>{{ item.quantity }} / {{ item.unit }}</td>
                    <td class="has-text-right">R$ {{ item.price.toFixed(2) }} / {{ item.unit }}</td>
                    <td class="has-text-right">R$ {{ item.totalItem.toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </section>

    <section v-if="showModal">
      <div class="modal" :class="{'is-active': showModal}">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="box">
            <div class="is-flex justify-between">
              <p class="title">Cancelar Pedido</p>
              <a aria-label="close" @click.prevent="showModal = !showModal">
                <span class="iconify" data-icon="simple-line-icons:close" data-width="28" data-height="28"></span>
              </a>
            </div>

            <form @submit.prevent="handleCancelDelivery">
              <div class="field">
                <label for="motivo" class="label">Escolha o motivo do cancelamento:</label>
                <div class="select is-dark">
                  <select name="motivo" id="motivo" v-model="formDeliveryCancel.motivo">
                    <option value="">Selecione...</option>
                    <option
                    v-for="motivo in motivosCancelamento" 
                    :key="motivo.key"
                    :value="motivo.value"
                    >{{ motivo.label }}</option>
                  </select>
                </div>
                <p class="help" v-if="hasMotivoError">* Campo obrigatório</p>
              </div>

              <div class="field">
                <label class="label has-text-weight-normal">Informa sua senha de usuário:</label>
                
                <div class="control">
                  <input 
                  v-model="formDeliveryCancel.password" 
                  class="input" 
                  type="password" 
                  style="width: auto"
                  />
                  <!-- <a @click.prevent="showPassword = !showModal" class="password-icon-eye">
                    <font-awesome-icon :icon="['far', 'eye']" />
                  </a> -->
                </div>
                <p class="help" v-if="hasPasswordError">* Campo obrigatório</p>
              </div>

              <button class="button is-danger light mt-1rem">
                CANCELAR PEDIDO
              </button>
            </form>
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

// Vue Awesome Swipper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import { mapActions, mapState } from 'vuex'
import { MOTIVOS_CANCELAMENTO } from '@/api/constants'

export default {
  components: {
    // Header,
    // Navbar,
    // Sidebar,
    // Footer,
    swiper,
    swiperSlide,
  },
  
  data() {
    return {
      showModal: false,
      showPassword: false,
      filter: 1,
      currentDelivery: null,

      formDeliveryCancel: {
        motivo: '',
        password: '',
      },

      hasMotivoError: false,
      hasPasswordError: false,
      
      motivosCancelamento: MOTIVOS_CANCELAMENTO,
      months: {
        '01': 'JAN',
        '02': 'FEV',
        '03': 'MAR',
        '04': 'ABR',
        '05': 'MAI',
        '06': 'JUN',
        '07': 'JUL',
        '08': 'AGO',
        '09': 'SET',
        '10': 'OUT',
        '11': 'NOV',
        '12': 'DEZ'
      },

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
    this.handleInit()
  },
  
  computed: {
    ...mapState({
      user: state => state.USER.data,
      deliveriesList: state => state.DELIVERIES.deliveriesList
    }),
  },

  methods: {
    ...mapActions([
      'fetchDeliveriesList',
      'saveOrderTicket',
      'setOverlay',
    ]),

    handleInit() {
      setTimeout(() => {
        this.setOverlay({ open: true, loading: true })

        setTimeout(() => {
          this.fetchDeliveriesList(this.filter)
          this.setOverlay({ open: false, loading: false })
          this.$refs.sectionDeliveries.scrollIntoView()
        }, 1000)

      }, 100)
    },

    setFilter(filter) {
      this.filter = filter
      this.currentDelivery = null
      this.handleInit()
    },

    handleSelectDelivery(delivery) {
      this.currentDelivery = delivery
      setTimeout(() => {
        this.$refs.currentDeliverySection.scrollIntoView()
      }, 100)
    },

    validateForm() {
      if (!this.formDeliveryCancel.motivo) this.hasMotivoError = true
      else this.hasMotivoError = false

      if (!this.formDeliveryCancel.password) this.hasPasswordError = true
      else this.hasPasswordError = false

      return (this.hasMotivoError || this.hasPasswordError) ? false : true
    },

    async handleCancelDelivery() {
      if (!this.validateForm()) return

      const objMotivo = this.motivosCancelamento.find(obj => obj.key == this.formDeliveryCancel.motivo)

      const objData = {
        orderSupplierId: this.currentDelivery.id,
        statusPersonId: this.user.id,
        ticketType: "CANCELAMENTO",
        description: objMotivo.label.toUpperCase(),
        status: "ABERTO",
        password: this.formDeliveryCancel.password
      }

      let toastMsg = 'Nenhuma mensagem definida'

      await this.saveOrderTicket(objData).then(response => {
        if (response.data == 'Ok') {
          toastMsg = 'Seu pedido de cancelamento foi enviado com sucesso.'
        } else if (data == 'ORDER_STATUS_NOT_VALID') {
          toastMsg = 'Este pedido não pode ser cancelado. Verifique o novo status do pedido'
        } else {
          toastMsg = 'Erro ao solicitar cancelamento. Tente novamente em alguns instantes ou entre em contato conosco.'
        }
        
        this.setOverlay({
          open: true,
          toast: {
            title: 'Atenção!',
            content: toastMsg,
            redirect: 'carrinho'
          }
        })
      }).catch(error => {
        toastMsg = error.response.data
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

    getPasswordType() {
      return !this.showPassword ? 'password' : 'text'
    },

    formatDate(date) {
      if (typeof(date) === 'undefined') return ''
      let split = date.split('T')
      let dateSplit = split[0].split('-')
      const strMonth = this.months[dateSplit[1]]
      return `(${dateSplit[2]}/${strMonth})`
    }
  }
}
</script>

<style lang="scss">

#entregas {
  .hero {
    .hero-body {
      .section {
        padding: 0 5rem;
      }
    }
  }
}

// .section-deliveries {
//   padding: 0 5rem;
// }

.section-current-delivery {
  padding: 3rem 0 0 0 !important;
}

.section-empty-deliveries {
  padding: 3rem 0 0 0 !important;
}

.delivery-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 425px) {
  .delivery-list {
    flex-direction: column;
  }
}

.card.is-active {
  border: 1px solid #417e86;
}

.card-divider {
  box-shadow: 0 4px 8px -10px;
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 1rem;
}

.deliverySwiper {
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

.swiper-button-prev.delivery,
.swiper-button-next.delivery {
  filter : brightness(0) contrast(10%);
  top: 38%;
}

.password-icon-eye {
  font-size: 1.5rem !important;
  position: absolute;
  right: 0;
  left: 93%;
  top: 0;
}

.help {
  margin: .40rem 0 1.5rem .40rem;
  color: red;
}

</style>