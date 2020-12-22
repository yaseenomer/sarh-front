<template>
  <v-card>
    <v-card-title>
      <span class="primary--text">Request Quotations </span>
      <v-spacer />
      <v-btn
        elevation="0"
        color="primary"
        rounded
        @click="createQouteForm = true"
      >
        send request quotation
      </v-btn>
    </v-card-title>
    <v-card-text>
      <quote-card :quotes="myRequestQuotations" type="sent" />

      <div justify="center">
        <v-dialog v-model="createQouteForm" max-width="700px">
          <create-request-quote
            @close-create-request-quote="createQouteForm = false"
          />
        </v-dialog>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import quoteCard from '~/components/widget/quote/requestQuoteCard'
import createRequestQuote from '~/components/profile/quoteation/createRequestQuote'

export default {
  components: { quoteCard, createRequestQuote },
  data() {
    return {
      createQouteForm: false,
    }
  },
  computed: {
    ...mapGetters({
      myRequestQuotations: 'quote/myRequestQuotationsSent',
    }),
  },
  created() {
    this.$store.dispatch('quote/getMyRequestQuotationsSent')
  },
}
</script>

<style scoped></style>
