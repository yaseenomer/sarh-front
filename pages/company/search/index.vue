<template>
  <div>
    <v-row>
      <v-breadcrumbs :items="items"> </v-breadcrumbs>
      <v-spacer />
      <v-icon>mdi-filter-menu-outline</v-icon>
    </v-row>
    <v-row v-if="loading">
      <v-col v-for="i in 6" :key="i" cols="12" md="4">
        <v-skeleton-loader type="image" class="rounded-xl" />
      </v-col>
    </v-row>
    <v-row v-else>
      <company-card :companies="companies" />
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import companyCard from '~/components/widget/company/company'
export default {
  components: { companyCard },
  data() {
    return {
      loading: false,
      items: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: `search company`,
          disabled: true,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      companies: 'company/companies',
    }),
  },
  async created() {
    this.loading = true
    await this.$store.dispatch(
      'company/getCompanyByActivity',
      this.$route.query.activity
    )
    this.loading = false
  },
}
</script>

<style scoped></style>
