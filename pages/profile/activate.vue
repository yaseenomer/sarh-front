<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
  mixins: [validationMixin],
  data() {
    return {
      code: '',
      loading: false,
      reSendLoading: false,
    }
  },
  validations: {
    code: { required },
  },
  computed: {
    codeErrors() {
      const errors = []
      if (!this.$v.code.$dirty) return errors
      !this.$v.code.required && errors.push('code is required.')
      return errors
    },
    yourEmail() {
      return localStorage.getItem('email-to-activate')
    },
  },

  methods: {
    onSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = true
        try {
          this.$axios
            .post('user/apiUsers/activate-user', {
              code: this.code,
              email: this.yourEmail,
            })
            .then(async (response) => {
              this.loading = false
              await this.$toast.success(response.data.message)
              if (localStorage.getItem('activate-status') === 'reset') {
                await this.$router.push('/profile/newPassword')
              } else {
                await this.$router.push('/')
                this.$bvModal.show('login-modal')
              }
            })
            .catch((err) => {
              this.loading = false
              this.$toast.error(err.response.data.error)
            })
        } catch (error) {
          this.loading = false
          this.$toast.success(error)
        }
      }
    },
    reSend() {
      this.reSendLoading = true
      try {
        this.$axios
          .post('user/apiVerifications/resend-message', {
            email: this.yourEmail,
          })
          .then(async (response) => {
            this.reSendLoading = false
            await this.$toast.success(response.data.error)
          })
          .catch((err) => {
            this.reSendLoading = false
            this.$toast.error(err.response.data.error)
          })
      } catch (error) {
        this.reSendLoading = false
        this.$toast.success(error)
      }
    },
  },
}
</script>

<template>
  <div>
    <H2 class="primary--text">ACTIVATION CODE</H2>
    <v-text-field
      v-model="code"
      label="activation code"
      placeholder="Enter your activation code"
      :error-messages="codeErrors"
      required
      @input="$v.code.$touch()"
      @blur="$v.code.$touch()"
    />
    <v-btn small :loading="loading" color="primary" @click="onSubmit">
      activate
    </v-btn>
    <v-btn
      small
      :disabled="reSendLoading"
      :loading="reSendLoading"
      text
      color="primary"
      @click="reSend"
    >
      resend activate code
    </v-btn>
  </div>

  <!--  <div class="background">-->
  <!--    <div class="center">-->
  <!--      <div class="text-center mb-2">-->
  <!--        <img src="/images/Logo/logo.png" class="" alt="" width="165" />-->
  <!--      </div>-->
  <!--      <b-form>-->
  <!--        <b-form-group>-->
  <!--          <b-form-input-->
  <!--            v-model="$v.form.code.$model"-->
  <!--            type="text"-->
  <!--            :state="validateState('code')"-->
  <!--            placeholder="Enter your activation code"-->
  <!--          />-->
  <!--          <b-form-invalid-feedback>Enter code </b-form-invalid-feedback>-->
  <!--        </b-form-group>-->
  <!--        <v-btn-->
  <!--          small-->
  <!--          :loading="loading"-->
  <!--          :disabled="loading || $v.$invalid"-->
  <!--          color="primary"-->
  <!--          @click="onSubmit"-->
  <!--        >-->
  <!--          activate-->
  <!--        </v-btn>-->
  <!--        <v-btn-->
  <!--          small-->
  <!--          :disabled="reSendLoading"-->
  <!--          :loading="reSendLoading"-->
  <!--          text-->
  <!--          color="primary"-->
  <!--          @click="reSend"-->
  <!--        >-->
  <!--          resend activate code-->
  <!--        </v-btn>-->
  <!--      </b-form>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<style scoped>
.center {
  background: white;
  width: 430px;
  box-shadow: 0px 3px 9.5px 1.5px rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  padding: 40px 50px 45px;
}
.background {
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: auto;
  padding: 20px;
  position: relative;
}
</style>
