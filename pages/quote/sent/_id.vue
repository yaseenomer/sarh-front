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
                <span class="primary--text">quotations</span>
              </v-subheader>
            </v-row>
          </v-container>

          <v-divider />
          <v-card v-for="i in 3" :key="i" flat class="my-2 rounded-xl" outlined>
            <v-card-title>
              <span class="title font-weight-light primary--text">Twitter</span>
              <v-spacer />
              <v-icon color="primary">mdi-calendar-month</v-icon>
              <span class="subtitle-1 font-weight-light">1/2/2021</span>
            </v-card-title>
            <v-card-text>
              <p class="font-weight-bold">
                Turns out semicolon-less style is easier and safer in TS because
                most gotcha edge cases are type invalid as well. Turns out
                semicolon-less style is easier and safer in TS because most
                gotcha edge cases are type invalid as well. Turns out
                semicolon-less style is easier and safer in TS because most
                gotcha edge cases are type invalid as well.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn text rounded>
                <v-avatar color="blue lighten-4" size="30">
                  <v-icon color="primary">mdi-account-circle-outline</v-icon>
                </v-avatar>
                <span class="primary--text">company name</span>
              </v-btn>

              <v-spacer />
              <v-chip color="blue lighten-4" text-color="primary">
                price $1000</v-chip
              >
              <v-btn
                rounded
                small
                color="blue lighten-4"
                elevation="0"
                class="mx-1"
              >
                <v-icon color="primary">mdi-paperclip</v-icon>
                <span class="primary--text">file name</span>
              </v-btn>
            </v-card-actions>
          </v-card>
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
                <v-list-item-title>{{ RQ.date }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset />
            <v-list-item>
              <v-list-item-avatar color="blue lighten-4">
                <v-icon color="primary">mdi-account-group-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>to multi</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset />
            <v-list-item>
              <v-list-item-avatar color="blue lighten-4">
                <v-icon color="primary">mdi-paperclip</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>has 1 file</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset />
            <v-list-item>
              <v-list-item-avatar color="blue lighten-4">
                <v-icon color="primary">mdi-format-quote-open-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>has 3 quotations</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset />
            <v-list-item>
              <v-list-item-avatar color="blue lighten-4">
                <v-icon color="primary">mdi-tag-text-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>main activity</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  asyncData({ params }) {
    const items = [
      {
        text: 'Home',
        disabled: false,
        to: '/',
      },
      {
        text: 'Profile',
        disabled: false,
        to: '/',
      },
      {
        text: `quotation`,
        disabled: true,
      },
    ]
    return {
      id: params.id,
      items,
    }
  },
  computed: {
    ...mapGetters({ RQ: 'quote/myReqestQuotationDetails' }),
  },

  created() {
    this.$store.dispatch('quote/getMyRequestQuotationDetails', this.id)
  },
}
</script>
