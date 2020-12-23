<script>
export default {
  props: {
    companies: { type: Array, required: true },
  },
  data() {
    return {
      rating: 3,
      failed_image: false,
    }
  },
}
</script>
<template>
  <v-row>
    <v-col v-for="company in companies" :key="company.id" cols="12" md="4">
      <v-card
        class="rounded-xl"
        outlined
        hover
        nuxt
        replace
        :to="{ name: 'company-id', params: { id: company.id } }"
      >
        <v-img
          class="rounded-xl m-1"
          :src="company.profile.cover"
          height="300"
          aspect-ratio="1"
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
            </v-row>
            <v-row>
              <v-spacer />
            </v-row>
          </v-container>
        </v-img>
        <v-card-actions>
          <v-chip color="blue lighten-5" text-color="primary">
            <v-icon color="primary">mdi-eye-outline</v-icon>
            <span> 51</span>
          </v-chip>
          <v-spacer />
          <v-chip color="red lighten-5">
            <v-icon color="#EA2027">
              {{ company.is_Favorite ? 'mdi-heart' : 'mdi-heart-outline' }}
            </v-icon>
          </v-chip>
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
