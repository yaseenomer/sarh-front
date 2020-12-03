<template>
  <v-container>
    <v-row>
      <v-tabs vertical background-color="#eeeeee">
        <v-tab>
          <v-icon left>mdi-folder-multiple-image</v-icon>
          {{ $t('post.images') }}
        </v-tab>
        <v-tab>
          <v-icon left>mdi-post-outline</v-icon>
          {{ $t('post.posts') }}
        </v-tab>
        <v-tab>
          <v-icon left>mdi-play-box-multiple-outline</v-icon>
          {{ $t('post.videos') }}
        </v-tab>
        <!--        <v-tab-item>-->
        <!--          <v-container>-->
        <!--            <photo-card :images="posts.images" />-->
        <!--          </v-container>-->
        <!--        </v-tab-item>-->
        <!--        <v-tab-item>-->
        <!--          <v-container>-->
        <!--            <posts-card :posts="posts.posts" />-->
        <!--          </v-container>-->
        <!--        </v-tab-item>-->
        <!--        <v-tab-item>-->
        <!--          <v-container>-->
        <!--            <video-card :videos="posts.videos" />-->
        <!--          </v-container>-->
        <!--        </v-tab-item>-->
      </v-tabs>
    </v-row>
  </v-container>
</template>

<script>
// import photoCard from '~/components/widget/post/photo'
// import postsCard from '~/components/widget/post/posts'
// import videoCard from '~/components/widget/post/video'
export default {
  components: {
    // photoCard,
    // postsCard,
    // videoCard,
  },

  async asyncData({ store }) {
    const posts = await store.dispatch('post/myPosts')
    console.log('posts' + posts)
    return { posts }
  },
}
</script>

<style scoped></style>
