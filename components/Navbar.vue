<template>
  <section class="hero main-menu">

    <div class="hero-body">
      <div class="level bg-primary-dark">

        <!-- ALL CATEGORIES -->
        <div class="level-item level-item-all-sections">
          <a class="is-flex align-center has-text-white" @click.prevent="toggleAllSections">
            <MenuButton /> Todas as seções
          </a>
          <div class="all-sections-box" :class="{'open': (overlay.iconBox == 'allSections'), 'full': productsOpen}">
            <ul class="all-sections-list">
              <li class="is-flex align-center justify-between" v-for="category in categories" :key="category.id">
                <a @click.prevent="showCategoryProducts(category.id)">{{ category.title }}</a>
                <span class="iconify" data-icon="simple-line-icons:arrow-right"></span>
              </li>
            </ul>
            <ul class="all-sections-list-products" v-if="productsOpen && currentCategory && currentCategory.products.length > 0">
              <li class="is-flex align-center justify-between" v-for="product in currentCategory.products" :key="product.id">
                <a @click.prevent="handleSelectProduct(product.id)">{{ product.title }}</a>
              </li>
            </ul>
            <ul class="all-sections-list-products" v-else-if="productsOpen && currentCategory && currentCategory.products.length <= 0">
              <li class="is-flex align-center justify-between">
                <a @click.prevent>Nenhum produto para esta categoria</a>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- TEST GET CATEGORIES FROM API -->
        <div class="level-item" v-for="category in getCategories" :key="category.id">
          <a class="has-text-white" @click.prevent="handleCurrentCategory(category.id)">{{ category.title }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import MenuButton from '@/components/MenuButton'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    MenuButton,
  },
  data() {
    return {
      currentCategory: null,
      productsOpen: false,
    }
  },
  async created() {
    await this.fetchRestaurantList()
    await this.fetchCategoriesList()
  },

  computed: {
    ...mapState({
      overlay: 'overlay',
      categories: state => state.PRODUCTS.productsCategories
    }),

    getCategories() {
      const { screen: { width } } = window
      return width > 768 ? this.categories : this.categories.slice(0, 4)
    }
  },

  methods: {
    ...mapActions([
      'setCurrentCategory',
      'fetchRestaurantList',
      'fetchCategoriesList',
      'setOverlay',
    ]),

    showCategoryProducts(categoryId) {
      this.currentCategory = this.categories.find(c => c.id == categoryId)
      this.productsOpen = true
    },

    handleSelectProduct(productId) {
      const categoryId = this.currentCategory.id
      
      if (this.$route.name != 'index') {
        this.$router.push({ name: 'index', params: { categoryId, productId }})
      } else {
        this.$emit('setCategoryAndProduct', { categoryId, productId })
      }
    },

    handleCurrentCategory(categoryId) {
      this.setCurrentCategory(categoryId)
      this.$emit('setCurrentCategory', true)
      
      if (this.$route.name != 'index') {
        this.$router.push({ name: 'index', params: { categoryId }})
      }
    },

    toggleAllSections() {
      this.setOverlay({ open: true, iconBox: 'allSections' })
    },
  }
}
</script>

<style lang="scss">

.all-sections-box {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;

  width: 15rem;
  left: 0;
  background-color: #fff;
  border-radius: 0;
  content: "";
  height: auto;
  margin: 0;
  top: 95%;
  position: absolute;
  /* padding: 1.5rem .9rem .9rem .9rem; */
  padding: 1.5rem 0 .3rem 0;
  transition: visibility 0.2s, opacity 0.2s linear;
  visibility: hidden;
  z-index: 9999;
}

.all-sections-box::before {
  width: 0;
  height: 0;
  content: "";
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid #fff;
  top: -12px;
  position: absolute;
  right: auto;
  left: 0.5rem;
}

.all-sections-box.open {
  visibility: visible;
  opacity: 1;
}

.all-sections-list {
  width: 100%;
}

.all-sections-list {
  li {
    padding: 5px .9rem;
    // padding-left: .9rem;
    // padding-top: 5px;
    // padding-bottom: 5px;
  }
}

.all-sections-list {
  li:hover {
    background-color: #eee;
  }
}

.all-sections-list {
  li {
    a {
      width: 100%;
    }
  }
}

.all-sections-box.full {
  width: 50vw;
}

.all-sections-box.full .all-sections-list {
  width: 35%;
}

.all-sections-list-products {
  max-height: 320px;
  overflow-y: auto;
}

.all-sections-box.full .all-sections-list-products {
  border-left: 1px solid #eee;
  width: 65%;
  padding-left: 1rem;
}

.all-sections-list-products {
  li {
    padding: 5px .9rem;
  }
}

.hero.main-menu {
  .hero-body {
    .level {
      display: flex;
      align-items: center;

      .level-item {
        margin-bottom: 0;
        padding: 1rem;
      }

      .level-item-all-sections {
        padding-left: 0;
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .hero.main-menu {
    .hero-body {
      .level {
        .level-item:not(.level-item-all-sections) {
          display: none;
        }

        .level-item-all-sections {
          .all-sections-box {
            ::before {
              left: 1.7rem;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .hero.main-menu {
    .hero-body {
      .level {
        .level-item {
          justify-content: flex-start;
        }
      }
    }
  }
}

</style>