<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-breadcrumbs :items="items"> </v-breadcrumbs>
    </v-col>
    <v-col cols="12" md="12">
      <v-card v-if="!loading" class="rounded-xl" flat>
        <img
          class="rounded-xl pa-2 img"
          :src="post ? post.file : ''"
          width="100%"
          height="600"
        />
        <v-card-text v-if="$route.query.type === 'post'">
          <v-subheader class="display-1" v-text="post.title" />
          <p v-text="post.content"></p>
        </v-card-text>
        <v-card-actions>
          <v-list-item>
            <v-list-item-avatar color="blue lighten-4">
              <v-icon large color="primary">mdi-account-circle-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="post.user_id.name" />
              <v-list-item-subtitle v-text="post.created_at" />
            </v-list-item-content>
          </v-list-item>
          <v-spacer />
          <share-company
            :data="{
              title: post.user_id ? post.user_id.name : 'company name',
              description: post.title,
              url: `https://sarh.ae/posts/post?post=${post.id}&type=${$route.query.type}`,
            }"
            :them="{
              color: 'blue lighten-4',
              small: false,
              x_small: true,
            }"
          />
          <v-btn
            class="mx-2"
            x-small
            elevation="0"
            color="orange lighten-4"
            fab
            @click="reportFormStatus = true"
          >
            <v-icon color="orange">mdi-alert</v-icon>
          </v-btn>
          <v-btn
            class="mx-2"
            x-small
            elevation="0"
            color="red lighten-4"
            fab
            @click="like(post)"
          >
            <v-icon color="#EA2027">{{
              post.is_Like ? 'mdi-heart' : 'mdi-heart-outline'
            }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-skeleton-loader v-else type="card" />
      <v-card v-if="!loading" flat class="rounded-xl my-5">
        <v-card-title>
          <v-icon class="mx-1" color="primary"
            >mdi-comment-text-multiple-outline</v-icon
          >
          <span class="primary--text">comments ({{ comments.length }})</span>
        </v-card-title>
        <v-card-text>
          <post-comment-form />
          <post-comment-list v-if="comments.length" :comments="comments" />
          <v-skeleton-loader v-else type="text"></v-skeleton-loader>
        </v-card-text>
      </v-card>
    </v-col>
    <!-- report form start -------------------------------------------------->
    <div justify="center">
      <v-dialog v-model="reportFormStatus" max-width="500px">
        <report-form
          object-type="post_id"
          :object-id="$route.query.post.toString()"
          @close-report-form="reportFormStatus = false"
        />
      </v-dialog>
    </div>
    <!-- report form end ---------------------------------------------------->
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import shareCompany from '~/components/widget/company/shareCompany'
import reportForm from '~/components/widget/report'
import postCommentForm from '~/components/widget/post/postCommentForm'
import postCommentList from '~/components/widget/post/postCommentList'
export default {
  components: { shareCompany, reportForm, postCommentForm, postCommentList },
  data() {
    return {
      reportFormStatus: false,
      loading: false,
      items: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: this.$route.query.type,
          disabled: true,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      image: `post/image`,
      po: `post/post`,
      comments: 'post/comments',
    }),
    post() {
      return this.$route.query.type === 'post' ? this.po : this.image
    },
  },
  async created() {
    this.loading = true
    await this.$store.dispatch('post/getPost', this.$route.query.post)
    await this.$store.dispatch('post/getCommentsByPost', this.$route.query.post)
    this.loading = false
  },
  methods: {
    like(post) {
      this.$store.dispatch('post/likePost', post)
    },
  },
}
</script>
