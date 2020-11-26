<script>
import shareCompany from '~/components/widget/company/shareCompany'
export default {
  components: { shareCompany },
  props: {
    companies: { type: Array, required: true },
  },
  data() {
    return {
      rating: 3,
      failed_image: false,
    }
  },
  methods: {
    async report(company) {
      this.$store.dispatch('company/report', company)
      if (this.$store.state.company.reportCompany) {
        this.$bvModal.show('reportCompanyModal')
      }
    },
    async favorite(company) {
      this.$store.dispatch('company/favorite', company)
    },
    onErrorImage() {
      this.failed_image = true
    },
    async sharing() {
      await this.$store.commit('company/setSharing', {
        url: 'http://localhost:3000',
        title: 'title ',
        description: 'no description',
      })
      this.$bvModal.show('newSharingModal')
    },
  },
}
</script>
<template>
  <v-row>
    <v-col v-for="company in companies" :key="company.id" cols="12" md="4">
      <v-card class="rounded-xl" outlined hover nuxt replace>
        <v-img
          class="rounded-xl m-1"
          :src="failed_image ? '/img/sarh.cover.jpg' : company.profile.cover"
          height="300"
          aspect-ratio="1"
          @error="onErrorImage"
        >
          <v-container>
            <v-row>
              <v-avatar color="white" size="36" class="mx-2">
                <v-img
                  v-if="company.profile.avatar"
                  :src="company.profile.avatar"
                ></v-img>
                <v-icon v-else color="#130f40">mdi-rhombus-split</v-icon>
              </v-avatar>
              <v-chip
                class="ma-2 d-inline-block text-truncate"
                color="white"
                style="max-width: 200px"
                exact
                text-color="primary"
                small
              >
                {{ company.profile.full_name }}
              </v-chip>
              <v-spacer />
              <v-btn
                class="mx-2"
                x-small
                elevation="0"
                color="white"
                fab
                @click="favorite(company)"
              >
                <v-icon color="#EA2027">
                  {{ company.is_Favorite ? 'mdi-heart' : 'mdi-heart-outline' }}
                </v-icon>
              </v-btn>
            </v-row>
            <v-row>
              <v-spacer />
              <share-company
                :data="{
                  title: company.profile.full_name,
                  description: company.profile.about,
                }"
                :them="{ color: 'white', small: false, x_small: true }"
              />
            </v-row>
          </v-container>
        </v-img>
        <v-card-actions>
          <v-row class="justify-space-around">
            <v-btn
              color="blue lighten-5"
              small
              elevation="0"
              rounded
              @click="$router.push('/company/' + company.id)"
            >
              <span style="color: #0c7cfe">view profile</span>
            </v-btn>
            <v-btn small elevation="0" rounded color="blue lighten-5">
              <v-icon color="primary">mdi-eye-outline</v-icon>
              <span style="color: #0c7cfe">51 views</span>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}
.activity {
  text-align: center !important;
}
</style>
