<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import loginWithSocial from './social'
import { validationMixin } from 'vuelidate'
import registerValidation from './mixin/registerValidation'

export default {
  components: { loginWithSocial },
  mixins: [validationMixin, registerValidation],
  data() {
    return {
      email: '',
      password: '',
      type: 'password',
      loading: false,
      checkbox: false,
    }
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
  },
  methods: {
    async forgotPassword() {
      await this.$emit('close-login-form')
      this.$router.push('/account/reset')
    },
    async onSubmit() {
      await this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = await true
        this.$auth
          .loginWith('local', {
            data: { email: this.email, password: this.password },
          })
          .then(() => {
            this.loading = false
            this.$store.dispatch('company/getCompanies')
            this.email = ''
            this.password = ''
            this.$v.$reset()
            this.$store.commit('user/setLoginForm', false)
          })
          .catch((e) => {
            if (e.response.data.tow_factor) {
              this.loading = false
              localStorage.setItem('email-for-tow-factor', this.user.email)
              this.$bvModal.hide('login-modal')
              this.$toast.info(e.response.data.message)
              // return this.$router.push('/account/factorActivate')
            }
            this.$toast.error('username or password is invalid')
            this.loading = false
          })
      } else {
        return true
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
  <!-- Modal Register -->
  <v-card>
    <v-card-text>
      <div class="pt-0 modal-login">
        <div class="form-login">
          <div class="logo text-center">
            <img src="/Logo/logo.png" alt="" class="my-5" />
          </div>

          <form class="row pt-1" autocomplete="off" @submit.prevent="onSubmit">
            <v-text-field
              v-model="email"
              type="email"
              :error-messages="emailErrors"
              label="Email"
              outlined
              dense
              prepend-icon="mdi-email-outline"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            />
            <v-text-field
              v-model="password"
              :type="type"
              outlined
              dense
              label="Password"
              :error-messages="passwordErrors"
              prepend-icon="mdi-lock-outline"
              :append-icon="
                type == 'password'
                  ? 'fas fa-eye-slash'
                  : 'fas fa-eye text-primary'
              "
              @click:append="changeType"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            />
            <v-responsive>
              <v-btn text color="primary" @click="forgotPassword"
                >Forgotten your password?</v-btn
              >
            </v-responsive>
            <v-btn
              block
              rounded
              elevation="0"
              type="submit"
              :disabled="loading"
              :loading="loading"
              color="primary"
            >
              Sign in
            </v-btn>
            <div class="form-group col-sm-12 text-center mt-2">
              <span class="or">Or Rgister With</span>
            </div>
            <div class="col-sm-12">
              <loginWithSocial />
            </div>
          </form>
        </div>
      </div>
    </v-card-text>
  </v-card>
  <!-- End Modal Register -->
</template>
