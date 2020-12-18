<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
  mixins: [validationMixin],
  data() {
    return {
      password: '',
      confirmation: '',
      loading: false,
    }
  },
  computed: {
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('password is required.')
      !this.$v.password.minLength &&
        errors.push('password must greater than 8 char.')
      return errors
    },
    confirmationErrors() {
      const errors = []
      if (!this.$v.confirmation.$dirty) return errors
      !this.$v.confirmation.sameAsPassword &&
        errors.push('Passwords must be identical.')
      return errors
    },
  },
  validations: {
    password: { required, minLength: minLength(8) },
    confirmation: { required, sameAsPassword: sameAs('password') },
  },

  methods: {
    onSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          this.loading = true
          this.$axios
            .post('user/apiNewPasswords/email', {
              email: localStorage.getItem('email-to-activate'),
              password: this.password,
              password_confirmation: this.confirmation,
            })
            .then(async (response) => {
              this.loading = false
              await this.$toast.success(response.data.message)
              this.$router.push('/')
            })
            .catch((err) => {
              this.loading = false
              this.$toast.error(err.response.error)
            })
        } catch (error) {
          this.$toast.success(error)
        }
      }
    },
  },
}
</script>

<template>
  <div class="background">
    <div class="center">
      <h2 class="primary--text">CHANGE PASSWORD</h2>
      <v-text-field
        v-model="password"
        label="new password"
        :error-messages="passwordErrors"
        prepend-icon="mdi-lock-outline"
        type="password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      />
      <v-text-field
        v-model="confirmation"
        label="password confirmation"
        prepend-icon="mdi-lock-outline"
        :error-messages="confirmationErrors"
        required
        @input="$v.confirmation.$touch()"
        @blur="$v.confirmation.$touch()"
      />
      <v-btn
        color="primary"
        elevation="0"
        :loading="loading"
        :disabled="loading"
        @click="onSubmit"
      >
        change password</v-btn
      >
    </div>
  </div>
</template>
