<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({ loginWithSocial: 'user/loginWithSocial' }),
    loginWith(service) {
      this.loginWithSocial(service)
    },
  },
}
</script>

<template>
  <div class="social text-center">
    <a href="#" title="Google" @click="loginWith('google')"
      ><i class="fab fa-google fa-fw"
    /></a>
    <a href="#" title="Twitter" @click="loginWith('twitter')"
      ><i class="fab fa-twitter fa-fw fa-fw"
    /></a>
    <a href="#" title="Facebook" @click="loginWith('facebook')"
      ><i class="fab fa-facebook-f fa-fw"
    /></a>
  </div>
</template>
