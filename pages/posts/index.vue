<template>
  <v-container>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <v-divider />
    <photo-card v-if="type === 'image'" :images="images" />
    <posts-card v-if="type === 'post'" :posts="posts" />
    <video-card v-if="type === 'video'" :videos="videos" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import photoCard from '~/components/widget/post/photo'
import postsCard from '~/components/widget/post/posts'
import videoCard from '~/components/widget/post/video'
export default {
  components: {
    photoCard,
    postsCard,
    videoCard,
  },

  asyncData({ query }) {
    const items = [
      {
        text: 'Home',
        disabled: false,
        to: '/',
      },
      {
        text: `all ${query.type}s`,
        disabled: true,
      },
    ]
    return { type: query.type, items }
  },
  computed: {
    ...mapGetters({
      images: 'post/images',
      posts: 'post/posts',
      videos: 'post/videos',
    }),
  },
  created() {
    this.$store.dispatch('post/getPosts')
  },
}
</script>

<style scoped></style>
