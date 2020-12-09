<template>
  <v-tabs icons-and-text centered background-color="#eeeeee">
    <v-tab>
      {{ $t('company.info') }}
      <v-icon>mdi-information-variant</v-icon>
    </v-tab>
    <v-tab>
      {{ $t('company.posts') }}
      <v-icon>mdi-post-outline</v-icon>
    </v-tab>
    <v-tab>
      {{ $t('company.inquery') }}
      <v-icon>mdi-comment-quote-outline</v-icon>
    </v-tab>
    <v-tab>
      {{ $t('company.favoritecompany') }}
      <v-icon>mdi-heart-outline</v-icon>
    </v-tab>
    <v-tab>
      {{ $t('company.comments') }}
      <v-icon>mdi-comment-text-multiple-outline</v-icon>
    </v-tab>
    <v-tab>
      {{ $t('company.security') }}
      <v-icon>mdi-security</v-icon>
    </v-tab>
    <v-tab-item>
      <info />
    </v-tab-item>
    <v-tab-item>
      <posts />
    </v-tab-item>
    <v-tab-item>
      <quote />
    </v-tab-item>
    <v-tab-item>
      <fav-company />
    </v-tab-item>
  </v-tabs>
</template>

<script>
import info from '~/components/profile/company/info/info'
import posts from '~/components/profile/company/posts/index'
import quote from '~/components/profile/company/quoteation/quote'
import FavCompany from '../favCompany.vue'
export default {
  components: { info, posts, quote, FavCompany },
}
</script>

<style scoped></style>
