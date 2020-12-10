<template>
  <v-card>
    <v-card-title>
      <p>create quote</p>
      <v-spacer />
      <v-btn icon @click="closeWindow">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="subject"
        label="subject"
        prepend-icon="mdi-alpha-s"
        :error-messages="subjectErrors"
        required
        @input="$v.subject.$touch()"
        @blur="$v.subject.$touch()"
      />

      <v-textarea
        v-model="body"
        label="body"
        :error-messages="bodyErrors"
        prepend-icon="mdi-text-subject"
        required
        @input="$v.body.$touch()"
        @blur="$v.body.$touch()"
      />
      <v-file-input v-model="file" label="file"></v-file-input>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        elevation="0"
        :loading="saving"
        :disabled="saving"
        @click="sendQuote"
        >save</v-btn
      >
      <v-spacer />
      <v-btn elevation="0" @click="closeWindow">cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
  mixins: [validationMixin],
  props: {
    inquiryId: { type: String, required: true },
  },
  data() {
    return {
      subject: '',
      body: '',
      file: null,
      saving: false,
    }
  },
  computed: {
    subjectErrors() {
      const errors = []
      if (!this.$v.subject.$dirty) return errors
      !this.$v.subject.required && errors.push('subject is required.')
      return errors
    },
    bodyErrors() {
      const errors = []
      if (!this.$v.body.$dirty) return errors
      !this.$v.body.required && errors.push('body is required.')
      return errors
    },
  },
  validations: {
    subject: { required },
    body: { required },
  },
  methods: {
    closeWindow() {
      this.$emit('close-create-quote')
    },

    async sendQuote() {
      const fd = new FormData()
      fd.append('subject', this.subject)
      fd.append('body', this.body)
      fd.append('inquiry_id', this.inquiryId)
      fd.append('file', this.file, this.file.name)
      this.$v.$touch()

      if (this.$v.$invalid) return false

      this.saving = true

      try {
        await this.$store.dispatch('quote/sendQuotation', fd)
        this.saving = false
        this.closeWindow()
      } catch (e) {
        this.saving = false
        this.$toast.error('something error')
      }
    },
  },
}
</script>

<style scoped></style>
