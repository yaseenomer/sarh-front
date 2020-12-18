<script>
import { email, required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import registerValidation from '~/components/auth/mixin/registerValidation'
export default {
  mixins: [validationMixin, registerValidation],
  data() {
    return {
      email: '',
      loading: false,
    }
  },
  validations: {
    email: { email, required },
  },

  methods: {
    async onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return false
      this.loading = true
      const res = await this.$store.dispatch(
        'account/resetPassword',
        this.email
      )
      this.loading = false
      if (!res.error) {
        this.onSuccess(res)
      }
    },

    onSuccess(res) {
      localStorage.setItem('email-to-activate', this.email)
      localStorage.setItem('activate-status', 'reset')
      console.log(res)
      this.$toast.success(res.message)
      this.$router.push('/profile/activate')
    },
  },
}
</script>

<template>
  <div class="background">
    <div class="center">
      <h2 class="primary--text">RESET PASSWORD</h2>
      <p>
        Don't worry! Enter your email below and we will send you an email
        contain the password reset link.
      </p>

      <v-form>
        <v-text-field
          v-model="email"
          label="Enter your email"
          prepend-icon="mdi-email-outline"
          :error-messages="emailErrors"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        />
        <v-btn
          color="primary"
          :loading="loading"
          :disabled="loading"
          @click="onSubmit"
        >
          send
        </v-btn>
      </v-form>
    </div>
  </div>
</template>
<style scoped>
.background {
  min-height: auto;
  padding: 20px;
}
</style>
