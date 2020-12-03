<template>
  <v-container>
    <v-row>
      <v-tabs vertical background-color="#eeeeee">
        <v-tab>
          <v-icon left>mdi-post-outline</v-icon>
          posts
        </v-tab>
        <v-tab>
          <v-icon left>mdi-folder-multiple-image</v-icon>
          images
        </v-tab>
        <v-tab>
          <v-icon left>mdi-play-box-multiple-outline</v-icon>
          videos
        </v-tab>
        <v-tab-item>
          <v-container>
            <v-row>
              <v-subheader class="primary--text">
                <v-icon color="primary">mdi-post-outline</v-icon>
                Posts
              </v-subheader>
              <v-spacer />
              <v-btn
                color="primary"
                dark
                elevation="0"
                class="mx-2"
                rounded
                small
                @click="getCreatePost(null)"
              >
                <v-icon>mdi-plus</v-icon>
                add post
              </v-btn>
            </v-row>
          </v-container>
          <v-divider />
          <v-container v-if="posts">
            <posts-card :posts="posts.posts" />
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container>
            <v-row>
              <v-subheader class="primary--text">
                <v-icon color="primary">mdi-folder-multiple-image</v-icon>
                Images</v-subheader
              >
              <v-spacer />
              <v-btn
                color="primary"
                dark
                elevation="0"
                class="mx-2"
                rounded
                small
                @click="getCreatePost('image')"
              >
                <v-icon>mdi-plus</v-icon>
                add post with image
              </v-btn>
            </v-row>
          </v-container>
          <v-divider />
          <v-container v-if="posts">
            <photo-card :images="posts.images" />
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container>
            <v-row>
              <v-subheader class="primary--text">
                <v-icon color="primary">mdi-play-box-multiple-outline</v-icon>
                Videos
              </v-subheader>
              <v-spacer />
              <v-btn
                color="primary"
                dark
                elevation="0"
                class="mx-2"
                rounded
                small
                @click="getCreatePost('video')"
              >
                <v-icon>mdi-plus</v-icon>
                add post with video
              </v-btn>
            </v-row>
          </v-container>
          <v-divider />
          <v-container v-if="posts">
            <video-card :videos="posts.videos" />
          </v-container>
        </v-tab-item>
      </v-tabs>
      <!-- registration form start -------------------------------------------------->
      <div justify="center">
        <v-dialog v-model="createPost" max-width="700px">
          <create-post
            :post-type="postType"
            @close-create-post="createPost = false"
          />
        </v-dialog>
      </div>
      <!-- registration form end ---------------------------------------------------->
    </v-row>
  </v-container>
</template>

<script>
import photoCard from '~/components/widget/post/photo'
import postsCard from '~/components/widget/post/posts'
import videoCard from '~/components/widget/post/video'
import createPost from '~/components/profile/company/posts/createPost'
import { mapGetters } from 'vuex'
export default {
  components: {
    photoCard,
    postsCard,
    videoCard,
    createPost,
  },
  data() {
    return {
      createPost: false,
      postType: '',
    }
  },

  async asyncData({ store }) {
    await store.dispatch('post/getMyPosts')
    const posts = await store.state.post.myPosts
    return {
      posts,
    }
  },
  computed: {
    ...mapGetters({
      posts: 'post/myPosts',
    }),
  },
  created() {
    this.$store.dispatch('post/getMyPosts')
  },
  methods: {
    getCreatePost(title) {
      this.postType = title
      this.createPost = true
    },
  },
}
</script>

<style scoped></style>
