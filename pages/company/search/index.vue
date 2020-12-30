<template>
  <div>
    <v-row>
      <v-breadcrumbs :items="items"> </v-breadcrumbs>
    </v-row>
    <v-row>
      <v-col cols="12" md="9">
        <v-row v-if="loading">
          <v-col v-for="i in 6" :key="i" cols="12" md="4">
            <v-skeleton-loader type="image" class="rounded-xl" />
          </v-col>
        </v-row>

        <v-card v-else flat raised>
          <v-card-text>
            <company-card :companies="filterCompanies" />
            <p v-if="!filterCompanies.length">no result found ...</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card flat>
          <v-card-text>
            <h3 class="primary--text">filters</h3>
            <v-autocomplete
              v-if="!loading"
              :items="cities"
              item-text="name"
              item-value="id"
              label="cities"
              prepend-icon="mdi-filter-menu-outline"
              placeholder="filter by city"
              multiple
              chips
            ></v-autocomplete>
            <template v-if="!loading && activity">
              <v-subheader>sub activities</v-subheader>
              <v-checkbox
                v-for="sub in activity.sub_activity"
                :key="sub.id"
                v-model="activity_ids"
                :label="sub.name"
                :value="sub.id"
                hide-details
                @change="onChange"
              ></v-checkbox>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import companyCard from '~/components/widget/company/company'
export default {
  components: { companyCard },
  data() {
    return {
      loading: false,
      activity_ids: [],
      city_ids: [],
      items: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: `search company`,
          disabled: true,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      activity: 'activity/activity',
      cities: 'country/cities',
      companies: 'company/companies',
      filterCompanies: 'company/searchCompanies',
    }),
    comps: {
      get() {
        return this.companies
      },
      set(com) {
        return com
      },
    },
  },
  async created() {
    this.loading = true
    await this.$store.dispatch(
      'company/getCompanyByActivity',
      this.$route.query.activity
    )
    this.$store.dispatch('activity/getActivity', this.$route.query.activity)
    this.$store.dispatch('country/getCities')
    this.loading = false
  },
  methods: {
    async onChange() {
      const cs = []
      await this.companies.forEach((c) => {
        c.user_Activities.forEach((s) => {
          console.log(this.activity_ids.includes(s.sub_activity_id))
          if (this.activity_ids.includes(s.sub_activity_id)) {
            cs.push(c)
          }
        })
      })
      this.$store.commit('company/setFilterCompanies', cs)
    },
  },
}
</script>
