<template>
  <v-row>
    <v-col cols="12" md="12">
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
            <template v-if="recentlyAdded.length">
              <company :companies="recentlyAdded" />
            </template>
            <template v-else>
              <v-row>
                <v-col v-for="i in 12" :key="i" cols="12" md="4">
                  <v-skeleton-loader
                    class="rounded-xl"
                    type="image"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>
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
  computed: {
    ...mapGetters({
      companies: 'company/companies',
      recentlyAdded: 'company/recentlyAdded',
      topRating: 'company/topRating',
      recommendedByUs: 'company/recommendedByUs',
    }),
  },
  created() {
    this.$store.dispatch('company/getCompanies')
    this.$store.dispatch('company/getRecommendedByUs')
  },
}
</script>

<style scoped></style>
