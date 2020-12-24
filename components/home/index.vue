<template>
  <div>
    <v-row v-if="loading">
      <v-col v-for="i in 3" :key="i" md="4">
        <v-skeleton-loader type="image"></v-skeleton-loader>
      </v-col>
    </v-row>
    <posts
      v-else
      :posts="posts.slice(0, 3)"
      :images="images.slice(0, 3)"
      :videos="videos.slice(0, 3)"
      :is-profile="false"
    />
    <companies />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import posts from '~/components/home/posts'
import companies from '~/components/home/companies'
export default {
  components: { posts, companies },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      posts: 'post/posts',
      videos: 'post/videos',
      images: 'post/images',
    }),
  },
  async created() {
    this.loading = true
    await this.$store.dispatch('post/getPostsRecentlyAdded')
    this.loading = false
  },
}
</script>
