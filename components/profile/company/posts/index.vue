<template>
  <v-container>
    <v-row>
      <v-tabs vertical background-color="#eeeeee">
        <v-tab>
          <v-icon left>mdi-post-outline</v-icon>
          {{ $t('post.posts') }}
        </v-tab>
        <v-tab>
          <v-icon left>mdi-folder-multiple-image</v-icon>
          {{ $t('post.images') }}
        </v-tab>
        <v-tab>
          <v-icon left>mdi-play-box-multiple-outline</v-icon>
        </v-tab>
        <v-tab-item>
          <v-container>
            <v-row>
              <v-subheader class="primary--text">
                <v-icon color="primary">mdi-post-outline</v-icon>
                {{ $t('post.Posts') }}
              </v-subheader>
              <v-spacer />
              <v-btn
                color="primary"
                dark
                elevation="0"
                class="mx-2"
                rounded
                small
                @click="getCreatePost('post')"
              >
                <v-icon>mdi-plus</v-icon>
                {{ $t('post.addpost') }}
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
                {{ $t('posts.images') }}</v-subheader
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
                {{ $t('posts.addpostwithimage') }}
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
                {{ $t('posts.vidoes') }}
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
                {{ $t('posts.addpostwithvideo') }}
              </v-btn>
            </v-row>
          </v-container>
          <v-divider />
          <v-container v-if="posts">
            <video-card :videos="posts.videos" />
          </v-container>
        </v-tab-item>
      </v-tabs>
      <!-- post form start -------------------------------------------------->
      <div justify="center">
        <v-dialog v-model="createPost" max-width="700px">
          <create-post
            :post-type="postType"
            @close-create-post="createPost = false"
          />
        </v-dialog>
      </div>
      <!-- post form end ---------------------------------------------------->
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

  async asyncData({ store }) {
    await store.dispatch('post/getMyPosts')
    const posts = await store.state.post.myPosts
    return {
      posts,
    }
  },
  data() {
    return {
      createPost: false,
      postType: '',
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
    async getCreatePost(title) {
      this.postType = await title
      this.createPost = true
    },
  },
}
</script>

<style scoped></style>
