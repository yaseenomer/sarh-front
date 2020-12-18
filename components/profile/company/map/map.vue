<script>
import showMap from './show'
import editLocation from './create'
import { mapGetters } from 'vuex'
export default {
  components: { showMap, editLocation },
  data() {
    return {
      disabled: true,
      loading: false,
    }
  },
  computed: {
    ...mapGetters({ profile: 'user/user' }),
  },
  methods: {
    async editMyLocation() {
      this.loading = true
      await this.$refs.editLocationRef.saveLocation()
      await this.$store.dispatch('user/getUser')
      await this.$auth.fetchUser()
      this.loading = false
      this.disabled = true
    },
  },
}
</script>
<template>
  <v-card flat rounded :loading="loading">
    <v-card-title>
      <v-btn text color="primary" readonly>
        <v-icon>mdi-map-marker-radius-outline</v-icon>
        <span> map location</span>
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="disabled"
        text
        color="primary"
        @click.prevent="disabled = !disabled"
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
        @click="editMyLocation"
      >
        <v-icon>mdi-content-save-all-outline</v-icon>
        <span>save changes </span>
      </v-btn>
      <v-btn
        v-if="!disabled"
        text
        color="primary"
        :disabled="loading"
        @click.prevent="disabled = !disabled"
      >
        <v-icon>mdi-cancel</v-icon>
        <span>cancel </span>
      </v-btn>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-container v-if="profile">
        <show-map
          v-if="disabled && profile.location"
          :location="profile.location"
        />
        <p v-if="!profile.location">
          pick your location after that we display here
        </p>
        <edit-location v-if="!disabled" ref="editLocationRef" />
      </v-container>
    </v-card-text>
  </v-card>
</template>
