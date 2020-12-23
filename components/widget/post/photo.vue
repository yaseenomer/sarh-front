<template>
  <v-row>
    <v-col v-for="post in images" :key="post.id" cols="12" md="4">
      <v-card
        class="rounded-xl"
        outlined
        hover
        :to="{
          name: 'posts-post',
          query: { post: post.id, type: 'image' },
        }"
      >
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
              >
                <v-icon color="#EA2027">{{
                  post.is_Like ? 'mdi-heart' : 'mdi-heart-outline'
                }}</v-icon>
              </v-btn>
            </v-row>
          </v-container>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
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
  },
}
</script>
