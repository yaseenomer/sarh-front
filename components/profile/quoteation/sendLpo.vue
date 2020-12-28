<template>
  <v-card>
    <v-card-title>
      <p>send lpo</p>
      <v-spacer />
      <v-btn icon @click="closeWindow">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="subject"
        label="subject"
        outlined
        dense
        :error-messages="subjectErrors"
        required
        @blur="$v.subject.$touch()"
        @input="$v.body.$touch()"
      />

      <v-textarea
        v-model="body"
        label="description"
        outlined
        dense
        :error-messages="bodyErrors"
        required
        @input="$v.body.$touch()"
        @blur="$v.body.$touch()"
      />
      <v-file-input v-model="file" dense label="file"></v-file-input>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        elevation="0"
        :loading="saving"
        :disabled="saving"
        @click="sendLpo"
        >send</v-btn
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
  props: {
    quotationId: { type: String, required: true },
  },
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
      this.$emit('close-create-lpo-quote')
    },

    async sendLpo() {
      const fd = new FormData()
      fd.append('subject', this.subject)
      fd.append('body', this.body)
      fd.append('quotation_id', this.quotationId)
      fd.append('file', this.file)
      this.$v.$touch()

      if (this.$v.$invalid) return false

      this.saving = true

      try {
        await this.$store.dispatch('quote/sendLpo', fd)
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
