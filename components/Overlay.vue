<template>
  <div
    class="overlay-search is-flex align-center justify-center"
    :class="{'open': overlay.open, 'to-sidebar': overlay.sidebar}"
    @click="handleClick"
  >
    <div class="message message-toast is-danger" v-if="overlay.toast != null">
      <div class="message-header">
        <p>{{ overlay.toast.title }}</p>
        <button @click="handleClick" class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body" v-html="overlay.toast.content"></div>
    </div>
    <p class="has-text-white is-size-4" v-if="overlay.loading">Carregando...</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  components: {},

  data() {
    return {}
  },

  created() {},

  computed: {
    ...mapState({
      overlay: 'overlay',
    }),
  },

  methods: {
    ...mapActions([
      'setOverlay'
    ]),

    handleClick() {
      let redirect = null
      
      if (this.overlay.toast != null) {
        if (this.overlay.toast.hasOwnProperty('redirect')) {
          redirect = this.overlay.toast.redirect
        }
      }

      this.setOverlay({
        open: false,
        loading: false,
        sidebar: false,
        toast: null,
        iconBox: null,
      })

      if (redirect) {
        this.$router.push({ name: `${redirect}` })
      }

    },
  }
}
</script>

<style>

.message-toast {
  position: absolute;
  top: 1.5rem;
}

</style>