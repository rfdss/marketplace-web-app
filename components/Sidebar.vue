<template>
  <div class="container sidebar-container">
    <nav class="navbar topbar" id="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand" id="navbarBrand">
        <a
          @click="toggleSidebar"
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
        <div class="navbar-brand-items">
          <a class="navbar-brand-item" href="#">
            <i class="far fa-user"></i>
          </a>
          <a class="navbar-brand-item" href="#">
            <i class="far fa-heart"></i>
          </a>
          <a class="navbar-brand-item" href="#">
            <i class="fas fa-shopping-cart"></i>
          </a>
        </div>
      </div>
    </nav>

    <nav
      class="navbar sidebar"
      :class="{'open': showSidebar}"
      id="sidebar"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand logo-mobile">
        <a class="has-text-centered" href="#">
          <figure class="image is-64x64">
            <img src="~/static/images/logo-marketplace-branco.svg" alt="Logo">
          </figure>
        </a>
      </div>
      <div id="navbarMenuMobile" class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item">
            <a class="is-flex justify-between has-text-dark" href="#">
              <span>Bovinos</span>
            </a>
          </div>
          <div class="navbar-item">
            <a class="is-flex justify-between has-text-dark" href="#">
              <span>Aves</span>
            </a>
          </div>
          <div class="navbar-item">
            <a class="is-flex justify-between has-text-dark" href="#">
              <span>Mercearia</span>
            </a>
          </div>
          <div class="navbar-item">
            <a class="is-flex justify-between has-text-dark" href="#">
              <span>Pescados</span>
            </a>
          </div>
          <div class="navbar-item">
            <a class="is-flex justify-between has-text-dark" href="#">
              <span>Suínos</span>
            </a>
          </div>
          <div class="navbar-item">
            <a class="is-flex justify-between has-text-dark" href="#">
              <span>Ovinos</span>
            </a>
          </div>
          <div class="navbar-item">
            <a class="is-flex justify-between has-text-dark" href="#">
              <span>Embutidos</span>
            </a>
          </div>
          <div class="navbar-item">
            <a class="is-flex justify-between has-text-dark" href="#">
              <span>Exóticos</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  components: {},
  data() {
    return {
      showSidebar: false,
    }
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar
    }
  }
}
</script>

<style>
</style>