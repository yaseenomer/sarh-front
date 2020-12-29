<template>
  <v-container>
    <v-row class="mx-auto">
      <v-col cols="12" md="8" offset-md="2">
        <v-icon color="primary">mdi-format-quote-open</v-icon>
        <h1 class="text-uppercase font-weight-bold">
          {{ $t('home.title-1') }}
        </h1>
        <h3 class="text-uppercase font-weight-bold">
          {{ $t('home.title-2') }}
        </h3>
        <p class="text-center">
          <v-btn
            v-if="!$auth.loggedIn"
            color="primary"
            elevation="0"
            rounded
            @click="
              $store.commit('user/setRegisterForm', { status: true, type: 1 })
            "
          >
            <v-icon class="mx-1">mdi-account-plus-outline</v-icon>
            {{ $t('home.justregisternow') }}</v-btn
          >
        </p>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="5" offset-md="3">
        <v-select
          v-model="activity"
          :items="$store.state.activity.activites"
          item-text="name"
          item-value="id"
          rounded
          outlined
          background-color="#dcdde1"
          :placeholder="$t('home.search')"
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" md="1">
        <v-btn dark rounded color="primary" large @click="searchCompany">
          <v-icon>mdi-magnify</v-icon>
          {{ $t('home.search') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      activity: null,
    }
  },
  created() {
    this.$store.dispatch('activity/getActivities')
  },
  methods: {
    searchCompany() {
      if (!this.activity) return this.$toast.info('select activity ...')
      this.$router.replace({
        name: 'company-search',
        query: { activity: this.activity },
      })
    },
  },
}
</script>
