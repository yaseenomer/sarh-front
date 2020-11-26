export default {
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('enter valid email ')
      !this.$v.email.required && errors.push('Email is required.')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.full_name.$dirty) return errors
      !this.$v.full_name.required && errors.push('name is required.')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('password is required.')
      !this.$v.password.minLength &&
        errors.push('password must greater than 8 char.')
      return errors
    },
    passwordConfirmationErrors() {
      const errors = []
      if (!this.$v.password_confirmation.$dirty) return errors
      !this.$v.password_confirmation.sameAsPassword &&
        errors.push('Passwords must be identical.')
      return errors
    },

    termsErrors() {
      const errors = []
      if (!this.$v.terms.$dirty) return errors
      !this.$v.terms.checked && errors.push('You must agree terms!')
      return errors
    },
  },
}
