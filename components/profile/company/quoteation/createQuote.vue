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
      ></v-text-field>

      <v-textarea
        v-model="body"
        label="body"
        :error-messages="bodyErrors"
        prepend-icon="mdi-text-subject"
        required
        @input="$v.body.$touch()"
        @blur="$v.body.$touch()"
      ></v-textarea>
      <v-select
        v-model="send_to"
        label="send to"
        prepend-icon="mdi-account-arrow-right-outline"
        :items="items"
      />

      <v-select
        v-model="activity_id"
        label="activity"
        prepend-icon="mdi-tag-outline"
        item-text="name"
        item-value="id"
        :loading="!$store.state.activity.activites.length"
        :items="$store.state.activity.activites"
      />
      <v-file-input v-model="file" multiple label="files"></v-file-input>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        elevation="0"
        :loading="saving"
        :disabled="saving"
        @click="sendRequestQuote"
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
  data() {
    return {
      subject: '',
      body: '',
      send_to: '',
      activity_id: '',
      file: [],
      saving: false,
      items: [
        { value: 1, text: 'favorites' },
        { value: 2, text: 'sarh recomendation' },
        { value: 3, text: 'random' },
      ],
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
  created() {
    this.$store.dispatch('activity/getActivities')
  },
  methods: {
    closeWindow() {
      this.$emit('close-create-quote')
    },

    async sendRequestQuote() {
      const quote = {
        subject: this.subject,
        body: this.body,
        file: this.file,
        activity_id: this.activity_id,
        send_to: this.send_to,
      }
      this.$v.$touch()

      if (this.$v.$invalid) return false

      this.saving = true

      try {
        await this.$store.dispatch('quote/sendRequestQuotation', quote)
        this.saving = false
      } catch (e) {
        this.saving = false
        this.$toast.error('something error')
      }
    },
  },
}
</script>

<style scoped></style>
