<template>
  <section id="modelos">
    <section class="hero">
      <div class="hero-body">
        <div class="section section-models">
          <h1 class="title">Meus Modelos</h1>

          <template v-if="!models || models.length <= 0">
            <p>Sem modelos salvos!</p>
            <p>Aqui você salva seus pedidos mais comuns e pede eles de novo da forma mais rápida.</p>
          </template>

          <swiper class="swiperModelos" :options="swiperOption" v-else>
            <swiper-slide v-for="model in models" :key="model.id">
              <a @click.prevent="handleSelectModel(model)">
                <div :class="{
                  'box': true,
                  'is-active': currentModel && currentModel.id == model.id
                }">
                  <p class="is-size-5 has-text-weight-bold mb-1">{{ model.id }} - {{ model.title }}</p>
                  <p>{{ formatModelQtdProducts(model.orderModelItems.length) }}</p>
                </div>
              </a>
            </swiper-slide>
            <div class="swiper-pagination modelos" slot="pagination"></div>
            <div class="swiper-button-prev modelos" slot="button-prev"></div>
            <div class="swiper-button-next modelos" slot="button-next"></div>
          </swiper>

          <section class="section section-empty-models" v-if="!currentModel">
            <h2 class="subtitle is-4">Selecione um modelo para visualizar os itens.</h2>
          </section>

          <section class="section section-current-model" ref="currentModelSection" v-else>
            <p class="title has-text-weight-bold">
              Modelo <span class="text-primary-light">#{{ currentModel.id }}</span> - {{ currentModel.title }}
            </p>

            <div class="order-model-items mb-1rem">
              <p class="subtitle is-marginless">Lista de itens</p>
              <div>
                <button class="button button-primary mr-1rem" @click="showModal = true">CRIAR PEDIDO</button>
                <button class="button is-danger light" @click="handleDeleteOrderModel">DELETAR MODELO</button>
              </div>
            </div>

            <div class="box">
              <table class="table is-fullwidth is-striped">
                <thead>
                  <tr>
                    <th>Produto / Fornecedor</th>
                    <th class="">Qtd.</th>
                    <th class="has-text-right">Preço</th>
                    <th class="has-text-centered">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in currentModel.orderModelItems" :key="index">
                    <td>
                      <p>{{ item.offer.title }}</p>
                      <p class="is-size-7">{{ item.offer.supplier.name }}</p>
                    </td>
                    <td>{{ item.quantity }} / {{ item.offer.unit }}</td>
                    <td class="has-text-right">{{ item.offer.price.toFixed(2) }} / {{ item.offer.unit }}</td>
                    <td class="has-text-centered">
                      <a @click.prevent="handleRemoveOrderModeItem(item.offer.offerId)">
                        <span class="iconify" data-icon="simple-line-icons:close" data-width="28" data-height="28"></span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div> <!-- // section -->
      </div> <!-- // hero-body -->
    </section> <!-- // hero -->

    <section v-if="showModal">
      <div class="modal" :class="{'is-active': showModal}">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="box">
            <div class="is-flex justify-between">
              <p class="title text-primary-light">Atenção!</p>
              <a aria-label="close" @click.prevent="showModal = !showModal">
                <span class="iconify" data-icon="simple-line-icons:close" data-width="28" data-height="28"></span>
              </a>
            </div>

            <p class="is-size-5 mb-2">
              Os preços dos produtos mudam diariamente. Você gostaria de pesquisar os melhores preços do dia
              para o seu modelo de pedido ou prefere apenas adicioná-lo ao carrinho?
            </p>
            <button class="button is-danger light" @click="handleModelSearchPrice">
              PESQUISAR PREÇOS
            </button>
          </div>
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

export default {
  components: {
    swiper,
    swiperSlide,
  },
  
  data() {
    return {
      loading: true,
      showModal: false,
      currentModel: null,

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
    setTimeout(() => {
      this.setOverlay({ open: true, loading: true })

      setTimeout(() => {
        this.fetchModels()
        this.setOverlay({ open: false, loading: false })
      }, 1000)
      
    }, 100)
  },

  computed: {
    ...mapState({
      models: state => state.MODELS.modelsList
    })
  },

  methods: {
    ...mapActions([
      'fetchModels',
      'setModels',
      'setCurrentModel',
      'deleteOrderModel',
      'setOverlay',
    ]),

    handleSelectModel(model) {
      const cloned = _.cloneDeep(model)
      this.currentModel = cloned
      this.setCurrentModel(cloned)
      
      setTimeout(() => {
        this.$refs.currentModelSection.scrollIntoView()
      }, 100)
    },

    handleModelSearchPrice() {
      this.$router.push({ name: 'modelo-pesquisar-precos' })
    },

    async handleDeleteOrderModel() {
      if (confirm('Deseja realmente deletar este modelo permanentemente?')) {
        this.setOverlay({ open: true, loading: true })

        await this.deleteOrderModel(this.currentModel.id).then(response => {
          const { data } = response

          this.setOverlay({ open: false, loading: false })

          if (data == 'Ok') {
            this.setOverlay({
              open: true,
              toast: { 
                title: 'Atenção', 
                content: 'Modelo deletado com sucesso!'
              }
            })
          } else {
            this.setOverlay({
              open: true,
              toast: {
                title: 'Atenção', 
                content: 'Falha na tentativa de deletar o modelo'
              }
            })
          }

        }).catch(error => {
          
          this.setOverlay({
            open: true,
            toast: {
              title: 'Atenção', 
              content: 'Erro na tentativa de deletar o modelo'
            }
          })
        })
      }
    },

    handleRemoveOrderModeItem(offerId) {
      if (this.currentModel.orderModelItems.length <= 1) {
        this.setOverlay({
          open: true,
          toast: {
            title: 'Atenção', 
            content: 'Não é possível remover todos os itens do modelo. <br/>Para isso delete o modelo por completo.'
          }
        })

        return false
      }

      let modelAux = _.omit(this.currentModel, 'orderModelItems')
      modelAux.orderModelItems = this.currentModel.orderModelItems.filter(offer => offer.offerId != offerId)

      this.currentModel = modelAux
      this.setCurrentModel(modelAux)
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
#modelos {
  .hero {
    .hero-body {
      .section {
        padding: 0 5rem;
      }
    }
  }
}

/* .section-models {
  padding: 0 5rem;
} */

.section-current-model {
  padding: 3rem 0 0 0 !important;
}

.section-empty-models {
  padding: 3rem 0 0 0 !important;
}

.swiperModelos {
  padding: 1rem 5rem;
  .swiper-wrapper {
    height: 150px;
  }
  .swiper-pagination {
    .swiper-pagination-bullet-active {
      background: #c54a4e;
      opacity: 1;
    }
  }
}

.swiper-button-prev.modelos,
.swiper-button-next.modelos {
  filter : brightness(0) contrast(10%);
  top: 37%;
}

.order-model-items {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 425px) {
  .order-model-items {
    flex-direction: column;
  }

  .modal-content {
    padding: 0 1rem;
  }
}

.box.is-active {
  border: 1px solid #417e86;
}
</style>