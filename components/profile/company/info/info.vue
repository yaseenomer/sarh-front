<template>
  <v-container>
    <v-row>
      <v-tabs vertical background-color="#eeeeee">
        <v-tab>
          <v-icon left>mdi-information-variant</v-icon>
          {{ $t('company.about') }}
        </v-tab>
        <v-tab>
          <v-icon left>mdi-tag-multiple-outline</v-icon>
           {{ $t('company.activity') }}
        </v-tab>
        <v-tab>
          <v-icon left>mdi-map-marker-multiple-outline</v-icon>
           {{ $t('company.Address') }}
        </v-tab>
        <v-tab>
          <v-icon left>mdi-license</v-icon>
          {{ $t('company.license') }}
        </v-tab>
        <v-tab>
          <v-icon left>mdi-map-marker-radius-outline</v-icon>
           {{ $t('company.map') }}  . . .
        </v-tab>
        <v-tab-item>
          <about-company />
        </v-tab-item>
        <v-tab-item>
          <activity />
        </v-tab-item>
        <v-tab-item>
          <company-address />
        </v-tab-item>
        <v-tab-item>
          <licence />
        </v-tab-item>
        <v-tab-item>
          <p> {{ $t('company.map') }}</p>
        </v-tab-item>
      </v-tabs>
    </v-row>
  </v-container>
</template>

<script>
import activity from '~/components/profile/company/info/activity'
import aboutCompany from '~/components/profile/company/info/about'
import companyAddress from '~/components/profile/company/info/address'
import licence from '~/components/profile/company/info/licence'
export default {
  components: { activity, aboutCompany, companyAddress, licence },
  created() {
    this.$store.dispatch('user/getUser')
  },
}
</script>

<style scoped></style>
