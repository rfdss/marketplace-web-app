<template>
  <div class="column is-8">
    <div class="box" v-if="currentMenu == 1">
      <div class="edit-profile-form">
        <div class="has-text-centered pr-3">
          <figure class="image is-128x128">
            <img src="~/static/images/no-picture.png" alt="Oferta sem imagem">
          </figure>
          <a @click.prevent="handleSaveImage">Alterar imagem</a>
        </div>

        <form @submit.prevent="handleSaveProfile">
          <div class="field">
            <label for="" class="label">Insira seu nome completo</label>
            <div class="control">
              <input class="input" type="text" placeholder="Nome" v-model="form.name">
            </div>
          </div>

          <div class="field">
            <label for="" class="label">Qual o seu CPF?</label>
            <div class="control">
              <input class="input" type="text" placeholder="CPF" v-model="form.cpf">
            </div>
          </div>

          <div class="field">
            <label for="" class="label">Qual o seu telefone?</label>
            <div class="control">
              <input class="input" type="text" placeholder="Telefone" v-model="form.phone">
            </div>
          </div>

          <div class="field">
            <label for="" class="label">Em qual e-mail podemos te contatar?</label>
            <div class="control">
              <input class="input" type="text" placeholder="E-mail" v-model="form.email">
            </div>
          </div>

          <div class="control pt-1">
            <button class="button is-danger light is-fullwidth">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- TODO: redirecionar para página individual com lista dos restaurantes -->
    <div class="box" v-if="currentMenu == 2">
      <button class="button is-dark mb-2 is-pulled-right" @click="handleNewRestaurant">CADASTRAR RESTAURANTE</button>

      <table class="table is-responsive is-fullwidth is-striped" v-if="user && user.customers.length > 0">
        <thead>
          <tr>
            <th class="has-text-weight-bold">ID</th>
            <th class="has-text-centered">Data Cadastro</th>
            <th>Restaurante</th>
            <th>&nbsp;</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="customer in user.customers" :key="customer.id">
            <td>{{ customer.id }}</td>
            
            <td class="has-text-centered">{{ formatDate(customer.insertDate) }}</td>
            
            <td>{{ customer.tradeName }}</td>

            <td class="has-text-right">
              <button
              class="button is-danger light is-small mr-1rem"
              @click="handleEditRestaurant(customer.id)">Editar</button>

              <button
              class="button is-danger light is-small"
              @click="handleDeleteRestaurant(customer.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="box" v-if="currentMenu == 3">
      <div class="edit-password-form">
        <form @submit.prevent="handleSavePassword">
          <div class="field">
            <label for="" class="label">Senha atual</label>
            <div class="control">
              <input class="input" type="password" v-model="changePasswordForm.currentPassword">
            </div>
          </div>

          <div class="field">
            <label for="" class="label">Nova senha</label>
            <div class="control">
              <input class="input" type="password" v-model="changePasswordForm.newPassword">
            </div>
          </div>

          <div class="field">
            <label for="" class="label">Confirme a nova senha</label>
            <div class="control">
              <input class="input" type="password" v-model="changePasswordForm.newPasswordConfirm">
            </div>
          </div>

          <div class="control pt-1">
            <button class="button is-danger light is-fullwidth">SALVAR</button>
          </div>
        </form>
      </div>
    </div>

    <div class="" v-if="currentMenu == 4">
      <div class="box">
        <p class="title is-5 text-primary-light">SOBRE O NOME_DA_EMPRESA</p>
        <!-- <p>O que é o NOME_DA_EMPRESA?</p> -->
        <ul>
          <li class="mb-1rem" v-for="item in questionsAbout" :key="item.key">
            <a
            :class="{
              'has-text-dark': currentItemKeyAbout !== item.key,
              'text-primary-light': currentItemKeyAbout === item.key
            }"
            @click.prevent="handleItemKeyAbout(item.key)">{{ item.title }}</a>
            <div class="box mt-1rem" v-if="currentItemKeyAbout == item.key">
              <p>{{ item.text }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="box">
        <p class="title is-5 text-primary-light">RESTAURANTE</p>
        <!-- <p>Quantos restaurantes eu posso cadastrar?</p> -->
        <ul>
          <li class="mb-1rem" v-for="item in questionsRestaurant" :key="item.key">
            <a 
            :class="{
              'has-text-dark': currentItemKeyRestaurant !== item.key,
              'text-primary-light': currentItemKeyRestaurant === item.key
            }"
            @click.prevent="handleItemKeyRestaurant(item.key)">{{ item.title }}</a>
            
            <div class="box mt-1rem" v-if="currentItemKeyRestaurant == item.key">
              <p>{{ item.text }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="box">
        <p class="title is-5 text-primary-light">PEDIDOS</p>
        <!-- <p>O que é o NOME_DA_EMPRESA?</p> -->
        <ul>
          <li class="mb-1rem" v-for="item in questionsOrder" :key="item.key">
            <a
            :class="{
              'has-text-dark': currentItemKeyOrder !== item.key,
              'text-primary-light': currentItemKeyOrder === item.key
            }"
            @click.prevent="handleItemKeyOrder(item.key)">{{ item.title }}</a>
            <div class="box mt-1rem" v-if="currentItemKeyOrder == item.key">
              <p>{{ item.text }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="box" v-if="currentMenu == 5">
      <p>Entre em contato conosco:</p>
      <p>
        WhatsApp: <a href="tel:+55 (00) 000000000">+55 (00) 000000000</a>
      </p>
    </div>

    <div class="box" v-if="currentMenu == 6">
      <Termos />
    </div>
  </div>
</template>

<script>

import Termos from '@/components/Termos'

import { mapActions, mapState } from 'vuex'
import _ from 'lodash'
import dayjs from 'dayjs'

import { questionsAbout, questionsRestaurant, questionsOrder } from '@/api/constants'

export default {
  components: {
    Termos,
  },
  
  props: {
    currentMenu: Number,
  },

  data() {
    return {
      questionsAbout,
      questionsRestaurant,
      questionsOrder,

      currentItemKeyAbout: null,
      currentItemKeyRestaurant: null,
      currentItemKeyOrder: null,

      form: {
        cpf: '',
        name: '',
        phone: '',
        email: '',
      },

      changePasswordForm: {
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      }
    }
  },

  created() {
    this.form.cpf = this.user.cpfCnpj
    this.form.name = this.user.name
    this.form.phone = `${this.user.telefoneDdd}${this.user.telefoneNumero}`
    this.form.email = this.user.email
  },

  computed: {
    ...mapState({
      user: state => state.USER.data,
      restaurantsList: state => state.RESTAURANT.restaurantsList
    })
  },

  methods: {
    ...mapActions([
      'register',
      'setUserData',
      'saveRestaurant',
      'fetchRestaurantList',
      'setOverlay'
    ]),

    handleNewRestaurant() {
      this.$router.push({ path: '/restaurantes/0' })
    },

    handleCurrentMenu(menuId) {
      this.currentMenu = menuId
    },

    handleSaveProfile() {
      this.setOverlay({ open: true, loading: true })

      let toastMsg = ''

      this.register(this.form).then(response => {
        let userAux = _.cloneDeep(this.user)

        userAux.name = this.form.name
        userAux.cpfCnpj = this.form.cpf
        userAux.telefoneDdd = this.form.phone.substring(0, 2)
        userAux.telefoneNumero = this.form.phone.substring(2, this.form.phone.length)
        userAux.email = this.form.email

        this.setUserData(userAux)
        this.setOverlay({ open: false, loading: false })

        toastMsg = 'Altarações salvas com sucesso!'
        this.setOverlay({
          open: true,
          toast: {
            title: 'Atenção!',
            content: toastMsg,
          }
        })

      }).catch(error => {
        this.setOverlay({ open: false, loading: false })

        toastMsg = 'Ocorreu um erro ao salvar as informações'
        this.setOverlay({
          open: true,
          toast: {
            title: 'Atenção!',
            content: toastMsg,
          }
        })
      })
    },

    handleEditRestaurant(customerId) {
      this.$router.push({ path: `/restaurantes/${customerId}` })
    },

    handleDeleteRestaurant(customerId) {
      alert('Ação desabilitada no momento')
    },

    handleSavePassword() {
      alert('Ação desabilitada no momento')
    },

    handleSaveImage() {
      alert('Ação desabilitada no momento')
    },

    handleItemKeyAbout(key) {
      this.currentItemKeyAbout = this.currentItemKeyAbout == key ? null : key
    },

    handleItemKeyRestaurant(key) {
      this.currentItemKeyRestaurant = this.currentItemKeyRestaurant == key ? null : key
    },

    handleItemKeyOrder(key) {
      this.currentItemKeyOrder = this.currentItemKeyOrder == key ? null : key
    },

    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    }
  }
}
</script>

<style lang="scss" scoped>

.edit-profile-form {
  display: flex;
  flex-direction: row;
}

.edit-password-form {
  display: flex;
  flex-direction: row;
}

.switch[type=checkbox] {
  margin: 1.7rem 0 1rem -15px;
  position: relative;
}

@media screen and (max-width: 425px) {
  .edit-profile-form,
  .edit-password-form {
    flex-direction: column;
  }
}

</style>