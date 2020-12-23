<template>
  <v-row>
    <v-col v-for="post in posts" :key="post.id" cols="12" md="4">
      <v-card
        class="rounded-xl"
        outlined
        height="400"
        hover
        :to="{
          name: 'posts-post',
          query: { post: post.id, type: 'post' },
        }"
      >
        <v-img
          class="rounded-xl m-1"
          height="250"
          :src="failed_image ? '/img/sarh.cover.jpg' : post.file"
          aspect-ratio="1"
          @error="onErrorImage"
        >
        </v-img>
        <v-card-text style="height: 80px">
          <h5 class="text-truncate font-weight-bold">{{ post.title }}</h5>
          <p class="text-truncate">{{ post.content }}</p>
        </v-card-text>
        <v-card-actions style="height: 70px">
          <v-avatar color="blue lighten-4" size="36" class="mx-1">
            <v-icon color="primary"> mdi-account-circle </v-icon>
          </v-avatar>
          <v-chip
            class="ma-2 d-inline-block text-truncate"
            color="blue lighten-5"
            style="max-width: 200px"
            exact
            text-color="primary"
            small
          >
            <span>
              {{ post.user_id ? post.user_id.name : 'company name' }}
            </span>
          </v-chip>
          <v-spacer />

          <v-btn class="mx-1" x-small elevation="0" color="red lighten-5" fab>
            <v-icon color="#EA2027">
              {{ post.is_Like ? 'mdi-heart' : 'mdi-heart-outline' }}
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    posts: { type: Array, required: true },
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
  },
}
</script>
