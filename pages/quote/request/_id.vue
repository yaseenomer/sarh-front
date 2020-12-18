<template>
  <v-row v-if="RQ">
    <v-col cols="12" md="12">
      <v-breadcrumbs :items="items"> </v-breadcrumbs>
    </v-col>
    <v-col cols="12" md="9">
      <v-card flat>
        <v-card-title>
          <span class="title font-weight-light primary--text">{{
            RQ.subject
          }}</span>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <p class="font-weight-bold" v-text="RQ.body"></p>
          <v-container>
            <v-row>
              <v-subheader>
                <v-icon color="primary">mdi-format-quote-open-outline</v-icon>
                <span class="primary--text">
                  quotations ( {{ Qs.length }} )
                </span>
              </v-subheader>
              <v-spacer />
              <v-btn
                v-if="type === 'received'"
                color="primary"
                small
                elevation="0"
                rounded
                @click="createQuote = true"
              >
                <v-icon>mdi-format-quote-open-outline</v-icon>
                <span>send Quotation</span>
              </v-btn>
            </v-row>
          </v-container>

          <v-divider />
          <quotaion-card :quotations="Qs" />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card flat>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-avatar color="blue lighten-4">
                <v-icon color="primary">mdi-calendar-month</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ RQ.created_at }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset />
            <v-list-item>
              <v-list-item-avatar color="blue lighten-4">
                <v-icon color="primary">mdi-pound-box-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ RQ.number }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset />
            <v-list-item>
              <v-list-item-avatar color="blue lighten-4">
                <v-icon color="primary">mdi-paperclip</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>file</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset />
            <v-list-item>
              <v-list-item-avatar color="blue lighten-4">
                <v-icon color="primary">mdi-format-quote-open-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  has ( {{ Qs.length }} ) quotations
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <!-- registration form start -------------------------------------------------->
    <div justify="center">
      <v-dialog v-model="createQuote" max-width="700px">
        <create-quote
          :inquiry-id="RQ.id.toString()"
          @close-create-quote="createQuote = false"
        />
      </v-dialog>
    </div>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import createQuote from '~/components/profile/quoteation/createQuote'
import quotaionCard from '~/components/widget/quote/quotaionCard'
export default {
  components: { createQuote, quotaionCard },
  asyncData({ query }) {
    const items = [
      {
        text: 'Home',
        disabled: false,
        to: '/',
      },
      {
        text: 'Profile',
        disabled: false,
        to: '/profile/company?tab=quote',
      },
      {
        text: `Request quotation ${query.type}`,
        disabled: true,
      },
    ]
    return {
      id: query.quote,
      type: query.type,
      createQuote: false,
      items,
    }
  },
  computed: {
    ...mapGetters({
      RQ: 'quote/myReqestQuotationDetails',
      Qs: 'quote/quotations',
    }),
  },

  created() {
    this.$store.dispatch('quote/getMyRequestQuotationDetails', this.id)
    this.$store.dispatch('quote/getQuotations', this.id)
  },
}
</script>
