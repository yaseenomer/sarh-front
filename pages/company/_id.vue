<template>
  <p>{{ $route.name }}</p>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('company/getCompany', this.$route.params.id)
  },
}
</script>
