<template>
  <div>
    <posts :posts="posts" :images="images" :videos="videos" />
    <companies />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import posts from '~/components/home/posts'
import companies from '~/components/home/companies'
export default {
  components: { posts, companies },
  computed: {
    ...mapGetters({
      posts: 'post/posts',
      videos: 'post/videos',
      images: 'post/images',
    }),
  },
  created() {
    this.$store.dispatch('post/getPosts')
  },
}
</script>
