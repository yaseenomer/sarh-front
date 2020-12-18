<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  mixins: [validationMixin],
  data() {
    return {
      comment: '',
      rate: null,
      loading: false,
    }
  },
  computed: {
    commentErrors() {
      const errors = []
      if (!this.$v.comment.$dirty) return errors
      !this.$v.comment.required && errors.push('comment is required.')
      !this.$v.comment.maxLength &&
        errors.push('must be not  greater than 150 char')
      return errors
    },
  },
  validations: {
    comment: { required, maxLength: maxLength(150) },
  },
  methods: {
    async onSubmit() {
      if (this.$auth.loggedIn) {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.loading = true
          const data = {
            comment: {
              user_id: this.$auth.user.id,
              company: this.$store.state.company.company.id,
              comment: this.comment,
            },
            replay: false,
          }
          await this.$store.dispatch('comment/addComment', data)

          if (this.rate) {
            this.$store.state.company.company.rate = await this.rate
            await this.$store.dispatch(
              'company/rating',
              this.$store.state.company.company
            )
          }

          this.loading = false
          this.$v.$reset()
          this.comment = ''
        }
      } else {
        this.$toast.info('plase login to do that')
      }
    },
  },
}
</script>

<template>
  <v-card flat class="rounded-xl">
    <v-card-text>
      <v-textarea
        v-model="comment"
        label="leave comment"
        class="rounded-xl"
        dense
        height="100"
        outlined
        placeholder="enter comment"
        :error-messages="commentErrors"
        required
        @input="$v.comment.$touch()"
        @blur="$v.comment.$touch()"
      ></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-btn
        rounded
        color="primary"
        :loading="loading"
        :disabled="loading"
        @click="onSubmit"
      >
        add comment
        <v-icon class="mx-1">mdi-send</v-icon>
      </v-btn>
      <v-spacer />
      <v-rating
        v-model="rate"
        color="orange"
        background-color="orange lighten-3"
        dense
      ></v-rating>
    </v-card-actions>
  </v-card>
</template>
