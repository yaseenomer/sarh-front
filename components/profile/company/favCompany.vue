<template>
  <p>{{ companies.length }}</p>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({ companies: 'company/favoriteCompany' }),
  },
  created() {
    this.$store.dispatch('company/getFavoriteCompany')
  },
}
</script>

<style></style>
