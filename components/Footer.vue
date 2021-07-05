<template>
  <footer class="footer has-background-white">
    <div class="content">
      <div class="footer-content">
        <div class="footer-content__logo">
          <figure class="image is-64x64">
            <img src="~/static/images/logo-marketplace-branco.svg" alt="Logo">
          </figure>
          <span class="copyright-footer">
            © Copyright 2019 - NOME_DA_EMPRESA
            <br>Todos os direitos reservados
          </span>
        </div>
        <div class="footer-content__info">
          <div>
            <a class="is-size-5" @click.prevent="handleGoTo('termos')">Termos e condições de uso</a>
          </div>
          <div>
            <a class="is-size-5" @click.prevent="handleGoTo('politica')">Politica de privacidade</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  methods: {
    handleGoTo(item) {
      if (item == 'termos' || item == 'politica') {
        this.$router.push({ name: 'perfil', params: { currentMenu: 6 } })
      }
    }
  }
}
</script>

<style>
</style>