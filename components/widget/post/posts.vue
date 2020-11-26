<template>
  <v-row>
    <v-col v-for="post in posts" :key="post.id" cols="12" md="4">
      <v-hover v-slot:default="{ hover }">
        <v-card
          class="rounded-xl"
          outlined
          height="400"
          :elevation="hover ? 5 : 0"
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
            <v-btn
              class="mx-1"
              x-small
              elevation="0"
              color="blue lighten-5"
              fab
            >
              <v-icon color="primary" @click="$router.push(`/post/${post.id}`)"
                >mdi-eye-outline</v-icon
              >
            </v-btn>
            <share-company
              :data="{ title: post.title, description: post.content }"
              :them="{ color: 'blue lighten-5', small: false, x_small: true }"
            />
            <v-btn
              class="mx-1"
              x-small
              elevation="0"
              color="red lighten-5"
              fab
              @click="like(post)"
            >
              <v-icon color="#EA2027">
                {{ post.is_Like ? 'mdi-heart' : 'mdi-heart-outline' }}
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>
<script>
import shareCompany from '~/components/widget/company/shareCompany'
export default {
  components: { shareCompany },
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
    like(post) {
      this.$store.dispatch('post/likePost', post)
    },
  },
}
</script>
