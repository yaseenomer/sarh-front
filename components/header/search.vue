<template>
  <v-container>
    <v-row class="mx-auto">
      <v-col cols="12" md="8" offset-md="2">
        <v-icon color="primary">mdi-format-quote-open</v-icon>
        <h1 class="primary--text text-uppercase font-weight-bold">
          {{ $t('home.title-1') }}
        </h1>
        <h3 class="primary--text text-uppercase font-weight-bold">
          {{ $t('home.title-2') }}
        </h3>
        <p class="text-center">
          <v-btn
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
        <v-text-field
          rounded
          color="primary"
          outlined
          filled
          :placeholder="$t('home.search')"
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="1">
        <v-btn dark rounded color="primary" large>
          <v-icon>mdi-magnify</v-icon>
          {{ $t('home.search') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Search',
}
</script>

<style scoped></style>
