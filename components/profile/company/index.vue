<template>
  <v-tabs icons-and-text centered>
    <v-tab>
      info
      <v-icon>mdi-information-variant</v-icon>
    </v-tab>
    <v-tab>
      inquery
      <v-icon>mdi-comment-quote-outline</v-icon>
    </v-tab>
    <v-tab>
      posts
      <v-icon>mdi-post-outline</v-icon>
    </v-tab>
    <v-tab>
      favorite company
      <v-icon>mdi-heart-outline</v-icon>
    </v-tab>
    <v-tab>
      comments
      <v-icon>mdi-comment-text-multiple-outline</v-icon>
    </v-tab>
    <v-tab>
      security
      <v-icon>mdi-security</v-icon>
    </v-tab>
    <v-tab-item>
      <info />
    </v-tab-item>
  </v-tabs>
</template>

<script>
import info from '~/components/profile/company/info/info'
export default {
  components: { info },
}
</script>

<style scoped></style>
