<template>
  <comment :comments="$store.state.comment.comments" :company-id="companyId" />
</template>

<script>
import comment from '~/components/widget/comment/comment'
export default {
  components: { comment },
  props: {
    companyId: { type: String, required: true },
  },
  created() {
    this.$store.dispatch('comment/getCommentsByCompanyId', this.companyId)
  },
}
</script>

<style scoped></style>
