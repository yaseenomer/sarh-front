<template>
  <v-container>
    <v-row>
      <v-tabs vertical background-color="#eeeeee">
        <v-tab>
          <v-icon left>mdi-arrow-top-right-thick</v-icon>
          {{ $t('quotation.sentquotations') }}
        </v-tab>
        <v-tab>
          <v-icon left>mdi-arrow-bottom-left-thick</v-icon>
          {{ $t('quotation.receivedquotations') }}
        </v-tab>
        <v-tab-item>
          <v-container>
            <v-row>
              <v-subheader class="primary--text">
                <v-icon color="primary">mdi-format-quote-open-outline</v-icon>
                {{ $t('quotation.sentquotations') }}
              </v-subheader>
              <v-spacer />
              <v-btn
                color="primary"
                dark
                elevation="0"
                class="mx-2"
                rounded
                small
                @click="createQouteForm = true"
              >
                <v-icon>mdi-format-quote-open-outline</v-icon>
                {{ $t('quotation.createquotation') }}
              </v-btn>
            </v-row>
          </v-container>
          <v-divider />
          <v-container>
            <quote-card :quotes="[1, 2, 3]" :type="1" />
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container>
            <quote-card :quotes="[1, 2, 3]" :type="2" />
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-row>
    <div justify="center">
      <v-dialog v-model="createQouteForm" max-width="700px">
        <create-quote @close-create-quote="createQouteForm = false" />
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import quoteCard from '~/components/widget/quote/quoteCard'
import createQuote from '~/components/profile/company/quoteation/createQuote'
export default {
  components: { quoteCard, createQuote },
  data() {
    return {
      createQouteForm: false,
    }
  },
}
</script>

<style scoped></style>
