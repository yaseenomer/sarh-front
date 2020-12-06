<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-breadcrumbs :items="items"> </v-breadcrumbs>
    </v-col>
    <v-col cols="12" md="9">
      <v-card flat>
        <v-card-title>
          <span class="title font-weight-light">Twitter</span>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <p class="font-weight-bold">
            Turns out semicolon-less style is easier and safer in TS because
            most gotcha edge cases are type invalid as well. Turns out
            semicolon-less style is easier and safer in TS because most gotcha
            edge cases are type invalid as well. Turns out semicolon-less style
            is easier and safer in TS because most gotcha edge cases are type
            invalid as well.
          </p>
          <v-subheader>
            <v-icon>mdi-format-quote-open-outline</v-icon
            >quotations</v-subheader
          >
          <v-divider />
          <v-card v-for="i in 3" :key="i" flat class="my-2 rounded-xl" outlined>
            <v-card-title>
              <span class="title font-weight-light">Twitter</span>
              <v-spacer />
              <v-icon>mdi-calendar-month</v-icon>
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
                <v-avatar color="grey lighten-2" size="30">
                  <v-icon>mdi-account</v-icon>
                </v-avatar>
                <span>company name</span>
              </v-btn>

              <v-spacer />
              <v-chip> price $1000</v-chip>
              <v-btn
                rounded
                small
                color="grey lighten-2"
                elevation="0"
                class="mx-1"
              >
                <v-icon color="wight">mdi-paperclip</v-icon>
                <span>file name</span>
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
              <v-list-item-avatar color="grey lighten-3">
                <v-icon color="wight">mdi-calendar-month</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>1/2/2021</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset />
            <v-list-item>
              <v-list-item-avatar color="grey lighten-3">
                <v-icon color="wight">mdi-account-group-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>to multi</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset />
            <v-list-item>
              <v-list-item-avatar color="grey lighten-3">
                <v-icon color="wight">mdi-paperclip</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>has 1 file</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset />
            <v-list-item>
              <v-list-item-avatar color="grey lighten-3">
                <v-icon color="wight">mdi-format-quote-open-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>has 3 quotations</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset />
            <v-list-item>
              <v-list-item-avatar color="grey lighten-3">
                <v-icon color="wight">mdi-tag-text-outline</v-icon>
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
}
</script>
