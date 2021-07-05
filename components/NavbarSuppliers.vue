<template>
  <section class="hero main-menu">
    <div class="hero-body">
      <div class="level bg-primary-dark">

        <p class="has-text-white" v-if="!currentSupplier">
          Nenhuma categoria encontrada
        </p>

        <template v-else>
          <!-- ALL CATEGORIES -->
          <div class="level-item level-item-all-sections__supplier">
            <a class="is-flex align-center has-text-white" @click.prevent="toggleAllSections">
              <MenuButton /> Todas as seções
            </a>
            <div class="all-sections-box__supplier" :class="{'open': (overlay.iconBox == 'allSections')}">
              <ul class="all-sections-list__supplier">
                <li class="is-flex align-center justify-between" v-for="group in currentSupplier.groups" :key="group.id">
                  <a @click.prevent="handleCurrentGroup(group.id)">{{ group.title }}</a>
                  <span class="iconify" data-icon="simple-line-icons:arrow-right"></span>
                </li>
              </ul>
            </div>
          </div>
        
          <!-- GET SUPPLIER CATEGORIES -->
          <div class="level-item" v-for="group in getGroups" :key="group.id">
            <a class="has-text-white" @click.prevent="handleCurrentGroup(group.id)">{{ group.title }}</a>
          </div>
        </template>
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
    return {}
  },

  async created() {
    await this.fetchRestaurantList()
    await this.fetchCategoriesList()
  },

  computed: {
    ...mapState({
      overlay: 'overlay',
      currentSupplier: state => state.RESTAURANT.currentRestaurantSupplier,
    }),

    getGroups() {
      const { screen: { width } } = window
      return width > 768 ? this.currentSupplier.groups : this.currentSupplier.groups.slice(0, 4)
    }
  },

  methods: {
    ...mapActions([
      'fetchRestaurantList',
      'fetchCategoriesList',
      'setOverlay',
    ]),

    handleCurrentGroup(groupId) {
      this.$emit('setCurrentGroup', groupId)
    },

    toggleAllSections() {
      this.setOverlay({ open: true, iconBox: 'allSections' })
    },
  }
}
</script>

<style lang="scss">

.all-sections-box__supplier {
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

.all-sections-box__supplier::before {
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

.all-sections-box__supplier.open {
  visibility: visible;
  opacity: 1;
}

.all-sections-list__supplier {
  width: 100%;
}

.all-sections-list__supplier {
  li {
    padding: 5px .9rem;
    // padding-left: .9rem;
    // padding-top: 5px;
    // padding-bottom: 5px;
  }
}

.all-sections-list__supplier {
  li:hover {
    background-color: #eee;
  }
}

.all-sections-list__supplier {
  li {
    a {
      width: 100%;
    }
  }
}

.all-sections-box__supplier.full {
  width: 50vw;
}

.all-sections-box__supplier.full .all-sections-list__supplier {
  width: 35%;
}

.all-sections-list__supplier-products {
  max-height: 320px;
  overflow-y: auto;
}

.all-sections-box__supplier.full .all-sections-list__supplier-products {
  border-left: 1px solid #eee;
  width: 65%;
  padding-left: 1rem;
}

.all-sections-list__supplier-products {
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
        // justify-content: flex-start;
      }

      .level-item-all-sections__supplier {
        padding-left: 0;
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .hero.main-menu {
    .hero-body {
      .level {
        .level-item:not(.level-item-all-sections__supplier) {
          display: none;
        }

        .level-item-all-sections__supplier {
          .all-sections-box__supplier {
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