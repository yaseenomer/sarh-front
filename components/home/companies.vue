<template>
  <v-row>
    <template v-if="loading">
      <v-col v-for="i in 6" :key="i" cols="12" md="4">
        <v-skeleton-loader class="rounded-xl" type="image"></v-skeleton-loader>
      </v-col>
    </template>
    <v-col v-else cols="12" md="12">
      <p class="primary--text text-center text-uppercase font-weight-bold">
        {{ $t('home.Companies') }}
      </p>
      <v-tabs centered background-color="#f5f5f5">
        <v-tab>{{ $t('home.Recentlyadded') }}</v-tab>
        <v-tab>{{ $t('home.TopRating') }}</v-tab>
        <v-tab>{{ $t('home.recommendedByUs') }}</v-tab>
        <v-tab>{{ $t('home.Random') }}</v-tab>
        <v-tab-item>
          <v-container style="background-color: #f5f5f5">
            <template>
              <company :companies="recentlyAdded" />
            </template>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container style="background-color: #f5f5f5">
            <company :companies="topRating" />
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container style="background-color: #f5f5f5">
            <company :companies="recommendedByUs" />
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container style="background-color: #f5f5f5">
            <company :companies="companies" />
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import company from '~/components/widget/company/company'
export default {
  components: { company },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      companies: 'company/companies',
      recentlyAdded: 'company/recentlyAdded',
      topRating: 'company/topRating',
      recommendedByUs: 'company/recommendedByUs',
    }),
  },
  async created() {
    this.loading = true
    await this.$store.dispatch('company/getCompanies')
    await this.$store.dispatch('company/getRecommendedByUs')
    this.loading = false
  },
}
</script>

<style scoped></style>
