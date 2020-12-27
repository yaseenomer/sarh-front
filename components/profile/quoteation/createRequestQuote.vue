<template>
  <v-card>
    <v-card-title>
      <p>{{ $t('quotation.createquotation') }}</p>
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
        @input="$v.subject.$touch()"
        @blur="$v.subject.$touch()"
      ></v-text-field>

      <v-textarea
        v-model="body"
        :label="$t('quotation.body')"
        :error-messages="bodyErrors"
        prepend-icon="mdi-text-subject"
        required
        @input="$v.body.$touch()"
        @blur="$v.body.$touch()"
      ></v-textarea>
      <v-select
        v-model="send_to"
        :label="$t('quotation.sendto')"
        prepend-icon="mdi-account-arrow-right-outline"
        :items="items"
        :error-messages="sendToErrors"
        required
        @input="$v.send_to.$touch()"
        @blur="$v.send_to.$touch()"
      />

      <v-select
        v-model="activity_id"
        :label="$t('quotation.activity')"
        prepend-icon="mdi-tag-outline"
        item-text="name"
        item-value="id"
        :loading="!$store.state.activity.activites.length"
        :items="$store.state.activity.activites"
        :error-messages="activityErrors"
        required
        @input="$v.activity_id.$touch()"
        @blur="$v.activity_id.$touch()"
      />
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
  data() {
    return {
      subject: '',
      body: '',
      send_to: '',
      activity_id: '',
      file: null,
      saving: false,
      items: [
        { value: 1, text: 'favorites' },
        { value: 2, text: 'sarh recomendation' },
        { value: 3, text: 'random' },
      ],
    }
  },
  validations: {
    subject: { required },
    body: { required },
    send_to: { required },
    activity_id: { required },
  },
  created() {
    this.$store.dispatch('activity/getActivities')
  },
  methods: {
    closeWindow() {
      this.$emit('close-create-request-quote')
    },

    async sendRequestQuote() {
      this.$v.$touch()

      if (this.$v.$invalid) return false

      const fd = new FormData()
      fd.append('subject', this.subject)
      fd.append('body', this.body)
      fd.append('activity_id', this.activity_id)
      fd.append('send_to', this.send_to)
      fd.append('file', this.file)

      this.saving = true

      try {
        await this.$store.dispatch('quote/sendRequestQuotation', fd)
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
