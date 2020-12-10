<template>
  <div v-if="companies.length">
    <company-card :companies="companies" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import companyCard from '~/components/widget/company/company'
export default {
  components: { companyCard },
  computed: {
    ...mapGetters({ companies: 'company/favoriteCompany' }),
  },
  created() {
    this.$store.dispatch('company/getCompanies')
  },
}
</script>
