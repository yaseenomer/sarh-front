<template>
  <v-row>
    <v-col v-for="(quote, i) in quotes" :key="i" cols="12" md="4">
      <v-card
        class="rounded-lg"
        outlined
        hover
        :to="{ name: 'quote-id', params: { id: 55 } }"
      >
        <v-card-title>
          <span class="title font-weight-light">Twitter</span>
          <v-spacer />
          <v-icon>mdi-calendar-month</v-icon>
          <span class="subtitle-1 font-weight-light">1/2/2021</span>
        </v-card-title>

        <v-card-text>
          <v-chip x-small>main activity</v-chip>
          <p class="font-weight-bold text-truncate">
            "Turns out semicolon-less style is easier and safer in TS because
            most gotcha edge cases are type invalid as well."
          </p>
        </v-card-text>

        <v-card-actions>
          <template v-if="type === 1">
            <v-avatar color="grey" size="35">
              <v-icon>mdi-account-group-outline</v-icon>
            </v-avatar>
            <span class="subtitle-1 mx-2">to multi</span>
          </template>
          <template v-else>
            <v-avatar color="grey" size="35">
              <v-icon>mdi-account</v-icon>
            </v-avatar>
            <span class="subtitle-1 mx-2">user name</span>
          </template>
          <v-spacer />
          <span class="mx-1">
            <span>3</span>
            <v-icon class="mr-1">mdi-paperclip</v-icon>
          </span>
          <span class="mx-1">
            <span>3</span>
            <v-icon>mdi-format-quote-open-outline</v-icon>
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
