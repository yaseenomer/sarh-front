<template>
  <div>
    <v-textarea
      v-model="comment"
      :label="$t('posts.content')"
      outlined
      rounded
      height="100"
      :error-messages="commentErrors"
      required
      @input="$v.comment.$touch()"
      @blur="$v.comment.$touch()"
    ></v-textarea>
    <v-card-actions>
      <v-btn
        color="primary"
        elevation="0"
        :loading="saving"
        :disabled="saving"
        rounded
        @click="saveComment"
      >
        <v-icon>mdi-comment-text-multiple-outline</v-icon>
        <span class="mx-1">send comment</span>
      </v-btn>
    </v-card-actions>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
  mixins: [validationMixin],
  data() {
    return {
      comment: '',
      saving: false,
    }
  },
  computed: {
    commentErrors() {
      const errors = []
      if (!this.$v.comment.$dirty) return errors
      !this.$v.comment.required && errors.push('title is required.')
      return errors
    },
  },
  validations: {
    comment: { required },
  },
  methods: {
    async saveComment() {
      this.$v.$touch()
      if (this.$v.$invalid) return false
      this.saving = true
      try {
        await this.$store.dispatch('post/createComment', {
          comment: this.comment,
          post_id: this.$route.query.post,
        })
        this.saving = false
        this.comment = ''
        this.$v.$reset()
        this.$toast.success('send successful')
      } catch (e) {
        this.saving = false
        this.$toast.error('something error')
      }
    },
  },
}
</script>
