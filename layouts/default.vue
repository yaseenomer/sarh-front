<template>
  <v-app id="app">
    <v-app-bar
      color="#6A76AB"
      dark
      elevation="0"
      prominent
      hide-on-scroll
      src="/img/sarh.cover.jpg"
      max-height="80"
      extension-height="320"
    >
      <template #img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(212, 230, 241,.5), rgba(127, 179, 213,.5)"
        ></v-img>
      </template>

      <!-- nav bar start ----------------------------------------------------------->
      <nav-bar />
      <!-- nav bar start ----------------------------------------------------------->
      <template #extension v-if="false">
        <search />
      </template>
    </v-app-bar>
    <v-main class="overflow-hidden">
      <v-container>
        <!-- registration form start -------------------------------------------------->
        <div justify="center">
          <v-dialog v-model="$store.state.user.registerForm" max-width="400px">
            <register-form />
          </v-dialog>
        </div>
        <!-- registration form end ---------------------------------------------------->

        <!-- login form start --------------------------------------------------------->
        <div justify="center">
          <v-dialog v-model="$store.state.user.loginForm" max-width="400px">
            <login-form />
          </v-dialog>
        </div>
        <!-- login form end ----------------------------------------------------------->
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import navBar from '~/components/header/navBar'
import search from '~/components/header/search'
import registerForm from '~/components/auth/register'
import loginForm from '~/components/auth/login'
export default {
  components: { navBar, search, registerForm, loginForm },
  data() {
    return {
      
    }
  },
  created() {
  }
}
</script>
<style>
#app {
  background-color: #f5f5f5;
}
</style>
