<template>
  <v-row>
    <v-col v-for="(quote, i) in quotes" :key="i" cols="12" md="4">
      <v-card
        class="rounded-lg"
        outlined
        hover
        :to="{
          name: 'quote-request-id',
          query: { quote: quote.id, type, profile },
        }"
      >
        <v-card-text>
          <p class="font-weight-bold text-truncate">
            {{ quote.subject }}
          </p>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-icon
            v-if="quote.download_inquiry_attachment_url"
            class="mr-1"
            color="primary"
          >
            mdi-paperclip
          </v-icon>
          <v-spacer />
          <v-icon color="primary">mdi-calendar-month</v-icon>
          <span class="subtitle-1 font-weight-light">
            {{ quote.created_at }}
          </span>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    quotes: { type: Array, required: true },
    type: { type: String, required: true },
  },
  computed: {
    profile() {
      return this.$auth.user.type === 2 ? 'company' : 'user'
    },
  },
}
</script>

<style scoped></style>
