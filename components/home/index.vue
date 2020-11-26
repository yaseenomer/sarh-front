<template>
  <v-row id="scrolling-techniques-4" class="overflow-y-auto">
    <v-col cols="12">
      <p class="primary--text text-center text-uppercase font-weight-bold">
        Latest posts
      </p>
    </v-col>
    <v-col>
      <v-tabs centered background-color="#f5f5f5">
        <v-tab>Photos</v-tab>
        <v-tab>Videos</v-tab>
        <v-tab>Posts</v-tab>
        <v-tab-item>
          <v-container style="background-color: #f5f5f5">
            <v-row>
              <template v-if="images">
                <v-col v-for="post in images" :key="post.id" cols="12" md="4">
                  <photo :post="post" @view-image="showImage" />
                </v-col>
              </template>
              <template v-else>
                <v-col v-for="i in 6" :key="i" cols="12" md="4">
                  <v-skeleton-loader
                    class="mx-auto rounded-xl"
                    type="image"
                  ></v-skeleton-loader>
                </v-col>
              </template>
            </v-row>
            <v-row>
              <v-col cols="12">
                <p class="text-center">
                  <v-btn
                    color="primary"
                    outlined
                    rounded
                    small
                    @click="$router.push('/post/photos')"
                    >show all photos
                    <v-icon>mdi-arrow-right</v-icon>
                  </v-btn>
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import photo from '~/components/widget/post/photo'
export default {
  name: 'Index',
  components: { photo },
  data() {
    return {
      item: 1,
      model: null,
      dialogImage: false,
      dialogReport: false,
      reportType: '',
      currentPost: null,
      objectId: '',
    }
  },
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
  methods: {
    report(type) {
      this.reportType = type
      this.dialogReport = true
    },
    showImage(post) {
      this.currentPost = post
      this.dialogImage = true
      this.objectId = post.id.toString()
    },
  },
}
</script>

<style scoped></style>
