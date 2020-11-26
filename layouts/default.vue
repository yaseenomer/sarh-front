<template>
  <v-app>
    <v-app-bar
      :app="$store.state.them.isApp"
      color="#6A76AB"
      dark
      prominent
      elevation="0"
      src="/img/sarh.cover.jpg"
      height="80"
      extension-height="380"
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
      <template #extension v-if="$store.state.them.isHome">
        <search />
      </template>
    </v-app-bar>
    <v-main>
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
  middleware: ['navBar'],
  components: { navBar, search, registerForm, loginForm },
  data() {
    return {}
  },
}
</script>
