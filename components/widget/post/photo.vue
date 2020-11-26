<template>
  <v-card class="rounded-xl" outlined>
    <v-img
      class="rounded-xl m-1"
      height="400"
      :src="failed_image ? '/posts/post6.jpg' : post.file"
      aspect-ratio="1"
      @error="onErrorImage"
    >
      <v-container>
        <v-row style="position: absolute; bottom: 0">
          <v-avatar color="white" size="36" class="mx-1">
            <v-icon> mdi-account-circle </v-icon>
          </v-avatar>
          <v-chip
            class="ma-2 d-inline-block text-truncate"
            color="white"
            style="max-width: 200px"
            exact
            text-color="primary"
            small
          >
            {{ post.user_id ? post.user_id.name : 'company name' }}
          </v-chip>
          <v-btn
            class="mx-1"
            x-small
            elevation="0"
            color="white"
            fab
            @click="$emit('view-image', post)"
          >
            <v-icon color="primary">mdi-eye-outline</v-icon>
          </v-btn>
          <share-company
            :data="{
              title: post.user_id ? post.user_id.name : 'company name',
              description: post.file,
            }"
            :them="{ color: 'white', small: false, x_small: true }"
          />
          <v-btn
            class="mx-1"
            x-small
            elevation="0"
            color="white"
            fab
            @click="like(post)"
          >
            <v-icon color="#EA2027">{{
              post.is_Like ? 'mdi-heart' : 'mdi-heart-outline'
            }}</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-img>
  </v-card>
</template>
<script>
import shareCompany from '~/components/widget/company/shareCompany'
export default {
  components: { shareCompany },
  props: {
    post: { type: Object, required: true },
  },
  data() {
    return {
      failed_image: false,
    }
  },
  created() {
    this.$store.dispatch('post/getRecentlyAddedPosts')
  },
  methods: {
    onErrorImage() {
      this.failed_image = true
    },
    like(post) {
      this.$store.dispatch('post/likePost', post)
    },
  },
}
</script>
