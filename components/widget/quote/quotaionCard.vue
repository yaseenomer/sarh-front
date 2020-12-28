<template>
  <div>
    <v-card
      v-for="(quote, i) in quotations"
      :key="i"
      flat
      class="my-2 rounded-xl"
      outlined
    >
      <v-card-title>
        <span
          class="title font-weight-light primary--text"
          v-text="quote.subject"
        />
        <v-spacer />
        <v-icon color="primary">mdi-calendar-month</v-icon>
        <span class="subtitle-1 font-weight-light" v-text="quote.created_at" />
      </v-card-title>
      <v-card-text>
        <p class="font-weight-bold" v-text="quote.body" />
        <v-expansion-panels v-if="quote.lpo" flat>
          <v-expansion-panel>
            <v-expansion-panel-header> lpo </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card outlined class="my-2 rounded-xl">
                <v-card-title>
                  <span>{{ quote.lpo.subject }}</span>
                  <v-spacer />
                  <span>{{ quote.lpo.created_at }}</span>
                </v-card-title>
                <v-card-text>{{ quote.lpo.body }} </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-card-actions>
        <v-btn text rounded>
          <v-avatar color="blue lighten-4" size="30">
            <v-icon color="primary">mdi-account-circle-outline</v-icon>
          </v-avatar>
          <span class="primary--text" v-text="quote.user.name" />
        </v-btn>

        <v-spacer />
        <v-btn
          v-if="quote.download_quotation_attachment_url"
          rounded
          small
          color="blue lighten-4"
          elevation="0"
          class="mx-1"
          @click="downloadFile(quote.id)"
        >
          <v-icon color="primary">mdi-paperclip</v-icon>
          <v-icon color="primary">mdi-download</v-icon>
        </v-btn>
        <v-btn
          v-if="$route.query.type === 'sent' && !quote.lpo"
          elevation="0"
          rounded
          color="blue lighten-4"
          small
          @click="sendLpoAction(quote.id)"
        >
          <span class="primary--text">send lpo</span>
          <v-icon color="primary">mdi-send</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- send lpo form start --------------------------------------------------------->
    <div justify="center">
      <v-dialog v-model="sendLpoForm" max-width="600px">
        <send-lpo
          :quotation-id="qoutationId.toString()"
          @close-create-lpo-quote="sendLpoForm = false"
        />
      </v-dialog>
    </div>
    <!-- send lpo form end ----------------------------------------------------------->
  </div>
</template>

<script>
import sendLpo from '~/components/profile/quoteation/sendLpo'
export default {
  components: { sendLpo },
  props: {
    quotations: { type: Array, required: true },
  },
  data() {
    return {
      qoutationId: 0,
      sendLpoForm: false,
    }
  },
  methods: {
    async downloadFile(id) {
      const file = await this.$store.dispatch('quote/downloadFile', id)
      const blob = new Blob([file], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'quotation'
      link.click()
      URL.revokeObjectURL(link.href)
    },
    sendLpoAction(id) {
      this.qoutationId = id
      this.sendLpoForm = true
    },
  },
}
</script>

<style scoped></style>
