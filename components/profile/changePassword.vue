<script>
import { mapActions } from 'vuex'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
  mixins: [validationMixin],
  data() {
    return {
      type: 'password',
      loading: false,
      current_password: '',
      new_password: '',
      password_confirmation: '',
    }
  },
  computed: {
    currentPasswordErrors() {
      const errors = []
      if (!this.$v.current_password.$dirty) return errors
      !this.$v.current_password.required &&
        errors.push('current password is required.')
      return errors
    },
    newPasswordErrors() {
      const errors = []
      if (!this.$v.new_password.$dirty) return errors
      !this.$v.new_password.required && errors.push('new password is required.')
      !this.$v.new_password.minLength &&
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
    passordData() {
      return {
        current_password: this.current_password,
        new_password: this.new_password,
        password_confirmation: this.password_confirmation,
      }
    },
  },
  validations: {
    current_password: { required },
    new_password: { required, minLength: minLength(8) },
    password_confirmation: { sameAsPassword: sameAs('new_password') },
  },
  methods: {
    ...mapActions({ changePasswordAction: 'user/changePassword' }),
    async onSubmit() {
      await this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = true
        await this.changePasswordAction(this.passordData)
        this.loading = false
      }
    },

    async changeType() {
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    },
  },
}
</script>
<template>
  <v-card flat rounded :loading="loading">
    <v-card-title>
      <v-btn text color="primary" readonly>
        <v-icon>mdi-lock-reset</v-icon>
        <span> change password</span>
      </v-btn>
      <v-spacer />
      <v-btn
        text
        color="primary"
        :disabled="loading"
        :loading="loading"
        @click="onSubmit"
      >
        <v-icon>mdi-content-save-all-outline</v-icon>
        <span>save changes </span>
      </v-btn>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="current_password"
              :type="type"
              prepend-icon="mdi-lock-check"
              label="Current Password"
              required
              :append-icon="
                type == 'password'
                  ? 'fas fa-eye-slash'
                  : 'fas fa-eye text-primary'
              "
              :error-messages="currentPasswordErrors"
              @click:append="changeType"
              @input="$v.current_password.$touch()"
              @blur="$v.current_password.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="new_password"
              :type="type"
              label="New Password"
              prepend-icon="mdi-lock-outline"
              required
              :error-messages="newPasswordErrors"
              :append-icon="
                type == 'password'
                  ? 'fas fa-eye-slash'
                  : 'fas fa-eye text-primary'
              "
              @click:append="changeType"
              @input="$v.new_password.$touch()"
              @blur="$v.new_password.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="password_confirmation"
              :type="type"
              label="Confirm Password"
              prepend-icon="mdi-lock-reset"
              required
              :error-messages="passwordConfirmationErrors"
              :append-icon="
                type == 'password'
                  ? 'fas fa-eye-slash'
                  : 'fas fa-eye text-primary'
              "
              @click:append="changeType"
              @input="$v.password_confirmation.$touch()"
              @blur="$v.password_confirmation.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
