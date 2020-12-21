<template>
  <div>
    <v-tabs v-model="tab" icons-and-text centered background-color="#eeeeee">
      <v-tab href="#info">
        {{ $t('company.info') }}
        <v-icon>mdi-information-variant</v-icon>
      </v-tab>
      <v-tab href="#quote">
        {{ $t('company.inquery') }}
        <v-icon>mdi-comment-quote-outline</v-icon>
      </v-tab>
      <v-tab href="#favCompany">
        {{ $t('company.favoritecompany') }}
        <v-icon>mdi-heart-outline</v-icon>
      </v-tab>
      <v-tab href="#security">
        {{ $t('company.security') }}
        <v-icon>mdi-security</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items :value="tab">
      <v-tab-item value="info">
        <info />
      </v-tab-item>
      <v-tab-item value="quote">
        <quote />
      </v-tab-item>
      <v-tab-item value="favCompany">
        <fav-company />
      </v-tab-item>
      <v-tab-item value="security">
        <change-password />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import info from '~/components/profile/user/info'
import quote from '~/components/profile/user/quote'
import favCompany from '~/components/profile/favCompany'
import changePassword from '~/components/profile/changePassword'
export default {
  components: { info, quote, favCompany, changePassword },
  computed: {
    tab: {
      set(tab) {
        this.$router.replace({ query: { ...this.$route.query, tab } })
      },
      get() {
        return this.$route.query.tab
      },
    },
  },
}
</script>

<style scoped></style>
