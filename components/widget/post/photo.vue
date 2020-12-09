<template>
  <v-row>
    <v-col v-for="post in images" :key="post.id" cols="12" md="4">
      <v-card class="rounded-xl" outlined>
        <v-img
          class="rounded-xl m-1"
          height="400"
          :src="failed_image ? '/img/sarh.cover.jpg' : post.file"
          aspect-ratio="1"
          @error="onErrorImage"
        >
          <v-container>
            <v-row>
              <v-avatar color="light-blue lighten-5" size="36" class="mx-1">
                <v-icon color="primary"> mdi-account-circle </v-icon>
              </v-avatar>
              <v-chip
                class="ma-2 d-inline-block text-truncate"
                color="light-blue lighten-5"
                style="max-width: 200px"
                exact
                text-color="primary"
                small
              >
                {{ post.user_id ? post.user_id.name : 'company name' }}
              </v-chip>
              <v-spacer />
              <v-btn
                class="mx-2"
                x-small
                elevation="0"
                color="red lighten-5"
                fab
                @click="like(post)"
              >
                <v-icon color="#EA2027">{{
                  post.is_Like ? 'mdi-heart' : 'mdi-heart-outline'
                }}</v-icon>
              </v-btn>
            </v-row>
            <v-row>
              <v-spacer />
              <share-company
                :data="{
                  title: post.user_id ? post.user_id.name : 'company name',
                  description: post.file,
                }"
                :them="{
                  color: 'light-blue lighten-5',
                  small: false,
                  x_small: true,
                }"
              />
            </v-row>
            <v-row>
              <v-spacer />
              <v-btn
                :to="{
                  name: 'posts-post',
                  query: { post: post.id, type: 'image' },
                }"
                fab
                x-small
                color="teal lighten-5"
                elevation="0"
                class="ma-2"
              >
                <v-icon color="teal">mdi-eye-outline</v-icon>
              </v-btn>
            </v-row>
          </v-container>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import shareCompany from '~/components/widget/company/shareCompany'
export default {
  components: { shareCompany },
  props: {
    images: { type: Array, required: true },
  },
  data() {
    return {
      failed_image: false,
    }
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
