<template>
  <div>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <company-info />
  </div>
</template>

<script>
import companyInfo from '~/components/company/company'
export default {
  components: { companyInfo },
  data() {
    return {
      items: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: `company`,
          disabled: true,
        },
      ],
    }
  },
  created() {
    this.$store.dispatch('company/getCompany', this.$route.params.id)
  },
}
</script>
