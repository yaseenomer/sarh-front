<template>
  <v-card>
    <v-card-title>
      <p class="primary--text">send request quotation</p>
      <v-spacer />
      <v-btn icon @click="closeWindow">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="subject"
        :label="$t('quotation.subject')"
        prepend-icon="mdi-alpha-s"
        :error-messages="subjectErrors"
        required
        outlined
        @input="$v.subject.$touch()"
        @blur="$v.subject.$touch()"
      ></v-text-field>

      <v-textarea
        v-model="body"
        label="description"
        :error-messages="bodyErrors"
        prepend-icon="mdi-text-subject"
        required
        outlined
        @input="$v.body.$touch()"
        @blur="$v.body.$touch()"
      ></v-textarea>
      <v-file-input v-model="file" label="file"></v-file-input>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        elevation="0"
        :loading="saving"
        :disabled="saving"
        @click="sendRequestQuote"
        >{{ $t('buttons.save') }}</v-btn
      >
      <v-spacer />
      <v-btn elevation="0" @click="closeWindow">{{
        $t('buttons.cancel')
      }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import quotaitionValidation from '~/components/auth/mixin/quotaitionValidation'
export default {
  mixins: [validationMixin, quotaitionValidation],
  props: ['companyId'],
  data() {
    return {
      subject: '',
      body: '',
      file: null,
      saving: false,
    }
  },
  validations: {
    subject: { required },
    body: { required },
  },
  methods: {
    closeWindow() {
      this.$emit('close-create-request-quote-for-company')
    },

    async sendRequestQuote() {
      this.$v.$touch()

      if (this.$v.$invalid) return false

      const fd = new FormData()
      fd.append('subject', this.subject)
      fd.append('body', this.body)
      fd.append('company', this.companyId)
      fd.append('file', this.file)

      this.saving = true

      try {
        await this.$store.dispatch('quote/sendRequestQuotationForCompany', fd)
        this.saving = false
        this.closeWindow()
        this.$toast.success('send request successful')
      } catch (e) {
        this.saving = false
        this.$toast.error('something error')
      }
    },
  },
}
</script>

<style scoped></style>
