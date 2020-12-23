<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  props: {
    type: { type: String, required: true },
    objectId: { type: String, required: true },
  },
  data() {
    return {
      reason: '',
      description: '',
      loading: false,
      reasons: [
        { text: 'reason', value: 1 },
        { text: 'reason2', value: 2 },
        { text: 'reason3', value: 3 },
      ],
    }
  },
  validations: {
    reason: { required },
    description: { required },
  },
  computed: {
    reasonErrors() {
      const errors = []
      if (!this.$v.reason.$dirty) return errors
      !this.$v.reason.required && errors.push('reason is required.')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.required && errors.push('description is required.')
      return errors
    },
  },

  methods: {
    async sendReport() {
      if (this.$auth.loggedIn) {
        await this.$v.$touch()
        if (!this.$v.$invalid) {
          this.loading = true
          const data = {
            reason: this.reason,
            description: this.description,
          }
          this.type === 'post'
            ? (data.post_id = this.objectId)
            : (data.company = this.objectId)

          await this.$store.dispatch('account/sendReport', data)
          this.loading = false
          this.$emit('close-report-form')
        }
      } else {
        this.$toast.error('please login ...')
      }
    },
  },
}
</script>
<template>
  <v-card>
    <v-card-title>
      <p class="primary--text">create report</p>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-select
          v-model="reason"
          label="reason"
          :items="reasons"
          outlined
          dense
          required
          :error-messages="reasonErrors"
          @input="$v.reason.$touch()"
          @blur="$v.reason.$touch()"
        >
        </v-select>
        <v-textarea
          v-model="description"
          label="description"
          outlined
          dense
          required
          :error-messages="descriptionErrors"
          @input="$v.description.$touch()"
          @blur="$v.description.$touch()"
        >
        </v-textarea>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        elevation="0"
        :loading="loading"
        :disabled="loading"
        @click="sendReport"
      >
        send
        <v-icon>mdi-send</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn text @click="$emit('close-report-form')">
        <v-icon>mdi-close</v-icon>
        <span>close</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
