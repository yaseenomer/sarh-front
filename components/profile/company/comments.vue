<template>
  <comment
    :comments="$store.state.comment.comments"
    :company-id="$auth.user.id.toString()"
  />
</template>

<script>
import comment from '~/components/widget/comment/comment'
export default {
  components: { comment },
  created() {
    this.$store.dispatch('comment/getMyComments')
  },
}
</script>

<style scoped></style>
