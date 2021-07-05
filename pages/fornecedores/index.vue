<template>
  <div id="fornecedores">
    <NavbarSuppliers @setCurrentGroup="handleCurrentGroup" />

    <section class="section" v-if="!currentSupplier">
      <h1 class="subtitle">
        Selecione um fornecedor para ver as ofertas
      </h1>
      <button class="button is-danger light" @click="showModal = true">
        Selecionar fornecedor
      </button>
    </section>

    <section class="section" v-if="currentSupplier && currentGroup">

      <div class="is-flex justify-between align-center mb-2">
        <div>
          <p class="title text-primary-light">{{ currentGroup.title }}</p>

          <p class="title mb-1" ref="offersSectionTitle">Ofertas</p>
          <p class="subtitle mb-1">{{ currentGroup.offers.length }} ofertas encontradas</p>
        </div>

        <div class="box">
          <div class="is-flex align-center">
            <div class="mr-2">
              <figure class="image is-96x96">
                <img class="is-rounded" src="~/static/images/supplier-teste.jpeg">
              </figure>
            </div>
            <div class="is-flex flex-dir-col align-start">
              <h1 class="is-size-6">{{ currentSupplier.supplier.name }}</h1>
              <div class="product-rating">
                <i class="material-icons"
                :class="{'disabled': ( i > currentSupplier.supplier.rating )}" 
                v-for="i in 5" :key="i">star</i>
              </div>
              <span class="is-size-6">{{ currentSupplier.supplier.offersQuantity }} ofertas</span>
            </div>
          </div>
          
          <button class="button is-danger light" @click="showModal = true">
            Trocar fornecedor
          </button>
        </div>
      </div>

      <div class="columns is-multiline">
        <div class="column is-3" v-for="offer in currentGroup.offers" :key="offer.id">
          <div class="card">
            <div class="card-image">
              <div class="box box-tag bg-primary" v-if="offer.deliveryUnit == 'CX'">
                <span 
                class="iconify" 
                data-icon="uil-box" 
                data-inline="false" 
                width="48px" 
                height="48px">
                </span>
                <span class="is-size-5">caixa</span>
                <span class="is-size-5">{{ offer.quantity }} un</span>
              </div>

              <figure class="image is-200x200">
                <img :src="offer.image64" :alt="offer.title" v-if="offer.image64">
                <img src="~/static/images/no-picture.png" alt="Oferta sem imagem" v-else>
              </figure>
            </div>

            <div
            class="card-content card-offer"
            :class="{
              'min-height-2': (offer.promotionQuantity > 0 && offer.promotionQuantity2 > 0),
              'min-height-3': (offer.promotionQuantity > 0 && offer.promotionQuantity2 > 0 && offer.promotionQuantity3 > 0),
            }"
            >
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
                  </div>
                </div>

                <button class="button is-danger light btn-comprar" @click="handleBuyProduct(offer)">
                  COMPRAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="modal" :class="{'is-active': showModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Fornecedores</p>
            <button class="delete" aria-label="close" @click="showModal = false"></button>
          </header>
          <section class="modal-card-body">
            <p class="subtitle mb-1">Selecione um fornecedor para ver suas ofertas</p>

            <div class="field">
              <label class="label" for="txtSupplier">Busque pelo nome do fornecedor:</label>
              <div class="control mb-2">
                <input class="input" type="text" name="txtSupplier" id="txtSupplier" v-model="txtSupplier">
              </div>
            </div>

            <p class="mb-1rem">{{ getSuppliersList.length }} registros encontrados</p>

            <div class="is-flex justify-between align-center border-divider" v-for="supplier in getSuppliersList" :key="supplier.supplierId">
              <div class="is-flex align-center mt-2 mb-2">
                <div class="mr-1rem">
                  <figure class="image is-64x64" style="margin-left: 0;">
                    <img class="is-rounded" src="~/static/images/supplier-teste.jpeg">
                  </figure>
                </div>
                
                <div class="is-flex flex-dir-col align-start">
                  <span class="is-size-6">{{ supplier.name }}</span>
                  <div class="product-rating">
                    <i class="material-icons"
                    :class="{'disabled': ( i > supplier.rating )}" 
                    v-for="i in 5" :key="i">star</i>
                  </div>
                  <span class="is-size-6">{{ supplier.offersQuantity }} ofertas</span>
                </div>
              </div>
              <div>
                <button class="button is-danger light" @click="handleRestaurantSupplier(supplier.supplierId)">Selecionar</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavbarSuppliers from '@/components/NavbarSuppliers'
import { mapActions, mapState } from 'vuex'

export default {
  layout: 'suppliers-layout',

  components: {
    NavbarSuppliers,
  },

  data() {
    return {
      showModal: true,
      txtSupplier: '',

      groups: [],
      currentGroup: null,
    }
  },

  async created() {
    await this.fetchRestaurantSuppliers()
  },

  computed: {
    ...mapState({
      suppliersList: state => state.RESTAURANT.restaurantSuppliers,
      currentSupplier: state => state.RESTAURANT.currentRestaurantSupplier
    }),

    getSuppliersList() {
      return this.suppliersList.filter(
        supplier => !this.txtSupplier || supplier.name.toLowerCase().includes(this.txtSupplier.toLowerCase())
      )
    }
  },

  methods: {
    ...mapActions([
      'fetchRestaurantSuppliers',
      'fetchRestaurantSupplier',
      'setOverlay'
    ]),

    handleBuyProduct(offer) {
      const offerAux = { ...offer, quantidade: 1 }
      this.$router.push({ path: `/ofertas/${offer.productId}/${offer.offerId}`})
    },

    handleCurrentGroup(groupId) {
      this.setOverlay({ open: true, loading: true })
      this.currentGroup = this.groups.find(g => g.id == groupId)

      setTimeout(() => {
        this.setOverlay({ open: false, loading: false })
        this.$refs.offersSectionTitle.scrollIntoView()
      }, 100)
    },

    async handleRestaurantSupplier(supplierId) {
      this.setOverlay({ open: true, loading: true })

      await this.fetchRestaurantSupplier(supplierId)

      setTimeout(() => {
        this.groups = this.currentSupplier.groups
        this.currentGroup = this.currentSupplier.groups[0]
        this.showModal = false
        this.setOverlay({ open: false, loading: false })

        setTimeout(() => {
          this.$refs.offersSectionTitle.scrollIntoView()
        }, 100)

      }, 1000)
    }
  }
}
</script>

<style>

.border-divider {
  box-shadow: 0 4px 8px -10px;
  border-top: 1px solid #dbdbdb;
}

</style>