<template>
  <v-row class="justify-space-around">
    <nuxt-link :to="localePath({ name: 'index' })">
      <img src="/logo/logo.png" />
    </nuxt-link>
    <div>
      <v-btn text dark @click="$router.push({ name: 'index' })">
        <v-icon color="primary" class="mx-1">mdi-chat-outline</v-icon>
        {{ $t('nav.home') }}
      </v-btn>

      <v-btn text dark @click="getQuote">
        <v-icon color="primary" class="mx-1">mdi-message-text-outline</v-icon>
        {{ $t('nav.quotations') }}
      </v-btn>

      <v-btn v-if="$i18n.locale === 'en'" text dark @click="setLocal('ar')">
        <v-icon color="primary" class="mx-1">mdi-abjad-arabic</v-icon>
        عربي
      </v-btn>
      <v-btn v-if="$i18n.locale === 'ar'" text dark @click="setLocal('en')">
        <v-icon color="primary" class="mx-1">mdi-alpha-e</v-icon>
        english
      </v-btn>
      <v-btn
        v-if="!$auth.loggedIn"
        value="ty"
        text
        dark
        @click="$store.commit('user/setLoginForm', true)"
      >
        <v-icon color="primary" class="mx-1">mdi-login</v-icon>
        {{ $t('nav.login') }}
      </v-btn>
      <v-menu v-else offset-y open-on-hover>
        <template #activator="{ on, attrs }">
          <v-btn
            value="justify"
            v-bind="attrs"
            :loading="logOutLoading"
            :disabled="logOutLoading"
            text
            dark
            v-on="on"
          >
            <v-icon color="primary" class="mx-1"
              >mdi-account-circle-outline</v-icon
            >
            {{ $auth.user.profile.full_name }}
            <v-icon color="primary" class="mx-1">mdi-arrow-down</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item
              route
              :to="$auth.user.type === 2 ? '/profile/company' : '/profile/user'"
            >
              <v-list-item-icon>
                <v-icon>mdi-account-cog-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ profileTitle }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logOut">
              <v-list-item-icon>
                <v-icon>mdi-logout-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('nav.logout') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </div>
    <v-btn
      v-if="!$auth.loggedIn"
      color="primary"
      rounded
      elevation="0"
      @click="$store.commit('user/setRegisterForm', { status: true, type: 2 })"
    >
      <v-icon>mdi-plus</v-icon>{{ $t('nav.addcompany') }}
    </v-btn>
    <div justify="center">
      <v-dialog v-model="createQouteForm" max-width="700px">
        <create-request-quote
          @close-create-request-quote="createQouteForm = false"
        />
      </v-dialog>
    </div>
  </v-row>
</template>

<script>
import createRequestQuote from '~/components/profile/quoteation/createRequestQuote'
export default {
  components: { createRequestQuote },
  data() {
    return {
      login: false,
      logOutLoading: false,
      createQouteForm: false,
    }
  },
  computed: {
    profileTitle() {
      return this.$auth.user.type == 2 ? 'company profile' : 'user profile'
    },
  },
  created() {
    this.$i18n.locale = 'en'
  },
  methods: {
    async logOut() {
      this.logOutLoading = await true
      await this.$auth.logout()
      this.logOutLoading = await false
      this.$store.dispatch('company/getCompanies')
    },
    setLocal(local) {
      this.$vuetify.rtl = !this.$vuetify.rtl
      this.$i18n.locale = local
    },

    getQuote() {
      if (this.$auth.loggedIn) {
        return (this.createQouteForm = true)
      }
      return this.$toast.show('plase login ...')
    },
  },
}
</script>

<style scoped></style>
