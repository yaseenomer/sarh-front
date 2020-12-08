<template>
  <v-row>
    <v-col v-for="(quote, i) in quotes" :key="i" cols="12" md="4">
      <v-card
        class="rounded-lg"
        outlined
        hover
        :to="{ name: 'quote-id', params: { id: quote.id } }"
      >
        <v-card-title>
          <span class="title font-weight-light">{{ quote.subject }}</span>
        </v-card-title>

        <v-card-text>
          <p class="font-weight-bold text-truncate">
            {{ quote.body }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-icon v-if="quote.download_inquiry_attachment_url" class="mr-1">
            mdi-paperclip
          </v-icon>
          <v-spacer />
          <v-icon>mdi-calendar-month</v-icon>
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
    type: { type: Number, required: true },
  },
}
</script>

<style scoped></style>
