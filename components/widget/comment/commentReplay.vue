<script>
export default {
  props: {
    comment: { type: Object, required: true },
    companyId: { type: String, required: true },
  },
  data() {
    return {
      replay: '',
      loading: false,
    }
  },
  methods: {
    async onSave() {
      if (this.$auth.loggedIn) {
        this.loading = true
        const data = {
          comment: {
            user_id: this.$auth.user.id,
            company: this.companyId,
            parent: this.comment.id,
            comment: this.replay,
          },
          replay: true,
        }
        await this.$store.dispatch('comment/addComment', data)
        this.loading = false
        this.replay = ''
        this.$emit('close-form-add-replay')
      } else {
        this.$toast.info('plase login to do that')
      }
    },
  },
}
</script>

<template>
  <v-card flat>
    <v-card-subtitle>comment reply</v-card-subtitle>
    <v-card-text>
      <v-textarea
        v-model="replay"
        label="comment reply"
        outlined
        class="rounded-xl"
      ></v-textarea>
      <v-btn
        color="primary"
        :loading="loading"
        :disabled="replay == '' || loading"
        rounded
        @click="onSave"
      >
        send
      </v-btn>
    </v-card-text>
  </v-card>
</template>
