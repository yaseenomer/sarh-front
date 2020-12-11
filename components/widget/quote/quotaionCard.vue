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
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    quotations: { type: Array, required: true },
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
  },
}
</script>

<style scoped></style>
