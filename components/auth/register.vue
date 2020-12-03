<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import registerValidation from './mixin/registerValidation'
import { mapGetters } from 'vuex'
export default {
  mixins: [validationMixin, registerValidation],
  data() {
    return {
      full_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      terms: false,
      type: 'password',
      loading: false,
      checkbox2: '',
    }
  },
  computed: {
    ...mapGetters({ registerType: 'user/registerType' }),
    registerInfo() {
      return {
        full_name: this.full_name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        type: this.registerType,
      }
    },
  },
  validations: {
    full_name: { required },
    email: { required, email },
    type: { required },
    password: { required, minLength: minLength(8) },
    password_confirmation: { sameAsPassword: sameAs('password') },
    terms: {
      required,
      checked(val) {
        return val
      },
    },
  },
  methods: {
    async changeTypePassword() {
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    },
    async onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return false
      this.loading = await true
      const u = await this.$store.dispatch('user/register', this.registerInfo)
      this.loading = false
      if (!u.error) {
        this.onSuccess(u)
      }
    },
    onSuccess(user) {
      this.$toast.success(user.message)
      localStorage.setItem('email-to-activate', this.email)
      localStorage.setItem('activate-status', 'activate')
      this.$router.push('/account/activate')
      this.$v.$reset()
      this.$store.commit('user/setRegisterForm', { status: false, type: 1 })
    },
  },
}
</script>
<template>
  <v-card>
    <v-card-text>
      <div class="logo text-center">
        <img src="/Logo/logo.png" class="mt-5" />
      </div>
      <form class="row pt-1" @submit.prevent="onSubmit">
        <v-text-field
          v-model="full_name"
          outlined
          dense
          :label="registerType === 2 ? 'Company Name' : 'full name'"
          :prepend-icon="
            registerType === 1
              ? 'mdi-account-circle-outline'
              : 'mdi-office-building'
          "
          :error-messages="nameErrors"
          required
          @input="$v.full_name.$touch()"
          @blur="$v.full_name.$touch()"
        />

        <v-text-field
          v-model="email"
          outlined
          dense
          :label="$t('auth.Email')"
          prepend-icon="mdi-email-outline"
          :error-messages="emailErrors"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        />
        <v-text-field
          v-model="password"
          outlined
          dense
          :type="type"
          :label="$t('auth.Password')"
          prepend-icon="mdi-lock-outline"
          :error-messages="passwordErrors"
          required
          :append-icon="
            type === 'password' ? 'fas fa-eye-slash' : 'fas fa-eye text-primary'
          "
          @click:append="changeTypePassword"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        />
        <v-text-field
          v-model="password_confirmation"
          outlined
          dense
          :type="type"
          :label="$t('auth.passwordconfirmation')"
          prepend-icon="mdi-lock-outline"
          :error-messages="passwordConfirmationErrors"
          required
          :append-icon="
            type === 'password' ? 'fas fa-eye-slash' : 'fas fa-eye text-primary'
          "
          @click:append="changeTypePassword"
          @input="$v.password_confirmation.$touch()"
          @blur="$v.password_confirmation.$touch()"
        />
        <v-checkbox
          v-model="terms"
          :label="$t('auth.Acceptpoliciesandterms')"
          :error-messages="termsErrors"
          required
          dense
          @change="$v.terms.$touch()"
          @blur="$v.terms.$touch()"
        />
        <v-checkbox
          v-model="checkbox2"
          dense
          :label="$t('auth.Reciveupdateandofferfromus')"
        />
      </form>
      <v-divider />
      <v-card-actions>
        <v-row justify="space-around" no-gutters align="center">
          <v-btn
            color="primary"
            :disabled="loading"
            type="submit"
            :loading="loading"
            rounded
            @click="onSubmit"
          >
            {{ $t('auth.signup') }}
          </v-btn>
          <v-btn text color="primary">{{ $t('auth.readtermspolicies') }}</v-btn>
        </v-row>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>
