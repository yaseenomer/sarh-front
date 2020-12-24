<template>
  <div>
    <info />
    <template v-if="loading">
      <v-row>
        <v-col v-for="i in 6" :key="i" cols="12" md="4">
          <v-skeleton-loader
            class="mx-auto rounded-xl"
            type="image"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </template>
    <posts
      v-if="company && !loading"
      :posts="posts"
      :images="images"
      :videos="videos"
      :is-profile="true"
      :company="company"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import info from '~/components/company/info'
import posts from '~/components/home/posts'
export default {
  components: { info, posts },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapGetters({
      company: 'company/company',
      posts: 'post/posts',
      videos: 'post/videos',
      images: 'post/images',
    }),
  },
  async created() {
    await this.$store.dispatch('post/getCompanyPosts', this.$route.params.id)
    this.loading = false
  },
}
</script>

<style scoped></style>
