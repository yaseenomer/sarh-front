<template>
  <div>
    <info />
    <posts :posts="posts" :images="images" :videos="videos" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import info from '~/components/company/info'
import posts from '~/components/home/posts'
export default {
  components: { info, posts },
  computed: {
    ...mapGetters({
      company: 'company/company',
      posts: 'post/posts',
      videos: 'post/videos',
      images: 'post/images',
    }),
  },
  created() {
    this.$store.dispatch('post/getCompanyPosts', this.$route.params.id)
  },
}
</script>

<style scoped></style>
