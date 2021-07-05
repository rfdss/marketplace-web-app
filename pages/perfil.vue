<template>
  <div id="profile">
    <section class="hero" ref="profileSection">
      <div class="hero-body">
        <div class="section section-profile">
          <p class="title">Menu</p>

          <div class="columns">
            <div class="column is-3">
              <aside class="menu">
                <div class="mb-1rem" v-for="menu in menus" :key="menu.id">
                  <p class="menu-label">{{ menu.label }}</p>
                  <ul class="menu-list">
                    <li v-for="item in menu.items" :key="item.id">
                      <a :class="{'is-active': currentMenu == item.id}" @click.prevent="handleCurrentMenu(item.id)">
                        {{ item.title }}
                      </a>
                    </li>
                  </ul>
                </div>

                <p class="menu-label">LOGOUT</p>
                <ul class="menu-list">
                  <li>
                    <a class="text-primary-light logout" @click.prevent="handleLogout">
                      Sair do aplicativo
                    </a>
                  </li>
                </ul>
              </aside>

              <!-- <div class="has-text-centered">
                <a class="is-size-5" @click.prevent>Sair do sistema</a>
              </div> -->
            </div>

            <div class="column is-1"></div>

            <nuxt-child :currentMenu="currentMenu" />
            
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  components: {},

  data() {
    return {
      currentMenu: 1,
      menus: [
        {
          id: 1,
          label: 'PERFIL',
          items: [
            { id: 1, title: 'Editar informações' },
            { id: 2, title: 'Restaurantes cadastrados' },
            { id: 3, title: 'Alterar senha' },
          ]
        },
        {
          id: 2,
          label: 'OUTROS',
          items: [
            { id: 4, title: 'FAQ' },
            { id: 5, title: 'Suporte' },
            { id: 6, title: 'Sobre' }            
          ]
        },
      ],
    }
  },

  created() {
    if (this.$route.params.hasOwnProperty('currentMenu')) {
      const { currentMenu } = this.$route.params
      this.currentMenu = currentMenu
    }
    
    setTimeout(() => this.$refs.profileSection.scrollIntoView(), 500)
  },

  methods: {
    ...mapActions([
      'logout',
      'setOverlay'
    ]),

    handleCurrentMenu(menuId) {
      if (menuId == 5) {
        window.open('https://api.whatsapp.com/send?text=NOME_DA_EMPRESA&phone=', '_blank')
      }
      
      this.currentMenu = menuId
    },

    handleLogout() {
      this.setOverlay({ open: false })
      this.logout()
      this.$router.push({ name: 'login' })
    },
  }
}
</script>

<style lang="scss">

#profile {
  .hero {
    .hero-body {
      .section {
        padding: 0 5rem;
      }
    }
  }
}

</style>