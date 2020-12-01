<script>
import { mapGetters } from 'vuex'
// import saveCountry from './country/add'
export default {
  // components: { saveCountry },
  data() {
    return {
      disabled: true,
      loading: false,
      state_id: parseInt(this.$auth.user.profile.state, 10),
    }
  },
  computed: {
    ...mapGetters({
      profile: 'user/user',
      countries: 'country/countries',
      states: 'country/filterStates',
      cities: 'country/filterCities',
    }),
    profileData() {
      return {
        address_1: this.profile.address_1,
        address_2: this.profile.address_2,
        country_id: this.profile.country_id,
        state: this.$refs.regin.state,
        city_id: this.$refs.regin.city,
      }
    },
  },

  created() {
    this.$store.dispatch('country/getCountries')
    this.$store.dispatch('country/getStates')
    this.$store.dispatch('country/getCities')
  },
  methods: {
    async updateMyProfile() {
      this.loading = true
      await this.$store.dispatch('user/updateProfile', this.profileData)
      this.loading = false
      this.changeDisable()
    },
    changeDisable() {
      this.disabled = !this.disabled
    },

    selectCountry() {
      this.$store.commit('country/filterStates', this.profile.country_id)
    },

    selectState() {
      this.$store.commit('country/filterCities', this.profile.state)
    },
  },
}
</script>

<template>
  <v-card v-if="profile" flat rounded :loading="loading">
    <v-card-title>
      <v-btn text color="primary" readonly>
        <v-icon>mdi-map-marker-multiple</v-icon>
        <span> Address</span>
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="disabled"
        text
        color="primary"
        @click.prevent="changeDisable"
      >
        <v-icon>mdi-pencil-outline</v-icon>
        <span>edit</span>
      </v-btn>

      <v-btn
        v-if="!disabled"
        text
        color="primary"
        :disabled="loading"
        :loading="loading"
        @click="updateMyProfile"
      >
        <v-icon>mdi-content-save-all-outline</v-icon>
        <span>save changes </span>
      </v-btn>
      <v-btn
        v-if="!disabled"
        text
        color="primary"
        :disabled="loading"
        @click.prevent="changeDisable"
      >
        <v-icon>mdi-cancel</v-icon>
        <span>cancel </span>
      </v-btn>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="profile.address_1"
              label="Address 1"
              :disabled="disabled"
              prepend-icon="mdi-map-marker-outline"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="profile.address_2"
              label="Address 2"
              :disabled="disabled"
              prepend-icon="mdi-map-marker-plus"
            />
          </v-col>
          <!--          <save-country ref="regin" />-->
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              v-model="profile.country_id"
              :items="countries"
              :disabled="disabled"
              item-text="name"
              item-value="id"
              prepend-icon="mdi-web"
              @change="selectCountry"
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="state_id"
              :items="states"
              :disabled="disabled"
              item-text="name"
              item-value="id"
              prepend-icon="mdi-map"
              @change="selectState"
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="profile.city_id"
              :items="cities"
              :disabled="disabled"
              item-text="name"
              item-value="id"
              prepend-icon="mdi-city"
            >
            </v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
